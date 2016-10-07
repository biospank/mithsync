defmodule Videosync.ImageController do
  use Videosync.Web, :controller

  alias Videosync.Image
  alias Videosync.ImageProxy
  alias Videosync.ArcImage
  alias Videosync.Slide
  alias Videosync.Scope

  def action(conn, _) do
    apply(__MODULE__, action_name(conn),
      [
        conn,
        conn.params,
        %Scope{
          user_id: Guardian.Plug.current_resource(conn).id,
          project_id: conn.params["project_id"],
          video_id: conn.params["video_id"]
        }

        # Guardian.Plug.current_resource(conn)
      ]
    )
  end

  def index(conn, params, scope) do
    case ImageProxy.list(%{ scope: scope, filter: params["filter"] }) do
      {:ok, images} ->
        paged_images = paginate(images, params["page"] || 1)

        paged_images =
        case paged_images do
          %Scrivener.Page{entries: [], total_entries: total} when total > 0 ->
            paginate(images, String.to_integer(params["page"]) - 1)
          _ ->
            paged_images
        end

        render(conn, "index.json", page: paged_images)
      {:error, reason} ->
        conn
        |> put_status(404)
        |> render(Videosync.ErrorView, :"404", errors: %{reason: reason})
    end
  end

  def create(conn, %{"file" => image_params}, scope) do
    case ArcImage.store({image_params, scope}) do
      {:ok, file} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", ArcImage.url({file, scope}))
        |> render("show.json",
          image: %Image{
            name: file,
            thumb_url: ArcImage.url({file, scope}, :thumb),
            slide_url: ArcImage.url({file, scope}, :slide)
          }
        )
      {:error, reason} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Videosync.ErrorView, :"422", errors: %{reason: reason})
    end
  end

  def delete(conn, %{"id" => filename}, scope) do
    url = ArcImage.url({filename, scope}, :thumb)

    q = from s in Slide,
      select: count(s.id),
      where: s.thumb_url == ^url and s.user_id == ^scope.user_id

    case Repo.one(q) do
      0 ->
        ArcImage.delete {filename, scope}
        send_resp(conn, :no_content, "")
      num when num > 0 ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Videosync.ErrorView, :"422", errors: %{reason: "The image is being used by one or more videos."})
    end
  end

  defp paginate(items, page) do
    Scrivener.paginate(
      items,
      %{
        page: page,
        page_size: 16
      }
    )
  end
end

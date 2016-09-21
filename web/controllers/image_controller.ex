defmodule Videosync.ImageController do
  use Videosync.Web, :controller

  alias Videosync.Image
  alias Videosync.ArcImage
  alias Videosync.Slide

  def action(conn, _) do
    apply(__MODULE__, action_name(conn),
      [
        conn,
        conn.params,
        Guardian.Plug.current_resource(conn)
      ]
    )
  end

  def index(conn, params, user) do
    case File.ls(ArcImage.storage_dir(:thumb, {nil, user})) do
      {:ok, files} ->
        images = Image.map_all(files, user, params["filter"])
        paged_images = paginate(images, params["page"] || 1)

        paged_images =
        case paged_images do
          %Scrivener.Page{entries: [], total_entries: total} when total > 0 ->
            paginate(images, String.to_integer(params["page"]) - 1)
          _ ->
            paged_images
        end

        render(conn, "index.json", page: paged_images)
      {:error, _} ->
        conn
        |> put_status(404)
        |> render(Videosync.ErrorView, :"404", errors: %{path: ArcImage.storage_dir(:thumb, {nil, user}), reason: "Not found"})
    end
  end

  def create(conn, %{"file" => image_params}, user) do
    case ArcImage.store({image_params, user}) do
      {:ok, file} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", ArcImage.url({file, user}))
        |> render("show.json",
          image: %Image{
            name: file,
            thumb_url: ArcImage.url({file, user}, :thumb),
            slide_url: ArcImage.url({file, user}, :slide)
          }
        )
      {:error, reason} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Videosync.ErrorView, :"422", errors: %{reason: reason})
    end
  end

  def delete(conn, %{"id" => filename}, user) do
    path = ArcImage.url({filename, user}, :thumb)

    q = from s in Slide,
      select: count(s.id),
      where: s.url == ^path and s.user_id == ^user.id

    case Repo.one(q) do
      0 ->
        ArcImage.delete {filename, user}
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
        page_size: 12
      }
    )
  end
end

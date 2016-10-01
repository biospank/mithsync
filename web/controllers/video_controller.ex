defmodule Videosync.VideoController do
  use Videosync.Web, :controller

  alias Videosync.Video
  alias Videosync.Slide

  plug :scrub_params, "video" when action in [:create, :update]

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
    videos =
      Video.own_by(user, params["project_id"])
      |> Video.filter_by(params["filter"])
      |> Video.order_by(:title)
      |> Repo.all

    paged_videos = paginate(videos, params["page"])

    paged_videos =
    case paged_videos do
      %Scrivener.Page{entries: [], total_entries: total} when total > 0 ->
        paginate(videos, String.to_integer(params["page"]) - 1)
      _ ->
        paged_videos
    end

    render(conn, "index.json", page: paged_videos)
  end

  def create(conn, %{"project_id" => project, "video" => video_params}, user) do
    changeset = user
      |> build_assoc(:videos, %{project_id: String.to_integer(project)})
      |> Video.changeset(video_params)

    case Repo.insert(changeset) do
      {:ok, video} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", project_video_path(conn, :show, project, video))
        |> render("show.json", video: video)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Videosync.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"project_id" => project, "id" => id}, user) do
    video = Video.own_by(user, project)
      |> Video.preload_slides(Slide.order_by(:start))
      |> Repo.get!(id)
      # |> Repo.preload(:slides)

    render(conn, "show_video_with_slides.json", video: video)
  end

  def update(conn, %{"project_id" => project, "id" => id, "video" => video_params}, user) do
    video = Repo.get!(Video.own_by(user, project), id)
    changeset = Video.changeset(video, video_params)

    case Repo.update(changeset) do
      {:ok, video} ->
        render(conn, "show.json", video: video)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Videosync.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"project_id" => project, "id" => id}, user) do
    video = Repo.get!(Video.own_by(user, project), id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(video)

    send_resp(conn, :no_content, "")
  end

  defp paginate(items, page) do
    Scrivener.paginate(
      items,
      %{
        page: page || 1,
        page_size: 4
      }
    )
  end
end

defmodule VideosyncWeb.VideoController do
  use VideosyncWeb, :controller

  alias Videosync.Repo
  alias Videosync.Assets.{Scope, ImageProxy}
  alias VideosyncWeb.{Project, Video, Slide}

  plug :scrub_params, "video" when action in [:create, :update]

  @max_recent_pagination 5

  def action(conn, _) do
    apply(__MODULE__, action_name(conn),
      [
        conn,
        conn.params,
        Guardian.Plug.current_resource(conn)
      ]
    )
  end

  def recent(conn, params, user) do
    videos =
      Video.own_by(user)
      |> Video.order_by(:updated_at)
      |> Video.preload_layout()
      |> Video.preload_slides(Slide.order_by(:start))
      |> Repo.all

    paged_videos = paginate(videos, params["page"], @max_recent_pagination)

    paged_videos =
    case paged_videos do
      %Scrivener.Page{entries: [], total_entries: total} when total > 0 ->
        paginate(videos, String.to_integer(params["page"]) - 1, @max_recent_pagination)
      _ ->
        paged_videos
    end

    render(conn, "index.json", page: paged_videos)
  end

  def index(conn, params, user) do
    project = Repo.get!(Project, String.to_integer(params["project_id"]))

    videos =
      Video.own_by(user)
      |> Video.belongs_to_model(:project_id, project.id)
      |> Video.filter_by(params["filter"])
      |> Video.order_by(:inserted_at)
      |> Video.preload_layout()
      |> Video.preload_slides(Slide.order_by(:start))
      |> Repo.all

    paged_videos = paginate(videos, params["page"])

    paged_videos =
    case paged_videos do
      %Scrivener.Page{entries: [], total_entries: total} when total > 0 ->
        paginate(videos, String.to_integer(params["page"]) - 1)
      _ ->
        paged_videos
    end

    render(conn, "project_and_videos.json", project: project, page: paged_videos)
  end

  def create(conn, %{"project_id" => project, "video" => video_params}, user) do
    changeset = user
      |> build_assoc(:videos, %{project_id: String.to_integer(project)})
      |> Video.create_changeset(video_params)

    case Repo.insert(changeset) do
      {:ok, video} ->
        video |> build_assoc(:layout) |> Repo.insert!

        video =
          Repo.get(Video, video.id)
          |> Repo.preload(:layout)
          |> Repo.preload(:slides)

        conn
        |> put_status(:created)
        |> put_resp_header("location", project_video_path(conn, :show, project, video))
        |> render("show.json", video: video)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"project_id" => project_id, "id" => id}, user) do
    video = Video.own_by(user)
      |> Video.belongs_to_model(:project_id, project_id)
      |> Video.preload_project()
      |> Video.preload_layout()
      |> Video.preload_slides(Slide.order_by(:start))
      |> Repo.get!(id)
      # |> Repo.preload(:slides)

    render(conn, "show_video_with_project_and_slides.json", video: video)
  end

  def update(conn, %{"project_id" => project, "id" => id, "video" => video_params}, user) do
    video = Video.own_by(user)
      |> Video.belongs_to_model(:project_id, project)
      |> Video.preload_layout()
      |> Video.preload_slides(Slide.order_by(:start))
      |> Repo.get!(id)

    changeset = Video.changeset(video, video_params)

    case Repo.update(changeset) do
      {:ok, video} ->
        render(conn, "show.json", video: video)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"project_id" => project, "id" => id}, user) do
    video = Video.own_by(user)
      |> Video.belongs_to_model(:project_id, project)
      |> Repo.get!(id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Video.delete_changeset(video)
    |> Repo.delete!

    ImageProxy.bulk_delete(%{
      scope: %Scope{
        user_id: user.id,
        project_id: project,
        video_id: id
      }
    })

    send_resp(conn, :no_content, "")
  end

  defp paginate(items, page, page_size \\ 8) do
    Scrivener.paginate(
      items,
      %{
        page: page || 1,
        page_size: page_size
      }
    )
  end
end

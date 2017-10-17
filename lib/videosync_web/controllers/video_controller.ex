defmodule VideosyncWeb.VideoController do
  use VideosyncWeb, :controller

  alias Videosync.Contents

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
    videos = Contents.list_videos_with_layout_and_slides(user)

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
    project = Contents.get_project!(String.to_integer(params["project_id"]))

    videos = Contents.list_filtered_videos_with_layout_and_slides(
      user: user,
      project: project,
      filter: params["filter"]
    )

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
    changeset = Contents.video_changeset(user, project, video_params)

    case Contents.create_video(changeset) do
      {:ok, video} ->
        Contents.create_video_layout!(video)

        video = Contents.preload_layout_and_slides(video)

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
    video = Contents.get_video_with_project_layout_and_slides!(
      id: id,
      user: user,
      project_id: project_id
    )

    render(conn, "show_video_with_project_and_slides.json", video: video)
  end

  def update(conn, %{"project_id" => project, "id" => id, "video" => video_params}, user) do
    video = Contents.get_video_with_layout_and_slides!(
      id: id,
      user: user,
      project: project
    )

    changeset = Contents.update_video_changeset(video, video_params)

    case Contents.update_video(changeset) do
      {:ok, video} ->
        render(conn, "show.json", video: video)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"project_id" => project_id, "id" => id}, user) do
    video = Contents.get_video!(
      id: id,
      user: user,
      project_id: project_id
    )

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Contents.delete_video!(video)

    Contents.delete_video_images(user, project_id, id)

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

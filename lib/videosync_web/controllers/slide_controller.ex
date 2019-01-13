defmodule VideosyncWeb.SlideController do
  use VideosyncWeb, :controller

  alias Videosync.Contents

  plug :scrub_params, "slide" when action in [:create, :update]

  def action(conn, _) do
    apply(__MODULE__, action_name(conn),
      [
        conn,
        conn.params,
        Guardian.Plug.current_resource(conn)
      ]
    )
  end

  def create(conn, %{"video_id" => video, "slide" => slide_params}, user) do
    changeset = Contents.create_slide_changeset(user, video, slide_params)

    case Contents.create_slide(changeset) do
      {:ok, slide} ->
        conn
        |> put_status(:created)
        |> render("show.json", slide: slide)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"video_id" => video, "id" => id, "slide" => slide_params}, user) do
    changeset =
      user
      |> Contents.get_slide!(id, video)
      |> Contents.update_slide_changeset(slide_params)

    case Contents.update_slide(changeset) do
      {:ok, slide} ->
        Contents.touch_video(video)

        render(conn, "show.json", slide: slide)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def save_all(conn, %{"video_id" => video, "slides" => slides_to_save}, user) do
    Enum.map(slides_to_save, fn(slide) ->
      case Map.fetch(slide, "id") do
        :error ->
          user
          |> Contents.create_slide_changeset(video, slide)
          |> Contents.create_slide!()
        {:ok, id} ->
          user
          |> Contents.get_slide!(id, video)
          |> Contents.update_slide_changeset(slide)
          |> Contents.update_slide!
      end
    end)

    Contents.touch_video(video)

    slides = Contents.get_video_slides(user, video)

    render(conn, "index.json", slides: slides)
  end

  def delete(conn, %{"video_id" => video, "id" => id}, user) do
    slide = Contents.get_slide!(user, id, video)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Contents.delete_slide!(slide)

    send_resp(conn, :no_content, "")
  end

  def delete_all(conn, %{"video_id" => video_id, "slides" => slides_to_delete}, user) do
    Contents.delete_all_slides(user, video_id, slides_to_delete)

    video = Contents.get_video!(video_id)

    slides = Contents.get_video_slides(user, video_id)

    Contents.update_video_slides_count(video, slides)

    render(conn, "index.json", slides: slides)
  end
end

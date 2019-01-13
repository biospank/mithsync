defmodule VideosyncWeb.LayoutController do
  use VideosyncWeb, :controller

  alias Videosync.Contents

  plug :scrub_params, "layout" when action in [:update]

  def update(conn, %{"video_id" => video_id, "id" => layout_id, "layout" => layout_params}) do
    changeset =
      Contents.get_layout!(video_id, layout_id)
      |> Contents.update_layout_changeset(layout_params)

    case Contents.update_layout(changeset) do
      {:ok, layout} ->
        Contents.touch_video(video_id)

        render(conn, "layout.json", data: layout)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end
end

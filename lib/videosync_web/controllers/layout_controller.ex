defmodule VideosyncWeb.LayoutController do
  use VideosyncWeb, :controller

  alias Videosync.Repo
  alias VideosyncWeb.{Layout, Video}

  plug :scrub_params, "layout" when action in [:update]

  def update(conn, %{"video_id" => video, "id" => id, "layout" => layout_params}) do
    changeset = Layout
      |> Layout.belongs_to_model(:video_id, String.to_integer(video))
      |> Repo.get!(String.to_integer(id))
      |> Layout.changeset(layout_params)

    case Repo.update(changeset) do
      {:ok, layout} ->
        Video
        |> Repo.get!(String.to_integer(video))
        |> Ecto.Changeset.change() |> Repo.update(force: true)

        render(conn, "layout.json", data: layout)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end
end

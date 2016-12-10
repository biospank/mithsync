defmodule Videosync.LayoutController do
  use Videosync.Web, :controller

  alias Videosync.Layout

  plug :scrub_params, "layout" when action in [:update]

  def update(conn, %{"video_id" => video, "id" => id, "layout" => layout_params}) do
    changeset = Layout
      |> Layout.belongs_to_model(:video_id, video)
      |> Repo.get!(id)
      |> Layout.changeset(layout_params)

    case Repo.update(changeset) do
      {:ok, layout} ->
        render(conn, "layout.json", data: layout)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Videosync.ChangesetView, "error.json", changeset: changeset)
    end
  end
end

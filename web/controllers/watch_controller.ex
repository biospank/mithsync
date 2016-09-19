defmodule Videosync.WatchController do
  use Videosync.Web, :controller
  alias Videosync.Video

  plug :put_layout, "watch.html"

  def show(conn, %{"id" => id}) do
    video = Video
      |> Repo.get!(id)
      |> Repo.preload(:slides)

    render(conn, "show.html", video: video)
  end
end

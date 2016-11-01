defmodule Videosync.WatchController do
  use Videosync.Web, :controller

  alias Videosync.Video
  alias Videosync.Slide

  plug :put_layout, "watch.html"

  def show(conn, %{"id" => id}) do
    video = Video
      |> Video.preload_slides(Slide.order_by(:start))
      |> Repo.get!(id)

    conn
      |> remove_x_frame_options_header
      |> render("show.html", video: video)
  end

  defp remove_x_frame_options_header(conn) do
    delete_resp_header(conn, "x-frame-options")
  end
end

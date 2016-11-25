defmodule Videosync.WatchController do
  use Videosync.Web, :controller

  alias Videosync.Video
  alias Videosync.Slide

  plug :put_layout, "watch.html"
  plug :remove_x_frame_options_header

  def show(conn, %{"id" => id}) do
    video = Video
      |> Video.preload_slides(Slide.order_by(:start))
      |> Repo.get_by!(watch_code: id)

    render(conn, "show.html", video: video)
  end

  defp remove_x_frame_options_header(conn, _opts) do
    delete_resp_header(conn, "x-frame-options")
  end
end

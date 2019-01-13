defmodule VideosyncWeb.WatchController do
  use VideosyncWeb, :controller

  alias Videosync.Contents

  plug :put_layout, "watch.html"
  plug :remove_x_frame_options_header

  def show(conn, %{"id" => id}) do
    video = Contents.get_video_by_whatch_code!(id)

    render(conn, "show.html", video: video)
  end

  defp remove_x_frame_options_header(conn, _opts) do
    delete_resp_header(conn, "x-frame-options")
  end
end

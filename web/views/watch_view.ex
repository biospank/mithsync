defmodule Videosync.WatchView do
  use Videosync.Web, :view

  def video_column_size(video) do
    case video.layout do
      1 -> 6
      2 -> 4
      3 -> 8
    end
  end

  def slide_column_size(video) do
    case video.layout do
      1 -> 6
      2 -> 8
      3 -> 4
    end
  end

  def slide_url(conn, slide) do
    case Mix.env do
      :dev ->
        Videosync.Router.Helpers.static_path(conn, "/#{slide.url}")
      _ ->
        slide.url
    end
  end
end

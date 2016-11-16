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
end

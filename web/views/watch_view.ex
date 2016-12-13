defmodule Videosync.WatchView do
  use Videosync.Web, :view

  def render_video_description(video) do
    if video.layout.show_description do
      case video.layout.theme do
        1 -> '''
          <p class="text-black mb-15">#{video.description}</p>
        '''
        _ -> '''
          <div class="mt-20 p-all-side-25 bg-grey">#{video.description}</div>
        '''
      end
    end
  end

  def video_column_size(layout) do
    case layout.theme do
      1 -> 6
      2 -> 4
      3 -> 8
    end
  end

  def slide_column_size(layout) do
    case layout.theme do
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

defmodule VideosyncWeb.WatchView do
  use VideosyncWeb, :view

  def render_video_description(video) do
    if video.layout.show_description do
      case video.layout.theme do
        1 -> '''
          <p class="mb-30 zinkroo__description">#{video.description}</p>
        '''
        _ -> '''
          <div class="mt-10 zinkroo__description">#{video.description}</div>
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
        VideosyncWeb.Router.Helpers.static_path(conn, "/#{slide.url}")
      _ ->
        slide.url
    end
  end

  def slide_thumb_url(conn, slide) do
    case Mix.env do
      :dev ->
        VideosyncWeb.Router.Helpers.static_path(conn, "/#{slide.thumb_url}")
      _ ->
        slide.thumb_url
    end
  end
end

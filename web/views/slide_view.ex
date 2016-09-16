defmodule Videosync.SlideView do
  use Videosync.Web, :view

  def render("index.json", %{slides: slides}) do
    %{data: render_many(slides, Videosync.SlideView, "slide.json")}
  end

  def render("show.json", %{slide: slide}) do
    %{data: render_one(slide, Videosync.SlideView, "slide.json")}
  end

  def render("slide.json", %{slide: slide}) do
    %{id: slide.id,
      url: slide.url,
      thumb_url: slide.thumb_url,
      start: slide.start,
      end: slide.end,
      video_id: slide.video_id}
  end
end

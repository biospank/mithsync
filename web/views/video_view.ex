defmodule Videosync.VideoView do
  use Videosync.Web, :view

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, Videosync.VideoView, "video_with_slides.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
  end

  def render("show.json", %{video: video}) do
    %{data: render_one(video, Videosync.VideoView, "video.json")}
  end

  def render("video.json", %{video: video}) do
    %{
      id: video.id,
      user_id: video.user_id,
      project_id: video.project_id,
      url: video.url,
      poster_url: video.poster_url,
      title: video.title,
      description: video.description,
      slide_count: video.slide_count
    }
  end

  def render("show_video_with_slides.json", %{video: video}) do
    %{data: render_one(video, Videosync.VideoView, "video_with_slides.json")}
  end

  def render("video_with_slides.json", %{video: video}) do
    %{
      id: video.id,
      user_id: video.user_id,
      project_id: video.project_id,
      url: video.url,
      poster_url: video.poster_url,
      title: video.title,
      description: video.description,
      slide_count: video.slide_count,
      slides: render_many(video.slides, Videosync.SlideView, "slide.json")
    }
  end
end

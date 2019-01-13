defmodule VideosyncWeb.VideoView do
  use VideosyncWeb, :view

  def render("project_and_videos.json", %{project: project, page: page}) do
    %{
      data: %{
        project: render_one(project, VideosyncWeb.ProjectView, "project.json"),
        videos: render_many(page.entries, VideosyncWeb.VideoView, "video_with_slides.json"),
      },
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
  end

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, VideosyncWeb.VideoView, "video_with_slides.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
  end

  def render("show.json", %{video: video}) do
    %{data: render_one(video, VideosyncWeb.VideoView, "video.json")}
  end

  def render("video.json", %{video: video}) do
    %{
      id: video.id,
      user_id: video.user_id,
      project_id: video.project_id,
      url: video.url,
      title: video.title,
      description: video.description,
      watch_code: video.watch_code,
      slide_count: video.slide_count,
      slides: render_many(video.slides, VideosyncWeb.SlideView, "slide.json"),
      layout: render_one(video.layout, VideosyncWeb.LayoutView, "layout.json", as: :data)
    }
  end

  def render("show_video_with_slides.json", %{video: video}) do
    %{data: render_one(video, VideosyncWeb.VideoView, "video_with_slides.json")}
  end

  def render("video_with_slides.json", %{video: video}) do
    %{
      id: video.id,
      user_id: video.user_id,
      project_id: video.project_id,
      url: video.url,
      title: video.title,
      description: video.description,
      # we pass as: to avoid override layout: option
      layout: render_one(video.layout, VideosyncWeb.LayoutView, "layout.json", as: :data),
      watch_code: video.watch_code,
      slide_count: video.slide_count,
      slides: render_many(video.slides, VideosyncWeb.SlideView, "slide.json"),
      inserted_at: video.inserted_at
    }
  end

  def render("show_video_with_project_and_slides.json", %{video: video}) do
    %{data: render_one(video, VideosyncWeb.VideoView, "video_with_project_and_slides.json")}
  end

  def render("video_with_project_and_slides.json", %{video: video}) do
    %{
      id: video.id,
      user_id: video.user_id,
      project_id: video.project_id,
      project: render_one(video.project, VideosyncWeb.ProjectView, "project.json"),
      url: video.url,
      title: video.title,
      description: video.description,
      # we pass as: to avoid override layout: option
      layout: render_one(video.layout, VideosyncWeb.LayoutView, "layout.json", as: :data),
      watch_code: video.watch_code,
      slide_count: video.slide_count,
      slides: render_many(video.slides, VideosyncWeb.SlideView, "slide.json"),
      inserted_at: video.inserted_at
    }
  end
end

defmodule Videosync.VideoView do
  use Videosync.Web, :view

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, Videosync.VideoView, "video.json"),
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
    %{id: video.id,
      user_id: video.user_id,
      url: video.url,
      title: video.title,
      description: video.description}
  end
end

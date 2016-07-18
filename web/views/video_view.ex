defmodule Videosync.VideoView do
  use Videosync.Web, :view

  def render("index.json", %{videos: videos}) do
    %{data: render_many(videos, Videosync.VideoView, "video.json")}
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

defmodule Videosync.ImageView do
  use Videosync.Web, :view

  def render("index.json", %{images: images}) do
    %{data: render_many(images, Videosync.ImageView, "image.json")}
  end

  def render("show.json", %{image: image}) do
    %{data: render_one(image, Videosync.ImageView, "image.json")}
  end

  def render("image.json", %{image: image}) do
    %{
      name: image.name,
      path: image.path
    }
  end
end

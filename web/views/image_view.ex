defmodule Videosync.ImageView do
  use Videosync.Web, :view

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, Videosync.ImageView, "image.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
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

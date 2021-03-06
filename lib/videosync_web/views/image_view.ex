defmodule VideosyncWeb.ImageView do
  use VideosyncWeb, :view

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, VideosyncWeb.ImageView, "image.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
  end

  def render("show.json", %{image: image}) do
    %{data: render_one(image, VideosyncWeb.ImageView, "image.json")}
  end

  def render("image.json", %{image: image}) do
    %{
      name: image.name,
      size: image.size,
      thumb_url: image.thumb_url,
      slide_url: image.slide_url,
      last_modified: image.last_modified
    }
  end
end

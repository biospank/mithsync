defmodule VideosyncWeb.ProjectView do
  use VideosyncWeb, :view

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, VideosyncWeb.ProjectView, "project.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
  end

  def render("show.json", %{project: project}) do
    %{data: render_one(project, VideosyncWeb.ProjectView, "project.json")}
  end

  def render("project.json", %{project: project}) do
    %{
      id: project.id,
      name: project.name,
      video_count: project.video_count,
      inserted_at: project.inserted_at
    }
  end
end

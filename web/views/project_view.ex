defmodule Videosync.ProjectView do
  use Videosync.Web, :view

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, Videosync.ProjectView, "project.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
  end

  def render("show.json", %{project: project}) do
    %{data: render_one(project, Videosync.ProjectView, "project.json")}
  end

  def render("project.json", %{project: project}) do
    %{id: project.id,
      name: project.name}
  end
end

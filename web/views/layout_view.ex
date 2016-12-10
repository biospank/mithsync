defmodule Videosync.LayoutView do
  use Videosync.Web, :view

  def render("layout.json", %{data: layout}) do
    %{
      id: layout.id,
      theme: layout.theme,
      show_title: layout.show_title,
      show_description: layout.show_description,
      show_date: layout.show_date,
      show_slider: layout.show_slider
    }
  end
end

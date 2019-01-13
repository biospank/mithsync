defmodule VideosyncWeb.UserView do
  use VideosyncWeb, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, VideosyncWeb.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, VideosyncWeb.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      email: user.email,
      active: user.active,
      project_count: user.project_count
    }
  end
end

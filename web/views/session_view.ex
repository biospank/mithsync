defmodule Videosync.SessionView do
  use Videosync.Web, :view

  def render("show.json", %{user: user, jwt: jwt}) do
    %{
      data: %{
        id: user.id,
        email: user.email,
        jwt: jwt
      }
    }
  end
end

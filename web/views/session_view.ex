defmodule Videosync.SessionView do
  use Videosync.Web, :view

  alias Videosync.ViewHelper

  def render("show.json", %{conn: conn}) do
    user = ViewHelper.current_user(conn)
    jwt = ViewHelper.current_token(conn)

    %{
      data: %{
        id: user.id,
        email: user.email,
        jwt: jwt
      }
    }
  end
end

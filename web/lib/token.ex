defmodule Videosync.Token do
  use Videosync.Web, :controller

  def unauthenticated(conn, _params) do
    conn
    |> put_status(401)
    |> render(Videosync.ErrorView, "error.json", message: "Authentication required")
  end

  def unauthorized(conn, _params) do
    conn
    |> put_status(401)
    |> render(Videosync.ErrorView, "error.json", message: "Authorization required")
  end
end

defmodule VideosyncWeb.Token do
  use VideosyncWeb, :controller

  def unauthenticated(conn, _params) do
    conn
    |> put_status(401)
    |> render(VideosyncWeb.ErrorView, "error.json", message: "Authentication required")
  end

  def unauthorized(conn, _params) do
    conn
    |> put_status(401)
    |> render(VideosyncWeb.ErrorView, "error.json", message: "Authorization required")
  end
end

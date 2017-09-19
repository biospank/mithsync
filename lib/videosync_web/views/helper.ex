defmodule VideosyncWeb.ViewHelper do
  def current_user(conn), do: Guardian.Plug.current_resource(conn)
  def current_token(conn), do: Guardian.Plug.current_token(conn)
end

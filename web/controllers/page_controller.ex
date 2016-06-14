defmodule Videosync.PageController do
  use Videosync.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

defmodule VideosyncWeb.PageController do
  use VideosyncWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

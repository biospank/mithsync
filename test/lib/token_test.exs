defmodule Videosync.TokenTest do
  use Videosync.ConnCase

  test "unauthenticated", %{conn: conn} do
    conn = get conn, project_path(conn, :index)
    assert json_response(conn, 401)
  end

  test "unauthorized", %{conn: conn} do
    conn = get conn, project_path(conn, :index)
    assert json_response(conn, 401)
  end
end

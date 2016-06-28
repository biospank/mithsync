defmodule Videosync.SessionControllerTest do
  use Videosync.ConnCase

  alias Videosync.Repo
  alias Videosync.User

  @valid_attrs %{email: "some@content", password: "secret"}

  setup %{conn: conn} do
    user = Repo.insert! User.login_changeset(%User{}, @valid_attrs)
    {
      :ok,
      conn: put_req_header(conn, "accept", "application/json"),
      user: user
    }
  end

  test "login with valid credentials", %{conn: conn} do
    conn = post(
      conn,
      session_path(conn, :create),
      user: @valid_attrs
    )
    assert json_response(conn, 201)["data"]["id"]
  end

  @invalid_email %{email: "invalid@email", password: "secret"}
  test "login with invalid email", %{conn: conn} do
    conn = post(
      conn,
      session_path(conn, :create),
      user: @invalid_email
    )
    assert json_response(conn, 404)
  end

  @invalid_password %{email: "some@content", password: "pass"}
  test "login with invalid password", %{conn: conn} do
    conn = post(
      conn,
      session_path(conn, :create),
      user: @invalid_password
    )
    assert json_response(conn, 401)
  end

  setup %{conn: conn, user: user} do
    {:ok, jwt, full_claims} = Guardian.encode_and_sign(user)
    conn = put_req_header(conn, "authorization", "Videosync #{jwt}")
    {:ok, conn: conn, user: user, jwt: jwt, claims: full_claims}
  end
  test "logout", %{conn: conn, user: user} do
    conn = delete conn, session_path(conn, :delete, user)
    assert response(conn, 204)
  end
end

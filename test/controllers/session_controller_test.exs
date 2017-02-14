defmodule Videosync.SessionControllerTest do
  use Videosync.ConnCase

  @valid_attrs %{
    email: "some@content",
    password: "secret",
    remember_me: true
  }

  setup %{conn: conn} = config do
    user = insert_user()

    if config[:logged_in] do
      {:ok, jwt, full_claims} = Guardian.encode_and_sign(user)

      conn = conn
        |> put_req_header("authorization", "Videosync #{jwt}")
        |> put_req_header("accept", "application/json")

      {:ok, conn: conn, user: user, jwt: jwt, claims: full_claims}
    else
      {:ok, conn: conn, user: user}
    end
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

    # assert_error_sent :not_found, fn ->
    #   conn = post(
    #     conn,
    #     session_path(conn, :create),
    #     user: @invalid_email
    #   )
    # end
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

  @tag :logged_in
  test "logout", %{conn: conn, user: user} do
    conn = delete conn, session_path(conn, :delete, user)
    assert response(conn, 204)
  end
end

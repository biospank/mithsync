defmodule Videosync.PasswordResetControllerTest do
  use Videosync.ConnCase
  use Bamboo.Test, shared: :true

  alias Videosync.User

  @valid_email "test@example.com"
  @invalid_email "invalidtest@example.com"

  @valid_attrs %{
    email: "test@example.com",
    password: "secret",
    password_confirmation: "secret"
  }

  @reset_url "http://localhost:4001/api/reset/"

  setup %{conn: conn} do
    user = User.registration_changeset(%User{}, @valid_attrs)
    # |> User.code_reset_changeset
    |> Repo.insert!

    {:ok, conn: conn, user: user}
  end

  test "password reset for a valid email", %{conn: conn, user: user} do
    post conn, password_reset_path(conn, :create), email: @valid_email
    user = Repo.get_by(User, email: @valid_email)
    # assert(Plug.Conn.get_resp_header(conn, "location")) == ["http://localhost:4001/?/reset"]
    assert_delivered_email Videosync.Email.password_reset_email(%{email: @valid_email, reset_url: @reset_url <> user.reset_code})
  end

  test "password reset for an invalid email", %{conn: conn} do
    post(conn, password_reset_path(conn, :create), email: @invalid_email)
    refute_delivered_email Videosync.Email.password_reset_email(%{email: @invalid_email, reset_url: @reset_url})
  end

  test "show with valid reset code redirect to reset page", %{conn: conn, user: user} do
    conn = get conn, password_reset_path(conn, :show, user.reset_code)
    assert conn.status == 302
  end

  @invalid_code "4u34i3h4i3hbubn3456"
  test "show with invalid reset code render json error", %{conn: conn} do
    conn = get conn, password_reset_path(conn, :show, @invalid_code)
    assert json_response(conn, 404)
  end

  @valid_reset_data %{
    password: "secret",
    password_confirmation: "secret"
  }
  test "update with valid code reset the password", %{conn: conn, user: user} do
    conn = put conn, password_reset_path(conn, :update, user.reset_code), data: @valid_reset_data
    assert json_response(conn, 200)
  end
end

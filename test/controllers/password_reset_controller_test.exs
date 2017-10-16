defmodule VideosyncWeb.PasswordResetControllerTest do
  use VideosyncWeb.ConnCase
  use Bamboo.Test, shared: :true

  alias Videosync.Repo
  alias Videosync.Accounts.User

  @valid_email "test@example.com"
  @invalid_email "invalidtest@example.com"
  @invalid_code "4u34i3h4i3hbubn3456"

  @valid_attrs %{
    email: @valid_email,
    password: "secret",
    password_confirmation: "secret",
    accept_terms_and_conditions: true
  }

  @valid_reset_data %{
    password: "secret",
    password_confirmation: "secret"
  }

  @invalid_reset_data %{
    password: "secret",
    password_confirmation: "pass"
  }

  @reset_url "http://localhost:4001/api/reset/"

  setup %{conn: conn} do
    user = User.registration_changeset(%User{}, @valid_attrs)
    |> User.gen_code_reset_changeset
    |> Repo.insert!

    {:ok, conn: conn, user: user}
  end

  test "password reset for a valid email", %{conn: conn} do
    post conn, password_reset_path(conn, :create), user: %{email: @valid_email}
    user = Repo.get_by(User, email: @valid_email)
    # assert(Plug.Conn.get_resp_header(conn, "location")) == ["http://localhost:4001/?/reset"]
    assert_delivered_email VideosyncWeb.Mailer.Email.password_reset_email(%{email: @valid_email, reset_url: @reset_url <> user.reset_code})
  end

  test "password reset for an invalid email", %{conn: conn} do
    post(conn, password_reset_path(conn, :create), user: %{email: @invalid_email})
    refute_delivered_email VideosyncWeb.Mailer.Email.password_reset_email(%{email: @invalid_email, reset_url: @reset_url})
  end

  test "show with valid reset code, redirect to reset page", %{conn: conn, user: user} do
    conn = get(conn, password_reset_path(conn, :show, user.reset_code))
    assert conn.status == 302
  end

  test "show with invalid reset code, render json error", %{conn: conn} do
    conn = get conn, password_reset_path(conn, :show, @invalid_code)
    assert json_response(conn, 404)
  end

  test "update with valid reset code, changes the password", %{conn: conn, user: user} do
    conn = put conn, password_reset_path(conn, :update, user.reset_code), user: @valid_reset_data
    assert json_response(conn, 200)
  end

  test "update with invalid reset code, renders not found", %{conn: conn} do
    conn = put conn, password_reset_path(conn, :update, @invalid_code), user: @valid_reset_data
    assert json_response(conn, 404)
  end

  test "update with invalid reset data, renders unprocessable entity", %{conn: conn, user: user} do
    conn = put conn, password_reset_path(conn, :update, user.reset_code), user: @invalid_reset_data
    assert json_response(conn, :unprocessable_entity)
  end
end

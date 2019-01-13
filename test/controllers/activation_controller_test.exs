defmodule VideosyncWeb.ActivationControllerTest do
  use VideosyncWeb.ConnCase

  alias Videosync.Repo
  alias Videosync.Accounts.User

  @valid_activation_code "_eoos7749wehhffdlnbbswiw883w7s"
  @invalid_activation_code "_eoos7749wehhbbswiw883w7s"
  @valid_email "test@example.com"
  @invalid_email "some@content"

  setup %{conn: conn} do
    Repo.insert! %User{
      email: @valid_email,
      password: "secret",
      activation_code: @valid_activation_code
    }

    {:ok, conn: conn}
  end

  test "valid activation code", %{conn: conn} do
    conn = put conn, activation_path(conn, :confirm, @valid_activation_code)
    assert json_response(conn, 200)
  end

  test "invalid activation code", %{conn: conn} do
    conn = put conn, activation_path(conn, :confirm, @invalid_activation_code)
    assert json_response(conn, 404)
  end

  test "resend activation code with valid email", %{conn: conn} do
    conn = get conn, resend_activation_code_path(conn, :resend, %{email: @valid_email})
    assert json_response(conn, 200)
  end

  test "resend activation code with invalid email", %{conn: conn} do
    conn = get conn, resend_activation_code_path(conn, :resend, %{email: @invalid_email})
    assert json_response(conn, 404)
  end
end

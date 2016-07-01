defmodule Videosync.ActivationControllerTest do
  use Videosync.ConnCase

  alias Videosync.User

  @valid_activation_code "_eoos7749wehhffdlnbbswiw883w7s"
  @invalid_activation_code "_eoos7749wehhbbswiw883w7s"
  setup %{conn: conn} do
    Repo.insert! %User{
      email: "some@content",
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
end

defmodule Videosync.AuthTest do
  use Videosync.ConnCase

  alias Videosync.User

  @valid_attrs %{email: "some@content", password: "secret"}

  setup %{conn: conn} do
    Repo.insert! User.login_changeset(%User{}, @valid_attrs)

    {:ok, conn: conn}
  end

  test "login by valid email and password should pass", %{conn: conn} do
    {:ok, user, _} = Videosync.Auth.login_by_email_and_password(conn,
      @valid_attrs.email,
      @valid_attrs.password,
      repo: Repo)

      assert user
  end

  test "login by invalid email returns not found error", %{conn: conn} do
    assert Videosync.Auth.login_by_email_and_password(
      conn,
      "invalid@email",
      @valid_attrs.password,
      repo: Repo) == {:error, :not_found, conn}
  end

  test "login by invalid password returns unauthorized error", %{conn: conn} do
    assert Videosync.Auth.login_by_email_and_password(
      conn,
      @valid_attrs.email,
      "invalidpass",
      repo: Repo) == {:error, :unauthorized, conn}
  end
end

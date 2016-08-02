defmodule Videosync.RegistrationControllerTest do
  use Videosync.ConnCase
  use Bamboo.Test, shared: :true

  alias Videosync.User
  @valid_attrs %{
    email: "some@content",
    password: "secret",
    password_confirmation: "secret"
  }
  @invalid_attrs %{}

  setup %{conn: conn} do
    User.registration_changeset(%User{}, @valid_attrs)
    |> Repo.insert!

    {:ok, conn: conn}
  end

  @new_user %{
    email: "some_other@content",
    password: "secret",
    password_confirmation: "secret"
  }
  test "creates and register user when data is valid", %{conn: conn} do
    conn = post conn, registration_path(conn, :create), user: @new_user
    assert json_response(conn, 201)["data"]["id"]
    user = Repo.get(User, json_response(conn, 201)["data"]["id"])
    assert_delivered_email Videosync.Email.welcome_email(user)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, registration_path(conn, :create), user: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end
end
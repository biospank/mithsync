defmodule Videosync.UserControllerTest do
  use Videosync.ConnCase
  # use Bamboo.Test, shared: :true

  alias Videosync.User
  @valid_attrs %{
    email: "some@content",
    password: "secret",
    password_confirmation: "secret"
  }
  @invalid_attrs %{}

  setup %{conn: conn} do
    user = User.registration_changeset(%User{}, @valid_attrs)
    |> Repo.insert!

    {:ok, jwt, full_claims} = Guardian.encode_and_sign(user)

    conn = conn
    |> put_req_header("authorization", "Videosync #{jwt}")
    |> put_req_header("accept", "application/json")

    {:ok, conn: conn, user: user, jwt: jwt, claims: full_claims}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, user_path(conn, :index)
    assert json_response(conn, 200)["data"]
  end

  test "shows chosen resource", %{conn: conn, user: user} do
    conn = get conn, user_path(conn, :show, user)
    assert json_response(conn, 200)["data"] ==
      %{"id" => user.id, "email" => user.email, "active" => false}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, user_path(conn, :show, -1)
    end
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn, user: user} do
    conn = put conn, user_path(conn, :update, user), user: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get(User, json_response(conn, 200)["data"]["id"])
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    user = Repo.insert! %User{}
    conn = put conn, user_path(conn, :update, user), user: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    user = Repo.insert! %User{}
    conn = delete conn, user_path(conn, :delete, user)
    assert response(conn, 204)
    refute Repo.get(User, user.id)
  end
end

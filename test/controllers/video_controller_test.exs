defmodule Videosync.VideoControllerTest do
  use Videosync.ConnCase

  alias Videosync.Video
  alias Videosync.User
  @valid_attrs %{description: "some content", title: "some content", url: "some content"}
  @valid_user %{
    email: "some@content",
    password: "secret",
    password_confirmation: "secret"
  }
  @invalid_attrs %{}

  setup %{conn: conn} do
    user = User.registration_changeset(%User{}, @valid_user)
    |> Repo.insert!

    {:ok, jwt, full_claims} = Guardian.encode_and_sign(user)

    conn = conn
    |> put_req_header("authorization", "Videosync #{jwt}")
    |> put_req_header("accept", "application/json")

    {:ok, conn: conn, user: user, jwt: jwt, claims: full_claims}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, video_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn, user: user} do
    video = Repo.insert! Ecto.build_assoc(user, :videos, %Video{})
    conn = get conn, video_path(conn, :show, video)
    assert json_response(conn, 200)["data"] == %{"id" => video.id,
      "user_id" => video.user_id,
      "url" => video.url,
      "title" => video.title,
      "description" => video.description}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, video_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, video_path(conn, :create), video: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Video, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, video_path(conn, :create), video: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn, user: user} do
    video = Repo.insert! Ecto.build_assoc(user, :videos, %Video{})
    conn = put conn, video_path(conn, :update, video), video: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Video, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn, user: user} do
    video = Repo.insert! Ecto.build_assoc(user, :videos, %Video{})
    conn = put conn, video_path(conn, :update, video), video: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn, user: user} do
    video = Repo.insert! Ecto.build_assoc(user, :videos, %Video{})
    conn = delete conn, video_path(conn, :delete, video)
    assert response(conn, 204)
    refute Repo.get(Video, video.id)
  end
end

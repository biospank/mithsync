defmodule Videosync.VideoControllerTest do
  use Videosync.ConnCase

  alias Videosync.Video

  @valid_attrs %{
    description: "some description",
    title: "some title",
    url: "some url"
  }
  @invalid_attrs %{}

  setup %{conn: conn} = config do
    if config[:logged_in] do
      user = insert_user()
      {:ok, jwt, full_claims} = Guardian.encode_and_sign(user)

      conn = conn
      |> put_req_header("authorization", "Videosync #{jwt}")
      |> put_req_header("accept", "application/json")

      {:ok, conn: conn, user: user, jwt: jwt, claims: full_claims}
    else
      {:ok, conn: conn}
    end
  end

  test "requires user authentication on all actions", %{conn: conn} do
    Enum.each([
        get(conn, video_path(conn, :index)),
        get(conn, video_path(conn, :show, "123")),
        put(conn, video_path(conn, :update, "123", %{})),
        post(conn, video_path(conn, :create, %{})),
        delete(conn, video_path(conn, :delete, "123")),
      ], fn conn ->
      assert json_response(conn, 401)
      assert conn.halted
    end)
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get conn, video_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn, user: user} do
    video = insert_video(user, %Video{})
    conn = get conn, video_path(conn, :show, video)
    assert json_response(conn, 200)["data"] == %{"id" => video.id,
      "user_id" => video.user_id,
      "url" => video.url,
      "title" => video.title,
      "description" => video.description}
  end

  @tag :logged_in
  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, video_path(conn, :show, -1)
    end
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, video_path(conn, :create), video: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Video, @valid_attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, video_path(conn, :create), video: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn, user: user} do
    video = insert_video(user, %Video{})
    conn = put conn, video_path(conn, :update, video), video: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Video, @valid_attrs)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn, user: user} do
    video = insert_video(user, %Video{})
    conn = put conn, video_path(conn, :update, video), video: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn, user: user} do
    video = insert_video(user, %Video{})
    conn = delete conn, video_path(conn, :delete, video)
    assert response(conn, 204)
    refute Repo.get(Video, video.id)
  end
end

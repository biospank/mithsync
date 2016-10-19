defmodule Videosync.VideoControllerTest do
  use Videosync.ConnCase

  alias Videosync.Project
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
        get(conn, recent_videos_path(conn, :recent)),
        get(conn, project_video_path(conn, :index, 5)),
        get(conn, project_video_path(conn, :show, 5, 123)),
        put(conn, project_video_path(conn, :update, 5, 123, %{})),
        post(conn, project_video_path(conn, :create, 5, %{})),
        delete(conn, project_video_path(conn, :delete, 5, 123)),
      ], fn conn ->
      assert json_response(conn, 401)
      assert conn.halted
    end)
  end

  @tag :logged_in
  test "lists recent videos", %{conn: conn} do
    conn = get conn, recent_videos_path(conn, :recent)
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    conn = get conn, project_video_path(conn, :index, project)
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, project, %Video{})
      |> Repo.preload(:slides)
    conn = get conn, project_video_path(conn, :show, project, video)
    assert json_response(conn, 200)["data"] == %{"id" => video.id,
      "user_id" => user.id,
      "project_id" => project.id,
      "url" => video.url,
      "title" => video.title,
      "description" => video.description,
      "slide_count" => 0,
      "slides" => video.slides}
  end

  @tag :logged_in
  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, project_video_path(conn, :show, -1, -1)
    end
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    conn = post conn, project_video_path(conn, :create, project), video: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Video, @valid_attrs)
  end

  @tag :logged_in
  test "increment project's video counter cache on a valid transaction", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    post conn, project_video_path(conn, :create, project), video: @valid_attrs

    counter_cache = Repo.get(Project, project.id).video_count
    assert counter_cache == 1
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    conn = post conn, project_video_path(conn, :create, project), video: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, project, %Video{})
    conn = put conn, project_video_path(conn, :update, project, video), video: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Video, @valid_attrs)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, project, %Video{})
    conn = put conn, project_video_path(conn, :update, project, video), video: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, project, %Video{})
    conn = delete conn, project_video_path(conn, :delete, project, video)
    assert response(conn, 204)
    refute Repo.get(Video, video.id)
  end

  @tag :logged_in
  test "decrement project's video counter cache on a valid transaction", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    post_conn = post conn, project_video_path(conn, :create, project), video: @valid_attrs
    delete conn, project_video_path(conn, :delete, project, json_response(post_conn, 201)["data"]["id"])

    counter_cache = Repo.get(Project, project.id).video_count
    assert counter_cache == 0
  end
end

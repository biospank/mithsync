defmodule Videosync.SlideControllerTest do
  use Videosync.ConnCase

  alias Videosync.Slide
  alias Videosync.Video
  alias Videosync.Project

  @valid_attrs %{
    start: 20,
    url: "/upload/33/images/slide/one",
    thumb_url: "/upload/33/images/thumb/one"
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
        put(conn, project_video_slide_path(conn, :update, 4, 12, 34, %{})),
        post(conn, project_video_slide_path(conn, :create, 4, 12, %{})),
        delete(conn, project_video_slide_path(conn, :delete, 4, 12, 34))
      ], fn conn ->
        assert json_response(conn, 401)
        assert conn.halted
    end)
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    conn = post conn, project_video_slide_path(conn, :create, project, video), slide: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Slide, @valid_attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    conn = post conn, project_video_slide_path(conn, :create, project, video), slide: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "does not create resource and raise errors on missing video association", %{conn: conn} do
    assert_raise Ecto.ConstraintError, fn ->
      post conn, project_video_slide_path(conn, :create, 200, 300), slide: @valid_attrs
    end
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    slide = insert_slide(user, video, %Slide{})
    conn = put conn, project_video_slide_path(conn, :update, project, video, slide), slide: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Slide,
            Map.merge(@valid_attrs, %{user_id: user.id, video_id: video.id}))
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    slide = insert_slide(user, video, %Slide{})
    conn = put conn, project_video_slide_path(conn, :update, project, video, slide), slide: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    slide = insert_slide(user, video, %Slide{})
    conn = delete conn, project_video_slide_path(conn, :delete, project, video, slide)
    assert response(conn, 204)
    refute Repo.get(Slide.own_by(user, video.id), slide.id)
  end
end

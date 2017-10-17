defmodule VideosyncWeb.ImageControllerTest do
  use VideosyncWeb.ConnCase

  alias Videosync.Uploaders.ArcImage
  alias Videosync.Contents.Project
  alias Videosync.Contents.Video
  alias Videosync.Assets.Scope

  @valid_attrs %Plug.Upload{
    content_type: "image/jpg",
    filename: "dummy.jpg",
    path: "./test/support/dummy.jpg"
  }
  @invalid_attrs %Plug.Upload{
    content_type: "image/jpg",
    filename: "dummy.jpg",
    path: "/tmp/plug-1469/multipart-781792-246379-1"
  }

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
        get(conn, project_video_image_path(conn, :index, 5, 12)),
        post(conn, project_video_image_path(conn, :create, 5, 12, %{})),
        delete(conn, project_video_image_path(conn, :delete, 5, 12, "dummy.jpg")),
      ], fn conn ->
      assert json_response(conn, 401)
      assert conn.halted
    end)
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, project, %Video{})
    conn = get conn, project_video_image_path(conn, :index, project, video)
    # assert json_response(conn, 404)["errors"]
    assert json_response(conn, 200)["data"]
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, project, %Video{})
    conn = post conn, project_video_image_path(conn, :create, project, video), file: @valid_attrs
    assert json_response(conn, 201)["data"]
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, project, %Video{})
    conn = post conn, project_video_image_path(conn, :create, project, video), file: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, project, %Video{})
    conn = delete conn, project_video_image_path(conn, :delete, project, video, "dummy.jpg")
    assert response(conn, 204)
  end

  @tag :logged_in
  test "does not delete resource referenced by video", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, project, %Video{})
    {:ok, file} = ArcImage.store({@valid_attrs, %Scope{ user_id: user.id, project_id: project.id, video_id: video.id }})
    insert_slide(
      user,
      video,
      %Videosync.Contents.Slide{
        thumb_url: ArcImage.url({file, %Scope{ user_id: user.id, project_id: project.id, video_id: video.id }}, :thumb)
      })
    conn = delete conn, project_video_image_path(conn, :delete, project, video, "dummy.jpg")
    assert response(conn, 422)
  end

end

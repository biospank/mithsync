defmodule VideosyncWeb.LayoutControllerTest do
  use VideosyncWeb.ConnCase

  alias Videosync.Repo
  alias VideosyncWeb.{Project, Video}

  @video_attrs %{
    description: "some description",
    title: "some title",
    url: "some url"
  }
  @valid_attrs %{
    theme: 2,
    show_title: true,
    show_description: true,
    show_date: true,
    show_slider: true
  }
  @invalid_attrs %{
    show_title: nil
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

  test "requires user authentication on update", %{conn: conn} do
    conn = put(conn, project_video_layout_path(conn, :update, 10, 12, 34, %{}))
    assert json_response(conn, 401)
    assert conn.halted
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video_conn = post conn, project_video_path(conn, :create, project), video: @video_attrs
    video_conn = get conn, project_video_path(conn, :show, project, json_response(video_conn, 201)["data"]["id"])
    layout_conn = put conn, project_video_layout_path(conn, :update, project, json_response(video_conn, 200)["data"]["id"], json_response(video_conn, 200)["data"]["layout"]["id"]), layout: @valid_attrs
    assert json_response(layout_conn, 200)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video_conn = post conn, project_video_path(conn, :create, project), video: @video_attrs
    video_conn = get conn, project_video_path(conn, :show, project, json_response(video_conn, 201)["data"]["id"])
    layout_conn = put conn, project_video_layout_path(conn, :update, project, json_response(video_conn, 200)["data"]["id"], json_response(video_conn, 200)["data"]["layout"]["id"]), layout: @invalid_attrs
    assert json_response(layout_conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates video 'updated_at' timestamp on save all", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video_conn = post conn, project_video_path(conn, :create, project), video: @video_attrs
    video = Repo.get!(Video, json_response(video_conn, 201)["data"]["id"])
    :timer.sleep(1000)
    put conn, project_video_layout_path(conn, :update, project, json_response(video_conn, 201)["data"]["id"], json_response(video_conn, 201)["data"]["layout"]["id"]), layout: @valid_attrs
    video_timestamp = Repo.get!(Video, video.id)
    IO.puts inspect(video.updated_at)
    IO.puts inspect(video_timestamp.updated_at)
    assert Ecto.DateTime.compare(video_timestamp.updated_at, video.updated_at) == :gt
  end
end

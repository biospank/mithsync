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
        post(conn, project_video_save_all_slides_path(conn, :save_all, 4, 12, [])),
        delete(conn, project_video_slide_path(conn, :delete, 4, 12, 34)),
        post(conn, project_video_delete_all_slides_path(conn, :delete_all, 4, 12, []))
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
  test "increment project's video counter cache on a valid transaction", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    post conn, project_video_slide_path(conn, :create, project, video), slide: @valid_attrs

    counter_cache = Repo.get(Video, video.id).slide_count
    assert counter_cache == 1
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
  test "updates video 'updated_at' timestamp on slide change", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    slide = insert_slide(user, video, %Slide{})
    :timer.sleep(1000)
    conn = put conn, project_video_slide_path(conn, :update, project, video, slide), slide: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    video_timestamp = Repo.get!(Video, video.id)
    assert Ecto.DateTime.compare(video_timestamp.updated_at, video.updated_at) == :gt
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

  @tag :logged_in
  test "deletes all given resources", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    [_ | slides] = Enum.map(1..5, fn(_) ->
      slide = insert_slide(user, video, %Slide{})

      %{ id: slide.id }
    end)
    post_conn = post conn, project_video_delete_all_slides_path(conn, :delete_all, project, video), slides: slides

    assert response(post_conn, 200)
    retrieve_deleted_slides = Slide.includes(Slide, Enum.map(slides, &(&1.id))) |> Repo.all()
    assert retrieve_deleted_slides |> Enum.empty?
  end

  @tag :logged_in
  test "decrement project's video counter cache on a valid transaction", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    post_conn = post conn, project_video_slide_path(conn, :create, project, video), slide: @valid_attrs
    delete conn, project_video_slide_path(conn, :delete, project, video, json_response(post_conn, 201)["data"]["id"])

    counter_cache = Repo.get(Video, video.id).slide_count
    assert counter_cache == 0
  end

  @tag :logged_in
  test "save all with an empty payload", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    post_conn = post conn, project_video_save_all_slides_path(conn, :save_all, project, video), slides: []

    assert json_response(post_conn, 200)["data"] |> Enum.empty?
  end

  @tag :logged_in
  test "save all with a new slide", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    post_conn = post conn, project_video_save_all_slides_path(conn, :save_all, project, video), slides: [@valid_attrs]

    result_data = json_response(post_conn, 200)["data"]

    refute result_data |> Enum.empty?
    [%{"id" => id} | _] = result_data
    assert is_integer(id)
  end

  @tag :logged_in
  test "updates video 'updated_at' timestamp on save all", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    :timer.sleep(1000)
    post conn, project_video_save_all_slides_path(conn, :save_all, project, video), slides: []
    video_timestamp = Repo.get!(Video, video.id)
    assert Ecto.DateTime.compare(video_timestamp.updated_at, video.updated_at) == :gt
  end

  @tag :logged_in
  @new_url "/upload/33/images/slide/two"
  test "save all with an old slide", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    slide = insert_slide(user, video, @valid_attrs)
      |> Map.from_struct
      |> Map.put(:url, @new_url)
    post_conn = post conn, project_video_save_all_slides_path(conn, :save_all, project, video), slides: [slide]

    result_data = json_response(post_conn, 200)["data"]

    refute result_data |> Enum.empty?
    [%{"url" => url} | _] = result_data
    assert url == @new_url
  end

  @tag :logged_in
  @new_url "/upload/33/images/slide/two"
  test "save all with old and new slides", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    video = insert_video(user, %Video{})
    new_slide = Map.merge(@valid_attrs, %{start: 40})
    old_slide = insert_slide(user, video, @valid_attrs)
      |> Map.from_struct
      |> Map.put(:url, @new_url)
    post_conn = post conn, project_video_save_all_slides_path(conn, :save_all, project, video), slides: [old_slide, new_slide]

    result_data = json_response(post_conn, 200)["data"]

    assert Enum.count(result_data) == 2
    [%{"url" => url} | tail] = result_data
    assert url == @new_url
    [%{"id" => id} | _] = tail
    assert is_integer(id)
  end
end

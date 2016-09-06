defmodule Videosync.SlideControllerTest do
  use Videosync.ConnCase

  alias Videosync.Slide
  alias Videosync.Video

  @valid_attrs %{
  end: 60,
    start: 20,
    url: "http://mydomain/url/to/image"
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
        put(conn, video_slide_path(conn, :update, 12, 34, %{})),
        post(conn, video_slide_path(conn, :create, 12, %{})),
        delete(conn, video_slide_path(conn, :delete, 12, 34))
      ], fn conn ->
        assert json_response(conn, 401)
        assert conn.halted
    end)
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn, user: user} do
    video = insert_video(user, %Video{})
    conn = post conn, video_slide_path(conn, :create, video.id), slide: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Slide, @valid_attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn, user: user} do
    video = insert_video(user, %Video{})
    conn = post conn, video_slide_path(conn, :create, video.id), slide: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "does not create resource and raise errors on missing video association", %{conn: conn} do
    assert_raise Ecto.ConstraintError, fn ->
      post conn, video_slide_path(conn, :create, 300), slide: @valid_attrs
    end
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn, user: user} do
    video = insert_video(user, %Video{})
    slide = insert_slide(user, video, %Slide{})
    conn = put conn, video_slide_path(conn, :update, video, slide), slide: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Slide,
            Map.merge(@valid_attrs, %{user_id: user.id, video_id: video.id}))
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn, user: user} do
    video = insert_video(user, %Video{})
    slide = insert_slide(user, video, %Slide{})
    conn = put conn, video_slide_path(conn, :update, video, slide), slide: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn, user: user} do
    video = insert_video(user, %Video{})
    slide = insert_slide(user, video, %Slide{})
    conn = delete conn, video_slide_path(conn, :delete, video, slide)
    assert response(conn, 204)
    refute Repo.get(Slide.own_by(user, video.id), slide.id)
  end
end

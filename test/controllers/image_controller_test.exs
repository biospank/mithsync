defmodule Videosync.ImageControllerTest do
  use Videosync.ConnCase

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
        get(conn, image_path(conn, :index)),
        post(conn, image_path(conn, :create, %{})),
        delete(conn, image_path(conn, :delete, "123")),
      ], fn conn ->
      assert json_response(conn, 401)
      assert conn.halted
    end)
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get conn, image_path(conn, :index)
    # assert json_response(conn, 404)["errors"]
    assert json_response(conn, 200)["data"]
  end

  # test "shows chosen resource", %{conn: conn} do
  #   image = Repo.insert! %Image{}
  #   conn = get conn, image_path(conn, :show, image)
  #   assert json_response(conn, 200)["data"] == %{"id" => image.id}
  # end
  #
  # test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
  #   assert_error_sent 404, fn ->
  #     get conn, image_path(conn, :show, -1)
  #   end
  # end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, image_path(conn, :create), file: @valid_attrs
    assert json_response(conn, 201)["data"]
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, image_path(conn, :create), file: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  # test "updates and renders chosen resource when data is valid", %{conn: conn} do
  #   image = Repo.insert! %Image{}
  #   conn = put conn, image_path(conn, :update, image), image: @valid_attrs
  #   assert json_response(conn, 200)["data"]["id"]
  #   assert Repo.get_by(Image, @valid_attrs)
  # end
  #
  # test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
  #   image = Repo.insert! %Image{}
  #   conn = put conn, image_path(conn, :update, image), image: @invalid_attrs
  #   assert json_response(conn, 422)["errors"] != %{}
  # end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    conn = delete conn, image_path(conn, :delete, "dummy.jpg")
    assert response(conn, 204)
  end
end

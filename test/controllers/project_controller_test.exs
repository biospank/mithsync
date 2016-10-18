defmodule Videosync.ProjectControllerTest do
  use Videosync.ConnCase

  alias Videosync.Project
  alias Videosync.User

  @valid_attrs %{name: "some content"}
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

  test "requires user authentication on all route actions", %{conn: conn} do
    Enum.each([
        get(conn, recent_projects_path(conn, :recent)),
        get(conn, project_path(conn, :index)),
        put(conn, project_path(conn, :update, "123", %{})),
        post(conn, project_path(conn, :create, %{})),
        delete(conn, project_path(conn, :delete, "123")),
      ], fn conn ->
      assert json_response(conn, 401)
      assert conn.halted
    end)
  end

  @tag :logged_in
  test "lists recent projects", %{conn: conn} do
    conn = get conn, recent_projects_path(conn, :recent)
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get conn, project_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, project_path(conn, :create), project: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Project, @valid_attrs)
  end

  @tag :logged_in
  test "increment user's project counter cache on a valid transaction", %{conn: conn, user: user} do
    post conn, project_path(conn, :create), project: @valid_attrs

    counter_cache = Repo.get(User, user.id).project_count
    assert counter_cache == 1
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, project_path(conn, :create), project: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    conn = put conn, project_path(conn, :update, project), project: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Project, @valid_attrs)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    conn = put conn, project_path(conn, :update, project), project: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn, user: user} do
    project = insert_project(user, %Project{})
    conn = delete conn, project_path(conn, :delete, project)
    assert response(conn, 204)
    refute Repo.get(Project, project.id)
  end

  @tag :logged_in
  test "decrement project's video counter cache on a valid transaction", %{conn: conn, user: user} do
    create_conn = post conn, project_path(conn, :create), project: @valid_attrs
    delete conn, project_path(conn, :delete, json_response(create_conn, 201)["data"]["id"])

    counter_cache = Repo.get(User, user.id).project_count
    assert counter_cache == 0
  end
end

defmodule VideosyncWeb.ProjectController do
  use VideosyncWeb, :controller

  alias Videosync.Contents

  @max_recent_pagination 5

  def action(conn, _) do
    apply(__MODULE__, action_name(conn),
      [
        conn,
        conn.params,
        Guardian.Plug.current_resource(conn)
      ]
    )
  end

  def recent(conn, params, user) do
    projects = Contents.list_projects(user)

    paged_projects = paginate(projects, params["page"], @max_recent_pagination)

    paged_projects =
    case paged_projects do
      %Scrivener.Page{entries: [], total_entries: total} when total > 0 ->
        paginate(projects, String.to_integer(params["page"]) - 1, @max_recent_pagination)
      _ ->
        paged_projects
    end

    render(conn, "index.json", page: paged_projects)
  end

  def index(conn, params, user) do
    projects = Contents.list_filtered_projects(user, params["filter"])

    paged_projects = paginate(projects, params["page"])

    paged_projects =
    case paged_projects do
      %Scrivener.Page{entries: [], total_entries: total} when total > 0 ->
        paginate(projects, String.to_integer(params["page"]) - 1)
      _ ->
        paged_projects
    end

    render(conn, "index.json", page: paged_projects)
  end

  def create(conn, %{"project" => project_params}, user) do
    changeset = Contents.create_project_changeset(user, project_params)

    case Contents.create_project(changeset) do
      {:ok, project} ->
        conn
        |> put_status(:created)
        |> render("show.json", project: project)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "project" => project_params}, user) do
    project = Contents.get_project!(user, id)
    changeset = Contents.update_project_changeset(project, project_params)

    case Contents.update_project(changeset) do
      {:ok, project} ->
        render(conn, "show.json", project: project)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}, user) do
    project = Contents.get_project!(user, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Contents.delete_project!(project)

    Contents.delete_project_images(user, id)

    send_resp(conn, :no_content, "")
  end

  defp paginate(items, page, page_size \\ 8) do
    Scrivener.paginate(
      items,
      %{
        page: page || 1,
        page_size: page_size
      }
    )
  end
end

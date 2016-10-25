defmodule Videosync.ProjectController do
  use Videosync.Web, :controller

  alias Videosync.Project

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
    projects =
      Project.own_by(user)
      |> Project.order_by(:inserted_at)
      |> Repo.all

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

  def index(conn, params, user) do
    projects =
      Project.own_by(user)
      |> Project.filter_by(params["filter"])
      |> Project.order_by(:inserted_at)
      |> Repo.all

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
    changeset = user
      |> build_assoc(:projects)
      |> Project.create_changeset(project_params)

    case Repo.insert(changeset) do
      {:ok, project} ->
        conn
        |> put_status(:created)
        |> render("show.json", project: project)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Videosync.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "project" => project_params}, user) do
    project = Repo.get!(Project.own_by(user), id)
    changeset = Project.changeset(project, project_params)

    case Repo.update(changeset) do
      {:ok, project} ->
        render(conn, "show.json", project: project)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Videosync.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}, user) do
    project = Repo.get!(Project.own_by(user), id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Project.delete_changeset(project)
    |> Repo.delete!

    send_resp(conn, :no_content, "")
  end

  defp paginate(items, page) do
    Scrivener.paginate(
      items,
      %{
        page: page || 1,
        page_size: 8
      }
    )
  end
end

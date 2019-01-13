defmodule VideosyncWeb.UserController do
  use VideosyncWeb, :controller

  alias Videosync.Repo
  alias Videosync.Accounts
  alias Videosync.Accounts.User

  plug :scrub_params, "user" when action in [:update]
  # plug Guardian.Plug.EnsureAuthenticated,
  #   [handler: VideosyncWeb.Token]
  #     when action in [:index, :show, :update, :delete]

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", users: users)
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def current(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    case Accounts.update_user(user, user_params) do
      {:ok, user} ->
        render(conn, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Accounts.delete_user(user)

    send_resp(conn, :no_content, "")
  end
end

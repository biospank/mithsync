defmodule Videosync.PasswordResetController do
  use Videosync.Web, :controller

  alias Videosync.User
  alias Videosync.Email
  alias Videosync.Mailer

  def create(conn, %{"email" => email}) do
    user = Repo.get_by(User, email: email)

    cond do
      user ->
        {:ok, user} = user
        |> User.code_reset_changeset
        |> Repo.update

        Email.password_reset_email(%{
          email: user.email,
          reset_url: password_reset_url(conn, :show, user.reset_code)
        })
        |> Mailer.deliver_later

        send_resp conn, 201, ""
      true ->
        conn
        |> put_status(404)
        |> render(Videosync.ErrorView, :"404", errors: %{email: "Not found"})
    end
  end

  def show(conn, %{"id" => reset_code}) do
    user = Repo.get_by(User, reset_code: reset_code)

    cond do
      user ->
        # Videosync.Endpoint.static_url <> "/?/reset"
        conn
        |> redirect to: "/?/reset"
      true ->
        conn
        |> put_status(:not_found)
        |> render(Videosync.ErrorView, :"404", errors: %{reset_code: "Not found"})
    end
  end

  def update(conn, %{"id" => reset_code, "data" => reset_params}) do
    user = Repo.get_by(User, reset_code: reset_code)

    cond do
      user ->
        case User.password_reset_changeset(user, reset_params) |> Repo.update do
          {:ok, user} ->
            render(conn, Videosync.UserView, "show.json", user: user)
          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(Videosync.ChangesetView, "error.json", changeset: changeset)
        end
      true ->
        conn
        |> put_status(:not_found)
        |> render(Videosync.ErrorView, :"404", errors: %{reset_code: "Not found"})
    end
  end
end

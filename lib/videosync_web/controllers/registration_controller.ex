defmodule VideosyncWeb.RegistrationController do
  use VideosyncWeb, :controller

  alias Videosync.Accounts
  alias VideosyncWeb.Mailer
  alias VideosyncWeb.Mailer.Email

  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params}) do
    case Accounts.create_user(user_params) do
      {:ok, user} ->
        Email.welcome_email(user) |> Mailer.deliver_later

        conn
        |> put_status(:created)
        |> put_resp_header("location", user_path(conn, :show, user))
        |> render(VideosyncWeb.UserView, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end
end

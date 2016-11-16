defmodule Videosync.ActivationController do
  use Videosync.Web, :controller

  alias Videosync.{User, Auth, Email, Mailer}

  def confirm(conn, %{"code" => activation_code}) do
    user = Repo.get_by(User, activation_code: activation_code)

    cond do
      user ->
        user
        |> User.activation_changeset
        |> Repo.update

        Auth.login(conn, user)
        |> render(Videosync.UserView, "show.json", user: user)
      true ->
        conn
        |> put_status(404)
        |> render(Videosync.ErrorView, :"404", errors: %{activation_code: "Code not found"})
    end
  end

  def resend(conn, %{"email" => email}) do
    user = Repo.get_by(User, email: email)

    case user do
      nil ->
        conn
        |> put_status(:not_found)
        |> render(Videosync.ErrorView, :"404", errors: %{email: "Email not found"})
      user ->
        Email.welcome_email(user) |> Mailer.deliver_later

        render(conn, Videosync.UserView, "show.json", user: user)
    end
  end
end

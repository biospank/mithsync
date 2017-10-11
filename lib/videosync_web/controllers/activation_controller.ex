defmodule VideosyncWeb.ActivationController do
  use VideosyncWeb, :controller

  alias Videosync.Repo
  alias Videosync.Accounts
  alias Videosync.Accounts.User
  alias VideosyncWeb.{Auth, Email, Mailer}

  def confirm(conn, %{"code" => activation_code}) do
    user = Repo.get_by(User, activation_code: activation_code)

    cond do
      user ->
        user
        |> User.activation_changeset
        |> Repo.update

        Auth.login(conn, user)
        |> render(VideosyncWeb.UserView, "show.json", user: user)
      true ->
        conn
        |> put_status(404)
        |> render(VideosyncWeb.ErrorView, :"404", errors: %{activation_code: "Code not found"})
    end
  end

  def resend(conn, %{"email" => email}) do
    user = Accounts.get_user_by(:email, email)

    case user do
      nil ->
        conn
        |> put_status(:not_found)
        |> render(VideosyncWeb.ErrorView, :"404", errors: %{email: "Email not found"})
      user ->
        Email.welcome_email(user) |> Mailer.deliver_later

        render(conn, VideosyncWeb.UserView, "show.json", user: user)
    end
  end
end

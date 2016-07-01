defmodule Videosync.ActivationController do
  use Videosync.Web, :controller

  alias Videosync.User
  alias Videosync.Auth

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
end

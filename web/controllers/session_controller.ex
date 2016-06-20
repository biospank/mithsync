defmodule Videosync.SessionController do
  use Videosync.Web, :controller

  alias Videosync.Auth

  def create(conn, %{"user" => user_params}) do
    case Auth.login_by_email_and_password(conn, user_params["email"], user_params["password"], repo: Repo) do
      {:ok, user, new_conn} ->
        new_conn
        |> put_status(:created)
        |> render(Videosync.UserView, "show.json", user: user)
      {:error, :not_found, conn} ->
        conn
        |> put_status(404)
        |> render(Videosync.ErrorView, "error.json", message: "User not found")
      {:error, :unauthorized, conn} ->
        conn
        |> put_status(401)
        |> render(Videosync.ErrorView, "error.json", message: "Incorrect password")
    end
  end

  def delete(conn, %{"id" => _}) do
    send_resp(conn, :no_content, "")
  end
end

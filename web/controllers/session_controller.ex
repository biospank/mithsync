defmodule Videosync.SessionController do
  use Videosync.Web, :controller

  alias Videosync.Auth

  def create(conn, %{"user" => user_params}) do
    case Auth.login_by_email_and_password(conn, user_params["email"], user_params["password"], repo: Repo) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user)
        jwt = Guardian.Plug.current_token(new_conn)
        # {:ok, claims} = Guardian.Plug.claims(new_conn)
        # exp = Map.get(claims, "exp")

        new_conn
        |> put_resp_header("authorization", "Videosync #{jwt}")
        # |> put_resp_header("x-expires", exp)
        |> put_status(:created)
        |> render("show.json", user: user, jwt: jwt)
      {:error, :not_found} ->
        conn
        |> put_status(404)
        |> render(Videosync.ErrorView, "error.json", message: "User not found")
      {:error, :unauthorized} ->
        conn
        |> put_status(401)
        |> render(Videosync.ErrorView, "error.json", message: "Incorrect password")
    end
  end

  def delete(conn, %{"id" => _}) do
    send_resp(conn, :no_content, "")
  end
end

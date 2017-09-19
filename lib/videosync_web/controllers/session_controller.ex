defmodule VideosyncWeb.SessionController do
  use VideosyncWeb, :controller

  alias VideosyncWeb.Auth

  def create(conn, %{"user" => user_params}) do
    opts = Keyword.new repo: Repo
    opts = case user_params["remember_me"] do
      true ->
        Keyword.merge(opts, ttl: { 7, :days })
      _ ->
        opts
    end

    case Auth.login_by_email_and_password(
          conn,
          user_params["email"],
          user_params["password"],
          opts) do
      {:ok, user, _} ->
        conn = case user_params["remember_me"] do
          true ->
            Auth.login(conn, user, ttl: { 7, :days })
          false ->
            Auth.login(conn, user)
        end

        conn
        |> put_status(:created)
        |> render(VideosyncWeb.UserView, "show.json", user: user)
      {:error, :not_found, conn} ->
        conn
        |> put_status(404)
        |> render(VideosyncWeb.ErrorView, :"404", errors: %{email: "Email not found"})
      {:error, :unauthorized, conn} ->
        conn
        |> put_status(401)
        |> render(VideosyncWeb.ErrorView, :"401", errors: %{password: "Incorrect Password"})
    end
  end

  def delete(conn, %{"id" => _}) do
    send_resp(conn, :no_content, "")
  end
end

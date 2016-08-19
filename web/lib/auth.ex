defmodule Videosync.Auth do
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]

  @realm "Videosync"

  def login(conn, user) do
    Guardian.Plug.api_sign_in(conn, user)
    |> set_authorization_header
    |> set_expire_header
  end

  def login_by_email_and_password(conn, email, given_pass, opts) do
    repo = Keyword.fetch!(opts, :repo)
    user = repo.get_by(Videosync.User, email: email)

    cond do
      user && checkpw(given_pass, user.password_hash) ->
        {:ok, user, login(conn, user)}
      user ->
        {:error, :unauthorized, conn}
      true ->
        dummy_checkpw()
        {:error, :not_found, conn}
    end
  end

  defp set_authorization_header(conn) do
    jwt = Guardian.Plug.current_token(conn)
    Plug.Conn.put_resp_header(conn, "authorization", "#{@realm} #{jwt}")
  end

  defp set_expire_header(conn) do
    {:ok, claims} = Guardian.Plug.claims(conn)
    exp = Map.get(claims, "exp")

    Plug.Conn.put_resp_header(conn, "x-expires", "#{exp}")
  end
end

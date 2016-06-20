defmodule Videosync.Auth do
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]

  def login(conn, user) do
    new_conn = Guardian.Plug.api_sign_in(conn, user)
    jwt = Guardian.Plug.current_token(new_conn)
    # {:ok, claims} = Guardian.Plug.claims(new_conn)
    # exp = Map.get(claims, "exp")

    Plug.Conn.put_resp_header(new_conn, "authorization", "Videosync #{jwt}")
    # |> put_resp_header("x-expires", exp)
  end

  def login_by_email_and_password(conn, email, given_pass, opts) do
    repo = Keyword.fetch!(opts, :repo)
    user = repo.get_by(Videosync.User, email: email)

    cond do
      user && checkpw(given_pass, user.password_hash) ->
        {:ok, login(conn, user)}
      user ->
        {:error, :unauthorized, conn}
      true ->
        dummy_checkpw()
        {:error, :not_found, conn}
    end
  end
end

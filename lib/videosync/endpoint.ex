defmodule Videosync.Endpoint do
  use Phoenix.Endpoint, otp_app: :videosync

  socket "/socket", Videosync.UserSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/", from: :videosync, gzip: false,
    only: ~w(css fonts images js favicon.ico robots.txt)
    # CORS ON ASSETS,
    # headers: %{"Access-Control-Allow-Origin" => "*"}

  plug Plug.Static,
    at: "/uploads", from: Path.expand('./uploads'), gzip: false

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_videosync_key",
    signing_salt: "Dnp7i+Ep"

  plug Videosync.CORS

  plug Videosync.Router
end

use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :videosync, VideosyncWeb.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [node: ["node_modules/brunch/bin/brunch", "watch", "--stdin",
             cd: Path.expand("../assets", __DIR__)]]

# Watch static and templates for browser reloading.
config :videosync, VideosyncWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{lib/videosync_web/views/.*(ex)$},
      ~r{lib/videosync_web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :videosync, Videosync.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "videosync",
  password: "videosync",
  database: "videosync_dev",
  hostname: "localhost",
  pool_size: 10

# Configure Bamboo dev
config :videosync, VideosyncWeb.Mailer,
  adapter: Bamboo.SendinBlueAdapter,
  api_key: System.get_env("SENDINBLUE_API_KEY")

# config :videosync, Videosync.Mailer,
#   adapter: Bamboo.SMTPAdapter,
#   server: System.get_env("BAMBOO_MAILER_SERVER"),
#   port: 587, # tls / 465 ssl
#   username: System.get_env("BAMBOO_MAILER_USERNAME"),
#   password: System.get_env("BAMBOO_MAILER_PASSWORD"),
#   tls: :if_available, # can be `:always` or `:never`
#   ssl: false, # can be `true`
#   retries: 1

# arc/ex_aws configuration
# enable for S3 storage mode
config :arc,
  storage: Arc.Storage.Local
#   bucket: "zinkroo",
#   virtual_host: true
#
# config :ex_aws,
#   access_key_id: [{:system, "AWS_ACCESS_KEY_ID"}, :instance_role],
#   secret_access_key: [{:system, "AWS_SECRET_ACCESS_KEY"}, :instance_role],
#   region: "eu-west-1",
#   s3: [
#     scheme: "https://",
#     host: "s3-eu-west-1.amazonaws.com",
#     region: "eu-west-1"
#   ]

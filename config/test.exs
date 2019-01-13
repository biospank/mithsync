use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :videosync, VideosyncWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :videosync, Videosync.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "videosync",
  password: "videosync",
  database: "videosync_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# Configure Bamboo test
config :bamboo, :refute_timeout, 10

config :videosync, VideosyncWeb.Mailer,
  adapter: Bamboo.TestAdapter

# used on testing
config :arc,
  storage: Arc.Storage.Local, # changed by test
  bucket: "zinkroo",
  virtual_host: true

config :ex_aws,
  access_key_id: [{:system, "AWS_ACCESS_KEY_ID"}, :instance_role],
  secret_access_key: [{:system, "AWS_SECRET_ACCESS_KEY"}, :instance_role],
  region: "eu-west-1",
  s3: [
    scheme: "https://",
    host: "s3-eu-west-1.amazonaws.com",
    region: "eu-west-1"
  ]

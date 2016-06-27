# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

config :videosync,
  ecto_repos: [Videosync.Repo]

# Configures the endpoint
config :videosync, Videosync.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "w4Q8/jD33oLOnxgO3lN858dgkfRINx/ufd5SteGOav7aP5xwzm49RG/U7cfDumFQ",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: Videosync.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false

# Guardian configuration
config :guardian, Guardian,
  allowed_algos: ["HS512"],
  verify_module: Guardian.JWT,
  issuer: "Videosync",
  ttl: { 30, :days},
  verify_issuer: true,
  secret_key: "videosync-secret-key", # TODO env variable
  serializer: Videosync.GuardianSerializer

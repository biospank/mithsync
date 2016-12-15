defmodule Videosync.Mixfile do
  use Mix.Project

  def project do
    [app: :videosync,
     version: "0.0.1",
     elixir: "~> 1.0",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases,
     deps: deps]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {Videosync, []},
     applications: [:phoenix,
                    :phoenix_pubsub,
                    :phoenix_html,
                    :cowboy,
                    :logger,
                    :gettext,
                    :phoenix_ecto,
                    :postgrex,
                    :ex_aws,
                    :httpoison,
                    :timex,
                    # enable corsica
                    # :corsica,
                    :bamboo]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:phoenix, "~> 1.2.0"},
     {:phoenix_pubsub, "~> 1.0"},
     {:postgrex, ">= 0.0.0"},
     {:ecto, "~> 2.0.1"},
     {:phoenix_ecto, "~> 3.0"},
     {:phoenix_html, "~> 2.6"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:gettext, "~> 0.11"},
     {:cowboy, "~> 1.0"},
     {:comeonin, "~> 2.5.2"},
     {:guardian, "~> 0.12.0"},
     {:bamboo_smtp, "~> 1.1"},
     {:arc, "~> 0.5.3"},
     {:ex_aws, "~> 0.5.0"},
     {:httpoison, "~> 0.7"},
     {:poison, "~> 1.2"},
     {:timex, "~> 3.1.5"},
     # enable corsica
     # {:corsica, "~> 0.5"},
     {:sweet_xml, "~> 0.6.1"},
     {:scrivener_list, "~> 1.0"}]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
     "test": ["ecto.drop --quiet", "ecto.create --quiet", "ecto.migrate", "test"]]
  end
end

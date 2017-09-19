defmodule Videosync.Mixfile do
  use Mix.Project

  def project do
    [app: :videosync,
     version: "1.1.0",
     elixir: "~> 1.5.1",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases(),
     deps: deps()]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Videosync.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
    #  applications: [:phoenix,
    #                 :phoenix_pubsub,
    #                 :phoenix_html,
    #                 :cowboy,
    #                 :logger,
    #                 :gettext,
    #                 :phoenix_ecto,
    #                 :postgrex,
    #                 :ex_aws,
    #                 :httpoison,
    #                 :timex,
    #                 # enable corsica
    #                 # :corsica,
    #                 :bamboo]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.3.0"},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.2"},
      {:postgrex, "~> 0.13.3"},
      {:ecto, "~> 2.2.4"},
      {:phoenix_html, "~> 2.10"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.11"},
      {:cowboy, "~> 1.0"},
      {:comeonin, "~> 2.5.2"},
      {:guardian, "~> 0.12.0"},
      {:bamboo_sendinblue, "~> 0.1.0"},
      {:arc, "~> 0.8"},
      {:ex_aws, "~> 1.1"},
      {:httpoison, "~> 0.11"},
      {:poison, "~> 2.2"},
      {:timex, "~> 3.1.5"},
      # enable corsica
      # {:corsica, "~> 0.5"},
      {:sweet_xml, "~> 0.6.1"},
      {:scrivener_list, "~> 1.0.1"}
    ]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      "test": ["ecto.drop --quiet", "ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end

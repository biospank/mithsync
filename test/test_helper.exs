ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Videosync.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Videosync.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Videosync.Repo)


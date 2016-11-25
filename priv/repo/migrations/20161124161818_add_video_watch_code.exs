defmodule Videosync.Repo.Migrations.AddVideoWatchCode do
  use Ecto.Migration

  def change do
    alter table(:videos) do
      add :watch_code, :string, null: false, default: ""
    end

    create index(:videos, [:watch_code])

  end
end

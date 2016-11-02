defmodule Videosync.Repo.Migrations.AddVideoLayout do
  use Ecto.Migration

  def change do
    alter table(:videos) do
      add :layout, :integer, null: false, default: 1
    end
  end
end

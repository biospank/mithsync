defmodule Videosync.Repo.Migrations.CreateVideo do
  use Ecto.Migration

  def change do
    create table(:videos) do
      add :url, :string
      add :title, :string
      add :description, :text
      add :user_id, references(:users, on_delete: :nothing)
      add :project_id, references(:projects, on_delete: :delete_all)

      timestamps
    end

    create index(:videos, [:user_id])
    create index(:videos, [:project_id])

  end
end

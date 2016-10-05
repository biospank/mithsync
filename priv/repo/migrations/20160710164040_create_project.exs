defmodule Videosync.Repo.Migrations.CreateProject do
  use Ecto.Migration

  def change do
    create table(:projects) do
      add :name, :string
      add :video_count, :integer, null: false, default: 0
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:projects, [:user_id])

  end
end

defmodule Videosync.Repo.Migrations.CreateSlide do
  use Ecto.Migration

  def change do
    create table(:slides) do
      add :url, :string
      add :start, :integer
      add :end, :integer
      add :video_id, references(:videos, on_delete: :delete_all)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:slides, [:video_id])
    create index(:slides, [:user_id])

  end
end

defmodule Videosync.Repo.Migrations.CreateLayout do
  use Ecto.Migration

  def change do
    create table(:layouts) do
      add :theme, :integer, default: 1, null: false
      add :show_title, :boolean, default: false, null: false
      add :show_description, :boolean, default: false, null: false
      add :show_date, :boolean, default: false, null: false
      add :show_slider, :boolean, default: false, null: false
      add :video_id, references(:videos, on_delete: :delete_all)

      timestamps()
    end
    
    create index(:layouts, [:video_id])

  end
end

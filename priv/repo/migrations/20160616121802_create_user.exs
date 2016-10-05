defmodule Videosync.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :password_hash, :string
      add :activation_code, :string
      add :reset_code, :string
      add :active, :boolean, default: false
      add :project_count, :integer, default: 0

      timestamps
    end

    create unique_index(:users, [:email])

  end
end

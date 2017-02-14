defmodule Videosync.Repo.Migrations.AddTermsAndConditions do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :accept_terms_and_conditions, :boolean, null: false, default: false
    end
  end
end

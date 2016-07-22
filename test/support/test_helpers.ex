defmodule Videosync.TestHelpers do
  alias Videosync.Repo
  alias Videosync.User

  def insert_user(attrs \\ %{}) do
    changes = Dict.merge(%{
      email: "some@content",
      password: "secret",
      password_confirmation: "secret"
    }, attrs)

    %User{}
    |> User.registration_changeset(changes)
    |> Repo.insert!
  end

  def insert_video(user, attrs \\ %{}) do
    user
    |> Ecto.build_assoc(:videos, attrs)
    |> Repo.insert!
  end
end

defmodule VideosyncWeb.TestHelpers do
  alias Videosync.Repo
  alias Videosync.Accounts.User

  def insert_user(attrs \\ %{}) do
    changes = Map.merge(%{
      email: "some@content",
      password: "secret",
      password_confirmation: "secret",
      accept_terms_and_conditions: true
    }, attrs)

    %User{}
    |> User.registration_changeset(changes)
    |> Repo.insert!
  end

  def insert_project(user, attrs \\ %{}) do
    user
    |> Ecto.build_assoc(:projects, attrs)
    |> Repo.insert!
  end

  def insert_video(user, project, attrs \\ %{}) do
    user
    |> Ecto.build_assoc(:videos, Map.merge(attrs, %{project_id: project.id}))
    |> Repo.insert!
  end

  def insert_slide(user, video, attrs \\ %{}) do
    user
    |> Ecto.build_assoc(:slides, Map.merge(attrs, %{video_id: video.id}))
    |> Repo.insert!
  end

  def insert_layout(video, attrs \\ %{}) do
    video
    |> Ecto.build_assoc(:layout, Map.merge(attrs, %{video_id: video.id}))
    |> Repo.insert!
  end
end

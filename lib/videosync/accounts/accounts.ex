defmodule Videosync.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Videosync.Repo

  alias Videosync.Accounts.User

  def list_users do
    Repo.all(User)
  end

  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by(column, value) do
    Repo.one(from u in User, where: field(u, ^column) == ^value)
  end

  def create_user(attrs \\ %{}) do
    %Videosync.Accounts.User{}
    |> User.registration_changeset(attrs)
    |> Repo.insert()
  end

  def update_user(%Videosync.Accounts.User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def delete_user(%Videosync.Accounts.User{} = user) do
    Repo.delete(user)
  end

  def change_user(%Videosync.Accounts.User{} = user) do
    User.changeset(user, %{})
  end
end

defmodule Videosync.AccountsTest do
  use Videosync.DataCase

  alias Videosync.Accounts

  describe "users" do
    alias Videosync.Accounts.User

    @valid_attrs %{
      email: "some@content",
      password: "secret",
      password_confirmation: "secret",
      accept_terms_and_conditions: true
    }
    @update_attrs %{
      email: "valid@email.com"
    }
    @invalid_attrs %{
      email: "invalid-email"
    }

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user_fixture()
      refute Accounts.list_users() |> Enum.empty?
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id)
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{}} = Accounts.create_user(@valid_attrs)
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Accounts.update_user(user, @update_attrs)
      assert %User{} = user
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end
end

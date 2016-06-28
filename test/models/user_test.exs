defmodule Videosync.UserTest do
  use Videosync.ModelCase

  alias Videosync.User

  @valid_attrs %{
    email: "some@content",
    password: "secret",
    password_confirmation: "secret"
  }
  @invalid_email %{email: "some content", password: "secret"}
  @invalid_password %{email: "some@content", password: "pass"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "changeset with invalid email format" do
    changeset = User.changeset(%User{}, @invalid_email)
    refute changeset.valid?
    assert Keyword.get(changeset.errors, :email) == {"has invalid format", []}
  end

  test "registration changeset with invalid password" do
    changeset = User.registration_changeset(%User{}, @invalid_password)
    refute changeset.valid?
    assert Keyword.get(changeset.errors, :password) == {"should be at least %{count} character(s)", [count: 6]}
  end

  @invalid_password_confirmation %{
    email: "some@content",
    password: "secret",
    password_confirmation: "terces"
  }
  test "registration changeset with invalid password confirmation" do
    changeset = User.registration_changeset(%User{}, @invalid_password_confirmation)
    refute changeset.valid?
    assert Keyword.get(changeset.errors, :password_confirmation) == {"does not match confirmation", []}
  end

  @empty_password_confirmation %{
    email: "some@content",
    password: "secret",
    password_confirmation: ""
  }
  test "registration changeset with empty password confirmation" do
    changeset = User.registration_changeset(%User{}, @empty_password_confirmation)
    refute changeset.valid?
    assert Keyword.get(changeset.errors, :password_confirmation) == {"does not match confirmation", []}
  end

  # @duplicate_email %{
  #   email: "some@content",
  #   password: "secret",
  #   password_confirmation: "secret"
  # }
  # test "registration changeset with duplicate email" do
  #   Repo.insert! User.registration_changeset(%User{}, @valid_attrs)
  #   {:error, changeset} = Repo.insert User.registration_changeset(%User{}, @duplicate_email)
  #   refute changeset.valid?
  #   assert Keyword.get(changeset.errors, :email) == {"has already been taken", []}
  # end
end

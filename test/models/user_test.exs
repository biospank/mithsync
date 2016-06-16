defmodule Videosync.UserTest do
  use Videosync.ModelCase

  alias Videosync.User

  @valid_attrs %{email: "some@content", password: "secret"}
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
  end

  test "registration changeset with invalid password length" do
    changeset = User.registration_changeset(%User{}, @invalid_password)
    refute changeset.valid?
  end
end

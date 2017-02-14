defmodule Videosync.UserTest do
  use Videosync.ModelCase

  alias Videosync.User

  @valid_attrs %{
    email: "some@content",
    password: "secret",
    password_confirmation: "secret",
    accept_terms_and_conditions: true
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
    changeset = User.changeset(%User{}, Map.put(@valid_attrs, :email, "some content"))
    refute changeset.valid?
    assert changeset.errors[:email] == {"has invalid format", []}
  end

  test "registration changeset with invalid password" do
    changeset = User.registration_changeset(%User{}, Map.put(@valid_attrs, :password, "pass"))
    refute changeset.valid?
    assert changeset.errors[:password] == {"should be at least %{count} character(s)", [count: 6]}
  end

  test "registration changeset with invalid password confirmation" do
    changeset = User.registration_changeset(%User{}, Map.put(@valid_attrs, :password_confirmation, "terces"))
    refute changeset.valid?
    assert changeset.errors[:password_confirmation] == {"does not match password", []}
  end

  test "registration changeset with empty password confirmation" do
    changeset = User.registration_changeset(%User{}, Map.put(@valid_attrs, :password_confirmation, ""))
    refute changeset.valid?
    assert changeset.errors[:password_confirmation] == {"does not match password", []}
  end

  test "registration changeset without accept terms and conditions" do
    changeset = User.registration_changeset(%User{}, Map.delete(@valid_attrs, :accept_terms_and_conditions))
    refute changeset.valid?
    assert changeset.errors[:accept_terms_and_conditions] == {"can't be blank", []}
  end

  test "registration changeset with accept terms and conditions set to valse" do
    changeset = User.registration_changeset(%User{}, Map.put(@valid_attrs, :accept_terms_and_conditions, false))
    refute changeset.valid?
    assert changeset.errors[:accept_terms_and_conditions] == {"is invalid", []}
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
  #   assert changeset.errors[:email == "has already been taken"
  # end
end

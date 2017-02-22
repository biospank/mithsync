defmodule Videosync.ContactTest do
  use Videosync.ModelCase

  alias Videosync.Contact

  @valid_attrs %{
    email: "test@example.com",
    message: "some content",
    name: "Test",
    phone: "99382387822"
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Contact.changeset(%Contact{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Contact.changeset(%Contact{}, @invalid_attrs)
    refute changeset.valid?
  end
end

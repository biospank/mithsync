defmodule Videosync.LayoutTest do
  use Videosync.ModelCase

  alias Videosync.Layout

  @valid_attrs %{show_date: true, show_description: true, show_slider: true, show_title: true, theme: 42}
  @invalid_attrs %{show_date: nil}

  test "changeset with valid attributes" do
    changeset = Layout.changeset(%Layout{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Layout.changeset(%Layout{}, @invalid_attrs)
    refute changeset.valid?
  end
end

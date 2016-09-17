defmodule Videosync.SlideTest do
  use Videosync.ModelCase

  alias Videosync.Slide

  @valid_attrs %{end: 60, start: 20, url: "/upload/33/images/slide/one", thumb_url: "/upload/33/images/thumb/one"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Slide.changeset(%Slide{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Slide.changeset(%Slide{}, @invalid_attrs)
    refute changeset.valid?
  end
end

defmodule VideosyncWeb.VideoTest do
  use VideosyncWeb.ModelCase

  alias VideosyncWeb.Video

  @valid_attrs %{description: "some content", title: "some content", url: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Video.changeset(%Video{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Video.changeset(%Video{}, @invalid_attrs)
    refute changeset.valid?
  end

  # test "filter_by with a filter" do
  #   query = Video.filter_by(Video, "test")
  #   assert query == Ecto.Queryable
  # end
end

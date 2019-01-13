defmodule Videosync.AssetsTest do
  use Videosync.DataCase

  alias Videosync.Assets

  doctest Videosync.Assets

  describe "images" do
    alias Videosync.Assets.Scope

    test "map_all_images/3 returns all images" do
      images = Assets.map_all_images(
        [{"file1.png", 200, "png"}, {"file2.png", 200, "png"}],
        %Scope{user_id: 1, project_id: 2, video_id: 3},
        "file1"
      )
      refute images |> Enum.empty?
    end

  end
end

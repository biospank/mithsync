defmodule Videosync.Assets do
  @moduledoc """
  The Assets context.
  """

  import Ecto.Query, warn: false

  alias Videosync.Assets.Image

  @doc """
  return an array of image struct

  ## Examples
      # local storage

      iex> Application.put_env(:arc, :storage, Arc.Storage.Local)
      iex> files = [{"file1.png", 200, "2017-04-21"}, {"file2.png", 200, "2017-04-21"}]
      iex> scope = %Videosync.Assets.Scope{user_id: 1, project_id: 2, video_id: 3}
      iex> filter = "file1"
      iex> Assets.map_all_images(files, scope, filter)
      [%Videosync.Assets.Image{
         id: nil, last_modified: "2017-04-21", name: "file1.png", size: 200,
         slide_url: "/uploads/1/2/3/images/slide/file1.png",
         thumb_url: "/uploads/1/2/3/images/thumb/file1.png"
      }]

      # s3 storage

      iex> Application.put_env(:arc, :storage, Arc.Storage.S3)
      iex> files = [{"file1.png", 200, "2017-04-21"}, {"file2.png", 200, "2017-04-21"}]
      iex> scope = %Videosync.Assets.Scope{user_id: 1, project_id: 2, video_id: 3}
      iex> filter = "file1"
      iex> Assets.map_all_images(files, scope, filter)
      [%Videosync.Assets.Image{
         id: nil, last_modified: "2017-04-21", name: "file1.png", size: 200,
         slide_url: "https://zinkroo.s3.amazonaws.com/uploads/1/2/3/images/slide/file1.png",
         thumb_url: "https://zinkroo.s3.amazonaws.com/uploads/1/2/3/images/thumb/file1.png"
      }]

  """
  def map_all_images(files, scope, filter) do
    Stream.filter(files, fn({file_name, _, _}) ->
      String.contains?(file_name, filter || "")
    end)
    |> Enum.map(fn({file_name, size, last_modified}) ->
      %Image{
        name: file_name,
        size: size,
        thumb_url: VideosyncWeb.ArcImage.url({file_name, scope}, :thumb),
        slide_url: VideosyncWeb.ArcImage.url({file_name, scope}, :slide),
        last_modified: last_modified
      }
    end)
  end
end

defmodule Videosync.ImageProxy do
  alias Videosync.ArcImage
  alias Videosync.Image

  def list(opts \\ %{}) do
    case ArcImage.__storage do
      Arc.Storage.S3 ->
        user = Map.fetch(opts, :user)
        list(:s3, Map.merge(%{prefix: "uploads/#{user.id}/images/thumb"}, opts))
      Arc.Storage.Local ->
        list(:local, opts)
    end
  end

  defp list(:local, opts) do
    user = Map.fetch(opts, :user)

    case File.ls(ArcImage.storage_dir(:thumb, {nil, user})) do
      {:ok, files} ->
        images = Image.map_all(files, user, Map.fetch(opts, :filter))
        {:ok, images}
      {:error, _} ->
        {:error, "no records found"}
    end
  end

  defp list(:s3, opts) do
    user = Map.fetch(opts, :user)
    {:ok, bucket} = Application.fetch_env(:arc, :bucket)

    case ExAws.S3.list_objects(bucket, Map.fetch(opts, :prefix)) do
      {:ok, %{body: %{contents: []}}} ->
        {:error, "no records found"}
      {:ok, %{body: %{contents: contents}}} ->
        images =
          get_file_names(contents)
          |> Image.map_all(user, Map.fetch(opts, :filter))
        {:ok, images}
    end
  end

  defp get_file_names(path_files) do
    Enum.map(path_files, fn(file) ->
      String.split(file, "/") |> List.last
    end)
  end
end

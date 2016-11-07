defmodule Videosync.ImageProxy do
  alias Videosync.ArcImage
  alias Videosync.Image

  def list(opts \\ %{}) do
    case ArcImage.__storage do
      Arc.Storage.S3 ->
        {:ok, scope} = Map.fetch(opts, :scope)
        {:ok, filter} = Map.fetch(opts, :filter)

        prefix = "uploads/#{scope.user_id}/#{scope.project_id}/#{scope.video_id}/images/thumb"

        with {:ok, contents} <- list(:s3, Map.merge(%{prefix: prefix}, opts)),
             {:ok, keys} <- get_key_names(contents),
             {:ok, names} <- get_file_names(keys),
        do: {:ok, Image.map_all(names, scope, filter)}

      Arc.Storage.Local ->
        list(:local, opts)
    end
  end

  def bulk_delete(opts \\ %{}) do
    case ArcImage.__storage do
      Arc.Storage.S3 ->
        delete_all(:s3, opts)
      Arc.Storage.Local ->
        delete_all(:local, opts)
    end
  end

  defp list(:local, opts) do
    {:ok, scope} = Map.fetch(opts, :scope)
    {:ok, filter} = Map.fetch(opts, :filter)

    case File.ls(ArcImage.storage_dir(:thumb, {nil, scope})) do
      {:ok, files} ->
        images = Image.map_all(files, scope, filter)
        {:ok, images}
      {:error, _} ->
        {:error, "no records found"}
    end
  end

  defp list(:s3, opts) do
    {:ok, prefix} = Map.fetch(opts, :prefix)
    {:ok, bucket} = Application.fetch_env(:arc, :bucket)

    case ExAws.S3.list_objects(bucket, prefix: prefix) do
      {:ok, %{body: %{contents: contents}}} ->
        {:ok, contents}
    end
  end

  defp delete_all(:local, opts) do
    {:ok, scope} = Map.fetch(opts, :scope)

    prefix = "uploads/#{scope}"

    File.rm_rf(prefix)
  end

  defp delete_all(:s3, opts) do
    {:ok, scope} = Map.fetch(opts, :scope)
    {:ok, bucket} = Application.fetch_env(:arc, :bucket)

    prefix = "uploads/#{scope}"

    with {:ok, contents} <- list(:s3, Map.merge(%{prefix: prefix}, opts)),
          {:ok, objects} <- get_key_names(contents),
    do: {:ok, ExAws.S3.delete_all_objects(bucket, objects)}

  end

  defp get_file_names([]), do: {:error, "no records found"}
  defp get_file_names(paths) do
    {
      :ok,
      Enum.map(paths, fn(path) ->
        String.split(path, "/") |> List.last
      end)
    }
  end

  defp get_key_names([]), do: {:ok, []}
  defp get_key_names(contents) do
    {
      :ok,
      Enum.map(contents, fn(%{key: file_path}) ->
        file_path
      end)
    }
  end
end

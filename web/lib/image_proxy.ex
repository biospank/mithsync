defmodule Videosync.ImageProxy do
  alias Videosync.ArcImage
  alias Videosync.Image

  def list(opts \\ %{}) do
    case ArcImage.__storage do
      Arc.Storage.S3 ->
        list(:s3, opts)
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

    with {:ok, contents} <- File.ls(ArcImage.storage_dir(:thumb, {nil, scope})),
         {:ok, files} <- get_files_info(:local, contents, scope),
    do: {:ok, Image.map_all(files, scope, filter)}

  end

  defp list(:s3, opts) do
    {:ok, scope} = Map.fetch(opts, :scope)
    {:ok, filter} = Map.fetch(opts, :filter)
    {:ok, bucket} = Application.fetch_env(:arc, :bucket)

    prefix = "uploads/#{scope.user_id}/#{scope.project_id}/#{scope.video_id}/images/thumb"

    with {:ok, %{body: %{contents: contents}}} = ExAws.S3.list_objects(bucket, prefix: prefix),
         {:ok, files} <- get_files_info(:s3, contents, scope),
    do: {:ok, Image.map_all(files, scope, filter)}

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

  defp get_key_names([]), do: {:ok, []}
  defp get_key_names(contents) do
    {
      :ok,
      Enum.map(contents, fn(%{key: file_path}) ->
        file_path
      end)
    }
  end

  defp get_files_info(:s3, [], _), do: {:error, "no records found"}
  defp get_files_info(:local, [], _), do: {:error, "no records found"}
  defp get_files_info(:s3, contents, _) do
    {
      :ok,
      Enum.map(contents, fn(%{key: path, size: size, last_modified: last_modified}) ->
        { String.split(path, "/") |> List.last, size, last_modified }
      end)
    }
  end
  defp get_files_info(:local, files, scope) do
    {
      :ok,
      Enum.map(files, fn(file) ->
        {:ok, %File.Stat{size: size, mtime: {date, _time}}} = File.lstat(ArcImage.url({file, scope}, :thumb))

        { file, Integer.to_string(size), Date.from_erl!(date) |> Date.to_iso8601 }
      end)
    }
  end
end

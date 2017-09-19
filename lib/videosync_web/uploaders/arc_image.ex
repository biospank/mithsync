defmodule VideosyncWeb.ArcImage do
  use Arc.Definition

  # Include ecto support (requires package arc_ecto installed):
  # use Arc.Ecto.Definition

  @versions [:original, :thumb, :slide]

  # def __storage, do: Arc.Storage.S3 / Arc.Storage.Local
  def __storage do
    Application.fetch_env!(:arc, :storage)
  end

  # To add a thumbnail version:
  # @versions [:original, :thumb]

  # Whitelist file extensions:
  def validate({file, _}) do
    ~w(.jpg .jpeg .gif .png) |> Enum.member?(String.downcase(Path.extname(file.file_name)))
  end

  # Define a thumbnail transformation:
  def transform(:thumb, _) do
    {:convert, "-strip -thumbnail 250x250^ -gravity center -extent 250x250 -format png", :png}
  end

  # Define a slide transformation:
  def transform(:slide, _) do
    # {:convert, "-strip -resize 500x281^ -gravity center -extent 500x281^ -format png", :png}
    {:convert, "-strip -resize 800x450^ -gravity center -extent 800x450^ -format png", :png}
  end

  # Override the persisted filenames:
  # def filename(version, {file, scope}) do
  #   version
  # end

  # Override the storage directory:
  def storage_dir(version, {_, scope}) do
    "uploads/#{scope.user_id}/#{scope.project_id}/#{scope.video_id}/images/#{version}"
  end

  # Provide a default URL if there hasn't been a file uploaded
  # def default_url(version, scope) do
  #   "/images/avatars/default_#{version}.png"
  # end

  # Specify custom headers for s3 objects
  # Available options are [:cache_control, :content_disposition,
  #    :content_encoding, :content_length, :content_type,
  #    :expect, :expires, :storage_class, :website_redirect_location]
  #
  # def s3_object_headers(version, {file, scope}) do
  # uncomment for S3 storage mode
  # def s3_object_headers(_, {file, _}) do
  #   [content_type: Plug.MIME.path(file.file_name)]
  # end
end

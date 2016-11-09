defmodule Videosync.Image do
  use Videosync.Web, :model

  schema "images" do
    field :name, :string, virtual: true
    field :size, :string, virtual: true
    field :thumb_url, :string, virtual: true
    field :slide_url, :string, virtual: true
    field :last_modified, :string, virtual: true
  end

  @required_fields ~w()
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def map_all(files, scope, filter) do
    Stream.filter(files, fn({file_name, _, _}) ->
      String.contains?(file_name, filter || "")
    end)
    |> Enum.map(fn({file_name, size, last_modified}) ->
      %Videosync.Image{
        name: file_name,
        size: size,
        thumb_url: Videosync.ArcImage.url({file_name, scope}, :thumb),
        slide_url: Videosync.ArcImage.url({file_name, scope}, :slide),
        last_modified: last_modified
      }
    end)
  end
end

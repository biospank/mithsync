defmodule Videosync.Image do
  use Videosync.Web, :model

  schema "images" do
    field :name, :string, virtual: true
    field :path, :string, virtual: true
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

  def map_all(files, user, type \\ :thumb) do
    Enum.map(files, fn(file_name) ->
      %Videosync.Image{
        name: file_name,
        path: Videosync.ArcImage.url({file_name, user}, type)
      }
    end)
  end
end

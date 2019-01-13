defmodule Videosync.Assets.Image do
  use Ecto.Schema
  import Ecto.Changeset

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
end

defmodule Videosync.Contents.Layout do
  use Ecto.Schema

  import Ecto.Query, warn: false
  import Ecto.Changeset

  schema "layouts" do
    field :theme, :integer, default: 1
    field :show_title, :boolean, default: false
    field :show_description, :boolean, default: false
    field :show_date, :boolean, default: false
    field :show_slider, :boolean, default: false
    belongs_to :video, Videosync.Contents.Video

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:theme, :show_title, :show_description, :show_date, :show_slider])
    |> validate_required([:theme, :show_title, :show_description, :show_date, :show_slider])
  end

  def belongs_to_model(query, model, value) do
    from l in query, where: field(l, ^model) == ^value
  end
end

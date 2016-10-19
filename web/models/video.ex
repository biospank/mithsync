defmodule Videosync.Video do
  use Videosync.Web, :model

  alias Videosync.Repo

  schema "videos" do
    field :url, :string
    field :poster_url, :string
    field :title, :string
    field :description, :string
    field :slide_count, :integer
    belongs_to :user, Videosync.User
    belongs_to :project, Videosync.Project
    has_many :slides, Videosync.Slide

    timestamps
  end

  @required_fields ~w(url title description)
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

  def create_changeset(struct, params \\ %{}) do
    changeset(struct, params)
    |> prepare_changes(fn(change) ->
        assoc(change.data, :project)
        |> Repo.update_all(inc: [video_count: 1])

        change
      end)
  end

  def delete_changeset(struct) do
    change(struct)
    |> prepare_changes(fn(change) ->
        assoc(change.data, :project)
        |> Repo.update_all(inc: [video_count: -1])

        change
      end)
  end

  def filter_by(query, filter) do
    from v in query,
      where: ilike(v.title, ^"%#{filter || ""}%") or
        ilike(v.description, ^"%#{filter || ""}%")
  end

  def order_by(query, order) do
    from v in query, order_by: field(v, ^order)
  end

  def limit(query, size) do
    from v in query, limit: ^size
  end

  def own_by(user) do
    assoc(user, :videos)
  end

  def belongs_to_model(query, model, value) do
    from v in query, where: field(v, ^model) == ^value
  end

  def preload_slides(query, preload_query) do
    from v in query, preload: [slides: ^preload_query]
  end
end

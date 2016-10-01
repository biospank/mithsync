defmodule Videosync.Video do
  use Videosync.Web, :model

  schema "videos" do
    field :url, :string
    field :title, :string
    field :description, :string
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

  def filter_by(query, filter) do
    from v in query,
      where: ilike(v.title, ^"%#{filter || ""}%") or
        ilike(v.description, ^"%#{filter || ""}%")
  end

  def order_by(query, order) do
    from v in query, order_by: field(v, ^order)
  end

  def own_by(user, project) do
    query = assoc(user, :videos)
    from v in query, where: v.project_id == ^project
  end

  def preload_slides(query, preload_query) do
    from v in query, preload: [slides: ^preload_query]
  end
end

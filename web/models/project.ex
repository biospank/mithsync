defmodule Videosync.Project do
  use Videosync.Web, :model

  schema "projects" do
    field :name, :string
    belongs_to :user, Videosync.User
    has_many :videos, Videosync.Video

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end

  def filter_by(query, term) do
    from p in query,
      where: ilike(p.name, ^"%#{term || ""}%")
  end

  def order_by(query, order) do
    from p in query, order_by: field(p, ^order)
  end

  def own_by(user) do
    assoc(user, :projects)
  end
end

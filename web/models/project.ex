defmodule Videosync.Project do
  use Videosync.Web, :model

  alias Videosync.Repo

  schema "projects" do
    field :name, :string
    field :video_count, :integer
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

  def create_changeset(struct, params \\ %{}) do
    changeset(struct, params)
    |> prepare_changes(fn(change) ->
        assoc(change.data, :user)
        |> Repo.update_all(inc: [project_count: 1])

        change
      end)
  end

  def delete_changeset(struct) do
    change(struct)
    |> prepare_changes(fn(change) ->
        assoc(change.data, :user)
        |> Repo.update_all(inc: [project_count: -1])

        change
      end)
  end

  def filter_by(query, term) do
    from p in query,
      where: ilike(p.name, ^"%#{term || ""}%")
  end

  def order_by(query, order) do
    case order do
      :inserted_at ->
        from p in query, order_by: [desc: field(p, ^order)]
      _ ->
        from p in query, order_by: field(p, ^order)
    end
  end

  def limit(query, size) do
    from v in query, limit: ^size
  end

  def own_by(user) do
    assoc(user, :projects)
  end
end

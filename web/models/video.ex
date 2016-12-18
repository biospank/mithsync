defmodule Videosync.Video do
  use Videosync.Web, :model

  alias Videosync.{Repo, Crypto}

  schema "videos" do
    field :url, :string
    field :title, :string
    field :description, :string
    field :slide_count, :integer
    field :watch_code, :string
    belongs_to :user, Videosync.User
    belongs_to :project, Videosync.Project
    has_many :slides, Videosync.Slide
    has_one :layout, Videosync.Layout

    timestamps
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:url, :title, :description])
    |> validate_required([:url, :title, :description])
  end

  def create_changeset(struct, params \\ %{}) do
    changeset(struct, params)
    |> put_watch_code()
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
    case order do
      ts when ts in [:inserted_at, :updated_at] ->
        from v in query, order_by: [desc: field(v, ^order)]
      _ ->
        from v in query, order_by: field(v, ^order)
    end
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

  def preload_project(query) do
    from v in query, preload: [:project]
  end

  def preload_layout(query) do
    from v in query, preload: [:layout]
  end

  def preload_slides(query, preload_query) do
    from v in query, preload: [slides: ^preload_query]
  end

  defp put_watch_code(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true} ->
        put_change(changeset, :watch_code, Crypto.random_string(32))
      _ ->
        changeset
    end
  end
end

defmodule VideosyncWeb.Slide do
  use VideosyncWeb, :model

  alias Videosync.Repo

  schema "slides" do
    field :url, :string
    field :thumb_url, :string
    field :start, :integer
    belongs_to :video, VideosyncWeb.Video
    belongs_to :user, Videosync.Accounts.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:url, :thumb_url, :start])
    |> validate_required([:url, :thumb_url, :start])
  end

  def create_changeset(struct, params \\ %{}) do
    changeset(struct, params)
    |> prepare_changes(fn(change) ->
        assoc(change.data, :video)
        |> Repo.update_all(inc: [slide_count: 1])

        change
      end)
  end

  def delete_changeset(struct) do
    change(struct)
    |> prepare_changes(fn(change) ->
        assoc(change.data, :video)
        |> Repo.update_all(inc: [slide_count: -1])

        change
      end)
  end

  def own_by(user, video) do
    query = assoc(user, :slides)

    from s in query,
      where: s.video_id == ^video
  end

  def includes(query, items) do
    from s in query,
      where: s.id in ^items
  end

  def order_by(order) do
    from s in VideosyncWeb.Slide, order_by: field(s, ^order)
  end
  def order_by(query, order) do
    from s in query, order_by: field(s, ^order)
  end
end

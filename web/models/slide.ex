defmodule Videosync.Slide do
  use Videosync.Web, :model

  schema "slides" do
    field :url, :string
    field :start, :integer
    field :end, :integer
    belongs_to :video, Videosync.Video
    belongs_to :user, Videosync.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:url, :start, :end])
    |> validate_required([:url, :start, :end])
  end

  def own_by(user, video) do
    query = assoc(user, :slides)

    from s in query,
      where: s.video_id == ^video
  end
end

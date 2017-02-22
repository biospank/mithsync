defmodule Videosync.Contact do
  use Videosync.Web, :model

  schema "contacts" do
    field :name, :string, virtual: true
    field :email, :string, virtual: true
    field :phone, :string, virtual: true
    field :message, :string, virtual: true
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :email, :phone, :message])
    |> validate_required([:name, :email, :message])
    |> validate_format(:email, ~r/@/)
  end
end

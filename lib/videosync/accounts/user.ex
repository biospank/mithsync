defmodule Videosync.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Videosync.Utils.Crypto

  schema "users" do
    field :email, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    field :activation_code, :string
    field :reset_code, :string
    field :active, :boolean
    field :project_count, :integer
    field :accept_terms_and_conditions, :boolean
    has_many :projects, VideosyncWeb.Project
    has_many :videos, VideosyncWeb.Video
    has_many :slides, VideosyncWeb.Slide

    timestamps()
  end

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:email, :password, :accept_terms_and_conditions])
    |> validate_required([:email, :password, :accept_terms_and_conditions])
    |> validate_format(:email, ~r/@/)
  end

  def reset_changeset(model, params \\ %{}) do
    model
    |> cast(params, [:email])
    |> validate_format(:email, ~r/@/)
  end

  # used only for test
  def login_changeset(model, params \\ %{}) do
    model
    |> changeset(params)
    |> put_password_hash()
  end

  def registration_changeset(model, params \\ %{}) do
    model
    |> changeset(params)
    |> unique_constraint(:email)
    |> validate_length(:password, min: 6)
    |> validate_confirmation(:password, required: true, message: "does not match password")
    |> validate_inclusion(:accept_terms_and_conditions, [true])
    |> put_password_hash()
    |> put_activation_code()
  end

  def password_change_changeset(model, params \\ %{}) do
    model
    |> cast(params, [:password])
    |> validate_required([:password])
    |> validate_length(:password, min: 6)
    |> validate_confirmation(:password, required: true, message: "does not match password")
    |> put_password_hash()
  end

  def gen_code_reset_changeset(model) do
    Ecto.Changeset.change(model, reset_code: Crypto.random_string(32))
  end

  def password_reset_changeset(model, params \\ %{}) do
    password_change_changeset(model, params)
  end

  def activation_changeset(model) do
    Ecto.Changeset.change(model, active: true)
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
      _ ->
        changeset
    end
  end

  defp put_activation_code(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true} ->
        put_change(changeset, :activation_code, Crypto.random_string(32))
      _ ->
        changeset
    end
  end
end

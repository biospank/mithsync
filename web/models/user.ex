defmodule Videosync.User do
  use Videosync.Web, :model

  schema "users" do
    field :email, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    field :activation_code, :string
    field :reset_code, :string
    field :active, :boolean
    has_many :videos, Videosync.Video

    timestamps
  end

  @required_fields ~w(email password)
  @required_reset_fields ~w(password)
  @required_reset_request_fields ~w(email)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/)
  end

  def reset_changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_reset_request_fields, @optional_fields)
    |> validate_format(:email, ~r/@/)
  end

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
    |> put_password_hash()
    |> put_activation_code()
  end

  def gen_code_reset_changeset(model) do
    Ecto.Changeset.change(model, reset_code: random_string(32))
  end

  def password_reset_changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_reset_fields, @optional_fields)
    |> validate_length(:password, min: 6)
    |> validate_confirmation(:password, required: true, message: "does not match password")
    |> put_password_hash()
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
        put_change(changeset, :activation_code, random_string(32))
      _ ->
        changeset
    end
  end

  defp random_string(length) do
    :crypto.strong_rand_bytes(length) |> Base.url_encode64 |> binary_part(0, length)
  end
end

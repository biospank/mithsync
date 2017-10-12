defmodule VideosyncWeb.ContactController do
  use VideosyncWeb, :controller

  alias Videosync.Contacts.Contact
  alias VideosyncWeb.{Mailer, Email}

  plug :scrub_params, "contact"

  def create(conn, %{"contact" => contact_params}) do
    changeset = Contact.changeset(%Contact{}, contact_params)

    case changeset.valid? do
      true ->
        Ecto.Changeset.apply_changes(changeset)
        |> Email.contact_us_email
        |> Mailer.deliver_later

        conn
        |> put_status(:created)
        |> send_resp(201, "")
      false ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(VideosyncWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end
end

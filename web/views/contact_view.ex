defmodule Videosync.ContactView do
  use Videosync.Web, :view

  def render("index.json", %{contacts: contacts}) do
    %{data: render_many(contacts, Videosync.ContactView, "contact.json")}
  end

  def render("show.json", %{contact: contact}) do
    %{data: render_one(contact, Videosync.ContactView, "contact.json")}
  end

  def render("contact.json", %{contact: contact}) do
    %{id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message}
  end
end

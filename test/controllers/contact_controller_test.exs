defmodule VideosyncWeb.ContactControllerTest do
  use VideosyncWeb.ConnCase
  use Bamboo.Test, shared: :true

  alias VideosyncWeb.Contact

  @valid_attrs %{
    email: "test@example.com",
    message: "some content",
    name: "Test",
    phone: "99382387822"
  }
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, contact_path(conn, :create), contact: @valid_attrs
    assert assert conn.status == 201
    assert_delivered_email VideosyncWeb.Email.contact_us_email(Map.merge(%Contact{}, @valid_attrs))
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, contact_path(conn, :create), contact: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end
end

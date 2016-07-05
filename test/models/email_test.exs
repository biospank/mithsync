defmodule Videosync.EmailTest do
  use Videosync.ConnCase

  setup %{conn: conn} do
    {:ok, conn: conn}
  end

  @user %Videosync.User{
    email: "email.address@example.com",
    activation_code: "8833e73hhsd783hys7y"
  }
  test "welcome_email" do
    email = Videosync.Email.welcome_email(@user)

    assert email.to == "email.address@example.com"
    assert email.html_body =~ "8833e73hhsd783hys7y"
  end

  @reset_url "http://localhost:4000/?/reset"
  @reset_data %{
    email: "email.address@example.com",
    reset_url: @reset_url
  }
  test "password_reset_email" do
    email = Videosync.Email.password_reset_email(@reset_data)

    assert email.to == @reset_data.email
    assert email.html_body =~ @reset_url
  end
end

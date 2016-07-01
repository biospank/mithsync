defmodule Videosync.EmailTest do
  use Videosync.ModelCase

  @user %Videosync.User{
    email: "email.address@example.com",
    activation_code: "8833e73hhsd783hys7y"
  }
  test "welcome_email" do
    email = Videosync.Email.welcome_email(@user)

    assert email.to == "email.address@example.com"
    assert email.html_body =~ "8833e73hhsd783hys7y"
  end
end

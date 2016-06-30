defmodule Videosync.Email do
  import Bamboo.Email

  def welcome_email do
    new_email
    |> to("dirosa.ilaria@gmail.com")
    |> from("support@zinkroo.com")
    |> subject("Welcome!!!")
    |> html_body("<strong>Welcome</strong>")
    |> text_body("welcome")
  end
end

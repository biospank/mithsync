defmodule Videosync.Email do
  use Bamboo.Phoenix, view: Videosync.EmailView

  def welcome_email(%Videosync.User{email: email, activation_code: code}) do
    base_email
    |> to(email)
    |> subject("Zinkroo registration")
    |> html_body("""
        Welcome to <strong>Zinkroo</strong>
        <br />
        Use the following activation code to enable your account.
        <br />
        Activation code: #{code}
      """)
  end

  defp base_email do
    new_email
    |> from("support@zinkroo.com")
  end
end

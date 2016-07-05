defmodule Videosync.Email do
  use Bamboo.Phoenix, view: Videosync.EmailView

  def welcome_email(%Videosync.User{email: email, activation_code: code}) do
    base_email
    |> to(email)
    |> subject("Zinkroo registration")
    |> html_body("""
        Welcome to <strong>Zinkroo</strong>
        <br />
        <br />
        Use the following activation code to enable your account.
        <br />
        <br />
        Activation code: #{code}
      """)
  end

  def password_reset_email(%{email: email, reset_url: url}) do
    base_email
    |> to(email)
    |> subject("Zinkroo password recovery service")
    |> html_body("""
        A password reset has been requested.
        <br />
        Use the following link to access password reset page: #{url}
        <br />
        <br />
        Please, ingnore this message if you're not the owner
      """)
  end

  defp base_email do
    new_email
    |> from("support@zinkroo.com")
  end
end

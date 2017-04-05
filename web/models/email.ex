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
        Please use the following code to activate your account.
        <br />
        <br />
        Activation code: #{code}
        <br />
        <br />
        Please, ingnore this message if you're not the intended recipient.
      """)
  end

  def password_reset_email(%{email: email, reset_url: url}) do
    base_email
    |> to(email)
    |> subject("Zinkroo password recovery service")
    |> html_body("""
        A password reset has been requested.
        <br />
        Use the following link to access password reset page:
        <br />
        <br />
        #{url}
        <br />
        <br />
        Please, ingnore this message if you're not the intended recipient.
      """)
  end

  def contact_us_email(contact) do
    base_email
    |> to("customercare@zinkroo.com")
    |> subject("Zinkroo contact request")
    |> html_body("""
        A contact request has been sent by #{contact.email}.
        <br />
        Here is the message content:
        <br />
        <br />
        #{contact.message}
        <br />
        <br />
      """)
  end

  def weekly_report_email(report) do
    new_email
    |> from("noreply@zinkroo.com")
    |> to("fabio.petrucci@gmail.com")
    |> subject("Zinkroo weekly report")
    |> html_body("""
        Report settimanale utenti iscritti a Zinkroo
        <br />
        <br />
        Totale utenti iscritti - #{report.users_count}
        <br />
        Totale utenti attivi - #{report.active_users_count}
        <br />
        Totale progetti - #{report.projects_count}
        <br />
        Totale video - #{report.videos_count}
        <br />
      """)
  end

  defp base_email do
    new_email
    |> from("noreply@zinkroo.com")
  end
end

defmodule Videosync.Workers.DailyReport do
  use GenServer
  use Timex

  alias Videosync.Reports
  alias VideosyncWeb.{Email, Mailer}

  def start_link do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(state) do
    schedule_work()
    {:ok, state}
  end

  def handle_info(:send_mail, state) do
    if Mix.env == :prod do
      report = Reports.perform
      report |> Email.daily_report_email("axenso.dardy@gmail.com") |> Mailer.deliver_later
      report |> Email.daily_report_email("fabio.petrucci@gmail.com") |> Mailer.deliver_later
    end

    schedule_work()

    {:noreply, state}
  end

  defp schedule_work do
    # ore che mancano all'invio
    # time_until_seven_pm / 60 / 60 / 1000 # minuti / secondi / millisecondi
    delay = if seconds_until_seven_pm() > 0 do
      time_until_seven_pm()
    else
      tomorrow() |> time_until_seven_pm()
    end

    IO.inspect delay

    Process.send_after(self(), :send_mail, delay)
  end

  defp time_until_seven_pm(which_day \\ nil) do
    seconds_until_seven_pm(which_day) * 1000
  end

  defp seconds_until_seven_pm(which_day \\ nil) do
    seven_pm(which_day) |> Timex.diff(Timex.local, :seconds)
  end

  defp seven_pm(which_day) do
    (which_day || Timex.local)
    |> Timex.end_of_day
    |> Timex.shift(hours: -6)
  end

  defp tomorrow do
    Timex.local |> Timex.shift(days: 1)
  end
end

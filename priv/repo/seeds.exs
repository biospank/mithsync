# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Videosync.Repo.insert!(%Videosync.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Videosync.{Repo, Video, Crypto}

videos = Repo.all(Video)

# for video <- videos do
#   Ecto.Changeset.change(video, %{watch_code: Crypto.random_string(32)})
#   |> Repo.update!
# end

for video <- videos do
  video
  |> Ecto.build_assoc(:layout)
  |> Repo.insert!
end

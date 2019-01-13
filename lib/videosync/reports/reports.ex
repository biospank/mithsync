defmodule Videosync.Reports do
  @moduledoc """
  The Reports context.
  """
  import Ecto.Query, warn: false
  alias Videosync.Repo

  alias Videosync.Accounts.User
  alias Videosync.Reports.Counter
  alias Videosync.Contents.{Project, Video}

  def perform do
    %Counter{
      users_count: count_users(),
      active_users_count: count_active_users(),
      projects_count: count_projects(),
      videos_count: count_videos()
    }
  end

  def count_users do
    Repo.one(from u in User, select: count(u.id))
  end

  def count_active_users do
    Repo.one(from u in User, select: count(u.id), where: [active: true])
  end

  def count_projects do
    Repo.one(from p in Project, select: count(p.id))
  end

  def count_videos do
    Repo.one(from v in Video, select: count(v.id))
  end
end

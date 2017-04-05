defmodule Videosync.Report do
  defstruct [:users_count, :active_users_count, :projects_count, :videos_count]

  import Ecto.Query

  alias Videosync.{Repo, User, Project, Video}

  def perform do
    %Videosync.Report{
      users_count: count_users,
      active_users_count: count_active_users,
      projects_count: count_projects,
      videos_count: count_videos
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

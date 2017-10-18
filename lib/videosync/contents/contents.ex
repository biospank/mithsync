defmodule Videosync.Contents do
  @moduledoc """
  The Contents context.
  """

  import Ecto
  import Ecto.Query, warn: false

  alias Videosync.Repo
  alias Videosync.Assets.{Scope, ImageProxy}
  alias Videosync.Contents.{Project, Video, Slide, Layout}


  def list_videos_with_layout_and_slides(user) do
    Video.own_by(user)
    |> Video.order_by(:updated_at)
    |> Video.preload_layout()
    |> Video.preload_slides(Slide.order_by(:start))
    |> Repo.all
  end

  def get_project!(id), do: Repo.get!(Project, id)

  def list_filtered_videos_with_layout_and_slides(args) do
    Video.own_by(args[:user])
    |> Video.belongs_to_model(:project_id, args[:project].id)
    |> Video.filter_by(args[:filter])
    |> Video.order_by(:inserted_at)
    |> Video.preload_layout()
    |> Video.preload_slides(Slide.order_by(:start))
    |> Repo.all
  end

  def video_changeset(user, project_id, video_params) do
    project_id = cond do
      is_binary(project_id) ->
        String.to_integer(project_id)
      true ->
        project_id
    end

    user
    |> build_assoc(:videos, %{project_id: project_id})
    |> Video.create_changeset(video_params)
  end

  def create_video(changeset), do: Repo.insert(changeset)

  def create_video_layout!(video) do
    video
    |> build_assoc(:layout)
    |> Repo.insert!
  end

  def get_video_with_layout_and_slides!(args) do
    Video.own_by(args[:user])
    |> Video.belongs_to_model(:project_id, args[:project])
    |> Video.preload_layout()
    |> Video.preload_slides(Slide.order_by(:start))
    |> Repo.get!(args[:id])
  end

  def preload_layout_and_slides(video) do
    video
    |> Repo.preload(:layout)
    |> Repo.preload(:slides)
  end

  def get_video_with_project_layout_and_slides!(args) do
    Video.own_by(args[:user])
    |> Video.belongs_to_model(:project_id, args[:project_id])
    |> Video.preload_project()
    |> Video.preload_layout()
    |> Video.preload_slides(Slide.order_by(:start))
    |> Repo.get!(args[:id])
  end

  def update_video_changeset(video, video_params) do
    video |> Video.changeset(video_params)
  end

  def update_video(changeset), do: Repo.update(changeset)

  def get_video!(args) when is_list(args) do
    Video.own_by(args[:user])
    |> Video.belongs_to_model(:project_id, args[:project_id])
    |> Repo.get!(args[:id])
  end
  def get_video!(id) when is_binary(id) do
    Video |> Repo.get!(id)
  end

  def get_video_by_whatch_code!(code) do
    Video
    |> Video.preload_layout()
    |> Video.preload_slides(Slide.order_by(:start))
    |> Repo.get_by!(watch_code: code)
  end

  def delete_video!(video) do
    Video.delete_changeset(video) |> Repo.delete!
  end

  def touch_video(video_id) do
    video_id = cond do
      is_binary(video_id) ->
        String.to_integer(video_id)
      true ->
        video_id
    end

    Video
    |> Repo.get!(video_id)
    |> Ecto.Changeset.change()
    |> Repo.update(force: true)
  end

  def create_slide_changeset(user, video, slide_params) do
    user
    |> build_assoc(:slides, %{video_id: String.to_integer(video)})
    |> Slide.create_changeset(slide_params)
  end

  def create_slide(changeset), do: Repo.insert(changeset)
  def create_slide!(changeset), do: Repo.insert!(changeset)

  def get_slide!(user, id, video) do
    user
    |> Slide.own_by(video)
    |> Repo.get!(id)
  end

  def update_slide_changeset(slide, slide_params) do
    slide |> Slide.changeset(slide_params)
  end

  def update_slide(changeset), do: Repo.update(changeset)
  def update_slide!(changeset), do: Repo.update!(changeset)

  def get_video_slides(user, video) do
    user
    |> Slide.own_by(video)
    |> Slide.order_by(:start)
    |> Repo.all
  end

  def delete_slide!(slide) do
    Slide.delete_changeset(slide)
    |> Repo.delete!
  end

  def delete_all_slides(user, video_id, slides_to_delete) do
    user
    |> Slide.own_by(video_id)
    |> Slide.includes(Enum.map(slides_to_delete, &(&1["id"])))
    |> Repo.delete_all
  end

  def update_video_slides_count(video, slides) do
    video
    |> Ecto.Changeset.change(slide_count: length(slides))
    |> Repo.update()
  end

  def delete_video_images(user, project_id, video_id) do
    ImageProxy.bulk_delete(%{
      scope: %Scope{
        user_id: user.id,
        project_id: project_id,
        video_id: video_id
      }
    })
  end

  def list_projects(user) do
    Project.own_by(user)
    |> Project.order_by(:updated_at)
    |> Repo.all
  end

  def list_filtered_projects(user, filter) do
    Project.own_by(user)
    |> Project.filter_by(filter)
    |> Project.order_by(:inserted_at)
    |> Repo.all
  end

  def create_project_changeset(user, project_params) do
    user
    |> build_assoc(:projects)
    |> Project.create_changeset(project_params)
  end

  def create_project(changeset), do: Repo.insert(changeset)

  def get_project!(user, id) do
    user
    |> Project.own_by()
    |> Repo.get!(id)
  end

  def update_project_changeset(project, project_params) do
    Project.changeset(project, project_params)
  end

  def update_project(changeset), do: Repo.update(changeset)

  def delete_project!(project) do
    project
    |> Project.delete_changeset()
    |> Repo.delete!()
  end

  def delete_project_images(user, project_id) do
    ImageProxy.bulk_delete(%{
      scope: %Scope{
        user_id: user.id,
        project_id: project_id
      }
    })
  end

  def get_layout!(video_id, layout_id) do
    Layout
    |> Layout.belongs_to_model(:video_id, video_id)
    |> Repo.get!(layout_id)
  end

  def update_layout_changeset(layout, layout_params) do
    layout |> Layout.changeset(layout_params)
  end

  def update_layout(changeset), do: Repo.update(changeset)

  def count_images_by(url, scope) do
    q = from s in Slide,
      select: count(s.id),
      where: s.thumb_url == ^url and
        s.user_id == ^scope.user_id and
        s.video_id == ^scope.video_id

    Repo.one(q)
  end
end

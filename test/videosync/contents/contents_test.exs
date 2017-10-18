defmodule Videosync.ContentsTest do
  use Videosync.DataCase

  alias Videosync.Contents

  @video_params %{
    description: "some description",
    title: "some title",
    url: "some url",
    watch_code: "KDOEONDBUSHHDONDJJNJS"
  }

  setup do
    user = insert_user()
    project = insert_project(user)

    {:ok, user: user, project: project}
  end

  describe "video" do
    alias Videosync.Contents.Video

    setup %{user: user, project: project} do
      video = insert_video(user, project, @video_params)
      insert_layout(video)

      {:ok, video: video}
    end

    # user is provided by outer setup
    test "list_videos_with_layout_and_slides/1", %{user: user, video: video} do
      insert_layout(video)

      [%Video{layout: layout, slides: slides}] =
        Contents.list_videos_with_layout_and_slides(user)

      assert layout
      assert slides
    end

    test "list_filtered_videos_with_layout_and_slides/1", %{user: user, project: project, video: video} do
      insert_layout(video)

      [%Video{layout: layout, slides: slides}] =
        Contents.list_filtered_videos_with_layout_and_slides(
          user: user,
          project: project,
          filter: "some"
        )

      assert layout
      assert slides
    end

    test "create_video/1 with valid changeset", %{user: user, project: project} do
      changeset =
        user
        |> build_assoc(:videos, %{project_id: project.id})
        |> Video.create_changeset(@video_params)

      assert {:ok, _} = Contents.create_video(changeset)
    end

    test "video_changeset/3 with integer project_id", %{user: user, project: project} do
      assert %Ecto.Changeset{} = Contents.video_changeset(user, project.id, @video_params)
    end

    test "video_changeset/3 with binary project_id", %{user: user} do
      assert %Ecto.Changeset{} = Contents.video_changeset(user, "2", @video_params)
    end

    test "create_video/1 with invalid changeset", %{user: user, project: project} do
      changeset =
        user
        |> build_assoc(:videos, %{project_id: project.id})
        |> Video.create_changeset(%{})

      assert {:error, _} = Contents.create_video(changeset)
    end

    test "get_video_with_layout_and_slides!/1", %{user: user, project: project, video: video} do
      %Video{layout: layout, slides: slides} =
        Contents.get_video_with_layout_and_slides!(
          user: user,
          project: project.id,
          id: video.id
        )

      assert layout
      assert slides
    end

    test "get_video_with_layout_and_slides!/1 (wrong project)", %{user: user, video: video} do
      assert_raise Ecto.NoResultsError, fn ->
        Contents.get_video_with_layout_and_slides!(
          user: user,
          project: 200,
          id: video.id
        )
      end
    end

    test "get_video_with_layout_and_slides!/1 (wrong video)", %{user: user, project: project} do
      assert_raise Ecto.NoResultsError, fn ->
        Contents.get_video_with_layout_and_slides!(
          user: user,
          project: project.id,
          id: 200
        )
      end
    end

    test "preload_layout_and_slides/1", %{video: video} do
      %Video{layout: layout, slides: slides} =
        Contents.preload_layout_and_slides(video)

      assert layout
      assert slides
    end

    test "get_video_with_project_layout_and_slides!/1", %{user: user, project: project, video: video} do
      %Video{project: preloaded_project, layout: preloaded_layout, slides: preloaded_slides} =
        Contents.get_video_with_project_layout_and_slides!(
          user: user,
          project_id: project.id,
          id: video.id
        )

      assert preloaded_project
      assert preloaded_layout
      assert preloaded_slides
    end

    test "update_video_changeset/2", %{video: video} do
      assert %Ecto.Changeset{} = Contents.update_video_changeset(video, @video_params)
    end

    test "update_video/1 with valid changeset", %{video: video} do
      changeset = Contents.update_video_changeset(video, %{title: "other title"})
      assert {:ok, _video} = Contents.update_video(changeset)
    end

    test "update_video/1 with invalid changeset", %{video: video} do
      changeset = Contents.update_video_changeset(video, %{title: nil})
      assert {:error, _changeset} = Contents.update_video(changeset)
    end

    test "get_video!/1  when is_list(args)", %{user: user, project: project, video: video} do
      assert %Video{} = Contents.get_video!(
        user: user,
        project_id: project.id,
        id: video.id
      )
    end

    test "get_video!/1  when is_list(args) and video id is not valid", %{user: user, project: project} do
      assert_raise Ecto.NoResultsError, fn ->
        Contents.get_video!(
          user: user,
          project_id: project.id,
          id: 123
        )
      end
    end

    test "get_video!/1  when is_list(args) and project id is not valid", %{user: user, video: video} do
      assert_raise Ecto.NoResultsError, fn ->
        Contents.get_video!(
          user: user,
          project_id: 212,
          id: video.id
        )
      end
    end

    test "get_video!/1  when is_binary(id)", %{user: user, project: project, video: video} do
      assert %Video{} = Contents.get_video!(
        user: user,
        project_id: project.id,
        id: Integer.to_string(video.id)
      )
    end

    test "get_video!/1  when is_binary(id) and video id is not valid", %{user: user, project: project} do
      assert_raise Ecto.NoResultsError, fn ->
        Contents.get_video!(
          user: user,
          project_id: project.id,
          id: "123"
        )
      end
    end

    test "get_video!/1  when is_binary(id) and project id is not valid", %{user: user, video: video} do
      assert_raise Ecto.NoResultsError, fn ->
        Contents.get_video!(
          user: user,
          project_id: 212,
          id: Integer.to_string(video.id)
        )
      end
    end

    test "get_video_by_whatch_code/1 with valid code" do
      assert Contents.get_video_by_whatch_code!("KDOEONDBUSHHDONDJJNJS")
    end

    test "get_video_by_whatch_code/1 with invalid code" do
      assert_raise Ecto.NoResultsError, fn ->
        Contents.get_video_by_whatch_code!("invalid-code")
      end
    end

    test "delete_video/1", %{video: video} do
      assert %Video{} = Contents.delete_video!(video)
    end

    test "touch_video/1 with string id", %{video: video} do
      assert {:ok, _video} =
        video.id
        |> Integer.to_string
        |> Contents.touch_video
    end

    test "touch_video/1 with integer id", %{video: video} do
      assert {:ok, _video} = Contents.touch_video(video.id)
    end

    test "touch_video/1 with invalid id" do
      assert_raise Ecto.NoResultsError, fn ->
        Contents.touch_video(123)
      end
    end
  end

  describe "layout" do
    alias Videosync.Contents.Layout

    setup %{user: user, project: project} do
      video = insert_video(user, project, @video_params)

      {:ok, video: video}
    end

    test "create_video_layout!/1", %{video: video} do
      assert %Layout{} = Contents.create_video_layout!(video)
    end

  end

  describe "project" do
    alias Videosync.Contents.Project

    test "get_project!/1 with valid id", %{project: project} do
      assert %Project{} = Contents.get_project!(project.id)
    end

    test "get_project!/1 with invalid id" do
      assert_raise(Ecto.NoResultsError, fn ->
        Contents.get_project!(123)
      end)
    end
  end
end

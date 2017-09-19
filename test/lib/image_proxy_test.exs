defmodule VideosyncWeb.ImageProxyTest do
  use VideosyncWeb.ConnCase

  alias VideosyncWeb.{Project, Video, Scope, ArcImage, ImageProxy}

  setup config do
    if config[:local] do
      Application.put_env(:arc, :storage, Arc.Storage.Local)
    else
      Application.put_env(:arc, :storage, Arc.Storage.S3)
    end

    user = insert_user()
    project = insert_project(user, %Project{})
    video = insert_video(user, project, %Video{})

    scope = %Scope{
      user_id: user.id,
      project_id: project.id,
      video_id: video.id
    }

    ArcImage.store({"test/support/dummy.jpg", scope})

    {:ok, scope: scope}
  end

  @tag :local
  test "bulk delete local scoped files", %{scope: scope} do
    {:ok, list} = ImageProxy.bulk_delete(%{ scope: scope })
    refute Enum.empty? list
  end

  @tag :s3
  test "bulk delete s3 scoped files", %{scope: scope} do
    {:ok, [%{status_code: status}]} = ImageProxy.bulk_delete(%{ scope: scope })
    assert status == 200
  end

  @tag :local
  test "list local scoped files", %{scope: scope} do
    {:ok, list} = ImageProxy.list(%{ scope: scope })
    refute Enum.empty? list
  end

  @tag :local
  test "list local scoped files with invalid filter", %{scope: scope} do
    {:ok, list} = ImageProxy.list(%{ scope: scope, filter: "nofile" })
    assert Enum.empty? list
  end

  @tag :local
  test "list local scoped files with valid filter", %{scope: scope} do
    {:ok, list} = ImageProxy.list(%{ scope: scope, filter: "dummy" })
    refute Enum.empty?(list)
  end

  @tag :s3
  test "list s3 scoped files", %{scope: scope} do
    {:ok, list} = ImageProxy.list(%{ scope: scope })
    refute Enum.empty? list
  end

  @tag :s3
  test "list s3 scoped files with invalid filter", %{scope: scope} do
    {:ok, list} = ImageProxy.list(%{ scope: scope, filter: "nofile" })
    assert Enum.empty? list
  end

  @tag :s3
  test "list s3 scoped files with valid filter", %{scope: scope} do
    {:ok, list} = ImageProxy.list(%{ scope: scope, filter: "dummy" })
    refute Enum.empty?(list)
  end
end

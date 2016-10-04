defmodule Videosync.ScopeTest do
  use Videosync.ModelCase

  alias Videosync.Scope

  setup do
    {:ok, scope: %Scope{}}
  end

  test "respond to 'user_id' getter/setter", %{scope: scope} do
    assert scope.user_id == nil
    scope = %{scope | user_id: 3}
    assert scope.user_id == 3
  end

  test "respond to 'project_id' getter/setter", %{scope: scope} do
    assert scope.project_id == nil
    scope = %{scope | project_id: 3}
    assert scope.project_id == 3
  end

  test "respond to 'video_id' getter/setter", %{scope: scope} do
    assert scope.video_id == nil
    scope = %{scope | video_id: 3}
    assert scope.video_id == 3
  end
end

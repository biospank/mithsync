defmodule Videosync.Assets.Scope do
  @enforce_keys [:user_id, :project_id]
  defstruct [:user_id, :project_id, :video_id]

  defimpl String.Chars, for: Videosync.Assets.Scope do
    def to_string(scope) do
      [scope.user_id, scope.project_id, scope.video_id]
      |> Enum.reject(&(&1 == nil))
      |> Enum.join("/")
    end
  end
end

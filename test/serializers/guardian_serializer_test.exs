defmodule Videosync.GuardianSerializerTest do
  use Videosync.ConnCase

  alias Videosync.Repo
  alias Videosync.User
  alias Videosync.GuardianSerializer

  setup do
    user = Repo.insert!(%User{active: false, project_count: 0})
    {:ok, user: user}
  end

  test "for_token with user param", %{user: user} do
    expected_user_token = "User:#{user.id}"
    {:ok, user_token} = GuardianSerializer.for_token(user)
    assert user_token == expected_user_token
  end

  test "for_token with unknown param" do
    expected_unknown_token = "Unknown resource type"
    {:error, user_token} = GuardianSerializer.for_token(nil)
    assert user_token == expected_unknown_token
  end

  test "from_token with user token param", %{user: user} do
    {:ok, user_data} = GuardianSerializer.from_token("User:#{user.id}")
    assert user == user_data
  end

  test "from_token with unknown token param" do
    expected_unknown_token = "Unknown token"
    {:error, user} = GuardianSerializer.from_token("Unknown:token")
    assert user == expected_unknown_token
  end
end

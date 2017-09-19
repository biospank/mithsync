defmodule VideosyncWeb.ErrorViewTest do
  use VideosyncWeb.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 404.html" do
    assert render_to_string(VideosyncWeb.ErrorView, "404.html", []) ==
           "Page not found"
  end

  test "render 500.html" do
    assert render_to_string(VideosyncWeb.ErrorView, "500.html", []) ==
           "Server internal error"
  end

  test "render any status with an error message" do
    assert render(VideosyncWeb.ErrorView, "any_status.json", errors: %{email: "not found"}) ==
      %{errors: %{email: "not found"}}
  end

  test "render any status with multiple error messages" do
    assert render(VideosyncWeb.ErrorView, "any_status.json", errors: %{email: "not found", password: "incorrect"}) ==
      %{errors: %{email: "not found", password: "incorrect"}}
  end

  test "render any other" do
    assert render_to_string(VideosyncWeb.ErrorView, "505.html", []) ==
           "Server internal error"
  end
end

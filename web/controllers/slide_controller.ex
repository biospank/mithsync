defmodule Videosync.SlideController do
  use Videosync.Web, :controller

  alias Videosync.Slide

  plug :scrub_params, "slide" when action in [:create, :update]

  def action(conn, _) do
    apply(__MODULE__, action_name(conn),
      [
        conn,
        conn.params,
        Guardian.Plug.current_resource(conn)
      ]
    )
  end

  def create(conn, %{"video_id" => video, "slide" => slide_params}, user) do
    changeset = user
      |> build_assoc(:slides, %{video_id: String.to_integer(video)})
      |> Slide.create_changeset(slide_params)

    case Repo.insert(changeset) do
      {:ok, slide} ->
        conn
        |> put_status(:created)
        |> render("show.json", slide: slide)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Videosync.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"video_id" => video, "id" => id, "slide" => slide_params}, user) do
    changeset = user
      |> Slide.own_by(video)
      |> Repo.get!(id)
      |> Slide.changeset(slide_params)

    case Repo.update(changeset) do
      {:ok, slide} ->
        render(conn, "show.json", slide: slide)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Videosync.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def save_all(conn, %{"video_id" => video, "slides" => slides_to_save}, user) do
    Enum.map(slides_to_save, fn(slide) ->
      case Map.fetch(slide, "id") do
        :error ->
          changeset = user
            |> build_assoc(:slides, %{video_id: String.to_integer(video)})
            |> Slide.create_changeset(slide)

          Repo.insert!(changeset)
        {:ok, id} ->
          changeset = user
            |> Slide.own_by(video)
            |> Repo.get!(id)
            |> Slide.changeset(slide)

          Repo.update!(changeset)
      end
    end)

    slides = user
      |> Slide.own_by(video)
      |> Slide.order_by(:start)
      |> Repo.all

    render(conn, "index.json", slides: slides)
  end

  def delete(conn, %{"video_id" => video, "id" => id}, user) do
    slide = Repo.get!(Slide.own_by(user, String.to_integer(video)), id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Slide.delete_changeset(slide)
    |> Repo.delete!

    send_resp(conn, :no_content, "")
  end
end

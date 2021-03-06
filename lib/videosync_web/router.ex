defmodule VideosyncWeb.Router do
  use VideosyncWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug Guardian.Plug.VerifyHeader, realm: "Videosync"
    plug Guardian.Plug.EnsureAuthenticated, handler: VideosyncWeb.Token
    plug Guardian.Plug.LoadResource
  end

  scope "/", VideosyncWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/watch/:id", WatchController, :show
  end

  scope "/api", VideosyncWeb do
    pipe_through [:api]

    resources "/signup", RegistrationController, only: [:create]
    resources "/signin", SessionController, only: [:create]
    put "/activate/:code", ActivationController, :confirm
    get "/activate/resend", ActivationController, :resend, as: :resend_activation_code
    resources "/reset", PasswordResetController, only: [:show, :create, :update]
    resources "/contacts", ContactController, only: [:create]
  end

  scope "/api", VideosyncWeb do
    pipe_through [:api, :api_auth]

    resources "/signout", SessionController, only: [:delete]
    get "/users/current", UserController, :current, as: :current_user
    resources "/users", UserController, only: [:show, :update]
    get "/projects/recent", ProjectController, :recent, as: :recent_projects
    get "/videos/recent", VideoController, :recent, as: :recent_videos
    resources "/projects", ProjectController, only: [:index, :create, :update, :delete] do
      resources "/videos", VideoController, only: [:index, :show, :create, :update, :delete] do
        resources "/layout", LayoutController, only: [:update]
        resources "/slides", SlideController, only: [:create, :update, :delete]
        post "/slides/save_all", SlideController, :save_all, as: :save_all_slides
        post "/slides/delete_all", SlideController, :delete_all, as: :delete_all_slides
        resources "/images", ImageController, only: [:index, :create, :delete]
      end
    end
  end
end

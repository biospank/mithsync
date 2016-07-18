defmodule Videosync.Router do
  use Videosync.Web, :router

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
    plug Guardian.Plug.EnsureAuthenticated, handler: Videosync.Token
    plug Guardian.Plug.LoadResource
  end

  scope "/", Videosync do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", Videosync do
    pipe_through [:api]

    resources "/signup", RegistrationController, only: [:create]
    resources "/signin", SessionController, only: [:create]
    put "/activate/:code", ActivationController, :confirm
    resources "/reset", PasswordResetController, only: [:show, :create, :update]
  end

  scope "/api", Videosync do
    pipe_through [:api, :api_auth]

    resources "/signout", SessionController, only: [:delete]
    resources "/users", UserController, only: [:index, :show, :update, :delete]
    resources "/videos", VideoController, only: [:index, :show, :create, :update, :delete]
  end
end

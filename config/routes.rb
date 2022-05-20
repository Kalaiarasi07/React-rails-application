Rails.application.routes.draw do
  root 'homepage#index'

  scope path: 'api', as: 'api' do

    post "/login", to: "sessions#login"
    post "/signup", to: "sessions#signup"
    post "/logout", to: "sessions#destroy"
    post '/users', to: "users#all_users"
    post '/user-info', to: "users#user_info"
    post 'users/sort', to: "users#sort"

  end

  get '*path', to: 'react#index', via: :all
end

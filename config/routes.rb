Rails.application.routes.draw do
  get 'users/name'
  resources :items do
      resources :comments
      resource :likes, only: [:create, :destroy]
  end
  devise_for :users

  root 'items#index'

  get '/users/name', to: 'users#name'
end

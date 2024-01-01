Rails.application.routes.draw do
  resources :videos
  get 'home/index'

  get "up" => "rails/health#show", as: :rails_health_check

  devise_for :users, controllers: { registrations: "registrations" }

  root "videos#index"
end

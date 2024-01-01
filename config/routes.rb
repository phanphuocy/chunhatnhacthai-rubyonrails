Rails.application.routes.draw do
  get 'home/index'

  get "up" => "rails/health#show", as: :rails_health_check

  devise_for :users, controller: { registrations: "registrations" }

  root "home#index"
end

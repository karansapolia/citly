# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :links, only: %i[index update create]

  root "home#index"
  get "/:shortened", to: "links#show", as: :short
  get "*path", to: "home#index", via: :all
end

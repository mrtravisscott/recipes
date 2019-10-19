Rails.application.routes.draw do
  resources :recipes
  scope '/api' do
    post 'user_token' => 'user_token#create'
    resources :users
    resources :articles
    resources :recipes
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

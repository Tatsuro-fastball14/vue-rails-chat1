Rails.application.routes.draw do
  get '/api/test', to: 'application#test'
  get '/index', to: 'rooms#index' # '/index' で rooms#index にルーティング
  resources :rooms, only: [:create] # indexアクションは個別に定義したので、resourcesからは除外
end

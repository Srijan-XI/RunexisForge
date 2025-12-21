# Q1_HelloWorld.rb
# Create a simple Rails controller that displays "Hello, World!"

# config/routes.rb
Rails.application.routes.draw do
  get '/', to: 'hello#index'
end

# app/controllers/hello_controller.rb
class HelloController < ApplicationController
  def index
    @message = "Hello, World!"
  end
end

# app/views/hello/index.html.erb
<h1><%= @message %></h1>

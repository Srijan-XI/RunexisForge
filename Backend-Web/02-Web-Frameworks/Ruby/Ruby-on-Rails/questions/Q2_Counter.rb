# Q2_Counter.rb
# Create a Counter resource with RESTful actions

# config/routes.rb
Rails.application.routes.draw do
  resources :counters
end

# app/controllers/counters_controller.rb
class CountersController < ApplicationController
  @@count = 0

  def show
    @count = @@count
  end

  def increment
    @@count += 1
    redirect_to counter_path(1), notice: "Counter incremented"
  end

  def decrement
    @@count -= 1
    redirect_to counter_path(1), notice: "Counter decremented"
  end

  def reset
    @@count = 0
    redirect_to counter_path(1), notice: "Counter reset"
  end
end

# app/views/counters/show.html.erb
<h1>Counter: <%= @count %></h1>
<%= link_to "Increment", increment_counter_path(1), method: :post %>
<%= link_to "Decrement", decrement_counter_path(1), method: :post %>
<%= link_to "Reset", reset_counter_path(1), method: :post %>

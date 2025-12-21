# Q3_TodoApp.rb
# Create a Todo resource with full CRUD operations

# config/routes.rb
Rails.application.routes.draw do
  resources :todos
end

# app/models/todo.rb
class Todo < ApplicationRecord
  validates :text, presence: true
  scope :recent, -> { order(created_at: :desc) }
end

# app/controllers/todos_controller.rb
class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]

  def index
    @todos = Todo.recent
  end

  def new
    @todo = Todo.new
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      redirect_to todos_url, notice: "Todo created"
    else
      render :new
    end
  end

  def destroy
    @todo.destroy
    redirect_to todos_url, notice: "Todo deleted"
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:text)
  end
end

# app/views/todos/index.html.erb
<h1>Todos</h1>
<%= link_to "New Todo", new_todo_path %>

<ul>
  <% @todos.each do |todo| %>
    <li>
      <%= todo.text %>
      <%= link_to "Delete", todo_path(todo), method: :delete, data: { confirm: "Sure?" } %>
    </li>
  <% end %>
</ul>

# db/migrate/[timestamp]_create_todos.rb
class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :text, null: false

      t.timestamps
    end
  end
end

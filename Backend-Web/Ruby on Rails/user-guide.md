# Ruby on Rails Installation and Usage Guide

## Installation

### Prerequisites
- Ruby 2.7 or higher
- Bundler gem
- Node.js (for asset pipeline)
- Database (PostgreSQL recommended)

### Install Ruby
**Windows:**
Download from https://rubyinstaller.org

**macOS:**
```bash
brew install ruby
```

**Linux (Ubuntu):**
```bash
sudo apt-get install ruby-full
```

### Verify Ruby Installation
```bash
ruby --version
gem --version
```

### Install Rails
```bash
gem install rails
rails --version
```

## Create a New Rails Project

### Basic Rails Application
```bash
rails new myapp
cd myapp
rails server
```

### Rails with PostgreSQL
```bash
rails new myapp --database=postgresql --css=tailwind --javascript=esbuild
cd myapp
rails db:create
rails server
```

## Project Structure
```
myapp/
├── app/
│   ├── models/
│   ├── controllers/
│   ├── views/
│   ├── helpers/
│   └── assets/
├── config/
│   ├── routes.rb
│   ├── database.yml
│   └── environments/
├── db/
│   ├── migrate/
│   └── schema.rb
├── public/
├── spec/ (or test/)
├── Gemfile
├── Gemfile.lock
└── config.ru
```

## Generate Resources with Rails Generators

### Generate a Model
```bash
rails generate model User name:string email:string age:integer
rails db:migrate
```

### Generate a Controller
```bash
rails generate controller Posts index show create edit update destroy
```

### Generate a Complete Scaffold
```bash
rails generate scaffold Post title:string content:text user:references
rails db:migrate
```

## Routing (config/routes.rb)
```ruby
Rails.application.routes.draw do
  root 'pages#home'

  # RESTful routes
  resources :posts do
    resources :comments
  end

  resources :users, only: [:index, :show, :create, :destroy]

  # Custom routes
  get '/about', to: 'pages#about'
  post '/contact', to: 'pages#create_contact'
end
```

## Model Example
```ruby
# app/models/post.rb
class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :title, presence: true, length: { minimum: 5 }
  validates :content, presence: true

  scope :recent, -> { order(created_at: :desc) }
end
```

## Controller Example
```ruby
# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.all
  end

  def show; end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to @post, notice: 'Post created successfully'
    else
      render :new
    end
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
```

## View Example (ERB Template)
```erb
<!-- app/views/posts/show.html.erb -->
<h1><%= @post.title %></h1>
<p><%= @post.content %></p>

<% if current_user == @post.user %>
  <%= link_to 'Edit', edit_post_path(@post) %>
  <%= link_to 'Delete', post_path(@post), method: :delete, data: { confirm: 'Sure?' } %>
<% end %>

<%= link_to 'Back', posts_path %>
```

## Database Migrations
```ruby
# db/migrate/[timestamp]_create_posts.rb
class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :posts, :title
  end
end
```

### Migration Commands
```bash
rails db:migrate              # Apply migrations
rails db:rollback             # Undo last migration
rails db:migrate:status       # Check migration status
rails db:seed                 # Load seed data
```

## Associations
```ruby
# has_many
class User < ApplicationRecord
  has_many :posts
  has_many :comments, through: :posts
end

# belongs_to
class Post < ApplicationRecord
  belongs_to :user
end

# has_and_belongs_to_many
class Student < ApplicationRecord
  has_and_belongs_to_many :courses
end
```

## Validations
```ruby
class User < ApplicationRecord
  validates :name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :age, numericality: { only_integer: true, greater_than: 0 }
end
```

## Gemfile
```ruby
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.0'

gem 'rails', '~> 7.0.0'
gem 'pg', '~> 1.5'
gem 'puma', '~> 5.0'

# Authentication
gem 'devise'
gem 'pundit'

# Testing
group :development, :test do
  gem 'rspec-rails'
  gem 'factory_bot_rails'
end
```

## Useful Commands
```bash
rails console              # Interactive Rails shell
rails generate             # List available generators
rails db:create            # Create database
rails db:drop              # Drop database
rails routes               # Display all routes
rails test                 # Run tests
bundle install             # Install gems
bundle update              # Update gems
rails assets:precompile    # Compile assets
rails server               # Start server
```

## Best Practices
1. Follow Rails naming conventions
2. Keep controllers thin, models fat
3. Use validations in models
4. Implement proper authentication/authorization
5. Write tests (RSpec or Minitest)
6. Use scopes for common queries
7. Implement proper error handling
8. Use gems wisely
9. Keep views simple (use partials)
10. Use migrations for all schema changes

## Testing with RSpec
```bash
gem install rspec-rails
rails generate rspec:install
```

```ruby
# spec/models/post_spec.rb
require 'rails_helper'

RSpec.describe Post, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:title) }
end
```

## Authentication
```bash
gem 'devise'
rails generate devise:install
rails generate devise User
```

## Debugging
- `byebug` gem for breakpoints
- Rails logger: `Rails.logger.info "Debug message"`
- `rails console` for interactive debugging

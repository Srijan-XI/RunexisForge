# Phoenix

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Routing](#routing)
5. [Controllers](#controllers)
6. [Views](#views)
7. [Database](#database)
8. [WebSockets](#websockets)
9. [Testing](#testing)
10. [Best Practices](#best-practices)
11. [Resources](#resources)

---

## Introduction

Phoenix is a web framework for Elixir combining productivity with reliability. It enables building real-time applications with excellent performance and fault tolerance through Erlang/OTP.

### Key Features
- **Real-time**: WebSocket support out of the box
- **Fault-tolerant**: Built on Erlang/OTP
- **Scalable**: Handle massive concurrency
- **Productive**: Great developer experience
- **Type-safe**: Elixir's strong typing
- **Hot reload**: Development workflows
- **Database agnostic**: Works with multiple databases
- **Full-stack**: Templates, API, WebSocket support

### Why Phoenix?
- Best-in-class real-time capabilities
- Exceptional fault tolerance
- High concurrency (hundreds of thousands)
- Productive development
- Strong community
- Production-proven

---

## Installation

### Create Project
```bash
# Prerequisites: Elixir and Erlang installed
mix escript.install hex phx_new

# Create project
mix phx.new my_app
cd my_app

# Install dependencies
mix setup

# Start server
mix phx.server
```

---

## Getting Started

### Hello World
Create `lib/my_app_web/controllers/page_controller.ex`:
```elixir
defmodule MyAppWeb.PageController do
  use MyAppWeb, :controller

  def index(conn, _params) do
    render(conn, :index)
  end
end
```

Create `lib/my_app_web/templates/page/index.html.heex`:
```html
<div class="content">
  <h1>Phoenix</h1>
  <p>Welcome to Phoenix Framework!</p>
</div>
```

### JSON API
```elixir
defmodule MyAppWeb.API.DataController do
  use MyAppWeb, :controller

  def get_data(conn, _params) do
    json(conn, %{"message" => "Hello", "timestamp" => DateTime.utc_now()})
  end
end
```

---

## Routing

### Routes Configuration
Create `lib/my_app_web/router.ex`:
```elixir
defmodule MyAppWeb.Router do
  use MyAppWeb, :router

  scope "/", MyAppWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/about", PageController, :about
    get "/contact", PageController, :contact
  end

  scope "/api", MyAppWeb.API do
    pipe_through :api

    resources "/users", UserController
    resources "/posts", PostController do
      resources "/comments", CommentController
    end
  end
end
```

### Route Parameters
```elixir
scope "/api", MyAppWeb.API do
  get "/users/:id", UserController, :show
  put "/posts/:post_id/comments/:comment_id", CommentController, :update
end
```

---

## Controllers

### CRUD Controller
```elixir
defmodule MyAppWeb.API.UserController do
  use MyAppWeb, :controller

  alias MyApp.Accounts
  alias MyApp.Accounts.User

  def index(conn, _params) do
    users = Accounts.list_users()
    json(conn, users)
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    json(conn, user)
  end

  def create(conn, %{"user" => user_params}) do
    case Accounts.create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> json(user)

      {:error, changeset} ->
        conn
        |> put_status(:bad_request)
        |> json(changeset)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    case Accounts.update_user(user, user_params) do
      {:ok, user} ->
        json(conn, user)

      {:error, changeset} ->
        conn
        |> put_status(:bad_request)
        |> json(changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    {:ok, _user} = Accounts.delete_user(user)

    send_resp(conn, :no_content, "")
  end
end
```

---

## Views

### Heex Templates
Create `lib/my_app_web/templates/user/show.html.heex`:
```html
<div class="user">
  <h1><%= @user.name %></h1>
  <p>Email: <%= @user.email %></p>
  
  <%= if @user.admin do %>
    <span class="badge">Admin</span>
  <% end %>
</div>
```

### Loops
```html
<ul>
  <%= for user <- @users do %>
    <li>
      <a href={Routes.user_path(@conn, :show, user.id)}>
        <%= user.name %>
      </a>
    </li>
  <% end %>
</ul>
```

---

## Database

### Ecto Models
```elixir
defmodule MyApp.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :email, :string
    field :role, :string, default: "user"

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :role])
    |> validate_required([:name, :email])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
  end
end
```

### Querying
```elixir
defmodule MyApp.Accounts do
  import Ecto.Query

  def list_users do
    from(u in User)
    |> Repo.all()
  end

  def get_user!(id) do
    Repo.get!(User, id)
  end

  def create_user(attrs) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def update_user(user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def delete_user(user) do
    Repo.delete(user)
  end
end
```

---

## WebSockets

### Live View (Real-time)
```elixir
defmodule MyAppWeb.ChatLive do
  use MyAppWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, assign(socket, messages: [])}
  end

  def handle_event("send_message", %{"message" => message}, socket) do
    new_messages = socket.assigns.messages ++ [message]
    {:noreply, assign(socket, messages: new_messages)}
  end

  def render(assigns) do
    ~H"""
    <div class="chat">
      <ul>
        <%= for msg <- @messages do %>
          <li><%= msg %></li>
        <% end %>
      </ul>

      <form phx-submit="send_message">
        <input type="text" name="message" placeholder="Type a message" />
        <button type="submit">Send</button>
      </form>
    </div>
    """
  end
end
```

---

## Testing

### Controller Test
```elixir
defmodule MyAppWeb.API.UserControllerTest do
  use MyAppWeb.ConnCase

  test "GET /api/users returns all users", %{conn: conn} do
    conn = get(conn, Routes.user_path(conn, :index))
    assert json_response(conn, 200) == []
  end

  test "POST /api/users creates a user", %{conn: conn} do
    conn = post(conn, Routes.user_path(conn, :create), %{
      "user" => %{"name" => "John", "email" => "john@example.com"}
    })

    assert json_response(conn, 201)
  end
end
```

---

## Best Practices

### 1. Project Structure
```
lib/
├── my_app/
│   ├── accounts/        # Business logic
│   ├── posts/
│   └── repo.ex          # Database
├── my_app_web/
│   ├── controllers/
│   ├── views/
│   ├── templates/
│   ├── components/
│   └── router.ex
└── my_app.ex

test/
├── my_app/
├── my_app_web/
└── support/
```

### 2. Context Pattern
Organize business logic into contexts (Accounts, Posts, etc.)

### 3. Type Safety
Use specs for type definitions:
```elixir
@spec create_user(map()) :: {:ok, User.t()} | {:error, Changeset.t()}
def create_user(attrs) do
  # Implementation
end
```

---

## Resources

- [Phoenix Documentation](https://hexdocs.pm/phoenix/)
- [Phoenix Guides](https://hexdocs.pm/phoenix/overview.html)
- [Elixir Documentation](https://elixir-lang.org/docs.html)

---

## Summary

Phoenix is the gold standard for building real-time web applications with fault tolerance.

✅ Real-time  
✅ Fault-tolerant  
✅ High concurrency  
✅ Productive  
✅ Scalable  

**Perfect for real-time applications and high-load systems!**


# Harpoon

## Introduction

## Quick Reference

Harpoon is an alternative Elixir web framework that provides a lightweight option alongside Phoenix.

## Key Features
- Minimal core dependencies
- RESTful API focus
- Easy routing
- Middleware support
- Database agnostic
- Testing utilities

## Installation
```bash
mix escript.install hex harpoon_new
mix harpoon.new my_app
cd my_app && mix deps.get
```

## Basic Setup
```elixir
defmodule MyApp.Router do
  use Harpoon.Router

  scope "/" do
    get "/", MyApp.HelloController, :index
    get "/users/:id", MyApp.UserController, :show
    post "/users", MyApp.UserController, :create
  end
end
```

## Controller Example
```elixir
defmodule MyApp.HelloController do
  use Harpoon.Controller

  def index(conn) do
    send_json(conn, %{"message" => "Hello, Harpoon!"})
  end
end
```

## When to Use Harpoon
- Lightweight APIs
- Microservices
- When Phoenix is overkill
- Learning Elixir web concepts

## When to Use Phoenix Instead
- Real-time requirements
- Full-stack applications
- Need LiveView
- Large teams/projects
- Active community support important

## Comparison with Phoenix
| Feature | Harpoon | Phoenix |
|---------|---------|---------|
| Size | Minimal | Full-featured |
| Learning Curve | Gentle | Moderate |
| Community | Small | Large |
| Real-time | Limited | Excellent |
| Maturity | Young | Proven |

## Resources
- [Harpoon GitHub](https://github.com/neerajbhat/harpoon)
- [Elixir Guide](https://elixir-lang.org/)

---

**Tip**: For most Elixir projects, Phoenix is recommended due to its maturity and community. Harpoon is better suited for learning or specific minimalist use cases.


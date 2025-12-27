# Flask — Introduction

## What is Flask?

Flask is a lightweight, extensible Python microframework for building web applications and APIs. It provides essentials—routing, request/response handling, and Jinja2 templates—while leaving architecture and components (ORM, auth, admin) to your choice of extensions. Flask is ideal when you want flexibility, simplicity, and fine-grained control.

## Why Flask?

- Minimal core: Learn fast, customize everything.
- Composable: Choose your ORM (SQLAlchemy), auth (Flask-Login), forms (WTForms), etc.
- Great for microservices and APIs: Small footprint, simple routing.
- Powerful templating: Jinja2 with filters, macros, and inheritance.
- Vibrant ecosystem: Many proven extensions and patterns.

## Core Concepts

- Application: A `Flask` instance configured via objects or env.
- Routing: Map URLs to view functions with decorators.
- Request/Response: Access `request`, return JSON/HTML/redirects.
- Templates: Render dynamic HTML with Jinja2.
- Blueprints: Modularize routes and components.
- Extensions: Add database, auth, admin, caching, etc.

## Minimal Example

```python
from flask import Flask

app = Flask(__name__)

@app.get("/hello")
def hello():
 return {"message": "Hello, Flask!"}

if __name__ == "__main__":
 app.run(debug=True)
```bash

## Typical Structure

```bash
myflask/
  app.py
  config.py
  requirements.txt
  templates/
  static/
  app/
 __init__.py
 routes.py
 models.py
 blueprints/
```bash

## Ecosystem Highlights

- Flask-SQLAlchemy: ORM integration with SQLAlchemy
- Flask-Migrate: Alembic-based DB migrations
- Flask-Login / Flask-Security-Too: Authentication/authorization
- Flask-WTF: WTForms integration for forms/CSRF
- Marshmallow / Flask-RESTX: Serialization and API tooling

## When to Choose Flask vs Django

- Choose Flask when you want a minimal core, custom stack, or microservices.
- Choose Django when you need batteries-included features and admin out of the box.

## Best Practices

- Use blueprints and application factory pattern for modularity.
- Separate config classes (Dev/Prod/Test) and use env vars.
- Add tests with pytest and the Flask test client.
- Use SQLAlchemy + Migrations; never hand-edit the schema.
- Centralize error handling and logging.

Flask gives you the freedom to assemble exactly what you need—no more, no less.

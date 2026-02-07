# Flask

## Introduction

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

## User Guide

## Installation (Windows-friendly)

```pwsh
# Create and activate a virtual environment
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install Flask
python -m pip install --upgrade pip
pip install "Flask>=3.0"

# Verify
python -c "import flask; print(flask.__version__)"
```bash

## Your First App

`app.py`:

```python
from flask import Flask

app = Flask(__name__)

@app.get("/")
def index():
 return {"status": "ok"}

if __name__ == "__main__":
 app.run(debug=True)
```bash

Run:

```pwsh
python app.py
# http://127.0.0.1:5000/
```bash

## Routing Basics

```python
from flask import request, redirect, url_for

@app.get("/hello/<name>")
def hello(name):
 return f"Hello, {name}!"

@app.post("/submit")
def submit():
 data = request.json or {}
 return {"received": data}, 201

@app.get("/go-home")
def go_home():
 return redirect(url_for("index"))
```bash

## Templates

```python
from flask import render_template

@app.get("/home")
def home():
 return render_template("home.html", title="Flask")
```bash

`templates/home.html`:

```html
<!doctype html>
<h1>{{ title }}</h1>
```bash

Static files live in `static/` and are served at `/static/...`.

## Forms with Flask-WTF

```pwsh
pip install Flask-WTF WTForms
```bash

```python
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

app.config["SECRET_KEY"] = "change-this"  # use env var in prod

class TodoForm(FlaskForm):
 title = StringField("Title", validators=[DataRequired()])
 submit = SubmitField("Save")
```bash

## Database with SQLAlchemy

```pwsh
pip install Flask-SQLAlchemy Flask-Migrate
```bash

```python
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app.config.update(
 SQLALCHEMY_DATABASE_URI="sqlite:///app.db",
 SQLALCHEMY_TRACK_MODIFICATIONS=False,
)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Todo(db.Model):
 id = db.Column(db.Integer, primary_key=True)
 title = db.Column(db.String(200), nullable=False)
 done = db.Column(db.Boolean, default=False)

@app.get("/todos")
def list_todos():
 items = Todo.query.all()
 return {"todos": [{"id": t.id, "title": t.title, "done": t.done} for t in items]}
```bash

Initialize DB:

```pwsh
flask db init
flask db migrate -m "init"
flask db upgrade
```bash

## Blueprints & App Factory

`app/__init__.py`:

```python
from flask import Flask

def create_app():
 app = Flask(__name__)
 from .routes import bp
 app.register_blueprint(bp)
 return app
```bash

`app/routes.py`:

```python
from flask import Blueprint
bp = Blueprint("main", __name__)

@bp.get("/ping")
def ping():
 return {"ping": "pong"}
```bash

`wsgi.py`:

```python
from app import create_app
app = create_app()
```bash

Run with:

```pwsh
flask --app wsgi:app run --debug
```bash

## Configuration Management

```python
class Config:
 DEBUG = False
 SECRET_KEY = "change-me"

class DevConfig(Config):
 DEBUG = True

class ProdConfig(Config):
 pass

app.config.from_object(DevConfig)
```bash

Use env vars for secrets (e.g., `os.environ["SECRET_KEY"]`).

## Testing

```pwsh
pip install pytest pytest-cov
```bash

`tests/test_app.py`:

```python
import pytest
from app import create_app

@pytest.fixture()
def client():
 app = create_app()
 app.config.update(TESTING=True)
 return app.test_client()

def test_ping(client):
 res = client.get("/ping")
 assert res.status_code == 200
 assert res.get_json()["ping"] == "pong"
```bash

Run:

```pwsh
pytest -q
```bash

## Building a JSON API

```python
from flask import request, jsonify

@app.post("/todos")
def create_todo():
 data = request.get_json(force=True)
 t = Todo(title=data.get("title", ""))
 db.session.add(t)
 db.session.commit()
 return jsonify(id=t.id, title=t.title, done=t.done), 201
```bash

## Deployment (Overview)

- Use a production WSGI server (e.g., `gunicorn`, `waitress` on Windows).
- Serve behind a reverse proxy (Nginx/IIS/Apache).
- Configure logging, error handling, and timeouts.

Example (Linux):

```bash
pip install gunicorn
gunicorn wsgi:app --bind 0.0.0.0:8000 --workers 4
```bash

## Best Practices

- Use app factory + blueprints; keep modules cohesive.
- Manage config via classes and env; never hardcode secrets.
- Add tests and CI; enforce style with black/ruff.
- Use SQLAlchemy + migrations; avoid raw connections.
- Centralize error handlers and logging.

Flask’s simplicity and extensibility make it perfect for APIs, microservices, and custom-stacked web apps.


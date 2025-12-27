# Django User Guide

## Installation (Windows-friendly)

```pwsh
# Create and activate a virtual environment
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install Django (LTS is recommended in production)
python -m pip install --upgrade pip
pip install "Django>=4.2,<5.0"

# Verify
python -m django --version
```bash

## Create Project and App

```pwsh
django-admin startproject myproject
cd myproject
python manage.py startapp core

# Run the dev server
python manage.py runserver
# Visit http://127.0.0.1:8000/
```bash

Add `core` to `INSTALLED_APPS` in `myproject/settings.py`.

## URLs and Views

`core/views.py`:

```python
from django.http import JsonResponse

def ping(request):
 return JsonResponse({"status": "ok"})
```text

`core/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
 path("ping/", views.ping, name="ping"),
]
```text

`myproject/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
 path("admin/", admin.site.urls),
 path("", include("core.urls")),
]
```text

## Models and Migrations

`core/models.py`:

```python
from django.db import models

class Todo(models.Model):
 title = models.CharField(max_length=200)
 done = models.BooleanField(default=False)
 created_at = models.DateTimeField(auto_now_add=True)

 def __str__(self):
  return self.title
```text

Create and apply migrations:

```pwsh
python manage.py makemigrations
python manage.py migrate
```text

## Admin

`core/admin.py`:

```python
from django.contrib import admin
from .models import Todo

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
 list_display = ("id", "title", "done", "created_at")
 list_filter = ("done",)
 search_fields = ("title",)
```text

Create superuser and login at `/admin/`:

```pwsh
python manage.py createsuperuser
```text

## Templates and Static Files

In `myproject/settings.py`, add a templates directory and static settings:

```python
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES[0]["DIRS"] = [BASE_DIR / "templates"]

STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
```text

`templates/home.html`:

```html
<!doctype html>
<html>
  <body>
 <h1>{{ message }}</h1>
  </body>
  </html>
```text

`core/views.py` (render a template):

```python
from django.shortcuts import render

def home(request):
 return render(request, "home.html", {"message": "Welcome to Django"})
```text

Add a URL pattern for `home`.

## Forms and Validation

`core/forms.py`:

```python
from django import forms

class TodoForm(forms.Form):
 title = forms.CharField(max_length=200)
```text

`core/views.py` (handling POST):

```python
from .forms import TodoForm
from django.shortcuts import redirect

def create_todo(request):
 if request.method == "POST":
  form = TodoForm(request.POST)
  if form.is_valid():
   # Save via model
   from .models import Todo
   Todo.objects.create(title=form.cleaned_data["title"]) 
   return redirect("home")
 else:
  form = TodoForm()
 return render(request, "todo_form.html", {"form": form})
```text

## ORM Basics

```python
from core.models import Todo

# Create
Todo.objects.create(title="Read docs")

# Read
Todo.objects.all()
Todo.objects.filter(done=False)

# Update
t = Todo.objects.first()
t.done = True
t.save()

# Delete
Todo.objects.filter(done=True).delete()
```text

## Authentication (Quick Start)

Enable `django.contrib.auth` (already included) and use built-in views or a package like `django-allauth` for full flows.

## APIs with Django REST Framework (DRF)

```pwsh
pip install djangorestframework
```bash

`myproject/settings.py`:

```python
INSTALLED_APPS += ["rest_framework"]
```bash

`core/api.py`:

```python
from rest_framework import serializers, viewsets, routers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
 class Meta:
  model = Todo
  fields = ["id", "title", "done", "created_at"]

class TodoViewSet(viewsets.ModelViewSet):
 queryset = Todo.objects.all()
 serializer_class = TodoSerializer

router = routers.DefaultRouter()
router.register(r"todos", TodoViewSet)
```bash

`myproject/urls.py`:

```python
from core.api import router
urlpatterns += [path("api/", include(router.urls))]
```bash

## Testing

```pwsh
python manage.py test
```bash

`core/tests.py`:

```python
from django.test import TestCase
from django.urls import reverse

class PingTests(TestCase):
 def test_ping(self):
  res = self.client.get(reverse("ping"))
  self.assertEqual(res.status_code, 200)
```bash

## Settings and Environments

Split settings per environment or use env vars via `python-dotenv` or `django-environ`.

## Deployment (Overview)

- ASGI/WSGI server: `gunicorn` or `uvicorn` (for async features).
- Static files: `collectstatic` and serve via CDN/web server (e.g., Whitenoise for simple setups).
- Database: Use PostgreSQL in production.
- Security: Set `DEBUG=False`, `ALLOWED_HOSTS`, secure cookies, HTTPS, CSRF.

Example collect and run (Linux):

```bash
python manage.py collectstatic --noinput
gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
```bash

## Best Practices

- Keep apps modular; follow Django’s conventions.
- Use the admin, but restrict access and customize permissions.
- Add pre-commit hooks (format/flake8, tests) and CI.
- Back up the database and keep migrations in VCS.
- Monitor performance; use caching and indexes.

With Django’s strong foundations, you can ship features fast and keep maintenance under control.

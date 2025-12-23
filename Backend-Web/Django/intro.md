# Django — Introduction

## What is Django?

Django is a high-level Python web framework that enables rapid development of secure, maintainable web applications. It follows the Model–Template–View (MTV) architectural pattern and comes with batteries included: ORM, authentication, admin interface, forms, internationalization, caching, security protections, and more. Django is used by organizations large and small (Instagram, Mozilla, Disqus) to build APIs, content sites, dashboards, and complex products.

## Why Django?

- Batteries-included: Auth, admin, ORM, forms, i18n, sessions out of the box.
- Security-first: Protections against XSS, CSRF, SQL injection, clickjacking.
- Scalable & reliable: Mature, proven at internet scale; great caching story.
- Productive: Consistent conventions, powerful CLI, clear docs, rich ecosystem.
- Versatile: Build SSR sites, REST/GraphQL APIs, back offices, multi-tenant apps.

## Core Concepts (MTV)

- Model (Data): Python classes mapping to database tables via the ORM.
- Template (Presentation): HTML (Jinja-like) templating with tags/filters.
- View (Business logic): Functions/classes that read/write models and render responses.
- URL Dispatcher: Maps URLs to views using readable patterns.
- Forms: Declarative input handling with validation and rendering.
- Middleware: Request/response processing hooks for cross-cutting concerns.
- Admin: Auto-generated CRUD UI for your models with minimal config.

## Typical Project Structure

```
myproject/
	manage.py
	myproject/
		settings.py
		urls.py
		asgi.py
		wsgi.py
	app_one/
		models.py
		views.py
		urls.py
		templates/app_one/*.html
		admin.py
		forms.py
```

## Minimal Example

urls.py:
```python
from django.urls import path
from . import views

urlpatterns = [
		path("hello/", views.hello, name="hello"),
]
```

views.py:
```python
from django.http import HttpResponse

def hello(request):
		return HttpResponse("Hello, Django!")
```

## Ecosystem Highlights

- Django REST Framework (DRF): Build robust REST APIs with auth, browsable UI.
- Channels: WebSockets/ASGI support for real-time features.
- Celery: Distributed task queues for background jobs.
- Django-Allauth: Pluggable authentication (email, social providers).
- Wagtail/Mezzanine: CMSes built on Django.

## Common Use Cases

- Admin-heavy back offices and dashboards
- Content sites, blogs, CMS-powered portals
- REST/GraphQL APIs consumed by SPAs/mobile apps
- Multi-tenant SaaS platforms
- Internal tools, data portals, and reporting

## Best Practices

- Use environments (.env) and split settings (dev/staging/prod).
- Keep apps small and cohesive; prefer explicit over implicit.
- Leverage Django admin for productivity but harden permissions.
- Add tests (unit, integration) and use the test client/fixtures.
- Use migrations for schema changes; never hand-edit the DB.

## Learning Path

1. Create a project/app; wire a simple view and URL.
2. Define models, run migrations, use the admin.
3. Render templates and process forms securely (CSRF).
4. Build a REST API with DRF; add auth and pagination.
5. Configure static/media, caching, and deployment (ASGI/WSGI).

Django’s strong conventions and built-ins help you deliver features quickly while maintaining high security and code quality.

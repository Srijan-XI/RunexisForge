# Laravel

## Introduction

## What is Laravel?

Laravel is a popular PHP web framework focused on developer productivity and clean architecture. It includes routing, controllers, migrations, ORM (Eloquent), queues, caching, authentication scaffolding, and more.

## Why Laravel?

- Strong conventions and tooling
- Great ecosystem (Composer packages)
- Built-in features for common web needs

## Learning Path

1. Install PHP + Composer.
2. Create a Laravel project and run the dev server.
3. Learn routing/controllers.
4. Learn migrations + Eloquent.
5. Build a small CRUD app.

## User Guide

## Prerequisites

- PHP (8.x recommended)
- Composer

Verify:

```bash
php -v
composer -V
```bash

## Create a project

```bash
composer create-project laravel/laravel myapp
cd myapp
php artisan serve
```bash

Open `http://127.0.0.1:8000`.

## Routing basics

See `Laravel/examples/web.php` for a tiny route example.

## Next steps

- Create controllers: `php artisan make:controller`
- Create models + migrations: `php artisan make:model -m`
- Learn Eloquent queries


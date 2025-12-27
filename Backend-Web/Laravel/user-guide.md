# Laravel User Guide

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

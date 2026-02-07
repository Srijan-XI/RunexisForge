# Cuba

## Introduction

## What is Cuba?

Cuba is a minimal Ruby web framework built on Rack. It focuses on a tiny API and composable routing.

## Why Cuba?

- Very small and simple
- Rack-based (fits Ruby web ecosystem)
- Great for learning routing and middleware

## Learning Path

1. Install Ruby and Bundler.
2. Create a small Rack app with Cuba.
3. Add routes and middleware.

---

## User Guide

## Install

Create a folder and a Gemfile:

```ruby
source "https://rubygems.org"

gem "cuba"
```bash

Install:

```pwsh
bundle install
```bash

## Minimal app

See `Cuba/examples/app.rb` and `Cuba/examples/config.ru`.

Run with Rack (example using `rackup`):

```pwsh
gem install rackup
rackup
```bash

Then open `http://localhost:9292`.


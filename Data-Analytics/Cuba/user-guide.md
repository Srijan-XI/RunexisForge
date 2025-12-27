# Cuba User Guide

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

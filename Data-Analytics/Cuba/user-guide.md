# Cuba User Guide

## Install

Create a folder and a Gemfile:

```ruby
source "https://rubygems.org"

gem "cuba"
```

Install:
```pwsh
bundle install
```

## Minimal app

See `Cuba/examples/app.rb` and `Cuba/examples/config.ru`.

Run with Rack (example using `rackup`):
```pwsh
gem install rackup
rackup
```

Then open `http://localhost:9292`.

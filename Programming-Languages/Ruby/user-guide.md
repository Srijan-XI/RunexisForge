# Ruby User Guide

## Install (Windows)

The most common approach is **RubyInstaller**.

1. Install Ruby via RubyInstaller.
2. Confirm it’s on your PATH.

Verify:
```pwsh
ruby -v
gem -v
```

## Run a script

```pwsh
ruby hello.rb
```

## Bundler (dependencies)

```pwsh
gem install bundler
bundle -v
```

Create a Gemfile:
```ruby
source "https://rubygems.org"

gem "cuba"
```

Then:
```pwsh
bundle install
```

See `Ruby/examples/` and `Ruby/questions/` for practice.

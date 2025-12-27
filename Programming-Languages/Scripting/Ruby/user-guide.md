# Ruby User Guide

## Install (Windows)

The most common approach is **RubyInstaller**.

1. Install Ruby via RubyInstaller.
2. Confirm it’s on your PATH.

Verify:

```pwsh
ruby -v
gem -v
```ruby

## Run a script

```pwsh
ruby hello.rb
```bash

## Bundler (dependencies)

```pwsh
gem install bundler
bundle -v
```bash

Create a Gemfile:

```ruby
source "https://rubygems.org"

gem "cuba"
```bash

Then:

```pwsh
bundle install
```bash

See `Ruby/examples/` and `Ruby/questions/` for practice.

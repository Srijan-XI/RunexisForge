# Sidekiq — Quick Guide

Sidekiq is a background job processor for Ruby, backed by Redis.

## Installation

**Gemfile:**

```ruby
gem 'sidekiq'
gem 'redis'
```bash

```bash
bundle install
```bash

## Define a worker

**app/workers/email_worker.rb:**

```ruby
class EmailWorker
  include Sidekiq::Worker

  def perform(recipient)
    # Send email logic
    sleep 5
    puts "Email sent to #{recipient}"
  end
end
```bash

## Enqueue jobs

```ruby
EmailWorker.perform_async('user@example.com')

# Delayed execution (5 minutes from now)
EmailWorker.perform_in(5.minutes, 'user@example.com')

# Scheduled execution (specific time)
EmailWorker.perform_at(1.hour.from_now, 'user@example.com')
```bash

## Start Sidekiq

```bash
bundle exec sidekiq
```bash

## Scheduled jobs (sidekiq-cron)

**Gemfile:**

```ruby
gem 'sidekiq-cron'
```bash

**config/initializers/sidekiq.rb:**

```ruby
Sidekiq::Cron::Job.create(
  name: 'Cleanup job',
  cron: '0 3 * * *',
  class: 'CleanupWorker'
)
```bash

## Monitor jobs (Web UI)

**config/routes.rb:**

```ruby
require 'sidekiq/web'
mount Sidekiq::Web => '/sidekiq'
```bash

Access: <http://localhost:3000/sidekiq>

## References

- Docs: <https://github.com/sidekiq/sidekiq/wiki>

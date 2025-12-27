# Background Jobs — Introduction

Background jobs (also called task queues or workers) handle long-running or asynchronous tasks outside the main request/response cycle.

## Why background jobs?

- **Non-blocking**: don't make users wait for slow tasks (email, image processing)
- **Scalability**: distribute work across multiple workers
- **Reliability**: retry failed tasks, persist jobs
- **Scheduled tasks**: cron-like scheduling

## Common use cases

- Sending emails/notifications
- Processing uploads (resize images, transcode video)
- Generating reports
- Data synchronization
- Cleanup tasks

## Popular tools

- **Celery** (Python): distributed task queue
- **Sidekiq** (Ruby): efficient background processing for Ruby
- **Bull/BullMQ** (Node.js): Redis-based queue
- **RQ** (Python): simple Redis queue

## Where to go next

- Celery guide: `Backend-Web/BackgroundJobs/celery-guide.md`
- Sidekiq guide: `Backend-Web/BackgroundJobs/sidekiq-guide.md`

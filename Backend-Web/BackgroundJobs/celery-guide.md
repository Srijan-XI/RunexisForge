# Celery — Quick Guide

Celery is a distributed task queue for Python. It requires a message broker like Redis or RabbitMQ.

## Installation

```bash
pip install celery redis
```

## Basic setup

**celery_app.py:**
```python
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0', backend='redis://localhost:6379/0')

@app.task
def add(x, y):
    return x + y

@app.task
def send_email(recipient):
    # Simulate email sending
    import time
    time.sleep(5)
    print(f"Email sent to {recipient}")
    return f"Sent to {recipient}"
```

## Start worker

```bash
celery -A celery_app worker --loglevel=info
```

## Call tasks

```python
from celery_app import add, send_email

# Asynchronous call
result = add.delay(4, 6)

# Wait for result
print(result.get(timeout=10))  # 10

# Fire and forget
send_email.delay('user@example.com')
```

## Scheduled tasks (beat)

**celery_app.py:**
```python
from celery.schedules import crontab

app.conf.beat_schedule = {
    'cleanup-every-morning': {
        'task': 'celery_app.cleanup',
        'schedule': crontab(hour=3, minute=0),
    },
}

@app.task
def cleanup():
    print("Running cleanup")
```

**Start beat scheduler:**
```bash
celery -A celery_app beat --loglevel=info
```

## References
- Docs: https://docs.celeryq.dev/

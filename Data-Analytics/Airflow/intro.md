# Apache Airflow — Introduction

Airflow is a workflow orchestrator for authoring, scheduling, and monitoring DAGs (directed acyclic graphs) of tasks.

## Why Airflow?
- Python-defined workflows as code
- Rich operators (SQL, Spark, Kubernetes, Bash, Python)
- Scheduling, retries, SLAs, backfills
- Web UI for monitoring

## Key concepts
- **DAG**: workflow definition with tasks and dependencies
- **Operator/Task**: unit of work
- **Scheduler**: triggers DAG runs
- **Executor**: runs tasks (Local/Celery/Kubernetes)
- **Connections/Variables**: stored creds/config

## Where to go next
- User guide: `Airflow/user-guide.md`
- Examples: basic DAG, scheduling, operators

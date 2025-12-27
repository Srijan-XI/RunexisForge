# Apache Airflow — User Guide

## Install (quick start)
```bash
pip install apache-airflow==2.8.4 --constraint "https://raw.githubusercontent.com/apache/airflow/constraints-2.8.4/constraints-3.11.txt"
airflow db init
airflow users create --username admin --password admin --firstname a --lastname a --role Admin --email admin@example.com
airflow webserver -p 8080 & airflow scheduler &
```

## Example DAG (`dags/example.py`)
```python
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

default_args = {"retries": 1}

dag = DAG(
    "example",
    start_date=datetime(2024, 1, 1),
    schedule_interval="0 * * * *",
    catchup=False,
    default_args=default_args,
)

t1 = BashOperator(task_id="task1", bash_command="echo hello", dag=dag)
t2 = BashOperator(task_id="task2", bash_command="echo world", dag=dag)

t1 >> t2
```

## Scheduling
- `@hourly`, `@daily`, cron strings
- `catchup=False` to skip backfill

## Operators
- BashOperator, PythonOperator, SQL operators (Snowflake/BigQuery/Postgres), KubernetesPodOperator, SparkSubmitOperator

## Dependencies
- Use `>>` / `<<` or `set_upstream/set_downstream`

## Connections & variables
- Configure in UI or env; store creds securely (e.g., with a secrets backend)

## Executors
- LocalExecutor (single node)
- CeleryExecutor (distributed workers)
- KubernetesExecutor (pods per task)

## Best practices
- Keep DAGs idempotent; make tasks retry-safe
- Set timeouts and SLAs
- Isolate heavy work into external systems (Spark, dbt, warehouse)
- Version control DAGs; CI linting (e.g., `flake8`, `airflow dags test`)

## References
- https://airflow.apache.org/docs/

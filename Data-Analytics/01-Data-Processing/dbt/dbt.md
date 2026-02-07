# dbt

## Introduction

dbt (data build tool) transforms data in warehouses using SQL and a bit of YAML. It focuses on modular models, tests, and documentation.

## Why dbt?

- SQL-first transformations; no heavy orchestration
- Version control friendly; templating via Jinja
- Built-in tests and documentation
- Works with modern warehouses (Snowflake, BigQuery, Redshift, DuckDB, Postgres)

## Key concepts

- **Models**: SELECT queries materialized as tables/views
- **Sources**: declared upstream tables
- **Seeds**: CSVs loaded into the warehouse
- **Tests**: assertions on models/sources
- **Snapshots**: track slowly changing data
- **Docs**: auto-generated from schema.yml

## Where to go next

- User guide: `dbt/user-guide.md`
- Examples: model + test + docs walkthrough

---

## User Guide

## Install

```bash
pip install dbt-core dbt-bigquery  # pick adapter: dbt-snowflake/dbt-redshift/dbt-postgres/dbt-duckdb
```bash

## Initialize a project

```bash
dbt init analytics
cd analytics
```bash

## Configure profile (~/.dbt/profiles.yml)

Example for DuckDB:

```yaml
analytics:
  target: dev
  outputs:
    dev:
      type: duckdb
      path: ./analytics.duckdb
```text

## Create models

`models/stg_events.sql`:

```sql
select
  id,
  user_id,
  event_type,
  created_at::timestamp as created_at
from {{ source('raw', 'events') }}
```text

## Declare sources and tests

`models/schema.yml`:

```yaml
version: 2
sources:
  - name: raw
    tables:
      - name: events
models:
  - name: stg_events
    tests:
      - not_null:
          column_name: id
      - unique:
          column_name: id
```text

## Run

```bash
dbt run          # build models
dbt test         # run tests
dbt docs generate && dbt docs serve  # local docs site
```bash

## Materializations

- `view` (default)
- `table`
- `incremental` (append/merge)
- `ephemeral` (inlined CTE)

Set per-model in `schema.yml` or `config(materialized='table')` in SQL.

## Snapshots (SCD2)

`snapshots/orders.sql`:

```sql
{% snapshot orders_snapshot %}
{{
  config(
    target_schema='snapshots',
    unique_key='id',
    strategy='timestamp',
    updated_at='updated_at'
  )
}}
select * from {{ source('raw', 'orders') }}
{% endsnapshot %}
```bash

## Best practices

- Use staging models to clean/rename columns
- Add tests for not_null/unique/accepted_values
- Document columns in schema.yml
- Keep models small; compose via refs

## References

- <https://docs.getdbt.com/>
- <https://github.com/dbt-labs/awesome-dbt>


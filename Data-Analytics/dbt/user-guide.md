# dbt — User Guide

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

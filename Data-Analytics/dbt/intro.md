# dbt — Introduction

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

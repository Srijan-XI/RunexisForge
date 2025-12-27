# DuckDB — User Guide

## Install

```bash
pip install duckdb  # Python
# or
brew install duckdb
```bash

## Quick start (CLI)

```bash
duckdb
D select 1;
```bash

## Read Parquet/CSV

```sql
select * from read_parquet('data/events.parquet') limit 5;
select * from read_csv_auto('data/events.csv');
```bash

## Create a persistent DB file

```sql
.open analytics.duckdb
create table events as select * from read_parquet('data/events.parquet');
```bash

## From Python

```python
import duckdb
import pandas as pd

con = duckdb.connect(database='analytics.duckdb')
df = con.execute("select 42 as answer").df()
```bash

## Joins across files

```sql
select *
from read_parquet('data/orders/*.parquet') o
join read_csv_auto('data/customers.csv') c
  on o.customer_id = c.id
limit 10;
```bash

## Integrations

- Pandas/Polars/Arrow interchange
- dbt-duckdb adapter for transformations

## References

- <https://duckdb.org/docs/>

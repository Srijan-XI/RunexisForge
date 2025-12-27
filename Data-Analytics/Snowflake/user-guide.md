# Snowflake Usage Guide

## Getting Started

- Create account and sign in to Snowsight
- Set up a role (e.g., SYSADMIN) and warehouse

## Create Warehouse, Database, Schema

```sql
CREATE WAREHOUSE demo_wh WITH WAREHOUSE_SIZE = 'XSMALL' AUTO_SUSPEND = 60;
CREATE DATABASE demo_db;
CREATE SCHEMA demo_db.public;
```bash

## Load Data (Stage + Copy)

```sql
CREATE STAGE mystage;
-- Upload files via UI or `PUT file://` from SnowSQL
CREATE OR REPLACE TABLE items(id INT, name STRING);
COPY INTO items FROM @mystage FILE_FORMAT=(TYPE=CSV FIELD_DELIMITER=',');
```bash

## Query

```sql
SELECT * FROM items LIMIT 10;
```bash

## Time Travel & Cloning

```sql
SELECT * FROM items AT (OFFSET => -60*5);
CREATE TABLE items_clone CLONE items;
```bash

## Access Control

- Use roles and grants: `GRANT USAGE ON WAREHOUSE demo_wh TO ROLE analyst;`
- Least privilege per role

## Clients

- SnowSQL CLI
- Python: `pip install snowflake-connector-python`

## Cost Controls

- Auto-suspend warehouses
- Use smaller sizes for dev; monitor with `ACCOUNT_USAGE` views

# Lakehouse Basics — User Guide

## Delta Lake (Spark SQL examples)

```sql
CREATE TABLE delta.`/data/delta/events` (id BIGINT, ts TIMESTAMP, payload STRING) USING delta;
INSERT INTO delta.`/data/delta/events` VALUES (1, current_timestamp(), 'hi');
-- Time travel
SELECT * FROM delta.`/data/delta/events` VERSION AS OF 0;
```bash

## Apache Iceberg (Spark SQL examples)

```sql
CREATE TABLE prod.db.events (
  id BIGINT,
  ts TIMESTAMP,
  payload STRING
) USING iceberg
PARTITIONED BY (days(ts));

CALL prod.system.expire_snapshots('prod.db.events', TIMESTAMP '2024-01-01');
```bash

## Apache Hudi (Spark SQL examples)

```sql
CREATE TABLE hudi.db.events (
  id BIGINT,
  ts TIMESTAMP,
  payload STRING
) USING hudi
TBLPROPERTIES (
  type = 'cow'
);
```bash

## Time travel and versioning

- Delta: `VERSION AS OF` or `TIMESTAMP AS OF`
- Iceberg: `FOR VERSION AS OF` (engine-specific), snapshot IDs
- Hudi: `AS OF` instants for queries

## Upserts/merges

- Delta: `MERGE INTO target USING source ...`
- Iceberg: `MERGE INTO` (engine support required)
- Hudi: `MERGE INTO` and incremental pulls

## Engines

- Spark, Flink, Trino/Presto, Dremio, Snowflake (Iceberg), DuckDB (reads Iceberg/Delta), Athena (Iceberg), BigQuery (Iceberg preview)

## Best practices

- Use partitioning + clustering (Z-order for Delta, sorting for Iceberg)
- Manage retention: vacuum (Delta), expire snapshots (Iceberg), cleaning (Hudi)
- Store schemas in a catalog (Glue, Hive metastore, Nessie, Iceberg REST)
- Optimize file sizes (compaction)

## References

- Delta: <https://docs.delta.io/>
- Iceberg: <https://iceberg.apache.org/>
- Hudi: <https://hudi.apache.org/docs/overview/>

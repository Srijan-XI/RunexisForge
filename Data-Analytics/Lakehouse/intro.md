# Lakehouse Basics — Introduction

A lakehouse combines data lake storage with data warehouse features (ACID tables, schema evolution, time travel).

## Why lakehouse?
- Open table formats with ACID guarantees on object storage
- Schema evolution and time travel for analytics
- Engine-agnostic: Spark, Flink, Trino, DuckDB, Dremio, etc.

## Key table formats
- **Delta Lake** (delta.io)
- **Apache Iceberg**
- **Apache Hudi**

## Core capabilities
- ACID transactions, upserts/merges
- Partitioning + metadata pruning
- Time travel/versioned tables
- Schema enforcement/evolution

## Where to go next
- User guide: `Lakehouse/user-guide.md`
- Examples: DDL and time travel for Delta/Iceberg/Hudi

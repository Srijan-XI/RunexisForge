# Apache Spark

## Introduction

## Overview

Apache Spark is a distributed data processing engine used for batch processing, streaming, SQL analytics, machine learning, and graph workloads. It runs on a cluster (or locally for learning) and provides high-level APIs in Python (PySpark), Scala, Java, and R.

## Why Spark?

- **Fast iterative processing**: In-memory computation and optimized execution engine
- **Unified analytics**: Batch + SQL + streaming + ML in one ecosystem
- **Scales out**: From a laptop to large clusters (Standalone, YARN, Kubernetes)
- **Rich ecosystem**: Spark SQL, DataFrames, Structured Streaming, MLlib

## Core Concepts

- **Driver**: Your application’s main process that builds Spark jobs
- **Executors**: Worker processes that run tasks on cluster nodes
- **SparkSession**: Entry point to Spark (DataFrames, SQL, config)
- **DataFrame**: Distributed table-like dataset with schema (recommended API)
- **Transformations vs Actions**:
  - Transformations build a plan (lazy): `select`, `filter`, `groupBy`
  - Actions execute: `show`, `count`, `collect`, `write`
- **Partitions**: Spark splits data for parallelism

## Typical Use Cases

- ETL / data pipelines
- Large-scale aggregations and joins
- Log processing
- Streaming pipelines (Structured Streaming)
- Feature engineering for ML

## Prerequisites

- Java 8/11/17 (Spark runs on the JVM)
- Python 3.9+ if using PySpark
- A local install or Docker (for learning)

## Resources

- Official docs: <https://spark.apache.org/docs/latest/>
- PySpark docs: <https://spark.apache.org/docs/latest/api/python/>

---

## User Guide

## 1) Install (PySpark on Windows)

### Option A: pip install (quick start)

1. Install **Python 3.9+**.
2. Install a supported **Java** version (commonly Java 11 or 17).
3. Install PySpark:

```bash
pip install pyspark
```bash

Verify:

```bash
python -c "import pyspark; print(pyspark.__version__)"
```bash

### Option B: Use Docker (recommended for Kafka/Spark stacks)

If you already use Docker Desktop, it can simplify running dependencies.

## 2) Your First Spark App (PySpark)

Create a file like `examples/pyspark_wordcount.py` and run:

```bash
python "Apache Spark/examples/pyspark_wordcount.py"
```bash

## 3) Common DataFrame Operations

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.appName("demo").getOrCreate()

df = spark.createDataFrame(
    [("alice", 10), ("bob", 20), ("alice", 7)],
    ["name", "score"],
)

(df
 .where(col("score") >= 10)
 .groupBy("name")
 .sum("score")
 .show())

spark.stop()
```bash

## 4) Reading & Writing

CSV:

```python
df = spark.read.option("header", True).csv("data.csv")
df.write.mode("overwrite").parquet("out.parquet")
```bash

## 5) Tips & Troubleshooting

- If Spark fails to start, confirm Java is installed and `JAVA_HOME` is set.
- Avoid `collect()` on large datasets; prefer `show()`, `limit()`, or writes.
- Use `df.explain(True)` to inspect the query plan.

## Examples & Practice

- Examples: `Apache Spark/examples/`
- Practice: `Apache Spark/questions/`


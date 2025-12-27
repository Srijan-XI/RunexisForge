# Apache Spark — Introduction

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

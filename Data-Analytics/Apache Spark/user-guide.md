# Apache Spark — User Guide

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

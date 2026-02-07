from __future__ import annotations

# Requires: pip install pyspark

from pyspark.sql import SparkSession
from pyspark.sql.functions import col


def main() -> None:
    spark = SparkSession.builder.appName("spark-q01").getOrCreate()

    df = spark.createDataFrame(
        [("alice", 10), ("bob", 20), ("alice", 7)],
        ["name", "score"],
    )

    # Task:
    # Filter score >= 10 and sum scores by name
    result = df.where(col("score") >= 10).groupBy("name").sum("score")
    result.show()

    spark.stop()


if __name__ == "__main__":
    main()

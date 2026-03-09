from __future__ import annotations

# Requires: pip install pyspark

from pyspark.sql import SparkSession
from pyspark.sql.functions import explode, split, col


def main() -> None:
    spark = SparkSession.builder.appName("wordcount-demo").getOrCreate()

    lines = spark.createDataFrame(
        [("hello spark hello",), ("spark is fast",)],
        ["line"],
    )

    words = lines.select(explode(split(col("line"), "\\s+")).alias("word"))
    counts = words.groupBy("word").count().orderBy(col("count").desc(), col("word"))

    counts.show(truncate=False)

    spark.stop()


if __name__ == "__main__":
    main()

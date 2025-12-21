from __future__ import annotations

# Requires: pip install pyspark

from pyspark.sql import SparkSession


def main() -> None:
    spark = SparkSession.builder.appName("spark-q02").getOrCreate()

    df = spark.createDataFrame([(1, "a"), (2, "b")], ["id", "val"])

    out_path = "spark_out.parquet"
    df.write.mode("overwrite").parquet(out_path)

    df2 = spark.read.parquet(out_path)
    df2.show()

    spark.stop()


if __name__ == "__main__":
    main()

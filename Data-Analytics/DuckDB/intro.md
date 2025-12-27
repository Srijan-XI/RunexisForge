# DuckDB — Introduction

DuckDB is an in-process OLAP database optimized for analytical queries, embeddable in Python, R, and other languages.

## Why DuckDB?
- Zero server: runs in-process, great for laptops and CI
- Fast columnar engine; handles Parquet/CSV directly
- Works with Pandas/Polars/Arrow
- Good for data wrangling, prototyping, and small/medium analytics

## Key concepts
- **File formats**: read/write Parquet/CSV; `COPY TO/FROM`
- **Extensions**: httpfs, parquet, json
- **In-memory or file-backed**: `.duckdb` file

## Where to go next
- User guide: `DuckDB/user-guide.md`
- Examples: query Parquet, join with CSV, use from Python

# Pandas — User Guide

## 1) Install

```bash
pip install pandas
```bash

Verify:

```bash
python -c "import pandas as pd; print(pd.__version__)"
```bash

## 2) Your First DataFrame

```python
import pandas as pd

df = pd.DataFrame(
    {
        "name": ["alice", "bob", "alice"],
        "score": [10, 20, 7],
    }
)

print(df)
print(df.groupby("name")["score"].sum())
```bash

## 3) Common Tasks

- Select columns: `df[["col1", "col2"]]`
- Filter rows: `df[df["score"] >= 10]`
- Missing data: `df.isna()`, `df.fillna(...)`, `df.dropna(...)`
- Join: `df.merge(other, on="key")`
- Grouping: `df.groupby(...).agg(...)`

## 4) Reading & Writing

```python
df = pd.read_csv("data.csv")
df.to_parquet("out.parquet", index=False)
```bash

## Examples & Practice

- Examples: `Pandas/examples/`
- Practice: `Pandas/questions/`

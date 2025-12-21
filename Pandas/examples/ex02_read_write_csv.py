from __future__ import annotations

import pandas as pd
from io import StringIO


def main() -> None:
    csv_text = """name,score
alice,10
bob,20
alice,7
"""

    df = pd.read_csv(StringIO(csv_text))
    print("Read from CSV:\n", df, "\n", sep="")

    out_path = "pandas_out.csv"
    df.to_csv(out_path, index=False)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()

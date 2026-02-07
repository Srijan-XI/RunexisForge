import pandas as pd

# Task:
# Group scores by name and compute the sum.


def main() -> None:
    df = pd.DataFrame({"name": ["alice", "bob", "alice"], "score": [10, 20, 7]})

    totals = df.groupby("name")["score"].sum()
    print(totals)


if __name__ == "__main__":
    main()

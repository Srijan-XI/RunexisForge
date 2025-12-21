import pandas as pd


def main() -> None:
    df = pd.DataFrame(
        {
            "name": ["alice", "bob", "alice", "chris"],
            "score": [10, 20, 7, 11],
            "passed": [True, True, False, True],
        }
    )

    print("DataFrame:\n", df, "\n", sep="")
    print("Describe:\n", df.describe(include="all"), "\n", sep="")

    totals = df.groupby("name")["score"].sum().sort_values(ascending=False)
    print("Total score by name:\n", totals, sep="")


if __name__ == "__main__":
    main()

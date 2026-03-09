import pandas as pd

# Task:
# 1) Create a DataFrame with columns: name, score
# 2) Filter rows with score >= 10
# 3) Sort by score descending


def main() -> None:
    df = pd.DataFrame({"name": ["alice", "bob", "alice"], "score": [10, 20, 7]})

    result = df[df["score"] >= 10].sort_values("score", ascending=False)
    print(result)


if __name__ == "__main__":
    main()

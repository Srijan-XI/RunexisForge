import numpy as np

# Task:
# Compute mean and standard deviation of the array.


def main() -> None:
    x = np.array([1, 2, 3, 4, 5], dtype=np.float64)
    print("mean:", x.mean())
    print("std:", x.std())


if __name__ == "__main__":
    main()

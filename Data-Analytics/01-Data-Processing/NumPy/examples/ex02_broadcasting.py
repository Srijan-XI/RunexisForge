import numpy as np


def main() -> None:
    m = np.ones((3, 4), dtype=np.float64)
    v = np.array([1, 2, 3, 4], dtype=np.float64)

    print("m shape:", m.shape)
    print("v shape:", v.shape)
    print("m + v:\n", m + v)


if __name__ == "__main__":
    main()

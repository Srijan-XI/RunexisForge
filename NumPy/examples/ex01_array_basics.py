import numpy as np


def main() -> None:
    a = np.array([1, 2, 3], dtype=np.int64)
    b = np.arange(0, 10, 2)

    print("a:", a, "shape=", a.shape, "dtype=", a.dtype)
    print("b:", b, "shape=", b.shape, "dtype=", b.dtype)
    print("a * 10:", a * 10)


if __name__ == "__main__":
    main()

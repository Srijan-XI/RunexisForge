import numpy as np

# Task:
# Multiply two 2x2 matrices.


def main() -> None:
    a = np.array([[1, 2], [3, 4]], dtype=np.int64)
    b = np.array([[5, 6], [7, 8]], dtype=np.int64)

    c = a @ b
    print(c)


if __name__ == "__main__":
    main()

# NumPy — User Guide

## 1) Install

```bash
pip install numpy
```bash

Verify:

```bash
python -c "import numpy as np; print(np.__version__)"
```bash

## 2) Array Basics

```python
import numpy as np

x = np.array([1, 2, 3])
print(x.shape, x.dtype)
print(x * 10)
```bash

## 3) Indexing & Slicing

```python
a = np.arange(10)
print(a[2:7])
```bash

## 4) Broadcasting

```python
m = np.ones((3, 4))
v = np.array([1, 2, 3, 4])
print(m + v)
```bash

## Examples & Practice

- Examples: `NumPy/examples/`
- Practice: `NumPy/questions/`

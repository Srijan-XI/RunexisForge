# NumPy

## Introduction

## Overview

NumPy is the fundamental package for numerical computing in Python. It provides the **ndarray** (n-dimensional array) and fast vectorized operations, broadcasting, linear algebra, random sampling, and more.

## Why NumPy?

- **Performance**: Uses optimized C/Fortran routines underneath
- **Vectorization**: Operate on whole arrays without Python loops
- **Foundation for the ecosystem**: Pandas, SciPy, scikit-learn, PyTorch all build on NumPy concepts

## Core Concepts

- **ndarray**: homogeneous typed array
- **dtype**: data type (e.g., `float64`, `int32`)
- **Broadcasting**: automatic expansion of shapes for elementwise ops
- **Views vs copies**: slicing often returns a view

## Typical Use Cases

- Numerical computing and simulations
- Data preprocessing for ML
- Linear algebra and matrix operations

## Resources

- Official docs: <https://numpy.org/doc/>

---

## User Guide

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


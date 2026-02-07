# Dask

## Introduction

### What is Dask?

Dask is a flexible parallel computing library for analytics in Python. It provides advanced parallelism for analytics, enabling performance at scale for the tools you love. Dask is composed of two parts: dynamic task scheduling optimized for computation, and "Big Data" collections like parallel arrays, dataframes, and lists that extend common interfaces like NumPy, Pandas, and Python iterators to larger-than-memory or distributed environments.

### Why Dask?

- Familiar API (NumPy, Pandas, Scikit-learn)
- Scales from laptop to cluster
- Dynamic task scheduling
- Lazy evaluation for efficiency
- Handles larger-than-memory datasets
- Built-in diagnostics and profiling
- Integration with existing Python ecosystem
- Low overhead and efficient parallelism
- Flexible and composable
- Works with existing code

## Prerequisites

- Python 3.8 or higher
- NumPy and Pandas knowledge
- Basic understanding of parallel computing
- pip or conda package manager

## Installation

### Using pip

```bash
# Install Dask
pip install dask

# Install with all components
pip install "dask[complete]"

# Install specific components
pip install "dask[array]"      # Dask Array
pip install "dask[dataframe]"  # Dask DataFrame
pip install "dask[distributed]" # Distributed scheduler
pip install "dask[diagnostics]" # Diagnostic tools
```

### Using conda

```bash
# Install Dask
conda install dask

# With distributed
conda install dask distributed

# With dashboard
conda install dask-ml bokeh
```

### Verify Installation

```python
import dask
import dask.array as da
import dask.dataframe as dd

print(f"Dask version: {dask.__version__}")

# Simple test
x = da.random.random((10000, 10000), chunks=(1000, 1000))
result = x.mean().compute()
print(f"Mean: {result}")
```

## Core Concepts

### Lazy Evaluation

```python
import dask.array as da

# Create lazy array
x = da.random.random((10000, 10000), chunks=(1000, 1000))

# Operations are lazy (not computed yet)
y = x + x.T
z = y.mean(axis=0)

# Trigger computation
result = z.compute()
print(result.shape)

# Visualize task graph
z.visualize(filename='task-graph.png')
```

### Chunks

```python
import dask.array as da
import numpy as np

# Create chunked array
x = da.from_delayed(
    delayed_objects,
    shape=(10000, 10000),
    dtype=float
)

# Specify chunk size
x = da.random.random((10000, 10000), chunks=(1000, 1000))

# Auto-chunking
x = da.from_array(np.random.random((10000, 10000)), chunks='auto')

# Rechunk
x_rechunked = x.rechunk((500, 500))
```

## Dask Array

### Basic Operations

```python
import dask.array as da
import numpy as np

# Create Dask array
x = da.random.random((10000, 10000), chunks=(1000, 1000))

# NumPy-like operations
y = da.exp(x)
z = da.sum(y, axis=0)
result = z.compute()

# From NumPy array
numpy_array = np.random.random((5000, 5000))
dask_array = da.from_array(numpy_array, chunks=(1000, 1000))

# Mathematical operations
mean = x.mean().compute()
std = x.std().compute()
max_val = x.max().compute()

# Linear algebra
a = da.random.random((1000, 500), chunks=(100, 100))
b = da.random.random((500, 800), chunks=(100, 100))
c = da.dot(a, b)
result = c.compute()
```

### Advanced Array Operations

```python
import dask.array as da

# Stacking
x = da.random.random((1000, 1000), chunks=(100, 100))
y = da.random.random((1000, 1000), chunks=(100, 100))

stacked = da.stack([x, y], axis=0)
concatenated = da.concatenate([x, y], axis=0)

# Slicing
subset = x[100:500, 200:800]

# Broadcasting
x = da.random.random((1000, 1), chunks=(100, 1))
y = da.random.random((1, 1000), chunks=(1, 100))
z = x + y  # Broadcasting

# Map blocks
def process_block(block):
    return block * 2 + 1

result = da.map_blocks(process_block, x)

# Reduction
total = da.sum(x).compute()
mean_per_row = da.mean(x, axis=1).compute()
```

## Dask DataFrame

### Basic Operations

```python
import dask.dataframe as dd
import pandas as pd

# Read from files
df = dd.read_csv('data/*.csv')
df = dd.read_parquet('data/*.parquet')
df = dd.read_json('data/*.json')

# From Pandas
pandas_df = pd.read_csv('small_data.csv')
dask_df = dd.from_pandas(pandas_df, npartitions=4)

# Basic operations
result = df.groupby('category').sum().compute()
filtered = df[df['value'] > 100].compute()
sorted_df = df.sort_values('date').compute()

# Column operations
df['new_column'] = df['column1'] * 2
df = df.drop('unwanted_column', axis=1)

# Aggregations
mean_val = df['column'].mean().compute()
counts = df['category'].value_counts().compute()
```

### Advanced DataFrame Operations

```python
import dask.dataframe as dd

# Read large dataset
df = dd.read_csv(
    's3://bucket/data/*.csv',
    blocksize='64MB',
    dtype={'id': 'int64', 'value': 'float64'}
)

# Complex groupby
result = df.groupby(['category', 'region']).agg({
    'sales': ['sum', 'mean'],
    'quantity': 'sum'
}).compute()

# Merge/Join
df1 = dd.read_csv('users.csv')
df2 = dd.read_csv('transactions.csv')
merged = df1.merge(df2, on='user_id', how='left')

# Window functions
df['rolling_mean'] = df.groupby('category')['value'].rolling(7).mean()

# Apply custom functions
def custom_func(partition):
    # Process each partition
    return partition.apply(lambda x: x * 2)

result = df.map_partitions(custom_func)

# Persist in memory
df = df.persist()  # Keep in distributed memory

# Write results
df.to_parquet('output/', compression='snappy')
df.to_csv('output/*.csv', single_file=False)
```

### Time Series Operations

```python
import dask.dataframe as dd

# Read time series
df = dd.read_csv('timeseries/*.csv', parse_dates=['timestamp'])
df = df.set_index('timestamp')

# Resample
daily = df.resample('D').mean()
hourly_sum = df.resample('H').sum()

# Rolling operations
df['rolling_avg'] = df['value'].rolling('7D').mean()

# Compute
result = daily.compute()
```

## Dask Distributed

### Local Cluster

```python
from dask.distributed import Client, LocalCluster

# Create local cluster
cluster = LocalCluster(
    n_workers=4,
    threads_per_worker=2,
    memory_limit='4GB'
)

client = Client(cluster)

# Use Dask
import dask.array as da
x = da.random.random((10000, 10000), chunks=(1000, 1000))
result = x.mean().compute()

# Check dashboard
print(client.dashboard_link)

# Close
client.close()
cluster.close()
```

### Remote Cluster

```python
from dask.distributed import Client

# Connect to existing cluster
client = Client('tcp://scheduler-address:8786')

# Or use SSH
from dask.distributed import SSHCluster

cluster = SSHCluster(
    ['localhost', 'host1', 'host2', 'host3'],
    connect_options={"known_hosts": None},
    worker_options={"nthreads": 4, "memory_limit": "8GB"}
)

client = Client(cluster)
```

### Kubernetes Cluster

```python
from dask_kubernetes import KubeCluster
from dask.distributed import Client

# Create Kubernetes cluster
cluster = KubeCluster(
    n_workers=10,
    resources={
        "requests": {"memory": "4Gi", "cpu": "2"},
        "limits": {"memory": "8Gi", "cpu": "4"}
    }
)

client = Client(cluster)

# Scale cluster
cluster.scale(20)

# Adaptive scaling
cluster.adapt(minimum=5, maximum=50)
```

## Machine Learning with Dask

### Dask-ML

```python
import dask.array as da
import dask_ml.datasets
from dask_ml.linear_model import LogisticRegression
from dask_ml.model_selection import train_test_split

# Generate data
X, y = dask_ml.datasets.make_classification(
    n_samples=100000,
    n_features=20,
    chunks=1000
)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)
score = model.score(X_test, y_test)

print(f"Accuracy: {score}")
```

### Hyperparameter Tuning

```python
from dask_ml.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier
import dask.array as da

# Create data
X, y = dask_ml.datasets.make_classification(
    n_samples=10000,
    n_features=20,
    chunks=1000
)

# Define parameter grid
param_grid = {
    'n_estimators': [10, 50, 100],
    'max_depth': [3, 5, 10],
    'min_samples_split': [2, 5, 10]
}

# Grid search
grid_search = GridSearchCV(
    RandomForestClassifier(),
    param_grid,
    cv=5,
    scoring='accuracy'
)

grid_search.fit(X, y)

print(f"Best params: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_}")
```

### XGBoost with Dask

```python
import dask.array as da
import dask.dataframe as dd
from xgboost import dask as dxgb
from dask.distributed import Client

# Initialize client
client = Client()

# Prepare data
X = da.random.random((100000, 100), chunks=(10000, 100))
y = da.random.random(100000, chunks=10000)

dtrain = dxgb.DaskDMatrix(client, X, y)

# Train
params = {
    'objective': 'reg:squarederror',
    'max_depth': 5,
    'eta': 0.1
}

output = dxgb.train(
    client,
    params,
    dtrain,
    num_boost_round=100
)

# Predict
predictions = dxgb.predict(client, output['booster'], X)
```

## Advanced Features

### Custom Computations with Delayed

```python
from dask import delayed
import time

@delayed
def inc(x):
    time.sleep(1)
    return x + 1

@delayed
def add(x, y):
    time.sleep(1)
    return x + y

# Build computation graph
x = inc(1)
y = inc(2)
z = add(x, y)

# Compute
result = z.compute()  # Takes ~2 seconds (parallel)
print(result)  # 5

# With multiple outputs
@delayed
def process_data(filename):
    # Process file
    return {'mean': 10, 'std': 2}

results = [process_data(f'file_{i}.csv') for i in range(100)]
computed = delayed(lambda x: x)(results).compute()
```

### Futures for Real-time Processing

```python
from dask.distributed import Client

client = Client()

def process(x):
    return x ** 2

# Submit work
futures = [client.submit(process, i) for i in range(10)]

# Gather results
results = client.gather(futures)
print(results)

# As completed
from dask.distributed import as_completed

for future in as_completed(futures):
    result = future.result()
    print(f"Completed: {result}")
```

### Persist and Caching

```python
import dask.array as da
from dask.distributed import Client

client = Client()

# Create computation
x = da.random.random((10000, 10000), chunks=(1000, 1000))
y = x + x.T

# Persist in distributed memory
y = y.persist()

# Now multiple computations on y are fast
mean = y.mean().compute()
std = y.std().compute()
max_val = y.max().compute()
```

## Performance Optimization

### Chunk Size Optimization

```python
import dask.array as da

# Too small chunks (overhead)
x = da.random.random((10000, 10000), chunks=(10, 10))  # Bad

# Good chunk size (100-1000 KB per chunk)
x = da.random.random((10000, 10000), chunks=(1000, 1000))  # Good

# Auto chunks
x = da.random.random((10000, 10000), chunks='auto')  # Let Dask decide
```

### Avoid Immediate Computation

```python
import dask.dataframe as dd

# Bad - multiple compute calls
df = dd.read_csv('data.csv')
mean = df['col1'].mean().compute()  # Compute 1
std = df['col1'].std().compute()    # Compute 2

# Good - single compute
df = dd.read_csv('data.csv')
result = df['col1'].agg(['mean', 'std']).compute()  # Single compute
```

### Use Persist Strategically

```python
import dask.dataframe as dd

df = dd.read_csv('large_data/*.csv')

# Expensive preprocessing
df = df[df['value'] > 0]
df['new_col'] = df['col1'] * df['col2']

# Persist after preprocessing
df = df.persist()

# Now multiple operations are fast
result1 = df.groupby('category').sum().compute()
result2 = df.groupby('region').mean().compute()
```

## Monitoring and Diagnostics

### Dashboard

```python
from dask.distributed import Client

# Dashboard available at http://localhost:8787
client = Client()

# Perform computation
import dask.array as da
x = da.random.random((100000, 1000), chunks=(10000, 1000))
result = x.mean().compute()

# Check progress, memory, tasks in dashboard
```

### Progress Bar

```python
from dask.diagnostics import ProgressBar

import dask.array as da

x = da.random.random((10000, 10000), chunks=(1000, 1000))

with ProgressBar():
    result = x.mean().compute()
```

### Profiling

```python
from dask.diagnostics import Profiler, ResourceProfiler, visualize

import dask.array as da

x = da.random.random((10000, 10000), chunks=(1000, 1000))

with Profiler() as prof, ResourceProfiler() as rprof:
    result = x.sum().compute()

# Visualize
visualize([prof, rprof], filename='profile.html')
```

## Best Practices

### 1. Choose Appropriate Collections

```python
# Use Dask Array for numerical data
import dask.array as da
x = da.random.random((10000, 10000))

# Use Dask DataFrame for tabular data
import dask.dataframe as dd
df = dd.read_csv('data.csv')

# Use Dask Bag for unstructured data
import dask.bag as db
bag = db.read_text('logs/*.txt')
```

### 2. Optimize I/O

```python
# Good - columnar format
df = dd.read_parquet('data/*.parquet')

# Use compression
df.to_parquet('output/', compression='snappy')

# Specify dtypes
df = dd.read_csv('data.csv', dtype={'id': 'int64', 'value': 'float32'})
```

### 3. Resource Management

```python
from dask.distributed import Client

client = Client(
    n_workers=4,
    threads_per_worker=2,
    memory_limit='4GB',
    processes=True  # Use processes instead of threads
)
```

## Troubleshooting

### Out of Memory

```python
# Reduce chunk size
df = dd.read_csv('data.csv', blocksize='32MB')  # Instead of default 64MB

# Use smaller dtypes
df['column'] = df['column'].astype('float32')  # Instead of float64

# Spill to disk
from dask.distributed import Client

client = Client(
    local_directory='/tmp/dask-worker-space',
    memory_limit='4GB'
)
```

### Slow Performance

```python
# Check task graph size
import dask

# Visualize to identify issues
computation.visualize(filename='graph.png')

# Repartition if too many partitions
df = df.repartition(npartitions=10)

# Use persist for repeated computations
df = df.persist()
```

## Resources

- [Dask Documentation](https://docs.dask.org/)
- [Dask Tutorial](https://tutorial.dask.org/)
- [Dask Examples](https://examples.dask.org/)
- [Dask GitHub Repository](https://github.com/dask/dask)
- [Dask Blog](https://blog.dask.org/)
- [Dask Discourse](https://dask.discourse.group/)

## Next Steps

- Start with Dask Array or DataFrame
- Experiment with local cluster
- Set up distributed cluster
- Integrate with ML workflows
- Optimize chunk sizes
- Monitor with dashboard
- Explore Dask-ML
- Deploy on Kubernetes
- Profile and optimize performance
- Build scalable data pipelines

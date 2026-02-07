# RAPIDS

## Introduction

RAPIDS is an open-source suite of libraries and APIs that gives you the ability to execute end-to-end data science and analytics pipelines entirely on GPUs. Built on CUDA, RAPIDS provides a familiar data science experience using GPU acceleration to dramatically speed up computations.

### What is RAPIDS?

RAPIDS is developed by NVIDIA and provides GPU-accelerated data science libraries that follow familiar APIs from the Python data science ecosystem. It enables data scientists and engineers to leverage GPU acceleration without needing to know CUDA programming.

### Key Features

- **GPU Acceleration**: 10-50x faster than CPU-only solutions
- **Familiar APIs**: Drop-in replacement for pandas, scikit-learn, NetworkX
- **End-to-End Pipeline**: Data prep, ML training, and deployment on GPU
- **Interoperability**: Works with existing Python data science tools
- **Apache Arrow**: Zero-copy data sharing between processes
- **Dask Integration**: Multi-GPU and multi-node scaling
- **Open Source**: Apache 2.0 license
- **CUDA-X**: Built on NVIDIA's CUDA-X AI platform
- **Memory Efficient**: Optimized GPU memory management
- **Easy Migration**: Minimal code changes from CPU workflows

### Core Libraries

**cuDF** - GPU DataFrame library (pandas-like API)
**cuML** - GPU machine learning library (scikit-learn-like API)
**cuGraph** - GPU graph analytics library (NetworkX-like API)
**cuSpatial** - GPU-accelerated spatial and trajectory data processing
**cuSignal** - GPU-accelerated signal processing
**cuCIM** - GPU-accelerated image processing for computational imaging
**cuxfilter** - GPU-accelerated cross-filtering for interactive dashboards

### Use Cases

- **Large-Scale ETL**: Process billions of rows in seconds
- **Machine Learning**: Train models 10-50x faster
- **Graph Analytics**: Analyze massive graphs and networks
- **Time Series Analysis**: Process streaming and historical data
- **Geospatial Analytics**: Accelerate location-based computations
- **Signal Processing**: Real-time signal and image processing
- **Feature Engineering**: Generate features at scale
- **Interactive Dashboards**: Build responsive data apps

### RAPIDS vs Traditional CPU Libraries

| Feature | RAPIDS (GPU) | CPU Libraries | Speedup |
|---------|-------------|---------------|---------|
| **DataFrame Operations** | cuDF | pandas | 10-100x |
| **Machine Learning** | cuML | scikit-learn | 20-50x |
| **Graph Analytics** | cuGraph | NetworkX | 100-1000x |
| **Deep Learning Prep** | cuDF + cuML | pandas + sklearn | 50-200x |
| **Data Loading** | cuDF | pandas | 5-20x |
| **Feature Engineering** | cuDF | pandas | 10-50x |

### Architecture Overview

```
┌─────────────────────────────────────────────────┐
│              Application Layer                   │
│  Python Scripts, Jupyter Notebooks, Dashboards  │
└─────────────────────────────────────────────────┘
                      │
┌─────────────────────────────────────────────────┐
│              RAPIDS Libraries                    │
│  cuDF │ cuML │ cuGraph │ cuSpatial │ cuSignal  │
└─────────────────────────────────────────────────┘
                      │
┌─────────────────────────────────────────────────┐
│          Foundation Libraries                    │
│    RMM    │   cuPy   │  Dask-CUDA │ UCX        │
└─────────────────────────────────────────────────┘
                      │
┌─────────────────────────────────────────────────┐
│              CUDA-X Libraries                    │
│  cuBLAS │ cuSPARSE │ cuSOLVER │ cuRAND │ Thrust│
└─────────────────────────────────────────────────┘
                      │
┌─────────────────────────────────────────────────┐
│                CUDA Runtime                      │
│              NVIDIA GPU Driver                   │
└─────────────────────────────────────────────────┘
```

---

## Installation & Setup

### System Requirements

**Hardware:**
- NVIDIA GPU with compute capability 7.0+ (Volta, Turing, Ampere, Ada Lovelace, Hopper)
- Recommended: RTX 3080/3090, A100, V100, T4, RTX 4090
- Minimum 8GB GPU memory (16GB+ recommended)

**Software:**
- CUDA 11.2+ or 12.0+
- Python 3.9, 3.10, or 3.11
- Linux: Ubuntu 20.04/22.04, CentOS 7/8, RHEL 7/8
- Windows: Experimental support via WSL2

### Installation Methods

**Option 1: Conda (Recommended)**
```bash
# Create conda environment
conda create -n rapids-23.12 -c rapidsai -c conda-forge -c nvidia \
    rapids=23.12 python=3.10 cudatoolkit=11.8

# Activate environment
conda activate rapids-23.12

# Verify installation
python -c "import cudf; print(cudf.__version__)"
```

**Option 2: Docker (Easiest)**
```bash
# Pull RAPIDS container
docker pull rapidsai/rapidsai:23.12-cuda11.8-runtime-ubuntu22.04-py3.10

# Run container with GPU support
docker run --gpus all --rm -it \
    -p 8888:8888 \
    -v $(pwd):/workspace \
    rapidsai/rapidsai:23.12-cuda11.8-runtime-ubuntu22.04-py3.10

# Inside container, start Jupyter
jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
```

**Option 3: Pip (Limited)**
```bash
# Install CUDA toolkit first
# Then install RAPIDS (not all packages available)
pip install cudf-cu11 cuml-cu11 cugraph-cu11
```

**Option 4: Build from Source**
```bash
# Clone repositories
git clone https://github.com/rapidsai/cudf.git
cd cudf
git checkout branch-23.12

# Build cuDF
./build.sh
```

### Quick Start Verification

```python
import cudf
import cuml
import cugraph
import cupy as cp

# Check CUDA availability
print(f"CUDA Available: {cp.cuda.is_available()}")
print(f"GPU Count: {cp.cuda.runtime.getDeviceCount()}")

# Create simple GPU DataFrame
gdf = cudf.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})
print(gdf)
```

---

## cuDF - GPU DataFrames

### Basic Operations

**Creating DataFrames:**
```python
import cudf
import pandas as pd
import numpy as np

# From Python lists
gdf = cudf.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})

# From NumPy arrays
gdf = cudf.DataFrame({
    'x': np.random.rand(1000000),
    'y': np.random.rand(1000000)
})

# From pandas DataFrame
pdf = pd.DataFrame({'a': range(1000000)})
gdf = cudf.from_pandas(pdf)

# From CSV (much faster than pandas)
gdf = cudf.read_csv('large_file.csv')

# From Parquet
gdf = cudf.read_parquet('data.parquet')

# From JSON
gdf = cudf.read_json('data.json', lines=True)
```

**DataFrame Operations:**
```python
# Selection and filtering
gdf = cudf.DataFrame({'a': range(100), 'b': range(100, 200)})

# Column selection
gdf['a']
gdf[['a', 'b']]

# Row filtering
gdf[gdf['a'] > 50]
gdf.query('a > 50 and b < 150')

# iloc and loc
gdf.iloc[0:10]
gdf.loc[gdf['a'] > 50]

# Sorting
gdf.sort_values('a', ascending=False)
gdf.sort_values(['a', 'b'])

# Unique values
gdf['a'].unique()
gdf['a'].nunique()
```

**Aggregations:**
```python
# Basic stats
gdf['a'].mean()
gdf['a'].sum()
gdf['a'].std()
gdf.describe()

# GroupBy operations
gdf.groupby('category')['value'].sum()
gdf.groupby(['cat1', 'cat2']).agg({'value': ['mean', 'sum', 'count']})

# Rolling windows
gdf['value'].rolling(window=7).mean()
```

**Joins and Merges:**
```python
# Create two DataFrames
gdf1 = cudf.DataFrame({'key': [1, 2, 3], 'value1': ['a', 'b', 'c']})
gdf2 = cudf.DataFrame({'key': [1, 2, 4], 'value2': ['x', 'y', 'z']})

# Inner join
result = gdf1.merge(gdf2, on='key', how='inner')

# Left join
result = gdf1.merge(gdf2, on='key', how='left')

# Outer join
result = gdf1.merge(gdf2, on='key', how='outer')

# Multiple keys
result = gdf1.merge(gdf2, on=['key1', 'key2'])
```

**String Operations:**
```python
import cudf

gdf = cudf.DataFrame({'text': ['apple', 'banana', 'cherry']})

# String methods
gdf['text'].str.upper()
gdf['text'].str.contains('an')
gdf['text'].str.replace('a', 'A')
gdf['text'].str.split('a', expand=True)
gdf['text'].str.len()

# Regex operations
gdf['text'].str.extract(r'([a-z]+)')
```

**DateTime Operations:**
```python
# Create datetime column
gdf = cudf.DataFrame({
    'date': cudf.date_range('2024-01-01', periods=100, freq='D')
})

# Extract components
gdf['year'] = gdf['date'].dt.year
gdf['month'] = gdf['date'].dt.month
gdf['day'] = gdf['date'].dt.day
gdf['dayofweek'] = gdf['date'].dt.dayofweek

# Time deltas
gdf['date'] + pd.Timedelta(days=7)
```

### Performance Comparison Example

```python
import cudf
import pandas as pd
import time

# Create large dataset
size = 10_000_000

# CPU pandas
start = time.time()
pdf = pd.DataFrame({
    'x': np.random.rand(size),
    'y': np.random.randint(0, 100, size)
})
result_cpu = pdf.groupby('y')['x'].mean()
cpu_time = time.time() - start

# GPU cuDF
start = time.time()
gdf = cudf.DataFrame({
    'x': np.random.rand(size),
    'y': np.random.randint(0, 100, size)
})
result_gpu = gdf.groupby('y')['x'].mean()
gpu_time = time.time() - start

print(f"CPU Time: {cpu_time:.2f}s")
print(f"GPU Time: {gpu_time:.2f}s")
print(f"Speedup: {cpu_time/gpu_time:.1f}x")
```

---

## cuML - GPU Machine Learning

### Supported Algorithms

**Regression:**
- Linear Regression
- Ridge Regression
- Lasso Regression
- ElasticNet
- Random Forest Regressor
- XGBoost (via integration)

**Classification:**
- Logistic Regression
- Random Forest Classifier
- Support Vector Machines (SVC)
- K-Nearest Neighbors (KNN)
- Naive Bayes

**Clustering:**
- K-Means
- DBSCAN
- Hierarchical Clustering
- UMAP (dimensionality reduction)

**Dimensionality Reduction:**
- PCA (Principal Component Analysis)
- TSNE
- UMAP
- TruncatedSVD

### Linear Regression Example

```python
import cudf
import cuml
from cuml.linear_model import LinearRegression
import numpy as np

# Generate data
n_samples = 1_000_000
n_features = 100

X = cudf.DataFrame(np.random.rand(n_samples, n_features))
y = cudf.Series(np.random.rand(n_samples))

# Split data
from cuml.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

# Evaluate
from cuml.metrics import r2_score
score = r2_score(y_test, predictions)
print(f"R² Score: {score}")
```

### Random Forest Classification

```python
from cuml.ensemble import RandomForestClassifier
from cuml.metrics import accuracy_score
import cudf
import numpy as np

# Generate classification data
n_samples = 100_000
n_features = 50

X = cudf.DataFrame(np.random.rand(n_samples, n_features))
y = cudf.Series(np.random.randint(0, 2, n_samples))

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train Random Forest
rf = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    n_bins=16
)
rf.fit(X_train, y_train)

# Predict and evaluate
predictions = rf.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.4f}")
```

### K-Means Clustering

```python
from cuml.cluster import KMeans
import cudf
import numpy as np

# Generate data
n_samples = 500_000
X = cudf.DataFrame(np.random.rand(n_samples, 2))

# Create and fit K-Means
kmeans = KMeans(n_clusters=5, max_iter=300)
kmeans.fit(X)

# Get cluster labels and centers
labels = kmeans.labels_
centers = kmeans.cluster_centers_

print(f"Cluster Centers:\n{centers}")
```

### UMAP Dimensionality Reduction

```python
from cuml.manifold import UMAP
import cudf
import numpy as np

# Generate high-dimensional data
n_samples = 10_000
n_features = 100

X = cudf.DataFrame(np.random.rand(n_samples, n_features))

# Apply UMAP
umap = UMAP(n_components=2, n_neighbors=15)
X_embedded = umap.fit_transform(X)

print(f"Reduced dimensions: {X_embedded.shape}")
```

### Cross-Validation

```python
from cuml.model_selection import GridSearchCV
from cuml.svm import SVC

# Define parameter grid
param_grid = {
    'C': [0.1, 1, 10],
    'kernel': ['rbf', 'linear']
}

# Create GridSearchCV
grid_search = GridSearchCV(
    SVC(),
    param_grid,
    cv=5,
    scoring='accuracy'
)

# Fit and find best parameters
grid_search.fit(X_train, y_train)
print(f"Best parameters: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_}")
```

---

## cuGraph - GPU Graph Analytics

### Graph Creation

```python
import cugraph
import cudf

# Create edge list
edges = cudf.DataFrame({
    'source': [0, 1, 2, 3, 4],
    'destination': [1, 2, 0, 4, 3],
    'weight': [1.0, 2.0, 1.5, 0.5, 1.0]
})

# Create directed graph
G = cugraph.Graph(directed=True)
G.from_cudf_edgelist(edges, source='source', destination='destination', edge_attr='weight')

# Create undirected graph
G_undirected = cugraph.Graph(directed=False)
G_undirected.from_cudf_edgelist(edges, source='source', destination='destination')
```

### PageRank

```python
import cugraph
import cudf

# Create graph
edges = cudf.DataFrame({
    'src': [0, 1, 2, 3, 4, 5],
    'dst': [1, 2, 0, 4, 5, 3]
})

G = cugraph.Graph()
G.from_cudf_edgelist(edges, source='src', destination='dst')

# Calculate PageRank
pagerank = cugraph.pagerank(G, alpha=0.85, max_iter=100)
print(pagerank.sort_values(by='pagerank', ascending=False))
```

### Community Detection (Louvain)

```python
# Detect communities using Louvain
louvain_parts, modularity = cugraph.louvain(G)

print(f"Modularity: {modularity}")
print(louvain_parts)
```

### Shortest Path

```python
# Single source shortest path (Dijkstra)
distances = cugraph.sssp(G, source=0)
print(distances)

# All pairs shortest path (Floyd-Warshall for small graphs)
# For large graphs, use Johnson's algorithm
```

### Connected Components

```python
# Find connected components
labels = cugraph.connected_components(G)
print(labels)
```

---

## Dask Integration for Multi-GPU

### Dask-CUDA Setup

```python
from dask_cuda import LocalCUDACluster
from dask.distributed import Client
import dask_cudf

# Create GPU cluster
cluster = LocalCUDACluster()
client = Client(cluster)

print(f"Dashboard link: {client.dashboard_link}")
```

### Distributed DataFrame Operations

```python
import dask_cudf as dask

# Read large CSV across multiple GPUs
ddf = dask.read_csv('large_dataset.csv')

# Perform operations
result = ddf.groupby('category')['value'].mean().compute()

# Parallel processing
ddf['new_column'] = ddf['col1'] + ddf['col2']
result = ddf.compute()
```

### Distributed Machine Learning

```python
from cuml.dask.ensemble import RandomForestClassifier as cumlDaskRF
from dask_ml.model_selection import train_test_split
import dask_cudf

# Load distributed data
ddf = dask_cudf.read_parquet('data/*.parquet')
X = ddf[['feature1', 'feature2', 'feature3']]
y = ddf['target']

# Train distributed Random Forest
rf = cumlDaskRF(n_estimators=100)
rf.fit(X, y)

# Predict
predictions = rf.predict(X)
```

---

## Real-World Examples

### Example 1: Log Analytics Pipeline

```python
import cudf
import cuml
from cuml.preprocessing import LabelEncoder

# Read large log files
logs = cudf.read_csv('server_logs.csv', parse_dates=['timestamp'])

# Feature engineering
logs['hour'] = logs['timestamp'].dt.hour
logs['day_of_week'] = logs['timestamp'].dt.dayofweek

# Encode categorical variables
le = LabelEncoder()
logs['endpoint_encoded'] = le.fit_transform(logs['endpoint'])

# Anomaly detection using isolation forest
from cuml.ensemble import IsolationForest

features = logs[['response_time', 'status_code', 'endpoint_encoded']]
iso_forest = IsolationForest(contamination=0.1)
anomalies = iso_forest.fit_predict(features)

# Flag anomalies
logs['is_anomaly'] = anomalies == -1
anomalous_logs = logs[logs['is_anomaly']]

print(f"Found {len(anomalous_logs)} anomalous requests")
```

### Example 2: Customer Segmentation

```python
import cudf
import cuml
from cuml.cluster import KMeans
from cuml.preprocessing import StandardScaler

# Load customer data
customers = cudf.read_parquet('customers.parquet')

# Select features for clustering
features = customers[['age', 'income', 'purchase_frequency', 'avg_order_value']]

# Scale features
scaler = StandardScaler()
features_scaled = scaler.fit_transform(features)

# K-Means clustering
kmeans = KMeans(n_clusters=5, random_state=42)
customers['segment'] = kmeans.fit_predict(features_scaled)

# Analyze segments
segment_analysis = customers.groupby('segment').agg({
    'age': 'mean',
    'income': 'mean',
    'purchase_frequency': 'mean',
    'avg_order_value': 'mean'
})

print(segment_analysis)
```

### Example 3: Real-Time Feature Engineering

```python
import cudf
from datetime import datetime, timedelta

def process_streaming_data(df):
    """Process streaming data with GPU acceleration"""
    
    # Convert to cuDF
    gdf = cudf.from_pandas(df)
    
    # Time-based features
    gdf['hour'] = gdf['timestamp'].dt.hour
    gdf['is_weekend'] = gdf['timestamp'].dt.dayofweek >= 5
    
    # Rolling aggregations
    gdf = gdf.sort_values('timestamp')
    gdf['rolling_mean_7d'] = gdf['value'].rolling(window=7).mean()
    gdf['rolling_std_7d'] = gdf['value'].rolling(window=7).std()
    
    # Lag features
    gdf['value_lag_1'] = gdf['value'].shift(1)
    gdf['value_lag_7'] = gdf['value'].shift(7)
    
    # Difference features
    gdf['value_diff'] = gdf['value'] - gdf['value_lag_1']
    
    return gdf.to_pandas()

# Process batches
result = process_streaming_data(incoming_data)
```

---

## Best Practices

### Memory Management

```python
import cupy as cp
import cudf

# Monitor GPU memory
print(f"GPU Memory: {cp.cuda.runtime.memGetInfo()}")

# Explicit memory cleanup
del large_dataframe
cp.get_default_memory_pool().free_all_blocks()

# Use memory pool configuration
mempool = cp.get_default_memory_pool()
pinned_mempool = cp.get_default_pinned_memory_pool()

# Limit memory usage
mempool.set_limit(size=8*1024**3)  # 8GB limit
```

### Data Transfer Optimization

```python
# Minimize host-device transfers
# BAD: Multiple transfers
for i in range(100):
    gdf = cudf.from_pandas(small_pdf)
    result = gdf.mean()
    
# GOOD: Single transfer
gdf = cudf.from_pandas(large_pdf)
results = [gdf.mean() for _ in range(100)]

# Use zero-copy when possible
# Convert without copying
gdf = cudf.DataFrame.from_records(data, nan_as_null=False)
```

### Batching for Large Datasets

```python
import cudf

def process_in_batches(filename, batch_size=1_000_000):
    """Process large CSV in batches"""
    results = []
    
    for chunk in cudf.read_csv(filename, chunksize=batch_size):
        # Process chunk
        result = chunk.groupby('category')['value'].mean()
        results.append(result)
    
    # Combine results
    final_result = cudf.concat(results).groupby(level=0).mean()
    return final_result
```

### Performance Monitoring

```python
import time
import cupy as cp

def benchmark_operation(func, *args, **kwargs):
    """Benchmark GPU operation"""
    # Warm up
    func(*args, **kwargs)
    
    # Synchronize and time
    cp.cuda.Stream.null.synchronize()
    start = time.time()
    
    result = func(*args, **kwargs)
    
    cp.cuda.Stream.null.synchronize()
    elapsed = time.time() - start
    
    return result, elapsed

# Usage
result, time_taken = benchmark_operation(gdf.groupby, 'category')
print(f"Operation took {time_taken:.4f} seconds")
```

---

## Integration with Other Tools

### PyTorch Integration

```python
import cudf
import torch
from torch.utils.data import DataLoader, TensorDataset

# Load data with cuDF
gdf = cudf.read_csv('training_data.csv')

# Convert to PyTorch tensors
X = torch.tensor(gdf[feature_cols].values, dtype=torch.float32)
y = torch.tensor(gdf['target'].values, dtype=torch.float32)

# Create DataLoader
dataset = TensorDataset(X, y)
loader = DataLoader(dataset, batch_size=64, shuffle=True)

# Move to GPU
device = torch.device('cuda')
model = MyModel().to(device)

# Training loop
for X_batch, y_batch in loader:
    X_batch = X_batch.to(device)
    y_batch = y_batch.to(device)
    # ... training code
```

### XGBoost Integration

```python
import cudf
import xgboost as xgb

# Load data
gdf = cudf.read_parquet('data.parquet')
X = gdf[feature_cols]
y = gdf['target']

# Convert to DMatrix (cuDF aware)
dtrain = xgb.DMatrix(X, label=y)

# Train with GPU
params = {
    'tree_method': 'gpu_hist',
    'max_depth': 6,
    'eta': 0.3,
    'objective': 'binary:logistic'
}

model = xgb.train(params, dtrain, num_boost_round=100)
```

### Spark Integration

```python
from pyspark.sql import SparkSession

# Create Spark session with RAPIDS plugin
spark = SparkSession.builder \
    .appName("RAPIDS-Spark") \
    .config("spark.rapids.sql.enabled", "true") \
    .config("spark.plugins", "com.nvidia.spark.SQLPlugin") \
    .getOrCreate()

# Read data
df = spark.read.parquet("data.parquet")

# GPU-accelerated operations
result = df.groupBy("category").agg({"value": "mean"})
result.show()
```

---

## Troubleshooting

### Common Issues

**CUDA Out of Memory:**
```python
# Solution 1: Process in batches
for chunk in cudf.read_csv('large.csv', chunksize=100000):
    process(chunk)

# Solution 2: Reduce data size
gdf = gdf.astype({'col1': 'float32', 'col2': 'int32'})

# Solution 3: Clear memory
import cupy as cp
cp.get_default_memory_pool().free_all_blocks()
```

**Slow Performance:**
```python
# Check GPU utilization
nvidia-smi -l 1

# Use appropriate data types
# BAD: Using float64/int64
gdf['col'] = gdf['col'].astype('float64')

# GOOD: Using float32/int32
gdf['col'] = gdf['col'].astype('float32')
```

**Version Compatibility:**
```bash
# Check versions
python -c "import cudf; print(cudf.__version__)"
python -c "import cuml; print(cuml.__version__)"
nvidia-smi

# Ensure CUDA version matches
conda list | grep cuda
```

---

## Resources

### Official Documentation
- [RAPIDS Docs](https://docs.rapids.ai/)
- [cuDF Documentation](https://docs.rapids.ai/api/cudf/stable/)
- [cuML Documentation](https://docs.rapids.ai/api/cuml/stable/)
- [cuGraph Documentation](https://docs.rapids.ai/api/cugraph/stable/)

### Learning Resources
- [RAPIDS Getting Started](https://rapids.ai/start.html)
- [RAPIDS Notebooks](https://github.com/rapidsai/notebooks)
- [GPU Accelerated Data Science](https://www.nvidia.com/en-us/deep-learning-ai/solutions/data-science/)

### Community
- [GitHub Repository](https://github.com/rapidsai)
- [RAPIDS Slack](https://rapids.ai/community.html)
- [NVIDIA Developer Forums](https://forums.developer.nvidia.com/)

### Tools & Extensions
- [cuDF-Pandas](https://github.com/rapidsai/cudf) - Pandas acceleration mode
- [BlazingSQL](https://blazingsql.com/) - GPU SQL engine
- [cuSpatial](https://github.com/rapidsai/cuspatial) - Geospatial analytics

---

## Comparison Matrix

| Feature | RAPIDS | Pandas | PySpark | Dask |
|---------|--------|---------|---------|------|
| **Hardware** | GPU | CPU | CPU (multi-node) | CPU (multi-node) |
| **Speed** | 10-100x | Baseline | 2-5x | 2-10x |
| **Memory** | GPU RAM | System RAM | Distributed | Distributed |
| **API** | Pandas-like | Native | SQL + Python | Pandas-like |
| **Scale** | Single GPU to multi-GPU | Single machine | Large clusters | Medium to large |
| **Setup** | GPU required | Easy | Complex | Medium |
| **Cost** | GPU hardware | Low | Cluster costs | Cluster costs |

---

**Last Updated:** February 2026

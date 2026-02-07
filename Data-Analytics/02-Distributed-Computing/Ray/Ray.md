# Ray

## Introduction

### What is Ray?

Ray is an open-source unified framework for scaling AI and Python applications. It provides a simple, universal API for building distributed applications, enabling you to parallelize Python code with minimal code changes. Ray is designed for both data scientists and engineers, offering high-level libraries for machine learning, reinforcement learning, and data processing.

### Why Ray?

- Easy parallelization of Python code
- Distributed computing without infrastructure complexity
- Scalable from laptop to cluster
- High-performance distributed execution
- Built-in ML libraries (Ray Tune, Ray Train, Ray Serve)
- Support for heterogeneous resources (CPUs, GPUs, TPUs)
- Fault tolerance and auto-recovery
- Integration with popular ML frameworks
- Actor model for stateful computations
- Real-time and batch workloads

## Prerequisites

- Python 3.8 or higher
- pip package manager
- Basic understanding of Python
- (Optional) Understanding of distributed computing
- (Optional) Cluster or cloud resources for scaling

## Installation

### Using pip

```bash
# Install Ray
pip install ray

# Install with all components
pip install "ray[default]"

# Install with specific components
pip install "ray[tune]"  # Hyperparameter tuning
pip install "ray[train]" # Distributed training
pip install "ray[serve]" # Model serving
pip install "ray[rllib]" # Reinforcement learning

# Install with all ML libraries
pip install "ray[air]"   # Ray AIR (AI Runtime)
```

### Using conda

```bash
# Install Ray
conda install -c conda-forge ray

# With components
conda install -c conda-forge "ray-default"
```

### Verify Installation

```python
import ray
print(ray.__version__)

# Initialize Ray
ray.init()
print(ray.cluster_resources())
ray.shutdown()
```

## Core Concepts

### 1. Tasks (Stateless Functions)

```python
import ray
import time

# Initialize Ray
ray.init()

# Define remote function with decorator
@ray.remote
def square(x):
    time.sleep(1)  # Simulate computation
    return x * x

# Sequential execution (slow)
start = time.time()
results = [square(i) for i in range(4)]
print(f"Sequential: {time.time() - start:.2f}s")

# Parallel execution (fast)
start = time.time()
futures = [square.remote(i) for i in range(4)]
results = ray.get(futures)
print(f"Parallel: {time.time() - start:.2f}s")
print(f"Results: {results}")

ray.shutdown()
```

### 2. Actors (Stateful Classes)

```python
import ray

ray.init()

@ray.remote
class Counter:
    def __init__(self):
        self.value = 0
    
    def increment(self):
        self.value += 1
        return self.value
    
    def get_value(self):
        return self.value

# Create actor instances
counter1 = Counter.remote()
counter2 = Counter.remote()

# Call actor methods
future1 = counter1.increment.remote()
future2 = counter2.increment.remote()

print(ray.get(future1))  # 1
print(ray.get(future2))  # 1

# Multiple calls
futures = [counter1.increment.remote() for _ in range(5)]
print(ray.get(futures))  # [2, 3, 4, 5, 6]

ray.shutdown()
```

### 3. Object Store

```python
import ray
import numpy as np

ray.init()

# Put object in object store
large_array = np.random.rand(1000, 1000)
ref = ray.put(large_array)

@ray.remote
def process_array(array_ref):
    array = ray.get(array_ref)
    return array.mean()

# Reuse object from store (efficient)
futures = [process_array.remote(ref) for _ in range(10)]
results = ray.get(futures)

print(f"Mean: {np.mean(results)}")

ray.shutdown()
```

## Distributed Data Processing

### Parallel Map

```python
import ray

ray.init()

@ray.remote
def process_item(item):
    return item * 2

# Process list in parallel
data = list(range(1000))
futures = [process_item.remote(item) for item in data]
results = ray.get(futures)

# Or use ray.util.multiprocessing
from ray.util.multiprocessing import Pool

pool = Pool()
results = pool.map(lambda x: x * 2, data)

ray.shutdown()
```

### Ray Datasets

```python
import ray

# Create dataset
ds = ray.data.range(1000)

# Transform
ds = ds.map(lambda x: {"value": x["id"] * 2})

# Filter
ds = ds.filter(lambda x: x["value"] > 100)

# Aggregate
print(ds.count())

# Read from files
ds = ray.data.read_csv("s3://my-bucket/data.csv")
ds = ray.data.read_parquet("data/*.parquet")
ds = ray.data.read_json("data.json")

# Process in batches
def process_batch(batch):
    import pandas as pd
    df = pd.DataFrame(batch)
    # Process DataFrame
    return df

ds = ds.map_batches(process_batch, batch_format="pandas")

# Write results
ds.write_parquet("output/")
```

## Machine Learning with Ray

### Ray Train (Distributed Training)

```python
import ray
from ray import train
from ray.train import ScalingConfig
import torch
import torch.nn as nn

def train_func(config):
    # Training logic
    model = nn.Linear(10, 1)
    optimizer = torch.optim.SGD(model.parameters(), lr=config["lr"])
    
    for epoch in range(config["epochs"]):
        # Training step
        loss = torch.randn(1)  # Dummy loss
        
        # Report metrics to Ray Train
        train.report({"loss": loss.item(), "epoch": epoch})

# Configure distributed training
from ray.train.torch import TorchTrainer

trainer = TorchTrainer(
    train_func,
    train_loop_config={"lr": 0.001, "epochs": 10},
    scaling_config=ScalingConfig(
        num_workers=4,
        use_gpu=True
    )
)

# Run training
result = trainer.fit()
print(result.metrics)
```

### PyTorch Distributed Training

```python
import ray
from ray import train
from ray.train.torch import TorchTrainer
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

def train_epoch(model, dataloader, optimizer, device):
    model.train()
    total_loss = 0
    
    for batch_idx, (data, target) in enumerate(dataloader):
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = nn.functional.cross_entropy(output, target)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    
    return total_loss / len(dataloader)

def train_func_distributed(config):
    # Get distributed training context
    device = train.torch.get_device()
    
    # Create model and wrap with DDP
    model = nn.Sequential(
        nn.Linear(10, 64),
        nn.ReLU(),
        nn.Linear(64, 3)
    ).to(device)
    
    model = train.torch.prepare_model(model)
    
    # Prepare data
    dataset = TensorDataset(
        torch.randn(1000, 10),
        torch.randint(0, 3, (1000,))
    )
    dataloader = DataLoader(dataset, batch_size=32, shuffle=True)
    dataloader = train.torch.prepare_data_loader(dataloader)
    
    # Optimizer
    optimizer = optim.Adam(model.parameters(), lr=config["lr"])
    
    # Training loop
    for epoch in range(config["epochs"]):
        loss = train_epoch(model, dataloader, optimizer, device)
        
        # Report metrics
        train.report({"loss": loss, "epoch": epoch})
    
    # Save checkpoint
    state_dict = model.state_dict()
    train.report(metrics={}, checkpoint=train.Checkpoint.from_dict({"model": state_dict}))

# Run distributed training
trainer = TorchTrainer(
    train_func_distributed,
    train_loop_config={"lr": 0.001, "epochs": 10},
    scaling_config=ScalingConfig(num_workers=4, use_gpu=True)
)

result = trainer.fit()
```

### Ray Tune (Hyperparameter Tuning)

```python
import ray
from ray import tune
from ray.tune import CLIReporter
from ray.tune.schedulers import ASHAScheduler

def objective(config):
    # Simulated training
    for step in range(100):
        # Compute metric (in real scenario, train model)
        score = config["a"] * step + config["b"]
        
        # Report to Tune
        tune.report(score=score)

# Define search space
search_space = {
    "a": tune.uniform(0, 1),
    "b": tune.uniform(0, 20)
}

# Configure scheduler
scheduler = ASHAScheduler(
    metric="score",
    mode="max",
    max_t=100,
    grace_period=10,
    reduction_factor=2
)

# Run tuning
tuner = tune.Tuner(
    objective,
    param_space=search_space,
    tune_config=tune.TuneConfig(
        num_samples=20,
        scheduler=scheduler,
        metric="score",
        mode="max"
    ),
    run_config=train.RunConfig(
        name="my_experiment",
        progress_reporter=CLIReporter(
            metric_columns=["score", "training_iteration"]
        )
    )
)

results = tuner.fit()

# Get best result
best_result = results.get_best_result()
print(f"Best config: {best_result.config}")
print(f"Best score: {best_result.metrics['score']}")
```

### Ray Tune with ML Models

```python
from ray import tune
from ray.tune.schedulers import AsyncHyperBandScheduler
import torch
import torch.nn as nn
import torch.optim as optim

def train_model(config):
    # Model
    model = nn.Sequential(
        nn.Linear(10, config["hidden_size"]),
        nn.ReLU(),
        nn.Linear(config["hidden_size"], 1)
    )
    
    optimizer = optim.SGD(
        model.parameters(),
        lr=config["lr"],
        momentum=config["momentum"]
    )
    
    # Training loop
    for epoch in range(100):
        # Dummy training
        loss = torch.randn(1).item()
        accuracy = 0.5 + (epoch / 100) * 0.4
        
        # Report metrics
        tune.report(loss=loss, accuracy=accuracy)

# Search space
config = {
    "lr": tune.loguniform(1e-4, 1e-1),
    "momentum": tune.uniform(0.1, 0.9),
    "hidden_size": tune.choice([32, 64, 128, 256])
}

# Scheduler
scheduler = AsyncHyperBandScheduler(
    metric="accuracy",
    mode="max",
    max_t=100,
    grace_period=10
)

# Run
tuner = tune.Tuner(
    train_model,
    param_space=config,
    tune_config=tune.TuneConfig(
        num_samples=50,
        scheduler=scheduler,
        metric="accuracy",
        mode="max"
    )
)

results = tuner.fit()
print(f"Best config: {results.get_best_result().config}")
```

### Ray Serve (Model Serving)

```python
import ray
from ray import serve
import requests

# Start Ray Serve
ray.init()
serve.start()

# Define deployment
@serve.deployment(num_replicas=2, route_prefix="/predict")
class MLModel:
    def __init__(self):
        # Load model
        import pickle
        with open("model.pkl", "rb") as f:
            self.model = pickle.load(f)
    
    async def __call__(self, request):
        data = await request.json()
        prediction = self.model.predict([data["features"]])
        return {"prediction": prediction[0]}

# Deploy model
MLModel.deploy()

# Test
response = requests.post(
    "http://localhost:8000/predict",
    json={"features": [5.1, 3.5, 1.4, 0.2]}
)
print(response.json())

# Update deployment
@serve.deployment(num_replicas=4, route_prefix="/predict")
class MLModel:
    # Updated model
    pass

MLModel.deploy()
```

### Advanced Serve with Batching

```python
from ray import serve
import numpy as np

@serve.deployment(
    num_replicas=2,
    max_concurrent_queries=100,
    route_prefix="/batch-predict"
)
class BatchMLModel:
    def __init__(self):
        self.model = self.load_model()
    
    def load_model(self):
        # Load your model
        return None
    
    @serve.batch(max_batch_size=32, batch_wait_timeout_s=0.1)
    async def handle_batch(self, requests):
        # Extract data from requests
        data = [req["features"] for req in requests]
        
        # Batch prediction
        predictions = self.model.predict(np.array(data))
        
        # Return individual responses
        return [{"prediction": pred} for pred in predictions]
    
    async def __call__(self, request):
        data = await request.json()
        result = await self.handle_batch(data)
        return result

BatchMLModel.deploy()
```

## Ray Clusters

### Local Cluster

```bash
# Start Ray cluster head node
ray start --head --port=6379

# Start worker nodes
ray start --address='localhost:6379'

# Check cluster status
ray status

# Stop Ray
ray stop
```

### Programmatic Cluster

```python
import ray

# Connect to existing cluster
ray.init(address="auto")

# Or specify address
ray.init(address="ray://localhost:10001")

# Check resources
print(ray.cluster_resources())
```

### AWS Cluster

```yaml
# cluster.yaml
cluster_name: ml-cluster

max_workers: 4

provider:
    type: aws
    region: us-west-2
    availability_zone: us-west-2a

auth:
    ssh_user: ubuntu

head_node_type: head_node
available_node_types:
    head_node:
        node_config:
            InstanceType: m5.xlarge
            ImageId: ami-0a2363a9cff180a64
        resources: {"CPU": 4}
    
    worker_node:
        node_config:
            InstanceType: m5.2xlarge
            ImageId: ami-0a2363a9cff180a64
        resources: {"CPU": 8, "GPU": 1}
        min_workers: 0
        max_workers: 4

setup_commands:
    - pip install ray[default] torch
```

```bash
# Start cluster
ray up cluster.yaml

# Submit job
ray submit cluster.yaml script.py

# Attach to cluster
ray attach cluster.yaml

# Stop cluster
ray down cluster.yaml
```

## Best Practices

### Resource Management

```python
import ray

# Specify resources for tasks
@ray.remote(num_cpus=2, num_gpus=1, memory=1024*1024*1024)
def gpu_task(data):
    # GPU computation
    return result

# Custom resources
@ray.remote(resources={"custom_resource": 1})
def custom_task():
    pass

# Initialize with resources
ray.init(resources={"custom_resource": 4})
```

### Error Handling

```python
import ray

@ray.remote
def may_fail(x):
    if x < 0:
        raise ValueError("Negative value")
    return x * 2

# Handle errors
futures = [may_fail.remote(i) for i in range(-5, 5)]

for future in futures:
    try:
        result = ray.get(future)
        print(f"Success: {result}")
    except ValueError as e:
        print(f"Error: {e}")
```

### Monitoring

```python
import ray

# Enable dashboard
ray.init(dashboard_host="0.0.0.0", dashboard_port=8265)

# Access dashboard at http://localhost:8265

# Get task timeline
from ray import timeline
timeline.save("timeline.json")
```

## Troubleshooting

### Memory Issues

```python
# Increase object store memory
ray.init(object_store_memory=10 * 1024 * 1024 * 1024)  # 10GB

# Monitor memory usage
print(ray.available_resources())
```

### Performance Optimization

```python
# Use ray.put for large objects
large_data = generate_large_data()
ref = ray.put(large_data)

# Pass reference instead of value
@ray.remote
def process(data_ref):
    data = ray.get(data_ref)
    return process_data(data)

futures = [process.remote(ref) for _ in range(100)]
```

## Resources

- [Ray Documentation](https://docs.ray.io/)
- [Ray GitHub Repository](https://github.com/ray-project/ray)
- [Ray Tutorials](https://docs.ray.io/en/latest/ray-overview/getting-started.html)
- [Ray Summit](https://www.anyscale.com/ray-summit)
- [Ray Blog](https://www.anyscale.com/blog)
- [Ray Community](https://discuss.ray.io/)

## Next Steps

- Start with simple Ray tasks
- Experiment with Ray Tune for hyperparameter tuning
- Try distributed training with Ray Train
- Deploy models with Ray Serve
- Set up Ray cluster on cloud
- Explore Ray RLlib for reinforcement learning
- Integrate Ray with your ML pipeline
- Monitor cluster with Ray dashboard
- Optimize resource utilization
- Build production ML platform with Ray

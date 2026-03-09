# Weights & Biases (wandb)

## Introduction

### What is Weights & Biases?

Weights & Biases (W&B or wandb) is a machine learning platform designed for experiment tracking, dataset versioning, and model management. It provides tools to log hyperparameters, metrics, model outputs, and visualizations, making it easy to compare experiments and collaborate with teams.

### Why Weights & Biases?

- Automatic experiment tracking
- Real-time visualization dashboards
- Hyperparameter optimization (Sweeps)
- Model and dataset versioning (Artifacts)
- Collaborative reports and sharing
- Integration with all major ML frameworks
- GPU and system monitoring
- Distributed training support
- Code and environment tracking
- Production model monitoring

## Prerequisites

- Python 3.7 or higher
- Basic understanding of machine learning
- W&B account (free at [wandb.ai](https://wandb.ai))
- pip package manager

## Installation

### Using pip

```bash
# Install wandb
pip install wandb

# Login to W&B
wandb login

# Or set API key directly
wandb login --relogin
# Enter your API key from https://wandb.ai/authorize
```

### Using conda

```bash
# Install wandb
conda install -c conda-forge wandb

# Login
wandb login
```

### Environment Variable

```bash
# Set API key as environment variable
export WANDB_API_KEY=your_api_key_here

# Or in Python
import os
os.environ["WANDB_API_KEY"] = "your_api_key_here"
```

## Quick Start

### Basic Tracking

```python
import wandb
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

# Initialize W&B
wandb.init(
    project="iris-classification",
    name="random-forest-baseline",
    config={
        "n_estimators": 100,
        "max_depth": 5,
        "random_state": 42
    }
)

# Access config
config = wandb.config

# Load data
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(
    n_estimators=config.n_estimators,
    max_depth=config.max_depth,
    random_state=config.random_state
)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
f1 = f1_score(y_test, predictions, average='weighted')

# Log metrics
wandb.log({
    "accuracy": accuracy,
    "f1_score": f1,
    "test_samples": len(X_test)
})

# Finish run
wandb.finish()
```

## Core Features

### 1. Experiment Tracking

```python
import wandb
import numpy as np

# Initialize with config
wandb.init(
    project="my-project",
    name="experiment-1",
    tags=["baseline", "v1"],
    notes="First baseline experiment",
    config={
        "learning_rate": 0.001,
        "batch_size": 32,
        "epochs": 100,
        "architecture": "resnet50"
    }
)

# Log metrics over time
for epoch in range(100):
    train_loss = np.random.random()
    val_loss = np.random.random()
    
    wandb.log({
        "epoch": epoch,
        "train/loss": train_loss,
        "train/accuracy": 1 - train_loss,
        "val/loss": val_loss,
        "val/accuracy": 1 - val_loss
    })

# Log summary metrics
wandb.summary["best_accuracy"] = 0.95
wandb.summary["final_loss"] = 0.05

wandb.finish()
```

### 2. PyTorch Integration

```python
import wandb
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader

# Define model
class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, num_classes)
    
    def forward(self, x):
        out = self.fc1(x)
        out = self.relu(out)
        out = self.fc2(out)
        return out

# Initialize W&B
wandb.init(
    project="pytorch-example",
    config={
        "learning_rate": 0.001,
        "epochs": 20,
        "batch_size": 32,
        "hidden_size": 128
    }
)

config = wandb.config

# Initialize model
model = SimpleNN(input_size=4, hidden_size=config.hidden_size, num_classes=3)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=config.learning_rate)

# Watch model
wandb.watch(model, criterion, log="all", log_freq=10)

# Training loop
for epoch in range(config.epochs):
    model.train()
    for batch_idx, (data, target) in enumerate(train_loader):
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        
        # Log metrics
        if batch_idx % 10 == 0:
            wandb.log({
                "train/loss": loss.item(),
                "train/epoch": epoch
            })
    
    # Validation
    model.eval()
    val_loss = 0
    correct = 0
    with torch.no_grad():
        for data, target in val_loader:
            output = model(data)
            val_loss += criterion(output, target).item()
            pred = output.argmax(dim=1, keepdim=True)
            correct += pred.eq(target.view_as(pred)).sum().item()
    
    val_loss /= len(val_loader)
    accuracy = correct / len(val_loader.dataset)
    
    wandb.log({
        "val/loss": val_loss,
        "val/accuracy": accuracy,
        "epoch": epoch
    })

# Save model
torch.save(model.state_dict(), "model.pth")
wandb.save("model.pth")

wandb.finish()
```

### 3. TensorFlow/Keras Integration

```python
import wandb
from wandb.keras import WandbCallback
import tensorflow as tf
from tensorflow import keras

# Initialize W&B
wandb.init(
    project="keras-example",
    config={
        "learning_rate": 0.001,
        "epochs": 20,
        "batch_size": 32,
        "dropout": 0.2
    }
)

config = wandb.config

# Build model
model = keras.Sequential([
    keras.layers.Dense(64, activation='relu', input_shape=(4,)),
    keras.layers.Dropout(config.dropout),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dropout(config.dropout),
    keras.layers.Dense(3, activation='softmax')
])

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=config.learning_rate),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train with WandbCallback
history = model.fit(
    X_train, y_train,
    epochs=config.epochs,
    batch_size=config.batch_size,
    validation_data=(X_val, y_val),
    callbacks=[WandbCallback(save_model=True)]
)

wandb.finish()
```

### 4. Hyperparameter Sweeps

```yaml
# sweep.yaml
program: train.py
method: bayes
metric:
  name: val/accuracy
  goal: maximize
parameters:
  learning_rate:
    distribution: log_uniform_values
    min: 0.0001
    max: 0.1
  batch_size:
    values: [16, 32, 64, 128]
  epochs:
    value: 20
  dropout:
    distribution: uniform
    min: 0.1
    max: 0.5
  optimizer:
    values: ['adam', 'sgd', 'rmsprop']
```

```python
# train.py
import wandb

def train():
    # Initialize run
    wandb.init()
    
    # Get config from sweep
    config = wandb.config
    
    # Build and train model
    model = build_model(
        learning_rate=config.learning_rate,
        dropout=config.dropout,
        optimizer=config.optimizer
    )
    
    for epoch in range(config.epochs):
        # Training code
        train_loss, train_acc = train_epoch(model, train_loader)
        val_loss, val_acc = validate(model, val_loader)
        
        wandb.log({
            "train/loss": train_loss,
            "train/accuracy": train_acc,
            "val/loss": val_loss,
            "val/accuracy": val_acc,
            "epoch": epoch
        })

if __name__ == "__main__":
    train()
```

```bash
# Initialize sweep
wandb sweep sweep.yaml

# Run sweep agents
wandb agent your-entity/your-project/sweep-id
```

### 5. Logging Visualizations

```python
import wandb
import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay

wandb.init(project="visualization-example")

# Log images
plt.figure(figsize=(8, 6))
plt.plot([1, 2, 3, 4], [1, 4, 9, 16])
plt.title("Sample Plot")
wandb.log({"chart": wandb.Image(plt)})
plt.close()

# Log confusion matrix
cm = confusion_matrix(y_true, y_pred)
wandb.log({
    "confusion_matrix": wandb.plot.confusion_matrix(
        probs=None,
        y_true=y_true,
        preds=y_pred,
        class_names=class_names
    )
})

# Log multiple images
images = []
for i in range(10):
    img = sample_images[i]
    images.append(wandb.Image(img, caption=f"Sample {i}"))
wandb.log({"examples": images})

# Log tables
table = wandb.Table(
    columns=["epoch", "train_loss", "val_loss", "val_accuracy"],
    data=[
        [1, 0.5, 0.45, 0.85],
        [2, 0.3, 0.35, 0.88],
        [3, 0.2, 0.25, 0.92]
    ]
)
wandb.log({"results": table})

# Log histograms
wandb.log({"gradients": wandb.Histogram(gradient_values)})

# Log 3D objects
wandb.log({"point_cloud": wandb.Object3D(points)})

wandb.finish()
```

### 6. Artifacts (Model/Dataset Versioning)

```python
import wandb

# Initialize run
run = wandb.init(project="artifacts-example")

# Log dataset as artifact
dataset_artifact = wandb.Artifact(
    name="iris-dataset",
    type="dataset",
    description="Iris dataset for classification",
    metadata={
        "source": "sklearn",
        "size": 150,
        "features": 4
    }
)

# Add files to artifact
dataset_artifact.add_file("train.csv")
dataset_artifact.add_file("test.csv")
dataset_artifact.add_dir("data/")

# Log artifact
run.log_artifact(dataset_artifact)

# Log model as artifact
model_artifact = wandb.Artifact(
    name="iris-model",
    type="model",
    description="Random Forest classifier",
    metadata={
        "framework": "sklearn",
        "accuracy": 0.95
    }
)

model_artifact.add_file("model.pkl")
run.log_artifact(model_artifact)

# Use artifact in another run
run = wandb.init(project="artifacts-example")

# Download and use dataset
dataset = run.use_artifact("iris-dataset:latest")
dataset_dir = dataset.download()

# Download and use model
model_artifact = run.use_artifact("iris-model:v2")
model_dir = model_artifact.download()

wandb.finish()
```

### 7. System Monitoring

```python
import wandb

# Initialize with system monitoring
wandb.init(
    project="system-monitoring",
    settings=wandb.Settings(
        # Log system metrics
        _stats_sample_rate_seconds=1,
        _stats_samples_to_average=5
    )
)

# Manual GPU logging
wandb.log({
    "system/gpu_utilization": gpu_util,
    "system/gpu_memory": gpu_memory,
    "system/cpu_percent": cpu_percent,
    "system/disk_usage": disk_usage
})
```

## Advanced Features

### Custom Metrics and Charts

```python
import wandb

wandb.init(project="custom-charts")

# Log custom line plot
data = [[x, y] for (x, y) in zip(range(100), np.random.randn(100))]
table = wandb.Table(data=data, columns=["step", "value"])
wandb.log({
    "custom_plot": wandb.plot.line(
        table, "step", "value", title="Custom Line Plot"
    )
})

# Log scatter plot
wandb.log({
    "scatter": wandb.plot.scatter(
        table, "x", "y", title="Scatter Plot"
    )
})

# Log PR curve
wandb.log({
    "pr_curve": wandb.plot.pr_curve(
        y_true, y_probas, labels=class_names
    )
})

# Log ROC curve
wandb.log({
    "roc": wandb.plot.roc_curve(
        y_true, y_probas, labels=class_names
    )
})
```

### Distributed Training

```python
import wandb
import torch.distributed as dist

def train_distributed(rank, world_size):
    # Initialize process group
    dist.init_process_group("nccl", rank=rank, world_size=world_size)
    
    # Only rank 0 logs to W&B
    if rank == 0:
        wandb.init(project="distributed-training")
    
    # Training code
    for epoch in range(epochs):
        train_loss = train_epoch(model, train_loader, rank)
        
        # Gather metrics from all ranks
        dist.all_reduce(train_loss)
        train_loss /= world_size
        
        # Log from rank 0
        if rank == 0:
            wandb.log({
                "train/loss": train_loss,
                "epoch": epoch
            })
    
    if rank == 0:
        wandb.finish()
```

### Integration with Hugging Face

```python
import wandb
from transformers import Trainer, TrainingArguments
from transformers import AutoModelForSequenceClassification, AutoTokenizer

# Initialize W&B
wandb.init(project="huggingface-example")

# Training arguments with W&B
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=64,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    report_to="wandb"  # Enable W&B integration
)

# Train
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset
)

trainer.train()
wandb.finish()
```

### Reports and Collaboration

```python
import wandb

# Create a report programmatically
api = wandb.Api()

# Get runs
runs = api.runs("entity/project")

# Create report
report = wandb.Report(
    project="my-project",
    title="Experiment Analysis",
    description="Comparison of different models"
)

# Add sections
report.blocks = [
    wandb.report.PanelGrid(
        panels=[
            wandb.report.LinePlot(
                x="step",
                y=["train/loss", "val/loss"],
                title="Training Progress"
            ),
            wandb.report.ScatterPlot(
                x="learning_rate",
                y="val/accuracy",
                title="LR vs Accuracy"
            )
        ]
    )
]

# Save report
report.save()
```

## W&B API

```python
import wandb

# Initialize API
api = wandb.Api()

# Get project runs
runs = api.runs("entity/project")

# Filter runs
filtered_runs = api.runs(
    "entity/project",
    filters={
        "config.learning_rate": 0.001,
        "state": "finished"
    }
)

# Get specific run
run = api.run("entity/project/run-id")

# Access run data
print(run.config)
print(run.summary)
print(run.history())

# Download files
for file in run.files():
    file.download()

# Update run
run.config["updated"] = True
run.update()

# Delete run
run.delete()

# Get artifacts
artifact = api.artifact("entity/project/artifact:version")
artifact.download()
```

## Best Practices

### 1. Project Organization

```python
# Use descriptive project names
wandb.init(
    project="customer-churn-v2",
    entity="ml-team",
    name="xgboost-baseline",
    tags=["production", "xgboost", "v2"],
    group="baseline-models",
    job_type="train"
)

# Group related experiments
wandb.init(
    project="my-project",
    group="hyperparameter-search",  # Group related runs
    job_type="train",               # Job type
    tags=["gpu", "production"]      # Tags for filtering
)
```

### 2. Config Management

```python
# Define comprehensive config
config = {
    # Model architecture
    "model": "resnet50",
    "hidden_size": 512,
    "num_layers": 3,
    
    # Training
    "learning_rate": 0.001,
    "batch_size": 32,
    "epochs": 100,
    "optimizer": "adam",
    
    # Data
    "dataset": "imagenet",
    "augmentation": True,
    "normalization": "batch",
    
    # System
    "seed": 42,
    "device": "cuda",
    "num_workers": 4
}

wandb.init(project="my-project", config=config)
```

### 3. Logging Strategy

```python
# Log at appropriate intervals
for epoch in range(epochs):
    for batch_idx, (data, target) in enumerate(train_loader):
        # Training step
        loss = train_step(data, target)
        
        # Log every N batches
        if batch_idx % log_interval == 0:
            wandb.log({
                "train/loss": loss,
                "train/batch": batch_idx
            })
    
    # Log epoch metrics
    val_metrics = validate(model, val_loader)
    wandb.log({
        "epoch": epoch,
        **val_metrics
    })
```

### 4. Resource Management

```python
# Disable W&B for debugging
import os
os.environ["WANDB_MODE"] = "disabled"

# Or use offline mode
os.environ["WANDB_MODE"] = "offline"

# Resume runs
wandb.init(
    project="my-project",
    id="unique-run-id",
    resume="allow"
)

# Finish properly
try:
    # Training code
    train()
finally:
    wandb.finish()
```

## Troubleshooting

### Login Issues

```bash
# Re-login
wandb login --relogin

# Set API key
export WANDB_API_KEY=your_key

# Verify
wandb verify
```

### Sync Issues

```bash
# Sync offline runs
wandb sync wandb/offline-run-*

# Force sync
wandb sync --sync-all

# Check status
wandb status
```

### Performance Optimization

```python
# Reduce logging frequency
wandb.init(
    project="my-project",
    settings=wandb.Settings(
        _stats_sample_rate_seconds=30  # Sample every 30 seconds
    )
)

# Disable certain features
os.environ["WANDB_DISABLE_CODE"] = "true"
os.environ["WANDB_DISABLE_GIT"] = "true"
```

## Resources

- [W&B Documentation](https://docs.wandb.ai/)
- [W&B GitHub Repository](https://github.com/wandb/wandb)
- [W&B Examples](https://github.com/wandb/examples)
- [W&B Tutorials](https://wandb.ai/site/tutorials)
- [W&B Community](https://wandb.ai/community)
- [W&B YouTube Channel](https://www.youtube.com/c/WeightsandBiases)

## Next Steps

- Create a W&B account
- Integrate with your ML pipeline
- Set up hyperparameter sweeps
- Implement artifact tracking
- Create collaborative reports
- Configure team settings
- Explore W&B Automations
- Set up production monitoring
- Use W&B Launch for job orchestration
- Implement model registry workflow

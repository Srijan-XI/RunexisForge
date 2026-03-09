# MLflow

## Introduction

### What is MLflow?

MLflow is an open-source platform for managing the complete machine learning lifecycle. It provides tools for tracking experiments, packaging code into reproducible runs, and sharing and deploying models. MLflow is library-agnostic and can be used with any machine learning library, algorithm, or deployment tool.

### Why MLflow?

- Experiment tracking with automatic logging
- Reproducible runs with environment packaging
- Centralized model registry
- Model versioning and lineage
- Simplified model deployment
- Framework-agnostic design
- Multi-language support (Python, R, Java)
- Integration with popular ML frameworks
- Model comparison and visualization
- Collaborative ML development

## Prerequisites

- Python 3.8 or higher
- Basic understanding of machine learning
- pip or conda package manager
- (Optional) Docker for containerization
- (Optional) Cloud storage for artifact storage

## Installation

### Using pip

```bash
# Install MLflow
pip install mlflow

# Install with extras
pip install mlflow[extras]  # Includes scikit-learn, boto3, etc.

# Verify installation
mlflow --version
```

### Using conda

```bash
# Create environment
conda create -n mlflow-env python=3.10
conda activate mlflow-env

# Install MLflow
conda install -c conda-forge mlflow

# Verify
mlflow --version
```

### Docker

```bash
# Pull MLflow image
docker pull ghcr.io/mlflow/mlflow

# Run MLflow server
docker run -p 5000:5000 ghcr.io/mlflow/mlflow mlflow server --host 0.0.0.0
```

## Core Components

### 1. MLflow Tracking

Track experiments, log parameters, metrics, and artifacts.

```python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load data
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Start MLflow run
with mlflow.start_run():
    # Log parameters
    mlflow.log_param("n_estimators", 100)
    mlflow.log_param("max_depth", 5)
    mlflow.log_param("random_state", 42)
    
    # Train model
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=5,
        random_state=42
    )
    model.fit(X_train, y_train)
    
    # Evaluate
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    
    # Log metrics
    mlflow.log_metric("accuracy", accuracy)
    mlflow.log_metric("test_samples", len(X_test))
    
    # Log model
    mlflow.sklearn.log_model(model, "model")
    
    print(f"Model accuracy: {accuracy:.4f}")
```

### 2. MLflow Projects

Package ML code for reproducible runs.

```yaml
# MLproject file
name: iris-classifier

conda_env: conda.yaml

entry_points:
  main:
    parameters:
      n_estimators: {type: int, default: 100}
      max_depth: {type: int, default: 5}
    command: "python train.py --n-estimators {n_estimators} --max-depth {max_depth}"
```

```yaml
# conda.yaml
name: iris-env
channels:
  - conda-forge
dependencies:
  - python=3.10
  - scikit-learn=1.3.0
  - mlflow=2.9.0
  - pandas
  - numpy
```

```python
# train.py
import argparse
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

def train(n_estimators, max_depth):
    # Load data
    X, y = load_iris(return_X_y=True)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    with mlflow.start_run():
        # Log parameters
        mlflow.log_param("n_estimators", n_estimators)
        mlflow.log_param("max_depth", max_depth)
        
        # Train
        model = RandomForestClassifier(
            n_estimators=n_estimators,
            max_depth=max_depth,
            random_state=42
        )
        model.fit(X_train, y_train)
        
        # Evaluate
        predictions = model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        f1 = f1_score(y_test, predictions, average='weighted')
        
        # Log metrics
        mlflow.log_metric("accuracy", accuracy)
        mlflow.log_metric("f1_score", f1)
        
        # Log model
        mlflow.sklearn.log_model(model, "model")
        
        return accuracy

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--n-estimators", type=int, default=100)
    parser.add_argument("--max-depth", type=int, default=5)
    args = parser.parse_args()
    
    train(args.n_estimators, args.max_depth)
```

### 3. MLflow Models

```python
import mlflow
import mlflow.pyfunc
import pandas as pd

# Custom Python model
class IrisModel(mlflow.pyfunc.PythonModel):
    def load_context(self, context):
        import pickle
        with open(context.artifacts["model_path"], "rb") as f:
            self.model = pickle.load(f)
    
    def predict(self, context, model_input):
        return self.model.predict(model_input.values)

# Log custom model
with mlflow.start_run():
    # Train model
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.datasets import load_iris
    
    X, y = load_iris(return_X_y=True)
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X, y)
    
    # Save model artifact
    import pickle
    with open("model.pkl", "wb") as f:
        pickle.dump(model, f)
    
    # Log custom model
    artifacts = {"model_path": "model.pkl"}
    mlflow.pyfunc.log_model(
        artifact_path="iris_model",
        python_model=IrisModel(),
        artifacts=artifacts
    )
```

### 4. MLflow Model Registry

```python
import mlflow
from mlflow.tracking import MlflowClient

# Initialize client
client = MlflowClient()

# Register model
model_name = "iris-classifier"
model_uri = "runs:/<run_id>/model"

# Create registered model
try:
    client.create_registered_model(model_name)
except:
    pass

# Add model version
result = client.create_model_version(
    name=model_name,
    source=model_uri,
    run_id="<run_id>"
)

# Transition to staging
client.transition_model_version_stage(
    name=model_name,
    version=result.version,
    stage="Staging"
)

# Add description
client.update_model_version(
    name=model_name,
    version=result.version,
    description="Random Forest classifier for Iris dataset"
)

# Transition to production
client.transition_model_version_stage(
    name=model_name,
    version=result.version,
    stage="Production"
)

# Load production model
model = mlflow.pyfunc.load_model(f"models:/{model_name}/Production")
predictions = model.predict(X_test)
```

## Advanced Features

### Auto-logging

```python
import mlflow
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# Enable autologging
mlflow.sklearn.autolog()

# Train model (automatically logs everything)
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

with mlflow.start_run():
    model = RandomForestClassifier(n_estimators=100, max_depth=5)
    model.fit(X_train, y_train)
    # Parameters, metrics, and model automatically logged!
```

### PyTorch Integration

```python
import mlflow
import mlflow.pytorch
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

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

# Enable autologging
mlflow.pytorch.autolog()

# Training
with mlflow.start_run():
    # Log hyperparameters
    mlflow.log_param("learning_rate", 0.001)
    mlflow.log_param("epochs", 10)
    
    # Initialize model
    model = SimpleNN(input_size=4, hidden_size=10, num_classes=3)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    # Training loop
    for epoch in range(10):
        # Training code...
        loss = 0.0  # Calculate actual loss
        
        # Log metrics
        mlflow.log_metric("loss", loss, step=epoch)
    
    # Log model
    mlflow.pytorch.log_model(model, "model")
```

### TensorFlow/Keras Integration

```python
import mlflow
import mlflow.tensorflow
import tensorflow as tf
from tensorflow import keras

# Enable autologging
mlflow.tensorflow.autolog()

# Build model
model = keras.Sequential([
    keras.layers.Dense(64, activation='relu', input_shape=(4,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(3, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train with MLflow tracking
with mlflow.start_run():
    mlflow.log_param("optimizer", "adam")
    mlflow.log_param("dropout_rate", 0.2)
    
    history = model.fit(
        X_train, y_train,
        epochs=20,
        batch_size=32,
        validation_split=0.2
    )
    
    # Model automatically logged by autolog
```

### XGBoost Integration

```python
import mlflow
import mlflow.xgboost
import xgboost as xgb
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# Enable autologging
mlflow.xgboost.autolog()

# Prepare data
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)

# Train with MLflow
with mlflow.start_run():
    params = {
        'max_depth': 5,
        'eta': 0.1,
        'objective': 'multi:softmax',
        'num_class': 3
    }
    
    model = xgb.train(
        params,
        dtrain,
        num_boost_round=100,
        evals=[(dtest, 'test')],
        early_stopping_rounds=10
    )
    
    # Model automatically logged
```

## MLflow Server

### Start Tracking Server

```bash
# Local server
mlflow server --host 0.0.0.0 --port 5000

# With backend store (SQLite)
mlflow server \
  --backend-store-uri sqlite:///mlflow.db \
  --default-artifact-root ./mlruns \
  --host 0.0.0.0 \
  --port 5000

# With PostgreSQL backend
mlflow server \
  --backend-store-uri postgresql://user:password@localhost/mlflow \
  --default-artifact-root s3://my-mlflow-bucket/ \
  --host 0.0.0.0 \
  --port 5000
```

### Connect to Remote Server

```python
import mlflow

# Set tracking URI
mlflow.set_tracking_uri("http://localhost:5000")

# Verify connection
print(mlflow.get_tracking_uri())

# Create experiment
experiment_id = mlflow.create_experiment("my-experiment")

# Set experiment
mlflow.set_experiment("my-experiment")

# Run experiment
with mlflow.start_run():
    mlflow.log_param("param1", 5)
    mlflow.log_metric("metric1", 0.89)
```

## Model Deployment

### Local Deployment

```bash
# Serve model locally
mlflow models serve -m runs:/<run_id>/model -p 5001

# Test prediction
curl -X POST http://localhost:5001/invocations \
  -H 'Content-Type: application/json' \
  -d '{"dataframe_split": {"columns": ["col1", "col2"], "data": [[1, 2], [3, 4]]}}'
```

### Docker Deployment

```bash
# Build Docker image
mlflow models build-docker -m runs:/<run_id>/model -n my-model

# Run container
docker run -p 5001:8080 my-model

# Test
curl -X POST http://localhost:5001/invocations \
  -H 'Content-Type: application/json' \
  -d '{"dataframe_split": {"columns": ["sepal_length", "sepal_width", "petal_length", "petal_width"], "data": [[5.1, 3.5, 1.4, 0.2]]}}'
```

### Cloud Deployment

```python
import mlflow.sagemaker

# Deploy to AWS SageMaker
mlflow.sagemaker.deploy(
    app_name="iris-classifier",
    model_uri="runs:/<run_id>/model",
    region_name="us-east-1",
    mode="create",
    execution_role_arn="arn:aws:iam::account:role/SageMakerRole"
)

# Deploy to Azure ML
import mlflow.azureml
from azureml.core import Workspace

ws = Workspace.from_config()
mlflow.azureml.deploy(
    model_uri="runs:/<run_id>/model",
    workspace=ws,
    deployment_config={
        "name": "iris-classifier",
        "cpu_cores": 1,
        "memory_gb": 1
    }
)
```

## Experiment Organization

### Nested Runs

```python
import mlflow

# Parent run
with mlflow.start_run(run_name="hyperparameter-tuning"):
    mlflow.log_param("optimization", "grid_search")
    
    # Child runs
    for n_estimators in [50, 100, 200]:
        with mlflow.start_run(run_name=f"n_est_{n_estimators}", nested=True):
            mlflow.log_param("n_estimators", n_estimators)
            
            # Train model
            model = RandomForestClassifier(n_estimators=n_estimators)
            model.fit(X_train, y_train)
            
            accuracy = model.score(X_test, y_test)
            mlflow.log_metric("accuracy", accuracy)
```

### Tags and Notes

```python
with mlflow.start_run():
    # Set tags
    mlflow.set_tag("model_type", "classification")
    mlflow.set_tag("framework", "scikit-learn")
    mlflow.set_tag("version", "v1.0")
    mlflow.set_tag("owner", "data-science-team")
    
    # Set run name
    mlflow.set_tag("mlflow.runName", "baseline-model")
    
    # Add notes
    mlflow.set_tag("mlflow.note.content", "Baseline model with default parameters")
    
    # Training code...
```

## Best Practices

### 1. Experiment Organization

```python
# Use descriptive experiment names
mlflow.set_experiment("customer-churn-prediction")

# Use nested runs for hyperparameter tuning
with mlflow.start_run(run_name="hyperparameter-search"):
    for params in param_grid:
        with mlflow.start_run(nested=True):
            # Train and log
            pass

# Tag runs appropriately
mlflow.set_tag("stage", "development")
mlflow.set_tag("model_version", "v2.0")
```

### 2. Logging Best Practices

```python
with mlflow.start_run():
    # Log all hyperparameters
    mlflow.log_params({
        "learning_rate": 0.001,
        "batch_size": 32,
        "epochs": 100,
        "optimizer": "adam"
    })
    
    # Log multiple metrics
    for epoch in range(epochs):
        mlflow.log_metrics({
            "train_loss": train_loss,
            "val_loss": val_loss,
            "train_acc": train_acc,
            "val_acc": val_acc
        }, step=epoch)
    
    # Log artifacts
    mlflow.log_artifact("confusion_matrix.png")
    mlflow.log_artifact("feature_importance.csv")
    
    # Log model with signature
    from mlflow.models.signature import infer_signature
    signature = infer_signature(X_train, model.predict(X_train))
    mlflow.sklearn.log_model(model, "model", signature=signature)
```

### 3. Model Registry Workflow

```python
from mlflow.tracking import MlflowClient

client = MlflowClient()

# Development → Staging → Production workflow
def promote_model(model_name, version, stage):
    client.transition_model_version_stage(
        name=model_name,
        version=version,
        stage=stage,
        archive_existing_versions=True
    )
    
    client.update_model_version(
        name=model_name,
        version=version,
        description=f"Promoted to {stage} on {datetime.now()}"
    )

# Usage
promote_model("iris-classifier", version=3, stage="Production")
```

## Troubleshooting

### Issue: MLflow UI Not Loading

```bash
# Check if server is running
ps aux | grep mlflow

# Restart server with verbose logging
mlflow server --host 0.0.0.0 --port 5000 --backend-store-uri sqlite:///mlflow.db

# Check firewall
sudo ufw allow 5000
```

### Issue: Artifact Storage Errors

```python
# Configure S3 artifact storage
import os
os.environ['AWS_ACCESS_KEY_ID'] = 'your-key'
os.environ['AWS_SECRET_ACCESS_KEY'] = 'your-secret'

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("my-experiment")

# Or use Azure Blob Storage
os.environ['AZURE_STORAGE_CONNECTION_STRING'] = 'your-connection-string'
```

### Issue: Model Loading Errors

```python
# Ensure correct Python environment
import mlflow
import sys

# Load model with specific environment
model = mlflow.pyfunc.load_model(
    "runs:/<run_id>/model",
    suppress_warnings=False
)

# Check model requirements
import mlflow.pyfunc
model_info = mlflow.pyfunc.get_model_dependencies("runs:/<run_id>/model")
print(model_info)
```

## Resources

- [MLflow Documentation](https://mlflow.org/docs/latest/index.html)
- [MLflow GitHub Repository](https://github.com/mlflow/mlflow)
- [MLflow Tracking Guide](https://mlflow.org/docs/latest/tracking.html)
- [MLflow Model Registry](https://mlflow.org/docs/latest/model-registry.html)
- [MLflow Examples](https://github.com/mlflow/mlflow/tree/master/examples)
- [MLflow Community](https://github.com/mlflow/mlflow/discussions)

## Next Steps

- Set up MLflow tracking server
- Integrate with your ML pipeline
- Configure model registry
- Implement CI/CD for models
- Set up artifact storage (S3, Azure Blob)
- Configure authentication and access control
- Create custom model flavors
- Implement A/B testing with model registry
- Monitor deployed models
- Build ML platform with MLflow

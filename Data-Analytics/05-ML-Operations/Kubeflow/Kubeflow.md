# Kubeflow

## Introduction

### What is Kubeflow?

Kubeflow is an open-source platform designed to make deployments of machine learning (ML) workflows on Kubernetes simple, portable, and scalable. It provides a comprehensive suite of tools for the entire ML lifecycle, from experimentation and training to serving and monitoring, all running on Kubernetes infrastructure.

### Why Kubeflow?

- End-to-end ML workflow orchestration
- Kubernetes-native ML platform
- Scalable distributed training
- Multi-framework support (TensorFlow, PyTorch, XGBoost, etc.)
- Reproducible ML pipelines
- Hyperparameter tuning (Katib)
- Model serving with KServe
- Jupyter notebook integration
- Multi-tenancy and resource management
- Cloud-agnostic deployment

## Prerequisites

- Kubernetes cluster (1.21+)
- kubectl configured
- Basic understanding of Kubernetes
- Docker knowledge
- Python 3.7+
- Understanding of ML workflows

## Installation

### MiniKF (Local Development)

```bash
# Using Vagrant
vagrant init arrikto/minikf
vagrant up

# Access at https://10.10.10.10
# Default credentials: user@example.com / 12341234
```

### Kubeflow on kind (Local)

```bash
# Install kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Create cluster
cat <<EOF | kind create cluster --name=kubeflow --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF

# Install Kubeflow
export PIPELINE_VERSION=2.0.0
kubectl apply -k "github.com/kubeflow/pipelines/manifests/kustomize/cluster-scoped-resources?ref=$PIPELINE_VERSION"
kubectl wait --for condition=established --timeout=60s crd/applications.app.k8s.io
kubectl apply -k "github.com/kubeflow/pipelines/manifests/kustomize/env/platform-agnostic?ref=$PIPELINE_VERSION"
```

### AWS (EKS)

```bash
# Create EKS cluster
eksctl create cluster \
  --name kubeflow-cluster \
  --version 1.28 \
  --region us-west-2 \
  --nodegroup-name kubeflow-nodes \
  --node-type m5.xlarge \
  --nodes 3 \
  --nodes-min 1 \
  --nodes-max 4

# Install Kubeflow
export CONFIG_URI="https://raw.githubusercontent.com/kubeflow/manifests/v1.8-branch/kfdef/kfctl_aws.v1.8.0.yaml"
mkdir kubeflow && cd kubeflow
wget -O kfctl_aws.yaml $CONFIG_URI
kfctl apply -V -f kfctl_aws.yaml
```

### GCP (GKE)

```bash
# Set up environment
export PROJECT=<your-gcp-project>
export ZONE=us-central1-a

# Create GKE cluster
gcloud container clusters create kubeflow \
  --zone $ZONE \
  --machine-type n1-standard-4 \
  --num-nodes 3 \
  --enable-autoscaling \
  --min-nodes 1 \
  --max-nodes 5

# Get credentials
gcloud container clusters get-credentials kubeflow --zone $ZONE

# Install Kubeflow
export CONFIG_URI="https://raw.githubusercontent.com/kubeflow/manifests/v1.8-branch/kfdef/kfctl_gcp_iap.v1.8.0.yaml"
mkdir kubeflow && cd kubeflow
wget -O kfctl_gcp.yaml $CONFIG_URI
kfctl apply -V -f kfctl_gcp.yaml
```

## Core Components

### 1. Kubeflow Pipelines

```python
# Install Kubeflow Pipelines SDK
pip install kfp

# Simple pipeline example
import kfp
from kfp import dsl
from kfp.components import create_component_from_func

# Define components
def download_data(data_path: str) -> str:
    """Download dataset"""
    import urllib.request
    import os
    
    os.makedirs(os.path.dirname(data_path), exist_ok=True)
    url = "https://example.com/data.csv"
    urllib.request.urlretrieve(url, data_path)
    return data_path

def preprocess_data(input_path: str, output_path: str) -> str:
    """Preprocess dataset"""
    import pandas as pd
    
    df = pd.read_csv(input_path)
    # Preprocessing logic
    df_processed = df.dropna()
    df_processed.to_csv(output_path, index=False)
    return output_path

def train_model(data_path: str, model_path: str) -> str:
    """Train ML model"""
    import pandas as pd
    from sklearn.ensemble import RandomForestClassifier
    import pickle
    
    df = pd.read_csv(data_path)
    X = df.drop('target', axis=1)
    y = df['target']
    
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X, y)
    
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    
    return model_path

# Create components
download_op = create_component_from_func(
    download_data,
    base_image='python:3.9'
)

preprocess_op = create_component_from_func(
    preprocess_data,
    base_image='python:3.9',
    packages_to_install=['pandas']
)

train_op = create_component_from_func(
    train_model,
    base_image='python:3.9',
    packages_to_install=['pandas', 'scikit-learn']
)

# Define pipeline
@dsl.pipeline(
    name='ML Training Pipeline',
    description='End-to-end ML training pipeline'
)
def ml_pipeline(
    data_path: str = '/data/raw.csv',
    processed_path: str = '/data/processed.csv',
    model_path: str = '/models/model.pkl'
):
    # Pipeline steps
    download_task = download_op(data_path)
    
    preprocess_task = preprocess_op(
        input_path=download_task.output,
        output_path=processed_path
    )
    
    train_task = train_op(
        data_path=preprocess_task.output,
        model_path=model_path
    )

# Compile pipeline
kfp.compiler.Compiler().compile(ml_pipeline, 'ml_pipeline.yaml')

# Submit pipeline
client = kfp.Client(host='http://localhost:8080')
run = client.create_run_from_pipeline_func(
    ml_pipeline,
    arguments={
        'data_path': '/data/iris.csv',
        'processed_path': '/data/iris_processed.csv',
        'model_path': '/models/iris_model.pkl'
    }
)
```

### 2. Advanced Pipeline with Containers

```python
from kfp import dsl
from kfp.dsl import ContainerOp

@dsl.pipeline(
    name='Advanced ML Pipeline',
    description='Pipeline with custom containers'
)
def advanced_pipeline():
    # Data preprocessing
    preprocess = ContainerOp(
        name='preprocess',
        image='gcr.io/my-project/preprocess:latest',
        arguments=['--input', '/data/raw', '--output', '/data/processed'],
        file_outputs={'processed_data': '/data/processed'}
    )
    
    # Training
    train = ContainerOp(
        name='train',
        image='gcr.io/my-project/train:latest',
        arguments=[
            '--data', preprocess.outputs['processed_data'],
            '--epochs', '100',
            '--batch-size', '32'
        ],
        file_outputs={'model': '/models/model.h5'}
    )
    
    # Evaluation
    evaluate = ContainerOp(
        name='evaluate',
        image='gcr.io/my-project/evaluate:latest',
        arguments=[
            '--model', train.outputs['model'],
            '--test-data', '/data/test'
        ]
    )
    
    # Set dependencies
    train.after(preprocess)
    evaluate.after(train)
    
    # Request resources
    train.set_memory_request('4Gi')
    train.set_cpu_request('2')
    train.set_gpu_limit('1')

# Compile and run
kfp.compiler.Compiler().compile(advanced_pipeline, 'advanced_pipeline.yaml')

client = kfp.Client()
experiment = client.create_experiment('advanced-ml')
run = client.run_pipeline(experiment.id, 'advanced-run', 'advanced_pipeline.yaml')
```

### 3. Katib (Hyperparameter Tuning)

```yaml
# katib-experiment.yaml
apiVersion: kubeflow.org/v1beta1
kind: Experiment
metadata:
  name: random-forest-tuning
spec:
  algorithm:
    algorithmName: random
  parallelTrialCount: 3
  maxTrialCount: 12
  maxFailedTrialCount: 3
  objective:
    type: maximize
    goal: 0.99
    objectiveMetricName: accuracy
  parameters:
    - name: n_estimators
      parameterType: int
      feasibleSpace:
        min: "50"
        max: "200"
    - name: max_depth
      parameterType: int
      feasibleSpace:
        min: "3"
        max: "20"
    - name: learning_rate
      parameterType: double
      feasibleSpace:
        min: "0.001"
        max: "0.1"
  trialTemplate:
    primaryContainerName: training-container
    trialSpec:
      apiVersion: batch/v1
      kind: Job
      spec:
        template:
          spec:
            containers:
              - name: training-container
                image: gcr.io/my-project/training:latest
                command:
                  - python
                  - train.py
                  - --n-estimators=${trialParameters.nEstimators}
                  - --max-depth=${trialParameters.maxDepth}
                  - --learning-rate=${trialParameters.learningRate}
            restartPolicy: Never
```

```bash
# Apply experiment
kubectl apply -f katib-experiment.yaml

# Monitor
kubectl get experiment random-forest-tuning -o yaml

# Get trials
kubectl get trials -l experiment=random-forest-tuning

# View best trial
kubectl get experiment random-forest-tuning -o jsonpath='{.status.currentOptimalTrial}'
```

### 4. Training Operators

#### PyTorch Training

```yaml
# pytorch-job.yaml
apiVersion: kubeflow.org/v1
kind: PyTorchJob
metadata:
  name: pytorch-distributed-training
spec:
  pytorchReplicaSpecs:
    Master:
      replicas: 1
      restartPolicy: OnFailure
      template:
        spec:
          containers:
            - name: pytorch
              image: gcr.io/my-project/pytorch-training:latest
              imagePullPolicy: Always
              command:
                - python
                - train.py
                - --epochs=100
                - --batch-size=32
              resources:
                limits:
                  nvidia.com/gpu: 1
                  memory: 8Gi
                requests:
                  memory: 4Gi
    Worker:
      replicas: 2
      restartPolicy: OnFailure
      template:
        spec:
          containers:
            - name: pytorch
              image: gcr.io/my-project/pytorch-training:latest
              command:
                - python
                - train.py
                - --epochs=100
                - --batch-size=32
              resources:
                limits:
                  nvidia.com/gpu: 1
```

```bash
kubectl apply -f pytorch-job.yaml
kubectl logs -f pytorch-distributed-training-master-0
```

#### TensorFlow Training

```yaml
# tensorflow-job.yaml
apiVersion: kubeflow.org/v1
kind: TFJob
metadata:
  name: tensorflow-distributed
spec:
  tfReplicaSpecs:
    Chief:
      replicas: 1
      template:
        spec:
          containers:
            - name: tensorflow
              image: gcr.io/my-project/tf-training:latest
              command:
                - python
                - train.py
              resources:
                limits:
                  nvidia.com/gpu: 1
    Worker:
      replicas: 3
      template:
        spec:
          containers:
            - name: tensorflow
              image: gcr.io/my-project/tf-training:latest
              command:
                - python
                - train.py
    PS:
      replicas: 2
      template:
        spec:
          containers:
            - name: tensorflow
              image: gcr.io/my-project/tf-training:latest
              command:
                - python
                - train.py
```

### 5. KServe (Model Serving)

```yaml
# inference-service.yaml
apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: iris-classifier
spec:
  predictor:
    sklearn:
      storageUri: gs://my-bucket/models/iris
      resources:
        limits:
          cpu: "1"
          memory: 2Gi
        requests:
          cpu: 500m
          memory: 1Gi
```

```bash
# Deploy model
kubectl apply -f inference-service.yaml

# Get service URL
kubectl get inferenceservice iris-classifier

# Test prediction
curl -X POST \
  http://iris-classifier.default.example.com/v1/models/iris-classifier:predict \
  -H 'Content-Type: application/json' \
  -d '{
    "instances": [
      [5.1, 3.5, 1.4, 0.2]
    ]
  }'
```

### Advanced KServe with Transformer

```yaml
apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: advanced-model
spec:
  predictor:
    pytorch:
      storageUri: gs://my-bucket/models/pytorch-model
      resources:
        limits:
          nvidia.com/gpu: 1
  transformer:
    containers:
      - name: transformer
        image: gcr.io/my-project/transformer:latest
        env:
          - name: STORAGE_URI
            value: gs://my-bucket/artifacts
```

## Kubeflow Notebooks

```yaml
# notebook.yaml
apiVersion: kubeflow.org/v1
kind: Notebook
metadata:
  name: ml-workspace
spec:
  template:
    spec:
      containers:
        - name: notebook
          image: jupyter/tensorflow-notebook:latest
          resources:
            requests:
              cpu: "2"
              memory: 4Gi
            limits:
              nvidia.com/gpu: 1
          volumeMounts:
            - name: workspace
              mountPath: /home/jovyan
      volumes:
        - name: workspace
          persistentVolumeClaim:
            claimName: ml-workspace-pvc
```

## Best Practices

### Pipeline Design

```python
from kfp import dsl
from kfp.dsl import ContainerOp

@dsl.pipeline(
    name='Production ML Pipeline',
    description='Best practices ML pipeline'
)
def production_pipeline(
    project_id: str,
    dataset: str,
    model_version: str
):
    # 1. Data validation
    validate = ContainerOp(
        name='validate-data',
        image='gcr.io/project/validate:latest',
        arguments=['--dataset', dataset]
    )
    
    # 2. Feature engineering
    features = ContainerOp(
        name='feature-engineering',
        image='gcr.io/project/features:latest',
        arguments=['--input', validate.output]
    ).after(validate)
    
    # 3. Train/test split
    split = ContainerOp(
        name='split-data',
        image='gcr.io/project/split:latest',
        arguments=['--input', features.output]
    ).after(features)
    
    # 4. Model training
    train = ContainerOp(
        name='train-model',
        image='gcr.io/project/train:latest',
        arguments=[
            '--train-data', split.outputs['train'],
            '--model-version', model_version
        ]
    ).after(split)
    
    # Set resource requirements
    train.set_memory_request('8Gi')
    train.set_cpu_request('4')
    train.set_gpu_limit('2')
    
    # 5. Model evaluation
    evaluate = ContainerOp(
        name='evaluate-model',
        image='gcr.io/project/evaluate:latest',
        arguments=[
            '--model', train.output,
            '--test-data', split.outputs['test'],
            '--threshold', '0.95'
        ]
    ).after(train)
    
    # 6. Model deployment (conditional)
    with dsl.Condition(evaluate.outputs['accuracy'] > 0.95):
        deploy = ContainerOp(
            name='deploy-model',
            image='gcr.io/project/deploy:latest',
            arguments=['--model', train.output]
        )
```

### Resource Management

```yaml
# resource-quota.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: ml-quota
  namespace: kubeflow
spec:
  hard:
    requests.cpu: "100"
    requests.memory: 200Gi
    requests.nvidia.com/gpu: "10"
    persistentvolumeclaims: "20"
```

## Monitoring and Logging

```python
# Add monitoring to pipeline
from kfp import dsl

@dsl.pipeline(name='Monitored Pipeline')
def monitored_pipeline():
    train = ContainerOp(
        name='train',
        image='gcr.io/project/train:latest'
    )
    
    # Add Prometheus metrics
    train.add_env_variable(
        V1EnvVar(
            name='PROMETHEUS_PORT',
            value='8000'
        )
    )
    
    # Add logging sidecar
    train.add_sidecar(
        V1Container(
            name='logger',
            image='fluent/fluent-bit:latest',
            args=['-c', '/fluent-bit/etc/fluent-bit.conf']
        )
    )
```

## Troubleshooting

### Pipeline Debugging

```bash
# Get pipeline runs
kubectl get pipelineruns

# Describe pipeline run
kubectl describe pipelinerun <run-name>

# Get logs
kubectl logs <pod-name> -n kubeflow

# Debug failed pod
kubectl get pod <pod-name> -n kubeflow -o yaml

# Check events
kubectl get events -n kubeflow --sort-by='.lastTimestamp'
```

### Common Issues

```bash
# Issue: Pipeline fails to start
# Check pod status
kubectl get pods -n kubeflow | grep <pipeline-name>

# Check pod events
kubectl describe pod <pod-name> -n kubeflow

# Issue: Out of memory
# Update resource limits in pipeline component
train.set_memory_limit('16Gi')

# Issue: GPU not available
# Verify GPU drivers
kubectl describe nodes | grep -i gpu

# Check GPU allocation
kubectl get nodes -o yaml | grep -i gpu
```

## Resources

- [Kubeflow Documentation](https://www.kubeflow.org/docs/)
- [Kubeflow Pipelines](https://www.kubeflow.org/docs/components/pipelines/)
- [Katib Documentation](https://www.kubeflow.org/docs/components/katib/)
- [KServe Documentation](https://kserve.github.io/website/)
- [Kubeflow GitHub](https://github.com/kubeflow/kubeflow)
- [Kubeflow Community](https://www.kubeflow.org/docs/about/community/)

## Next Steps

- Set up Kubeflow cluster
- Create your first pipeline
- Experiment with Katib for hyperparameter tuning
- Deploy models with KServe
- Integrate with CI/CD
- Set up monitoring and logging
- Implement multi-tenancy
- Configure autoscaling
- Explore Kubeflow on different cloud providers
- Build production ML platform

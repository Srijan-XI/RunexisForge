# PyTorch - Deep Learning Framework

## Table of Contents
- [Introduction](#introduction)
- [Why PyTorch?](#why-pytorch)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Tensors](#tensors)
- [Autograd - Automatic Differentiation](#autograd---automatic-differentiation)
- [Neural Networks](#neural-networks)
- [Training Loop](#training-loop)
- [Model Architectures](#model-architectures)
- [Data Loading](#data-loading)
- [Optimization & Loss Functions](#optimization--loss-functions)
- [Distributed Training](#distributed-training)
- [PyTorch Lightning](#pytorch-lightning)
- [Model Deployment](#model-deployment)
- [PyTorch vs TensorFlow](#pytorch-vs-tensorflow)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

PyTorch is an open-source machine learning framework developed by Meta AI (Facebook) that provides a flexible and intuitive platform for building deep learning models. Known for its dynamic computational graph (define-by-run), PyTorch has become the preferred framework for research and is increasingly popular in production environments.

### Key Characteristics

- **Dynamic Computation Graph**: Build graphs on-the-fly (eager execution)
- **Pythonic**: Natural Python integration, intuitive API
- **Research-Friendly**: Flexibility for experimentation
- **Production-Ready**: TorchScript, TorchServe for deployment
- **GPU Acceleration**: CUDA support, multi-GPU training
- **Rich Ecosystem**: torchvision, torchaudio, torchtext
- **Community**: Large, active community and extensive documentation

### PyTorch Versions

- **PyTorch 1.x**: Stable releases (2018-2022)
- **PyTorch 2.0+**: Compilation improvements, performance enhancements (2023+)
- **Current**: PyTorch 2.2+ (January 2026)

---

## Why PyTorch?

### Benefits

✅ **Ease of Use**
- Pythonic syntax
- Intuitive API design
- Easy debugging (standard Python debugging tools)
- Quick prototyping

✅ **Flexibility**
- Dynamic computational graphs
- Custom operations
- Easy model modification
- Research experimentation

✅ **Performance**
- CUDA optimization
- Mixed precision training
- TorchScript compilation
- Distributed training

✅ **Ecosystem**
- Computer vision (torchvision)
- NLP (torchtext, Hugging Face)
- Audio (torchaudio)
- Reinforcement learning (PyTorch RL libraries)

### Use Cases

- **Computer Vision**: Image classification, object detection, segmentation
- **Natural Language Processing**: Text generation, translation, sentiment analysis
- **Generative AI**: GANs, VAEs, diffusion models
- **Time Series**: Forecasting, anomaly detection
- **Reinforcement Learning**: Game AI, robotics
- **Scientific Computing**: Physics simulations, molecular dynamics
- **Research**: Novel architecture development

---

## Installation & Setup

### Installation Options

**Via pip:**
```bash
# CPU version
pip install torch torchvision torchaudio

# CUDA 11.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# CUDA 12.1
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

**Via conda:**
```bash
# CPU
conda install pytorch torchvision torchaudio cpuonly -c pytorch

# CUDA 11.8
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia

# CUDA 12.1
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia
```

**Verify Installation:**
```python
import torch

print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"CUDA version: {torch.version.cuda}")
print(f"Device count: {torch.cuda.device_count()}")
print(f"Current device: {torch.cuda.current_device()}")
print(f"Device name: {torch.cuda.get_device_name(0)}")
```

### Development Environment

```bash
# Create virtual environment
python -m venv pytorch_env
source pytorch_env/bin/activate  # On Windows: pytorch_env\Scripts\activate

# Install PyTorch + common packages
pip install torch torchvision torchaudio
pip install numpy pandas matplotlib scikit-learn
pip install jupyter notebook
pip install tensorboard

# Optional: PyTorch Lightning, Hugging Face
pip install pytorch-lightning transformers
```

---

## Core Concepts

### PyTorch Workflow

```
1. Define Model Architecture
         ↓
2. Prepare Data (Dataset, DataLoader)
         ↓
3. Define Loss Function & Optimizer
         ↓
4. Training Loop
   - Forward pass
   - Compute loss
   - Backward pass (gradients)
   - Update weights
         ↓
5. Evaluation
         ↓
6. Save/Load Model
         ↓
7. Deployment (TorchScript, ONNX)
```

### Basic Example

```python
import torch
import torch.nn as nn
import torch.optim as optim

# 1. Define model
class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
        self.relu = nn.ReLU()
    
    def forward(self, x):
        x = x.view(-1, 784)  # Flatten
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# 2. Instantiate model, loss, optimizer
model = SimpleNet()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 3. Training loop (simplified)
for epoch in range(10):
    for batch_x, batch_y in train_loader:
        # Forward pass
        outputs = model(batch_x)
        loss = criterion(outputs, batch_y)
        
        # Backward pass
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    
    print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")
```

---

## Tensors

Tensors are the fundamental data structure in PyTorch, similar to NumPy arrays but with GPU support.

### Creating Tensors

```python
import torch

# From data
x = torch.tensor([1, 2, 3, 4, 5])
print(x)  # tensor([1, 2, 3, 4, 5])

# From NumPy
import numpy as np
np_array = np.array([1, 2, 3])
tensor = torch.from_numpy(np_array)

# Zeros, ones, random
zeros = torch.zeros(3, 4)
ones = torch.ones(2, 3)
rand = torch.rand(3, 3)  # Uniform [0, 1)
randn = torch.randn(3, 3)  # Normal distribution

# Like existing tensor
x = torch.randn(2, 3)
zeros_like = torch.zeros_like(x)
ones_like = torch.ones_like(x)

# Specific values
arange = torch.arange(0, 10, 2)  # [0, 2, 4, 6, 8]
linspace = torch.linspace(0, 1, 5)  # [0.0, 0.25, 0.5, 0.75, 1.0]
```

### Tensor Operations

```python
# Arithmetic
a = torch.tensor([1, 2, 3])
b = torch.tensor([4, 5, 6])

add = a + b  # tensor([5, 7, 9])
sub = a - b  # tensor([-3, -3, -3])
mul = a * b  # Element-wise: tensor([4, 10, 18])
div = a / b  # Element-wise: tensor([0.25, 0.40, 0.50])

# Matrix operations
A = torch.randn(3, 4)
B = torch.randn(4, 5)
matmul = torch.matmul(A, B)  # or A @ B, shape: (3, 5)

# Reshaping
x = torch.randn(12)
reshaped = x.view(3, 4)  # Share memory
cloned = x.reshape(3, 4)  # May create copy

# Indexing & slicing
tensor = torch.arange(12).view(3, 4)
print(tensor[0, :])  # First row
print(tensor[:, 1])  # Second column
print(tensor[1:, 2:])  # Slice

# Aggregations
x = torch.randn(3, 4)
mean = x.mean()
sum_val = x.sum()
max_val = x.max()
argmax = x.argmax()  # Index of max value

# Dimension-specific
row_means = x.mean(dim=1)  # Mean along columns
col_sums = x.sum(dim=0)  # Sum along rows
```

### GPU Operations

```python
# Check CUDA availability
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# Move tensor to GPU
x = torch.randn(3, 3)
x_gpu = x.to(device)
# or
x_gpu = x.cuda()

# Operations on GPU
a = torch.randn(1000, 1000, device=device)
b = torch.randn(1000, 1000, device=device)
c = a @ b  # Matrix multiplication on GPU

# Move back to CPU
c_cpu = c.cpu()

# Mixed operations (avoid!)
# This will cause error: a_cpu + b_gpu
```

### Tensor Attributes

```python
x = torch.randn(3, 4, 5)

print(x.shape)  # torch.Size([3, 4, 5])
print(x.size())  # Same as shape
print(x.dtype)  # torch.float32
print(x.device)  # cpu or cuda:0
print(x.requires_grad)  # False (default)
print(x.ndim)  # 3
print(x.numel())  # 60 (total elements)
```

---

## Autograd - Automatic Differentiation

PyTorch's autograd system automatically computes gradients for backpropagation.

### Basic Autograd

```python
import torch

# Enable gradient tracking
x = torch.tensor(2.0, requires_grad=True)
y = x ** 2 + 3 * x + 1

# Compute gradients
y.backward()

print(f"dy/dx at x=2: {x.grad}")  # dy/dx = 2x + 3 = 7
```

### Multi-variable Gradients

```python
x = torch.tensor(3.0, requires_grad=True)
y = torch.tensor(4.0, requires_grad=True)

z = x ** 2 + y ** 3

z.backward()

print(f"dz/dx: {x.grad}")  # 2x = 6
print(f"dz/dy: {y.grad}")  # 3y^2 = 48
```

### Gradient Accumulation

```python
x = torch.tensor(2.0, requires_grad=True)

# First computation
y1 = x ** 2
y1.backward()
print(f"First gradient: {x.grad}")  # 4.0

# Second computation (accumulates!)
y2 = x ** 3
y2.backward()
print(f"Accumulated gradient: {x.grad}")  # 4.0 + 12.0 = 16.0

# Clear gradients
x.grad.zero_()
y3 = x ** 2
y3.backward()
print(f"After zero: {x.grad}")  # 4.0
```

### Computational Graph

```python
x = torch.tensor(2.0, requires_grad=True)
a = x + 1  # a = 3
b = a * 2  # b = 6
c = b ** 2  # c = 36

c.backward()  # Compute dc/dx

print(x.grad)  # Chain rule: dc/db * db/da * da/dx = 2b * 2 * 1 = 24

# Computational graph:
# x → a = x+1 → b = 2a → c = b²
#     da/dx=1   db/da=2  dc/db=2b
```

### Detaching from Graph

```python
x = torch.tensor(2.0, requires_grad=True)
y = x ** 2

# Detach: create new tensor without gradient tracking
y_detached = y.detach()

z = y_detached * 3
z.backward()  # Error: y_detached doesn't track gradients

# No gradient context
with torch.no_grad():
    y = x ** 2  # No gradient tracking
    print(y.requires_grad)  # False
```

---

## Neural Networks

### nn.Module Basics

```python
import torch.nn as nn
import torch.nn.functional as F

class MyNet(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(MyNet, self).__init__()
        
        # Define layers
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, output_size)
        self.dropout = nn.Dropout(0.2)
        
    def forward(self, x):
        # Define forward pass
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Instantiate
model = MyNet(784, 256, 10)

# Print architecture
print(model)

# Access parameters
for name, param in model.named_parameters():
    print(f"{name}: {param.shape}")

# Forward pass
x = torch.randn(32, 784)  # Batch of 32 samples
output = model(x)
print(output.shape)  # torch.Size([32, 10])
```

### Common Layers

```python
# Fully connected (Linear)
fc = nn.Linear(in_features=100, out_features=50)

# Convolutional
conv2d = nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, stride=1, padding=1)
conv1d = nn.Conv1d(in_channels=16, out_channels=32, kernel_size=5)

# Pooling
maxpool = nn.MaxPool2d(kernel_size=2, stride=2)
avgpool = nn.AvgPool2d(kernel_size=2)

# Normalization
batchnorm1d = nn.BatchNorm1d(num_features=128)
batchnorm2d = nn.BatchNorm2d(num_features=64)
layernorm = nn.LayerNorm(normalized_shape=256)

# Dropout
dropout = nn.Dropout(p=0.5)

# Recurrent
lstm = nn.LSTM(input_size=100, hidden_size=256, num_layers=2, batch_first=True)
gru = nn.GRU(input_size=100, hidden_size=256, num_layers=2, batch_first=True)

# Attention
multihead_attn = nn.MultiheadAttention(embed_dim=512, num_heads=8)

# Activation functions
relu = nn.ReLU()
sigmoid = nn.Sigmoid()
tanh = nn.Tanh()
leaky_relu = nn.LeakyReLU(negative_slope=0.01)
gelu = nn.GELU()
```

### Sequential Models

```python
# Simple sequential model
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(128, 10)
)

# Named sequential
model = nn.Sequential(OrderedDict([
    ('fc1', nn.Linear(784, 256)),
    ('relu1', nn.ReLU()),
    ('dropout1', nn.Dropout(0.2)),
    ('fc2', nn.Linear(256, 128)),
    ('relu2', nn.ReLU()),
    ('fc3', nn.Linear(128, 10))
]))

# Access layers
print(model.fc1.weight.shape)
```

---

## Training Loop

### Complete Training Example

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

# 1. Prepare data
X_train = torch.randn(1000, 784)
y_train = torch.randint(0, 10, (1000,))
train_dataset = TensorDataset(X_train, y_train)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# 2. Define model
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(256, 10)
)

# 3. Loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 4. Training loop
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

num_epochs = 10

for epoch in range(num_epochs):
    model.train()  # Set to training mode
    total_loss = 0
    correct = 0
    total = 0
    
    for batch_idx, (data, targets) in enumerate(train_loader):
        data, targets = data.to(device), targets.to(device)
        
        # Forward pass
        outputs = model(data)
        loss = criterion(outputs, targets)
        
        # Backward pass
        optimizer.zero_grad()  # Clear gradients
        loss.backward()  # Compute gradients
        optimizer.step()  # Update weights
        
        # Track metrics
        total_loss += loss.item()
        _, predicted = outputs.max(1)
        correct += (predicted == targets).sum().item()
        total += targets.size(0)
    
    avg_loss = total_loss / len(train_loader)
    accuracy = 100.0 * correct / total
    print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {avg_loss:.4f}, Accuracy: {accuracy:.2f}%")
```

### Validation Loop

```python
def evaluate(model, val_loader, criterion, device):
    model.eval()  # Set to evaluation mode
    total_loss = 0
    correct = 0
    total = 0
    
    with torch.no_grad():  # Disable gradient computation
        for data, targets in val_loader:
            data, targets = data.to(device), targets.to(device)
            
            outputs = model(data)
            loss = criterion(outputs, targets)
            
            total_loss += loss.item()
            _, predicted = outputs.max(1)
            correct += (predicted == targets).sum().item()
            total += targets.size(0)
    
    avg_loss = total_loss / len(val_loader)
    accuracy = 100.0 * correct / total
    
    return avg_loss, accuracy

# Usage
val_loss, val_acc = evaluate(model, val_loader, criterion, device)
print(f"Validation Loss: {val_loss:.4f}, Accuracy: {val_acc:.2f}%")
```

### Early Stopping

```python
class EarlyStopping:
    def __init__(self, patience=5, min_delta=0):
        self.patience = patience
        self.min_delta = min_delta
        self.counter = 0
        self.best_loss = None
        self.early_stop = False
    
    def __call__(self, val_loss):
        if self.best_loss is None:
            self.best_loss = val_loss
        elif val_loss > self.best_loss - self.min_delta:
            self.counter += 1
            if self.counter >= self.patience:
                self.early_stop = True
        else:
            self.best_loss = val_loss
            self.counter = 0

# Usage
early_stopping = EarlyStopping(patience=5)

for epoch in range(num_epochs):
    # Training...
    val_loss, val_acc = evaluate(model, val_loader, criterion, device)
    
    early_stopping(val_loss)
    if early_stopping.early_stop:
        print(f"Early stopping at epoch {epoch+1}")
        break
```

---

## Model Architectures

### Convolutional Neural Network (CNN)

```python
class CNN(nn.Module):
    def __init__(self, num_classes=10):
        super(CNN, self).__init__()
        
        # Convolutional layers
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.bn3 = nn.BatchNorm2d(128)
        
        self.pool = nn.MaxPool2d(2, 2)
        self.dropout = nn.Dropout(0.25)
        
        # Fully connected layers
        self.fc1 = nn.Linear(128 * 4 * 4, 512)
        self.fc2 = nn.Linear(512, num_classes)
    
    def forward(self, x):
        # Input: (batch, 3, 32, 32)
        x = self.pool(F.relu(self.bn1(self.conv1(x))))  # (batch, 32, 16, 16)
        x = self.pool(F.relu(self.bn2(self.conv2(x))))  # (batch, 64, 8, 8)
        x = self.pool(F.relu(self.bn3(self.conv3(x))))  # (batch, 128, 4, 4)
        
        x = x.view(x.size(0), -1)  # Flatten
        x = self.dropout(F.relu(self.fc1(x)))
        x = self.fc2(x)
        return x

model = CNN(num_classes=10)
```

### Recurrent Neural Network (RNN/LSTM)

```python
class LSTMClassifier(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim, n_layers=2, dropout=0.5):
        super().__init__()
        
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, n_layers, 
                           batch_first=True, dropout=dropout, bidirectional=True)
        self.fc = nn.Linear(hidden_dim * 2, output_dim)  # *2 for bidirectional
        self.dropout = nn.Dropout(dropout)
    
    def forward(self, text):
        # text: (batch_size, seq_len)
        embedded = self.dropout(self.embedding(text))  # (batch, seq_len, emb_dim)
        
        output, (hidden, cell) = self.lstm(embedded)
        # output: (batch, seq_len, hidden*2)
        # hidden: (n_layers*2, batch, hidden)
        
        # Concatenate final forward and backward hidden states
        hidden = torch.cat((hidden[-2,:,:], hidden[-1,:,:]), dim=1)
        hidden = self.dropout(hidden)
        
        return self.fc(hidden)

model = LSTMClassifier(vocab_size=10000, embedding_dim=100, 
                       hidden_dim=256, output_dim=2)
```

### Transformer (Self-Attention)

```python
class TransformerClassifier(nn.Module):
    def __init__(self, vocab_size, d_model=512, nhead=8, num_layers=6, num_classes=2):
        super().__init__()
        
        self.embedding = nn.Embedding(vocab_size, d_model)
        self.pos_encoder = PositionalEncoding(d_model)
        
        encoder_layer = nn.TransformerEncoderLayer(d_model, nhead, dim_feedforward=2048)
        self.transformer = nn.TransformerEncoder(encoder_layer, num_layers)
        
        self.fc = nn.Linear(d_model, num_classes)
    
    def forward(self, src):
        # src: (batch, seq_len)
        src = self.embedding(src) * math.sqrt(self.embedding.embedding_dim)
        src = self.pos_encoder(src)
        
        # Transformer expects (seq_len, batch, d_model)
        src = src.transpose(0, 1)
        output = self.transformer(src)
        
        # Pool over sequence dimension
        output = output.mean(dim=0)
        return self.fc(output)

class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe.unsqueeze(0))
    
    def forward(self, x):
        return x + self.pe[:, :x.size(1)]
```

### ResNet Block

```python
class ResidualBlock(nn.Module):
    def __init__(self, in_channels, out_channels, stride=1):
        super().__init__()
        
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, 
                              stride=stride, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, 
                              stride=1, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(out_channels)
        
        # Shortcut connection
        self.shortcut = nn.Sequential()
        if stride != 1 or in_channels != out_channels:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=1, 
                         stride=stride, bias=False),
                nn.BatchNorm2d(out_channels)
            )
    
    def forward(self, x):
        residual = x
        
        out = F.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        
        out += self.shortcut(residual)
        out = F.relu(out)
        
        return out
```

---

## Data Loading

### Dataset Class

```python
from torch.utils.data import Dataset, DataLoader
import pandas as pd

class CustomDataset(Dataset):
    def __init__(self, data_file, transform=None):
        self.data = pd.read_csv(data_file)
        self.transform = transform
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        # Load data
        sample = self.data.iloc[idx]
        x = sample['features'].values
        y = sample['label']
        
        if self.transform:
            x = self.transform(x)
        
        return torch.tensor(x, dtype=torch.float32), torch.tensor(y, dtype=torch.long)

# Usage
dataset = CustomDataset('data.csv')
dataloader = DataLoader(dataset, batch_size=32, shuffle=True, num_workers=4)

for batch_x, batch_y in dataloader:
    # Training code
    pass
```

### Image Dataset with Transforms

```python
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# Define transforms
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                       std=[0.229, 0.224, 0.225])
])

# Load dataset
train_dataset = datasets.ImageFolder('data/train', transform=transform)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True, 
                          num_workers=4, pin_memory=True)

# Built-in datasets
from torchvision.datasets import CIFAR10, MNIST, FashionMNIST

train_data = CIFAR10(root='./data', train=True, download=True, transform=transform)
train_loader = DataLoader(train_data, batch_size=64, shuffle=True)
```

### Data Augmentation

```python
train_transform = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
    transforms.RandomAffine(degrees=0, translate=(0.1, 0.1)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

val_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])
```

---

## Optimization & Loss Functions

### Common Optimizers

```python
import torch.optim as optim

# Stochastic Gradient Descent
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9, weight_decay=1e-4)

# Adam
optimizer = optim.Adam(model.parameters(), lr=0.001, betas=(0.9, 0.999))

# AdamW (Adam with weight decay)
optimizer = optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)

# RMSprop
optimizer = optim.RMSprop(model.parameters(), lr=0.01, alpha=0.99)

# Adagrad
optimizer = optim.Adagrad(model.parameters(), lr=0.01)
```

### Learning Rate Scheduling

```python
from torch.optim.lr_scheduler import StepLR, ReduceLROnPlateau, CosineAnnealingLR

# Step decay
scheduler = StepLR(optimizer, step_size=30, gamma=0.1)

# Reduce on plateau
scheduler = ReduceLROnPlateau(optimizer, mode='min', factor=0.1, patience=10)

# Cosine annealing
scheduler = CosineAnnealingLR(optimizer, T_max=100)

# Warmup + cosine
from torch.optim.lr_scheduler import LambdaLR

def warmup_cosine(step, warmup_steps, total_steps):
    if step < warmup_steps:
        return float(step) / float(max(1, warmup_steps))
    progress = float(step - warmup_steps) / float(max(1, total_steps - warmup_steps))
    return 0.5 * (1.0 + math.cos(math.pi * progress))

scheduler = LambdaLR(optimizer, lambda step: warmup_cosine(step, 1000, 10000))

# Usage in training loop
for epoch in range(num_epochs):
    # Training...
    scheduler.step()  # Update learning rate
```

### Loss Functions

```python
# Classification
cross_entropy = nn.CrossEntropyLoss()
nll_loss = nn.NLLLoss()  # Negative log likelihood
bce_loss = nn.BCELoss()  # Binary cross entropy
bce_with_logits = nn.BCEWithLogitsLoss()  # BCE + sigmoid

# Regression
mse_loss = nn.MSELoss()  # Mean squared error
l1_loss = nn.L1Loss()  # Mean absolute error
smooth_l1 = nn.SmoothL1Loss()  # Huber loss

# Custom loss
class FocalLoss(nn.Module):
    def __init__(self, alpha=1, gamma=2):
        super().__init__()
        self.alpha = alpha
        self.gamma = gamma
    
    def forward(self, inputs, targets):
        ce_loss = F.cross_entropy(inputs, targets, reduction='none')
        pt = torch.exp(-ce_loss)
        focal_loss = self.alpha * (1 - pt) ** self.gamma * ce_loss
        return focal_loss.mean()

criterion = FocalLoss(alpha=1, gamma=2)
```

---

## Distributed Training

### DataParallel (Single-node, multi-GPU)

```python
import torch.nn as nn

model = MyModel()

# Wrap model
if torch.cuda.device_count() > 1:
    print(f"Using {torch.cuda.device_count()} GPUs")
    model = nn.DataParallel(model)

model.to('cuda')

# Training loop (same as before)
for data, targets in train_loader:
    data, targets = data.to('cuda'), targets.to('cuda')
    outputs = model(data)
    # ...
```

### DistributedDataParallel (Multi-node, multi-GPU)

```python
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data.distributed import DistributedSampler

def setup(rank, world_size):
    os.environ['MASTER_ADDR'] = 'localhost'
    os.environ['MASTER_PORT'] = '12355'
    dist.init_process_group("nccl", rank=rank, world_size=world_size)

def cleanup():
    dist.destroy_process_group()

def train(rank, world_size):
    setup(rank, world_size)
    
    # Create model and move to GPU
    model = MyModel().to(rank)
    model = DDP(model, device_ids=[rank])
    
    # Create distributed sampler
    train_sampler = DistributedSampler(train_dataset, num_replicas=world_size, rank=rank)
    train_loader = DataLoader(train_dataset, batch_size=32, sampler=train_sampler)
    
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    criterion = nn.CrossEntropyLoss()
    
    for epoch in range(num_epochs):
        train_sampler.set_epoch(epoch)
        
        for data, targets in train_loader:
            data, targets = data.to(rank), targets.to(rank)
            
            outputs = model(data)
            loss = criterion(outputs, targets)
            
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
    
    cleanup()

# Launch
import torch.multiprocessing as mp

world_size = torch.cuda.device_count()
mp.spawn(train, args=(world_size,), nprocs=world_size, join=True)
```

### Mixed Precision Training

```python
from torch.cuda.amp import autocast, GradScaler

model = MyModel().cuda()
optimizer = optim.Adam(model.parameters(), lr=0.001)
scaler = GradScaler()

for epoch in range(num_epochs):
    for data, targets in train_loader:
        data, targets = data.cuda(), targets.cuda()
        
        optimizer.zero_grad()
        
        # Forward pass with autocast
        with autocast():
            outputs = model(data)
            loss = criterion(outputs, targets)
        
        # Backward pass with scaling
        scaler.scale(loss).backward()
        scaler.step(optimizer)
        scaler.update()
```

---

## PyTorch Lightning

Simplified training with PyTorch Lightning:

```bash
pip install pytorch-lightning
```

```python
import pytorch_lightning as pl
from pytorch_lightning import Trainer

class LitModel(pl.LightningModule):
    def __init__(self):
        super().__init__()
        self.model = nn.Sequential(
            nn.Linear(784, 256),
            nn.ReLU(),
            nn.Linear(256, 10)
        )
        self.criterion = nn.CrossEntropyLoss()
    
    def forward(self, x):
        return self.model(x)
    
    def training_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = self.criterion(y_hat, y)
        self.log('train_loss', loss)
        return loss
    
    def validation_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = self.criterion(y_hat, y)
        acc = (y_hat.argmax(dim=1) == y).float().mean()
        self.log('val_loss', loss)
        self.log('val_acc', acc)
    
    def configure_optimizers(self):
        return optim.Adam(self.parameters(), lr=0.001)

# Train
model = LitModel()
trainer = Trainer(max_epochs=10, accelerator='gpu', devices=1)
trainer.fit(model, train_loader, val_loader)
```

---

## Model Deployment

### Save & Load Models

```python
# Save entire model
torch.save(model, 'model.pth')
loaded_model = torch.load('model.pth')

# Save state dict (recommended)
torch.save(model.state_dict(), 'model_weights.pth')
model = MyModel()
model.load_state_dict(torch.load('model_weights.pth'))

# Save checkpoint
checkpoint = {
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
}
torch.save(checkpoint, 'checkpoint.pth')

# Load checkpoint
checkpoint = torch.load('checkpoint.pth')
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
epoch = checkpoint['epoch']
loss = checkpoint['loss']
```

### TorchScript (JIT Compilation)

```python
# Tracing
model.eval()
example_input = torch.randn(1, 3, 224, 224)
traced_model = torch.jit.trace(model, example_input)

# Save
traced_model.save('model_scripted.pt')

# Load
loaded_model = torch.jit.load('model_scripted.pt')

# Scripting (for control flow)
scripted_model = torch.jit.script(model)
scripted_model.save('model_scripted.pt')
```

### ONNX Export

```python
import torch.onnx

model.eval()
dummy_input = torch.randn(1, 3, 224, 224)

torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    export_params=True,
    opset_version=11,
    do_constant_folding=True,
    input_names=['input'],
    output_names=['output'],
    dynamic_axes={'input': {0: 'batch_size'}, 'output': {0: 'batch_size'}}
)
```

### TorchServe

```bash
# Install
pip install torchserve torch-model-archiver

# Create model archive
torch-model-archiver --model-name my_model \
  --version 1.0 \
  --serialized-file model.pth \
  --handler image_classifier \
  --export-path model_store

# Start server
torchserve --start --model-store model_store --models my_model=my_model.mar

# Inference
curl http://localhost:8080/predictions/my_model -T image.jpg
```

---

## PyTorch vs TensorFlow

| Feature | PyTorch | TensorFlow |
|---------|---------|------------|
| **Execution** | Eager (dynamic graph) | Static graph (2.x has eager) |
| **Ease of Use** | ✅ More Pythonic | ⚠️ Steeper learning curve |
| **Debugging** | ✅ Standard Python tools | ⚠️ More complex |
| **Research** | ✅ Preferred | ⚠️ Less popular |
| **Production** | ⚠️ Growing (TorchServe) | ✅ Mature (TF Serving) |
| **Mobile** | ⚠️ Limited | ✅ TensorFlow Lite |
| **Community** | ✅ Large, active | ✅ Large, mature |
| **Visualization** | TensorBoard | ✅ TensorBoard (native) |
| **Distributed** | DDP, DataParallel | ✅ tf.distribute |

### When to Choose PyTorch

✅ Research and experimentation
✅ Quick prototyping
✅ Need flexibility and control
✅ Dynamic architectures
✅ NLP (with Hugging Face)
✅ Academic projects

### When to Choose TensorFlow

✅ Large-scale production deployment
✅ Mobile/edge deployment
✅ Established enterprise infrastructure
✅ JavaScript deployment (TensorFlow.js)
✅ TPU acceleration

---

## Best Practices

### 1. Use GPU Efficiently

```python
# Pin memory for faster data transfer
train_loader = DataLoader(dataset, batch_size=32, pin_memory=True)

# Avoid CPU-GPU transfers in loop
# Bad:
for data in loader:
    data = data.cuda()  # Transfer each batch
    
# Good:
device = torch.device('cuda')
for data in loader:
    data = data.to(device, non_blocking=True)
```

### 2. Set Random Seeds

```python
import random
import numpy as np

def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False

set_seed(42)
```

### 3. Use torch.no_grad() for Inference

```python
model.eval()
with torch.no_grad():
    for data in val_loader:
        outputs = model(data)
        # No gradient computation, faster and less memory
```

### 4. Gradient Clipping

```python
# Prevent exploding gradients
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

optimizer.zero_grad()
loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
optimizer.step()
```

### 5. Model Checkpointing

```python
best_val_loss = float('inf')

for epoch in range(num_epochs):
    # Training...
    val_loss = evaluate(model, val_loader)
    
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save({
            'epoch': epoch,
            'model_state_dict': model.state_dict(),
            'optimizer_state_dict': optimizer.state_dict(),
            'val_loss': val_loss,
        }, 'best_model.pth')
```

### 6. Memory Management

```python
# Clear cache
torch.cuda.empty_cache()

# Delete tensors explicitly
del large_tensor
torch.cuda.empty_cache()

# Use smaller batch sizes
# Use gradient accumulation
accumulation_steps = 4
for i, (data, targets) in enumerate(train_loader):
    outputs = model(data)
    loss = criterion(outputs, targets)
    loss = loss / accumulation_steps
    loss.backward()
    
    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()
```

---

## Resources

### Official Documentation
- [PyTorch Docs](https://pytorch.org/docs/)
- [PyTorch Tutorials](https://pytorch.org/tutorials/)
- [PyTorch Forums](https://discuss.pytorch.org/)

### Libraries & Extensions
- [torchvision](https://pytorch.org/vision/) - Computer vision
- [torchaudio](https://pytorch.org/audio/) - Audio processing
- [torchtext](https://pytorch.org/text/) - NLP utilities
- [PyTorch Lightning](https://lightning.ai/) - High-level wrapper
- [Hugging Face Transformers](https://huggingface.co/transformers/) - NLP models

### Learning Resources
- [Deep Learning with PyTorch (Book)](https://pytorch.org/deep-learning-with-pytorch)
- [PyTorch Course by FastAI](https://course.fast.ai/)
- [Dive into Deep Learning](https://d2l.ai/) - Interactive book
- [PyTorch Examples GitHub](https://github.com/pytorch/examples)

### Tools
- [TensorBoard](https://pytorch.org/tutorials/recipes/recipes/tensorboard_with_pytorch.html)
- [Weights & Biases](https://wandb.ai/)
- [MLflow](https://mlflow.org/)
- [Comet ML](https://www.comet.ml/)

### Community
- [PyTorch GitHub](https://github.com/pytorch/pytorch)
- [PyTorch Reddit](https://www.reddit.com/r/pytorch/)
- [Papers with Code](https://paperswithcode.com/)

---

**Last Updated**: January 2026  
**PyTorch Version**: 2.2+

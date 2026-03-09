# LightGBM - Light Gradient Boosting Machine

## Table of Contents
- [Introduction](#introduction)
- [Why LightGBM?](#why-lightgbm)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Basic Usage](#basic-usage)
- [Hyperparameter Tuning](#hyperparameter-tuning)
- [Feature Engineering](#feature-engineering)
- [Handling Categorical Features](#handling-categorical-features)
- [Distributed Training](#distributed-training)
- [Advanced Features](#advanced-features)
- [Model Deployment](#model-deployment)
- [LightGBM vs XGBoost](#lightgbm-vs-xgboost)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

LightGBM (Light Gradient Boosting Machine) is a gradient boosting framework developed by Microsoft that uses tree-based learning algorithms. It is designed for efficiency and scalability, particularly excelling with large datasets and high-dimensional features.

### Key Characteristics

- **Speed**: 10-20x faster than traditional gradient boosting
- **Memory Efficiency**: Lower memory consumption than XGBoost
- **Accuracy**: State-of-the-art performance on many datasets
- **Leaf-wise Growth**: Grows trees leaf-wise instead of level-wise
- **Native Categorical Support**: Handles categorical features directly
- **GPU Support**: CUDA acceleration for training
- **Distributed Training**: Supports multi-machine training

### LightGBM Innovations

1. **GOSS (Gradient-based One-Side Sampling)**: Focuses on samples with large gradients
2. **EFB (Exclusive Feature Bundling)**: Reduces feature dimensions
3. **Histogram-based Algorithm**: Bins continuous features for faster training
4. **Leaf-wise Growth**: More accurate than level-wise for same number of leaves

---

## Why LightGBM?

### Benefits

✅ **Superior Speed**
- Histogram-based algorithm
- Parallel learning
- GPU acceleration
- Efficient memory usage

✅ **Handles Large Data**
- Millions of samples
- High-dimensional features
- Sparse data optimization
- Categorical feature support

✅ **Better Accuracy**
- Leaf-wise tree growth
- Optimal split finding
- Advanced regularization
- Handles imbalanced data

✅ **Production-Ready**
- Fast inference
- Model serialization
- Cross-platform support
- Integration with major frameworks

### Use Cases

- **Finance**: Credit scoring, algorithmic trading, risk management
- **E-commerce**: Customer segmentation, recommendation, demand forecasting
- **Healthcare**: Disease prediction, patient risk scoring, drug discovery
- **Web**: Click prediction, ranking, anomaly detection
- **Marketing**: Customer churn, LTV prediction, conversion optimization
- **Retail**: Inventory optimization, price optimization, sales forecasting

---

## Installation & Setup

### Installation

```bash
# Via pip
pip install lightgbm

# With GPU support (CUDA required)
pip install lightgbm --config-settings=cmake.define.USE_GPU=ON

# Via conda
conda install -c conda-forge lightgbm

# Build from source (latest features)
git clone --recursive https://github.com/microsoft/LightGBM
cd LightGBM
mkdir build
cd build
cmake ..
make -j4
cd ../python-package
python setup.py install
```

### Verify Installation

```python
import lightgbm as lgb

print(f"LightGBM version: {lgb.__version__}")

# Check GPU support
print(f"GPU support: {lgb.get_config()}")

# Build info
print(lgb.get_build_info())
```

### Dependencies

```bash
# Core dependencies
pip install numpy scipy scikit-learn

# Recommended
pip install pandas matplotlib seaborn
pip install joblib  # Model persistence
pip install optuna  # Hyperparameter tuning
pip install shap    # Model interpretation
```

---

## Core Concepts

### Gradient Boosting Overview

LightGBM builds an ensemble of decision trees sequentially:

```
F(x) = f₀(x) + η·f₁(x) + η·f₂(x) + ... + η·fₙ(x)

Where:
- F(x) = Final prediction
- fᵢ(x) = Individual trees
- η = Learning rate
```

### Leaf-wise vs Level-wise Growth

**Level-wise (Traditional, XGBoost)**:
```
       Root
      /    \
    L1      L1
   /  \    /  \
  L2  L2  L2  L2
```

**Leaf-wise (LightGBM)**:
```
       Root
      /    \
    L1      L1
   /  \    
  L2  L2  L3
       \
        L4
```

Leaf-wise grows the leaf with maximum loss reduction, leading to:
- ✅ Better accuracy with fewer trees
- ⚠️ Risk of overfitting (needs max_depth constraint)

### GOSS (Gradient-based One-Side Sampling)

1. Keep all samples with large gradients (large error)
2. Random sample from small gradient samples
3. Amplify small gradient samples to maintain distribution

**Result**: Faster training with minimal accuracy loss

### EFB (Exclusive Feature Bundling)

Bundles mutually exclusive features (rarely non-zero simultaneously):
- Reduces feature dimensions
- Faster training
- Lower memory usage

---

## Basic Usage

### Binary Classification

```python
import lightgbm as lgb
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score

# Load data
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create Dataset
train_data = lgb.Dataset(X_train, label=y_train)
test_data = lgb.Dataset(X_test, label=y_test, reference=train_data)

# Parameters
params = {
    'objective': 'binary',
    'metric': 'binary_logloss',
    'boosting_type': 'gbdt',
    'num_leaves': 31,
    'learning_rate': 0.05,
    'feature_fraction': 0.9,
    'bagging_fraction': 0.8,
    'bagging_freq': 5,
    'verbose': 0
}

# Train
model = lgb.train(
    params,
    train_data,
    num_boost_round=100,
    valid_sets=[train_data, test_data],
    valid_names=['train', 'valid'],
    callbacks=[
        lgb.early_stopping(stopping_rounds=10),
        lgb.log_evaluation(period=10)
    ]
)

# Predict
y_pred_proba = model.predict(X_test)
y_pred = (y_pred_proba > 0.5).astype(int)

print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(f"ROC-AUC: {roc_auc_score(y_test, y_pred_proba):.4f}")
```

### Multi-class Classification

```python
from sklearn.datasets import load_iris

# Load data
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Create Dataset
train_data = lgb.Dataset(X_train, label=y_train)

# Parameters
params = {
    'objective': 'multiclass',
    'num_class': 3,
    'metric': 'multi_logloss',
    'boosting_type': 'gbdt',
    'num_leaves': 31,
    'learning_rate': 0.05
}

# Train
model = lgb.train(params, train_data, num_boost_round=100)

# Predict
y_pred_proba = model.predict(X_test)  # Shape: (n_samples, n_classes)
y_pred = y_pred_proba.argmax(axis=1)

print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
```

### Regression

```python
from sklearn.datasets import fetch_california_housing
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Load data
X, y = fetch_california_housing(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Create Dataset
train_data = lgb.Dataset(X_train, label=y_train)
test_data = lgb.Dataset(X_test, label=y_test, reference=train_data)

# Parameters
params = {
    'objective': 'regression',
    'metric': 'rmse',
    'boosting_type': 'gbdt',
    'num_leaves': 31,
    'learning_rate': 0.05,
    'feature_fraction': 0.9
}

# Train
model = lgb.train(
    params,
    train_data,
    num_boost_round=200,
    valid_sets=[test_data],
    callbacks=[lgb.early_stopping(20)]
)

# Predict
y_pred = model.predict(X_test)

print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.4f}")
print(f"R² Score: {r2_score(y_test, y_pred):.4f}")
```

### Scikit-learn API

```python
from lightgbm import LGBMClassifier, LGBMRegressor

# Classification
clf = LGBMClassifier(
    boosting_type='gbdt',
    num_leaves=31,
    max_depth=-1,
    learning_rate=0.05,
    n_estimators=100,
    subsample=0.8,
    colsample_bytree=0.9,
    random_state=42
)

clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
y_pred_proba = clf.predict_proba(X_test)

# Regression
reg = LGBMRegressor(
    boosting_type='gbdt',
    num_leaves=31,
    learning_rate=0.05,
    n_estimators=200,
    random_state=42
)

reg.fit(X_train, y_train)
y_pred = reg.predict(X_test)
```

---

## Hyperparameter Tuning

### Key Hyperparameters

#### Control Overfitting

```python
params = {
    # Limit tree complexity
    'num_leaves': 31,              # Max leaves per tree (2^max_depth)
    'max_depth': -1,               # Max tree depth (-1 = no limit)
    'min_data_in_leaf': 20,        # Minimum samples per leaf
    'min_gain_to_split': 0.0,      # Minimum gain to split
    
    # Regularization
    'lambda_l1': 0.0,              # L1 regularization
    'lambda_l2': 0.0,              # L2 regularization
    'min_gain_to_split': 0.0,      # Min loss reduction for split
    
    # Sampling
    'bagging_fraction': 0.8,       # Row sampling ratio
    'bagging_freq': 5,             # Frequency for bagging
    'feature_fraction': 0.8,       # Column sampling ratio
    
    # Learning
    'learning_rate': 0.05,         # Shrinkage rate (0.01-0.3)
    'num_iterations': 100          # Number of boosting rounds
}
```

#### Improve Accuracy

```python
params = {
    'num_leaves': 50,              # More leaves
    'max_depth': -1,               # Deeper trees
    'learning_rate': 0.01,         # Lower learning rate
    'num_iterations': 1000,        # More iterations
    'bagging_fraction': 1.0,       # No row sampling
    'feature_fraction': 1.0,       # No column sampling
}
```

#### Speed Up Training

```python
params = {
    'num_leaves': 15,              # Fewer leaves
    'max_depth': 5,                # Shallower trees
    'bagging_fraction': 0.7,       # More aggressive sampling
    'feature_fraction': 0.7,
    'min_data_in_leaf': 50,        # Larger leaf size
}
```

### Grid Search

```python
from sklearn.model_selection import GridSearchCV

# Define model
model = LGBMClassifier(random_state=42, n_jobs=-1)

# Parameter grid
param_grid = {
    'num_leaves': [15, 31, 50],
    'max_depth': [3, 5, 7, -1],
    'learning_rate': [0.01, 0.05, 0.1],
    'n_estimators': [100, 200, 300],
    'subsample': [0.8, 1.0],
    'colsample_bytree': [0.8, 1.0]
}

# Grid search
grid_search = GridSearchCV(
    model,
    param_grid,
    cv=5,
    scoring='roc_auc',
    n_jobs=-1,
    verbose=1
)

grid_search.fit(X_train, y_train)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.4f}")
```

### Optuna Optimization

```python
import optuna
from lightgbm import LGBMClassifier

def objective(trial):
    params = {
        'objective': 'binary',
        'metric': 'binary_logloss',
        'verbosity': -1,
        'boosting_type': 'gbdt',
        'num_leaves': trial.suggest_int('num_leaves', 10, 100),
        'max_depth': trial.suggest_int('max_depth', 3, 12),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3),
        'n_estimators': trial.suggest_int('n_estimators', 50, 500),
        'min_child_samples': trial.suggest_int('min_child_samples', 5, 100),
        'subsample': trial.suggest_float('subsample', 0.5, 1.0),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.5, 1.0),
        'reg_alpha': trial.suggest_float('reg_alpha', 1e-8, 10.0, log=True),
        'reg_lambda': trial.suggest_float('reg_lambda', 1e-8, 10.0, log=True),
    }
    
    model = LGBMClassifier(**params, random_state=42)
    model.fit(X_train, y_train, eval_set=[(X_test, y_test)], 
              callbacks=[lgb.early_stopping(20, verbose=False)])
    
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    return roc_auc_score(y_test, y_pred_proba)

# Optimize
study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100, show_progress_bar=True)

print(f"Best parameters: {study.best_params}")
print(f"Best value: {study.best_value:.4f}")

# Train final model with best params
best_model = LGBMClassifier(**study.best_params, random_state=42)
best_model.fit(X_train, y_train)
```

### Cross-Validation

```python
# Built-in LightGBM CV
params = {
    'objective': 'binary',
    'metric': 'binary_logloss',
    'boosting_type': 'gbdt',
    'num_leaves': 31,
    'learning_rate': 0.05
}

train_data = lgb.Dataset(X_train, label=y_train)

cv_results = lgb.cv(
    params,
    train_data,
    num_boost_round=1000,
    nfold=5,
    stratified=True,
    shuffle=True,
    callbacks=[
        lgb.early_stopping(50),
        lgb.log_evaluation(50)
    ]
)

print(f"Best iteration: {len(cv_results['valid binary_logloss-mean'])}")
print(f"Best score: {min(cv_results['valid binary_logloss-mean']):.4f}")
```

---

## Feature Engineering

### Feature Importance

```python
# Train model
model = lgb.train(params, train_data, num_boost_round=100)

# Feature importance (different types)
importance_gain = model.feature_importance(importance_type='gain')
importance_split = model.feature_importance(importance_type='split')

# Plot importance
import matplotlib.pyplot as plt

lgb.plot_importance(model, importance_type='gain', max_num_features=10)
plt.show()

# With scikit-learn API
clf = LGBMClassifier()
clf.fit(X_train, y_train)

import pandas as pd
feature_importance = pd.DataFrame({
    'feature': feature_names,
    'importance': clf.feature_importances_
}).sort_values('importance', ascending=False)

print(feature_importance.head(10))
```

### SHAP Values

```python
import shap

# Train model
model = LGBMClassifier()
model.fit(X_train, y_train)

# SHAP explainer
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Summary plot
shap.summary_plot(shap_values, X_test, feature_names=feature_names)

# Force plot for single prediction
shap.force_plot(
    explainer.expected_value[1], 
    shap_values[1][0], 
    X_test[0],
    feature_names=feature_names
)

# Waterfall plot
shap.waterfall_plot(
    shap.Explanation(
        values=shap_values[1][0],
        base_values=explainer.expected_value[1],
        data=X_test[0],
        feature_names=feature_names
    )
)
```

### Feature Selection

```python
from sklearn.feature_selection import SelectFromModel

# Train model
model = LGBMClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Select features based on importance
selector = SelectFromModel(model, threshold='median', prefit=True)
X_train_selected = selector.transform(X_train)
X_test_selected = selector.transform(X_test)

# Get selected features
selected_features = selector.get_support()
print(f"Selected {selected_features.sum()} features")

# Retrain with selected features
model_reduced = LGBMClassifier(n_estimators=100)
model_reduced.fit(X_train_selected, y_train)
```

---

## Handling Categorical Features

### Native Categorical Support

```python
import pandas as pd

# Sample data with categorical features
df = pd.DataFrame({
    'age': [25, 30, 35, 40],
    'city': ['NYC', 'LA', 'Chicago', 'NYC'],
    'education': ['BS', 'MS', 'PhD', 'BS'],
    'salary': [50000, 70000, 90000, 60000]
})

# Specify categorical features
categorical_features = ['city', 'education']

# Convert to category type
for col in categorical_features:
    df[col] = df[col].astype('category')

# Prepare data
X = df.drop('salary', axis=1)
y = df['salary']

# Create Dataset with categorical features
train_data = lgb.Dataset(
    X, 
    label=y,
    categorical_feature=categorical_features
)

# Train
params = {
    'objective': 'regression',
    'metric': 'rmse'
}

model = lgb.train(params, train_data, num_boost_round=100)
```

### Categorical Feature Encoding

```python
import pandas as pd
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv('data.csv')

# Method 1: LightGBM native (recommended)
categorical_cols = ['category1', 'category2']
for col in categorical_cols:
    df[col] = df[col].astype('category')

train_data = lgb.Dataset(
    df[features],
    label=df['target'],
    categorical_feature=categorical_cols
)

# Method 2: Label Encoding
le = LabelEncoder()
for col in categorical_cols:
    df[f'{col}_encoded'] = le.fit_transform(df[col])

# Method 3: One-Hot Encoding (not recommended for LightGBM)
df_encoded = pd.get_dummies(df, columns=categorical_cols)
```

### Optimal Split for Categorical Features

LightGBM uses an optimal split algorithm for categorical features:

1. Sort categories by training objective
2. Split into two groups
3. Find optimal split point

**Advantages**:
- No need for one-hot encoding
- Handles high-cardinality features
- Faster training
- Better accuracy

---

## Distributed Training

### Multi-threading (Single Machine)

```python
# Utilize all CPU cores
params = {
    'objective': 'binary',
    'num_threads': -1,  # Use all available threads
    'force_col_wise': True  # Force column-wise histogram building
}

model = lgb.train(params, train_data, num_boost_round=100)

# Or with scikit-learn API
clf = LGBMClassifier(n_jobs=-1)
clf.fit(X_train, y_train)
```

### Distributed Training (Multi-machine)

```python
# Machine 1 (master)
params = {
    'objective': 'binary',
    'tree_learner': 'feature',  # Feature parallel
    'num_machines': 4,
    'local_listen_port': 12400,
    'machines': '192.168.1.1:12400,192.168.1.2:12400,192.168.1.3:12400,192.168.1.4:12400'
}

# Machine 2, 3, 4 (workers)
# Use same parameters with different local_listen_port

model = lgb.train(params, train_data, num_boost_round=100)
```

### GPU Training

```python
# Single GPU
params = {
    'objective': 'binary',
    'device': 'gpu',
    'gpu_device_id': 0,
    'gpu_platform_id': 0,
    'gpu_use_dp': False  # Use single precision (faster)
}

model = lgb.train(params, train_data, num_boost_round=100)

# Multi-GPU (with Dask)
from dask.distributed import Client
from dask_cuda import LocalCUDACluster
import dask.array as da

cluster = LocalCUDACluster()
client = Client(cluster)

# Convert to Dask arrays
X_dask = da.from_array(X_train, chunks=(10000, -1))
y_dask = da.from_array(y_train, chunks=10000)

# Train with GPU
params = {
    'objective': 'binary',
    'device': 'gpu'
}

model = lgb.dask.train(
    client,
    params,
    X_dask,
    y_dask,
    num_boost_round=100
)
```

### Dask Integration

```python
import dask.dataframe as dd
from lightgbm.dask import DaskLGBMClassifier

# Load data with Dask
df = dd.read_csv('large_data.csv')

# Split features and target
X = df.drop('target', axis=1)
y = df['target']

# Train
clf = DaskLGBMClassifier(
    n_estimators=100,
    num_leaves=31,
    learning_rate=0.05
)

clf.fit(X, y)

# Predict
predictions = clf.predict(X)
```

---

## Advanced Features

### Custom Objective Function

```python
import numpy as np

# Custom Huber loss
def huber_loss(y_true, y_pred):
    delta = 1.0
    residual = y_true - y_pred
    abs_residual = np.abs(residual)
    
    # Gradient
    grad = np.where(
        abs_residual <= delta,
        -residual,
        -delta * np.sign(residual)
    )
    
    # Hessian
    hess = np.where(
        abs_residual <= delta,
        np.ones_like(residual),
        np.zeros_like(residual)
    )
    
    return grad, hess

# Train with custom objective
params = {
    'boosting_type': 'gbdt',
    'num_leaves': 31
}

model = lgb.train(
    params,
    train_data,
    num_boost_round=100,
    fobj=huber_loss
)
```

### Custom Evaluation Metric

```python
from sklearn.metrics import f1_score

# Custom F1 metric
def lgb_f1_score(y_true, y_pred):
    y_pred_binary = (y_pred > 0.5).astype(int)
    f1 = f1_score(y_true, y_pred_binary)
    return 'f1', f1, True  # (name, value, is_higher_better)

# Train with custom metric
model = lgb.train(
    params,
    train_data,
    num_boost_round=100,
    valid_sets=[test_data],
    feval=lgb_f1_score
)
```

### Monotone Constraints

```python
# Enforce monotonic relationships
params = {
    'objective': 'regression',
    'monotone_constraints': [1, -1, 0, 1],  # Per feature
    'num_leaves': 31
}

# Feature 0: increasing (e.g., education → salary)
# Feature 1: decreasing (e.g., debt → credit score)
# Feature 2: no constraint
# Feature 3: increasing

model = lgb.train(params, train_data, num_boost_round=100)
```

### Feature Interaction Constraints

```python
# Restrict which features can interact
params = {
    'objective': 'binary',
    'interaction_constraints': [[0, 1], [2, 3]],  # Only these pairs can interact
    'num_leaves': 31
}

model = lgb.train(params, train_data, num_boost_round=100)
```

### Early Stopping

```python
# Method 1: Callback
model = lgb.train(
    params,
    train_data,
    num_boost_round=1000,
    valid_sets=[test_data],
    callbacks=[
        lgb.early_stopping(stopping_rounds=50, verbose=True)
    ]
)

# Method 2: With scikit-learn API
clf = LGBMClassifier(n_estimators=1000)
clf.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    callbacks=[lgb.early_stopping(50)]
)

print(f"Best iteration: {clf.best_iteration_}")
print(f"Best score: {clf.best_score_}")
```

### Ranking

```python
# Learning to rank
# Group data by query ID

train_data = lgb.Dataset(
    X_train,
    label=y_train,
    group=[10, 15, 20]  # Number of documents per query
)

params = {
    'objective': 'lambdarank',  # or 'rank_xendcg'
    'metric': 'ndcg',
    'ndcg_eval_at': [1, 3, 5, 10],
    'num_leaves': 31
}

model = lgb.train(params, train_data, num_boost_round=100)
```

---

## Model Deployment

### Save & Load Models

```python
# Save model
model.save_model('lightgbm_model.txt')

# Load model
loaded_model = lgb.Booster(model_file='lightgbm_model.txt')

# Predict with loaded model
predictions = loaded_model.predict(X_test)

# Save with scikit-learn API
import joblib
clf = LGBMClassifier()
clf.fit(X_train, y_train)
joblib.dump(clf, 'lgbm_classifier.pkl')

# Load
loaded_clf = joblib.load('lgbm_classifier.pkl')
```

### Model to String

```python
# Convert model to string (for storage/transmission)
model_str = model.model_to_string()

# Load from string
loaded_model = lgb.Booster(model_str=model_str)
```

### Export to JSON

```python
# Save as JSON
model.save_model('model.json')

# Load from JSON
loaded_model = lgb.Booster(model_file='model.json')

# Dump tree structure
tree_dump = model.dump_model()
print(tree_dump)
```

### Model Serving (Flask)

```python
from flask import Flask, request, jsonify
import lightgbm as lgb
import numpy as np

app = Flask(__name__)

# Load model at startup
model = lgb.Booster(model_file='lightgbm_model.txt')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    
    prediction = model.predict(features)[0]
    
    return jsonify({
        'prediction': float(prediction),
        'probability': float(prediction) if model.params['objective'] == 'binary' else None
    })

@app.route('/batch_predict', methods=['POST'])
def batch_predict():
    data = request.json
    features = np.array(data['features'])
    
    predictions = model.predict(features)
    
    return jsonify({
        'predictions': predictions.tolist()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### ONNX Export

```python
# Convert to ONNX format
import lightgbm as lgb
from onnxmltools.convert import convert_lightgbm
from onnxmltools.convert.common.data_types import FloatTensorType

# Train model
model = LGBMClassifier()
model.fit(X_train, y_train)

# Convert to ONNX
initial_type = [('float_input', FloatTensorType([None, X_train.shape[1]]))]
onnx_model = convert_lightgbm(
    model,
    initial_types=initial_type,
    target_opset=12
)

# Save ONNX model
with open('model.onnx', 'wb') as f:
    f.write(onnx_model.SerializeToString())

# Inference with ONNX Runtime
import onnxruntime as rt

sess = rt.InferenceSession('model.onnx')
input_name = sess.get_inputs()[0].name
predictions = sess.run(None, {input_name: X_test.astype(np.float32)})[0]
```

---

## LightGBM vs XGBoost

### Performance Comparison

| Feature | LightGBM | XGBoost |
|---------|----------|---------|
| **Speed** | ✅ Faster (10-20x) | Good |
| **Memory** | ✅ Lower | Higher |
| **Accuracy** | Excellent | ✅ Excellent |
| **Large Data** | ✅ Better | Good |
| **Categorical** | ✅ Native support | Limited |
| **Tree Growth** | Leaf-wise | Level-wise |
| **GPU Support** | ✅ Excellent | Good |
| **Interpretability** | Good | Good |

### When to Use LightGBM

✅ Large datasets (> 10K samples)
✅ Many features (> 100)
✅ Categorical features
✅ Speed is critical
✅ Limited memory
✅ High-dimensional data

### When to Use XGBoost

✅ Small datasets (< 10K samples)
✅ More stable/robust
✅ Better documentation
✅ Wider community support
✅ Need exact split finding

### Side-by-Side Example

```python
import time
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier

# XGBoost
start = time.time()
xgb_model = XGBClassifier(n_estimators=100, max_depth=6)
xgb_model.fit(X_train, y_train)
xgb_time = time.time() - start
xgb_score = xgb_model.score(X_test, y_test)

# LightGBM
start = time.time()
lgb_model = LGBMClassifier(n_estimators=100, max_depth=6)
lgb_model.fit(X_train, y_train)
lgb_time = time.time() - start
lgb_score = lgb_model.score(X_test, y_test)

print(f"XGBoost - Time: {xgb_time:.2f}s, Accuracy: {xgb_score:.4f}")
print(f"LightGBM - Time: {lgb_time:.2f}s, Accuracy: {lgb_score:.4f}")
print(f"Speedup: {xgb_time/lgb_time:.2f}x")
```

---

## Best Practices

### 1. Choose Appropriate num_leaves

```python
# Rule of thumb: num_leaves = 2^(max_depth)
# But use smaller num_leaves to prevent overfitting

params = {
    'num_leaves': 31,  # Good default
    'max_depth': -1    # Or set max_depth to control depth
}

# For large datasets
params = {'num_leaves': 50, 'max_depth': -1}

# For small datasets
params = {'num_leaves': 15, 'max_depth': 5}
```

### 2. Use Categorical Features Properly

```python
# Good: Use native categorical support
categorical_features = ['category1', 'category2']
for col in categorical_features:
    df[col] = df[col].astype('category')

train_data = lgb.Dataset(
    df[features],
    label=df['target'],
    categorical_feature=categorical_features
)

# Avoid: One-hot encoding (wastes memory and speed)
```

### 3. Tune Learning Rate with num_iterations

```python
# Lower learning rate + more iterations = better accuracy
params_accurate = {
    'learning_rate': 0.01,
    'num_iterations': 1000
}

# Higher learning rate + fewer iterations = faster training
params_fast = {
    'learning_rate': 0.1,
    'num_iterations': 100
}
```

### 4. Use Early Stopping

```python
model = lgb.train(
    params,
    train_data,
    num_boost_round=10000,  # Set high
    valid_sets=[test_data],
    callbacks=[lgb.early_stopping(100)]  # Stop if no improvement
)
```

### 5. Handle Imbalanced Data

```python
# Calculate class weights
from sklearn.utils.class_weight import compute_class_weight

class_weights = compute_class_weight(
    class_weight='balanced',
    classes=np.unique(y_train),
    y=y_train
)

# Method 1: scale_pos_weight
params = {
    'objective': 'binary',
    'is_unbalance': True,  # or use scale_pos_weight
    'scale_pos_weight': class_weights[1] / class_weights[0]
}

# Method 2: Custom sample weights
sample_weights = np.ones(len(y_train))
sample_weights[y_train == 1] = class_weights[1]
sample_weights[y_train == 0] = class_weights[0]

train_data = lgb.Dataset(X_train, label=y_train, weight=sample_weights)
```

### 6. Feature Engineering

```python
# Create interaction features
df['feature_interaction'] = df['feature1'] * df['feature2']

# Aggregations
df['feature_mean'] = df.groupby('category')['value'].transform('mean')
df['feature_std'] = df.groupby('category')['value'].transform('std')

# Binning
df['age_bin'] = pd.cut(df['age'], bins=[0, 18, 35, 50, 100])
```

### 7. Monitor Training with Callbacks

```python
# Custom callback
def log_metrics(env):
    if env.iteration % 50 == 0:
        print(f"Iteration {env.iteration}")
        for eval_name, eval_result, _ in env.evaluation_result_list:
            print(f"  {eval_name}: {eval_result:.4f}")

model = lgb.train(
    params,
    train_data,
    num_boost_round=1000,
    valid_sets=[train_data, test_data],
    valid_names=['train', 'valid'],
    callbacks=[
        log_metrics,
        lgb.early_stopping(50)
    ]
)
```

---

## Real-World Examples

### Credit Scoring

```python
import pandas as pd
from lightgbm import LGBMClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, classification_report

# Load data
df = pd.read_csv('credit_applications.csv')

# Feature engineering
df['debt_to_income'] = df['total_debt'] / df['annual_income']
df['credit_utilization'] = df['credit_balance'] / df['credit_limit']
df['income_per_person'] = df['annual_income'] / (df['num_dependents'] + 1)

# Categorical features
categorical_features = ['employment_type', 'home_ownership', 'loan_purpose']
for col in categorical_features:
    df[col] = df[col].astype('category')

# Prepare data
features = ['annual_income', 'debt_to_income', 'credit_utilization', 
            'income_per_person', 'employment_type', 'home_ownership', 
            'loan_purpose', 'credit_history_years']

X = df[features]
y = df['default']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# Train
model = LGBMClassifier(
    boosting_type='gbdt',
    num_leaves=50,
    max_depth=7,
    learning_rate=0.05,
    n_estimators=500,
    subsample=0.8,
    colsample_bytree=0.8,
    is_unbalance=True,
    random_state=42,
    categorical_feature=categorical_features
)

model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    callbacks=[lgb.early_stopping(50, verbose=False)]
)

# Evaluate
y_pred_proba = model.predict_proba(X_test)[:, 1]
print(f"ROC-AUC: {roc_auc_score(y_test, y_pred_proba):.4f}")

# Feature importance
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("\nTop 10 Important Features:")
print(feature_importance.head(10))
```

### E-commerce Recommendation

```python
import pandas as pd
from lightgbm import LGBMRanker

# Load data (user-item interactions)
df = pd.read_csv('user_item_interactions.csv')

# Feature engineering
df['user_item_interaction_count'] = df.groupby(['user_id', 'item_id'])['user_id'].transform('count')
df['user_avg_rating'] = df.groupby('user_id')['rating'].transform('mean')
df['item_avg_rating'] = df.groupby('item_id')['rating'].transform('mean')
df['user_total_purchases'] = df.groupby('user_id')['purchase'].transform('sum')

# Prepare ranking data
features = ['user_item_interaction_count', 'user_avg_rating', 
            'item_avg_rating', 'user_total_purchases', 'item_price']

X = df[features]
y = df['rating']  # Relevance score

# Group by user (query)
groups = df.groupby('user_id').size().values

# Train ranker
model = LGBMRanker(
    objective='lambdarank',
    metric='ndcg',
    boosting_type='gbdt',
    num_leaves=31,
    learning_rate=0.05,
    n_estimators=200
)

model.fit(X, y, group=groups)

# Predict for new user
user_items = df[df['user_id'] == 'new_user']
scores = model.predict(user_items[features])

# Top 10 recommendations
top_items = user_items.iloc[scores.argsort()[-10:][::-1]]
print("Top 10 Recommendations:")
print(top_items[['item_id', 'item_name']])
```

### Time Series Forecasting

```python
import pandas as pd
from lightgbm import LGBMRegressor

# Load sales data
df = pd.read_csv('sales_data.csv', parse_dates=['date'])
df = df.sort_values('date')

# Time-based features
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day'] = df['date'].dt.day
df['dayofweek'] = df['date'].dt.dayofweek
df['weekofyear'] = df['date'].dt.isocalendar().week
df['is_weekend'] = (df['dayofweek'] >= 5).astype(int)
df['is_month_start'] = df['date'].dt.is_month_start.astype(int)
df['is_month_end'] = df['date'].dt.is_month_end.astype(int)

# Lag features
for lag in [1, 7, 14, 30, 60]:
    df[f'sales_lag_{lag}'] = df['sales'].shift(lag)

# Rolling window features
for window in [7, 14, 30]:
    df[f'sales_rolling_mean_{window}'] = df['sales'].rolling(window).mean()
    df[f'sales_rolling_std_{window}'] = df['sales'].rolling(window).std()
    df[f'sales_rolling_min_{window}'] = df['sales'].rolling(window).min()
    df[f'sales_rolling_max_{window}'] = df['sales'].rolling(window).max()

# Expanding window features
df['sales_expanding_mean'] = df['sales'].expanding().mean()

# Drop NaN
df = df.dropna()

# Features
lag_features = [col for col in df.columns if 'lag' in col or 'rolling' in col or 'expanding' in col]
time_features = ['year', 'month', 'day', 'dayofweek', 'weekofyear', 
                 'is_weekend', 'is_month_start', 'is_month_end']
features = time_features + lag_features

X = df[features]
y = df['sales']

# Time-based split (no shuffle!)
split_idx = int(len(df) * 0.8)
X_train, X_test = X[:split_idx], X[split_idx:]
y_train, y_test = y[:split_idx], y[split_idx:]

# Train
model = LGBMRegressor(
    boosting_type='gbdt',
    num_leaves=50,
    max_depth=7,
    learning_rate=0.05,
    n_estimators=500,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    callbacks=[lgb.early_stopping(50, verbose=False)]
)

# Predict
y_pred = model.predict(X_test)

# Evaluate
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100

print(f"MAE: {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"MAPE: {mape:.2f}%")

# Feature importance
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("\nTop 10 Features:")
print(feature_importance.head(10))
```

---

## Resources

### Official Documentation
- [LightGBM Documentation](https://lightgbm.readthedocs.io/)
- [Parameters Guide](https://lightgbm.readthedocs.io/en/latest/Parameters.html)
- [Python API Reference](https://lightgbm.readthedocs.io/en/latest/Python-API.html)
- [Advanced Topics](https://lightgbm.readthedocs.io/en/latest/Advanced-Topics.html)

### Papers & Research
- [Original Paper: LightGBM: A Highly Efficient Gradient Boosting Decision Tree](https://papers.nips.cc/paper/6907-lightgbm-a-highly-efficient-gradient-boosting-decision-tree) (Ke et al., 2017)
- [GOSS and EFB Algorithms](https://www.microsoft.com/en-us/research/publication/lightgbm-a-highly-efficient-gradient-boosting-decision-tree/)

### Tutorials & Guides
- [Complete Guide to LightGBM](https://machinelearningmastery.com/light-gradient-boosted-machine-lightgbm-ensemble/)
- [LightGBM Parameters Tuning](https://lightgbm.readthedocs.io/en/latest/Parameters-Tuning.html)
- [Kaggle LightGBM Tutorial](https://www.kaggle.com/learn/intermediate-machine-learning)

### Tools & Libraries
- [SHAP](https://github.com/slundberg/shap) - Model interpretation
- [Optuna](https://optuna.org/) - Hyperparameter optimization
- [FLAML](https://github.com/microsoft/FLAML) - AutoML with LightGBM
- [MLflow](https://mlflow.org/) - Experiment tracking

### Community
- [GitHub Repository](https://github.com/microsoft/LightGBM)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/lightgbm)
- [Gitter Chat](https://gitter.im/Microsoft/LightGBM)
- [GitHub Discussions](https://github.com/microsoft/LightGBM/discussions)

### Benchmarks & Comparisons
- [LightGBM vs XGBoost Benchmark](https://github.com/szilard/GBM-perf)
- [Kaggle Winning Solutions](https://www.kaggle.com/competitions) - Many use LightGBM
- [UCI ML Repository](https://archive.ics.uci.edu/ml/) - Benchmark datasets

### Blog Posts
- [Microsoft Research Blog](https://www.microsoft.com/en-us/research/project/lightgbm/)
- [Neptune.ai: LightGBM Guide](https://neptune.ai/blog/lightgbm-parameters-guide)
- [Towards Data Science: LightGBM](https://towardsdatascience.com/tagged/lightgbm)

---

**Last Updated**: January 2026  
**LightGBM Version**: 4.0+

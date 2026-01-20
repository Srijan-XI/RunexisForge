# XGBoost - Extreme Gradient Boosting

## Table of Contents
- [Introduction](#introduction)
- [Why XGBoost?](#why-xgboost)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Basic Usage](#basic-usage)
- [Hyperparameter Tuning](#hyperparameter-tuning)
- [Feature Importance](#feature-importance)
- [Handling Imbalanced Data](#handling-imbalanced-data)
- [Distributed Training](#distributed-training)
- [Integration with Scikit-learn](#integration-with-scikit-learn)
- [Advanced Features](#advanced-features)
- [Model Deployment](#model-deployment)
- [XGBoost vs Other Algorithms](#xgboost-vs-other-algorithms)
- [Best Practices](#best-practices)
- [Real-World Use Cases](#real-world-use-cases)
- [Resources](#resources)

---

## Introduction

XGBoost (Extreme Gradient Boosting) is an optimized distributed gradient boosting library designed for efficiency, flexibility, and portability. It has become one of the most popular machine learning algorithms, particularly in competitive machine learning (Kaggle) and production systems.

### Key Characteristics

- **High Performance**: Parallel tree boosting, GPU acceleration
- **Regularization**: L1 (Lasso) and L2 (Ridge) regularization to prevent overfitting
- **Handling Missing Values**: Automatically learns optimal direction for missing values
- **Tree Pruning**: Uses max_depth parameter and prunes trees backward
- **Built-in Cross-Validation**: Efficient CV at each iteration
- **Parallel Processing**: Multi-threading support for faster training
- **Flexibility**: Custom objective functions and evaluation metrics

### XGBoost Versions

- **Current Version**: 2.0+ (January 2026)
- **Major Updates**: GPU support, multi-output trees, categorical features
- **Language Support**: Python, R, Java, Scala, Julia, C++

---

## Why XGBoost?

### Benefits

✅ **Superior Performance**
- Consistently wins Kaggle competitions
- State-of-the-art accuracy on structured/tabular data
- Faster training than traditional gradient boosting
- GPU acceleration for large datasets

✅ **Robustness**
- Handles missing values automatically
- Built-in regularization prevents overfitting
- Works well with sparse data
- Resistant to outliers

✅ **Flexibility**
- Custom loss functions
- Custom evaluation metrics
- Multiple base learners
- Early stopping support

✅ **Production-Ready**
- Easy model serialization
- Fast prediction time
- PMML and JSON export
- Integration with major ML platforms

### Use Cases

- **Finance**: Credit scoring, fraud detection, risk assessment
- **Healthcare**: Disease prediction, patient readmission, treatment optimization
- **E-commerce**: Customer churn prediction, recommendation systems, demand forecasting
- **Marketing**: Click-through rate prediction, customer segmentation, LTV modeling
- **Insurance**: Claims prediction, premium calculation, risk modeling
- **Web**: Search ranking, ad click prediction, content recommendation

---

## Installation & Setup

### Installation

```bash
# Via pip
pip install xgboost

# With GPU support (CUDA required)
pip install xgboost --config-settings=use_cuda=ON

# Via conda
conda install -c conda-forge xgboost

# Development version
pip install git+https://github.com/dmlc/xgboost.git
```

### Verify Installation

```python
import xgboost as xgb

print(f"XGBoost version: {xgb.__version__}")

# Check GPU support
print(f"GPU available: {xgb.get_config()}")

# Build info
print(xgb.build_info())
```

### Dependencies

```bash
# Required
pip install numpy scipy scikit-learn

# Optional but recommended
pip install pandas matplotlib seaborn
pip install joblib  # Model persistence
pip install optuna  # Hyperparameter optimization
```

---

## Core Concepts

### Gradient Boosting Basics

XGBoost builds an ensemble of decision trees sequentially, where each tree corrects errors of previous trees.

```
F(x) = f₀(x) + η·f₁(x) + η·f₂(x) + ... + η·fₙ(x)

Where:
- F(x) = Final prediction
- f₀(x) = Initial prediction (usually mean)
- fᵢ(x) = Individual trees
- η = Learning rate (shrinkage)
```

### Key Algorithm Components

1. **Objective Function**: Loss + Regularization
   ```
   Obj = Σ L(yᵢ, ŷᵢ) + Σ Ω(fₖ)
   
   Where:
   - L = Loss function (e.g., MSE, log loss)
   - Ω = Regularization term (tree complexity)
   ```

2. **Regularization**:
   ```
   Ω(f) = γT + ½λ Σ wⱼ²
   
   Where:
   - T = Number of leaves
   - wⱼ = Leaf weights
   - γ = Complexity penalty
   - λ = L2 regularization
   ```

3. **Split Finding**: Greedy algorithm to find best splits
4. **Tree Pruning**: Max depth pruning + backward pruning

---

## Basic Usage

### Binary Classification

```python
import xgboost as xgb
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score

# Load data
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create DMatrix (XGBoost's internal data structure)
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)

# Set parameters
params = {
    'objective': 'binary:logistic',  # Binary classification
    'max_depth': 6,
    'learning_rate': 0.3,
    'n_estimators': 100,
    'eval_metric': 'auc'
}

# Train model
model = xgb.train(
    params,
    dtrain,
    num_boost_round=100,
    evals=[(dtrain, 'train'), (dtest, 'test')],
    early_stopping_rounds=10,
    verbose_eval=10
)

# Predict
y_pred_proba = model.predict(dtest)
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

# Create DMatrix
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)

# Parameters
params = {
    'objective': 'multi:softmax',  # Multi-class
    'num_class': 3,  # Number of classes
    'max_depth': 4,
    'learning_rate': 0.1,
    'eval_metric': 'mlogloss'
}

# Train
model = xgb.train(params, dtrain, num_boost_round=100)

# Predict
y_pred = model.predict(dtest)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")

# For probabilities, use 'multi:softprob'
params['objective'] = 'multi:softprob'
model_proba = xgb.train(params, dtrain, num_boost_round=100)
y_pred_proba = model_proba.predict(dtest)  # Shape: (n_samples, n_classes)
```

### Regression

```python
from sklearn.datasets import fetch_california_housing
from sklearn.metrics import mean_squared_error, r2_score

# Load data
X, y = fetch_california_housing(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Create DMatrix
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)

# Parameters
params = {
    'objective': 'reg:squarederror',  # Regression
    'max_depth': 5,
    'learning_rate': 0.1,
    'eval_metric': 'rmse'
}

# Train
model = xgb.train(
    params,
    dtrain,
    num_boost_round=200,
    evals=[(dtrain, 'train'), (dtest, 'test')],
    early_stopping_rounds=20,
    verbose_eval=20
)

# Predict
y_pred = model.predict(dtest)

print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.4f}")
print(f"R² Score: {r2_score(y_test, y_pred):.4f}")
```

---

## Hyperparameter Tuning

### Important Hyperparameters

#### Tree Structure Parameters

```python
params = {
    # Tree structure
    'max_depth': 6,              # Maximum tree depth (3-10)
    'min_child_weight': 1,       # Minimum sum of instance weight in child
    'gamma': 0,                  # Minimum loss reduction for split (0-5)
    'subsample': 0.8,            # Row sampling ratio (0.5-1.0)
    'colsample_bytree': 0.8,     # Column sampling ratio (0.5-1.0)
    'colsample_bylevel': 1.0,    # Column sampling per level
    'colsample_bynode': 1.0,     # Column sampling per split
}
```

#### Regularization Parameters

```python
params = {
    'lambda': 1.0,               # L2 regularization (0-10)
    'alpha': 0.0,                # L1 regularization (0-10)
    'eta': 0.3,                  # Learning rate (0.01-0.3)
    'learning_rate': 0.1,        # Same as eta
}
```

#### Other Important Parameters

```python
params = {
    'n_estimators': 100,         # Number of boosting rounds
    'scale_pos_weight': 1,       # Balance of positive/negative weights
    'max_delta_step': 0,         # Maximum delta step (0-10)
    'seed': 42,                  # Random seed
    'tree_method': 'auto',       # 'auto', 'exact', 'approx', 'hist', 'gpu_hist'
}
```

### Grid Search with Scikit-learn API

```python
from xgboost import XGBClassifier
from sklearn.model_selection import GridSearchCV

# Define model
model = XGBClassifier(
    objective='binary:logistic',
    random_state=42,
    n_jobs=-1
)

# Parameter grid
param_grid = {
    'max_depth': [3, 5, 7],
    'learning_rate': [0.01, 0.1, 0.3],
    'n_estimators': [100, 200, 300],
    'subsample': [0.8, 1.0],
    'colsample_bytree': [0.8, 1.0],
    'gamma': [0, 0.1, 0.5]
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

### Randomized Search

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import uniform, randint

# Parameter distributions
param_dist = {
    'max_depth': randint(3, 10),
    'learning_rate': uniform(0.01, 0.3),
    'n_estimators': randint(100, 500),
    'subsample': uniform(0.6, 0.4),
    'colsample_bytree': uniform(0.6, 0.4),
    'gamma': uniform(0, 5),
    'min_child_weight': randint(1, 10),
    'lambda': uniform(0, 10),
    'alpha': uniform(0, 10)
}

# Randomized search
random_search = RandomizedSearchCV(
    XGBClassifier(objective='binary:logistic', random_state=42),
    param_distributions=param_dist,
    n_iter=100,
    cv=5,
    scoring='roc_auc',
    n_jobs=-1,
    random_state=42,
    verbose=1
)

random_search.fit(X_train, y_train)
```

### Optuna Optimization

```python
import optuna
from xgboost import XGBClassifier

def objective(trial):
    params = {
        'max_depth': trial.suggest_int('max_depth', 3, 10),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3),
        'n_estimators': trial.suggest_int('n_estimators', 100, 500),
        'subsample': trial.suggest_float('subsample', 0.6, 1.0),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.6, 1.0),
        'gamma': trial.suggest_float('gamma', 0, 5),
        'min_child_weight': trial.suggest_int('min_child_weight', 1, 10),
        'lambda': trial.suggest_float('lambda', 0, 10),
        'alpha': trial.suggest_float('alpha', 0, 10)
    }
    
    model = XGBClassifier(**params, random_state=42)
    model.fit(X_train, y_train, eval_set=[(X_test, y_test)], 
              early_stopping_rounds=10, verbose=False)
    
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    return roc_auc_score(y_test, y_pred_proba)

# Optimize
study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)

print(f"Best parameters: {study.best_params}")
print(f"Best score: {study.best_value:.4f}")
```

---

## Feature Importance

### Built-in Feature Importance

```python
import matplotlib.pyplot as plt

# Train model
model = xgb.train(params, dtrain, num_boost_round=100)

# Feature importance (different metrics)
# 'weight': number of times feature appears in trees
# 'gain': average gain when feature is used
# 'cover': average coverage when feature is used

importance_weight = model.get_score(importance_type='weight')
importance_gain = model.get_score(importance_type='gain')
importance_cover = model.get_score(importance_type='cover')

# Plot feature importance
xgb.plot_importance(model, importance_type='gain', max_num_features=10)
plt.show()

# With scikit-learn API
model_sk = XGBClassifier()
model_sk.fit(X_train, y_train)

# Feature importances
importances = model_sk.feature_importances_

# Plot
import pandas as pd
feature_importance = pd.DataFrame({
    'feature': feature_names,
    'importance': importances
}).sort_values('importance', ascending=False)

plt.figure(figsize=(10, 6))
plt.barh(feature_importance['feature'][:10], feature_importance['importance'][:10])
plt.xlabel('Importance')
plt.title('Top 10 Feature Importances')
plt.gca().invert_yaxis()
plt.show()
```

### SHAP Values (Advanced Interpretation)

```python
import shap

# Train model
model = XGBClassifier()
model.fit(X_train, y_train)

# SHAP explainer
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Summary plot
shap.summary_plot(shap_values, X_test, feature_names=feature_names)

# Force plot for single prediction
shap.force_plot(explainer.expected_value, shap_values[0], X_test[0], 
                feature_names=feature_names)

# Dependence plot
shap.dependence_plot('feature_name', shap_values, X_test, 
                     feature_names=feature_names)
```

---

## Handling Imbalanced Data

### scale_pos_weight

```python
# Calculate scale_pos_weight
negative_samples = np.sum(y_train == 0)
positive_samples = np.sum(y_train == 1)
scale_pos_weight = negative_samples / positive_samples

params = {
    'objective': 'binary:logistic',
    'scale_pos_weight': scale_pos_weight,  # Balance classes
    'max_depth': 6,
    'learning_rate': 0.1
}

model = xgb.train(params, dtrain, num_boost_round=100)
```

### Custom Sample Weights

```python
# Assign higher weights to minority class
sample_weights = np.ones(len(y_train))
sample_weights[y_train == 1] = 5.0  # 5x weight for positive class

# Create DMatrix with weights
dtrain = xgb.DMatrix(X_train, label=y_train, weight=sample_weights)

model = xgb.train(params, dtrain, num_boost_round=100)
```

### SMOTE + XGBoost

```python
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline

# Create pipeline with SMOTE
pipeline = ImbPipeline([
    ('smote', SMOTE(random_state=42)),
    ('classifier', XGBClassifier())
])

pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)
```

### Custom Evaluation Metric

```python
from sklearn.metrics import f1_score

# Custom F1 metric
def custom_f1(preds, dtrain):
    labels = dtrain.get_label()
    preds_binary = (preds > 0.5).astype(int)
    f1 = f1_score(labels, preds_binary)
    return 'f1', f1

# Use in training
model = xgb.train(
    params,
    dtrain,
    num_boost_round=100,
    feval=custom_f1,
    maximize=True
)
```

---

## Distributed Training

### Dask Integration (Multi-core/Multi-node)

```python
import dask.array as da
import dask.dataframe as dd
from xgboost import dask as dxgb
from dask.distributed import Client

# Setup Dask client
client = Client()  # Local cluster
# client = Client('scheduler-address:8786')  # Remote cluster

# Create Dask arrays
X_dask = da.from_array(X_train, chunks=(1000, X_train.shape[1]))
y_dask = da.from_array(y_train, chunks=1000)

# Create DMatrix
dtrain = dxgb.DaskDMatrix(client, X_dask, y_dask)

# Train
params = {
    'objective': 'binary:logistic',
    'max_depth': 6,
    'learning_rate': 0.1
}

output = dxgb.train(
    client,
    params,
    dtrain,
    num_boost_round=100
)

# Get model
model = output['booster']

# Predict
dtest = dxgb.DaskDMatrix(client, X_test_dask)
predictions = dxgb.predict(client, model, dtest)
```

### Spark Integration

```python
from xgboost.spark import SparkXGBClassifier
from pyspark.sql import SparkSession

# Create Spark session
spark = SparkSession.builder \
    .appName("XGBoost") \
    .getOrCreate()

# Load data as Spark DataFrame
df = spark.read.csv("data.csv", header=True, inferSchema=True)

# Split data
train_df, test_df = df.randomSplit([0.8, 0.2], seed=42)

# Train
xgb_spark = SparkXGBClassifier(
    max_depth=6,
    learning_rate=0.1,
    n_estimators=100,
    objective='binary:logistic'
)

model = xgb_spark.fit(train_df)

# Predict
predictions = model.transform(test_df)
predictions.show()
```

### GPU Training

```python
# Single GPU
params = {
    'objective': 'binary:logistic',
    'max_depth': 6,
    'learning_rate': 0.1,
    'tree_method': 'gpu_hist',  # GPU acceleration
    'gpu_id': 0  # GPU device ID
}

model = xgb.train(params, dtrain, num_boost_round=100)

# Multi-GPU (with Dask)
from dask_cuda import LocalCUDACluster

cluster = LocalCUDACluster()
client = Client(cluster)

params = {
    'objective': 'binary:logistic',
    'tree_method': 'gpu_hist'
}

output = dxgb.train(client, params, dtrain, num_boost_round=100)
```

---

## Integration with Scikit-learn

### Scikit-learn API

```python
from xgboost import XGBClassifier, XGBRegressor

# Classification
clf = XGBClassifier(
    max_depth=6,
    learning_rate=0.1,
    n_estimators=100,
    objective='binary:logistic',
    n_jobs=-1,
    random_state=42
)

clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
y_pred_proba = clf.predict_proba(X_test)

# Regression
reg = XGBRegressor(
    max_depth=5,
    learning_rate=0.1,
    n_estimators=200,
    objective='reg:squarederror',
    n_jobs=-1,
    random_state=42
)

reg.fit(X_train, y_train)
y_pred = reg.predict(X_test)
```

### Pipeline Integration

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# Create pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', XGBClassifier(
        max_depth=6,
        learning_rate=0.1,
        n_estimators=100
    ))
])

# Fit and predict
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)

# Save pipeline
import joblib
joblib.dump(pipeline, 'xgb_pipeline.pkl')
```

### Cross-Validation

```python
from sklearn.model_selection import cross_val_score

model = XGBClassifier(max_depth=6, learning_rate=0.1, n_estimators=100)

# Cross-validation scores
scores = cross_val_score(model, X, y, cv=5, scoring='roc_auc')
print(f"ROC-AUC: {scores.mean():.4f} (+/- {scores.std():.4f})")

# Built-in XGBoost CV
cv_results = xgb.cv(
    params,
    dtrain,
    num_boost_round=100,
    nfold=5,
    metrics='auc',
    early_stopping_rounds=10,
    seed=42
)

print(cv_results)
```

---

## Advanced Features

### Custom Objective Function

```python
import numpy as np

# Custom logistic loss
def logistic_obj(preds, dtrain):
    labels = dtrain.get_label()
    preds = 1.0 / (1.0 + np.exp(-preds))  # Sigmoid
    grad = preds - labels
    hess = preds * (1.0 - preds)
    return grad, hess

# Train with custom objective
params = {
    'max_depth': 6,
    'learning_rate': 0.1
}

model = xgb.train(
    params,
    dtrain,
    num_boost_round=100,
    obj=logistic_obj
)
```

### Monotonic Constraints

```python
# Enforce monotonic relationships
# 1: increasing, -1: decreasing, 0: no constraint

params = {
    'objective': 'reg:squarederror',
    'monotone_constraints': '(1,-1,0,1)',  # For 4 features
    'max_depth': 5
}

# Feature 0: increasing (e.g., experience → salary)
# Feature 1: decreasing (e.g., distance → price)
# Feature 2: no constraint
# Feature 3: increasing

model = xgb.train(params, dtrain, num_boost_round=100)
```

### Interaction Constraints

```python
# Restrict which features can interact
# Features 0,1 can interact, features 2,3 can interact

params = {
    'objective': 'binary:logistic',
    'interaction_constraints': '[[0,1],[2,3]]',
    'max_depth': 6
}

model = xgb.train(params, dtrain, num_boost_round=100)
```

### Categorical Features

```python
# XGBoost 1.6+ supports categorical features natively

# Mark categorical features
dtrain = xgb.DMatrix(
    X_train,
    label=y_train,
    feature_types=['c', 'q', 'q', 'c']  # 'c' = categorical, 'q' = quantitative
)

params = {
    'objective': 'binary:logistic',
    'max_depth': 6,
    'enable_categorical': True
}

model = xgb.train(params, dtrain, num_boost_round=100)
```

### Learning to Rank

```python
# Ranking task (e.g., search results)

# Group data (queries)
group_sizes = [10, 15, 20]  # Number of documents per query

dtrain = xgb.DMatrix(X_train, label=y_train)
dtrain.set_group(group_sizes)

params = {
    'objective': 'rank:ndcg',  # or 'rank:pairwise', 'rank:map'
    'max_depth': 6,
    'learning_rate': 0.1
}

model = xgb.train(params, dtrain, num_boost_round=100)
```

---

## Model Deployment

### Save & Load Models

```python
# Save model (JSON format - recommended)
model.save_model('xgboost_model.json')

# Load model
loaded_model = xgb.Booster()
loaded_model.load_model('xgboost_model.json')

# Legacy binary format
model.save_model('xgboost_model.bin')

# With scikit-learn API
import joblib
joblib.dump(clf, 'xgb_classifier.pkl')
loaded_clf = joblib.load('xgb_classifier.pkl')

# Pickle
import pickle
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)
```

### Export to Other Formats

```python
# Export to PMML
# Requires nyoka package
from nyoka import xgboost_to_pmml

xgboost_to_pmml(
    pipeline,
    feature_names,
    target_name='target',
    pmml_file_name='model.pmml'
)

# Export to C code (for embedded systems)
model.dump_model('model.txt', with_stats=True)

# JSON dump (human-readable)
model.dump_model('model.json', dump_format='json')
```

### Online Prediction Service

```python
from flask import Flask, request, jsonify
import xgboost as xgb
import numpy as np

app = Flask(__name__)

# Load model at startup
model = xgb.Booster()
model.load_model('xgboost_model.json')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    
    dmatrix = xgb.DMatrix(features)
    prediction = model.predict(dmatrix)[0]
    
    return jsonify({'prediction': float(prediction)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### Batch Prediction

```python
# Efficient batch prediction
def batch_predict(model, X, batch_size=1000):
    predictions = []
    
    for i in range(0, len(X), batch_size):
        batch = X[i:i+batch_size]
        dmatrix = xgb.DMatrix(batch)
        preds = model.predict(dmatrix)
        predictions.extend(preds)
    
    return np.array(predictions)

# Usage
y_pred = batch_predict(model, X_test, batch_size=1000)
```

---

## XGBoost vs Other Algorithms

### XGBoost vs LightGBM

| Feature | XGBoost | LightGBM |
|---------|---------|----------|
| **Algorithm** | Level-wise growth | Leaf-wise growth |
| **Speed** | Fast | Faster |
| **Memory** | Moderate | Lower |
| **Accuracy** | High | Slightly higher |
| **Categorical** | Limited support | Native support |
| **Large Datasets** | Good | Better |
| **Small Datasets** | Better | Good |

### XGBoost vs Random Forest

| Feature | XGBoost | Random Forest |
|---------|---------|---------------|
| **Type** | Boosting | Bagging |
| **Trees** | Sequential | Parallel |
| **Bias-Variance** | Reduces bias | Reduces variance |
| **Training Time** | Slower | Faster |
| **Accuracy** | Higher | Good |
| **Interpretability** | Moderate | High |
| **Overfitting** | Less prone | More prone |

### XGBoost vs Neural Networks

| Feature | XGBoost | Neural Networks |
|---------|---------|-----------------|
| **Structured Data** | ✅ Excellent | ⚠️ Good |
| **Unstructured Data** | ❌ Limited | ✅ Excellent |
| **Training Time** | Fast | Slow |
| **Tuning** | Easier | Harder |
| **Interpretability** | Better | Worse |
| **Feature Engineering** | Important | Less important |

---

## Best Practices

### 1. Start with Default Parameters

```python
# Baseline model
params = {
    'objective': 'binary:logistic',
    'max_depth': 6,
    'learning_rate': 0.3,
    'n_estimators': 100
}
```

### 2. Use Early Stopping

```python
model = xgb.train(
    params,
    dtrain,
    num_boost_round=1000,
    evals=[(dtrain, 'train'), (dtest, 'test')],
    early_stopping_rounds=50,  # Stop if no improvement
    verbose_eval=False
)
```

### 3. Cross-Validation for Hyperparameter Tuning

```python
# Use CV to find optimal num_boost_round
cv_results = xgb.cv(
    params,
    dtrain,
    num_boost_round=1000,
    nfold=5,
    early_stopping_rounds=50,
    metrics='auc',
    seed=42
)

optimal_rounds = len(cv_results)
```

### 4. Feature Engineering

```python
# Create interaction features
X['feature_interaction'] = X['feature1'] * X['feature2']

# Binning continuous features
X['age_binned'] = pd.cut(X['age'], bins=[0, 18, 35, 50, 100])

# Polynomial features
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)
```

### 5. Handle Missing Values Properly

```python
# XGBoost handles missing values automatically
# But you can also specify missing value indicator

dtrain = xgb.DMatrix(X_train, label=y_train, missing=np.nan)

# Or impute before training
from sklearn.impute import SimpleImputer
imputer = SimpleImputer(strategy='median')
X_imputed = imputer.fit_transform(X)
```

### 6. Monitor Training Progress

```python
# Custom callback
def custom_callback(env):
    if env.iteration % 10 == 0:
        print(f"Iteration {env.iteration}: {env.evaluation_result_list}")

model = xgb.train(
    params,
    dtrain,
    num_boost_round=100,
    callbacks=[custom_callback]
)
```

### 7. Regularization to Prevent Overfitting

```python
params = {
    'objective': 'binary:logistic',
    'max_depth': 5,  # Lower depth
    'min_child_weight': 5,  # Higher min weight
    'gamma': 0.5,  # Min loss reduction
    'subsample': 0.8,  # Row sampling
    'colsample_bytree': 0.8,  # Column sampling
    'lambda': 1.0,  # L2 regularization
    'alpha': 0.1  # L1 regularization
}
```

---

## Real-World Use Cases

### Credit Scoring

```python
import pandas as pd
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, classification_report

# Load credit data
df = pd.read_csv('credit_data.csv')

# Feature engineering
df['debt_to_income'] = df['debt'] / df['income']
df['credit_utilization'] = df['credit_used'] / df['credit_limit']
df['age_at_first_credit'] = df['age'] - df['credit_history_years']

# Prepare data
X = df.drop(['default', 'customer_id'], axis=1)
y = df['default']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# Handle imbalance
scale_pos_weight = (y_train == 0).sum() / (y_train == 1).sum()

# Train model
model = XGBClassifier(
    max_depth=5,
    learning_rate=0.1,
    n_estimators=200,
    scale_pos_weight=scale_pos_weight,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    early_stopping_rounds=20,
    verbose=False
)

# Evaluate
y_pred_proba = model.predict_proba(X_test)[:, 1]
print(f"ROC-AUC: {roc_auc_score(y_test, y_pred_proba):.4f}")

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print(feature_importance.head(10))
```

### Demand Forecasting

```python
from xgboost import XGBRegressor
import pandas as pd

# Load sales data
df = pd.read_csv('sales_data.csv', parse_dates=['date'])

# Time-based features
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek
df['week_of_year'] = df['date'].dt.isocalendar().week
df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)

# Lag features
for lag in [1, 7, 14, 30]:
    df[f'sales_lag_{lag}'] = df['sales'].shift(lag)

# Rolling features
df['sales_rolling_mean_7'] = df['sales'].rolling(7).mean()
df['sales_rolling_std_7'] = df['sales'].rolling(7).std()

# Drop NaN
df = df.dropna()

# Prepare data
features = ['year', 'month', 'day_of_week', 'week_of_year', 'is_weekend',
            'sales_lag_1', 'sales_lag_7', 'sales_lag_14', 'sales_lag_30',
            'sales_rolling_mean_7', 'sales_rolling_std_7']

X = df[features]
y = df['sales']

# Time-based split
split_date = df['date'].quantile(0.8)
train_mask = df['date'] < split_date
X_train, X_test = X[train_mask], X[~train_mask]
y_train, y_test = y[train_mask], y[~train_mask]

# Train
model = XGBRegressor(
    max_depth=6,
    learning_rate=0.1,
    n_estimators=300,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

model.fit(X_train, y_train, eval_set=[(X_test, y_test)], 
          early_stopping_rounds=30, verbose=False)

# Predict
y_pred = model.predict(X_test)

# Evaluate
from sklearn.metrics import mean_absolute_error, mean_squared_error
print(f"MAE: {mean_absolute_error(y_test, y_pred):.2f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.2f}")
```

### Customer Churn Prediction

```python
# Load customer data
df = pd.read_csv('customer_churn.csv')

# Feature engineering
df['tenure_months'] = (pd.to_datetime('2026-01-01') - df['signup_date']).dt.days / 30
df['avg_monthly_spend'] = df['total_spend'] / df['tenure_months']
df['engagement_score'] = (df['logins'] + df['purchases'] * 5) / df['tenure_months']

# Encode categoricals
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['plan_type_encoded'] = le.fit_transform(df['plan_type'])

# Prepare data
X = df[['tenure_months', 'avg_monthly_spend', 'engagement_score', 
        'plan_type_encoded', 'age', 'num_support_tickets']]
y = df['churned']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)

# Train with class weights
model = XGBClassifier(
    max_depth=5,
    learning_rate=0.05,
    n_estimators=300,
    scale_pos_weight=(y_train == 0).sum() / (y_train == 1).sum(),
    random_state=42
)

model.fit(X_train, y_train, eval_set=[(X_test, y_test)], 
          early_stopping_rounds=30, verbose=False)

# Identify high-risk customers
y_pred_proba = model.predict_proba(X_test)[:, 1]
high_risk = X_test[y_pred_proba > 0.7]

print(f"High-risk customers: {len(high_risk)}")
```

---

## Resources

### Official Documentation
- [XGBoost Documentation](https://xgboost.readthedocs.io/)
- [XGBoost Parameters](https://xgboost.readthedocs.io/en/latest/parameter.html)
- [Python API Reference](https://xgboost.readthedocs.io/en/latest/python/index.html)
- [Tutorials](https://xgboost.readthedocs.io/en/latest/tutorials/index.html)

### Papers & Research
- [Original Paper: XGBoost: A Scalable Tree Boosting System](https://arxiv.org/abs/1603.02754) (Chen & Guestrin, 2016)
- [Introduction to Boosted Trees](https://xgboost.readthedocs.io/en/latest/tutorials/model.html)

### Tutorials & Courses
- [Complete Guide to XGBoost](https://machinelearningmastery.com/xgboost-python-mini-course/)
- [Kaggle XGBoost Tutorial](https://www.kaggle.com/learn/intro-to-machine-learning)
- [DataCamp XGBoost Course](https://www.datacamp.com/courses/extreme-gradient-boosting-with-xgboost)

### Tools & Libraries
- [SHAP](https://github.com/slundberg/shap) - Model interpretation
- [Optuna](https://optuna.org/) - Hyperparameter optimization
- [Dask](https://dask.org/) - Distributed computing
- [MLflow](https://mlflow.org/) - ML experiment tracking

### Community
- [GitHub Repository](https://github.com/dmlc/xgboost)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/xgboost)
- [Discuss Forum](https://discuss.xgboost.ai/)
- [Slack Community](https://xgboost.slack.com/)

### Competitions & Benchmarks
- [Kaggle Competitions](https://www.kaggle.com/competitions) - Many winners use XGBoost
- [UCI ML Repository](https://archive.ics.uci.edu/ml/) - Benchmark datasets

### Cheat Sheets
- [XGBoost Parameter Tuning Guide](https://www.analyticsvidhya.com/blog/2016/03/complete-guide-parameter-tuning-xgboost-with-codes-python/)
- [XGBoost vs LightGBM](https://neptune.ai/blog/xgboost-vs-lightgbm)

---

**Last Updated**: January 2026  
**XGBoost Version**: 2.0+

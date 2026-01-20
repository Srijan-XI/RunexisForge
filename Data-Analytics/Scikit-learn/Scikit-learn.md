# Scikit-learn - Machine Learning in Python

## Table of Contents
- [Introduction](#introduction)
- [Why Scikit-learn?](#why-scikit-learn)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Data Preprocessing](#data-preprocessing)
- [Supervised Learning](#supervised-learning)
- [Unsupervised Learning](#unsupervised-learning)
- [Model Selection & Evaluation](#model-selection--evaluation)
- [Pipelines](#pipelines)
- [Feature Engineering](#feature-engineering)
- [Ensemble Methods](#ensemble-methods)
- [Model Persistence](#model-persistence)
- [Integration with Other Libraries](#integration-with-other-libraries)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

Scikit-learn (sklearn) is the most widely-used machine learning library in Python, providing simple and efficient tools for data mining, data analysis, and predictive modeling. Built on NumPy, SciPy, and matplotlib, it offers a consistent API across various machine learning algorithms.

### Key Characteristics

- **Comprehensive**: Classification, regression, clustering, dimensionality reduction
- **Consistent API**: Unified interface across all algorithms
- **Well-Documented**: Extensive documentation and examples
- **Production-Ready**: Robust, tested, and optimized
- **Open Source**: BSD license, active community
- **Interoperable**: Works seamlessly with NumPy, Pandas, Matplotlib

### Scikit-learn Version

- **Current Version**: 1.4+ (January 2026)
- **Python Support**: Python 3.9+
- **Key Dependencies**: NumPy 1.19+, SciPy 1.5+

---

## Why Scikit-learn?

### Benefits

✅ **Easy to Learn**
- Simple, consistent API
- Excellent documentation
- Shallow learning curve
- Pythonic design

✅ **Comprehensive**
- Wide range of algorithms
- Preprocessing utilities
- Model evaluation tools
- Feature selection methods

✅ **Production-Ready**
- Stable and tested
- Optimized performance
- Model serialization
- Integration with production systems

✅ **Community Support**
- Large user base
- Active development
- Extensive tutorials
- Stack Overflow support

### Use Cases

- **Classification**: Email spam detection, image recognition, customer churn
- **Regression**: House price prediction, sales forecasting, demand estimation
- **Clustering**: Customer segmentation, document grouping, anomaly detection
- **Dimensionality Reduction**: Data visualization, feature extraction, noise reduction
- **Model Selection**: Hyperparameter tuning, cross-validation, model comparison
- **Preprocessing**: Feature scaling, encoding, missing value imputation

---

## Installation & Setup

### Installation

```bash
# Via pip
pip install scikit-learn

# With all dependencies
pip install scikit-learn pandas matplotlib seaborn

# Via conda
conda install scikit-learn

# Development version
pip install git+https://github.com/scikit-learn/scikit-learn.git
```

### Verify Installation

```python
import sklearn

print(f"Scikit-learn version: {sklearn.__version__}")

# Check available modules
from sklearn import datasets, model_selection, metrics, preprocessing
print("Import successful!")

# System info
sklearn.show_versions()
```

### Development Environment

```bash
# Create virtual environment
python -m venv sklearn_env
source sklearn_env/bin/activate  # Windows: sklearn_env\Scripts\activate

# Install packages
pip install scikit-learn numpy pandas matplotlib seaborn jupyter
pip install joblib xgboost lightgbm  # Optional extras

# Launch Jupyter
jupyter notebook
```

---

## Core Concepts

### Scikit-learn API Design

All estimators in scikit-learn follow a consistent API:

```python
# 1. Import estimator
from sklearn.linear_model import LogisticRegression

# 2. Instantiate with hyperparameters
model = LogisticRegression(C=1.0, max_iter=100)

# 3. Fit to training data
model.fit(X_train, y_train)

# 4. Make predictions
y_pred = model.predict(X_test)

# 5. Evaluate
score = model.score(X_test, y_test)
```

### Key Methods

```python
# Estimator methods
.fit(X, y)              # Train model
.predict(X)             # Make predictions
.predict_proba(X)       # Probability estimates (classifiers)
.score(X, y)            # Accuracy/R² score
.transform(X)           # Transform data (preprocessors)
.fit_transform(X, y)    # Fit and transform (efficient)
.get_params()           # Get hyperparameters
.set_params(**params)   # Set hyperparameters
```

### Basic Workflow

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# 1. Load data
from sklearn.datasets import load_iris
X, y = load_iris(return_X_y=True)

# 2. Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3. Preprocess
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 4. Train model
model = LogisticRegression(max_iter=200)
model.fit(X_train_scaled, y_train)

# 5. Predict
y_pred = model.predict(X_test_scaled)

# 6. Evaluate
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(classification_report(y_test, y_pred))
```

---

## Data Preprocessing

### Scaling & Normalization

```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler, Normalizer

# StandardScaler: mean=0, std=1
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)

# MinMaxScaler: [0, 1] range
scaler = MinMaxScaler(feature_range=(0, 1))
X_scaled = scaler.fit_transform(X_train)

# RobustScaler: robust to outliers
scaler = RobustScaler()
X_scaled = scaler.fit_transform(X_train)

# Normalizer: L2 norm = 1
normalizer = Normalizer(norm='l2')
X_normalized = normalizer.fit_transform(X_train)
```

### Encoding Categorical Variables

```python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, OrdinalEncoder

# LabelEncoder: categorical → integers
le = LabelEncoder()
y_encoded = le.fit_transform(['cat', 'dog', 'cat', 'bird'])
# Output: [0, 1, 0, 2]

# OneHotEncoder: categorical → binary vectors
from sklearn.preprocessing import OneHotEncoder
import numpy as np

X = np.array([['red'], ['blue'], ['green'], ['red']])
ohe = OneHotEncoder(sparse_output=False)
X_encoded = ohe.fit_transform(X)
# Output: [[0, 1, 0],  # red
#          [1, 0, 0],  # blue
#          [0, 0, 1],  # green
#          [0, 1, 0]]  # red

# OrdinalEncoder: ordered categories
oe = OrdinalEncoder(categories=[['low', 'medium', 'high']])
X_ordinal = oe.fit_transform([['low'], ['high'], ['medium']])
# Output: [[0], [2], [1]]
```

### Handling Missing Values

```python
from sklearn.impute import SimpleImputer, KNNImputer
import numpy as np

# SimpleImputer: mean, median, most_frequent, constant
X = np.array([[1, 2], [np.nan, 3], [7, 6]])

imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)

# KNNImputer: impute using k-nearest neighbors
imputer = KNNImputer(n_neighbors=2)
X_imputed = imputer.fit_transform(X)
```

### Feature Construction

```python
from sklearn.preprocessing import PolynomialFeatures, FunctionTransformer
import numpy as np

# Polynomial features: x₁, x₂ → x₁, x₂, x₁², x₁x₂, x₂²
X = np.array([[1, 2], [3, 4]])
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)
# Output: [[1, 2, 1, 2, 4],
#          [3, 4, 9, 12, 16]]

# Custom transformer
def log_transform(X):
    return np.log1p(X)

transformer = FunctionTransformer(log_transform)
X_log = transformer.fit_transform(X)
```

---

## Supervised Learning

### Classification

#### Logistic Regression

```python
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

# Load data
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train
model = LogisticRegression(
    C=1.0,                # Regularization strength
    penalty='l2',         # L1 or L2 regularization
    solver='lbfgs',       # Optimization algorithm
    max_iter=1000,
    random_state=42
)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)  # Probability estimates

print(f"Accuracy: {model.score(X_test, y_test):.4f}")
```

#### Decision Tree

```python
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt

model = DecisionTreeClassifier(
    criterion='gini',     # or 'entropy'
    max_depth=5,
    min_samples_split=2,
    min_samples_leaf=1,
    random_state=42
)
model.fit(X_train, y_train)

# Visualize tree
plt.figure(figsize=(20, 10))
plot_tree(model, filled=True, feature_names=feature_names, class_names=class_names)
plt.show()

# Feature importance
importances = model.feature_importances_
```

#### Random Forest

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=100,     # Number of trees
    max_depth=10,
    min_samples_split=2,
    max_features='sqrt',  # Features per split
    bootstrap=True,
    n_jobs=-1,            # Parallel processing
    random_state=42
)
model.fit(X_train, y_train)

# Feature importance
importances = pd.DataFrame({
    'feature': feature_names,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)
```

#### Support Vector Machine

```python
from sklearn.svm import SVC

model = SVC(
    C=1.0,                # Regularization
    kernel='rbf',         # 'linear', 'poly', 'rbf', 'sigmoid'
    gamma='scale',        # Kernel coefficient
    probability=True,     # Enable probability estimates
    random_state=42
)
model.fit(X_train, y_train)

# Support vectors
print(f"Number of support vectors: {len(model.support_)}")
```

#### K-Nearest Neighbors

```python
from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier(
    n_neighbors=5,
    weights='distance',   # 'uniform' or 'distance'
    algorithm='auto',     # 'ball_tree', 'kd_tree', 'brute'
    metric='euclidean'
)
model.fit(X_train, y_train)
```

#### Gradient Boosting

```python
from sklearn.ensemble import GradientBoostingClassifier

model = GradientBoostingClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    subsample=0.8,        # Stochastic gradient boosting
    random_state=42
)
model.fit(X_train, y_train)
```

### Regression

#### Linear Regression

```python
from sklearn.linear_model import LinearRegression
from sklearn.datasets import fetch_california_housing

# Load data
X, y = fetch_california_housing(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train
model = LinearRegression()
model.fit(X_train, y_train)

# Coefficients
print(f"Coefficients: {model.coef_}")
print(f"Intercept: {model.intercept_}")

# Predict
y_pred = model.predict(X_test)

# R² score
from sklearn.metrics import r2_score
print(f"R² Score: {r2_score(y_test, y_pred):.4f}")
```

#### Ridge Regression (L2 Regularization)

```python
from sklearn.linear_model import Ridge

model = Ridge(
    alpha=1.0,            # Regularization strength
    solver='auto',
    random_state=42
)
model.fit(X_train, y_train)
```

#### Lasso Regression (L1 Regularization)

```python
from sklearn.linear_model import Lasso

model = Lasso(
    alpha=1.0,
    max_iter=1000,
    random_state=42
)
model.fit(X_train, y_train)

# Feature selection: some coefficients become zero
non_zero_features = np.sum(model.coef_ != 0)
print(f"Non-zero features: {non_zero_features}")
```

#### ElasticNet (L1 + L2)

```python
from sklearn.linear_model import ElasticNet

model = ElasticNet(
    alpha=1.0,
    l1_ratio=0.5,         # 0=Ridge, 1=Lasso
    max_iter=1000,
    random_state=42
)
model.fit(X_train, y_train)
```

#### Random Forest Regressor

```python
from sklearn.ensemble import RandomForestRegressor

model = RandomForestRegressor(
    n_estimators=100,
    max_depth=10,
    n_jobs=-1,
    random_state=42
)
model.fit(X_train, y_train)
```

#### Gradient Boosting Regressor

```python
from sklearn.ensemble import GradientBoostingRegressor

model = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)
model.fit(X_train, y_train)
```

---

## Unsupervised Learning

### Clustering

#### K-Means

```python
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt

# Generate data
X, _ = make_blobs(n_samples=300, centers=4, random_state=42)

# Train
kmeans = KMeans(
    n_clusters=4,
    init='k-means++',     # Initialization method
    n_init=10,            # Number of runs
    max_iter=300,
    random_state=42
)
labels = kmeans.fit_predict(X)

# Results
print(f"Cluster centers:\n{kmeans.cluster_centers_}")
print(f"Inertia: {kmeans.inertia_}")

# Visualize
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis')
plt.scatter(kmeans.cluster_centers_[:, 0], 
           kmeans.cluster_centers_[:, 1], 
           marker='X', s=200, c='red')
plt.show()
```

#### DBSCAN

```python
from sklearn.cluster import DBSCAN

dbscan = DBSCAN(
    eps=0.5,              # Maximum distance between samples
    min_samples=5,        # Minimum samples in neighborhood
    metric='euclidean'
)
labels = dbscan.fit_predict(X)

# -1 indicates noise/outliers
n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
n_noise = list(labels).count(-1)
print(f"Clusters: {n_clusters}, Noise points: {n_noise}")
```

#### Hierarchical Clustering

```python
from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage

# Fit
model = AgglomerativeClustering(
    n_clusters=3,
    linkage='ward'        # 'ward', 'complete', 'average', 'single'
)
labels = model.fit_predict(X)

# Dendrogram
Z = linkage(X, method='ward')
plt.figure(figsize=(10, 5))
dendrogram(Z)
plt.show()
```

### Dimensionality Reduction

#### Principal Component Analysis (PCA)

```python
from sklearn.decomposition import PCA

# Reduce to 2 components
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

print(f"Explained variance ratio: {pca.explained_variance_ratio_}")
print(f"Cumulative explained variance: {np.cumsum(pca.explained_variance_ratio_)}")

# Visualize
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=y, cmap='viridis')
plt.xlabel('First Principal Component')
plt.ylabel('Second Principal Component')
plt.show()

# Determine optimal components
pca_full = PCA()
pca_full.fit(X)
cumsum = np.cumsum(pca_full.explained_variance_ratio_)
n_components = np.argmax(cumsum >= 0.95) + 1  # 95% variance
print(f"Components for 95% variance: {n_components}")
```

#### t-SNE

```python
from sklearn.manifold import TSNE

tsne = TSNE(
    n_components=2,
    perplexity=30,        # Balance local/global structure
    learning_rate=200,
    n_iter=1000,
    random_state=42
)
X_tsne = tsne.fit_transform(X)

plt.scatter(X_tsne[:, 0], X_tsne[:, 1], c=y, cmap='viridis')
plt.show()
```

#### Truncated SVD

```python
from sklearn.decomposition import TruncatedSVD

# Useful for sparse matrices
svd = TruncatedSVD(n_components=50, random_state=42)
X_reduced = svd.fit_transform(X_sparse)

print(f"Explained variance ratio: {svd.explained_variance_ratio_.sum():.4f}")
```

---

## Model Selection & Evaluation

### Train-Test Split

```python
from sklearn.model_selection import train_test_split

# Basic split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=0.2,        # 20% test
    random_state=42,
    stratify=y            # Maintain class distribution
)

# Train-validation-test split
X_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.2)
X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.25)
# Results: 60% train, 20% val, 20% test
```

### Cross-Validation

```python
from sklearn.model_selection import cross_val_score, cross_validate

# K-Fold cross-validation
scores = cross_val_score(
    model, X, y,
    cv=5,                 # 5-fold
    scoring='accuracy'
)
print(f"Accuracy: {scores.mean():.4f} (+/- {scores.std():.4f})")

# Multiple metrics
scoring = ['accuracy', 'precision', 'recall', 'f1']
scores = cross_validate(model, X, y, cv=5, scoring=scoring)
print(f"Accuracy: {scores['test_accuracy'].mean():.4f}")
print(f"F1 Score: {scores['test_f1'].mean():.4f}")

# Stratified K-Fold
from sklearn.model_selection import StratifiedKFold

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
for train_idx, val_idx in skf.split(X, y):
    X_train, X_val = X[train_idx], X[val_idx]
    y_train, y_val = y[train_idx], y[val_idx]
    # Train and evaluate
```

### Hyperparameter Tuning

#### Grid Search

```python
from sklearn.model_selection import GridSearchCV

# Define parameter grid
param_grid = {
    'C': [0.1, 1, 10, 100],
    'kernel': ['linear', 'rbf'],
    'gamma': ['scale', 'auto', 0.001, 0.01]
}

# Grid search
grid_search = GridSearchCV(
    SVC(),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    verbose=1
)
grid_search.fit(X_train, y_train)

# Best parameters
print(f"Best parameters: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.4f}")

# Best model
best_model = grid_search.best_estimator_
```

#### Randomized Search

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import uniform, randint

# Define parameter distributions
param_dist = {
    'n_estimators': randint(50, 500),
    'max_depth': randint(3, 20),
    'min_samples_split': randint(2, 20),
    'min_samples_leaf': randint(1, 10),
    'max_features': ['sqrt', 'log2', None]
}

random_search = RandomizedSearchCV(
    RandomForestClassifier(),
    param_distributions=param_dist,
    n_iter=100,           # Number of combinations to try
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    random_state=42,
    verbose=1
)
random_search.fit(X_train, y_train)

print(f"Best parameters: {random_search.best_params_}")
```

### Classification Metrics

```python
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score, roc_curve
)

# Predictions
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

# Metrics
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(f"Precision: {precision_score(y_test, y_pred, average='weighted'):.4f}")
print(f"Recall: {recall_score(y_test, y_pred, average='weighted'):.4f}")
print(f"F1 Score: {f1_score(y_test, y_pred, average='weighted'):.4f}")

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
print(f"Confusion Matrix:\n{cm}")

# Classification report
print(classification_report(y_test, y_pred))

# ROC-AUC
auc = roc_auc_score(y_test, y_proba)
print(f"ROC-AUC: {auc:.4f}")

# ROC curve
fpr, tpr, thresholds = roc_curve(y_test, y_proba)
plt.plot(fpr, tpr, label=f'AUC = {auc:.4f}')
plt.plot([0, 1], [0, 1], 'k--')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend()
plt.show()
```

### Regression Metrics

```python
from sklearn.metrics import (
    mean_squared_error, mean_absolute_error, 
    r2_score, explained_variance_score
)

y_pred = model.predict(X_test)

# Metrics
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"MSE: {mse:.4f}")
print(f"RMSE: {rmse:.4f}")
print(f"MAE: {mae:.4f}")
print(f"R² Score: {r2:.4f}")

# Residual plot
residuals = y_test - y_pred
plt.scatter(y_pred, residuals)
plt.axhline(y=0, color='r', linestyle='--')
plt.xlabel('Predicted')
plt.ylabel('Residuals')
plt.show()
```

---

## Pipelines

### Basic Pipeline

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# Create pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression())
])

# Fit and predict (automatic chaining)
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)

# Access steps
scaler = pipeline.named_steps['scaler']
classifier = pipeline.named_steps['classifier']
```

### Pipeline with Multiple Transformers

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures

pipeline = Pipeline([
    ('poly', PolynomialFeatures(degree=2)),
    ('scaler', StandardScaler()),
    ('regressor', Ridge(alpha=1.0))
])

pipeline.fit(X_train, y_train)
score = pipeline.score(X_test, y_test)
```

### Column Transformer

```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

# Define column types
numeric_features = ['age', 'income']
categorical_features = ['gender', 'occupation']

# Column transformer
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ])

# Full pipeline
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression())
])

pipeline.fit(X_train, y_train)
```

### Pipeline with Grid Search

```python
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', SVC())
])

param_grid = {
    'classifier__C': [0.1, 1, 10],
    'classifier__kernel': ['linear', 'rbf'],
    'classifier__gamma': ['scale', 'auto']
}

grid_search = GridSearchCV(pipeline, param_grid, cv=5)
grid_search.fit(X_train, y_train)

print(f"Best parameters: {grid_search.best_params_}")
```

---

## Feature Engineering

### Feature Selection

#### Univariate Feature Selection

```python
from sklearn.feature_selection import SelectKBest, f_classif, chi2

# Select top k features
selector = SelectKBest(score_func=f_classif, k=10)
X_selected = selector.fit_transform(X, y)

# Get selected feature indices
selected_features = selector.get_support(indices=True)
print(f"Selected features: {selected_features}")

# Feature scores
scores = selector.scores_
```

#### Recursive Feature Elimination

```python
from sklearn.feature_selection import RFE

estimator = LogisticRegression()
selector = RFE(
    estimator,
    n_features_to_select=10,
    step=1
)
X_selected = selector.fit_transform(X, y)

# Selected features
print(f"Selected features: {selector.support_}")
print(f"Feature ranking: {selector.ranking_}")
```

#### Feature Importance (Tree-based)

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_selection import SelectFromModel

# Train model
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Select features based on importance
selector = SelectFromModel(rf, threshold='median', prefit=True)
X_selected = selector.transform(X_train)

# Feature importances
importances = rf.feature_importances_
indices = np.argsort(importances)[::-1]

plt.figure(figsize=(10, 6))
plt.bar(range(len(importances)), importances[indices])
plt.xlabel('Feature Index')
plt.ylabel('Importance')
plt.show()
```

### Feature Extraction

#### Polynomial Features

```python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(
    degree=2,
    interaction_only=False,
    include_bias=False
)
X_poly = poly.fit_transform(X)

# Feature names
feature_names = poly.get_feature_names_out()
```

#### Text Feature Extraction

```python
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

# Bag of Words
vectorizer = CountVectorizer(
    max_features=1000,
    ngram_range=(1, 2),   # Unigrams and bigrams
    stop_words='english'
)
X_bow = vectorizer.fit_transform(documents)

# TF-IDF
tfidf = TfidfVectorizer(
    max_features=1000,
    ngram_range=(1, 2),
    stop_words='english',
    min_df=2,             # Minimum document frequency
    max_df=0.8            # Maximum document frequency
)
X_tfidf = tfidf.fit_transform(documents)

# Feature names
feature_names = tfidf.get_feature_names_out()
```

---

## Ensemble Methods

### Voting Classifier

```python
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC

# Define base estimators
clf1 = LogisticRegression()
clf2 = DecisionTreeClassifier()
clf3 = SVC(probability=True)

# Voting classifier
voting_clf = VotingClassifier(
    estimators=[('lr', clf1), ('dt', clf2), ('svc', clf3)],
    voting='soft'         # 'hard' (majority) or 'soft' (average probabilities)
)
voting_clf.fit(X_train, y_train)

# Individual vs ensemble performance
for clf in (clf1, clf2, clf3, voting_clf):
    clf.fit(X_train, y_train)
    score = clf.score(X_test, y_test)
    print(f"{clf.__class__.__name__}: {score:.4f}")
```

### Bagging

```python
from sklearn.ensemble import BaggingClassifier

bagging = BaggingClassifier(
    base_estimator=DecisionTreeClassifier(),
    n_estimators=100,
    max_samples=0.8,      # Bootstrap sample size
    max_features=0.8,     # Feature sampling
    bootstrap=True,
    n_jobs=-1,
    random_state=42
)
bagging.fit(X_train, y_train)
```

### AdaBoost

```python
from sklearn.ensemble import AdaBoostClassifier

adaboost = AdaBoostClassifier(
    base_estimator=DecisionTreeClassifier(max_depth=1),
    n_estimators=100,
    learning_rate=1.0,
    random_state=42
)
adaboost.fit(X_train, y_train)

# Feature importance
importances = adaboost.feature_importances_
```

### Stacking

```python
from sklearn.ensemble import StackingClassifier

# Base estimators
estimators = [
    ('rf', RandomForestClassifier(n_estimators=10, random_state=42)),
    ('svc', SVC(probability=True, random_state=42))
]

# Stacking with meta-learner
stacking = StackingClassifier(
    estimators=estimators,
    final_estimator=LogisticRegression(),
    cv=5
)
stacking.fit(X_train, y_train)
```

---

## Model Persistence

### Joblib (Recommended)

```python
import joblib

# Save model
joblib.dump(model, 'model.pkl')

# Load model
loaded_model = joblib.load('model.pkl')

# Predict with loaded model
y_pred = loaded_model.predict(X_test)

# Save pipeline
joblib.dump(pipeline, 'pipeline.pkl')
```

### Pickle

```python
import pickle

# Save
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Load
with open('model.pkl', 'rb') as f:
    loaded_model = pickle.load(f)
```

### Save Multiple Objects

```python
# Save model, scaler, and feature names
artifacts = {
    'model': model,
    'scaler': scaler,
    'feature_names': feature_names
}
joblib.dump(artifacts, 'artifacts.pkl')

# Load
artifacts = joblib.load('artifacts.pkl')
model = artifacts['model']
scaler = artifacts['scaler']
```

---

## Integration with Other Libraries

### Pandas Integration

```python
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# DataFrame input
df = pd.read_csv('data.csv')
X = df[['feature1', 'feature2', 'feature3']]
y = df['target']

# Preprocessing with Pandas
df['encoded'] = LabelEncoder().fit_transform(df['category'])

# Pipeline with DataFrame
from sklearn.compose import make_column_transformer
from sklearn.pipeline import make_pipeline

preprocessor = make_column_transformer(
    (StandardScaler(), ['numeric_col1', 'numeric_col2']),
    (OneHotEncoder(), ['categorical_col']),
    remainder='passthrough'
)

pipeline = make_pipeline(preprocessor, RandomForestClassifier())
pipeline.fit(df, y)
```

### NumPy Integration

```python
import numpy as np

# NumPy array input
X = np.random.randn(100, 10)
y = np.random.randint(0, 2, 100)

# All sklearn models work with NumPy arrays
model.fit(X, y)
```

### Matplotlib/Seaborn Visualization

```python
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix

# Confusion matrix heatmap
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.ylabel('Actual')
plt.xlabel('Predicted')
plt.show()

# Learning curve
from sklearn.model_selection import learning_curve

train_sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, n_jobs=-1, train_sizes=np.linspace(0.1, 1.0, 10)
)

plt.plot(train_sizes, train_scores.mean(axis=1), label='Training score')
plt.plot(train_sizes, val_scores.mean(axis=1), label='Validation score')
plt.xlabel('Training Size')
plt.ylabel('Score')
plt.legend()
plt.show()
```

---

## Best Practices

### 1. Always Scale Features

```python
# Bad: Different scale features
model.fit(X_train, y_train)

# Good: Scaled features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
model.fit(X_train_scaled, y_train)
```

### 2. Use Pipelines

```python
# Prevents data leakage
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA(n_components=10)),
    ('classifier', LogisticRegression())
])
pipeline.fit(X_train, y_train)
```

### 3. Cross-Validation for Model Selection

```python
# Don't rely on single train-test split
scores = cross_val_score(model, X, y, cv=5)
print(f"Mean accuracy: {scores.mean():.4f} (+/- {scores.std():.4f})")
```

### 4. Handle Imbalanced Data

```python
from sklearn.utils.class_weight import compute_class_weight

# Compute class weights
class_weights = compute_class_weight(
    class_weight='balanced',
    classes=np.unique(y_train),
    y=y_train
)
class_weight_dict = dict(enumerate(class_weights))

# Use in model
model = LogisticRegression(class_weight='balanced')
# or
model = RandomForestClassifier(class_weight=class_weight_dict)
```

### 5. Feature Selection Before Training

```python
# Remove low-variance features
from sklearn.feature_selection import VarianceThreshold

selector = VarianceThreshold(threshold=0.01)
X_high_variance = selector.fit_transform(X)
```

### 6. Random State for Reproducibility

```python
# Always set random_state
train_test_split(X, y, test_size=0.2, random_state=42)
RandomForestClassifier(random_state=42)
KMeans(n_clusters=3, random_state=42)
```

### 7. Monitor Training with Callbacks

```python
# Early stopping (custom implementation)
from sklearn.base import BaseEstimator

class EarlyStoppingClassifier(BaseEstimator):
    def __init__(self, base_estimator, patience=5):
        self.base_estimator = base_estimator
        self.patience = patience
    
    def fit(self, X, y, X_val=None, y_val=None):
        # Implement early stopping logic
        pass
```

---

## Real-World Examples

### Customer Churn Prediction

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

# Load data
df = pd.read_csv('customer_data.csv')

# Feature engineering
df['tenure_years'] = df['tenure_months'] / 12
df['avg_monthly_charges'] = df['total_charges'] / df['tenure_months']

# Encode categorical
le = LabelEncoder()
df['contract_encoded'] = le.fit_transform(df['contract_type'])

# Prepare data
X = df[['tenure_years', 'monthly_charges', 'avg_monthly_charges', 'contract_encoded']]
y = df['churn']

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# Pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(
        n_estimators=100,
        class_weight='balanced',
        random_state=42
    ))
])

# Train
pipeline.fit(X_train, y_train)

# Evaluate
y_pred = pipeline.predict(X_test)
y_proba = pipeline.predict_proba(X_test)[:, 1]

print(classification_report(y_test, y_pred))
print(f"ROC-AUC: {roc_auc_score(y_test, y_proba):.4f}")
```

### House Price Prediction

```python
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import PolynomialFeatures

# Load data
df = pd.read_csv('house_prices.csv')

# Feature engineering
df['age'] = 2026 - df['year_built']
df['price_per_sqft'] = df['price'] / df['sqft']

# Select features
X = df[['sqft', 'bedrooms', 'bathrooms', 'age', 'location_score']]
y = df['price']

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Pipeline
pipeline = Pipeline([
    ('poly', PolynomialFeatures(degree=2)),
    ('scaler', StandardScaler()),
    ('regressor', GradientBoostingRegressor(
        n_estimators=100,
        learning_rate=0.1,
        max_depth=3,
        random_state=42
    ))
])

# Train
pipeline.fit(X_train, y_train)

# Evaluate
y_pred = pipeline.predict(X_test)
print(f"R² Score: {r2_score(y_test, y_pred):.4f}")
print(f"RMSE: ${np.sqrt(mean_squared_error(y_test, y_pred)):,.2f}")
```

### Customer Segmentation

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# Load data
df = pd.read_csv('customer_behavior.csv')

# Features
X = df[['purchase_frequency', 'avg_order_value', 'lifetime_value', 'recency']]

# Scale
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Determine optimal clusters (Elbow method)
inertias = []
for k in range(2, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X_scaled)
    inertias.append(kmeans.inertia_)

plt.plot(range(2, 11), inertias, marker='o')
plt.xlabel('Number of Clusters')
plt.ylabel('Inertia')
plt.show()

# Fit final model
kmeans = KMeans(n_clusters=4, random_state=42)
df['cluster'] = kmeans.fit_predict(X_scaled)

# Visualize with PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

plt.scatter(X_pca[:, 0], X_pca[:, 1], c=df['cluster'], cmap='viridis')
plt.xlabel('First Principal Component')
plt.ylabel('Second Principal Component')
plt.show()

# Cluster profiles
cluster_profiles = df.groupby('cluster').mean()
print(cluster_profiles)
```

---

## Resources

### Official Documentation
- [Scikit-learn Official Docs](https://scikit-learn.org/stable/)
- [User Guide](https://scikit-learn.org/stable/user_guide.html)
- [API Reference](https://scikit-learn.org/stable/modules/classes.html)
- [Examples Gallery](https://scikit-learn.org/stable/auto_examples/index.html)

### Books
- *Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow* by Aurélien Géron
- *Python Machine Learning* by Sebastian Raschka
- *Introduction to Machine Learning with Python* by Andreas Müller & Sarah Guido

### Tutorials
- [Official Tutorials](https://scikit-learn.org/stable/tutorial/index.html)
- [Machine Learning Mastery](https://machinelearningmastery.com/)
- [Kaggle Learn](https://www.kaggle.com/learn)
- [DataCamp Scikit-learn Courses](https://www.datacamp.com/)

### Tools & Extensions
- [Scikit-optimize](https://scikit-optimize.github.io/) - Hyperparameter optimization
- [Imbalanced-learn](https://imbalanced-learn.org/) - Handle imbalanced datasets
- [Category Encoders](https://contrib.scikit-learn.org/category_encoders/) - Advanced encoding
- [SHAP](https://github.com/slundberg/shap) - Model interpretability

### Community
- [GitHub Repository](https://github.com/scikit-learn/scikit-learn)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/scikit-learn)
- [Gitter Chat](https://gitter.im/scikit-learn/scikit-learn)
- [Mailing List](https://mail.python.org/mailman/listinfo/scikit-learn)

### Cheat Sheets
- [Scikit-learn Algorithm Cheat Sheet](https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html)
- [DataCamp Cheat Sheet](https://www.datacamp.com/cheat-sheet/scikit-learn-cheat-sheet-python-machine-learning)

---

**Last Updated**: January 2026  
**Scikit-learn Version**: 1.4+

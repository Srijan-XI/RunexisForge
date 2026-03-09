# Streamlit

## Introduction

## What is Streamlit?

Streamlit is a Python framework for building data apps quickly. You write Python scripts and Streamlit turns them into interactive web apps.

## Why Streamlit?

- Very fast to prototype dashboards and tools
- Great for data exploration (charts, tables)
- Simple deployment story (local, cloud, containers)

## Common use cases

- Internal dashboards
- Data science demos
- Lightweight admin/analytics tools

## Learning Path

1. Install Streamlit and run the hello app.
2. Learn basic widgets (slider, selectbox, text input).
3. Learn state (`st.session_state`).
4. Add charts and file uploads.

## User Guide

## Install

```
python -m pip install --upgrade pip
pip install streamlit
```

Verify:

```
streamlit --version
```

## Run an app

```
streamlit run app.py
```

## Basic UI

```python
import streamlit as st

st.title("Hello Streamlit")
name = st.text_input("Your name")
if name:
    st.write(f"Hello, {name}!")
```

## State

Use `st.session_state` to keep values between reruns.

## Files

`st.file_uploader` lets you upload files (CSV, images).

See `Streamlit/examples/app.py` for a runnable starter.

---

## Advanced Topics

### Multi-Page Apps

Streamlit supports multi-page applications out of the box:

```
your_app/
├── pages/
│   ├── 1_📊_Data_Analysis.py
│   ├── 2_🗺️_Map_View.py
│   └── 3_⚙️_Settings.py
└── Home.py
```

Each file in the `pages/` directory automatically becomes a page.

### Session State Management

Use `st.session_state` to persist data across reruns:

```python
import streamlit as st

# Initialize state
if 'counter' not in st.session_state:
    st.session_state.counter = 0

# Update state
if st.button('Increment'):
    st.session_state.counter += 1

st.write(f'Counter: {st.session_state.counter}')
```

### Caching for Performance

Cache expensive computations to improve performance:

```python
import streamlit as st
import pandas as pd

@st.cache_data  # Cache data (DataFrames, arrays, etc.)
def load_data():
    return pd.read_csv('large_dataset.csv')

@st.cache_resource  # Cache resources (ML models, database connections)
def load_model():
    return load_ml_model()

df = load_data()
model = load_model()
```

### Custom Components

Build custom components using React:

```python
import streamlit.components.v1 as components

# Use existing component
components.iframe("https://example.com")

# Create custom component
my_component = components.declare_component(
    "my_component",
    path="frontend/build"
)
```

---

## Real-World Use Cases

### 1. Data Science Dashboard

```python
import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="Sales Dashboard", layout="wide")

# Load data
@st.cache_data
def load_sales_data():
    return pd.read_csv('sales.csv', parse_dates=['date'])

df = load_sales_data()

# Sidebar filters
st.sidebar.header("Filters")
date_range = st.sidebar.date_input(
    "Date Range",
    value=(df['date'].min(), df['date'].max())
)
regions = st.sidebar.multiselect(
    "Regions",
    options=df['region'].unique(),
    default=df['region'].unique()
)

# Filter data
mask = (df['date'].dt.date >= date_range[0]) & \
       (df['date'].dt.date <= date_range[1]) & \
       (df['region'].isin(regions))
filtered_df = df[mask]

# Metrics
col1, col2, col3, col4 = st.columns(4)
col1.metric("Total Revenue", f"${filtered_df['revenue'].sum():,.0f}")
col2.metric("Total Orders", f"{len(filtered_df):,}")
col3.metric("Avg Order Value", f"${filtered_df['revenue'].mean():.2f}")
col4.metric("Unique Customers", f"{filtered_df['customer_id'].nunique():,}")

# Charts
fig1 = px.line(filtered_df.groupby('date')['revenue'].sum().reset_index(),
               x='date', y='revenue', title='Revenue Over Time')
st.plotly_chart(fig1, use_container_width=True)

fig2 = px.bar(filtered_df.groupby('region')['revenue'].sum().reset_index(),
              x='region', y='revenue', title='Revenue by Region')
st.plotly_chart(fig2, use_container_width=True)
```

### 2. Machine Learning Model Demo

```python
import streamlit as st
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

st.title("🤖 ML Model Trainer")

# Upload dataset
uploaded_file = st.file_uploader("Upload CSV", type="csv")
if uploaded_file:
    df = pd.read_csv(uploaded_file)
    st.write("Dataset Preview:", df.head())
    
    # Select features and target
    feature_cols = st.multiselect("Select Features", df.columns)
    target_col = st.selectbox("Select Target", df.columns)
    
    if feature_cols and target_col:
        X = df[feature_cols]
        y = df[target_col]
        
        # Model parameters
        st.sidebar.header("Model Parameters")
        n_estimators = st.sidebar.slider("Number of Trees", 10, 200, 100)
        max_depth = st.sidebar.slider("Max Depth", 1, 20, 5)
        
        if st.button("Train Model"):
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42
            )
            
            with st.spinner("Training model..."):
                model = RandomForestClassifier(
                    n_estimators=n_estimators,
                    max_depth=max_depth
                )
                model.fit(X_train, y_train)
                score = model.score(X_test, y_test)
            
            st.success(f"Model trained! Accuracy: {score:.2%}")
            st.session_state.model = model
```

### 3. Real-Time Data Monitor

```python
import streamlit as st
import time
import random
import pandas as pd
import plotly.graph_objects as go

st.title("📡 Real-Time Server Monitor")

# Placeholder for charts
chart_placeholder = st.empty()
metrics_placeholder = st.empty()

# Simulate real-time data
if 'data' not in st.session_state:
    st.session_state.data = pd.DataFrame(columns=['timestamp', 'cpu', 'memory'])

# Auto-refresh
if st.checkbox("Auto Refresh", value=True):
    while True:
        # Simulate new data
        new_data = {
            'timestamp': pd.Timestamp.now(),
            'cpu': random.uniform(20, 80),
            'memory': random.uniform(30, 70)
        }
        st.session_state.data = pd.concat([
            st.session_state.data,
            pd.DataFrame([new_data])
        ]).tail(50)
        
        # Update metrics
        with metrics_placeholder.container():
            col1, col2 = st.columns(2)
            col1.metric("CPU Usage", f"{new_data['cpu']:.1f}%")
            col2.metric("Memory Usage", f"{new_data['memory']:.1f}%")
        
        # Update chart
        fig = go.Figure()
        fig.add_trace(go.Scatter(
            x=st.session_state.data['timestamp'],
            y=st.session_state.data['cpu'],
            name='CPU'
        ))
        fig.add_trace(go.Scatter(
            x=st.session_state.data['timestamp'],
            y=st.session_state.data['memory'],
            name='Memory'
        ))
        chart_placeholder.plotly_chart(fig, use_container_width=True)
        
        time.sleep(2)
```

---

## Deployment Options

### 1. Streamlit Cloud (Recommended)

```bash
# Push to GitHub, then deploy at streamlit.io/cloud
# Free tier: unlimited public apps
```

### 2. Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8501
CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

### 3. Heroku

```bash
# Create Procfile
echo "web: streamlit run app.py --server.port=$PORT" > Procfile

# Deploy
heroku create my-streamlit-app
git push heroku main
```

### 4. AWS EC2

```bash
# Install on EC2
sudo apt update
sudo apt install python3-pip
pip3 install streamlit

# Run as service (systemd)
sudo nano /etc/systemd/system/streamlit.service
```

---

## Best Practices

### 1. Project Structure

```
my_app/
├── .streamlit/
│   └── config.toml
├── pages/
│   ├── 1_Dashboard.py
│   └── 2_Settings.py
├── data/
├── models/
├── utils/
│   ├── data_loader.py
│   └── plotting.py
├── app.py
├── requirements.txt
└── README.md
```

### 2. Configuration

Create `.streamlit/config.toml`:

```toml
[theme]
primaryColor = "#FF4B4B"
backgroundColor = "#0E1117"
secondaryBackgroundColor = "#262730"
textColor = "#FAFAFA"

[server]
maxUploadSize = 200
enableCORS = false
```

### 3. Performance Tips

- Use `@st.cache_data` for data loading
- Use `@st.cache_resource` for ML models
- Limit dataframe sizes displayed
- Use `st.spinner()` for long operations
- Implement pagination for large datasets

### 4. Security

```python
import streamlit as st

# Use secrets management
api_key = st.secrets["api_key"]

# Add authentication
def check_password():
    def password_entered():
        if st.session_state["password"] == st.secrets["password"]:
            st.session_state["password_correct"] = True
            del st.session_state["password"]
        else:
            st.session_state["password_correct"] = False

    if "password_correct" not in st.session_state:
        st.text_input("Password", type="password", 
                      on_change=password_entered, key="password")
        return False
    elif not st.session_state["password_correct"]:
        st.text_input("Password", type="password",
                      on_change=password_entered, key="password")
        st.error("😕 Password incorrect")
        return False
    else:
        return True

if check_password():
    st.write("Your app content here")
```

---

## Integration Examples

### Database Integration

```python
import streamlit as st
import psycopg2
import pandas as pd

@st.cache_resource
def get_connection():
    return psycopg2.connect(
        host=st.secrets["db_host"],
        database=st.secrets["db_name"],
        user=st.secrets["db_user"],
        password=st.secrets["db_password"]
    )

conn = get_connection()

@st.cache_data(ttl=600)
def run_query(query):
    with conn.cursor() as cur:
        cur.execute(query)
        return cur.fetchall()

# Use in app
data = run_query("SELECT * FROM sales LIMIT 100")
df = pd.DataFrame(data)
st.dataframe(df)
```

### API Integration

```python
import streamlit as st
import requests

@st.cache_data(ttl=3600)
def fetch_api_data(endpoint):
    response = requests.get(
        f"https://api.example.com/{endpoint}",
        headers={"Authorization": f"Bearer {st.secrets['api_token']}"}
    )
    return response.json()

data = fetch_api_data("users")
st.json(data)
```

---

## Case Studies

### Case Study 1: Uber's Streamlit Apps

Uber uses Streamlit for internal ML model demos and data exploration tools. Teams can quickly build dashboards to visualize model predictions and share insights across the organization.

**Key Features:**
- Model performance monitoring
- A/B test analysis
- Geospatial visualizations
- Real-time metrics

### Case Study 2: Healthcare Analytics

A hospital system built a Streamlit app to track patient outcomes and resource utilization.

**Results:**
- 80% reduction in dashboard development time
- Real-time bed availability tracking
- Predictive analytics for patient admissions
- Staff scheduling optimization

### Case Study 3: Financial Risk Dashboard

A fintech startup created a risk monitoring dashboard using Streamlit.

**Features:**
- Portfolio risk analysis
- Real-time market data integration
- Monte Carlo simulations
- Regulatory compliance reporting

---

## Advanced Patterns

### Form Handling

```python
import streamlit as st

with st.form("my_form"):
    name = st.text_input("Name")
    age = st.number_input("Age", min_value=0, max_value=120)
    submitted = st.form_submit_button("Submit")
    
    if submitted:
        st.write(f"Hello {name}, age {age}")
```

### Dynamic UI

```python
import streamlit as st

num_inputs = st.number_input("How many inputs?", 1, 10, 3)

values = []
for i in range(int(num_inputs)):
    value = st.text_input(f"Input {i+1}", key=f"input_{i}")
    values.append(value)

st.write("Values:", values)
```

### Data Editing

```python
import streamlit as st
import pandas as pd

df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['NYC', 'LA', 'SF']
})

edited_df = st.data_editor(df, num_rows="dynamic")
st.write("Modified data:", edited_df)
```

---

## Resources

- [Official Documentation](https://docs.streamlit.io)
- [Streamlit Gallery](https://streamlit.io/gallery)
- [Streamlit Forum](https://discuss.streamlit.io)
- [Awesome Streamlit](https://github.com/MarcSkovMadsen/awesome-streamlit)
- [30 Days of Streamlit](https://30days.streamlit.app)
- [Streamlit Components](https://streamlit.io/components)


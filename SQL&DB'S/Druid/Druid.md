# Apache Druid

## Introduction

Apache Druid is a high-performance, real-time analytics database designed for fast slice-and-dice analytics on large datasets. It combines the best features of data warehouses, timeseries databases, and search systems to deliver sub-second queries on streaming and batch data.

### What is Apache Druid?

Apache Druid is a column-oriented, distributed data store designed for OLAP (Online Analytical Processing) queries on event-driven data. It's particularly well-suited for powering user-facing analytical applications that require real-time data ingestion and fast query performance.

### Key Features

- **Real-time Ingestion**: Streaming data ingestion with immediate query availability
- **Sub-second Queries**: Fast aggregation and filtering on billions of rows
- **Columnar Storage**: Efficient compression and query performance
- **Flexible Schema**: Semi-structured data support with nested columns
- **Time-based Partitioning**: Automatic data partitioning by time
- **Approximate Algorithms**: HyperLogLog, Theta sketches for fast cardinality
- **SQL Support**: Standard SQL with extensions for analytics
- **Scalability**: Horizontally scalable to petabytes
- **High Availability**: No single point of failure
- **Cloud-native**: Runs on Kubernetes, cloud platforms

### Use Cases

- **Real-time Analytics Dashboards**: User-facing analytics applications
- **Business Intelligence**: Interactive data exploration
- **Application Performance Monitoring**: APM and observability platforms
- **Network Traffic Analysis**: Security and network monitoring
- **Clickstream Analytics**: User behavior analysis
- **IoT Data Analysis**: Sensor data and telemetry
- **Financial Analytics**: Trading analytics and risk analysis
- **Ad Tech**: Real-time bidding and campaign analytics

### Druid vs Other Databases

| Feature | Druid | ClickHouse | TimescaleDB | Elasticsearch |
|---------|-------|------------|-------------|---------------|
| **Real-time Ingestion** | Excellent | Good | Good | Excellent |
| **Query Speed** | Sub-second | Sub-second | Seconds | Good |
| **Time-series** | Optimized | Good | Optimized | Limited |
| **SQL Support** | Yes | Yes | Full PostgreSQL | Limited |
| **Streaming** | Native | Limited | Limited | Good |
| **Scalability** | Horizontal | Horizontal | Vertical+ | Horizontal |

### Architecture Overview

**Druid Process Types:**

**Master Processes:**
- **Coordinator**: Manages data availability and replication
- **Overlord**: Controls data ingestion workloads

**Data Processes:**
- **Historical**: Stores and serves queryable data segments
- **MiddleManager**: Ingests new data and creates segments

**Query Processes:**
- **Broker**: Routes queries and merges results
- **Router**: Optional query routing tier

**External Dependencies:**
- **Deep Storage**: S3, HDFS, or other object storage for segment storage
- **Metadata Store**: PostgreSQL or MySQL for metadata
- **ZooKeeper**: Service discovery and coordination

---

## Installation & Setup

### Prerequisites

- Java 8 or 11 (OpenJDK recommended)
- Minimum 4GB RAM (16GB+ for production)
- 10GB+ disk space
- Linux, macOS, or Windows (WSL recommended)
- PostgreSQL or MySQL (for metadata)
- Optional: ZooKeeper, Kafka for streaming

### Installation Methods

#### Method 1: Quick Start (Single Machine)

```bash
# Download Druid
wget https://dlcdn.apache.org/druid/28.0.0/apache-druid-28.0.0-bin.tar.gz

# Extract
tar -xzf apache-druid-28.0.0-bin.tar.gz
cd apache-druid-28.0.0

# Start Druid with included ZooKeeper and Derby metadata store
./bin/start-micro-quickstart
```

**Access Druid Console:**
```
http://localhost:8888
```

#### Method 2: Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: druid
      POSTGRES_USER: druid
      POSTGRES_DB: druid
    volumes:
      - postgres_data:/var/lib/postgresql/data

  zookeeper:
    image: zookeeper:3.8
    environment:
      ZOO_MY_ID: 1
    volumes:
      - zookeeper_data:/data

  coordinator:
    image: apache/druid:28.0.0
    container_name: druid-coordinator
    environment:
      - DRUID_SERVICE=coordinator
      - DRUID_METADATA_STORAGE_TYPE=postgresql
      - DRUID_METADATA_STORAGE_CONNECTOR_CONNECTURI=jdbc:postgresql://postgres:5432/druid
      - DRUID_METADATA_STORAGE_CONNECTOR_USER=druid
      - DRUID_METADATA_STORAGE_CONNECTOR_PASSWORD=druid
      - DRUID_ZK_SERVICE_HOST=zookeeper
    ports:
      - "8081:8081"
    depends_on:
      - postgres
      - zookeeper

  broker:
    image: apache/druid:28.0.0
    container_name: druid-broker
    environment:
      - DRUID_SERVICE=broker
      - DRUID_ZK_SERVICE_HOST=zookeeper
    ports:
      - "8082:8082"
    depends_on:
      - zookeeper

  historical:
    image: apache/druid:28.0.0
    container_name: druid-historical
    environment:
      - DRUID_SERVICE=historical
      - DRUID_ZK_SERVICE_HOST=zookeeper
    ports:
      - "8083:8083"
    volumes:
      - historical_data:/opt/druid/var
    depends_on:
      - zookeeper

  middlemanager:
    image: apache/druid:28.0.0
    container_name: druid-middlemanager
    environment:
      - DRUID_SERVICE=middleManager
      - DRUID_ZK_SERVICE_HOST=zookeeper
    ports:
      - "8091:8091"
    volumes:
      - middlemanager_data:/opt/druid/var
    depends_on:
      - zookeeper

  router:
    image: apache/druid:28.0.0
    container_name: druid-router
    environment:
      - DRUID_SERVICE=router
      - DRUID_ZK_SERVICE_HOST=zookeeper
    ports:
      - "8888:8888"
    depends_on:
      - coordinator
      - broker

volumes:
  postgres_data:
  zookeeper_data:
  historical_data:
  middlemanager_data:
```

```bash
# Start services
docker-compose up -d

# Check logs
docker-compose logs -f
```

#### Method 3: Kubernetes (Helm)

```bash
# Add Druid Helm repository
helm repo add druid https://apache.github.io/druid/helm
helm repo update

# Install Druid
helm install druid druid/druid \
  --set zookeeper.enabled=true \
  --set mysql.enabled=true \
  --set broker.replicas=2 \
  --set historical.replicas=2

# Custom values
cat > values.yaml <<EOF
image:
  repository: apache/druid
  tag: 28.0.0

broker:
  replicas: 2
  resources:
    requests:
      memory: 4Gi
      cpu: 2

historical:
  replicas: 3
  resources:
    requests:
      memory: 8Gi
      cpu: 4
  persistence:
    enabled: true
    size: 100Gi

coordinator:
  replicas: 1

middleManager:
  replicas: 2

router:
  replicas: 1
EOF

helm install druid druid/druid -f values.yaml
```

#### Method 4: Manual Installation

```bash
# Install Java
sudo apt-get install openjdk-11-jdk

# Download and extract Druid
wget https://dlcdn.apache.org/druid/28.0.0/apache-druid-28.0.0-bin.tar.gz
tar -xzf apache-druid-28.0.0-bin.tar.gz
cd apache-druid-28.0.0

# Configure common properties
cat > conf/druid/cluster/_common/common.runtime.properties <<EOF
druid.extensions.loadList=["druid-kafka-indexing-service", "druid-datasketches", "postgresql-metadata-storage"]

druid.metadata.storage.type=postgresql
druid.metadata.storage.connector.connectURI=jdbc:postgresql://localhost:5432/druid
druid.metadata.storage.connector.user=druid
druid.metadata.storage.connector.password=druid

druid.storage.type=local
druid.storage.storageDirectory=/var/druid/segments

druid.indexer.logs.type=file
druid.indexer.logs.directory=/var/druid/indexing-logs

druid.zk.service.host=localhost
druid.zk.paths.base=/druid
EOF

# Start individual services
./bin/start-cluster-master-no-zk-server
./bin/start-cluster-data-server
./bin/start-cluster-query-server
```

### Client Installation

**Python:**
```bash
pip install pydruid
```

**Java:**
```xml
<dependency>
    <groupId>org.apache.druid</groupId>
    <artifactId>druid-sql</artifactId>
    <version>28.0.0</version>
</dependency>
```

**JavaScript:**
```bash
npm install druid-query
```

### Verify Installation

```bash
# Check Druid console
curl http://localhost:8888

# Check coordinator status
curl http://localhost:8081/status

# Check broker status
curl http://localhost:8082/status

# List datasources
curl http://localhost:8081/druid/coordinator/v1/datasources
```

---

## User Guide

### Getting Started

#### 1. Load Sample Data

**Via Web Console:**
1. Navigate to http://localhost:8888
2. Click "Load data" → "Batch - classic"
3. Use sample data:

```json
{
  "type": "index_parallel",
  "spec": {
    "dataSchema": {
      "dataSource": "wikipedia",
      "timestampSpec": {
        "column": "timestamp",
        "format": "iso"
      },
      "dimensionsSpec": {
        "dimensions": [
          "channel",
          "cityName",
          "comment",
          "countryName",
          "user"
        ]
      },
      "metricsSpec": [
        { "type": "count", "name": "count" },
        { "type": "longSum", "name": "added", "fieldName": "added" },
        { "type": "longSum", "name": "deleted", "fieldName": "deleted" }
      ],
      "granularitySpec": {
        "type": "uniform",
        "segmentGranularity": "day",
        "queryGranularity": "hour"
      }
    },
    "ioConfig": {
      "type": "index_parallel",
      "inputSource": {
        "type": "http",
        "uris": ["https://druid.apache.org/data/wikipedia.json.gz"]
      },
      "inputFormat": {
        "type": "json"
      }
    },
    "tuningConfig": {
      "type": "index_parallel",
      "partitionsSpec": {
        "type": "dynamic"
      }
    }
  }
}
```

#### 2. Query Data with SQL

**Python:**
```python
from pydruid.db import connect

# Connect to Druid
conn = connect(host='localhost', port=8082, path='/druid/v2/sql/', scheme='http')
cursor = conn.cursor()

# Execute SQL query
cursor.execute("""
    SELECT
        TIME_FLOOR(__time, 'PT1H') AS hour,
        channel,
        COUNT(*) AS edit_count,
        SUM(added) AS total_added
    FROM wikipedia
    WHERE __time >= TIMESTAMP '2015-09-12 00:00:00'
    GROUP BY 1, 2
    ORDER BY 1 DESC
    LIMIT 10
""")

# Fetch results
for row in cursor:
    print(row)
```

**cURL:**
```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "SELECT channel, COUNT(*) as count FROM wikipedia GROUP BY channel ORDER BY count DESC LIMIT 10"
  }' \
  http://localhost:8082/druid/v2/sql
```

**JavaScript:**
```javascript
const axios = require('axios');

async function queryDruid() {
  const response = await axios.post('http://localhost:8082/druid/v2/sql', {
    query: `
      SELECT channel, COUNT(*) as count
      FROM wikipedia
      GROUP BY channel
      ORDER BY count DESC
      LIMIT 10
    `
  });
  
  console.log(response.data);
}
```

#### 3. Stream Data from Kafka

**Kafka Supervisor Spec:**
```json
{
  "type": "kafka",
  "spec": {
    "dataSchema": {
      "dataSource": "events",
      "timestampSpec": {
        "column": "timestamp",
        "format": "auto"
      },
      "dimensionsSpec": {
        "dimensions": [
          "user_id",
          "event_type",
          "platform",
          "country"
        ]
      },
      "metricsSpec": [
        { "type": "count", "name": "count" },
        { "type": "doubleSum", "name": "revenue", "fieldName": "amount" }
      ],
      "granularitySpec": {
        "type": "uniform",
        "segmentGranularity": "hour",
        "queryGranularity": "minute",
        "rollup": true
      }
    },
    "ioConfig": {
      "topic": "events",
      "inputFormat": {
        "type": "json"
      },
      "consumerProperties": {
        "bootstrap.servers": "localhost:9092"
      },
      "taskCount": 2,
      "replicas": 1,
      "taskDuration": "PT1H"
    },
    "tuningConfig": {
      "type": "kafka",
      "maxRowsInMemory": 100000,
      "maxRowsPerSegment": 5000000
    }
  }
}
```

**Submit Supervisor:**
```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d @kafka-supervisor.json \
  http://localhost:8081/druid/indexer/v1/supervisor
```

### Advanced Queries

#### Aggregations

```sql
-- Multiple aggregations
SELECT
  TIME_FLOOR(__time, 'PT1H') AS hour,
  channel,
  COUNT(*) AS events,
  SUM(added) AS total_added,
  AVG(delta) AS avg_delta,
  MIN(added) AS min_added,
  MAX(added) AS max_added
FROM wikipedia
WHERE __time >= CURRENT_TIMESTAMP - INTERVAL '24' HOUR
GROUP BY 1, 2
```

#### Window Functions

```sql
-- Ranking with window functions
SELECT
  channel,
  user,
  COUNT(*) AS edit_count,
  ROW_NUMBER() OVER (PARTITION BY channel ORDER BY COUNT(*) DESC) AS rank
FROM wikipedia
GROUP BY channel, user
LIMIT 100
```

#### Approximate Algorithms

```sql
-- HyperLogLog for approximate distinct count
SELECT
  TIME_FLOOR(__time, 'PT1H') AS hour,
  APPROX_COUNT_DISTINCT_DS_HLL(user) AS unique_users,
  COUNT(*) AS total_events
FROM wikipedia
GROUP BY 1
```

#### Filtering

```sql
-- Complex filtering
SELECT
  channel,
  COUNT(*) AS count
FROM wikipedia
WHERE
  __time >= TIMESTAMP '2015-09-12'
  AND __time < TIMESTAMP '2015-09-13'
  AND (channel = '#en.wikipedia' OR channel = '#de.wikipedia')
  AND added > 0
GROUP BY channel
```

#### Joins

```sql
-- Join datasources
SELECT
  w.channel,
  u.country,
  COUNT(*) AS events
FROM wikipedia AS w
INNER JOIN users AS u ON w.user = u.username
WHERE w.__time >= CURRENT_TIMESTAMP - INTERVAL '1' DAY
GROUP BY 1, 2
```

### Data Management

#### Compaction

```json
{
  "type": "compact",
  "dataSource": "wikipedia",
  "interval": "2015-09-12/2015-09-13",
  "tuningConfig": {
    "type": "index_parallel",
    "maxRowsPerSegment": 5000000,
    "maxRowsInMemory": 100000
  }
}
```

```bash
# Submit compaction task
curl -X POST \
  -H 'Content-Type: application/json' \
  -d @compaction-task.json \
  http://localhost:8081/druid/indexer/v1/task
```

#### Retention Rules

```json
{
  "rules": [
    {
      "type": "loadForever",
      "tieredReplicants": {
        "_default_tier": 2
      }
    },
    {
      "type": "dropBeforeByPeriod",
      "period": "P90D"
    }
  ]
}
```

```bash
# Set retention rules
curl -X POST \
  -H 'Content-Type: application/json' \
  -d @retention-rules.json \
  http://localhost:8081/druid/coordinator/v1/rules/wikipedia
```

#### Delete Data

```bash
# Delete segments by interval
curl -X DELETE \
  http://localhost:8081/druid/coordinator/v1/datasources/wikipedia/intervals/2015-09-12T00:00:00.000Z_2015-09-13T00:00:00.000Z
```

### Monitoring

```python
# Check cluster health
import requests

def check_druid_health():
    services = {
        'coordinator': 'http://localhost:8081/status',
        'broker': 'http://localhost:8082/status',
        'historical': 'http://localhost:8083/status'
    }
    
    for service, url in services.items():
        try:
            response = requests.get(url)
            print(f"{service}: {response.json()}")
        except Exception as e:
            print(f"{service}: ERROR - {e}")

# Get datasource info
def get_datasource_info(datasource):
    url = f'http://localhost:8081/druid/coordinator/v1/datasources/{datasource}'
    response = requests.get(url)
    return response.json()
```

---

## Best Practices

### Schema Design

- Use appropriate granularity (hour, day) based on query patterns
- Enable rollup to pre-aggregate data
- Choose dimensions carefully (high cardinality impacts performance)
- Use metric aggregators for numeric columns

### Ingestion Optimization

- Batch data into appropriate segment sizes (5-10M rows)
- Use partitioning for large datasets
- Enable parallel ingestion for faster loading
- Configure appropriate task resources

### Query Optimization

- Use time filters in all queries
- Leverage approximate algorithms for large cardinalities
- Use query caching for repeated queries
- Filter before aggregation

### Resource Planning

- Broker: 4-8GB RAM per instance
- Historical: 16-64GB RAM based on segment cache needs
- MiddleManager: 8-16GB RAM for ingestion tasks
- Deep storage: 3-5x raw data size

### High Availability

- Deploy multiple brokers for query load balancing
- Use replication (2-3 replicas) for critical data
- Separate historical and real-time tiers
- Configure automatic failover

---

## Troubleshooting

### Common Issues

**Slow Queries:**
```sql
-- Check query execution plan
EXPLAIN PLAN FOR
SELECT channel, COUNT(*) FROM wikipedia GROUP BY channel
```

**Memory Issues:**
```bash
# Increase heap size in jvm.config
-Xmx8g
-Xms8g
```

**Ingestion Failures:**
```bash
# Check task logs
curl http://localhost:8081/druid/indexer/v1/task/{taskId}/log
```

---

## Resources

### Official Documentation
- [Apache Druid Docs](https://druid.apache.org/docs/latest/design/)
- [SQL Reference](https://druid.apache.org/docs/latest/querying/sql.html)
- [Ingestion Spec](https://druid.apache.org/docs/latest/ingestion/index.html)

### Tutorials
- [Quickstart](https://druid.apache.org/docs/latest/tutorials/index.html)
- [Load Data Tutorial](https://druid.apache.org/docs/latest/tutorials/tutorial-batch.html)
- [Query Tutorial](https://druid.apache.org/docs/latest/tutorials/tutorial-query.html)

### Community
- [Apache Druid Slack](https://druid.apache.org/community/)
- [GitHub Repository](https://github.com/apache/druid)
- [User Mailing List](https://druid.apache.org/community/)

### Tools
- [Druid Console](http://localhost:8888) (Web UI)
- [Superset](https://superset.apache.org/) (Visualization)
- [Grafana Druid Plugin](https://grafana.com/grafana/plugins/grafadruid-druid-datasource/)

---

*Last Updated: January 2026*

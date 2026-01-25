# etcd

## Introduction

etcd is a distributed, reliable key-value store for the most critical data of distributed systems. It provides a reliable way to store data across a cluster of machines and is designed to handle configuration management, service discovery, and coordination in cloud-native applications.

### What is etcd?

etcd is an open-source, strongly consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by distributed systems or clusters of machines. It gracefully handles leader elections during network partitions and can tolerate machine failures, even in the leader node.

### Key Features

- **Distributed**: Multi-node cluster with Raft consensus algorithm
- **Strongly Consistent**: Linearizable reads and writes
- **Reliable**: Automatic leader election and fault tolerance  
- **Fast**: Thousands of writes per second
- **Secure**: TLS/SSL encryption and authentication
- **Simple**: HTTP/JSON API and gRPC
- **Watch**: Real-time notifications on data changes
- **Lease**: TTL-based key expiration
- **Transactions**: Multi-key conditional updates
- **Snapshot**: Point-in-time backup and restore

### Use Cases

- **Kubernetes**: Primary datastore for cluster state
- **Service Discovery**: Track available service instances
- **Configuration Management**: Distributed configuration storage
- **Leader Election**: Coordinate distributed processes
- **Distributed Locking**: Mutual exclusion across nodes
- **Message Queue**: Simple pub/sub messaging
- **Feature Flags**: Dynamic feature toggling
- **Metadata Storage**: Store cluster metadata

### etcd vs Other Key-Value Stores

| Feature | etcd | Consul | ZooKeeper | Redis |
|---------|------|--------|-----------|-------|
| **Consensus** | Raft | Raft | ZAB | None |
| **Consistency** | Strong | Strong | Strong | Eventual |
| **Use Case** | Config/coordination | Service mesh | Coordination | Caching |
| **Language** | Go | Go | Java | C |
| **API** | gRPC/HTTP | HTTP | Custom | Custom |
| **Watch** | Yes | Yes | Yes | Pub/Sub |

### Architecture Overview

**etcd Components:**

**Raft Consensus:**
- Leader election
- Log replication
- State machine

**Store:**
- In-memory index
- Persistent storage (BoltDB)
- MVCC (Multi-Version Concurrency Control)

**API:**
- gRPC (v3 API)
- HTTP/JSON (v2 API - deprecated)
- Client libraries

**Watch:**
- Event streaming
- Prefix/range watch
- Reliable delivery

---

## Installation & Setup

### Prerequisites

- Operating System: Linux, macOS, or Windows
- Minimum RAM: 2GB (8GB+ for production)
- Disk: SSD recommended for best performance
- Network: Low latency between cluster nodes
- Ports: 2379 (client), 2380 (peer)

### Installation Methods

#### Method 1: Binary Installation

**Linux:**
```bash
# Set version
ETCD_VER=v3.5.11

# Download
wget https://github.com/etcd-io/etcd/releases/download/${ETCD_VER}/etcd-${ETCD_VER}-linux-amd64.tar.gz

# Extract
tar -xzf etcd-${ETCD_VER}-linux-amd64.tar.gz
cd etcd-${ETCD_VER}-linux-amd64

# Move binaries
sudo mv etcd etcdctl etcdutl /usr/local/bin/

# Verify installation
etcd --version
etcdctl version
```

**macOS:**
```bash
# Install with Homebrew
brew install etcd

# Verify
etcd --version
```

**Windows:**
```powershell
# Download from GitHub releases
Invoke-WebRequest -Uri "https://github.com/etcd-io/etcd/releases/download/v3.5.11/etcd-v3.5.11-windows-amd64.zip" -OutFile "etcd.zip"

# Extract
Expand-Archive -Path etcd.zip -DestinationPath C:\etcd

# Add to PATH
$env:PATH += ";C:\etcd"
```

#### Method 2: Docker

```bash
# Run single-node etcd
docker run -d \
  --name etcd \
  -p 2379:2379 \
  -p 2380:2380 \
  -e ALLOW_NONE_AUTHENTICATION=yes \
  quay.io/coreos/etcd:v3.5.11 \
  /usr/local/bin/etcd \
  --advertise-client-urls http://0.0.0.0:2379 \
  --listen-client-urls http://0.0.0.0:2379

# Test connection
docker exec etcd etcdctl put mykey "Hello etcd"
docker exec etcd etcdctl get mykey
```

#### Method 3: Docker Compose (3-node cluster)

```yaml
# docker-compose.yml
version: '3.8'

services:
  etcd1:
    image: quay.io/coreos/etcd:v3.5.11
    container_name: etcd1
    ports:
      - "2379:2379"
      - "2380:2380"
    environment:
      - ETCD_NAME=etcd1
      - ETCD_INITIAL_ADVERTISE_PEER_URLS=http://etcd1:2380
      - ETCD_LISTEN_PEER_URLS=http://0.0.0.0:2380
      - ETCD_ADVERTISE_CLIENT_URLS=http://etcd1:2379
      - ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379
      - ETCD_INITIAL_CLUSTER_TOKEN=etcd-cluster
      - ETCD_INITIAL_CLUSTER=etcd1=http://etcd1:2380,etcd2=http://etcd2:2380,etcd3=http://etcd3:2380
      - ETCD_INITIAL_CLUSTER_STATE=new
    volumes:
      - etcd1_data:/etcd-data

  etcd2:
    image: quay.io/coreos/etcd:v3.5.11
    container_name: etcd2
    environment:
      - ETCD_NAME=etcd2
      - ETCD_INITIAL_ADVERTISE_PEER_URLS=http://etcd2:2380
      - ETCD_LISTEN_PEER_URLS=http://0.0.0.0:2380
      - ETCD_ADVERTISE_CLIENT_URLS=http://etcd2:2379
      - ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379
      - ETCD_INITIAL_CLUSTER_TOKEN=etcd-cluster
      - ETCD_INITIAL_CLUSTER=etcd1=http://etcd1:2380,etcd2=http://etcd2:2380,etcd3=http://etcd3:2380
      - ETCD_INITIAL_CLUSTER_STATE=new
    volumes:
      - etcd2_data:/etcd-data

  etcd3:
    image: quay.io/coreos/etcd:v3.5.11
    container_name: etcd3
    environment:
      - ETCD_NAME=etcd3
      - ETCD_INITIAL_ADVERTISE_PEER_URLS=http://etcd3:2380
      - ETCD_LISTEN_PEER_URLS=http://0.0.0.0:2380
      - ETCD_ADVERTISE_CLIENT_URLS=http://etcd3:2379
      - ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379
      - ETCD_INITIAL_CLUSTER_TOKEN=etcd-cluster
      - ETCD_INITIAL_CLUSTER=etcd1=http://etcd1:2380,etcd2=http://etcd2:2380,etcd3=http://etcd3:2380
      - ETCD_INITIAL_CLUSTER_STATE=new
    volumes:
      - etcd3_data:/etcd-data

volumes:
  etcd1_data:
  etcd2_data:
  etcd3_data:
```

```bash
# Start cluster
docker-compose up -d

# Check cluster health
docker exec etcd1 etcdctl endpoint health --cluster
```

#### Method 4: Kubernetes

```yaml
# etcd-statefulset.yaml
apiVersion: v1
kind: Service
metadata:
  name: etcd-client
spec:
  ports:
  - port: 2379
    name: client
  clusterIP: None
  selector:
    app: etcd
---
apiVersion: v1
kind: Service
metadata:
  name: etcd
spec:
  ports:
  - port: 2380
    name: peer
  clusterIP: None
  selector:
    app: etcd
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: etcd
spec:
  serviceName: etcd
  replicas: 3
  selector:
    matchLabels:
      app: etcd
  template:
    metadata:
      labels:
        app: etcd
    spec:
      containers:
      - name: etcd
        image: quay.io/coreos/etcd:v3.5.11
        ports:
        - containerPort: 2379
          name: client
        - containerPort: 2380
          name: peer
        env:
        - name: ETCD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: ETCD_INITIAL_CLUSTER
          value: "etcd-0=http://etcd-0.etcd:2380,etcd-1=http://etcd-1.etcd:2380,etcd-2=http://etcd-2.etcd:2380"
        - name: ETCD_INITIAL_ADVERTISE_PEER_URLS
          value: "http://$(ETCD_NAME).etcd:2380"
        - name: ETCD_ADVERTISE_CLIENT_URLS
          value: "http://$(ETCD_NAME).etcd-client:2379"
        - name: ETCD_LISTEN_PEER_URLS
          value: "http://0.0.0.0:2380"
        - name: ETCD_LISTEN_CLIENT_URLS
          value: "http://0.0.0.0:2379"
        volumeMounts:
        - name: data
          mountPath: /var/run/etcd
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
```

```bash
# Deploy
kubectl apply -f etcd-statefulset.yaml

# Check status
kubectl get pods -l app=etcd
```

#### Method 5: systemd Service (Production)

```bash
# Create etcd user
sudo useradd -r -s /sbin/nologin etcd

# Create directories
sudo mkdir -p /var/lib/etcd /etc/etcd
sudo chown etcd:etcd /var/lib/etcd

# Create systemd service
sudo cat > /etc/systemd/system/etcd.service <<EOF
[Unit]
Description=etcd distributed reliable key-value store
After=network.target

[Service]
Type=notify
User=etcd
ExecStart=/usr/local/bin/etcd \\
  --name etcd1 \\
  --data-dir /var/lib/etcd \\
  --listen-client-urls http://0.0.0.0:2379 \\
  --advertise-client-urls http://localhost:2379 \\
  --listen-peer-urls http://0.0.0.0:2380 \\
  --initial-advertise-peer-urls http://localhost:2380 \\
  --initial-cluster etcd1=http://localhost:2380 \\
  --initial-cluster-token etcd-cluster \\
  --initial-cluster-state new
Restart=always
RestartSec=10s
LimitNOFILE=40000

[Install]
WantedBy=multi-user.target
EOF

# Start service
sudo systemctl daemon-reload
sudo systemctl enable etcd
sudo systemctl start etcd

# Check status
sudo systemctl status etcd
```

### Verify Installation

```bash
# Check version
etcd --version

# Put/Get key
etcdctl put mykey "Hello etcd"
etcdctl get mykey

# Check cluster health
etcdctl endpoint health

# List members
etcdctl member list
```

---

## User Guide

### Basic Operations

#### 1. Connect to etcd

```bash
# Set endpoint (if not default)
export ETCDCTL_API=3
export ETCDCTL_ENDPOINTS=http://localhost:2379

# Or use flag
etcdctl --endpoints=http://localhost:2379 get mykey
```

#### 2. Put and Get Keys

```bash
# Put single key
etcdctl put key1 "value1"

# Get single key
etcdctl get key1

# Get with details
etcdctl get key1 --print-value-only
etcdctl get key1 --write-out=json

# Put multiple keys
etcdctl put /app/config/db "postgresql://localhost"
etcdctl put /app/config/cache "redis://localhost"
```

#### 3. List Keys

```bash
# Get all keys
etcdctl get "" --prefix

# Get keys with prefix
etcdctl get /app/config --prefix

# Get keys in range
etcdctl get key1 key9

# Count keys
etcdctl get "" --prefix --count-only
```

#### 4. Delete Keys

```bash
# Delete single key
etcdctl del key1

# Delete with prefix
etcdctl del /app/config --prefix

# Delete range
etcdctl del key1 key9
```

### Advanced Features

#### Watch for Changes

```bash
# Watch single key
etcdctl watch key1

# Watch with prefix
etcdctl watch /app/config --prefix

# Watch range
etcdctl watch key1 key9

# Watch in script
etcdctl watch /app/config --prefix | while read event; do
  echo "Config changed: $event"
done
```

**Python Watch Example:**
```python
import etcd3

etcd = etcd3.client(host='localhost', port=2379)

# Watch for changes
events, cancel = etcd.watch_prefix('/app/config')

for event in events:
    print(f"Event: {event}")
    print(f"Key: {event.key.decode('utf-8')}")
    print(f"Value: {event.value.decode('utf-8')}")
```

#### Leases (TTL)

```bash
# Grant 60-second lease
LEASE_ID=$(etcdctl lease grant 60 | grep granted | awk '{print $3}')

# Put key with lease
etcdctl put --lease=$LEASE_ID temp_key "expires in 60s"

# Check lease
etcdctl lease timetolive $LEASE_ID

# Keep alive
etcdctl lease keep-alive $LEASE_ID

# Revoke lease
etcdctl lease revoke $LEASE_ID
```

**Distributed Locking with Lease:**
```python
import etcd3
import time

etcd = etcd3.client()

# Acquire lock
lease = etcd.lease(30)  # 30 second TTL
lock = etcd.lock('/app/lock', lease=lease)

if lock.acquire(timeout=10):
    try:
        print("Lock acquired, doing work...")
        time.sleep(5)
    finally:
        lock.release()
else:
    print("Failed to acquire lock")
```

#### Transactions

```bash
# Compare and swap
etcdctl txn <<EOF
compare:
value("/app/counter") = "1"

success requests (if condition is true):
put /app/counter "2"

failure requests (if condition is false):
get /app/counter
EOF
```

**Python Transaction:**
```python
import etcd3

etcd = etcd3.client()

# Transactional update
success = etcd.transaction(
    compare=[etcd.transactions.value('/counter') == '1'],
    success=[etcd.transactions.put('/counter', '2')],
    failure=[etcd.transactions.get('/counter')]
)
```

#### Snapshots and Backup

```bash
# Create snapshot
etcdctl snapshot save snapshot.db

# Check snapshot status
etcdctl snapshot status snapshot.db

# Restore from snapshot
etcdctl snapshot restore snapshot.db \
  --data-dir=/var/lib/etcd-restore \
  --name=etcd1 \
  --initial-cluster=etcd1=http://localhost:2380

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backup/etcd"
DATE=$(date +%Y%m%d-%H%M%S)
etcdctl snapshot save ${BACKUP_DIR}/snapshot-${DATE}.db
find ${BACKUP_DIR} -name "snapshot-*.db" -mtime +7 -delete
```

### Integration Examples

#### Service Discovery

```python
# service_registry.py
import etcd3
import json

class ServiceRegistry:
    def __init__(self, etcd_host='localhost'):
        self.etcd = etcd3.client(host=etcd_host)
    
    def register_service(self, service_name, instance_id, address, port, ttl=30):
        """Register service with auto-refresh"""
        key = f'/services/{service_name}/{instance_id}'
        value = json.dumps({'address': address, 'port': port})
        
        lease = self.etcd.lease(ttl)
        self.etcd.put(key, value, lease=lease)
        
        # Keep-alive in background
        def refresh():
            lease.refresh()
        
        return lease
    
    def discover_services(self, service_name):
        """Find all instances of a service"""
        prefix = f'/services/{service_name}/'
        services = []
        
        for value, metadata in self.etcd.get_prefix(prefix):
            instance = json.loads(value.decode('utf-8'))
            services.append(instance)
        
        return services

# Usage
registry = ServiceRegistry()

# Register service
lease = registry.register_service('api', 'instance-1', '10.0.0.5', 8080)

# Discover services
instances = registry.discover_services('api')
print(f"Found {len(instances)} API instances")
```

#### Configuration Management

```python
# config_manager.py
import etcd3
import json

class ConfigManager:
    def __init__(self, namespace='/config'):
        self.etcd = etcd3.client()
        self.namespace = namespace
    
    def set_config(self, key, value):
        """Set configuration value"""
        full_key = f'{self.namespace}/{key}'
        self.etcd.put(full_key, json.dumps(value))
    
    def get_config(self, key, default=None):
        """Get configuration value"""
        full_key = f'{self.namespace}/{key}'
        value, _ = self.etcd.get(full_key)
        
        if value is None:
            return default
        
        return json.loads(value.decode('utf-8'))
    
    def watch_config(self, key, callback):
        """Watch for configuration changes"""
        full_key = f'{self.namespace}/{key}'
        
        events, cancel = self.etcd.watch(full_key)
        
        for event in events:
            if event.value:
                value = json.loads(event.value.decode('utf-8'))
                callback(value)

# Usage
config = ConfigManager(namespace='/app/config')

# Set config
config.set_config('database/host', 'localhost')
config.set_config('database/port', 5432)

# Get config
db_host = config.get_config('database/host')

# Watch for changes
def on_config_change(new_value):
    print(f"Config changed: {new_value}")

config.watch_config('database/host', on_config_change)
```

#### Leader Election

```python
# leader_election.py
import etcd3
import time
import threading

class LeaderElection:
    def __init__(self, election_name, node_id, ttl=10):
        self.etcd = etcd3.client()
        self.election_name = election_name
        self.node_id = node_id
        self.ttl = ttl
        self.is_leader = False
        self.lease = None
    
    def campaign(self):
        """Try to become leader"""
        election_key = f'/elections/{self.election_name}/leader'
        
        # Create lease
        self.lease = self.etcd.lease(self.ttl)
        
        # Try to acquire leadership
        success = self.etcd.transaction(
            compare=[etcd3.transactions.create(election_key) == 0],
            success=[etcd3.transactions.put(election_key, self.node_id, lease=self.lease)],
            failure=[]
        )
        
        if success:
            self.is_leader = True
            # Keep lease alive
            threading.Thread(target=self._keep_alive, daemon=True).start()
            return True
        
        return False
    
    def _keep_alive(self):
        """Keep leadership lease alive"""
        while self.is_leader:
            try:
                self.lease.refresh()
                time.sleep(self.ttl // 2)
            except:
                self.is_leader = False
                break
    
    def resign(self):
        """Give up leadership"""
        if self.is_leader and self.lease:
            self.lease.revoke()
            self.is_leader = False

# Usage
election = LeaderElection('my-service', 'node-1')

if election.campaign():
    print("I am the leader!")
    # Do leader work
else:
    print("I am a follower")
```

### Monitoring

```bash
# Cluster status
etcdctl endpoint status --cluster

# Member list
etcdctl member list

# Cluster health
etcdctl endpoint health --cluster

# Performance metrics
etcdctl check perf

# Get metrics (Prometheus format)
curl http://localhost:2379/metrics
```

---

## Best Practices

### Cluster Setup

- Use odd number of nodes (3 or 5)
- Deploy across availability zones
- Use SSD storage for best performance
- Limit cluster to 7 nodes maximum

### Performance

- Keep value sizes small (<1.5MB)
- Use transactions for atomic updates
- Implement client-side caching
- Use prefix watches instead of many single watches

### Security

- Enable TLS for client and peer communication
- Use authentication and authorization
- Rotate certificates regularly
- Limit network access with firewalls

### Operations

- Regular backups (snapshots)
- Monitor disk usage and performance
- Set appropriate auto-compaction
- Use health checks in load balancers

---

## Troubleshooting

### Common Issues

**Split Brain:**
```bash
# Check cluster consistency
etcdctl endpoint status --cluster

# Remove bad member
etcdctl member remove <member-id>
```

**High Latency:**
```bash
# Check disk I/O
iostat -x 1

# Compact history
etcdctl compact <revision>

# Defragment
etcdctl defrag --cluster
```

**Out of Disk Space:**
```bash
# Check size
du -sh /var/lib/etcd

# Set quota
etcdctl --endpoints=:2379 alarm disarm
etcdctl --endpoints=:2379 defrag
```

---

## Resources

### Official Documentation
- [etcd Documentation](https://etcd.io/docs/)
- [API Reference](https://etcd.io/docs/latest/learning/api/)
- [Operations Guide](https://etcd.io/docs/latest/op-guide/)

### Tutorials
- [Getting Started](https://etcd.io/docs/latest/quickstart/)
- [Clustering Guide](https://etcd.io/docs/latest/op-guide/clustering/)
- [Security Setup](https://etcd.io/docs/latest/op-guide/security/)

### Community
- [GitHub Repository](https://github.com/etcd-io/etcd)
- [CNCF Slack](https://cloud-native.slack.com)
- [Mailing List](https://groups.google.com/g/etcd-dev)

### Client Libraries
- [Python (python-etcd3)](https://github.com/kragniz/python-etcd3)
- [Go (official)](https://github.com/etcd-io/etcd/tree/main/client)
- [Java (jetcd)](https://github.com/etcd-io/jetcd)
- [Node.js (node-etcd)](https://github.com/stianeikeland/node-etcd)

---

*Last Updated: January 2026*

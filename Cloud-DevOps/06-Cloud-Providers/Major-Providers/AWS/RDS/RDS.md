# AWS RDS (Relational Database Service)

## Introduction

Amazon Relational Database Service (RDS) is a fully managed relational database service that makes it easy to set up, operate, and scale databases in the cloud. RDS automates time-consuming administration tasks such as hardware provisioning, database setup, patching, and backups, allowing you to focus on your applications.

### Key Features

- **Managed Service**: Automated backups, patching, and monitoring
- **Multiple Engines**: PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, Amazon Aurora
- **High Availability**: Multi-AZ deployments with automatic failover
- **Read Replicas**: Scale read workloads and improve performance
- **Automatic Backups**: Point-in-time recovery up to 35 days
- **Encryption**: At-rest and in-transit encryption
- **Performance Insights**: Database performance monitoring
- **Scalability**: Vertical and horizontal scaling
- **Security**: VPC isolation, IAM authentication
- **Global Database**: Cross-region replication with Aurora

### Common Use Cases

- **Web Applications**: Backend databases for web apps
- **E-commerce**: Product catalogs and transaction processing
- **SaaS Applications**: Multi-tenant database architectures
- **Analytics**: Data warehousing and reporting
- **Mobile Apps**: Backend data storage
- **Gaming**: Player data and game state
- **Financial Services**: Transaction processing
- **Healthcare**: Patient records and medical data

## Supported Database Engines

### PostgreSQL
- Versions: 11.x, 12.x, 13.x, 14.x, 15.x, 16.x
- Advanced features, JSONB support, full-text search

### MySQL
- Versions: 5.7.x, 8.0.x
- Popular open-source database, wide compatibility

### MariaDB
- Versions: 10.4.x, 10.5.x, 10.6.x, 10.11.x
- MySQL fork with additional features

### Oracle
- Versions: 19c, 21c
- Enterprise features, BYOL or License Included

### SQL Server
- Versions: 2016, 2017, 2019, 2022
- Express, Web, Standard, Enterprise editions

### Amazon Aurora
- MySQL and PostgreSQL compatible
- 5x performance of MySQL, 3x of PostgreSQL
- Up to 128 TB storage auto-scaling

## Getting Started

### Prerequisites

```bash
# Install AWS CLI
# Windows (PowerShell as Administrator)
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI
aws configure
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region: us-east-1
# Default output format: json

# Verify installation
aws rds help
```

### Create RDS Instance (PostgreSQL)

```bash
# Create DB subnet group
aws rds create-db-subnet-group \
  --db-subnet-group-name my-db-subnet-group \
  --db-subnet-group-description "Subnet group for RDS" \
  --subnet-ids subnet-xxx subnet-yyy

# Create security group
aws ec2 create-security-group \
  --group-name rds-sg \
  --description "Security group for RDS" \
  --vpc-id vpc-xxx

# Add inbound rule for PostgreSQL
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxx \
  --protocol tcp \
  --port 5432 \
  --cidr 10.0.0.0/16

# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier mydb \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 16.1 \
  --master-username admin \
  --master-user-password MySecurePassword123! \
  --allocated-storage 20 \
  --storage-type gp3 \
  --vpc-security-group-ids sg-xxx \
  --db-subnet-group-name my-db-subnet-group \
  --backup-retention-period 7 \
  --preferred-backup-window "03:00-04:00" \
  --preferred-maintenance-window "sun:04:00-sun:05:00" \
  --publicly-accessible \
  --storage-encrypted \
  --enable-cloudwatch-logs-exports '["postgresql"]'

# Wait for instance to be available
aws rds wait db-instance-available --db-instance-identifier mydb

# Get endpoint
aws rds describe-db-instances \
  --db-instance-identifier mydb \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text
```

## Connecting to RDS

### PostgreSQL Connection

```bash
# Using psql
psql -h mydb.abc123xyz.us-east-1.rds.amazonaws.com \
     -U admin \
     -d postgres \
     -p 5432

# Connection string
postgresql://admin:password@mydb.abc123xyz.us-east-1.rds.amazonaws.com:5432/postgres
```

```python
# Python with psycopg2
import psycopg2
import os

def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ['DB_HOST'],
        database=os.environ['DB_NAME'],
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASSWORD'],
        port=5432
    )
    return conn

# Example usage
conn = get_db_connection()
cursor = conn.cursor()

# Execute query
cursor.execute("SELECT version();")
version = cursor.fetchone()
print(f"PostgreSQL version: {version[0]}")

# Close connection
cursor.close()
conn.close()
```

```javascript
// Node.js with pg
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Query function
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

// Example usage
(async () => {
  try {
    const result = await query('SELECT NOW()');
    console.log(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err);
  } finally {
    await pool.end();
  }
})();
```

### MySQL Connection

```bash
# Using mysql client
mysql -h mydb.abc123xyz.us-east-1.rds.amazonaws.com \
      -u admin \
      -p \
      -P 3306
```

```python
# Python with PyMySQL
import pymysql
import os

connection = pymysql.connect(
    host=os.environ['DB_HOST'],
    user=os.environ['DB_USER'],
    password=os.environ['DB_PASSWORD'],
    database=os.environ['DB_NAME'],
    port=3306,
    cursorclass=pymysql.cursors.DictCursor
)

try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT VERSION()")
        result = cursor.fetchone()
        print(f"MySQL version: {result}")
finally:
    connection.close()
```

```java
// Java with JDBC
import java.sql.*;

public class RDSConnection {
    private static final String DB_URL = "jdbc:mysql://mydb.abc123xyz.us-east-1.rds.amazonaws.com:3306/mydb";
    private static final String USER = System.getenv("DB_USER");
    private static final String PASS = System.getenv("DB_PASSWORD");
    
    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
             Statement stmt = conn.createStatement()) {
            
            ResultSet rs = stmt.executeQuery("SELECT VERSION()");
            
            while (rs.next()) {
                System.out.println("MySQL version: " + rs.getString(1));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

## High Availability (Multi-AZ)

### Create Multi-AZ Deployment

```bash
# Create Multi-AZ instance
aws rds create-db-instance \
  --db-instance-identifier mydb-ha \
  --db-instance-class db.t3.small \
  --engine postgres \
  --engine-version 16.1 \
  --master-username admin \
  --master-user-password MySecurePassword123! \
  --allocated-storage 100 \
  --storage-type gp3 \
  --vpc-security-group-ids sg-xxx \
  --db-subnet-group-name my-db-subnet-group \
  --multi-az \
  --backup-retention-period 7 \
  --storage-encrypted

# Modify existing instance to Multi-AZ
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --multi-az \
  --apply-immediately
```

**Benefits**:
- Automatic failover to standby replica
- High availability across availability zones
- Zero data loss during failover
- Automated backups from standby

## Read Replicas

### Create Read Replica

```bash
# Create read replica in same region
aws rds create-db-instance-read-replica \
  --db-instance-identifier mydb-replica-1 \
  --source-db-instance-identifier mydb \
  --db-instance-class db.t3.micro \
  --publicly-accessible

# Create cross-region read replica
aws rds create-db-instance-read-replica \
  --db-instance-identifier mydb-replica-eu \
  --source-db-instance-identifier mydb \
  --db-instance-class db.t3.micro \
  --source-region us-east-1 \
  --region eu-west-1

# Promote read replica to standalone
aws rds promote-read-replica \
  --db-instance-identifier mydb-replica-1
```

### Using Read Replicas

```python
# Python connection with read replica
import psycopg2

# Write connection
write_conn = psycopg2.connect(
    host='mydb.abc123xyz.us-east-1.rds.amazonaws.com',
    database='postgres',
    user='admin',
    password='password'
)

# Read connection
read_conn = psycopg2.connect(
    host='mydb-replica-1.abc123xyz.us-east-1.rds.amazonaws.com',
    database='postgres',
    user='admin',
    password='password'
)

# Write operation
write_cursor = write_conn.cursor()
write_cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", 
                     ('John Doe', 'john@example.com'))
write_conn.commit()

# Read operation (from replica)
read_cursor = read_conn.cursor()
read_cursor.execute("SELECT * FROM users")
users = read_cursor.fetchall()
```

## Backups & Snapshots

### Automated Backups

```bash
# Modify backup settings
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --backup-retention-period 30 \
  --preferred-backup-window "03:00-04:00" \
  --apply-immediately

# Restore from automated backup
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier mydb \
  --target-db-instance-identifier mydb-restored \
  --restore-time 2026-01-17T10:00:00Z
```

### Manual Snapshots

```bash
# Create snapshot
aws rds create-db-snapshot \
  --db-instance-identifier mydb \
  --db-snapshot-identifier mydb-snapshot-20260117

# List snapshots
aws rds describe-db-snapshots \
  --db-instance-identifier mydb

# Restore from snapshot
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier mydb-from-snapshot \
  --db-snapshot-identifier mydb-snapshot-20260117 \
  --db-instance-class db.t3.micro

# Copy snapshot to another region
aws rds copy-db-snapshot \
  --source-db-snapshot-identifier arn:aws:rds:us-east-1:ACCOUNT:snapshot:mydb-snapshot-20260117 \
  --target-db-snapshot-identifier mydb-snapshot-eu \
  --region eu-west-1 \
  --source-region us-east-1

# Delete snapshot
aws rds delete-db-snapshot \
  --db-snapshot-identifier mydb-snapshot-20260117
```

### Export to S3

```bash
# Export snapshot to S3
aws rds start-export-task \
  --export-task-identifier mydb-export-20260117 \
  --source-arn arn:aws:rds:us-east-1:ACCOUNT:snapshot:mydb-snapshot-20260117 \
  --s3-bucket-name my-rds-exports \
  --iam-role-arn arn:aws:iam::ACCOUNT:role/RDSExportRole \
  --kms-key-id arn:aws:kms:us-east-1:ACCOUNT:key/xxx

# Check export status
aws rds describe-export-tasks \
  --export-task-identifier mydb-export-20260117
```

## Scaling

### Vertical Scaling (Instance Size)

```bash
# Modify instance class
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --db-instance-class db.t3.medium \
  --apply-immediately

# Check modification status
aws rds describe-db-instances \
  --db-instance-identifier mydb \
  --query 'DBInstances[0].PendingModifiedValues'
```

### Storage Scaling

```bash
# Increase storage
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --allocated-storage 200 \
  --apply-immediately

# Enable storage autoscaling
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --max-allocated-storage 1000 \
  --apply-immediately
```

### Horizontal Scaling (Read Replicas)

```bash
# Add multiple read replicas
for i in {1..3}; do
  aws rds create-db-instance-read-replica \
    --db-instance-identifier mydb-replica-$i \
    --source-db-instance-identifier mydb \
    --db-instance-class db.t3.micro
done
```

## Security

### Encryption

```bash
# Create encrypted instance
aws rds create-db-instance \
  --db-instance-identifier mydb-encrypted \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password MySecurePassword123! \
  --allocated-storage 20 \
  --storage-encrypted \
  --kms-key-id arn:aws:kms:us-east-1:ACCOUNT:key/xxx

# Enable encryption in transit (SSL/TLS)
# Force SSL connections in PostgreSQL
aws rds modify-db-parameter-group \
  --db-parameter-group-name mydb-params \
  --parameters "ParameterName=rds.force_ssl,ParameterValue=1,ApplyMethod=immediate"
```

### IAM Database Authentication

```bash
# Enable IAM authentication
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --enable-iam-database-authentication \
  --apply-immediately
```

```python
# Python connection with IAM auth
import boto3
import psycopg2

def get_db_token(host, port, username, region):
    rds_client = boto3.client('rds', region_name=region)
    token = rds_client.generate_db_auth_token(
        DBHostname=host,
        Port=port,
        DBUsername=username
    )
    return token

# Get authentication token
token = get_db_token(
    host='mydb.abc123xyz.us-east-1.rds.amazonaws.com',
    port=5432,
    username='iamuser',
    region='us-east-1'
)

# Connect using IAM token
conn = psycopg2.connect(
    host='mydb.abc123xyz.us-east-1.rds.amazonaws.com',
    port=5432,
    database='postgres',
    user='iamuser',
    password=token,
    sslmode='require'
)
```

### VPC Security

```bash
# Create DB in private subnet
aws rds create-db-instance \
  --db-instance-identifier mydb-private \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password MySecurePassword123! \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxx \
  --db-subnet-group-name private-db-subnet-group \
  --publicly-accessible false

# Update security group rules
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxx \
  --protocol tcp \
  --port 5432 \
  --source-group sg-app-servers
```

## Parameter Groups

### Create Custom Parameter Group

```bash
# Create parameter group
aws rds create-db-parameter-group \
  --db-parameter-group-name custom-postgres16 \
  --db-parameter-group-family postgres16 \
  --description "Custom PostgreSQL 16 parameters"

# Modify parameters
aws rds modify-db-parameter-group \
  --db-parameter-group-name custom-postgres16 \
  --parameters \
    "ParameterName=max_connections,ParameterValue=200,ApplyMethod=pending-reboot" \
    "ParameterName=shared_buffers,ParameterValue='{DBInstanceClassMemory/4096}',ApplyMethod=pending-reboot" \
    "ParameterName=work_mem,ParameterValue=16384,ApplyMethod=immediate"

# Apply parameter group to instance
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --db-parameter-group-name custom-postgres16 \
  --apply-immediately

# Reboot to apply pending changes
aws rds reboot-db-instance \
  --db-instance-identifier mydb
```

## Performance Insights

### Enable Performance Insights

```bash
# Enable on existing instance
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --enable-performance-insights \
  --performance-insights-retention-period 7 \
  --apply-immediately

# Query Performance Insights
aws pi get-resource-metrics \
  --service-type RDS \
  --identifier db-XXXXXXXXXXXXX \
  --metric-queries file://metrics.json \
  --start-time 2026-01-17T00:00:00Z \
  --end-time 2026-01-17T23:59:59Z
```

```json
// metrics.json
[
  {
    "Metric": "db.load.avg",
    "GroupBy": {
      "Group": "db.sql"
    }
  }
]
```

## Monitoring & Alerts

### CloudWatch Metrics

```bash
# Get CPU utilization
aws cloudwatch get-metric-statistics \
  --namespace AWS/RDS \
  --metric-name CPUUtilization \
  --dimensions Name=DBInstanceIdentifier,Value=mydb \
  --start-time 2026-01-17T00:00:00Z \
  --end-time 2026-01-17T23:59:59Z \
  --period 3600 \
  --statistics Average

# Create CloudWatch alarm
aws cloudwatch put-metric-alarm \
  --alarm-name rds-high-cpu \
  --alarm-description "Alert when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/RDS \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=DBInstanceIdentifier,Value=mydb \
  --alarm-actions arn:aws:sns:us-east-1:ACCOUNT:rds-alerts
```

### Enhanced Monitoring

```bash
# Enable enhanced monitoring
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --monitoring-interval 60 \
  --monitoring-role-arn arn:aws:iam::ACCOUNT:role/rds-monitoring-role \
  --apply-immediately
```

## Amazon Aurora

### Create Aurora Cluster

```bash
# Create Aurora PostgreSQL cluster
aws rds create-db-cluster \
  --db-cluster-identifier aurora-cluster \
  --engine aurora-postgresql \
  --engine-version 16.1 \
  --master-username admin \
  --master-user-password MySecurePassword123! \
  --database-name mydb \
  --vpc-security-group-ids sg-xxx \
  --db-subnet-group-name my-db-subnet-group \
  --backup-retention-period 7 \
  --storage-encrypted

# Create primary instance
aws rds create-db-instance \
  --db-instance-identifier aurora-instance-1 \
  --db-instance-class db.t3.medium \
  --engine aurora-postgresql \
  --db-cluster-identifier aurora-cluster

# Create read replica
aws rds create-db-instance \
  --db-instance-identifier aurora-instance-2 \
  --db-instance-class db.t3.medium \
  --engine aurora-postgresql \
  --db-cluster-identifier aurora-cluster
```

### Aurora Serverless v2

```bash
# Create Aurora Serverless v2 cluster
aws rds create-db-cluster \
  --db-cluster-identifier aurora-serverless \
  --engine aurora-postgresql \
  --engine-version 16.1 \
  --engine-mode provisioned \
  --master-username admin \
  --master-user-password MySecurePassword123! \
  --serverless-v2-scaling-configuration MinCapacity=0.5,MaxCapacity=4 \
  --vpc-security-group-ids sg-xxx \
  --db-subnet-group-name my-db-subnet-group

# Create serverless instance
aws rds create-db-instance \
  --db-instance-identifier aurora-serverless-1 \
  --db-instance-class db.serverless \
  --engine aurora-postgresql \
  --db-cluster-identifier aurora-serverless
```

### Global Database

```bash
# Create global database
aws rds create-global-cluster \
  --global-cluster-identifier my-global-db \
  --engine aurora-postgresql \
  --engine-version 16.1

# Add primary cluster
aws rds modify-db-cluster \
  --db-cluster-identifier aurora-cluster \
  --global-cluster-identifier my-global-db

# Create secondary cluster in another region
aws rds create-db-cluster \
  --db-cluster-identifier aurora-cluster-eu \
  --engine aurora-postgresql \
  --global-cluster-identifier my-global-db \
  --region eu-west-1
```

## Maintenance & Updates

### Maintenance Window

```bash
# Set maintenance window
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --preferred-maintenance-window sun:03:00-sun:04:00 \
  --apply-immediately

# Check pending maintenance
aws rds describe-pending-maintenance-actions \
  --resource-identifier arn:aws:rds:us-east-1:ACCOUNT:db:mydb
```

### Engine Upgrades

```bash
# List available versions
aws rds describe-db-engine-versions \
  --engine postgres \
  --engine-version 15.5 \
  --query 'DBEngineVersions[*].ValidUpgradeTarget[*].EngineVersion'

# Upgrade minor version
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --engine-version 16.2 \
  --allow-major-version-upgrade \
  --apply-immediately

# Upgrade major version
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --engine-version 17.0 \
  --allow-major-version-upgrade \
  --apply-immediately
```

## Best Practices

### Performance

1. **Right-Size Instances**: Match instance type to workload
2. **Use Read Replicas**: Offload read traffic
3. **Enable Performance Insights**: Monitor query performance
4. **Optimize Queries**: Use indexes and query optimization
5. **Connection Pooling**: Reuse database connections

### Security

1. **Encrypt Data**: Enable encryption at rest and in transit
2. **Use VPC**: Deploy in private subnets
3. **IAM Authentication**: Use IAM for database access
4. **Least Privilege**: Minimal database permissions
5. **Secrets Manager**: Store credentials securely

### High Availability

1. **Multi-AZ**: Enable for production workloads
2. **Automated Backups**: Retain for disaster recovery
3. **Read Replicas**: Cross-region for DR
4. **Test Failover**: Regularly test failover procedures
5. **Monitor Health**: Set up CloudWatch alarms

### Cost Optimization

1. **Reserved Instances**: Commit for 1-3 years
2. **Right-Size**: Avoid over-provisioning
3. **Storage Autoscaling**: Scale storage automatically
4. **Delete Snapshots**: Remove old snapshots
5. **Use Aurora Serverless**: For variable workloads

## Pricing

### On-Demand Instances

**db.t3.micro (PostgreSQL)**:
- $0.017/hour = ~$12.41/month

**db.t3.small**:
- $0.034/hour = ~$24.82/month

**db.m5.large**:
- $0.192/hour = ~$140.16/month

### Reserved Instances (1-year)

**db.t3.micro**:
- ~$8.60/month (31% savings)

**db.m5.large**:
- ~$97.11/month (31% savings)

### Storage Pricing

- **gp3**: $0.115 per GB-month
- **gp2**: $0.115 per GB-month
- **io1**: $0.125 per GB-month + $0.10 per IOPS
- **Magnetic**: $0.10 per GB-month

### Backup Storage

- Free up to database size
- $0.095 per GB-month for excess

## Troubleshooting

### Common Issues

```bash
# Connection timeout
# Check security group rules
aws ec2 describe-security-groups --group-ids sg-xxx

# High CPU usage
# Check Performance Insights and slow query log
aws rds describe-db-log-files \
  --db-instance-identifier mydb

# Storage full
# Increase storage or enable autoscaling
aws rds modify-db-instance \
  --db-instance-identifier mydb \
  --max-allocated-storage 1000

# Replica lag
# Check replica status
aws rds describe-db-instances \
  --db-instance-identifier mydb-replica-1 \
  --query 'DBInstances[0].StatusInfos'
```

## Resources

### Official Documentation

- [RDS Documentation](https://docs.aws.amazon.com/rds/)
- [RDS User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/)
- [Aurora Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/)
- [RDS Best Practices](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_BestPractices.html)

### Tools

- [AWS CLI](https://aws.amazon.com/cli/)
- [RDS Console](https://console.aws.amazon.com/rds/)
- [Performance Insights](https://aws.amazon.com/rds/performance-insights/)
- [Database Migration Service](https://aws.amazon.com/dms/)

### Community

- [AWS Forums](https://forums.aws.amazon.com/forum.jspa?forumID=60)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/amazon-rds)
- [AWS re:Post](https://repost.aws/)
- [AWS Database Blog](https://aws.amazon.com/blogs/database/)

### Learning Resources

- [RDS Workshop](https://catalog.workshops.aws/rds/)
- [AWS Training](https://aws.amazon.com/training/learn-about/databases/)
- [Aurora Labs](https://github.com/aws-samples/amazon-aurora-labs-for-mysql)
- [Database Migration Guide](https://docs.aws.amazon.com/dms/latest/userguide/)

---

**Related Technologies**: [PostgreSQL](../../../SQL&DB'S/PostgreSQL/), [MySQL](../../../SQL&DB'S/MySQL/), [Aurora](../Aurora/), [DynamoDB](../DynamoDB/), [Lambda](../Lambda/)

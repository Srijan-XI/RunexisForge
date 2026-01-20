# Oracle Cloud Infrastructure (OCI)

## Introduction

### What is Oracle Cloud Infrastructure?

Oracle Cloud Infrastructure (OCI) is Oracle's enterprise-grade cloud computing platform offering Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS), and Data as a Service (DaaS). OCI provides high-performance computing, autonomous databases, and enterprise applications with a focus on security, performance, and cost-effectiveness.

### Why Oracle Cloud?

- Autonomous Database (self-driving, self-securing, self-repairing)
- High-performance computing (HPC)
- Always Free Tier (generous limits)
- Competitive pricing
- Enterprise-grade security
- Oracle Database compatibility
- Global data center presence
- Strong SLA guarantees
- Integrated with Oracle ecosystem
- Bare metal and VM instances

## Prerequisites

- Oracle account (free tier available)
- Credit card (for verification, not charged on free tier)
- Basic cloud computing knowledge
- Familiarity with Linux/Windows administration
- Understanding of networking concepts

## Getting Started

### Create Account

1. Visit [oracle.com/cloud/free](https://www.oracle.com/cloud/free/)
2. Sign up for free tier
3. Verify email
4. Complete verification (SMS/credit card)
5. Access OCI Console

### Always Free Tier Resources

```
Compute:
- 2 AMD-based Compute VMs (1/8 OCPU, 1GB RAM each)
- 4 Arm-based Ampere A1 Compute instances (24GB RAM, 4 OCPUs total)

Storage:
- 200 GB Block Volume storage
- 10 GB Object Storage
- 10 GB Archive Storage

Database:
- 2 Autonomous Databases (20 GB each)

Networking:
- 10 TB/month outbound data transfer
- Load Balancer (10 Mbps)

Additional:
- Monitoring, Logging, Notifications
- Resource Manager (Terraform)
```

## Core Concepts

### Tenancy, Compartments, and IAM

```
Tenancy (Root)
├── Compartment: Production
│   ├── Compute instances
│   └── Databases
├── Compartment: Development
│   └── Test resources
└── Compartment: Networking
    ├── VCNs
    └── Load balancers
```

## OCI CLI Setup

### Installation

```bash
# Linux/macOS
bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)"

# Windows (PowerShell)
Set-ExecutionPolicy RemoteSigned
powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.ps1'))"
```

### Configuration

```bash
# Configure CLI
oci setup config

# Provide:
# - User OCID
# - Tenancy OCID  
# - Region
# - Generate API keys (Y/n)

# Test configuration
oci iam region list
```

## Compute Instances

### Creating VM Instance

```bash
# Via CLI
oci compute instance launch \
  --availability-domain <AD> \
  --compartment-id <compartment-ocid> \
  --shape VM.Standard.E2.1.Micro \
  --image-id <image-ocid> \
  --subnet-id <subnet-ocid> \
  --display-name my-instance \
  --assign-public-ip true \
  --ssh-authorized-keys-file ~/.ssh/id_rsa.pub

# List instances
oci compute instance list \
  --compartment-id <compartment-ocid>
```

### Via Console

```
1. Compute → Instances → Create Instance
2. Choose image (Oracle Linux, Ubuntu, Windows, etc.)
3. Select shape (VM.Standard, VM.Optimized, Bare Metal)
4. Configure VCN and subnet
5. Add SSH keys
6. Create
```

### Connecting to Instance

```bash
# Linux instance
ssh -i ~/.ssh/id_rsa opc@<public-ip>

# Ubuntu instance
ssh -i ~/.ssh/id_rsa ubuntu@<public-ip>
```

## Autonomous Database

### Creating Autonomous Database

```bash
# Via CLI
oci db autonomous-database create \
  --compartment-id <compartment-ocid> \
  --db-name mydb \
  --display-name "My Database" \
  --admin-password 'SecurePass123#' \
  --cpu-core-count 1 \
  --data-storage-size-in-tbs 1 \
  --is-free-tier true \
  --db-workload OLTP
```

### Via Console

```
1. Databases → Autonomous Database → Create
2. Choose workload (OLTP, Data Warehouse, JSON, APEX)
3. Select deployment (Shared or Dedicated)
4. Configure:
   - Database name
   - CPU count
   - Storage (TB)
   - Auto scaling
5. Set admin password
6. Choose network access (Secure from everywhere or Private endpoint)
7. Create
```

### Connecting to Autonomous Database

```bash
# Download wallet
oci db autonomous-database generate-wallet \
  --autonomous-database-id <adb-ocid> \
  --file wallet.zip \
  --password 'WalletPassword123'

# Extract wallet
unzip wallet.zip -d ~/wallet

# Connect with SQL*Plus
export TNS_ADMIN=~/wallet
sqlplus admin/<password>@mydb_high

# Connect with Python
import cx_Oracle

connection = cx_Oracle.connect(
    user="admin",
    password="SecurePass123#",
    dsn="mydb_high",
    config_dir="/path/to/wallet",
    wallet_location="/path/to/wallet",
    wallet_password="WalletPassword123"
)

cursor = connection.cursor()
cursor.execute("SELECT * FROM dual")
print(cursor.fetchone())
```

## Object Storage

### Creating Bucket

```bash
# Via CLI
oci os bucket create \
  --compartment-id <compartment-ocid> \
  --name my-bucket

# List buckets
oci os bucket list \
  --compartment-id <compartment-ocid>
```

### Upload/Download Files

```bash
# Upload file
oci os object put \
  --bucket-name my-bucket \
  --file /path/to/file.txt \
  --name file.txt

# Download file
oci os object get \
  --bucket-name my-bucket \
  --name file.txt \
  --file downloaded.txt

# List objects
oci os object list \
  --bucket-name my-bucket

# Delete object
oci os object delete \
  --bucket-name my-bucket \
  --name file.txt
```

### Pre-authenticated Requests (PAR)

```bash
# Create PAR for upload
oci os preauth-request create \
  --bucket-name my-bucket \
  --name upload-par \
  --access-type ObjectWrite \
  --object-name file.txt \
  --time-expires 2026-12-31T23:59:59Z

# Create PAR for download
oci os preauth-request create \
  --bucket-name my-bucket \
  --name download-par \
  --access-type ObjectRead \
  --object-name file.txt \
  --time-expires 2026-12-31T23:59:59Z
```

## Block Volumes

### Creating Block Volume

```bash
# Create volume
oci bv volume create \
  --compartment-id <compartment-ocid> \
  --availability-domain <AD> \
  --display-name my-volume \
  --size-in-gbs 50

# Attach to instance
oci compute volume-attachment attach \
  --instance-id <instance-ocid> \
  --type paravirtualized \
  --volume-id <volume-ocid>
```

### Mounting Volume

```bash
# On the instance
# Find device
lsblk

# Create filesystem
sudo mkfs.ext4 /dev/sdb

# Mount
sudo mkdir /mnt/data
sudo mount /dev/sdb /mnt/data

# Auto-mount on boot
echo '/dev/sdb /mnt/data ext4 defaults,_netdev,nofail 0 2' | sudo tee -a /etc/fstab
```

## Networking (VCN)

### Creating Virtual Cloud Network

```bash
# Create VCN
oci network vcn create \
  --compartment-id <compartment-ocid> \
  --display-name my-vcn \
  --cidr-block 10.0.0.0/16

# Create subnet
oci network subnet create \
  --compartment-id <compartment-ocid> \
  --vcn-id <vcn-ocid> \
  --display-name public-subnet \
  --cidr-block 10.0.1.0/24 \
  --route-table-id <route-table-ocid> \
  --security-list-ids '["<security-list-ocid>"]'
```

### Security Lists

```bash
# Add ingress rule (SSH)
oci network security-list-rules add \
  --security-list-id <security-list-ocid> \
  --ingress-security-rules '[{
    "protocol": "6",
    "source": "0.0.0.0/0",
    "tcpOptions": {
      "destinationPortRange": {
        "min": 22,
        "max": 22
      }
    }
  }]'

# Add ingress rule (HTTP/HTTPS)
oci network security-list-rules add \
  --security-list-id <security-list-ocid> \
  --ingress-security-rules '[{
    "protocol": "6",
    "source": "0.0.0.0/0",
    "tcpOptions": {
      "destinationPortRange": {
        "min": 80,
        "max": 80
      }
    }
  }, {
    "protocol": "6",
    "source": "0.0.0.0/0",
    "tcpOptions": {
      "destinationPortRange": {
        "min": 443,
        "max": 443
      }
    }
  }]'
```

### Load Balancer

```bash
# Create load balancer
oci lb load-balancer create \
  --compartment-id <compartment-ocid> \
  --display-name my-lb \
  --shape-name flexible \
  --subnet-ids '["<subnet-ocid>"]' \
  --is-private false

# Create backend set
oci lb backend-set create \
  --load-balancer-id <lb-ocid> \
  --name backend-set \
  --policy ROUND_ROBIN \
  --health-checker-protocol HTTP \
  --health-checker-port 80 \
  --health-checker-url-path /

# Add backend
oci lb backend create \
  --load-balancer-id <lb-ocid> \
  --backend-set-name backend-set \
  --ip-address <instance-private-ip> \
  --port 80
```

## Container Services

### OKE (Oracle Kubernetes Engine)

```bash
# Create cluster
oci ce cluster create \
  --compartment-id <compartment-ocid> \
  --name my-cluster \
  --vcn-id <vcn-ocid> \
  --kubernetes-version v1.28.2

# Create node pool
oci ce node-pool create \
  --cluster-id <cluster-ocid> \
  --compartment-id <compartment-ocid> \
  --name my-node-pool \
  --node-shape VM.Standard.E4.Flex \
  --node-shape-config '{"ocpus": 2, "memoryInGBs": 16}' \
  --size 3 \
  --subnet-ids '["<subnet-ocid>"]'

# Get kubeconfig
oci ce cluster create-kubeconfig \
  --cluster-id <cluster-ocid> \
  --file ~/.kube/config

# Verify
kubectl get nodes
```

### Container Registry (OCIR)

```bash
# Login to registry
docker login <region-code>.ocir.io \
  -u '<tenancy-namespace>/<username>' \
  -p '<auth-token>'

# Tag image
docker tag myapp:latest <region-code>.ocir.io/<tenancy-namespace>/myapp:latest

# Push image
docker push <region-code>.ocir.io/<tenancy-namespace>/myapp:latest

# Pull image
docker pull <region-code>.ocir.io/<tenancy-namespace>/myapp:latest
```

## Functions (Serverless)

### Creating Function

```bash
# Install Fn CLI
curl -LSs https://raw.githubusercontent.com/fnproject/cli/master/install | sh

# Configure context
fn create context oci --provider oracle
fn use context oci

# Update context
fn update context oracle.compartment-id <compartment-ocid>
fn update context api-url https://functions.<region>.oci.oraclecloud.com
fn update context registry <region-code>.ocir.io/<tenancy-namespace>/functions

# Create application
fn create app myapp --annotation oracle.com/oci/subnetIds='["<subnet-ocid>"]'

# Create function
fn init --runtime python myfunc
cd myfunc

# Deploy
fn deploy --app myapp

# Invoke
fn invoke myapp myfunc
```

## Resource Manager (Terraform)

### Creating Stack

```hcl
# main.tf
terraform {
  required_providers {
    oci = {
      source = "oracle/oci"
    }
  }
}

provider "oci" {
  region = "us-ashburn-1"
}

resource "oci_core_instance" "web" {
  availability_domain = data.oci_identity_availability_domain.ad.name
  compartment_id      = var.compartment_id
  display_name        = "web-server"
  shape               = "VM.Standard.E2.1.Micro"
  
  create_vnic_details {
    subnet_id        = oci_core_subnet.subnet.id
    assign_public_ip = true
  }
  
  source_details {
    source_type = "image"
    source_id   = var.instance_image_id
  }
  
  metadata = {
    ssh_authorized_keys = file("~/.ssh/id_rsa.pub")
  }
}
```

### Deploy via Resource Manager

```bash
# Create stack
oci resource-manager stack create \
  --compartment-id <compartment-ocid> \
  --display-name my-stack \
  --config-source terraform-config.zip

# Plan
oci resource-manager job create-plan-job \
  --stack-id <stack-ocid>

# Apply
oci resource-manager job create-apply-job \
  --stack-id <stack-ocid>
```

## Monitoring and Logging

### Metrics

```bash
# Query metrics
oci monitoring metric-data summarize-metrics-data \
  --compartment-id <compartment-ocid> \
  --namespace oci_computeagent \
  --query-text 'CpuUtilization[1m].mean()' \
  --start-time 2026-01-18T00:00:00Z \
  --end-time 2026-01-18T23:59:59Z
```

### Creating Alarms

```bash
# Create alarm
oci monitoring alarm create \
  --compartment-id <compartment-ocid> \
  --display-name cpu-alarm \
  --destinations '["<topic-ocid>"]' \
  --is-enabled true \
  --metric-compartment-id <compartment-ocid> \
  --namespace oci_computeagent \
  --query 'CpuUtilization[1m].mean() > 80' \
  --severity INFO
```

### Logging

```bash
# Enable logging
oci logging log create \
  --compartment-id <compartment-ocid> \
  --log-group-id <log-group-ocid> \
  --display-name instance-logs \
  --log-type SERVICE \
  --configuration '{
    "source": {
      "sourceType": "OCISERVICE",
      "service": "compute",
      "resource": "<instance-ocid>",
      "category": "cloudagent"
    }
  }'
```

## Cost Management

### Budget Alerts

```bash
# Create budget
oci budgets budget create \
  --compartment-id <tenancy-ocid> \
  --amount 100 \
  --reset-period MONTHLY \
  --target-type COMPARTMENT \
  --targets '["<compartment-ocid>"]'

# Create alert rule
oci budgets alert-rule create \
  --budget-id <budget-ocid> \
  --type ACTUAL \
  --threshold 80 \
  --threshold-type PERCENTAGE
```

## Best Practices

### Security

- Use IAM policies with least privilege
- Enable MFA for all users
- Use compartments to organize resources
- Implement network security groups (NSGs)
- Enable audit logging
- Use Vault for secrets management
- Regular security audits
- Encrypt data at rest and in transit

### Performance

- Choose appropriate shapes for workloads
- Use autoscaling for compute instances
- Leverage Autonomous Database auto-scaling
- Implement caching strategies
- Use FastConnect for hybrid cloud
- Optimize database queries
- Monitor performance metrics

### Cost Optimization

- Use Always Free resources for dev/test
- Right-size compute instances
- Delete unused resources
- Use preemptible instances for batch jobs
- Implement auto-scaling
- Monitor spending with budgets
- Use committed use discounts

## Troubleshooting

### Instance Not Accessible

```bash
# Check instance status
oci compute instance get --instance-id <instance-ocid>

# Check security list
oci network security-list get --security-list-id <security-list-ocid>

# View console connection
oci compute instance-console-connection create \
  --instance-id <instance-ocid>
```

### Database Connection Issues

```bash
# Verify database state
oci db autonomous-database get --autonomous-database-id <adb-ocid>

# Check network access
# Ensure wallet is configured correctly
# Verify admin password
```

## Resources

- [OCI Documentation](https://docs.oracle.com/en-us/iaas/Content/home.htm)
- [OCI CLI Reference](https://docs.oracle.com/en-us/iaas/tools/oci-cli/latest/oci_cli_docs/)
- [Terraform Provider](https://registry.terraform.io/providers/oracle/oci/latest/docs)
- [Cloud Free Tier](https://www.oracle.com/cloud/free/)
- [Learning Library](https://apexapps.oracle.com/pls/apex/f?p=44785:1)
- [Community Forums](https://cloudcustomerconnect.oracle.com/)

## Next Steps

- Explore Always Free Tier
- Deploy Autonomous Database
- Create OKE cluster
- Implement CI/CD with DevOps service
- Set up monitoring and alerts
- Configure backup strategies
- Explore Oracle APEX for rapid development
- Integrate with on-premises systems

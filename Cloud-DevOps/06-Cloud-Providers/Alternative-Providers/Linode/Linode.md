# Linode (Akamai Cloud Computing)

## Introduction

### What is Linode?

Linode, now part of Akamai Connected Cloud, is a cloud infrastructure provider offering virtual private servers (VPS), Kubernetes, object storage, and other cloud services. Known for simplicity, transparent pricing, and excellent performance, Linode provides developers with powerful tools to deploy and scale applications globally.

**Note**: In 2022, Linode was acquired by Akamai and is now part of Akamai Connected Cloud, combining Linode's compute capabilities with Akamai's global CDN and security services.

### Why Linode?

- Simple, predictable pricing
- High-performance SSD storage
- 11 global data centers
- Easy-to-use interface
- Excellent documentation
- 99.9% uptime SLA
- Hourly and monthly billing
- Root access to all servers
- Strong community support
- Integration with Akamai CDN

## Prerequisites

- Credit card or PayPal account
- Basic Linux knowledge
- Understanding of networking concepts
- SSH client

## Getting Started

### Create Account

1. Visit [linode.com](https://www.linode.com/)
2. Sign up with email
3. Verify email
4. Add payment method
5. Get $100 credit (varies by promotion)

### Pricing Overview

```
Shared CPU:
- Nanode 1GB: $5/month ($0.0075/hour)
- Linode 2GB: $12/month
- Linode 4GB: $24/month
- Linode 8GB: $48/month

Dedicated CPU:
- 4GB: $36/month
- 8GB: $72/month
- 16GB: $144/month

High Memory:
- 24GB: $60/month
- 48GB: $120/month
```

## Creating a Linode

### Via Cloud Manager (Web UI)

```
1. Click "Create" → "Linode"
2. Choose distribution (Ubuntu, Debian, CentOS, etc.)
3. Select region (Newark, London, Singapore, etc.)
4. Choose plan (Shared CPU, Dedicated CPU, High Memory)
5. Add SSH key or root password
6. Optional: Add tags, backups
7. Click "Create Linode"
```

### Via Linode CLI

```bash
# Install CLI
pip3 install linode-cli

# Configure
linode-cli configure

# Create Linode
linode-cli linodes create \
  --type g6-nanode-1 \
  --region us-east \
  --image linode/ubuntu22.04 \
  --root_pass 'SecurePassword123!' \
  --label my-server
```

### Via API

```bash
curl -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -X POST -d '{
    "type": "g6-nanode-1",
    "region": "us-east",
    "image": "linode/ubuntu22.04",
    "root_pass": "SecurePassword123!",
    "label": "my-server",
    "tags": ["production"]
  }' \
  https://api.linode.com/v4/linode/instances
```

## Connecting to Your Linode

### SSH Connection

```bash
# Using password
ssh root@<linode-ip>

# Using SSH key (recommended)
ssh -i ~/.ssh/id_rsa root@<linode-ip>

# Via Lish (Linode Shell - emergency console)
# Available in Cloud Manager
```

### Initial Server Setup

```bash
# Update system
apt update && apt upgrade -y

# Create non-root user
adduser myuser
usermod -aG sudo myuser

# Setup SSH key for new user
mkdir -p /home/myuser/.ssh
cp ~/.ssh/authorized_keys /home/myuser/.ssh/
chown -R myuser:myuser /home/myuser/.ssh
chmod 700 /home/myuser/.ssh
chmod 600 /home/myuser/.ssh/authorized_keys

# Disable root login
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart sshd

# Setup firewall
ufw allow OpenSSH
ufw enable
```

## Linode Kubernetes Engine (LKE)

### Creating a Cluster

```bash
# Via CLI
linode-cli lke cluster-create \
  --label my-cluster \
  --region us-east \
  --k8s_version 1.28

# Add node pool
linode-cli lke pool-create <cluster-id> \
  --type g6-standard-2 \
  --count 3
```

### Accessing Cluster

```bash
# Download kubeconfig
linode-cli lke kubeconfig-view <cluster-id> --json | \
  jq -r '.[0].kubeconfig' | base64 -d > ~/.kube/config

# Verify connection
kubectl get nodes

# Deploy application
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=LoadBalancer
```

## Object Storage

### Creating Bucket

```bash
# Via CLI
linode-cli object-storage buckets create my-bucket --cluster us-east-1

# Generate access keys
linode-cli object-storage keys-create --label my-access-key
```

### Using with s3cmd

```bash
# Install s3cmd
apt install s3cmd

# Configure
s3cmd --configure
# Enter Linode access key and secret
# Host: us-east-1.linodeobjects.com

# Upload file
s3cmd put file.txt s3://my-bucket/

# List files
s3cmd ls s3://my-bucket/

# Download file
s3cmd get s3://my-bucket/file.txt

# Set public ACL
s3cmd setacl s3://my-bucket/file.txt --acl-public
```

### Using AWS SDK

```python
import boto3

s3 = boto3.client('s3',
    endpoint_url='https://us-east-1.linodeobjects.com',
    aws_access_key_id='YOUR_ACCESS_KEY',
    aws_secret_access_key='YOUR_SECRET_KEY'
)

# Upload file
s3.upload_file('local.txt', 'my-bucket', 'remote.txt')

# Download file
s3.download_file('my-bucket', 'remote.txt', 'downloaded.txt')

# List objects
response = s3.list_objects_v2(Bucket='my-bucket')
for obj in response['Contents']:
    print(obj['Key'])
```

## Block Storage (Volumes)

### Creating Volume

```bash
# Via CLI
linode-cli volumes create \
  --label my-volume \
  --size 20 \
  --region us-east

# Attach to Linode
linode-cli volumes attach <volume-id> --linode_id <linode-id>
```

### Mounting Volume

```bash
# Find device
lsblk

# Create filesystem (first time only)
mkfs.ext4 /dev/sdc

# Create mount point
mkdir /mnt/my-volume

# Mount volume
mount /dev/sdc /mnt/my-volume

# Auto-mount on boot
echo '/dev/sdc /mnt/my-volume ext4 defaults 0 2' >> /etc/fstab
```

## Networking

### Private IP

```bash
# Add private IP via Cloud Manager
1. Linode Details → Networking
2. Add Private IP

# Configure in Linux
# /etc/network/interfaces (Debian/Ubuntu)
auto eth0:1
iface eth0:1 inet static
    address 192.168.x.x/17
```

### VLANs

```bash
# Create VLAN
linode-cli linodes config-create <linode-id> \
  --vlan_label my-vlan

# Attach multiple Linodes to same VLAN for private networking
```

### NodeBalancers (Load Balancers)

```bash
# Create NodeBalancer
linode-cli nodebalancers create \
  --label my-balancer \
  --region us-east

# Add configuration
linode-cli nodebalancers config-create <nodebalancer-id> \
  --protocol http \
  --port 80 \
  --algorithm roundrobin

# Add nodes
linode-cli nodebalancers node-create <nodebalancer-id> <config-id> \
  --address <linode-private-ip>:80 \
  --label web-1 \
  --weight 100
```

## Backups

### Enable Backups

```bash
# Via CLI
linode-cli linodes backups-enable <linode-id>

# Costs 25% of Linode price
# Automatic daily, weekly, and bi-weekly backups
# 3 manual snapshot slots
```

### Restore from Backup

```bash
# List backups
linode-cli linodes backups-list <linode-id>

# Restore
linode-cli linodes backup-restore <linode-id> <backup-id>
```

### Manual Snapshots

```bash
# Create snapshot
linode-cli linodes snapshot <linode-id> --label "before-update"
```

## Images (Custom Images)

### Create Custom Image

```bash
# From existing Linode disk
linode-cli images create \
  --label my-custom-image \
  --disk_id <disk-id>

# Upload image
linode-cli image-upload \
  --label my-image \
  --region us-east \
  --file /path/to/image.img.gz
```

### Deploy from Custom Image

```bash
linode-cli linodes create \
  --type g6-nanode-1 \
  --region us-east \
  --image private/<image-id> \
  --root_pass 'Password123!'
```

## Firewalls

### Create Cloud Firewall

```bash
# Via CLI
linode-cli firewalls create \
  --label my-firewall \
  --rules.inbound '[
    {
      "action": "ACCEPT",
      "protocol": "TCP",
      "ports": "22",
      "addresses": {"ipv4": ["0.0.0.0/0"]}
    },
    {
      "action": "ACCEPT",
      "protocol": "TCP",
      "ports": "80,443",
      "addresses": {"ipv4": ["0.0.0.0/0"]}
    }
  ]' \
  --rules.outbound '[
    {
      "action": "ACCEPT",
      "protocol": "TCP",
      "ports": "1-65535",
      "addresses": {"ipv4": ["0.0.0.0/0"]}
    }
  ]'

# Attach to Linode
linode-cli firewalls device-create <firewall-id> \
  --id <linode-id> \
  --type linode
```

## DNS Management

### Add Domain

```bash
# Via CLI
linode-cli domains create \
  --domain example.com \
  --type master \
  --soa_email admin@example.com
```

### Add DNS Records

```bash
# A record
linode-cli domains records-create <domain-id> \
  --type A \
  --name www \
  --target 192.0.2.1

# CNAME record
linode-cli domains records-create <domain-id> \
  --type CNAME \
  --name blog \
  --target www.example.com

# MX record
linode-cli domains records-create <domain-id> \
  --type MX \
  --target mail.example.com \
  --priority 10
```

## StackScripts (Deployment Scripts)

### Create StackScript

```bash
#!/bin/bash

# Update system
apt update && apt upgrade -y

# Install NGINX
apt install -y nginx

# Start NGINX
systemctl start nginx
systemctl enable nginx

# Setup firewall
ufw allow 'Nginx Full'
ufw enable
```

### Deploy with StackScript

```bash
linode-cli linodes create \
  --type g6-nanode-1 \
  --region us-east \
  --image linode/ubuntu22.04 \
  --root_pass 'Password123!' \
  --stackscript_id <stackscript-id>
```

## One-Click Apps (Marketplace)

```
Available apps:
- WordPress
- Docker
- GitLab
- Minecraft
- cPanel
- Plesk
- LAMP Stack
- MEAN Stack
- WooCommerce
- Nextcloud
- And many more...

Deploy via: Create → Marketplace
```

## Monitoring & Alerts

### Enable Monitoring

```bash
# Automatically enabled for all Linodes
# Metrics available:
- CPU usage
- Network traffic (in/out)
- Disk I/O

# View via Cloud Manager or API
linode-cli linodes stats <linode-id>
```

### Create Alerts

```bash
# CPU alert
linode-cli linodes update <linode-id> \
  --alerts.cpu 90

# Network transfer alert  
linode-cli linodes update <linode-id> \
  --alerts.transfer_quota 80
```

## Terraform Integration

### Provider Configuration

```hcl
terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "~> 2.0"
    }
  }
}

provider "linode" {
  token = var.linode_token
}

resource "linode_instance" "web" {
  label      = "web-server"
  region     = "us-east"
  type       = "g6-nanode-1"
  image      = "linode/ubuntu22.04"
  root_pass  = var.root_pass
  
  tags = ["production", "web"]
}

resource "linode_firewall" "web_firewall" {
  label = "web-firewall"
  
  inbound {
    label    = "allow-http"
    action   = "ACCEPT"
    protocol = "TCP"
    ports    = "80"
    ipv4     = ["0.0.0.0/0"]
  }
  
  inbound {
    label    = "allow-https"
    action   = "ACCEPT"
    protocol = "TCP"
    ports    = "443"
    ipv4     = ["0.0.0.0/0"]
  }
  
  linodes = [linode_instance.web.id]
}
```

## Ansible Integration

```yaml
# playbook.yml
---
- name: Deploy to Linode
  hosts: linode_servers
  become: yes
  
  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes
    
    - name: Install NGINX
      apt:
        name: nginx
        state: present
    
    - name: Start NGINX
      service:
        name: nginx
        state: started
        enabled: yes
```

## Best Practices

### Security

- Always use SSH keys instead of passwords
- Disable root login
- Enable firewall (UFW or Cloud Firewall)
- Keep system updated
- Use strong passwords for any services
- Enable 2FA on Linode account
- Use private IPs for inter-Linode communication
- Regular backups

### Performance

- Choose region closest to users
- Use appropriate instance size
- Enable HTTP/2 and Brotli compression
- Implement caching (Varnish, Redis)
- Use CDN for static assets (Akamai)
- Monitor resource usage
- Optimize databases

### Cost Optimization

- Right-size your instances
- Use shared CPU for dev/staging
- Delete unused volumes and images
- Leverage hourly billing for testing
- Use Object Storage for large files
- Monitor bandwidth usage

## Troubleshooting

### Cannot SSH to Linode

```bash
# Check Linode status in Cloud Manager
# Use Lish console for emergency access
# Verify firewall rules
# Check SSH daemon status via Lish:
systemctl status sshd
```

### High CPU Usage

```bash
# Check top processes
top
htop

# Identify resource-intensive processes
ps aux --sort=-%cpu | head

# Check for malware
apt install chkrootkit
chkrootkit
```

### Disk Space Full

```bash
# Check disk usage
df -h

# Find large directories
du -h --max-depth=1 / | sort -hr | head -20

# Clean package cache
apt clean
apt autoremove
```

## Migration from Other Providers

### From AWS/DigitalOcean

```bash
# Create snapshot/image on source
# Download image
# Upload to Linode Object Storage
# Use custom image upload
linode-cli image-upload \
  --label migrated-server \
  --region us-east \
  --file server-snapshot.img.gz
```

## Resources

- [Linode Docs](https://www.linode.com/docs/)
- [API Documentation](https://www.linode.com/docs/api/)
- [Community Q&A](https://www.linode.com/community/questions/)
- [YouTube Guides](https://www.youtube.com/linode)
- [Status Page](https://status.linode.com/)
- [Blog](https://www.linode.com/blog/)

## Next Steps

- Deploy your first Linode
- Set up automated backups
- Configure Cloud Firewall
- Try Kubernetes Engine (LKE)
- Implement monitoring
- Explore One-Click Apps
- Integrate with CI/CD
- Set up Object Storage


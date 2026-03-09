# Kubernetes (kubectl) Cheat Sheet

> **Quick reference for essential Kubernetes commands**

---

## 🚀 Quick Start

### Setup and Configuration

```bash
# Check kubectl version
kubectl version --client

# View cluster info
kubectl cluster-info

# View cluster configuration
kubectl config view

# Get current context
kubectl config current-context

# List all contexts
kubectl config get-contexts

# Switch context
kubectl config use-context my-context

# Set default namespace
kubectl config set-context --current --namespace=my-namespace
```

---

## 📦 Pods

### Creating and Running

```bash
# Run a pod
kubectl run nginx --image=nginx

# Run pod with specific command
kubectl run busybox --image=busybox --command -- sleep 3600

# Run pod interactively
kubectl run -it busybox --image=busybox -- /bin/sh

# Run pod and expose port
kubectl run nginx --image=nginx --port=80

# Run pod with environment variables
kubectl run myapp --image=myapp --env="ENV=production"

# Create from YAML
kubectl apply -f pod.yaml

# Create from URL
kubectl apply -f https://example.com/pod.yaml
```

### Listing and Viewing

```bash
# List all pods
kubectl get pods

# List pods in all namespaces
kubectl get pods --all-namespaces
kubectl get pods -A

# List with more details
kubectl get pods -o wide

# List with labels
kubectl get pods --show-labels

# Filter by label
kubectl get pods -l app=nginx

# Watch pods
kubectl get pods --watch
kubectl get pods -w

# Get pod YAML
kubectl get pod my-pod -o yaml

# Get pod JSON
kubectl get pod my-pod -o json
```

### Inspecting Pods

```bash
# Describe pod
kubectl describe pod my-pod

# View pod logs
kubectl logs my-pod

# Follow logs
kubectl logs -f my-pod

# Logs from previous container
kubectl logs my-pod --previous

# Logs for specific container
kubectl logs my-pod -c my-container

# Tail last 100 lines
kubectl logs my-pod --tail=100

# Logs since 1 hour
kubectl logs my-pod --since=1h
```

### Interacting with Pods

```bash
# Execute command
kubectl exec my-pod -- ls /app

# Interactive shell
kubectl exec -it my-pod -- /bin/bash

# Execute in specific container
kubectl exec -it my-pod -c my-container -- /bin/sh

# Copy files to pod
kubectl cp /local/path my-pod:/remote/path

# Copy files from pod
kubectl cp my-pod:/remote/path /local/path

# Port forward
kubectl port-forward my-pod 8080:80

# Port forward in background
kubectl port-forward my-pod 8080:80 &
```

### Deleting Pods

```bash
# Delete pod
kubectl delete pod my-pod

# Delete pod immediately
kubectl delete pod my-pod --grace-period=0 --force

# Delete pods by label
kubectl delete pods -l app=nginx

# Delete all pods in namespace
kubectl delete pods --all

# Delete from YAML
kubectl delete -f pod.yaml
```

---

## 🚀 Deployments

### Creating Deployments

```bash
# Create deployment
kubectl create deployment nginx --image=nginx

# Create deployment with replicas
kubectl create deployment nginx --image=nginx --replicas=3

# Create from YAML
kubectl apply -f deployment.yaml

# Create and record change
kubectl create deployment nginx --image=nginx --record

# Set image
kubectl set image deployment/nginx nginx=nginx:1.21
```

### Managing Deployments

```bash
# List deployments
kubectl get deployments
kubectl get deploy

# Describe deployment
kubectl describe deployment nginx

# Get deployment YAML
kubectl get deployment nginx -o yaml

# Edit deployment
kubectl edit deployment nginx

# Scale deployment
kubectl scale deployment nginx --replicas=5

# Autoscale deployment
kubectl autoscale deployment nginx --min=2 --max=10 --cpu-percent=80
```

### Rolling Updates

```bash
# Update image
kubectl set image deployment/nginx nginx=nginx:1.21

# Update with new YAML
kubectl apply -f deployment-v2.yaml

# View rollout status
kubectl rollout status deployment/nginx

# View rollout history
kubectl rollout history deployment/nginx

# Rollback to previous version
kubectl rollout undo deployment/nginx

# Rollback to specific revision
kubectl rollout undo deployment/nginx --to-revision=2

# Pause rollout
kubectl rollout pause deployment/nginx

# Resume rollout
kubectl rollout resume deployment/nginx

# Restart deployment
kubectl rollout restart deployment/nginx
```

### Deleting Deployments

```bash
# Delete deployment
kubectl delete deployment nginx

# Delete deployment and services
kubectl delete deployment,svc nginx

# Delete from YAML
kubectl delete -f deployment.yaml
```

---

## 🌐 Services

### Creating Services

```bash
# Expose deployment
kubectl expose deployment nginx --port=80 --target-port=80

# Create ClusterIP service
kubectl expose deployment nginx --type=ClusterIP --port=80

# Create NodePort service
kubectl expose deployment nginx --type=NodePort --port=80

# Create LoadBalancer service
kubectl expose deployment nginx --type=LoadBalancer --port=80

# Create from YAML
kubectl apply -f service.yaml
```

### Managing Services

```bash
# List services
kubectl get services
kubectl get svc

# Describe service
kubectl describe service nginx

# Get service endpoints
kubectl get endpoints nginx

# Get service URL (Minikube)
minikube service nginx --url

# Delete service
kubectl delete service nginx
```

---

## 📝 ConfigMaps and Secrets

### ConfigMaps

```bash
# Create from literal
kubectl create configmap my-config --from-literal=key1=value1

# Create from file
kubectl create configmap my-config --from-file=config.txt

# Create from directory
kubectl create configmap my-config --from-file=config-dir/

# Create from YAML
kubectl apply -f configmap.yaml

# List configmaps
kubectl get configmaps
kubectl get cm

# Describe configmap
kubectl describe configmap my-config

# View configmap data
kubectl get configmap my-config -o yaml

# Delete configmap
kubectl delete configmap my-config
```

### Secrets

```bash
# Create generic secret
kubectl create secret generic my-secret --from-literal=password=secret123

# Create from file
kubectl create secret generic my-secret --from-file=ssh-privatekey=~/.ssh/id_rsa

# Create TLS secret
kubectl create secret tls tls-secret --cert=cert.pem --key=key.pem

# Create Docker registry secret
kubectl create secret docker-registry regcred \
  --docker-server=myregistry.com \
  --docker-username=user \
  --docker-password=pass \
  --docker-email=user@email.com

# List secrets
kubectl get secrets

# Describe secret (doesn't show values)
kubectl describe secret my-secret

# View secret data (base64 encoded)
kubectl get secret my-secret -o yaml

# Decode secret
kubectl get secret my-secret -o jsonpath='{.data.password}' | base64 --decode

# Delete secret
kubectl delete secret my-secret
```

---

## 💾 Persistent Volumes

### Persistent Volume Claims

```bash
# List PVCs
kubectl get pvc

# Describe PVC
kubectl describe pvc my-pvc

# Create PVC
kubectl apply -f pvc.yaml

# Delete PVC
kubectl delete pvc my-pvc
```

### Persistent Volumes

```bash
# List PVs
kubectl get pv

# Describe PV
kubectl describe pv my-pv

# Delete PV
kubectl delete pv my-pv
```

---

## 📦 Namespaces

```bash
# List namespaces
kubectl get namespaces
kubectl get ns

# Create namespace
kubectl create namespace dev

# Delete namespace
kubectl delete namespace dev

# Set default namespace
kubectl config set-context --current --namespace=dev

# Get resources from specific namespace
kubectl get pods -n dev

# Get resources from all namespaces
kubectl get pods --all-namespaces
kubectl get pods -A
```

---

## 🏷️ Labels and Selectors

```bash
# Add label
kubectl label pod my-pod env=production

# Update label
kubectl label pod my-pod env=staging --overwrite

# Remove label
kubectl label pod my-pod env-

# Show labels
kubectl get pods --show-labels

# Filter by label
kubectl get pods -l env=production

# Multiple label selectors
kubectl get pods -l 'env=production,tier=frontend'

# Label selector with inequality
kubectl get pods -l 'env!=production'

# Label all pods
kubectl label pods --all env=production
```

---

## 🔍 Resource Usage

```bash
# View node resource usage
kubectl top nodes

# View pod resource usage
kubectl top pods

# View pod usage in namespace
kubectl top pods -n kube-system

# View pod resource usage sorted by CPU
kubectl top pods --sort-by=cpu

# View pod resource usage sorted by memory
kubectl top pods --sort-by=memory

# View container resource usage
kubectl top pod my-pod --containers
```

---

## 🐛 Debugging

### Cluster Debugging

```bash
# Check cluster components
kubectl get componentstatuses
kubectl get cs

# View cluster events
kubectl get events

# View events sorted by timestamp
kubectl get events --sort-by=.metadata.creationTimestamp

# View events for specific namespace
kubectl get events -n kube-system

# Describe node
kubectl describe node my-node
``

### Pod Debugging

```bash
# Common debugging steps:

# 1. Check pod status
kubectl get pods

# 2. Describe pod for events
kubectl describe pod my-pod

# 3. Check logs
kubectl logs my-pod

# 4. Check previous logs (if crashed)
kubectl logs my-pod --previous

# 5. Execute commands
kubectl exec my-pod -- env
kubectl exec my-pod -- cat /etc/resolv.conf

# 6. Interactive debugging
kubectl exec -it my-pod -- /bin/bash

# 7. Port forward to test locally
kubectl port-forward my-pod 8080:80

# 8. Create debug pod
kubectl run debug --image=busybox -it --rm -- /bin/sh

# 9. Check resource limits
kubectl describe pod my-pod | grep -A 5 Limits
```

### Common Issues

**ImagePullBackOff:**
```bash
kubectl describe pod my-pod
# Check image name, registry credentials
```

**CrashLoopBackOff:**
```bash
kubectl logs my-pod --previous
# Check application logs, readiness/liveness probes
```

**Pending:**
```bash
kubectl describe pod my-pod
# Check resource requests, node selectors, PVC binding
```

**OOMKilled:**
```bash
kubectl describe pod my-pod
# Increase memory limits
```

---

## 🔧 Advanced Commands

### Apply and Diff

```bash
# Apply with validation
kubectl apply -f deployment.yaml --validate=true

# Dry run (client-side)
kubectl apply -f deployment.yaml --dry-run=client

# Dry run (server-side)
kubectl apply -f deployment.yaml --dry-run=server

# Show diff before apply
kubectl diff -f deployment.yaml

# Apply all YAML files in directory
kubectl apply -f ./manifests/

# Apply recursively
kubectl apply -f ./manifests/ --recursive
```

### JSON Path Queries

```bash
# Get pod names
kubectl get pods -o jsonpath='{.items[*].metadata.name}'

# Get pod IPs
kubectl get pods -o jsonpath='{.items[*].status.podIP}'

# Get image names
kubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'

# Custom columns
kubectl get pods -o custom-columns=NAME:.metadata.name,STATUS:.status.phase

# Get secret value
kubectl get secret my-secret -o jsonpath='{.data.password}' | base64 --decode
```

### Resource Management

```bash
# Get API resources
kubectl api-resources

# Get API versions
kubectl api-versions

# Explain resource
kubectl explain pod
kubectl explain pod.spec
kubectl explain pod.spec.containers

# Get resource definitions
kubectl get pod my-pod -o yaml
kubectl get pod my-pod -o json
```

---

## 📊 Useful Aliases

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Basic shortcuts
alias k='kubectl'
alias kg='kubectl get'
alias kd='kubectl describe'
alias kdel='kubectl delete'
alias kl='kubectl logs'
alias kex='kubectl exec -it'

# Pod shortcuts
alias kgp='kubectl get pods'
alias kdp='kubectl describe pod'
alias kdelp='kubectl delete pod'

# Deployment shortcuts
alias kgd='kubectl get deployments'
alias kdd='kubectl describe deployment'
alias kdeld='kubectl delete deployment'

# Service shortcuts
alias kgs='kubectl get services'
alias kds='kubectl describe service'
alias kdels='kubectl delete service'

# Namespace shortcuts
alias kgns='kubectl get namespaces'
alias kcn='kubectl config set-context --current --namespace'

# Logs
alias kl='kubectl logs'
alias klf='kubectl logs -f'

# Context
alias kctx='kubectl config current-context'
alias kctxs='kubectl config get-contexts'
```

---

## 🔐 Security Best Practices

✅ **Use RBAC**
```bash
kubectl create role pod-reader --verb=get --verb=list --resource=pods
kubectl create rolebinding read-pods --role=pod-reader --user=jane
```

✅ **Use Network Policies**
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

✅ **Use Pod Security Policies/Standards**
✅ **Don't run as root**
✅ **Use resource limits**
✅ **Scan images for vulnerabilities**
✅ **Use secrets, not ConfigMaps for sensitive data**

---

## 📚 Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [kubectl Reference](https://kubernetes.io/docs/reference/kubectl/)
- [Kubernetes API Reference](https://kubernetes.io/docs/reference/)
- [kubectl Cheat Sheet (Official)](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

---

**Need more help?**  
👉 Check the [Kubernetes Guide](../04-Containerization/Orchestration/Kubernetes/)

---

*Last Updated: 2026-01-20*  
*Part of the Cloud-DevOps Complete Guide*

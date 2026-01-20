# Cloud & DevOps - Complete Guide

> **The comprehensive resource for modern DevOps practices, cloud platforms, and infrastructure automation**

---

## 🎯 Quick Navigation

- [Overview](#-overview)
- [DevOps Lifecycle](#-devops-lifecycle)
- [Categories](#-categories)
- [Getting Started](#-getting-started)
- [Learning Paths](#-learning-paths)
- [Popular Stacks](#-popular-stacks)
- [Quick Reference](#-quick-reference)

---

## 📋 Overview

Welcome to the **Cloud & DevOps** section of RunexisForge! This comprehensive guide covers everything you need to master modern DevOps practices, cloud platforms, and infrastructure automation.

### What You'll Find Here

- **58+ Tools & Platforms** - Industry-standard DevOps tools
- **13 Organized Categories** - Logical organization by DevOps lifecycle
- **Complete Learning Paths** - From beginner to advanced
- **Real-World Projects** - Production-ready examples
- **Best Practices** - Industry-proven approaches
- **Comprehensive Cheat Sheets** - Quick reference guides

---

## 🔄 DevOps Lifecycle

The DevOps lifecycle consists of continuous phases that enable rapid, reliable software delivery:

```
┌─────────────────────────────────────────────────────────────┐
│                    DevOps Lifecycle                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐     │
│  │ PLAN │──▶│ CODE │──▶│BUILD │──▶│ TEST │──▶│RELEASE│     │
│  └──────┘   └──────┘   └──────┘   └──────┘   └──────┘     │
│      ▲                                             │         │
│      │         ┌──────┐   ┌──────┐   ┌──────┐    │         │
│      └─────────│MONITOR│◀──│OPERATE│◀──│DEPLOY│◀───┘         │
│                └──────┘   └──────┘   └──────┘              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Lifecycle Stages

1. **PLAN** → Project management, collaboration (Agile, Scrum, Kanban)
2. **CODE** → Version control, code review ([Git](#01-version-control), [GitHub](#01-version-control))
3. **BUILD** → Compilation, dependency management ([Maven](#02-build-tools), [Gradle](#02-build-tools))
4. **TEST** → Automated testing, quality assurance
5. **RELEASE** → CI/CD pipelines ([Jenkins](#03-ci-cd), [GitHub Actions](#03-ci-cd))
6. **DEPLOY** → Infrastructure provisioning ([Docker](#04-containerization), [Kubernetes](#04-containerization), [Terraform](#05-infrastructure-as-code))
7. **OPERATE** → Runtime management, scaling
8. **MONITOR** → Logging, metrics, alerting ([Prometheus](#07-monitoring-observability), [Grafana](#07-monitoring-observability))

📚 **[Read the complete DevOps Lifecycle Guide →](./DEVOPS-LIFECYCLE.md)**

---

## 📁 Categories

### 01. [Version Control](./01-Version-Control/)
Foundation of modern software development - track changes, collaborate, manage code history.

**Tools Included:**
- **[Git](./01-Version-Control/Git/)** - Distributed version control system
- **Platforms:**
  - [GitHub](./01-Version-Control/Platforms/GitHub/) - Most popular Git platform
  - [GitLab](./01-Version-Control/Platforms/GitLab/) - Complete DevOps platform
  - [BitBucket](./01-Version-Control/Platforms/BitBucket/) - Atlassian's Git solution

**Start here if:** You're new to version control or collaborative development

---

### 02. [Build Tools](./02-Build-Tools/)
Compile code, manage dependencies, automate build processes.

**General Purpose:**
- [Make](./02-Build-Tools/General-Purpose/Make/) - Classic build automation
- [Bazel](./02-Build-Tools/General-Purpose/Bazel/) - Google's build system
- [CMake](./02-Build-Tools/General-Purpose/CMake/) - Cross-platform build tool

**JVM Ecosystem:**
- [Maven](./02-Build-Tools/JVM-Ecosystem/Maven/) - Standard Java build tool
- [Gradle](./02-Build-Tools/JVM-Ecosystem/Gradle/) - Modern, flexible build system

---

### 03. [CI/CD](./03-CI-CD/)
Automate testing, building, and deployment pipelines for rapid delivery.

**Platform-Integrated:**
- [GitHub Actions](./03-CI-CD/Platform-Integrated/GitHub-Actions/) - Native GitHub CI/CD
- [Azure DevOps Pipelines](./03-CI-CD/Platform-Integrated/AzureDevOpsPipelines/) - Microsoft's CI/CD

**Self-Hosted:**
- [Jenkins](./03-CI-CD/Self-Hosted/JenKins/) - Industry-standard automation server
- [Drone CI](./03-CI-CD/Self-Hosted/DroneCI/) - Container-native CI
- [Tekton](./03-CI-CD/Self-Hosted/Tekton/) - Kubernetes-native CI/CD

**Cloud-Based:**
- [CircleCI](./03-CI-CD/Cloud-Based/CircleCI/) - Cloud CI/CD platform
- [Travis CI](./03-CI-CD/Cloud-Based/TravisCI/) - Continuous integration service

**GitOps:**
- [ArgoCD](./03-CI-CD/GitOps/ArgoCD/) - Declarative GitOps for Kubernetes
- [Flux](./03-CI-CD/GitOps/Flux/) - GitOps toolkit
- [Argo Workflows](./03-CI-CD/GitOps/ArgoWorkflows/) - Workflow orchestration

**Deployment:**
- [Spinnaker](./03-CI-CD/Deployment/Spinnaker/) - Multi-cloud continuous delivery

---

### 04. [Containerization](./04-Containerization/)
Package applications with dependencies, orchestrate at scale.

**Container Runtimes:**
- [Docker](./04-Containerization/Container-Runtimes/Docker/) - Industry-standard containerization
- [Podman](./04-Containerization/Container-Runtimes/Podman/) - Daemonless container engine

**Orchestration:**
- [Kubernetes](./04-Containerization/Orchestration/Kubernetes/) - Container orchestration platform
- [Nomad](./04-Containerization/Orchestration/Nomad/) - Simple, flexible orchestrator

**Package Management:**
- [Helm](./04-Containerization/Package-Management/Helm/) - Kubernetes package manager
- [Kustomize](./04-Containerization/Package-Management/Kustomize/) - Kubernetes customization

**Development Tools:**
- [Skaffold](./04-Containerization/Development-Tools/Skaffold/) - Local Kubernetes development

**Service Mesh:**
- [Istio](./04-Containerization/Service-Mesh/Istio/) - Complete service mesh
- [Linkerd](./04-Containerization/Service-Mesh/Linkerd/) - Lightweight service mesh

---

### 05. [Infrastructure as Code](./05-Infrastructure-as-Code/)
Define and provision infrastructure through code, ensure consistency and repeatability.

**Core IaC Tools:**
- [Terraform](./05-Infrastructure-as-Code/Terraform/) - Most popular IaC tool
- [OpenTofu](./05-Infrastructure-as-Code/OpenTofu/) - Open-source Terraform fork
- [Pulumi](./05-Infrastructure-as-Code/Pulumi/) - Modern IaC with real programming languages
- [Ansible](./05-Infrastructure-as-Code/Ansible/) - Configuration management & automation

**VM Management:**
- [Vagrant](./05-Infrastructure-as-Code/VM-Management/Vagrant/) - Development environment automation
- [Packer](./05-Infrastructure-as-Code/VM-Management/Packer/) - Machine image builder

---

### 06. [Cloud Providers](./06-Cloud-Providers/)
Cloud platforms and services for hosting applications and infrastructure.

**Major Providers:**
- [AWS](./06-Cloud-Providers/Major-Providers/AWS/) - Amazon Web Services
- [Azure](./06-Cloud-Providers/Major-Providers/Azure/) - Microsoft Azure
- [GCP](./06-Cloud-Providers/Major-Providers/GCP/) - Google Cloud Platform

**Alternative Providers:**
- [DigitalOcean](./06-Cloud-Providers/Alternative-Providers/DigitalOcean/) - Developer-friendly cloud
- [Linode](./06-Cloud-Providers/Alternative-Providers/Linode/) - Simple cloud hosting
- [Oracle Cloud](./06-Cloud-Providers/Alternative-Providers/Oracle-Cloud/) - Enterprise cloud
- [IBM Cloud](./06-Cloud-Providers/Alternative-Providers/IBM-Cloud/) - Hybrid cloud solutions

**Platform as a Service:**
- [Heroku Alternatives](./06-Cloud-Providers/Platform-as-a-Service/Heroku-Alternatives/) - PaaS options
- [Deploy Services](./06-Cloud-Providers/Platform-as-a-Service/Deploy-Services/) - Deployment platforms

**Edge & CDN:**
- [Cloudflare](./06-Cloud-Providers/Edge-CDN/Cloudflare/) - Edge computing & CDN

---

### 07. [Monitoring & Observability](./07-Monitoring-Observability/)
Track system health, performance metrics, logs, and distributed traces.

**Metrics:**
- [Prometheus](./07-Monitoring-Observability/Metrics/Prometheus/) - Time-series monitoring
- [Grafana](./07-Monitoring-Observability/Metrics/Grafana/) - Visualization & dashboards
- [AlertManager](./07-Monitoring-Observability/Metrics/AlertManager/) - Alert routing

**Logging:**
- [ELK/OpenSearch](./07-Monitoring-Observability/Logging/ELK-OpenSearch/) - Complete logging stack
- [Loki](./07-Monitoring-Observability/Logging/Loki/) - Log aggregation system

**Tracing:**
- [Zipkin](./07-Monitoring-Observability/Tracing/Zipkin/) - Distributed tracing
- [OpenTelemetry](./07-Monitoring-Observability/Tracing/OpenTelemetry/) - Observability framework

**Cloud-Native:**
- [CloudWatch](./07-Monitoring-Observability/Cloud-Native/CloudWatch/) - AWS monitoring
- [Azure Monitor](./07-Monitoring-Observability/Cloud-Native/Azure-Monitor/) - Azure monitoring
- [Google Cloud Monitoring](./07-Monitoring-Observability/Cloud-Native/Google-Cloud-Monitoring/) - GCP monitoring

---

### 08. [Security & Secrets](./08-Security-Secrets/)
Manage secrets, credentials, and service discovery securely.

**Secrets Management:**
- [Vault](./08-Security-Secrets/Secrets-Management/Vault/) - HashiCorp secrets management

**Service Discovery:**
- [Consul](./08-Security-Secrets/Service-Discovery/Consul/) - Service mesh & discovery

---

### 09. [Automation & Workflows](./09-Automation-Workflows/)
Automate complex workflows and business processes.

- [n8n](./09-Automation-Workflows/n8n/) - Workflow automation tool

---

### 10. [Complete Stacks](./10-Complete-Stacks/)
Pre-configured technology stacks for common use cases.

**Coming soon:**
- LAMP Stack
- Kubernetes Complete Stack
- AWS Serverless Stack
- Azure DevOps Stack
- GCP Cloud-Native Stack

---

### 11. [Learning Paths](./11-Learning-Paths/)
Structured learning journeys from beginner to expert.

**Skill Levels:**
- **[Beginner DevOps](./11-Learning-Paths/)** - 4-6 weeks
- **[Intermediate DevOps](./11-Learning-Paths/)** - 6-8 weeks
- **[Advanced DevOps](./11-Learning-Paths/)** - 8-10 weeks

**Certifications:**
- AWS DevOps Professional
- Kubernetes CKA/CKAD
- Terraform Associate

---

### 12. [Real-World Projects](./12-Real-World-Projects/)
Complete, production-ready project examples.

**Coming soon:**
- Microservices Deployment
- Multi-Cloud Setup
- Serverless Application
- Complete Monitoring Stack
- GitOps Workflow

---

### 13. [Reference](./13-Reference/)
Quick reference materials, cheat sheets, and troubleshooting guides.

**Resources:**
- [Cheat Sheets](./13-Reference/cheat-sheets/)
- [DevOps Glossary](./13-Reference/glossary/)
- [Best Practices](./13-Reference/best-practices/)
- [Troubleshooting](./13-Reference/troubleshooting/)

---

## 🚀 Getting Started

### For Complete Beginners

```
Week 1: Learn Git & GitHub
Week 2: Understand Docker basics
Week 3: Build your first CI/CD pipeline
Week 4: Deploy to a cloud platform
```

**👉 [Start the Beginner Path →](./GETTING-STARTED.md)**

### For Developers Moving to DevOps

```
1. Master containerization (Docker + Kubernetes)
2. Learn Infrastructure as Code (Terraform)
3. Set up monitoring (Prometheus + Grafana)
4. Implement GitOps workflows
```

**👉 [Explore Learning Paths →](./11-Learning-Paths/)**

---

## 📚 Learning Paths

### Path 1: DevOps Fundamentals (4-6 weeks)
```
Git/GitHub → Docker → GitHub Actions → Deploy to Cloud → Basic Monitoring
```

### Path 2: Container & Orchestration (6-8 weeks)
```
Docker Deep Dive → Kubernetes → Helm → Service Mesh → Production Deployment
```

### Path 3: Infrastructure Automation (6-8 weeks)
```
Terraform Basics → AWS/GCP Provisioning → Ansible → Multi-Cloud → GitOps
```

### Path 4: Platform Engineering (8-10 weeks)
```
Kubernetes Advanced → Service Mesh → Observability → Platform Design → SRE Practices
```

**👉 [View All Learning Paths →](./11-Learning-Paths/)**

---

## 🔧 Popular Stacks

### Kubernetes Stack
```
Kubernetes + Helm + Istio + Prometheus + Grafana + ArgoCD
```
**Best for:** Cloud-native applications, microservices

### AWS Serverless Stack
```
Lambda + API Gateway + DynamoDB + CloudWatch + CDK
```
**Best for:** Scalable, event-driven applications

### Traditional DevOps Stack
```
Jenkins + Docker + Terraform + Ansible + ELK + Grafana
```
**Best for:** Enterprise environments, self-hosted

### Modern GitOps Stack
```
GitHub Actions + ArgoCD + Kubernetes + Prometheus + Loki
```
**Best for:** Automated, declarative infrastructure

---

## 🎯 Use Case Navigator

### I want to...

#### **Set up version control**
→ Start with [Git](./01-Version-Control/Git/) and [GitHub](./01-Version-Control/Platforms/GitHub/)

#### **Containerize my application**
→ Learn [Docker](./04-Containerization/Container-Runtimes/Docker/) basics

#### **Deploy to Kubernetes**
→ Master [Kubernetes](./04-Containerization/Orchestration/Kubernetes/) and [Helm](./04-Containerization/Package-Management/Helm/)

#### **Automate deployments**
→ Implement [GitHub Actions](./03-CI-CD/Platform-Integrated/GitHub-Actions/) or [Jenkins](./03-CI-CD/Self-Hosted/JenKins/)

#### **Provision cloud infrastructure**
→ Use [Terraform](./05-Infrastructure-as-Code/Terraform/) or [Pulumi](./05-Infrastructure-as-Code/Pulumi/)

#### **Monitor my applications**
→ Set up [Prometheus](./07-Monitoring-Observability/Metrics/Prometheus/) + [Grafana](./07-Monitoring-Observability/Metrics/Grafana/)

#### **Implement GitOps**
→ Deploy [ArgoCD](./03-CI-CD/GitOps/ArgoCD/) or [Flux](./03-CI-CD/GitOps/Flux/)

#### **Secure my secrets**
→ Use [Vault](./08-Security-Secrets/Secrets-Management/Vault/)

---

## 📊 Quick Reference

### Most Popular Tools by Category

| Category | Beginner-Friendly | Most Popular | Enterprise Choice |
|----------|-------------------|--------------|-------------------|
| **Version Control** | Git + GitHub | Git + GitHub | GitLab |
| **CI/CD** | GitHub Actions | Jenkins | Jenkins / GitLab |
| **Containers** | Docker | Docker | Docker + Kubernetes |
| **Orchestration** | Docker Compose | Kubernetes | Kubernetes |
| **IaC** | Terraform | Terraform | Terraform + Ansible |
| **Cloud** | DigitalOcean | AWS | AWS / Azure |
| **Monitoring** | Grafana Cloud | Prometheus | Datadog / Prometheus |

### Learning Time Estimates

- **Git Basics**: 1-2 weeks
- **Docker Fundamentals**: 2-3 weeks
- **Kubernetes Basics**: 3-4 weeks
- **Terraform Basics**: 2-3 weeks
- **CI/CD Setup**: 1-2 weeks
- **Full DevOps Proficiency**: 6-12 months

---

## 🎓 Certification Paths

### Cloud Certifications
- **AWS Certified DevOps Engineer** - Professional level
- **Azure DevOps Engineer Expert** - Advanced Azure
- **Google Cloud Professional DevOps Engineer** - GCP expertise

### Tool-Specific Certifications
- **CKA** (Certified Kubernetes Administrator)
- **CKAD** (Certified Kubernetes Application Developer)
- **Terraform Associate** - HashiCorp certified

### General DevOps
- **Docker Certified Associate**
- **Jenkins Engineer**

**👉 [Certification Preparation Guides →](./11-Learning-Paths/certification-paths/)**

---

## 🛠️ Quick Start Commands

### Docker
```bash
# Build and run a container
docker build -t myapp .
docker run -p 8080:80 myapp
```

### Kubernetes
```bash
# Deploy an application
kubectl apply -f deployment.yaml
kubectl get pods
```

### Terraform
```bash
# Provision infrastructure
terraform init
terraform plan
terraform apply
```

### GitHub Actions
```yaml
# Simple CI workflow
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install && npm test
```

---

## 💡 Best Practices

### Version Control
✅ Commit often, commit early  
✅ Write meaningful commit messages  
✅ Use branches for features  
✅ Review code before merging  

### Containers
✅ Use multi-stage builds  
✅ Keep images small  
✅ Don't run as root  
✅ Use specific version tags  

### Infrastructure
✅ Everything as code  
✅ Version control your IaC  
✅ Use modules/reusable components  
✅ Implement proper state management  

### CI/CD
✅ Automate everything  
✅ Fast feedback loops  
✅ Test early and often  
✅ Deploy frequently  

**👉 [Read Complete Best Practices →](./13-Reference/best-practices/)**

---

## 🔍 Tool Comparison

**Detailed comparisons available:**
- [All CI/CD Tools Compared](./TOOL-COMPARISON-MATRIX.md)
- [Cloud Providers Comparison](./06-Cloud-Providers/comparison/)
- [Container Orchestrators](./04-Containerization/)
- [IaC Tools Compared](./05-Infrastructure-as-Code/)

---

## 📖 Additional Resources

### Documentation
- [DevOps Lifecycle Guide](./DEVOPS-LIFECYCLE.md)
- [Getting Started Guide](./GETTING-STARTED.md)
- [Tool Comparison Matrix](./TOOL-COMPARISON-MATRIX.md)

### Quick Reference
- [Docker Cheat Sheet](./13-Reference/cheat-sheets/)
- [Kubectl Cheat Sheet](./13-Reference/cheat-sheets/)
- [Terraform Cheat Sheet](./13-Reference/cheat-sheets/)
- [Git Cheat Sheet](./13-Reference/cheat-sheets/)

### Troubleshooting
- [Common Kubernetes Issues](./13-Reference/troubleshooting/)
- [Docker Problems](./13-Reference/troubleshooting/)
- [CI/CD Failures](./13-Reference/troubleshooting/)

---

## 🤝 Contributing

Found an issue? Want to add a new tool or improve documentation?

1. Check [CONTRIBUTING.md](../../CONTRIBUTING.md)
2. Submit an issue or pull request
3. Help make this resource better!

---

## 📊 Statistics

- **Total Tools Documented**: 58+
- **Categories**: 13
- **Learning Paths**: 4
- **Real-World Projects**: Growing
- **Cheat Sheets**: Multiple

---

## 🎯 What's Next?

1. **New to DevOps?** → [Start Here](./GETTING-STARTED.md)
2. **Have some experience?** → [Explore Categories](#-categories)
3. **Want structured learning?** → [Learning Paths](./11-Learning-Paths/)
4. **Need quick reference?** → [Cheat Sheets](./13-Reference/cheat-sheets/)
5. **Building something?** → [Real-World Projects](./12-Real-World-Projects/)

---

## 📞 Support

- **Documentation Issues**: Submit a GitHub issue
- **Learning Questions**: Check Stack Overflow
- **Tool-Specific Help**: Visit official documentation

---

**Happy DevOps Journey! 🚀**

*Last Updated: 2026-01-20*  
*Version: 2.0 (Restructured)*  
*Status: Active Development*

---

**Made with ❤️ for DevOps practitioners everywhere**

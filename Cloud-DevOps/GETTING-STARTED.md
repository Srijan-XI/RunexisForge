# Getting Started with DevOps

> **Your journey from zero to DevOps practitioner begins here**

---

## 🎯 Welcome!

Welcome to your DevOps journey! This guide will take you from complete beginner to confident DevOps practitioner through a structured, hands-on learning path.

### What is DevOps?

**DevOps** is a set of practices that combines software **Dev**elopment and IT **Op**erations. It aims to shorten the development lifecycle and provide continuous delivery with high software quality.

**Key Goals:**
- Faster time to market
- Higher deployment frequency
- Lower failure rate of new releases
- Shorter time to recover from failures
- Better collaboration between teams

---

## 🗺️ Your Learning Roadmap

### Complete Beginner Path (4-6 weeks)

```
Week 1: Version Control (Git & GitHub)
  ↓
Week 2: Containerization (Docker)
  ↓
Week 3: CI/CD Basics (GitHub Actions)
  ↓
Week 4: Cloud Deployment
  ↓
Weeks 5-6: First Real Project
```

---

## 📅 Week 1: Version Control with Git & GitHub

### Why Version Control?

Version control tracks changes to your code, enables collaboration, and provides a safety net for experimentation.

### Learning Objectives

By the end of Week 1, you'll be able to:
- ✅ Create and clone repositories
- ✅ Make commits and push changes
- ✅ Create and merge branches
- ✅ Collaborate through pull requests
- ✅ Understand Git workflows

### Getting Started

#### 1. Install Git

**Windows:**
```powershell
# Download from git-scm.com or use:
winget install Git.Git
```

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt install git  # Ubuntu/Debian
sudo yum install git  # CentOS/RHEL
```

#### 2. Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 3. Create Your First Repository

```bash
# Create a new directory
mkdir my-first-project
cd my-first-project

# Initialize Git
git init

# Create a file
echo "# My First Project" > README.md

# Track and commit
git add README.md
git commit -m "Initial commit"
```

#### 4. Push to GitHub

1. Create a repository on [GitHub](https://github.com)
2. Connect your local repo:

```bash
git remote add origin https://github.com/yourusername/my-first-project.git
git branch -M main
git push -u origin main
```

### Week 1 Practice Projects

1. **Personal Portfolio** - Create a simple HTML portfolio
2. **Learning Journal** - Document your DevOps journey in Markdown
3. **Code Snippets** - Collection of useful code snippets

### Resources

- 📚 [Git Documentation](https://git-scm.com/doc)
- 🎓 [GitHub Learning Lab](https://lab.github.com)
- 📖 [Our Git Guide](./01-Version-Control/Git/)

---

## 📅 Week 2: Containerization with Docker

### Why Containers?

Containers package your application with all dependencies, ensuring it runs identically everywhere.

### Learning Objectives

By the end of Week 2, you'll be able to:
- ✅ Understand container concepts
- ✅ Install and run Docker
- ✅ Create Dockerfiles
- ✅ Build and run containers
- ✅ Use Docker Compose for multi-container apps

### Getting Started

#### 1. Install Docker

**Windows/macOS:**
- Download [Docker Desktop](https://www.docker.com/products/docker-desktop)

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

#### 2. Verify Installation

```bash
docker --version
docker run hello-world
```

#### 3. Your First Container

```bash
# Run a web server
docker run -d -p 8080:80 nginx

# Visit http://localhost:8080
```

#### 4. Create Your First Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
```

#### 5. Build and Run

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

### Week 2 Practice Projects

1. **Containerize a Web App** - Package a simple Node.js/Python app
2. **Multi-Container App** - Use Docker Compose for app + database
3. **Nginx Reverse Proxy** - Set up reverse proxy with Docker

### Resources

- 📚 [Docker Documentation](https://docs.docker.com)
- 📖 [Our Docker Guide](./04-Containerization/Container-Runtimes/Docker/)
- 🎓 [Docker Getting Started](https://docs.docker.com/get-started/)

---

## 📅 Week 3: CI/CD with GitHub Actions

### Why CI/CD?

Continuous Integration and Continuous Deployment automate testing and deployment, enabling rapid, reliable releases.

### Learning Objectives

By the end of Week 3, you'll be able to:
- ✅ Understand CI/CD concepts
- ✅ Create GitHub Actions workflows
- ✅ Automate testing
- ✅ Build and publish Docker images
- ✅ Deploy applications automatically

### Getting Started

#### 1. Create Your First Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
```

#### 2. Add Docker Build

```yaml
    - name: Build Docker image
      run: docker build -t my-app:${{ github.sha }} .
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Push to Docker Hub
      run: |
        docker tag my-app:${{ github.sha }} username/my-app:latest
        docker push username/my-app:latest
```

### Week 3 Practice Projects

1. **Automated Testing** - Set up automated tests for your project
2. **Docker Build Pipeline** - Auto-build and push Docker images
3. **Multi-Environment Deploy** - Deploy to staging and production

### Resources

- 📚 [GitHub Actions Documentation](https://docs.github.com/en/actions)
- 📖 [Our GitHub Actions Guide](./03-CI-CD/Platform-Integrated/GitHub-Actions/)
- 🎓 [GitHub Actions Learning Path](https://docs.github.com/en/actions/learn-github-actions)

---

## 📅 Week 4: Cloud Deployment

### Why Cloud?

Cloud platforms provide scalable, reliable infrastructure without managing physical servers.

### Learning Objectives

By the end of Week 4, you'll be able to:
- ✅ Understand cloud computing basics
- ✅ Deploy applications to a cloud platform
- ✅ Configure basic monitoring
- ✅ Set up a custom domain
- ✅ Implement basic security practices

### Choose Your Cloud Platform

#### Option 1: AWS (Amazon Web Services)
- **Free Tier**: 12 months free
- **Best for**: Enterprise, comprehensive services
- **Learning curve**: Moderate

#### Option 2: DigitalOcean
- **Free Credits**: Available for students
- **Best for**: Beginners, simple deployments
- **Learning curve**: Easy

#### Option 3: Azure / GCP
- **Free Tier**: Available
- **Best for**: Microsoft/Google ecosystem integration
- **Learning curve**: Moderate

### Quick Start: Deploy to DigitalOcean

#### 1. Create a Droplet

```bash
# Install doctl (DigitalOcean CLI)
# Then create a droplet
doctl compute droplet create my-app \
  --image docker-20-04 \
  --size s-1vcpu-1gb \
  --region nyc1
```

#### 2. Deploy Your Docker Container

```bash
# SSH into your droplet
ssh root@your-droplet-ip

# Run your container
docker run -d -p 80:3000 username/my-app:latest
```

#### 3. Set Up a Domain

1. Point your domain's A record to the droplet IP
2. Wait for DNS propagation
3. Access your app at yourdomain.com

### Week 4 Practice Projects

1. **Deploy Static Site** - Host a static website
2. **Deploy API Server** - Run a backend API
3. **Full-Stack App** - Deploy frontend + backend + database

### Resources

- 📚 [AWS Documentation](https://docs.aws.amazon.com)
- 📚 [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- 📖 [Our Cloud Providers Guide](./06-Cloud-Providers/)

---

## 📅 Weeks 5-6: Your First Real Project

### Project: Automated Blog Deployment

Build a complete, production-ready blog with automated deployment.

#### Project Requirements

1. **Version Control**: GitHub repository
2. **Application**: Simple blog (Jekyll, Hugo, or custom)
3. **Containerization**: Dockerized application
4. **CI/CD**: Automated testing and deployment
5. **Cloud Hosting**: Deployed to cloud platform
6. **Monitoring**: Basic health checks
7. **Documentation**: Clear README

#### Architecture

```
GitHub (Code) 
  → GitHub Actions (CI/CD)
  → Docker Hub (Container Registry)
  → Cloud Platform (Deployment)
  → Monitoring Dashboard
```

#### Step-by-Step Guide

**Week 5:**
1. Set up blog application
2. Create Dockerfile
3. Write comprehensive tests
4. Set up GitHub Actions
5. Deploy to staging environment

**Week 6:**
1. Add monitoring
2. Set up production environment
3. Implement blue-green deployment
4. Add custom domain
5. Write documentation
6. Celebrate! 🎉

---

## 🎯 What's Next?

### Continue Your Journey

After completing the beginner path:

1. **Intermediate DevOps** (6-8 weeks)
   - Kubernetes fundamentals
   - Infrastructure as Code (Terraform)
   - Advanced monitoring (Prometheus + Grafana)
   - GitOps workflows

2. **Advanced DevOps** (8-10 weeks)
   - Service mesh (Istio)
   - Multi-cluster Kubernetes
   - Platform engineering
   - SRE practices

### Recommended Learning Order

```
Beginner Path (4-6 weeks)
  ↓
Kubernetes Basics (3-4 weeks)
  ↓
Infrastructure as Code (2-3 weeks)
  ↓
Advanced Monitoring (2-3 weeks)
  ↓
Specialization (Your choice!)
```

---

## 📚 Essential Resources

### Free Learning Platforms

- **[Kubernetes The Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)** - Deep K8s understanding
- **[Docker Curriculum](https://docker-curriculum.com)** - Comprehensive Docker guide
- **[GitHub Learning Lab](https://lab.github.com)** - Interactive GitHub/Actions tutorials

### Practice Platforms

- **[KillerCoda](https://killercoda.com)** - Interactive K8s scenarios
- **[Play with Docker](https://labs.play-with-docker.com)** - Browser-based Docker playground
- **[Katacoda](https://katacoda.com)** - DevOps scenarios

### Communities

- **Stack Overflow** - Q&A for specific problems
- **r/devops** - Reddit DevOps community
- **DevOps Discord servers** - Real-time discussions
- **CNCF Slack** - Cloud-native community

---

## ✅ Success Checklist

### After 4-6 Weeks, You Should Be Able To:

- [ ] Create and manage Git repositories
- [ ] Write and review pull requests
- [ ] Build and run Docker containers
- [ ] Write Dockerfiles and docker-compose files
- [ ] Create CI/CD pipelines with GitHub Actions
- [ ] Deploy applications to the cloud
- [ ] Set up basic monitoring
- [ ] Debug common deployment issues
- [ ] Follow DevOps best practices
- [ ] Continue learning independently

---

## 💡 Tips for Success

### 1. Learn by Doing
Don't just read—build projects! Hands-on experience is crucial.

### 2. Start Small
Don't try to learn everything at once. Master the basics first.

### 3. Document Your Journey
Keep a learning journal. It helps retention and creates a reference.

### 4. Join Communities
Connect with other learners. Ask questions, share progress.

### 5. Build in Public
Share your projects on GitHub. Get feedback, help others.

### 6. Be Patient
DevOps is complex. Progress ≠ perfection. Keep going!

### 7. Practice Regularly
Consistency beats intensity. 30 minutes daily > 3 hours weekly.

---

## 🚨 Common Pitfalls to Avoid

❌ **Skipping the basics** - Don't jump to Kubernetes without understanding Docker  
❌ **Tutorial hell** - Build your own projects, don't just follow tutorials  
❌ **Perfectionism** - Done is better than perfect. Ship and iterate  
❌ **Ignoring fundamentals** - Learn Linux, networking, and system administration  
❌ **Not reading error messages** - Error messages contain valuable clues  
❌ **Working in isolation** - Join communities, ask for help when stuck  

---

## 🎓 Certification Path

### When to Consider Certifications

- After 6-12 months of hands-on experience
- When seeking career advancement
- To validate your knowledge

### Recommended Certifications (in order)

1. **Docker Certified Associate** (DCA)
2. **Certified Kubernetes Application Developer** (CKAD)
3. **AWS Certified DevOps Engineer** or equivalent
4. **Terraform Associate**
5. **Certified Kubernetes Administrator** (CKA)

---

## 📞 Get Help

### Stuck? Here's What to Do:

1. **Read the error message** - Carefully, line by line
2. **Check official documentation** - Most accurate source
3. **Search Stack Overflow** - Someone likely had the same issue
4. **Ask in communities** - Reddit, Discord, Slack
5. **Create a minimal reproducible example** - Helps others help you

### Asking Good Questions

Include:
- What you're trying to do
- What you expected to happen
- What actually happened
- Relevant code/configuration
- Error messages (full text)
- What you've already tried

---

## 🎉 Final Words

**Congratulations on starting your DevOps journey!**

Remember:
- Everyone was a beginner once
- Progress over perfection
- Community over competition
- Continuous learning is the key

The DevOps landscape is vast, but with consistent effort, you'll master it.

**Ready to begin?** Start with [Week 1: Version Control](#-week-1-version-control-with-git--github)

---

## 📖 Related Guides

- [DevOps Lifecycle](./DEVOPS-LIFECYCLE.md)
- [Learning Paths](./11-Learning-Paths/)
- [Tool Comparisons](./TOOL-COMPARISON-MATRIX.md)
- [Best Practices](./13-Reference/best-practices/)

---

**Your DevOps journey starts now. Let's build something amazing! 🚀**

*Last Updated: 2026-01-20*  
*Part of the Cloud-DevOps Complete Guide*

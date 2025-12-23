# Docker - Introduction

## What is Docker?

**Docker** is an open-source platform that enables developers to automate the deployment, scaling, and management of applications using containerization technology. It packages applications and their dependencies into lightweight, portable containers that can run consistently across any environment—from a developer's laptop to production servers.

## Key Concepts

### 1. **Containers**
- Lightweight, standalone, executable packages
- Include everything needed to run an application
- Share the host OS kernel (unlike VMs)
- Start in seconds
- Use minimal resources

### 2. **Images**
- Read-only templates used to create containers
- Built from a Dockerfile
- Stored in registries (Docker Hub, private registries)
- Layered file system for efficiency
- Version controlled and shareable

### 3. **Dockerfile**
- Text file with instructions to build an image
- Defines base image, dependencies, and commands
- Reproducible and version-controllable
- Enables automation

### 4. **Docker Engine**
- Core runtime that builds and runs containers
- Client-server architecture
- REST API for interaction
- Docker daemon (dockerd)
- Docker CLI client

### 5. **Docker Hub**
- Public registry for Docker images
- Millions of pre-built images
- Official images for popular software
- Private repositories available

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Client                         │
│                   (docker CLI)                           │
└────────────────────┬────────────────────────────────────┘
                     │ REST API
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Docker Daemon                           │
│                   (dockerd)                              │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Container Management                   │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │  │
│  │  │Container1│  │Container2│  │Container3│       │  │
│  │  │  (App1)  │  │  (App2)  │  │  (DB)    │       │  │
│  │  └──────────┘  └──────────┘  └──────────┘       │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Image Management                     │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐             │  │
│  │  │Image 1 │  │Image 2 │  │Image 3 │             │  │
│  │  └────────┘  └────────┘  └────────┘             │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Volume Management                    │  │
│  │         (Persistent Data Storage)                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Network Management                     │  │
│  │      (Container Communication)                    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Host Operating System                   │
│                  (Linux, Windows, macOS)                 │
└─────────────────────────────────────────────────────────┘
```

## Docker vs Virtual Machines

| Feature | Docker Containers | Virtual Machines |
|---------|------------------|------------------|
| **Size** | Lightweight (MBs) | Heavy (GBs) |
| **Startup Time** | Seconds | Minutes |
| **Resource Usage** | Minimal overhead | Significant overhead |
| **Isolation** | Process-level | Full OS isolation |
| **OS** | Share host kernel | Full guest OS |
| **Portability** | Highly portable | Less portable |
| **Performance** | Near-native | Slower |
| **Density** | 100s per host | 10s per host |

```
Virtual Machines:                    Docker Containers:

┌─────────────────────────┐         ┌─────────────────────────┐
│    App A    │   App B   │         │   App A   │   App B     │
├─────────────┼───────────┤         ├───────────┼─────────────┤
│    Bins/Libs│  Bins/Libs│         │ Bins/Libs │  Bins/Libs  │
├─────────────┼───────────┤         ├───────────┴─────────────┤
│  Guest OS 1 │ Guest OS 2│         │    Docker Engine        │
├─────────────┴───────────┤         ├─────────────────────────┤
│      Hypervisor         │         │     Host OS             │
├─────────────────────────┤         ├─────────────────────────┤
│      Host OS            │         │     Infrastructure      │
├─────────────────────────┤         └─────────────────────────┘
│      Infrastructure     │
└─────────────────────────┘
```

## Key Features

### 1. **Portability**
- "Build once, run anywhere"
- Consistent across development, testing, and production
- No "works on my machine" problems
- Platform-independent

### 2. **Efficiency**
- Share host OS kernel
- Lightweight compared to VMs
- Fast startup and shutdown
- Optimal resource utilization

### 3. **Scalability**
- Easily scale applications up or down
- Container orchestration (Kubernetes, Docker Swarm)
- Microservices architecture support
- Load balancing

### 4. **Isolation**
- Each container is isolated
- Separate processes and file systems
- Security through isolation
- No conflicts between applications

### 5. **Version Control**
- Images are versioned
- Easy rollback to previous versions
- Track changes over time
- Reproducible builds

### 6. **Microservices Ready**
- Each service in its own container
- Independent deployment and scaling
- Technology stack flexibility
- Fault isolation

## Installation

### Windows

```powershell
# Download Docker Desktop from docker.com
# Install Docker Desktop
# Start Docker Desktop
# Enable WSL 2 backend (recommended)

# Verify installation
docker --version
docker run hello-world
```

### macOS

```bash
# Download Docker Desktop from docker.com
# Install Docker Desktop
# Start Docker Desktop

# Verify installation
docker --version
docker run hello-world
```

### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt-get update

# Install dependencies
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify installation
sudo docker run hello-world

# Add user to docker group (optional)
sudo usermod -aG docker $USER
```

## Basic Commands

### Container Management

```bash
# Run a container
docker run <image>
docker run -d <image>              # Detached mode
docker run -p 8080:80 <image>      # Port mapping
docker run --name myapp <image>    # Named container
docker run -e VAR=value <image>    # Environment variable

# List containers
docker ps                          # Running containers
docker ps -a                       # All containers

# Stop/Start/Restart containers
docker stop <container>
docker start <container>
docker restart <container>

# Remove containers
docker rm <container>
docker rm -f <container>           # Force remove running container
docker container prune             # Remove all stopped containers

# View logs
docker logs <container>
docker logs -f <container>         # Follow logs

# Execute commands in container
docker exec <container> <command>
docker exec -it <container> bash   # Interactive shell

# Inspect container
docker inspect <container>
docker stats <container>           # Resource usage
```

### Image Management

```bash
# List images
docker images
docker image ls

# Pull an image
docker pull <image>:<tag>
docker pull nginx:latest

# Build an image
docker build -t <name>:<tag> .
docker build -f Dockerfile.prod -t myapp:prod .

# Remove images
docker rmi <image>
docker image prune                 # Remove unused images
docker image prune -a              # Remove all unused images

# Tag an image
docker tag <source> <target>

# Push to registry
docker push <image>:<tag>

# Search images
docker search <term>
```

### System Commands

```bash
# System information
docker version
docker info

# Clean up
docker system prune                # Remove unused data
docker system prune -a             # Remove all unused data
docker system df                   # Disk usage

# Help
docker --help
docker <command> --help
```

## Dockerfile Example

### Basic Dockerfile

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Run application
CMD ["node", "app.js"]
```

### Multi-Stage Build

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/app.js"]
```

## Docker Compose

### What is Docker Compose?

A tool for defining and running multi-container Docker applications using a YAML file.

### docker-compose.yml Example

```yaml
version: '3.8'

services:
  # Web application
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://db:5432/myapp
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs
    networks:
      - app-network

  # Database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  # Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
```

### Docker Compose Commands

```bash
# Start services
docker-compose up
docker-compose up -d               # Detached mode
docker-compose up --build          # Rebuild images

# Stop services
docker-compose down
docker-compose down -v             # Remove volumes

# View logs
docker-compose logs
docker-compose logs -f             # Follow logs
docker-compose logs web            # Specific service

# List services
docker-compose ps

# Execute commands
docker-compose exec web bash

# Scale services
docker-compose up -d --scale web=3
```

## Volumes (Data Persistence)

### Types of Volumes

1. **Named Volumes** (Managed by Docker)
```bash
docker volume create mydata
docker run -v mydata:/app/data myapp
```

2. **Bind Mounts** (Host filesystem)
```bash
docker run -v /host/path:/container/path myapp
docker run -v $(pwd):/app myapp
```

3. **tmpfs Mounts** (Memory only)
```bash
docker run --tmpfs /app/temp myapp
```

### Volume Commands

```bash
# List volumes
docker volume ls

# Create volume
docker volume create <name>

# Inspect volume
docker volume inspect <name>

# Remove volume
docker volume rm <name>
docker volume prune                # Remove unused volumes
```

## Networking

### Network Types

1. **Bridge** (Default) - Isolated network for containers
2. **Host** - Use host's network directly
3. **None** - No networking
4. **Overlay** - Multi-host networking (Swarm)
5. **Macvlan** - Assign MAC address to container

### Network Commands

```bash
# List networks
docker network ls

# Create network
docker network create <name>
docker network create --driver bridge mynetwork

# Connect container to network
docker network connect <network> <container>

# Disconnect from network
docker network disconnect <network> <container>

# Inspect network
docker network inspect <network>

# Remove network
docker network rm <network>
docker network prune               # Remove unused networks
```

## Best Practices

### 1. Image Optimization
```dockerfile
# Use specific tags (not 'latest')
FROM node:18-alpine

# Use .dockerignore file
# Combine RUN commands
RUN apt-get update && \
    apt-get install -y package && \
    rm -rf /var/lib/apt/lists/*

# Multi-stage builds for smaller images
# Order layers by change frequency (dependencies first)
```

### 2. Security
```bash
# Don't run as root
USER node

# Scan images for vulnerabilities
docker scan <image>

# Use official images
# Keep images updated
# Use secrets for sensitive data
```

### 3. .dockerignore File
```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.DS_Store
*.log
dist
coverage
```

### 4. Resource Limits
```bash
# Limit CPU and memory
docker run --memory="512m" --cpus="1.0" myapp
```

### 5. Health Checks
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1
```

## Common Use Cases

### 1. **Development Environments**
- Consistent dev environment across team
- Easy setup for new developers
- No local software conflicts

### 2. **Microservices**
- Each service in separate container
- Independent deployment and scaling
- Language/framework flexibility

### 3. **CI/CD Pipelines**
- Build and test in containers
- Consistent build environments
- Fast and reliable deployments

### 4. **Legacy Application Modernization**
- Containerize monolithic apps
- Gradually migrate to microservices
- Maintain old dependencies

### 5. **Testing**
- Isolated test environments
- Parallel testing
- Quick setup and teardown

## Advantages

✅ **Consistency** - Same environment everywhere  
✅ **Isolation** - Apps don't interfere with each other  
✅ **Portability** - Run anywhere Docker runs  
✅ **Efficiency** - Lightweight and fast  
✅ **Scalability** - Easy to scale up or down  
✅ **Version Control** - Images are versioned  
✅ **Rapid Deployment** - Deploy in seconds  
✅ **DevOps** - Perfect for CI/CD pipelines  
✅ **Microservices** - Ideal architecture support  
✅ **Cost Effective** - Better resource utilization

## Disadvantages

❌ **Learning Curve** - New concepts to learn  
❌ **Persistent Data** - Volumes need careful management  
❌ **Networking** - Can be complex for beginners  
❌ **GUI Applications** - Not designed for desktop apps  
❌ **Windows Containers** - Limited compared to Linux  
❌ **Security** - Requires proper configuration  
❌ **Orchestration** - Need additional tools for production (Kubernetes)

## Docker Ecosystem

### Orchestration
- **Kubernetes** - Industry standard for container orchestration
- **Docker Swarm** - Docker's native orchestration
- **Amazon ECS** - AWS container service
- **Azure Container Instances** - Microsoft's solution

### Registries
- **Docker Hub** - Public registry
- **Amazon ECR** - AWS registry
- **Google Container Registry** - GCP registry
- **Azure Container Registry** - Microsoft registry
- **Harbor** - Open-source registry

### Tools
- **Docker Compose** - Multi-container applications
- **Docker Desktop** - Desktop GUI application
- **Portainer** - Container management UI
- **Watchtower** - Automated image updates
- **Traefik** - Reverse proxy and load balancer

## Real-World Examples

### Example 1: Node.js App with MongoDB

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=mongodb://mongo:27017/myapp
    depends_on:
      - mongo
  
  mongo:
    image: mongo:latest
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### Example 2: WordPress with MySQL

```yaml
version: '3.8'
services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: secret
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress-data:/var/www/html
  
  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: secret
      MYSQL_ROOT_PASSWORD: rootsecret
    volumes:
      - db-data:/var/lib/mysql

volumes:
  wordpress-data:
  db-data:
```

## Who Uses Docker?

Major companies using Docker:

- **Netflix** - Microservices architecture
- **Uber** - Deployment platform
- **Spotify** - Service deployment
- **PayPal** - Development and deployment
- **Visa** - Payment processing
- **eBay** - Infrastructure modernization
- **General Electric** - Digital transformation
- **Shopify** - E-commerce platform
- **Twitter** - Service isolation
- **ADP** - Application deployment

## Resources

- **Official Website**: [docker.com](https://www.docker.com/)
- **Documentation**: [docs.docker.com](https://docs.docker.com/)
- **Docker Hub**: [hub.docker.com](https://hub.docker.com/)
- **GitHub**: [github.com/docker](https://github.com/docker)
- **Play with Docker**: [labs.play-with-docker.com](https://labs.play-with-docker.com/)
- **Docker Certified**: [docker.com/certification](https://www.docker.com/certification/)

### Learning Resources

- **Docker Official Tutorial**: [docker.com/101-tutorial](https://www.docker.com/101-tutorial/)
- **Docker Curriculum**: [docker-curriculum.com](https://docker-curriculum.com/)
- **Play with Docker Classroom**: [training.play-with-docker.com](https://training.play-with-docker.com/)
- **Awesome Docker**: [github.com/veggiemonk/awesome-docker](https://github.com/veggiemonk/awesome-docker)

---

**Docker** has revolutionized application deployment and development, making it easier than ever to build, ship, and run applications consistently across any environment. Its containerization technology forms the foundation of modern cloud-native applications and microservices architectures.
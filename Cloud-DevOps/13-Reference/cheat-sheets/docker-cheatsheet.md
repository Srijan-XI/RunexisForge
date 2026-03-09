# Docker Cheat Sheet

> **Quick reference for essential Docker commands and concepts**

---

## 🚀 Quick Start

### Basic Commands

```bash
# Check Docker version
docker --version

# Get system info
docker info

# Test Docker installation
docker run hello-world
```

---

## 📦 Image Commands

### Building Images

```bash
# Build image from Dockerfile in current directory
docker build -t myapp:latest .

# Build with specific Dockerfile
docker build -f Dockerfile.prod -t myapp:prod .

# Build with build arguments
docker build --build-arg VERSION=1.0 -t myapp:1.0 .

# Build without cache
docker build --no-cache -t myapp:latest .
```

### Managing Images

```bash
# List all images
docker images
docker image ls

# List images with filters
docker images --filter "dangling=true"

# Pull image from registry
docker pull nginx:latest

# Push image to registry
docker push username/myapp:latest

# Tag image
docker tag myapp:latest myapp:v1.0

# Remove image
docker rmi myapp:latest

# Remove all unused images
docker image prune -a

# Save image to tar file
docker save -o myapp.tar myapp:latest

# Load image from tar file
docker load -i myapp.tar
```

### Inspecting Images

```bash
# Show image details
docker inspect nginx:latest

# Show image history
docker history nginx:latest

# Show image layers
docker image inspect --format="{{.RootFS.Layers}}" nginx:latest
```

---

## 🏃 Container Commands

### Running Containers

```bash
# Run container (basic)
docker run nginx

# Run container in background (-d = detached)
docker run -d nginx

# Run with port mapping
docker run -p 8080:80 nginx

# Run with name
docker run --name my-nginx nginx

# Run with environment variables
docker run -e MY_VAR=value nginx

# Run with volume mount
docker run -v /host/path:/container/path nginx

# Run with interactive terminal
docker run -it ubuntu /bin/bash

# Run and remove after exit
docker run --rm nginx

# Run with resource limits
docker run --memory="512m" --cpus="1.0" nginx

# Run with restart policy
docker run --restart=always nginx
```

### Managing Containers

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# List with specific format
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"

# Stop container
docker stop <container-id>

# Stop all running containers
docker stop $(docker ps -q)

# Start stopped container
docker start <container-id>

# Restart container
docker restart <container-id>

# Pause container
docker pause <container-id>

# Unpause container
docker unpause <container-id>

# Remove container
docker rm <container-id>

# Remove running container (force)
docker rm -f <container-id>

# Remove all stopped containers
docker container prune

# Rename container
docker rename old-name new-name
```

### Inspecting Containers

```bash
# Show container details
docker inspect <container-id>

# Show container logs
docker logs <container-id>

# Follow log output
docker logs -f <container-id>

# Show last 100 lines
docker logs --tail 100 <container-id>

# Show timestamps
docker logs -t <container-id>

# Show resource usage
docker stats <container-id>

# Show running processes
docker top <container-id>

# Show port mappings
docker port <container-id>

# Show filesystem changes
docker diff <container-id>
```

### Executing Commands

```bash
# Execute command in running container
docker exec <container-id> ls /app

# Execute interactive shell
docker exec -it <container-id> /bin/bash

# Execute as specific user
docker exec -u root <container-id> whoami

# Execute in specific directory
docker exec -w /app <container-id> pwd
```

### Copying Files

```bash
# Copy from container to host
docker cp <container-id>:/path/in/container /host/path

# Copy from host to container
docker cp /host/path <container-id>:/path/in/container
```

---

## 🌐 Network Commands

```bash
# List networks
docker network ls

# Create network
docker network create my-network

# Create bridge network
docker network create --driver bridge my-bridge

# Connect container to network
docker network connect my-network my-container

# Disconnect container from network
docker network disconnect my-network my-container

# Inspect network
docker network inspect my-network

# Remove network
docker network rm my-network

# Remove all unused networks
docker network prune
```

---

## 💾 Volume Commands

```bash
# List volumes
docker volume ls

# Create volume
docker volume create my-volume

# Inspect volume
docker volume inspect my-volume

# Remove volume
docker volume rm my-volume

# Remove all unused volumes
docker volume prune

# Use volume in container
docker run -v my-volume:/data nginx
```

---

## 📝 Dockerfile Best Practices

### Basic Dockerfile

```dockerfile
# Use specific version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Don't run as root
USER node

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node healthcheck.js || exit 1

# Start application
CMD ["node", "server.js"]
```

### Multi-Stage Build

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
CMD ["node", "dist/server.js"]
```

### Dockerfile Tips

✅ **Use .dockerignore** - Exclude unnecessary files
```
node_modules
.git
.env
*.log
```

✅ **Order matters** - Put changing layers last
✅ **Combine RUN commands** - Reduce layers
```dockerfile
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

✅ **Use specific tags** - Avoid "latest"
✅ **Don't run as root** - Security best practice
✅ **Clean up in same layer** - Reduce image size

---

## 🐳 Docker Compose

### docker-compose.yml Example

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
    volumes:
      - ./app:/app
    networks:
      - app-network
  
  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=myapp
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
```

### Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Build and start
docker-compose up --build

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs

# Follow logs
docker-compose logs -f

# List services
docker-compose ps

# Execute command in service
docker-compose exec web sh

# Scale service
docker-compose up -d --scale web=3

# Restart service
docker-compose restart web
```

---

## 🔧 Troubleshooting

### Container Won't Start

```bash
Check logs:
docker logs <container-id>

Check events:
docker events

Inspect container:
docker inspect <container-id>
```

### Port Already in Use

```bash
# Find process using port (Linux/macOS)
lsof -i :8080

# Find process using port (Windows)
netstat -ano | findstr :8080

# Change port mapping
docker run -p 8081:80 nginx
```

### Out of Disk Space

```bash
# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune -a

# Remove all unused volumes
docker volume prune

# Remove everything unused
docker system prune -a --volumes

# Check disk usage
docker system df
```

### Container Running But Not Accessible

```bash
# Check if port is mapped
docker port <container-id>

# Check container IP
docker inspect <container-id> | grep IPAddress

# Test from host
curl http://localhost:8080

# Test from inside container
docker exec <container-id> curl localhost:80
```

---

## 📊 Useful Aliases

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Remove all stopped containers
alias dprune='docker container prune -f'

# Stop all running containers
alias dstop='docker stop $(docker ps -q)'

# Remove all containers
alias drm='docker rm $(docker ps -aq)'

# Remove all images
alias drmi='docker rmi $(docker images -q)'

# Docker compose up
alias dcu='docker-compose up -d'

# Docker compose down
alias dcd='docker-compose down'

# Docker compose logs
alias dcl='docker-compose logs -f'

# Show running containers
alias dps='docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"'
```

---

## 🔐 Security Best Practices

✅ **Don't run as root**
```dockerfile
USER node
```

✅ **Use secrets for sensitive data**
```bash
docker secret create my_secret secret.txt
```

✅ **Scan images for vulnerabilities**
```bash
docker scan myapp:latest
```

✅ **Use minimal base images**
```dockerfile
FROM alpine:latest
```

✅ **Don't expose unnecessary ports**

✅ **Keep images updated**
```bash
docker pull nginx:latest
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com)
- [Docker Hub](https://hub.docker.com)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Security](https://docs.docker.com/engine/security/)

---

**Need more help?**  
👉 Check the [Docker Guide](../04-Containerization/Container-Runtimes/Docker/)

---

*Last Updated: 2026-01-20*  
*Part of the Cloud-DevOps Complete Guide*

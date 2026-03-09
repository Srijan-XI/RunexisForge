# Docker implementation Examples

This directory contains simple examples of how to containerize applications using Docker.

## 1. Python Container (`python-script`)
A simple Python script that prints output and exits.
**Run:**
```bash
cd python-script
docker build -t my-python-app .
docker run my-python-app
```

## 2. Nginx Static Site (`nginx-site`)
Serves a custom HTML page using the Nginx web server.
**Run:**
```bash
cd nginx-site
docker build -t my-website .
docker run -d -p 8080:80 my-website
```
Visit `http://localhost:8080` to see it.

## 3. Node.js Web App (`node-app`)
A minimal HTTP server running on Node.js.
**Run:**
```bash
cd node-app
docker build -t my-node-app .
docker run -d -p 3000:3000 my-node-app
```
Visit `http://localhost:3000` to see changes.

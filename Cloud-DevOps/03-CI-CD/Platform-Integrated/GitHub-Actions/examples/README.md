# GitHub Actions Workflow Examples

This directory contains example YAML configurations for common GitHub Actions workflows.

1.  **`basic-ci.yml`**: A standard Continuous Integration setup for a Node.js application. It runs tests across multiple Node versions using a matrix strategy.
2.  **`docker-publish.yml`**: A workflow to build a Docker container and push it to the GitHub Container Registry (GHCR).
3.  **`scheduled-cron.yml`**: A workflow that runs on a schedule (Cron job) or can be manually triggered.

## How to use

1.  Create a folder `.github/workflows/` in the root of your repository.
2.  Copy one of these `.yml` files into that folder.
3.  Push to GitHub.

# Nomad

## Introduction

HashiCorp Nomad is a flexible workload orchestrator that enables an organization to deploy and manage any containerized or legacy application using a single, unified workflow.

Unlike Kubernetes, which focuses primarily on Docker, Nomad can schedule:
*   Docker containers
*   Java Jars
*   Virtual Machines (QEMU)
*   Raw binaries / Shell commands

## Installation

*   **Linux**: `sudo apt install nomad`
*   **Windows**: `winget install HashiCorp.Nomad`

## Usage (Job Specification)

Nomad uses HCL files to define jobs.

### Example `example.nomad`

```hcl
job "example" {
  datacenters = ["dc1"]

  group "cache" {
    # How many copies?
    count = 3

    task "redis" {
      driver = "docker"

      config {
        image = "redis:7"
        ports = ["db"]
      }

      resources {
        cpu    = 500
        memory = 256
      }
    }
  }
}
```

Run the job:
```bash
nomad job run example.nomad
```

## Real World Use Case
**Mixed Workloads**: A company has 80% of its apps in Docker, but 20% represent legacy Java apps that are too hard to containerize. Moving to Kubernetes would force a rewrite or complex VMs. Nomad schedules the Docker containers alongside the raw Java JARs on the same servers, managed by the same tool.

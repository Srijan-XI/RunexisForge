# OpenTelemetry — Introduction

OpenTelemetry (OTel) is a vendor-neutral standard for collecting traces, metrics, and logs from applications and infrastructure.

## Why OpenTelemetry?

- Unified instrumentation for traces/metrics/logs
- Vendor-agnostic: export to many backends (Prometheus, Jaeger, Zipkin, Grafana Tempo/Loki, Azure Monitor, AWS X-Ray)
- Standard semantic conventions and auto-instrumentation libraries
- Collector decouples signal ingestion from storage/analysis

## Key concepts

- **Signals**: traces, metrics, logs
- **SDK**: language-specific client libraries for instrumentation
- **Exporter**: sends data to a backend
- **Collector**: receives/processes/exports signals (pipelines)
- **Resource**: attributes describing the service (name, version, env)

## When to use

- You need consistent telemetry across languages and services
- You want to switch observability backends without re-instrumenting
- You run microservices and need distributed tracing

## Where to go next

- User guide: `OpenTelemetry/user-guide.md`
- Examples: configure Collector pipelines and language SDKs

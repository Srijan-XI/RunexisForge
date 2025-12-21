# Apache Kafka — Introduction

## Overview
Apache Kafka is a distributed event streaming platform used to publish, store, and process streams of records (events). It’s commonly used for real-time analytics, microservice communication, log aggregation, CDC pipelines, and event-driven architectures.

## Why Kafka?
- **High throughput** and **low latency** event ingestion
- **Durable** storage of event streams (append-only log)
- **Scales horizontally** via partitions
- **Ecosystem**: Kafka Connect, Kafka Streams, Schema Registry (Confluent ecosystem)

## Core Concepts
- **Topic**: Named stream of events
- **Partition**: Kafka splits a topic into partitions for parallelism and scale
- **Producer**: Writes events to topics
- **Consumer**: Reads events from topics
- **Consumer group**: Multiple consumers share work for a topic
- **Offset**: Position of a consumer in a partition
- **Broker**: Kafka server node

## Typical Use Cases
- Event-driven microservices
- Real-time metrics and monitoring
- Log aggregation
- Data pipelines (Connect + sinks/sources)
- Stream processing

## Prerequisites
- A running Kafka cluster (local Docker is easiest)
- A client library (Java/Python/etc.)

## Resources
- Official docs: https://kafka.apache.org/documentation/
- Kafka quickstart: https://kafka.apache.org/quickstart

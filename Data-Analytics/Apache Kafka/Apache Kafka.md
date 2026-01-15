# Apache Kafka

## Introduction

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

- Official docs: <https://kafka.apache.org/documentation/>
- Kafka quickstart: <https://kafka.apache.org/quickstart>

---

## User Guide

## 1) Run Kafka Locally (Docker Compose)

Kafka setups vary (ZooKeeper vs KRaft). For learning, use a Compose stack you trust.

If you already have a Kafka stack, you can skip this section.

## 2) Python Client (Producer/Consumer)

Install a Python Kafka client:

```bash
pip install kafka-python
```bash

Run producer:

```bash
python "Apache Kafka/examples/producer.py"
```bash

Run consumer in another terminal:

```bash
python "Apache Kafka/examples/consumer.py"
```bash

## 3) Key Practices

- Use **keys** to control partitioning (ordering per key)
- Commit offsets responsibly (auto vs manual)
- Plan topic partitions early (hard to change without operational work)

## Troubleshooting

- Connection refused: broker not running or wrong host/port
- Consumer receives nothing: topic empty, wrong topic, or consumer group offsets already at end

## Examples & Practice

- Examples: `Apache Kafka/examples/`
- Practice: `Apache Kafka/questions/`


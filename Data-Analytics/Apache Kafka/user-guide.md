# Apache Kafka — User Guide

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

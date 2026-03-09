from __future__ import annotations

# Task:
# Send 3 JSON events to a topic.
# Requires a running Kafka and: pip install kafka-python

import json
import time
from kafka import KafkaProducer


def main() -> None:
    producer = KafkaProducer(
        bootstrap_servers="localhost:9092",
        value_serializer=lambda v: json.dumps(v).encode("utf-8"),
    )

    topic = "practice-topic"

    for i in range(3):
        event = {"i": i, "ts": time.time()}
        producer.send(topic, value=event)
        print("sent:", event)

    producer.flush()
    producer.close()


if __name__ == "__main__":
    main()

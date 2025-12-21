from __future__ import annotations

# Task:
# Consume JSON events from a topic and print them.
# Requires a running Kafka and: pip install kafka-python

import json
from kafka import KafkaConsumer


def main() -> None:
    consumer = KafkaConsumer(
        "practice-topic",
        bootstrap_servers="localhost:9092",
        group_id="practice-group",
        auto_offset_reset="earliest",
        value_deserializer=lambda b: json.loads(b.decode("utf-8")),
    )

    for msg in consumer:
        print(msg.value)


if __name__ == "__main__":
    main()

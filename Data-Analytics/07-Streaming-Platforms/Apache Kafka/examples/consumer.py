from __future__ import annotations

# Requires:
#   pip install kafka-python
# Also requires a running Kafka broker (host/port below).

import json
from kafka import KafkaConsumer


def main() -> None:
    consumer = KafkaConsumer(
        "demo-topic",
        bootstrap_servers="localhost:9092",
        group_id="demo-group",
        auto_offset_reset="earliest",
        enable_auto_commit=True,
        value_deserializer=lambda b: json.loads(b.decode("utf-8")),
        key_deserializer=lambda b: b.decode("utf-8") if b is not None else None,
    )

    print("Waiting for messages...")
    for msg in consumer:
        print("received:", {"key": msg.key, "value": msg.value, "partition": msg.partition, "offset": msg.offset})


if __name__ == "__main__":
    main()

from __future__ import annotations

# Requires:
#   pip install kafka-python
# Also requires a running Kafka broker (host/port below).

import json
import time
from kafka import KafkaProducer


def main() -> None:
    producer = KafkaProducer(
        bootstrap_servers="localhost:9092",
        value_serializer=lambda v: json.dumps(v).encode("utf-8"),
        key_serializer=lambda k: k.encode("utf-8") if k is not None else None,
    )

    topic = "demo-topic"

    for i in range(5):
        event = {"i": i, "ts": time.time()}
        producer.send(topic, key="demo", value=event)
        print("sent:", event)
        time.sleep(0.5)

    producer.flush()
    producer.close()


if __name__ == "__main__":
    main()

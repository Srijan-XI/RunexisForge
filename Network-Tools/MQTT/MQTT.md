# MQTT (Message Queuing Telemetry Transport)

## Introduction

### What is MQTT?

MQTT is a lightweight, publish-subscribe messaging protocol designed for constrained devices and low-bandwidth, high-latency, or unreliable networks. Originally developed by IBM in 1999 for monitoring oil pipelines, it has become the standard protocol for Internet of Things (IoT) communications.

### Why MQTT?

- Extremely lightweight (2-byte header minimum)
- Low power consumption
- Designed for unreliable networks
- Quality of Service (QoS) levels
- Persistent sessions
- Last Will and Testament (LWT)
- Retained messages
- Simple publish/subscribe model
- Bi-directional communication
- Secure with TLS/SSL

## Prerequisites

- Basic understanding of pub/sub messaging
- Network fundamentals
- (Optional) SSL/TLS knowledge for security
- IoT device or simulator

## Installation

### Mosquitto Broker (Popular MQTT Broker)

#### Linux (Ubuntu/Debian)

```bash
# Install Mosquitto
sudo apt update
sudo apt install mosquitto mosquitto-clients

# Start service
sudo systemctl start mosquitto
sudo systemctl enable mosquitto

# Check status
sudo systemctl status mosquitto
```

#### macOS

```bash
# Install via Homebrew
brew install mosquitto

# Start broker
brew services start mosquitto

# Or run manually
/opt/homebrew/opt/mosquitto/sbin/mosquitto -c /opt/homebrew/etc/mosquitto/mosquitto.conf
```

#### Docker

```bash
# Run Mosquitto
docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto

# With custom config
docker run -it -p 1883:1883 -p 9001:9001 \
  -v $(pwd)/mosquitto.conf:/mosquitto/config/mosquitto.conf \
  eclipse-mosquitto
```

### HiveMQ (Enterprise MQTT Broker)

```bash
# Download HiveMQ
wget https://www.hivemq.com/downloads/hivemq-4.24.0.zip
unzip hivemq-4.24.0.zip
cd hivemq-4.24.0

# Start HiveMQ
./bin/run.sh
```

## Core Concepts

### Quality of Service (QoS)

**QoS 0 - At most once**
- Fire and forget
- No acknowledgment
- Fastest, least reliable

**QoS 1 - At least once**
- Acknowledged delivery
- May receive duplicates
- Good balance

**QoS 2 - Exactly once**
- Guaranteed single delivery
- Slowest, most reliable
- Four-way handshake

### Topics

```
# Topic hierarchy
home/livingroom/temperature
home/bedroom/humidity
home/kitchen/light/status

# Wildcards
home/+/temperature        # + matches one level
home/#                    # # matches multiple levels
```

## Python Client (paho-mqtt)

### Installation

```bash
pip install paho-mqtt
```

### Simple Publisher

```python
import paho.mqtt.client as mqtt
import time
import json

# Create client
client = mqtt.Client(client_id="publisher-001")

# Connect to broker
client.connect("localhost", 1883, 60)

# Publish messages
for i in range(10):
    payload = json.dumps({
        "sensor_id": "temp-001",
        "temperature": 20 + i,
        "timestamp": time.time()
    })
    
    client.publish(
        topic="home/livingroom/temperature",
        payload=payload,
        qos=1,
        retain=False
    )
    
    print(f"Published: {payload}")
    time.sleep(1)

client.disconnect()
```

### Simple Subscriber

```python
import paho.mqtt.client as mqtt
import json

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    # Subscribe on connect
    client.subscribe("home/livingroom/temperature", qos=1)

def on_message(client, userdata, msg):
    print(f"Topic: {msg.topic}")
    print(f"QoS: {msg.qos}")
    
    payload = json.loads(msg.payload.decode())
    print(f"Temperature: {payload['temperature']}°C")
    print(f"Timestamp: {payload['timestamp']}")
    print("---")

# Create client
client = mqtt.Client(client_id="subscriber-001")

# Attach callbacks
client.on_connect = on_connect
client.on_message = on_message

# Connect and loop
client.connect("localhost", 1883, 60)
client.loop_forever()
```

### Advanced Features

```python
import paho.mqtt.client as mqtt
import time

class MQTTClient:
    def __init__(self, broker, port=1883):
        self.client = mqtt.Client(
            client_id="advanced-client",
            clean_session=True,
            userdata=None,
            protocol=mqtt.MQTTv311,
            transport="tcp"
        )
        
        # Set callbacks
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.on_publish = self.on_publish
        self.client.on_disconnect = self.on_disconnect
        
        # Last Will and Testament
        self.client.will_set(
            topic="clients/status",
            payload="Client disconnected unexpectedly",
            qos=1,
            retain=True
        )
        
        # Authentication
        self.client.username_pw_set("username", "password")
        
        # TLS/SSL
        # self.client.tls_set(
        #     ca_certs="/path/to/ca.crt",
        #     certfile="/path/to/client.crt",
        #     keyfile="/path/to/client.key"
        # )
        
        self.broker = broker
        self.port = port
    
    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            print("Connected successfully")
            # Subscribe to topics
            client.subscribe([
                ("sensors/+/temperature", 1),
                ("sensors/+/humidity", 1),
                ("alerts/#", 2)
            ])
        else:
            print(f"Connection failed: {rc}")
    
    def on_message(self, client, userdata, msg):
        print(f"Received: {msg.topic} - {msg.payload.decode()}")
    
    def on_publish(self, client, userdata, mid):
        print(f"Message {mid} published")
    
    def on_disconnect(self, client, userdata, rc):
        if rc != 0:
            print(f"Unexpected disconnect: {rc}")
    
    def connect(self):
        self.client.connect(self.broker, self.port, 60)
    
    def publish(self, topic, payload, qos=0, retain=False):
        result = self.client.publish(topic, payload, qos, retain)
        return result
    
    def start(self):
        self.client.loop_start()
    
    def stop(self):
        self.client.loop_stop()
        self.client.disconnect()

# Usage
mqtt_client = MQTTClient("localhost")
mqtt_client.connect()
mqtt_client.start()

# Publish
mqtt_client.publish("test/topic", "Hello MQTT", qos=1)

time.sleep(5)
mqtt_client.stop()
```

## Node.js Client

### Installation

```bash
npm install mqtt
```

### Publisher

```javascript
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883', {
  clientId: 'node-publisher',
  clean: true,
  connectTimeout: 4000,
  username: 'username',
  password: 'password',
  reconnectPeriod: 1000,
});

client.on('connect', () => {
  console.log('Connected to broker');
  
  setInterval(() => {
    const payload = JSON.stringify({
      temperature: 20 + Math.random() * 10,
      humidity: 50 + Math.random() * 20,
      timestamp: Date.now()
    });
    
    client.publish('home/livingroom/sensors', payload, {
      qos: 1,
      retain: false
    }, (error) => {
      if (error) {
        console.error('Publish error:', error);
      } else {
        console.log('Published:', payload);
      }
    });
  }, 1000);
});

client.on('error', (error) => {
  console.error('Connection error:', error);
});
```

### Subscriber

```javascript
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883', {
  clientId: 'node-subscriber',
  will: {
    topic: 'clients/status',
    payload: 'Client disconnected',
    qos: 1,
    retain: true
  }
});

client.on('connect', () => {
  console.log('Connected to broker');
  
  // Subscribe to topics
  client.subscribe('home/+/sensors', { qos: 1 });
  client.subscribe('alerts/#', { qos: 2 });
});

client.on('message', (topic, message, packet) => {
  console.log('Topic:', topic);
  console.log('QoS:', packet.qos);
  console.log('Payload:', message.toString());
  
  try {
    const data = JSON.parse(message.toString());
    console.log('Temperature:', data.temperature);
    console.log('Humidity:', data.humidity);
  } catch (e) {
    console.error('Parse error:', e);
  }
});

client.on('error', (error) => {
  console.error('Error:', error);
});
```

## ESP32/Arduino (C++)

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "your-wifi-ssid";
const char* password = "your-wifi-password";
const char* mqtt_server = "broker.example.com";

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    if (client.connect("ESP32Client")) {
      Serial.println("connected");
      client.subscribe("home/commands");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  // Publish sensor data
  float temperature = 25.5;  // Read from sensor
  char msg[50];
  snprintf(msg, 50, "Temperature: %.2f", temperature);
  
  client.publish("home/livingroom/temperature", msg);
  
  delay(2000);
}
```

## Broker Configuration

### Mosquitto Configuration

```conf
# mosquitto.conf

# Listeners
listener 1883
protocol mqtt

listener 8883
protocol mqtt
cafile /etc/mosquitto/certs/ca.crt
certfile /etc/mosquitto/certs/server.crt
keyfile /etc/mosquitto/certs/server.key

listener 9001
protocol websockets

# Authentication
allow_anonymous false
password_file /etc/mosquitto/passwd

# Persistence
persistence true
persistence_location /var/lib/mosquitto/

# Logging
log_dest file /var/log/mosquitto/mosquitto.log
log_type all

# Limits
max_connections 1000
max_queued_messages 1000
message_size_limit 1048576

# ACL (Access Control)
acl_file /etc/mosquitto/acl
```

### Create Password File

```bash
# Create password file
mosquitto_passwd -c /etc/mosquitto/passwd username

# Add more users
mosquitto_passwd -b /etc/mosquitto/passwd user2 password2
```

### Access Control List (ACL)

```conf
# /etc/mosquitto/acl

# Admin user
user admin
topic readwrite #

# Sensor user
user sensor_user
topic write sensors/#
topic read commands/+

# Monitor user
user monitor
topic read sensors/#
topic read alerts/#
```

## Security (TLS/SSL)

### Generate Certificates

```bash
# Generate CA
openssl genrsa -out ca.key 2048
openssl req -new -x509 -days 365 -key ca.key -out ca.crt

# Generate server certificate
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365

# Generate client certificate
openssl genrsa -out client.key 2048
openssl req -new -key client.key -out client.csr
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365
```

### Python TLS Client

```python
import paho.mqtt.client as mqtt

client = mqtt.Client()

# Configure TLS
client.tls_set(
    ca_certs="ca.crt",
    certfile="client.crt",
    keyfile="client.key",
    tls_version=mqtt.ssl.PROTOCOL_TLSv1_2
)

# Connect to secure port
client.connect("broker.example.com", 8883, 60)
```

## Retained Messages

```python
# Publisher
client.publish(
    "home/status",
    "online",
    qos=1,
    retain=True  # Last message retained
)

# New subscribers receive retained message immediately
```

## Last Will and Testament (LWT)

```python
import paho.mqtt.client as mqtt

client = mqtt.Client()

# Set LWT before connecting
client.will_set(
    topic="clients/device001/status",
    payload="offline",
    qos=1,
    retain=True
)

client.connect("localhost", 1883)

# When client disconnects unexpectedly,
# broker publishes LWT message
```

## Persistent Sessions

```python
# Publisher with clean session = False
client = mqtt.Client(client_id="unique-id", clean_session=False)
client.connect("localhost", 1883)

# Messages sent while offline will be queued (QoS > 0)
```

## Best Practices

### Topic Design

```python
# Good - Hierarchical structure
"factory/building1/floor2/machine5/temperature"
"home/bedroom/sensor1/humidity"

# Bad - Flat structure
"sensor_temp_001"
"humidity_reading"

# Use wildcards for subscriptions
client.subscribe("factory/+/+/+/temperature")  # All temperatures
client.subscribe("home/#")  # Everything in home
```

### Message Payload

```python
import json

# Good - JSON for complex data
payload = json.dumps({
    "sensor_id": "temp-001",
    "value": 25.5,
    "unit": "celsius",
    "timestamp": 1234567890
})

# Good - Plain text for simple values
payload = "25.5"

# Keep messages small (<256 bytes ideal for IoT)
```

### Error Handling

```python
import paho.mqtt.client as mqtt
import time

class RobustMQTTClient:
    def __init__(self):
        self.client = mqtt.Client()
        self.client.on_connect = self.on_connect
        self.client.on_disconnect = self.on_disconnect
        self.connected = False
    
    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            self.connected = True
            print("Connected")
        else:
            print(f"Connection failed: {rc}")
    
    def on_disconnect(self, client, userdata, rc):
        self.connected = False
        if rc != 0:
            print("Unexpected disconnect, reconnecting...")
            self.reconnect()
    
    def reconnect(self):
        while not self.connected:
            try:
                self.client.reconnect()
                time.sleep(1)
            except Exception as e:
                print(f"Reconnect failed: {e}")
                time.sleep(5)
```

## Monitoring and Debugging

### Command Line Tools

```bash
# Subscribe to topic
mosquitto_sub -h localhost -t "sensors/#" -v

# Publish message
mosquitto_pub -h localhost -t "test/topic" -m "Hello MQTT"

# With authentication
mosquitto_sub -h localhost -t "sensors/#" -u username -P password

# With TLS
mosquitto_sub -h broker.example.com -p 8883 \
  --cafile ca.crt --cert client.crt --key client.key \
  -t "sensors/#"

# Subscribe to all topics
mosquitto_sub -h localhost -t "#" -v
```

## Performance Optimization

### Connection Pooling

```python
# Reuse connections
class ConnectionPool:
    def __init__(self, broker, size=10):
        self.connections = []
        for i in range(size):
            client = mqtt.Client(f"client-{i}")
            client.connect(broker, 1883)
            self.connections.append(client)
    
    def get_connection(self):
        return self.connections[0]  # Round-robin in production
```

### Batching

```python
# Batch small messages
messages = []
for i in range(100):
    messages.append(f"sensor{i}:{i}")

# Send as single JSON
import json
client.publish("sensors/batch", json.dumps(messages))
```

## Troubleshooting

### Common Issues

```python
# Connection refused
# Check: Broker running? Port correct? Firewall?

# Messages not received
# Check: Correct topic? QoS level? Subscription successful?

# High latency
# Check: Network quality? Broker load? QoS level?

# Memory issues
# Solution: Use QoS 0, limit message size, clean sessions
```

## Resources

- [MQTT Specification](https://mqtt.org/mqtt-specification/)
- [Eclipse Mosquitto](https://mosquitto.org/)
- [HiveMQ](https://www.hivemq.com/)
- [Paho MQTT](https://www.eclipse.org/paho/)
- [MQTT.org](https://mqtt.org/)

## Next Steps

- Set up MQTT broker
- Create publisher and subscriber
- Implement security (TLS/SSL)
- Design topic hierarchy
- Configure QoS levels
- Implement LWT
- Set up retained messages
- Monitor broker performance
- Build IoT applications
- Deploy to production

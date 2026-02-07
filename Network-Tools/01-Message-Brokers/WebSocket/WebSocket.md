# WebSocket

## Introduction

### What is WebSocket?

WebSocket is a computer communications protocol that provides full-duplex communication channels over a single TCP connection. It enables interaction between a web browser (or other client application) and a web server with lower overhead than half-duplex alternatives like HTTP polling, facilitating real-time data transfer.

### Why WebSocket?

- Full-duplex bidirectional communication
- Low latency (no polling overhead)
- Persistent connection
- Reduced bandwidth usage
- Real-time updates
- Works through firewalls and proxies
- Browser support (all modern browsers)
- Server push capability
- Less overhead than HTTP
- Suitable for gaming, chat, live feeds

## Prerequisites

- Basic understanding of HTTP
- JavaScript/Node.js knowledge
- Understanding of client-server architecture
- Network fundamentals

## Core Concepts

### Connection Upgrade

```
Client → HTTP Upgrade Request → Server
Server → WebSocket Handshake Response → Client
     ↓
WebSocket Connection Established
```

### HTTP Upgrade Request

```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

### Server Response

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

## Browser WebSocket API

### Basic Client

```html
<!DOCTYPE html>
<html>
<head>
    <title>WebSocket Client</title>
</head>
<body>
    <h1>WebSocket Demo</h1>
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Enter message">
    <button onclick="sendMessage()">Send</button>

    <script>
        // Create WebSocket connection
        const ws = new WebSocket('ws://localhost:8080');

        // Connection opened
        ws.addEventListener('open', (event) => {
            console.log('Connected to WebSocket server');
            addMessage('Connected to server');
        });

        // Listen for messages
        ws.addEventListener('message', (event) => {
            console.log('Message from server:', event.data);
            addMessage('Server: ' + event.data);
        });

        // Connection closed
        ws.addEventListener('close', (event) => {
            console.log('Disconnected from server');
            addMessage('Disconnected from server');
        });

        // Connection error
        ws.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
            addMessage('Error: ' + error.message);
        });

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value;
            
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(message);
                addMessage('You: ' + message);
                input.value = '';
            } else {
                addMessage('Not connected');
            }
        }

        function addMessage(message) {
            const messagesDiv = document.getElementById('messages');
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messagesDiv.appendChild(messageElement);
        }

        // Send JSON
        function sendJSON() {
            const data = {
                type: 'message',
                content: 'Hello',
                timestamp: Date.now()
            };
            ws.send(JSON.stringify(data));
        }

        // Send binary data
        function sendBinary() {
            const buffer = new ArrayBuffer(8);
            const view = new DataView(buffer);
            view.setInt32(0, 42);
            ws.send(buffer);
        }
    </script>
</body>
</html>
```

### Advanced Client Features

```javascript
class WebSocketClient {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.reconnectInterval = 1000;
        this.maxReconnectAttempts = 5;
        this.reconnectAttempts = 0;
    }

    connect() {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('Connected');
            this.reconnectAttempts = 0;
            this.onOpen();
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.onMessage(data);
            } catch (e) {
                this.onMessage(event.data);
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.onError(error);
        };

        this.ws.onclose = () => {
            console.log('Disconnected');
            this.onClose();
            this.reconnect();
        };
    }

    reconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
            setTimeout(() => this.connect(), this.reconnectInterval);
        } else {
            console.log('Max reconnect attempts reached');
        }
    }

    send(data) {
        if (this.ws.readyState === WebSocket.OPEN) {
            const message = typeof data === 'object' 
                ? JSON.stringify(data) 
                : data;
            this.ws.send(message);
        } else {
            console.error('WebSocket is not open');
        }
    }

    close() {
        this.reconnectAttempts = this.maxReconnectAttempts;
        if (this.ws) {
            this.ws.close();
        }
    }

    // Override these methods
    onOpen() {}
    onMessage(data) { console.log('Message:', data); }
    onError(error) { console.error('Error:', error); }
    onClose() { console.log('Connection closed'); }
}

// Usage
const client = new WebSocketClient('ws://localhost:8080');
client.onMessage = (data) => {
    console.log('Received:', data);
};
client.connect();
```

## Node.js WebSocket Server (ws library)

### Installation

```bash
npm install ws
```

### Basic Server

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send welcome message
    ws.send('Welcome to WebSocket server!');

    // Receive messages
    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        
        // Echo back
        ws.send(`Echo: ${message}`);
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    // Handle disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');
```

### Broadcast to All Clients

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('Broadcasting:', message.toString());
        
        // Broadcast to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});
```

### Advanced Server with Room Support

```javascript
const WebSocket = require('ws');

class WebSocketServer {
    constructor(port) {
        this.wss = new WebSocket.Server({ port });
        this.rooms = new Map();
        this.clients = new Map();
        
        this.wss.on('connection', (ws, req) => {
            this.handleConnection(ws, req);
        });
    }

    handleConnection(ws, req) {
        const clientId = this.generateId();
        this.clients.set(clientId, { ws, rooms: new Set() });
        
        console.log(`Client ${clientId} connected`);

        ws.on('message', (data) => {
            this.handleMessage(clientId, data);
        });

        ws.on('close', () => {
            this.handleDisconnect(clientId);
        });

        // Send client ID
        ws.send(JSON.stringify({
            type: 'connected',
            clientId: clientId
        }));
    }

    handleMessage(clientId, data) {
        try {
            const message = JSON.parse(data);
            
            switch (message.type) {
                case 'join':
                    this.joinRoom(clientId, message.room);
                    break;
                case 'leave':
                    this.leaveRoom(clientId, message.room);
                    break;
                case 'message':
                    this.sendToRoom(message.room, clientId, message.content);
                    break;
                case 'broadcast':
                    this.broadcast(clientId, message.content);
                    break;
            }
        } catch (e) {
            console.error('Parse error:', e);
        }
    }

    joinRoom(clientId, room) {
        if (!this.rooms.has(room)) {
            this.rooms.set(room, new Set());
        }
        
        this.rooms.get(room).add(clientId);
        this.clients.get(clientId).rooms.add(room);
        
        console.log(`Client ${clientId} joined room ${room}`);
        
        // Notify room
        this.sendToRoom(room, clientId, {
            type: 'user_joined',
            clientId: clientId
        });
    }

    leaveRoom(clientId, room) {
        if (this.rooms.has(room)) {
            this.rooms.get(room).delete(clientId);
            this.clients.get(clientId).rooms.delete(room);
            
            console.log(`Client ${clientId} left room ${room}`);
        }
    }

    sendToRoom(room, senderId, content) {
        if (!this.rooms.has(room)) return;
        
        const message = JSON.stringify({
            type: 'message',
            room: room,
            from: senderId,
            content: content
        });
        
        this.rooms.get(room).forEach((clientId) => {
            const client = this.clients.get(clientId);
            if (client && client.ws.readyState === WebSocket.OPEN) {
                client.ws.send(message);
            }
        });
    }

    broadcast(senderId, content) {
        const message = JSON.stringify({
            type: 'broadcast',
            from: senderId,
            content: content
        });
        
        this.clients.forEach((client, clientId) => {
            if (clientId !== senderId && client.ws.readyState === WebSocket.OPEN) {
                client.ws.send(message);
            }
        });
    }

    handleDisconnect(clientId) {
        const client = this.clients.get(clientId);
        
        if (client) {
            // Remove from all rooms
            client.rooms.forEach((room) => {
                this.leaveRoom(clientId, room);
            });
            
            this.clients.delete(clientId);
            console.log(`Client ${clientId} disconnected`);
        }
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

const server = new WebSocketServer(8080);
console.log('WebSocket server with rooms on ws://localhost:8080');
```

## Python WebSocket Server (websockets)

### Installation

```bash
pip install websockets
```

### Async Server

```python
import asyncio
import websockets
import json

connected_clients = set()

async def handler(websocket):
    # Register client
    connected_clients.add(websocket)
    print(f"Client connected. Total clients: {len(connected_clients)}")
    
    try:
        # Send welcome message
        await websocket.send("Welcome to WebSocket server!")
        
        # Handle messages
        async for message in websocket:
            print(f"Received: {message}")
            
            try:
                data = json.loads(message)
                
                # Broadcast to all clients
                await broadcast(json.dumps({
                    'type': 'message',
                    'content': data.get('content', '')
                }))
            except json.JSONDecodeError:
                await websocket.send(f"Echo: {message}")
    
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")
    finally:
        connected_clients.remove(websocket)

async def broadcast(message):
    if connected_clients:
        await asyncio.gather(
            *[client.send(message) for client in connected_clients],
            return_exceptions=True
        )

async def main():
    async with websockets.serve(handler, "localhost", 8080):
        print("WebSocket server running on ws://localhost:8080")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
```

### Python Client

```python
import asyncio
import websockets
import json

async def client():
    uri = "ws://localhost:8080"
    
    async with websockets.connect(uri) as websocket:
        print("Connected to server")
        
        # Receive welcome message
        welcome = await websocket.recv()
        print(f"Server: {welcome}")
        
        # Send messages
        for i in range(5):
            message = json.dumps({
                'type': 'message',
                'content': f'Hello {i}'
            })
            
            await websocket.send(message)
            print(f"Sent: {message}")
            
            # Receive response
            response = await websocket.recv()
            print(f"Received: {response}")
            
            await asyncio.sleep(1)

if __name__ == "__main__":
    asyncio.run(client())
```

## Express.js Integration

```javascript
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static('public'));

// HTTP routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// WebSocket handling
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        ws.send(`Echo: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
```

## Security

### Secure WebSocket (wss://)

```javascript
const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = https.createServer({
    cert: fs.readFileSync('/path/to/cert.pem'),
    key: fs.readFileSync('/path/to/key.pem')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Secure connection established');
});

server.listen(8443, () => {
    console.log('Secure WebSocket server on wss://localhost:8443');
});
```

### Authentication

```javascript
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
    // Extract token from URL
    const params = new URLSearchParams(req.url.slice(1));
    const token = params.get('token');
    
    try {
        const user = jwt.verify(token, 'secret-key');
        ws.userId = user.id;
        
        console.log(`Authenticated user ${user.id}`);
        
        ws.on('message', (message) => {
            console.log(`Message from user ${ws.userId}:`, message.toString());
        });
    } catch (e) {
        ws.close(1008, 'Invalid token');
    }
});
```

## Best Practices

### Heartbeat/Ping-Pong

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

function heartbeat() {
    this.isAlive = true;
}

wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
});

// Check for dead connections every 30 seconds
const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            return ws.terminate();
        }
        
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

wss.on('close', () => {
    clearInterval(interval);
});
```

### Message Compression

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 8080,
    perMessageDeflate: {
        zlibDeflateOptions: {
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        threshold: 1024
    }
});
```

## Troubleshooting

### Connection Issues

```javascript
// Client-side debugging
const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('error', (error) => {
    console.error('Connection error:', error);
    // Check: Is server running? Correct URL? Firewall blocking?
});

ws.addEventListener('close', (event) => {
    console.log('Close code:', event.code);
    console.log('Close reason:', event.reason);
    console.log('Was clean:', event.wasClean);
});
```

## Resources

- [WebSocket API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [RFC 6455](https://tools.ietf.org/html/rfc6455)
- [ws Library Documentation](https://github.com/websockets/ws)
- [websockets Python Library](https://websockets.readthedocs.io/)
- [WebSocket.org](https://www.websocket.org/)

## Next Steps

- Implement WebSocket client
- Create WebSocket server
- Add authentication
- Implement rooms/channels
- Set up SSL/TLS
- Add compression
- Implement heartbeat
- Handle reconnection
- Build real-time application
- Deploy to production

# Socket.IO

## Introduction

### What is Socket.IO?

Socket.IO is a JavaScript library for real-time, bidirectional and event-based communication between web clients and servers. It consists of a Node.js server library and a JavaScript client library (or native clients for other platforms). While it can use WebSocket as a transport, it adds additional features like automatic reconnection, packet buffering, acknowledgments, broadcasting, and multiplexing.

### Why Socket.IO?

- Automatic reconnection with exponential backoff
- Built-in room and namespace support
- Event-based messaging (not just strings)
- Acknowledgment callbacks
- Binary data support
- Fallback to HTTP long-polling if WebSocket unavailable
- Connection state recovery
- Middleware support
- Broadcasting capabilities
- Cross-platform clients (iOS, Android, C++, Java, Swift)

### Socket.IO vs WebSocket

| Feature | WebSocket | Socket.IO |
|---------|-----------|-----------|
| Protocol | WebSocket only | WebSocket + fallbacks |
| Auto-reconnect | No | Yes |
| Rooms/Namespaces | No | Yes |
| Events | No (only message) | Yes |
| Acknowledgments | No | Yes |
| Middleware | No | Yes |
| Broadcasting | Manual | Built-in |

## Prerequisites

- Node.js installed
- Basic JavaScript knowledge
- Understanding of events
- HTTP/WebSocket basics

## Installation

### Server

```bash
npm install socket.io
```

### Client (Browser)

```html
<script src="/socket.io/socket.io.js"></script>
```

Or via CDN:

```html
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
```

### Client (Node.js)

```bash
npm install socket.io-client
```

## Basic Server

### Simple Server

```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static('public'));

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for custom events
    socket.on('message', (data) => {
        console.log('Message received:', data);
        
        // Send back to sender
        socket.emit('message', 'Message received: ' + data);
    });

    // Broadcast to all clients
    socket.on('broadcast', (data) => {
        io.emit('broadcast', data);
    });

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

## Basic Client

### Browser Client

```html
<!DOCTYPE html>
<html>
<head>
    <title>Socket.IO Client</title>
    <script src="/socket.io/socket.io.js"></script>
</head>
<body>
    <h1>Socket.IO Demo</h1>
    <div id="messages"></div>
    <input type="text" id="input" placeholder="Type a message">
    <button onclick="sendMessage()">Send</button>
    <button onclick="broadcast()">Broadcast</button>

    <script>
        // Connect to server
        const socket = io();

        // Connection events
        socket.on('connect', () => {
            console.log('Connected to server');
            addMessage('Connected with ID: ' + socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            addMessage('Disconnected');
        });

        // Custom events
        socket.on('message', (data) => {
            console.log('Message:', data);
            addMessage('Server: ' + data);
        });

        socket.on('broadcast', (data) => {
            addMessage('Broadcast: ' + data);
        });

        function sendMessage() {
            const input = document.getElementById('input');
            socket.emit('message', input.value);
            addMessage('You: ' + input.value);
            input.value = '';
        }

        function broadcast() {
            const input = document.getElementById('input');
            socket.emit('broadcast', input.value);
            input.value = '';
        }

        function addMessage(message) {
            const div = document.getElementById('messages');
            const p = document.createElement('p');
            p.textContent = message;
            div.appendChild(p);
        }
    </script>
</body>
</html>
```

### Node.js Client

```javascript
const io = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected:', socket.id);
    
    // Send message
    socket.emit('message', 'Hello from Node.js client');
});

socket.on('message', (data) => {
    console.log('Received:', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected');
});
```

## Rooms

### Server-side Room Management

```javascript
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a room
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`${socket.id} joined room: ${room}`);
        
        // Notify room
        socket.to(room).emit('user-joined', {
            userId: socket.id,
            room: room
        });
        
        // Confirm to sender
        socket.emit('joined-room', room);
    });

    // Leave a room
    socket.on('leave-room', (room) => {
        socket.leave(room);
        console.log(`${socket.id} left room: ${room}`);
        
        socket.to(room).emit('user-left', {
            userId: socket.id,
            room: room
        });
    });

    // Send to specific room
    socket.on('room-message', ({ room, message }) => {
        io.to(room).emit('room-message', {
            from: socket.id,
            message: message,
            room: room
        });
    });

    // Get rooms for this socket
    socket.on('get-rooms', () => {
        const rooms = Array.from(socket.rooms);
        socket.emit('rooms-list', rooms);
    });

    // Broadcast to all rooms except sender
    socket.on('broadcast-to-room', ({ room, message }) => {
        socket.to(room).emit('room-broadcast', {
            from: socket.id,
            message: message
        });
    });
});

// Send to multiple rooms
io.to('room1').to('room2').emit('multi-room', 'Message to multiple rooms');

// Send to room except specific sockets
io.except('socket-id-1').to('room1').emit('message', 'data');
```

### Client-side Room Usage

```javascript
const socket = io();

// Join room
socket.emit('join-room', 'chat-room-1');

socket.on('joined-room', (room) => {
    console.log('Successfully joined:', room);
});

socket.on('user-joined', (data) => {
    console.log('User joined:', data.userId);
});

// Send to room
socket.emit('room-message', {
    room: 'chat-room-1',
    message: 'Hello everyone!'
});

// Receive room messages
socket.on('room-message', (data) => {
    console.log(`Message from ${data.from} in ${data.room}:`, data.message);
});

// Leave room
socket.emit('leave-room', 'chat-room-1');
```

## Namespaces

### Server Namespaces

```javascript
const { Server } = require('socket.io');
const io = new Server(server);

// Default namespace "/"
io.on('connection', (socket) => {
    console.log('User connected to default namespace');
});

// Custom namespace "/chat"
const chatNamespace = io.of('/chat');

chatNamespace.on('connection', (socket) => {
    console.log('User connected to /chat:', socket.id);
    
    socket.on('chat-message', (data) => {
        chatNamespace.emit('chat-message', data);
    });
});

// Custom namespace "/admin"
const adminNamespace = io.of('/admin');

adminNamespace.on('connection', (socket) => {
    console.log('Admin connected:', socket.id);
    
    // Admin-specific events
    socket.on('admin-command', (command) => {
        console.log('Admin command:', command);
        adminNamespace.emit('admin-notification', command);
    });
});

// Dynamic namespaces
io.of(/^\/dynamic-\w+$/).on('connection', (socket) => {
    const namespace = socket.nsp.name;
    console.log(`Connected to dynamic namespace: ${namespace}`);
});
```

### Client Namespaces

```javascript
// Connect to default namespace
const defaultSocket = io();

// Connect to custom namespace
const chatSocket = io('/chat');
const adminSocket = io('/admin');

chatSocket.on('connect', () => {
    console.log('Connected to /chat');
    chatSocket.emit('chat-message', 'Hello chat!');
});

adminSocket.on('connect', () => {
    console.log('Connected to /admin');
    adminSocket.emit('admin-command', 'status');
});

// Dynamic namespace
const dynamicSocket = io('/dynamic-room1');
```

## Acknowledgments

### Server

```javascript
io.on('connection', (socket) => {
    // Receive with acknowledgment
    socket.on('message', (data, callback) => {
        console.log('Message:', data);
        
        // Process message
        const result = processMessage(data);
        
        // Send acknowledgment
        callback({
            status: 'ok',
            result: result
        });
    });

    // Emit with acknowledgment request
    socket.emit('question', 'What is your name?', (answer) => {
        console.log('Answer:', answer);
    });
});

function processMessage(data) {
    return `Processed: ${data}`;
}
```

### Client

```javascript
// Send with acknowledgment
socket.emit('message', 'Hello', (response) => {
    console.log('Server responded:', response);
});

// Receive and acknowledge
socket.on('question', (question, callback) => {
    console.log('Question:', question);
    callback('My name is John');
});
```

## Broadcasting

### Server Broadcasting

```javascript
io.on('connection', (socket) => {
    // Broadcast to all clients including sender
    io.emit('broadcast-all', 'Message to everyone');

    // Broadcast to all clients except sender
    socket.broadcast.emit('broadcast-others', 'Message to all except sender');

    // Broadcast to specific room
    io.to('room1').emit('room-broadcast', 'Message to room1');

    // Broadcast to room except sender
    socket.to('room1').emit('room-broadcast-others', 'Message to room1 except me');

    // Broadcast to multiple rooms
    socket.to('room1').to('room2').emit('multi-room', 'Message to room1 and room2');

    // Volatile broadcast (can be dropped if client not ready)
    socket.volatile.emit('news', 'Can be dropped if busy');

    // Local broadcast (only to this server in multi-server setup)
    io.local.emit('local-only', 'This server only');
});
```

## Middleware

### Server Middleware

```javascript
const { Server } = require('socket.io');
const io = new Server(server);

// Global middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (isValidToken(token)) {
        socket.userId = getUserIdFromToken(token);
        next();
    } else {
        next(new Error('Authentication error'));
    }
});

// Namespace middleware
const chatNamespace = io.of('/chat');

chatNamespace.use((socket, next) => {
    if (socket.userId) {
        // Attach user data
        socket.username = getUsernameById(socket.userId);
        next();
    } else {
        next(new Error('No user ID'));
    }
});

// Per-packet middleware
io.use((socket, next) => {
    socket.onAny((event, ...args) => {
        console.log(`Event: ${event}`, args);
    });
    next();
});

function isValidToken(token) {
    // Validation logic
    return token === 'valid-token';
}

function getUserIdFromToken(token) {
    return 'user-123';
}

function getUsernameById(userId) {
    return 'JohnDoe';
}
```

### Client Middleware

```javascript
// Send authentication
const socket = io({
    auth: {
        token: 'my-auth-token'
    }
});

// Or update auth after connection
socket.auth = { token: 'new-token' };
socket.connect();
```

## Advanced Features

### Binary Data

```javascript
// Server
io.on('connection', (socket) => {
    socket.on('binary-data', (buffer) => {
        console.log('Received buffer:', buffer);
        
        // Send binary back
        const responseBuffer = Buffer.from('Response');
        socket.emit('binary-response', responseBuffer);
    });
});

// Client
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
view.setInt32(0, 42);

socket.emit('binary-data', buffer);

socket.on('binary-response', (buffer) => {
    console.log('Received buffer:', buffer);
});
```

### Compression

```javascript
// Server with compression
const io = new Server(server, {
    perMessageDeflate: {
        threshold: 1024 // Compress messages larger than 1KB
    }
});

// Client
const socket = io({
    perMessageDeflate: true
});
```

### Connection State Recovery

```javascript
// Server with state recovery
const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
        skipMiddlewares: true
    }
});

io.on('connection', (socket) => {
    if (socket.recovered) {
        console.log('Connection recovered for:', socket.id);
    } else {
        console.log('New connection:', socket.id);
    }
});

// Client
socket.on('connect', () => {
    if (socket.recovered) {
        console.log('Connection recovered');
    }
});
```

## Authentication

### JWT Authentication

```javascript
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');

const io = new Server(server);

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    try {
        const decoded = jwt.verify(token, 'secret-key');
        socket.user = decoded;
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    console.log('Authenticated user:', socket.user.username);
});
```

### Client Authentication

```javascript
const socket = io({
    auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});
```

## Adapters (Multi-Server)

### Redis Adapter

```bash
npm install @socket.io/redis-adapter redis
```

```javascript
const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const io = new Server(server);

const pubClient = createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));
    console.log('Redis adapter connected');
});

// Now Socket.IO can work across multiple servers
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        // Broadcast to all servers
        io.emit('message', data);
    });
});
```

### Cluster Adapter

```javascript
const cluster = require('cluster');
const http = require('http');
const { Server } = require('socket.io');
const { setupMaster, setupWorker } = require('@socket.io/sticky');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    const httpServer = http.createServer();
    setupMaster(httpServer, {
        loadBalancingMethod: 'least-connection'
    });
    setupPrimary();

    httpServer.listen(3000);

    for (let i = 0; i < 4; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    console.log(`Worker ${process.pid} started`);

    const httpServer = http.createServer(app);
    const io = new Server(httpServer);

    io.adapter(createAdapter());
    setupWorker(io);

    io.on('connection', (socket) => {
        console.log('Connection on worker', process.pid);
    });
}
```

## Error Handling

### Server Error Handling

```javascript
io.on('connection', (socket) => {
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    socket.on('message', (data) => {
        try {
            // Process data
            processData(data);
        } catch (error) {
            socket.emit('error', {
                message: 'Processing error',
                error: error.message
            });
        }
    });
});

io.engine.on('connection_error', (err) => {
    console.error('Connection error:', err);
});
```

### Client Error Handling

```javascript
socket.on('connect_error', (error) => {
    console.error('Connection error:', error.message);
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
});

socket.on('disconnect', (reason) => {
    console.log('Disconnected:', reason);
    
    if (reason === 'io server disconnect') {
        // Server disconnected, reconnect manually
        socket.connect();
    }
});
```

## Performance Optimization

### Connection Options

```javascript
const io = new Server(server, {
    pingTimeout: 60000,
    pingInterval: 25000,
    upgradeTimeout: 10000,
    maxHttpBufferSize: 1e6,
    allowRequest: (req, callback) => {
        // Custom validation
        callback(null, true);
    },
    cors: {
        origin: 'http://localhost:3001',
        credentials: true
    }
});
```

### Client Options

```javascript
const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling'],
    upgrade: true,
    rememberUpgrade: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    timeout: 20000,
    autoConnect: true
});
```

## Monitoring

### Connection Monitoring

```javascript
const { Server } = require('socket.io');
const io = new Server(server);

// Track connections
let connectionCount = 0;

io.on('connection', (socket) => {
    connectionCount++;
    console.log(`Total connections: ${connectionCount}`);
    
    socket.on('disconnect', () => {
        connectionCount--;
        console.log(`Total connections: ${connectionCount}`);
    });
});

// Get all socket IDs
setInterval(() => {
    const sockets = io.sockets.sockets;
    console.log('Connected sockets:', sockets.size);
    console.log('Socket IDs:', Array.from(sockets.keys()));
}, 30000);

// Room statistics
io.on('connection', (socket) => {
    socket.on('get-stats', () => {
        const rooms = io.sockets.adapter.rooms;
        const stats = {
            totalRooms: rooms.size,
            rooms: Array.from(rooms.entries()).map(([name, sockets]) => ({
                name,
                size: sockets.size
            }))
        };
        socket.emit('stats', stats);
    });
});
```

## Best Practices

1. **Use Namespaces** for logical separation
2. **Use Rooms** for grouping clients
3. **Implement Authentication** via middleware
4. **Handle Errors** gracefully
5. **Use Acknowledgments** for critical messages
6. **Validate Input** on both client and server
7. **Use Binary** for large data transfers
8. **Implement Heartbeat** for connection monitoring
9. **Use Adapters** for multi-server setups
10. **Monitor Performance** and connection counts

## Troubleshooting

### Connection Issues

```javascript
// Enable debug mode
localStorage.debug = '*';

// Or specific namespace
localStorage.debug = 'socket.io-client:socket';
```

### CORS Issues

```javascript
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3001', 'http://example.com'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});
```

## Resources

- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [Socket.IO GitHub](https://github.com/socketio/socket.io)
- [Socket.IO Client API](https://socket.io/docs/v4/client-api/)
- [Socket.IO Server API](https://socket.io/docs/v4/server-api/)
- [Socket.IO Emit Cheatsheet](https://socket.io/docs/v4/emit-cheatsheet/)

## Next Steps

- Implement Socket.IO server
- Build real-time chat application
- Add authentication
- Implement rooms and namespaces
- Set up Redis adapter for scaling
- Deploy to production
- Monitor performance
- Implement binary data transfer
- Build collaborative application
- Integrate with existing backend

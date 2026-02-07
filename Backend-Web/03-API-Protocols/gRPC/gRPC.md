# gRPC

## Introduction

gRPC is a high-performance, open-source RPC framework that uses Protocol Buffers for serialization and HTTP/2 for transport.

## Why gRPC?

- **Performance**: binary serialization, HTTP/2 multiplexing, streaming
- **Language-agnostic**: generate clients/servers in 10+ languages from `.proto` files
- **Type safety**: strongly-typed contracts via Protocol Buffers
- **Streaming**: bidirectional streaming support

## Key concepts

- **Protocol Buffers (.proto)**: define services and message types
- **Service**: collection of RPC methods
- **Unary RPC**: single request → single response
- **Streaming**: server/client/bidirectional streams
- **Stub/Client**: generated code to call remote methods

## When to use gRPC

- Microservices communication (internal APIs)
- Real-time bidirectional streaming (chat, notifications)
- Polyglot services (different languages need to talk)

## gRPC vs REST

- gRPC: binary, faster, streaming, tighter contracts
- REST: text (JSON), easier debugging, browser-friendly

## Where to go next

- Guide: `Backend-Web/gRPC/gRPC.md`
- Examples: `Backend-Web/gRPC/examples/`

## User Guide

## Installation

### Protocol Buffers compiler (protoc)

**Linux/macOS:**

```
# Install via package manager
brew install protobuf  # macOS
sudo apt install -y protobuf-compiler  # Ubuntu
```

**Windows:**

```powershell
# Download from https://github.com/protocolbuffers/protobuf/releases
# Or use Chocolatey
choco install protoc
```

### Language-specific plugins

**Node.js/TypeScript:**

```
npm install @grpc/grpc-js @grpc/proto-loader
npm install -D grpc-tools @types/google-protobuf
```

**Python:**

```
pip install grpcio grpcio-tools
```

**Go:**

```
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

---

## Define a service (.proto file)

**greeter.proto:**

```protobuf
syntax = "proto3";

package greeter;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply) {}
  rpc SayHelloStream (HelloRequest) returns (stream HelloReply) {}
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
```

---

## Generate code

**Node.js (dynamic loading):**

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('greeter.proto');
const greeterProto = grpc.loadPackageDefinition(packageDefinition).greeter;
```

**Python:**

```
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. greeter.proto
```

**Go:**

```
protoc --go_out=. --go-grpc_out=. greeter.proto
```

---

## Implement the server

**Node.js:**

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('greeter.proto');
const greeterProto = grpc.loadPackageDefinition(packageDefinition).greeter;

function sayHello(call, callback) {
  callback(null, { message: `Hello ${call.request.name}` });
}

function sayHelloStream(call) {
  for (let i = 0; i < 5; i++) {
    call.write({ message: `Hello ${call.request.name} #${i}` });
  }
  call.end();
}

const server = new grpc.Server();
server.addService(greeterProto.Greeter.service, {
  sayHello,
  sayHelloStream,
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running on port 50051');
});
```

---

## Create a client

**Node.js:**

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('greeter.proto');
const greeterProto = grpc.loadPackageDefinition(packageDefinition).greeter;

const client = new greeterProto.Greeter('localhost:50051', grpc.credentials.createInsecure());

// Unary call
client.sayHello({ name: 'World' }, (err, response) => {
  console.log(response.message);
});

// Streaming call
const call = client.sayHelloStream({ name: 'Alice' });
call.on('data', (response) => {
  console.log(response.message);
});
call.on('end', () => console.log('Stream ended'));
```

---

## Streaming types

### Server streaming

Server sends multiple responses for one client request.

```protobuf
rpc ListItems (Request) returns (stream Item) {}
```

### Client streaming

Client sends multiple requests, server sends one response.

```protobuf
rpc UploadData (stream DataChunk) returns (Response) {}
```

### Bidirectional streaming

Both client and server send multiple messages independently.

```protobuf
rpc Chat (stream Message) returns (stream Message) {}
```

---

## Error handling

**Server:**

```javascript
const grpc = require('@grpc/grpc-js');

function sayHello(call, callback) {
  if (!call.request.name) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Name is required',
    });
  }
  callback(null, { message: `Hello ${call.request.name}` });
}
```

**Client:**

```javascript
client.sayHello({ name: '' }, (err, response) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log(response.message);
  }
});
```

---

## Metadata (headers)

**Server:**

```javascript
function sayHello(call, callback) {
  const metadata = call.metadata;
  const authToken = metadata.get('authorization');
  // Validate token...
  callback(null, { message: 'Hello' });
}
```

**Client:**

```javascript
const metadata = new grpc.Metadata();
metadata.add('authorization', 'Bearer token123');

client.sayHello({ name: 'Alice' }, metadata, (err, response) => {
  console.log(response.message);
});
```

---

## TLS/SSL (secure connections)

**Server:**

```javascript
const fs = require('fs');
const credentials = grpc.ServerCredentials.createSsl(
  fs.readFileSync('ca.crt'),
  [{
    private_key: fs.readFileSync('server.key'),
    cert_chain: fs.readFileSync('server.crt'),
  }]
);

server.bindAsync('0.0.0.0:50051', credentials, () => {
  console.log('Secure gRPC server running');
});
```

**Client:**

```javascript
const credentials = grpc.credentials.createSsl(
  fs.readFileSync('ca.crt')
);

const client = new greeterProto.Greeter('localhost:50051', credentials);
```

---

## Advanced Streaming Patterns

### Server Streaming (Detailed)

Server sends multiple responses for one client request.

**greeter.proto:**

```protobuf
syntax = "proto3";

service StreamService {
  rpc StreamNumbers (NumberRequest) returns (stream NumberResponse) {}
  rpc StreamLogs (LogRequest) returns (stream LogEntry) {}
}

message NumberRequest {
  int32 start = 1;
  int32 end = 2;
}

message NumberResponse {
  int32 number = 1;
}

message LogRequest {
  string filter = 1;
}

message LogEntry {
  string timestamp = 1;
  string level = 2;
  string message = 3;
}
```

**Node.js Server:**

```javascript
function streamNumbers(call) {
  const { start, end } = call.request;
  
  for (let i = start; i <= end; i++) {
    call.write({ number: i });
  }
  
  call.end();
}

function streamLogs(call) {
  const filter = call.request.filter;
  const interval = setInterval(() => {
    call.write({
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message: `Log entry matching ${filter}`,
    });
  }, 1000);
  
  // Stop after 10 seconds
  setTimeout(() => {
    clearInterval(interval);
    call.end();
  }, 10000);
}
```

**Node.js Client:**

```javascript
const call = client.streamNumbers({ start: 1, end: 100 });

call.on('data', (response) => {
  console.log('Received:', response.number);
});

call.on('end', () => {
  console.log('Stream ended');
});

call.on('error', (err) => {
  console.error('Error:', err);
});
```

### Client Streaming (Detailed)

Client sends multiple requests, server sends one response.

**upload.proto:**

```protobuf
service UploadService {
  rpc UploadFile (stream FileChunk) returns (UploadResponse) {}
}

message FileChunk {
  bytes data = 1;
  string filename = 2;
}

message UploadResponse {
  string message = 1;
  int64 bytes_received = 2;
}
```

**Node.js Server:**

```javascript
function uploadFile(call, callback) {
  const chunks = [];
  let filename = '';
  
  call.on('data', (chunk) => {
    chunks.push(chunk.data);
    if (!filename && chunk.filename) {
      filename = chunk.filename;
    }
  });
  
  call.on('end', () => {
    const totalBytes = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const fileData = Buffer.concat(chunks);
    
    fs.writeFileSync(`uploads/${filename}`, fileData);
    
    callback(null, {
      message: `File ${filename} uploaded successfully`,
      bytes_received: totalBytes,
    });
  });
  
  call.on('error', (err) => {
    console.error('Upload error:', err);
    callback(err);
  });
}
```

**Node.js Client:**

```javascript
const call = client.uploadFile((err, response) => {
  if (err) {
    console.error('Upload failed:', err);
  } else {
    console.log(response.message);
  }
});

const fileStream = fs.createReadStream('large-file.pdf');
const filename = 'large-file.pdf';
const chunkSize = 64 * 1024; // 64KB chunks

fileStream.on('data', (chunk) => {
  call.write({ data: chunk, filename });
});

fileStream.on('end', () => {
  call.end();
});
```

### Bidirectional Streaming (Detailed)

Both client and server send multiple messages independently.

**chat.proto:**

```protobuf
service ChatService {
  rpc Chat (stream ChatMessage) returns (stream ChatMessage) {}
}

message ChatMessage {
  string user = 1;
  string message = 2;
  string timestamp = 3;
}
```

**Node.js Server:**

```javascript
function chat(call) {
  call.on('data', (message) => {
    console.log(`${message.user}: ${message.message}`);
    
    // Broadcast to all connected clients
    clients.forEach(client => {
      if (client !== call) {
        client.write(message);
      }
    });
    
    // Echo back with modification
    call.write({
      user: 'Server',
      message: `Received: ${message.message}`,
      timestamp: new Date().toISOString(),
    });
  });
  
  call.on('end', () => {
    console.log('Client disconnected');
    call.end();
  });
  
  clients.push(call);
}
```

**Node.js Client:**

```javascript
const call = client.chat();

call.on('data', (message) => {
  console.log(`${message.user} [${message.timestamp}]: ${message.message}`);
});

call.on('end', () => {
  console.log('Chat ended');
});

// Send messages
process.stdin.on('data', (data) => {
  call.write({
    user: 'Alice',
    message: data.toString().trim(),
    timestamp: new Date().toISOString(),
  });
});
```

## Advanced Error Handling

### Status Codes

```javascript
const grpc = require('@grpc/grpc-js');

// All gRPC status codes
const statusCodes = {
  OK: grpc.status.OK,                           // 0
  CANCELLED: grpc.status.CANCELLED,             // 1
  UNKNOWN: grpc.status.UNKNOWN,                 // 2
  INVALID_ARGUMENT: grpc.status.INVALID_ARGUMENT, // 3
  DEADLINE_EXCEEDED: grpc.status.DEADLINE_EXCEEDED, // 4
  NOT_FOUND: grpc.status.NOT_FOUND,             // 5
  ALREADY_EXISTS: grpc.status.ALREADY_EXISTS,   // 6
  PERMISSION_DENIED: grpc.status.PERMISSION_DENIED, // 7
  RESOURCE_EXHAUSTED: grpc.status.RESOURCE_EXHAUSTED, // 8
  FAILED_PRECONDITION: grpc.status.FAILED_PRECONDITION, // 9
  ABORTED: grpc.status.ABORTED,                 // 10
  OUT_OF_RANGE: grpc.status.OUT_OF_RANGE,       // 11
  UNIMPLEMENTED: grpc.status.UNIMPLEMENTED,     // 12
  INTERNAL: grpc.status.INTERNAL,               // 13
  UNAVAILABLE: grpc.status.UNAVAILABLE,         // 14
  DATA_LOSS: grpc.status.DATA_LOSS,             // 15
  UNAUTHENTICATED: grpc.status.UNAUTHENTICATED, // 16
};

// Custom error with details
function createError(code, message, details) {
  return {
    code,
    message,
    details,
  };
}

// Server
function getUser(call, callback) {
  const userId = call.request.id;
  
  if (!userId) {
    return callback(createError(
      grpc.status.INVALID_ARGUMENT,
      'User ID is required',
      { field: 'id' }
    ));
  }
  
  const user = findUserById(userId);
  
  if (!user) {
    return callback(createError(
      grpc.status.NOT_FOUND,
      `User with ID ${userId} not found`,
      { userId }
    ));
  }
  
  callback(null, user);
}

// Client
client.getUser({ id: '123' }, (err, response) => {
  if (err) {
    switch (err.code) {
      case grpc.status.NOT_FOUND:
        console.error('User not found');
        break;
      case grpc.status.INVALID_ARGUMENT:
        console.error('Invalid input:', err.message);
        break;
      case grpc.status.UNAUTHENTICATED:
        console.error('Authentication required');
        break;
      default:
        console.error('Error:', err.message);
    }
  } else {
    console.log('User:', response);
  }
});
```

### Rich Error Details (Python)

```python
from google.rpc import error_details_pb2, status_pb2
import grpc

def get_user(request, context):
    if not request.id:
        details = error_details_pb2.BadRequest()
        violation = details.field_violations.add()
        violation.field = "id"
        violation.description = "User ID is required"
        
        status = status_pb2.Status(
            code=grpc.StatusCode.INVALID_ARGUMENT.value[0],
            message="Invalid user ID",
            details=[details]
        )
        
        context.abort_with_status(status)
    
    user = find_user_by_id(request.id)
    
    if not user:
        context.abort(grpc.StatusCode.NOT_FOUND, f"User {request.id} not found")
    
    return user
```

## Interceptors

### Server Interceptor (Logging)

```javascript
function loggingInterceptor(call, methodDescriptor, next) {
  console.log(`[${new Date().toISOString()}] ${methodDescriptor.path} started`);
  
  const originalCallback = call.callback;
  call.callback = (error, response) => {
    if (error) {
      console.log(`[${new Date().toISOString()}] ${methodDescriptor.path} failed:`, error.message);
    } else {
      console.log(`[${new Date().toISOString()}] ${methodDescriptor.path} succeeded`);
    }
    originalCallback(error, response);
  };
  
  return next(call);
}

// Apply interceptor
server.addService(greeterProto.Greeter.service, {
  sayHello,
}, {
  interceptors: [loggingInterceptor],
});
```

### Server Interceptor (Authentication)

```javascript
function authInterceptor(call, methodDescriptor, next) {
  const metadata = call.metadata;
  const token = metadata.get('authorization')[0];
  
  if (!token || !isValidToken(token)) {
    call.callback({
      code: grpc.status.UNAUTHENTICATED,
      message: 'Invalid or missing authentication token',
    });
    return;
  }
  
  // Add user info to call
  call.user = decodeToken(token);
  
  return next(call);
}
```

### Client Interceptor (Adding Metadata)

```javascript
function metadataInterceptor(options, nextCall) {
  return new grpc.InterceptingCall(nextCall(options), {
    start: function(metadata, listener, next) {
      metadata.add('authorization', `Bearer ${getAuthToken()}`);
      metadata.add('client-version', '1.0.0');
      metadata.add('request-id', generateRequestId());
      next(metadata, listener);
    },
  });
}

const client = new greeterProto.Greeter(
  'localhost:50051',
  grpc.credentials.createInsecure(),
  { interceptors: [metadataInterceptor] }
);
```

### Client Interceptor (Retry Logic)

```javascript
function retryInterceptor(options, nextCall) {
  return new grpc.InterceptingCall(nextCall(options), {
    start: function(metadata, listener, next) {
      let retries = 0;
      const maxRetries = 3;
      
      const retryListener = {
        onReceiveStatus: function(status, statusNext) {
          if (
            status.code === grpc.status.UNAVAILABLE &&
            retries < maxRetries
          ) {
            retries++;
            console.log(`Retry attempt ${retries}/${maxRetries}`);
            setTimeout(() => {
              next(metadata, retryListener);
            }, 1000 * retries);
          } else {
            statusNext(status);
          }
        },
      };
      
      next(metadata, retryListener);
    },
  });
}
```

## Deadlines and Timeouts

### Server-side Deadline

```javascript
function slowOperation(call, callback) {
  // Check if deadline exceeded
  if (call.cancelled) {
    return callback({
      code: grpc.status.CANCELLED,
      message: 'Request cancelled',
    });
  }
  
  // Simulate slow operation
  setTimeout(() => {
    if (call.cancelled) {
      return;
    }
    callback(null, { result: 'Success' });
  }, 5000);
}
```

### Client-side Deadline

```javascript
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5); // 5 second deadline

client.slowOperation(
  { },
  { deadline },
  (err, response) => {
    if (err) {
      if (err.code === grpc.status.DEADLINE_EXCEEDED) {
        console.error('Request timed out');
      } else {
        console.error('Error:', err.message);
      }
    } else {
      console.log('Response:', response);
    }
  }
);
```

## Load Balancing

### Client-side Load Balancing

```javascript
// Round-robin load balancing
const client = new greeterProto.Greeter(
  'dns:///my-service:50051',
  grpc.credentials.createInsecure(),
  {
    'grpc.lb_policy_name': 'round_robin',
  }
);

// Pick-first (default)
const client2 = new greeterProto.Greeter(
  'dns:///my-service:50051',
  grpc.credentials.createInsecure(),
  {
    'grpc.lb_policy_name': 'pick_first',
  }
);
```

### Service Discovery with DNS

```javascript
// Multiple backend servers
const client = new greeterProto.Greeter(
  'dns:///my-service.default.svc.cluster.local:50051',
  grpc.credentials.createInsecure()
);
```

### Custom Load Balancer

```javascript
class CustomLoadBalancer {
  constructor(addresses) {
    this.addresses = addresses;
    this.currentIndex = 0;
  }
  
  pick() {
    const address = this.addresses[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.addresses.length;
    return address;
  }
}

const lb = new CustomLoadBalancer([
  'localhost:50051',
  'localhost:50052',
  'localhost:50053',
]);

function createClient() {
  return new greeterProto.Greeter(
    lb.pick(),
    grpc.credentials.createInsecure()
  );
}
```

## Health Checking

### Server Health Service

```protobuf
syntax = "proto3";

package grpc.health.v1;

service Health {
  rpc Check(HealthCheckRequest) returns (HealthCheckResponse);
  rpc Watch(HealthCheckRequest) returns (stream HealthCheckResponse);
}

message HealthCheckRequest {
  string service = 1;
}

message HealthCheckResponse {
  enum ServingStatus {
    UNKNOWN = 0;
    SERVING = 1;
    NOT_SERVING = 2;
    SERVICE_UNKNOWN = 3;
  }
  ServingStatus status = 1;
}
```

**Node.js Implementation:**

```javascript
const health = require('grpc-health-check');

const healthImpl = new health.Implementation({
  '': health.servingStatus.SERVING,
  'myapp.Greeter': health.servingStatus.SERVING,
});

server.addService(health.service, healthImpl);

// Update health status
function updateHealthStatus(service, status) {
  healthImpl.setStatus(service, status);
}

// On error, mark as not serving
process.on('uncaughtException', () => {
  updateHealthStatus('', health.servingStatus.NOT_SERVING);
});
```

**Client Health Check:**

```javascript
const healthClient = new healthProto.Health(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

healthClient.check({ service: '' }, (err, response) => {
  if (err) {
    console.error('Health check failed:', err);
  } else {
    console.log('Server status:', response.status);
  }
});
```

## Reflection

Enable clients to discover service definitions at runtime.

```bash
npm install @grpc/reflection
```

```javascript
const reflection = require('@grpc/reflection');

const server = new grpc.Server();

// Add your services
server.addService(greeterProto.Greeter.service, { sayHello });

// Add reflection
const reflectionImpl = new reflection.ReflectionService(packageDefinition);
reflectionImpl.addToServer(server);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server with reflection running');
});
```

**Use grpcurl to explore:**

```bash
# List services
grpcurl -plaintext localhost:50051 list

# Describe service
grpcurl -plaintext localhost:50051 describe greeter.Greeter

# Call method
grpcurl -plaintext -d '{"name": "World"}' localhost:50051 greeter.Greeter/SayHello
```

## Advanced Protobuf Features

### OneOf (Union Types)

```protobuf
message SearchRequest {
  oneof query {
    string text = 1;
    int32 id = 2;
    bool all = 3;
  }
}
```

**Usage:**

```javascript
// Only one field can be set
const request1 = { text: "hello" };
const request2 = { id: 123 };
const request3 = { all: true };
```

### Maps

```protobuf
message User {
  string name = 1;
  map<string, string> metadata = 2;
  map<int32, Address> addresses = 3;
}
```

**Usage:**

```javascript
const user = {
  name: 'Alice',
  metadata: {
    role: 'admin',
    department: 'engineering',
  },
  addresses: {
    1: { street: '123 Main St', city: 'NYC' },
    2: { street: '456 Oak Ave', city: 'LA' },
  },
};
```

### Reserved Fields

```protobuf
message User {
  reserved 2, 15, 9 to 11;
  reserved "old_field", "deprecated_field";
  
  string name = 1;
  string email = 3;
}
```

### Nested Messages

```protobuf
message User {
  string name = 1;
  
  message Address {
    string street = 1;
    string city = 2;
    string country = 3;
  }
  
  repeated Address addresses = 2;
}
```

### Imports

```protobuf
// common.proto
syntax = "proto3";
package common;

message Timestamp {
  int64 seconds = 1;
  int32 nanos = 2;
}

// user.proto
syntax = "proto3";
import "common.proto";

message User {
  string name = 1;
  common.Timestamp created_at = 2;
}
```

### Well-known Types

```protobuf
import "google/protobuf/timestamp.proto";
import "google/protobuf/duration.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";

message Event {
  google.protobuf.Timestamp occurred_at = 1;
  google.protobuf.Duration duration = 2;
  google.protobuf.StringValue optional_description = 3;
}

service EventService {
  rpc Ping (google.protobuf.Empty) returns (google.protobuf.Empty);
}
```

## Performance Optimization

### Connection Pooling

```javascript
class GrpcClientPool {
  constructor(address, size = 10) {
    this.clients = [];
    this.currentIndex = 0;
    
    for (let i = 0; i < size; i++) {
      this.clients.push(
        new greeterProto.Greeter(
          address,
          grpc.credentials.createInsecure()
        )
      );
    }
  }
  
  getClient() {
    const client = this.clients[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.clients.length;
    return client;
  }
}

const pool = new GrpcClientPool('localhost:50051', 10);

// Use from pool
pool.getClient().sayHello({ name: 'Alice' }, callback);
```

### Message Compression

**Server:**

```javascript
const server = new grpc.Server({
  'grpc.default_compression_algorithm': grpc.compressionAlgorithms.gzip,
  'grpc.default_compression_level': grpc.compressionLevels.high,
});
```

**Client:**

```javascript
const client = new greeterProto.Greeter(
  'localhost:50051',
  grpc.credentials.createInsecure(),
  {
    'grpc.default_compression_algorithm': grpc.compressionAlgorithms.gzip,
    'grpc.default_compression_level': grpc.compressionLevels.medium,
  }
);
```

### Keep-Alive Settings

```javascript
const client = new greeterProto.Greeter(
  'localhost:50051',
  grpc.credentials.createInsecure(),
  {
    'grpc.keepalive_time_ms': 30000,
    'grpc.keepalive_timeout_ms': 10000,
    'grpc.keepalive_permit_without_calls': 1,
    'grpc.http2.max_pings_without_data': 0,
  }
);
```

## Monitoring and Tracing

### Prometheus Metrics

```javascript
const promClient = require('prom-client');

const requestCounter = new promClient.Counter({
  name: 'grpc_requests_total',
  help: 'Total number of gRPC requests',
  labelNames: ['method', 'status'],
});

const requestDuration = new promClient.Histogram({
  name: 'grpc_request_duration_seconds',
  help: 'Duration of gRPC requests in seconds',
  labelNames: ['method'],
});

function metricsInterceptor(call, methodDescriptor, next) {
  const start = Date.now();
  const method = methodDescriptor.path;
  
  const originalCallback = call.callback;
  call.callback = (error, response) => {
    const duration = (Date.now() - start) / 1000;
    const status = error ? error.code : 'OK';
    
    requestCounter.inc({ method, status });
    requestDuration.observe({ method }, duration);
    
    originalCallback(error, response);
  };
  
  return next(call);
}
```

### OpenTelemetry Tracing

```javascript
const { NodeTracerProvider } = require('@opentelemetry/node');
const { GrpcInstrumentation } = require('@opentelemetry/instrumentation-grpc');

const provider = new NodeTracerProvider();
provider.addSpanProcessor(/* ... */);
provider.register();

const grpcInstrumentation = new GrpcInstrumentation();
grpcInstrumentation.enable();
```

## Testing Strategies

### Unit Testing

```javascript
const { describe, it, expect } = require('@jest/globals');

describe('Greeter Service', () => {
  it('should say hello', (done) => {
    const call = {
      request: { name: 'Alice' },
    };
    
    sayHello(call, (error, response) => {
      expect(error).toBeNull();
      expect(response.message).toBe('Hello Alice');
      done();
    });
  });
  
  it('should handle missing name', (done) => {
    const call = {
      request: {},
    };
    
    sayHello(call, (error, response) => {
      expect(error).toBeTruthy();
      expect(error.code).toBe(grpc.status.INVALID_ARGUMENT);
      done();
    });
  });
});
```

### Integration Testing

```javascript
const grpc = require('@grpc/grpc-js');

describe('Greeter Integration', () => {
  let server;
  let client;
  
  beforeAll((done) => {
    server = new grpc.Server();
    server.addService(greeterProto.Greeter.service, { sayHello });
    server.bindAsync(
      '0.0.0.0:50051',
      grpc.ServerCredentials.createInsecure(),
      () => {
        client = new greeterProto.Greeter(
          'localhost:50051',
          grpc.credentials.createInsecure()
        );
        done();
      }
    );
  });
  
  afterAll(() => {
    client.close();
    server.forceShutdown();
  });
  
  it('should communicate successfully', (done) => {
    client.sayHello({ name: 'Bob' }, (err, response) => {
      expect(err).toBeNull();
      expect(response.message).toBe('Hello Bob');
      done();
    });
  });
});
```

## Real-World Patterns

### Microservices Communication

```protobuf
// user-service.proto
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc CreateUser (CreateUserRequest) returns (User);
}

// order-service.proto
service OrderService {
  rpc CreateOrder (CreateOrderRequest) returns (Order);
  rpc GetUserOrders (GetUserOrdersRequest) returns (OrderList);
}

// Orchestrator calling both services
async function createOrderWithUser(userId, orderData) {
  // Get user from user service
  const user = await userClient.getUser({ id: userId });
  
  // Create order in order service
  const order = await orderClient.createOrder({
    userId: user.id,
    ...orderData,
  });
  
  return { user, order };
}
```

### API Gateway Pattern

```javascript
// Gateway that aggregates multiple gRPC services
const express = require('express');
const app = express();

const userClient = new UserServiceClient(/* ... */);
const orderClient = new OrderServiceClient(/* ... */);
const productClient = new ProductServiceClient(/* ... */);

app.get('/api/users/:id/dashboard', async (req, res) => {
  try {
    const [user, orders, recommendations] = await Promise.all([
      promisifyGrpc(userClient.getUser)({ id: req.params.id }),
      promisifyGrpc(orderClient.getUserOrders)({ userId: req.params.id }),
      promisifyGrpc(productClient.getRecommendations)({ userId: req.params.id }),
    ]);
    
    res.json({ user, orders, recommendations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function promisifyGrpc(fn) {
  return (request) => new Promise((resolve, reject) => {
    fn(request, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}
```

### Event Streaming

```protobuf
service EventService {
  rpc SubscribeToEvents (EventFilter) returns (stream Event);
  rpc PublishEvent (Event) returns (EventResponse);
}

message Event {
  string id = 1;
  string type = 2;
  bytes payload = 3;
  google.protobuf.Timestamp timestamp = 4;
}
```

## Best Practices

- ✅ Use streaming for large datasets or real-time data
- ✅ Implement proper error handling with status codes
- ✅ Add deadlines/timeouts to prevent hanging clients
- ✅ Use metadata for authentication and tracing
- ✅ Enable TLS/SSL in production
- ✅ Implement health checking for service discovery
- ✅ Use connection pooling for better performance
- ✅ Enable compression for large messages
- ✅ Implement retry logic with exponential backoff
- ✅ Monitor with metrics and distributed tracing
- ✅ Use interceptors for cross-cutting concerns
- ✅ Version your protobuf definitions carefully
- ✅ Document your service definitions
- ✅ Test both unit and integration scenarios

## References

- Docs: <https://grpc.io/docs/>
- Protocol Buffers: <https://protobuf.dev/>
- Language guides: <https://grpc.io/docs/languages/>
- Best Practices: <https://grpc.io/docs/guides/performance/>
- Error Handling: <https://grpc.io/docs/guides/error/>
- Authentication: <https://grpc.io/docs/guides/auth/>

---

## See Also

- [REST API Alternative](../REST-API/REST-API.md)
- [GraphQL Alternative](../GraphQL/GraphQL.md)
- [OpenAPI/Swagger Documentation](../OpenAPI-Swagger/OpenAPI-Swagger.md)


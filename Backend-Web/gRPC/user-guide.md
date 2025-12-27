# gRPC — User Guide

## Installation

### Protocol Buffers compiler (protoc)

**Linux/macOS:**

```bash
# Install via package manager
brew install protobuf  # macOS
sudo apt install -y protobuf-compiler  # Ubuntu
```bash

**Windows:**

```powershell
# Download from https://github.com/protocolbuffers/protobuf/releases
# Or use Chocolatey
choco install protoc
```bash

### Language-specific plugins

**Node.js/TypeScript:**

```bash
npm install @grpc/grpc-js @grpc/proto-loader
npm install -D grpc-tools @types/google-protobuf
```bash

**Python:**

```bash
pip install grpcio grpcio-tools
```bash

**Go:**

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```bash

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
```bash

---

## Generate code

**Node.js (dynamic loading):**

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('greeter.proto');
const greeterProto = grpc.loadPackageDefinition(packageDefinition).greeter;
```bash

**Python:**

```bash
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. greeter.proto
```bash

**Go:**

```bash
protoc --go_out=. --go-grpc_out=. greeter.proto
```bash

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
```bash

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
```text

---

## Streaming types

### Server streaming

Server sends multiple responses for one client request.

```protobuf
rpc ListItems (Request) returns (stream Item) {}
```text

### Client streaming

Client sends multiple requests, server sends one response.

```protobuf
rpc UploadData (stream DataChunk) returns (Response) {}
```text

### Bidirectional streaming

Both client and server send multiple messages independently.

```protobuf
rpc Chat (stream Message) returns (stream Message) {}
```text

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
```text

**Client:**

```javascript
client.sayHello({ name: '' }, (err, response) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log(response.message);
  }
});
```text

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
```text

**Client:**

```javascript
const metadata = new grpc.Metadata();
metadata.add('authorization', 'Bearer token123');

client.sayHello({ name: 'Alice' }, metadata, (err, response) => {
  console.log(response.message);
});
```text

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
```bash

**Client:**

```javascript
const credentials = grpc.credentials.createSsl(
  fs.readFileSync('ca.crt')
);

const client = new greeterProto.Greeter('localhost:50051', credentials);
```bash

---

## Best practices

- Use streaming for large datasets or real-time data
- Add timeouts/deadlines to prevent hanging clients
- Use metadata for auth tokens
- Enable TLS in production
- Consider gRPC-Web for browser clients

---

## References

- Docs: <https://grpc.io/docs/>
- Protocol Buffers: <https://protobuf.dev/>
- Language guides: <https://grpc.io/docs/languages/>

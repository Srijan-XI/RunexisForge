# gRPC — Introduction

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
- User guide: `Backend-Web/gRPC/user-guide.md`
- Examples: `Backend-Web/gRPC/examples/`

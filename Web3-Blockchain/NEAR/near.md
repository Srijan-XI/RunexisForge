# NEAR Protocol - Simple, Scalable, Secure

## Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
  - [Sharding (Nightshade)](#sharding-nightshade)
  - [Usability](#usability)
- [Development](#development)
  - [Languages](#languages)
  - [Smart Contract Example](#smart-contract-example)
- [Near CLI](#near-cli)
- [Resources](#resources)

---

## Introduction

**NEAR Protocol** is a layer-1 blockchain designed to be simple to use, secure, and scalable. It focuses heavily on **usability** for both developers and end-users.

---

## Key Features

### Sharding (Nightshade)
NEAR uses a sharding design called **Nightshade**. Unlike other sharded chains, NEAR models the system as a single blockchain. Each block contains all transactions for all shards, and chunks of that block are validated by different sets of validators.
-   **Infinite Scalability**: Can add more shards as demand grows.

### Usability
-   **Human-readable accounts**: `alice.near` instead of `0x71C...`.
-   **Access Keys**: Flexible permission system (Full Access vs Function Call Access).
-   **Progressive Security**: Users can start using an app without an account properly set up.

---

## Development

### Languages
NEAR smart contracts compile to **WebAssembly (Wasm)**.
1.  **Rust**: The preferred, most robust language.
2.  **JavaScript / TypeScript**: First-class support via NEAR SDK JS. Great for web developers.

### Smart Contract Example (TypeScript)

```typescript
import { NearBindgen, view, call, initialize } from "near-sdk-js";

@NearBindgen({})
class Counter {
  count: number = 0;

  @view({}) // Read-only
  get_count(): number {
    return this.count;
  }

  @call({}) // State-changing
  increment(): void {
    this.count += 1;
  }

  @call({})
  decrement(): void {
    this.count -= 1;
  }
}
```

---

## Near CLI

```bash
# Install
npm install -g near-cli

# Login (opens browser wallet)
near login

# Deploy
near deploy --wasmFile build/contract.wasm --accountId myapp.near

# Call
near call myapp.near increment --accountId bob.near
near view myapp.near get_count
```

---

## Resources

-   [NEAR Docs](https://docs.near.org/)
-   [NEAR University](https://www.near.university/)
-   [Awesome NEAR](https://github.com/near/awesome-near)

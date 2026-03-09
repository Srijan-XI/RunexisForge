# Flow - Built for the Next Generation of Apps

## Table of Contents
- [Introduction](#introduction)
- [Architecture](#architecture)
- [Cadence (Smart Contract Language)](#cadence-smart-contract-language)
- [Resource-Oriented Programming](#resource-oriented-programming)
- [Development](#development)
- [Resources](#resources)

---

## Introduction

**Flow** is a fast, decentralized, and developer-friendly blockchain, designed as the foundation for a new generation of games, apps, and the digital assets that power them. It is built by **Dapper Labs** (creators of CryptoKitties and MBA Top Shot).

---

## Architecture

Flow uses a **multi-node architecture**. instead of every node doing everything (collection, consensus, execution, verification), Flow pipelines the work across four different node roles:
1.  **Collector Nodes**: Increase efficiency.
2.  **Consensus Nodes**: Ensure decentralization.
3.  **Execution Nodes**: Enable speed and scale.
4.  **Verification Nodes**: Guarantee correctness.

This allows Flow to scale without sharding (maintaining ACID guarantees).

---

## Cadence (Smart Contract Language)

Flow uses **Cadence**, a resource-oriented programming language.
-   **Safe**: Strong static typing, pre-conditions and post-conditions.
-   **Auditability**: Designed to be easy to read.

---

## Resource-Oriented Programming

In most blockchains (like Ethereum), tokens are entries in a ledger (a mapping `address -> balance`).
In Cadence, tokens are **Resources**.
-   A Resource is a linear type. It basically acts like a physical object.
-   It cannot be copied or lost (implicitly discarded). It must be moved explicitly.
-   If you send an NFT to someone, you literally move the data structure from your account storage to theirs.

**Example**:
```cadence
pub resource NFT {
    pub let id: UInt64
    init(initID: UInt64) {
        self.id = initID
    }
}
```

---

## Development

**Flow CLI**:
```bash
brew install flow-cli
flow init
flow emulator # Local node
```

**FCL (Flow Client Library)**: JavaScript library to interact with Flow.
```javascript
import * as fcl from "@onflow/fcl";

// Authenticate
await fcl.authenticate();

// Execute Script (Read)
const result = await fcl.query({
  cadence: `
    pub fun main(): Int {
      return 42
    }
  `
});
```

---

## Resources

-   [Flow Developer Portal](https://developers.flow.com/)
-   [Cadence Playground](https://play.flow.com/) - Interactive learning.
-   [Flow Academy](https://academy.ecdao.org/)

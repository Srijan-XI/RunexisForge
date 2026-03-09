# Cosmos - The Internet of Blockchains

## Table of Contents
- [Introduction](#introduction)
- [Architecture](#architecture)
  - [Tendermint Core](#tendermint-core)
  - [Cosmos SDK](#cosmos-sdk)
  - [IBC (Inter-Blockchain Communication)](#ibc)
- [Cosmos Hub (ATOM)](#cosmos-hub-atom)
- [CosmWasm](#cosmwasm)
- [Resources](#resources)

---

## Introduction

**Cosmos** is an ecosystem of independent, parallel blockchains that can scale and interoperate with each other. Its vision is an "Internet of Blockchains" rather than one chain ruling them all.

---

## Architecture

### Tendermint Core
The engine that powers Cosmos chains. It handles:
-   **Networking**: Peer-to-peer communication.
-   **Consensus**: BFT (Byzantine Fault Tolerant) Proof of Stake. Instant finality (blocks never reorganize).

### Cosmos SDK
A framework for building application-specific blockchains using **Go (Golang)**.
-   **Modular**: Developers compose chains from modules (Auth, Bank, Staking, Gov).
-   **CLI**: Automatically generates CLI and REST API.

### IBC (Inter-Blockchain Communication)
The TCP/IP of blockchains. A protocol that allows independent chains to transfer tokens and data (messages) between each other in a trust-minimized way.

---

## Cosmos Hub (ATOM)
The first blockchain launched in the Cosmos Network.
-   **ATOM**: The native staking token.
-   It acts as a router/hub for IBC transactions, though direct connections between zones are also possible.

---

## CosmWasm
A smart contract platform built for the Cosmos ecosystem.
-   **Language**: Rust / Go / AssemblyScript.
-   **Target**: WebAssembly (Wasm).
-   **Secure**: Avoids many reentrancy attacks found in EVM.

**Example CosmWasm Contract (Rust)**:
```rust
use cosmwasm_std::{entry_point, Response, StdResult};

#[entry_point]
pub fn instantiate(...) -> StdResult<Response> {
    Ok(Response::default())
}

#[entry_point]
pub fn execute(...) -> StdResult<Response> {
    Ok(Response::new().add_attribute("action", "execute"))
}
```

---

## Resources

-   [Cosmos Network](https://cosmos.network/)
-   [Cosmos SDK Docs](https://docs.cosmos.network/)
-   [Tendermint Specs](https://github.com/tendermint/tendermint)
-   [Map of Zones](https://mapofzones.com/) - Visualizer of IBC.

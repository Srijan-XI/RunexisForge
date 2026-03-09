# Polkadot - Interoperable Blockchain Platform

## Table of Contents
- [Introduction](#introduction)
- [Architecture](#architecture)
  - [Relay Chain](#relay-chain)
  - [Parachains](#parachains)
  - [Bridges](#bridges)
- [Substrate Framework](#substrate-framework)
- [Development](#development)
- [Ink! (Smart Contracts)](#ink-smart-contracts)
- [Resources](#resources)

---

## Introduction

**Polkadot** is a Layer-0 protocol that connects multiple specialized blockchains into a unified network. It solves the scalability and interoperability issues of older blockchains. It was founded by Dr. Gavin Wood, a co-founder of Ethereum.

---

## Architecture

### Relay Chain
The heart of Polkadot. It handles consensus, security, and interoperability. It does NOT support smart contracts directly (to keep it minimal and fast).

### Parachains
Parallel blockchains that connect to the Relay Chain.
-   Independent chains with their own logic/tokens.
-   Share security with the Relay Chain.
-   Limited slots (acquired via auctions).

### Bridges
Special chains or contracts that allow Polkadot to connect to external networks like Ethereum or Bitcoin.

---

## Substrate Framework

**Substrate** is the SDK used to build blockchains (Parachains) for the Polkadot ecosystem. All Polkadot chains are built with Substrate (technically you can use others, but Substrate is standard).
-   **Modular**: Plug-and-play consensus, balances, governance modules (Pallets).
-   **Forkless Upgrades**: Upgrade the runtime logic without a hard fork.
-   **Rust**: Built completely in Rust.

---

## Development

To build on Polkadot, you usually have two paths:
1.  **Build a Parachain**: Using Substrate (Rust). Heavy lifting, building an entire blockchain.
2.  **Build a DApp**: Deploy smart contracts on an existing Parachain (like Moonbeam or Astar).

---

## Ink! (Smart Contracts)

**Ink!** is an eDSL (Embedded Domain Specific Language) for writing Wasm smart contracts in Rust.
-   Unlike Solidity (EVM), Ink! targets Wasm.
-   Used on parachains that support `pallet-contracts`.

**Example Ink! Contract**:
```rust
#[ink::contract]
mod flipper {
    #[ink(storage)]
    pub struct Flipper {
        value: bool,
    }

    impl Flipper {
        #[ink(constructor)]
        pub fn new(init_value: bool) -> Self {
            Self { value: init_value }
        }

        #[ink(message)]
        pub fn flip(&mut self) {
            self.value = !self.value;
        }

        #[ink(message)]
        pub fn get(&self) -> bool {
            self.value
        }
    }
}
```

---

## Resources

-   [Polkadot Wiki](https://wiki.polkadot.network/)
-   [Substrate Developer Hub](https://docs.substrate.io/)
-   [Ink! Documentation](https://use.ink/)
-   [Parity Technologies](https://www.parity.io/)

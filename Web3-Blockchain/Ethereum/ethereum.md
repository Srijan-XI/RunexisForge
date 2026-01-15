# Ethereum - The Foundation of Web3

## Table of Contents
- [Introduction](#introduction)
- [How Ethereum Works](#how-ethereum-works)
- [Core Concepts](#core-concepts)
  - [The EVM (Ethereum Virtual Machine)](#the-evm)
  - [Gas & Fees](#gas--fees)
  - [Accounts (EOA vs Contract)](#accounts-eoa-vs-contract)
  - [Transactions](#transactions)
- [Smart Contracts](#smart-contracts)
- [Consensus Mechanisms](#consensus-mechanisms)
  - [Proof of Stake (PoS)](#proof-of-stake-pos)
- [Ethereum Standards (ERCs)](#ethereum-standards-ercs)
- [Networks](#networks)
  - [Mainnet](#mainnet)
  - [Testnets](#testnets)
- [Layer 2 Scaling](#layer-2-scaling)
- [Development Ecosystem](#development-ecosystem)
- [Resources](#resources)

---

## Introduction

**Ethereum** is a decentralized, open-source blockchain with smart contract functionality. Ether (**ETH**) is the native cryptocurrency of the platform. Unlike Bitcoin, which is primarily a store of value, Ethereum is a programmable blockchain that enables developers to build **DApps** (Decentralized Applications).

---

## How Ethereum Works

Ethereum operates as a "world computer." It is a distributed state machine where the state (accounts, balances, contract code) is updated through transactions. All nodes in the network agree on the current state via a consensus mechanism.

---

## Core Concepts

### The EVM (Ethereum Virtual Machine)
The **EVM** is the runtime environment for smart contracts in Ethereum. It is entirely isolated directly from the network, filesystem, or other processes of the host computer. Code running inside the EVM has no access to network, filesystem, or other processes.
- **Turing Complete**: Can run any algorithm (limited by gas).
- **Stack-based architecture**: 256-bit word size.

### Gas & Fees
Every operation on Ethereum requires computational resources. **Gas** is the unit used to measure this effort.
- **Gas Limit**: Max gas you are willing to spend.
- **Gas Price**: Amount of ETH (in Gwei) you pay per unit of gas.
- **Total Fee** = `Gas Used * (Base Fee + Priority Fee)`

### Accounts (EOA vs Contract)
There are two types of accounts:
1.  **Externally Owned Accounts (EOA)**:
    -   Controlled by private keys.
    -   No code associated.
    -   Can initiate transactions.
2.  **Contract Accounts**:
    -   Controlled by their code.
    -   Activated by an EOA or another contract.

### Transactions
Cryptographically signed instructions from accounts.
-   **Recipient**: Address of receiver.
-   **Value**: Amount of ETH transferred.
-   **Data**: Optional field for contract interaction.
-   **Gas Limit / Max Fee**: Parameters for execution.

---

## Smart Contracts

Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They run exactly as programmed without any possibility of downtime, censorship, fraud, or third-party interference.
-   Typically written in **Solidity** or **Vyper**.
-   Compiled into **Bytecode** for the EVM.
-   Deployed to the blockchain at a specific address.

---

## Consensus Mechanisms

### Proof of Stake (PoS)
Since "The Merge" (Sep 2022), Ethereum uses Proof of Stake.
-   **Validators**: Replace miners. They stake 32 ETH to secure the network.
-   **Energy Efficiency**: ~99.95% reduction in energy usage compared to PoW.
-   **Finality**: Blocks are finalized faster.

---

## Ethereum Standards (ERCs)

**ERC** stands for Ethereum Request for Comment. These are application-level standards.
-   **ERC-20**: Standard for Fungible Tokens (like currency).
-   **ERC-721**: Standard for Non-Fungible Tokens (NFTs, unique items).
-   **ERC-1155**: Multi-Token Standard (batch transfers of fungible/non-fungible).

---

## Networks

### Mainnet
The primary public Ethereum production blockchain. Real ETH, real value.

### Testnets
Networks used for testing protocol upgrades or smart contracts before Mainnet deployment.
-   **Sepolia**: Recommended for application development (DApps).
-   **Holli (Holešky)**: For infrastructure/protocol testing (staking, validators).
-   *(Deprecated: Goerli, Ropsten, Rinkeby, Kovan)*

---

## Layer 2 Scaling

To solve congestion and high fees, **Layer 2 (L2)** solutions process transactions off the main Ethereum chain (Layer 1) while inheriting its security.
-   **Rollups**: Bundle transactions and submit data to L1.
    -   **Optimistic Rollups**: Optimism, Arbitrum.
    -   **ZK-Rollups**: zkSync, Starknet, Polygon zkEVM.

---

## Development Ecosystem

1.  **Node Clients**: Geth, Nethermind, Besu.
2.  **Languages**: Solidity, Vyper, Huff.
3.  **Frameworks**: Hardhat, Foundry, Truffle.
4.  **Libraries**: Web3.js, Ethers.js, Viem.
5.  **Wallets**: MetaMask, Rainbow, Coinbase Wallet.

---

## Resources

-   [Ethereum.org](https://ethereum.org/) - Official documentation.
-   [Etherscan](https://etherscan.io/) - Blockchain explorer.
-   [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) - Free book by Andreas Antonopoulos.
-   [Consensys Academy](https://consensys.net/academy/) - Developer training.

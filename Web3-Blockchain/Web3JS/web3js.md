# Web3.js & Client-Side Ethereum Integration

## Table of Contents
- [Introduction](#introduction)
- [Web3 Libraries](#web3-libraries)
- [Web3.js](#web3-js)
  - [Installation](#installation-web3)
  - [Connection](#connection-web3)
  - [Contract Interaction](#contract-interaction-web3)
- [Ethers.js (Alternative)](#ethers-js-alternative)
  - [Installation](#installation-ethers)
  - [Basic Usage](#basic-usage-ethers)
- [Viem (New Standard)](#viem-new-standard)
- [Wallet Connection](#wallet-connection)
  - [Connecting MetaMask](#connecting-metamask)
- [Providers](#providers)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

To build a **DApp** (Decentralized Application), your frontend (React, Vue, etc.) needs to communicate with the Ethereum blockchain. It does this via "nodes" using JSON-RPC. JavaScript libraries like **Web3.js** and **Ethers.js** wrap these JSON-RPC calls into easy-to-use methods.

---

## Web3 Libraries

There are three main contenders:
1.  **Web3.js**: The original Ethereum library. Massive community, historically the default.
2.  **Ethers.js**: Lightweight, more modern implementation. Often preferred in recent years.
3.  **Viem**: Newest, typesafe, extremely small bundle size. Optimized for performance.

*This guide covers Web3.js primarily but includes Ethers.js basics as it is widely used.*

---

## Web3.js

### Installation (Web3)
```bash
npm install web3
```

### Connection (Web3)
You need a "Provider". Usually `window.ethereum` injected by MetaMask.

```javascript
import Web3 from 'web3';

let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.error("User denied account access");
    }
} else if (window.web3) {
    // Legacy dapp browsers...
    web3 = new Web3(window.web3.currentProvider);
} else {
    // Non-dapp browser OR backup provider (Infura/Alchemy)
    const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/YOUR_ID");
    web3 = new Web3(provider);
}
```

### Contract Interaction (Web3)
You need the **ABI** (Application Binary Interface) and the **Contract Address**.

```javascript
const contractABI = [ ... ]; // From your build output
const contractAddress = "0x...";

const myContract = new web3.eth.Contract(contractABI, contractAddress);

// Reading data (call) - No gas cost
const balance = await myContract.methods.balanceOf("0xUserAddress").call();

// Writing data (send) - Costs gas, requires signature
const receipt = await myContract.methods.transfer("0xRecipient", 100)
    .send({ from: "0xUserAddress" });
```

---

## Ethers.js (Alternative)

### Installation (Ethers)
```bash
npm install ethers
```

### Basic Usage (Ethers)

```javascript
import { ethers } from "ethers";

// 1. Provider (Read-only access to blockchain)
const provider = new ethers.BrowserProvider(window.ethereum);

// 2. Signer (Write access via Wallet)
const signer = await provider.getSigner();

// 3. Contract
const contract = new ethers.Contract(contractAddress, contractABI, provider); // Read-only
const signedContract = new ethers.Contract(contractAddress, contractABI, signer); // Read-Write

// Read
const val = await contract.someViewFunction();

// Write
const tx = await signedContract.someWriteFunction(123);
await tx.wait(); // Wait for mining
```

---

## Viem (New Standard)

**Viem** is gaining popularity for its small size and TypeScript-first approach. It is often used with **Wagmi** (React hooks for Ethereum).

```javascript
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
}) // Read-only client
```

---

## Wallet Connection

### Connecting MetaMask
Most DApps need to connect to a user's wallet.

```javascript
const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected", accounts[0]);
            return accounts[0];
        } catch (error) {
            console.log("Error connecting");
        }
    } else {
        alert("Please install MetaMask!");
    }
};
```

**Note**: For production, use libraries like **RainbowKit**, **Web3Modal**, or **ConnectKit** which handle connection UI and multiple wallets (MetaMask, WalletConnect, Coinbase) automatically.

---

## Providers

You typically don't run your own Ethereum node. You use a "Node Provider" service to read/write data locally if the user doesn't have a wallet, or to support your backend.

1.  **Infura**: The standard. High reliability.
2.  **Alchemy**: Powerful tools, NFT APIs.
3.  **QuickNode**: Fast, multi-chain.
4.  **Ankr**: Decentralized provider.

---

## Best Practices

1.  **Handle Chain Switching**: Ensure the user is on the correct network (e.g., Mainnet vs Sepolia).
2.  **Listen for Events**: Use `window.ethereum.on('accountsChanged', ...)` and `chainChanged` to update UI immediately.
3.  **BigNumber**: Ethereum handles huge numbers (18 decimals). JavaScript `number` is unsafe. Use `BigInt`, `ethers.BigNumber`, or `web3.utils.toBN`.
4.  **State Management**: Use React Context or TanStack Query (via Wagmi) to manage blockchain state.

---

## Resources

-   [Web3.js Documentation](https://web3js.readthedocs.io/)
-   [Ethers.js Documentation](https://docs.ethers.org/)
-   [Viem / Wagmi](https://wagmi.sh/) - Modern React Hooks.
-   [MetaMask Docs](https://docs.metamask.io/)

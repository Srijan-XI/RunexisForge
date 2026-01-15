# MetaMask - Integration Guide

## Table of Contents
- [Introduction](#introduction)
- [How it Works](#how-it-works)
- [Key Features](#key-features)
- [Integration (EIP-1193)](#integration-eip-1193)
  - [Detecting Provider](#detecting-provider)
  - [Connecting Accounts](#connecting-accounts)
  - [Switching Chains](#switching-chains)
  - [Sending Transactions](#sending-transactions)
- [MetaMask SDK](#metamask-sdk)
- [Mobile Linking](#mobile-linking)
- [Resources](#resources)

---

## Introduction

**MetaMask** is the world's leading self-custodial wallet. For developers, it is the primary gateway for users to interact with your DApp. It injects a global API into websites visited by its users at `window.ethereum`.

---

## How it Works

1.  **Key Management**: Stores user's Private Keys securely (encrypted).
2.  **Provider API**: Injects `window.ethereum` (EIP-1193 standard).
3.  **RPC Connection**: Connects to the blockchain so your DApp doesn't need its own node.

---

## Key Features

-   **Account Management**: Create and import accounts.
-   **Network Switching**: Move between Mainnet, Linea, Polygon, etc.
-   **Transaction Signing**: Users must approve every state-changing action.
-   **Sign Messages**: Prove ownership of an account without a transaction (Sign in with Ethereum).

---

## Integration (EIP-1193)

### Detecting Provider

```javascript
import detectEthereumProvider from '@metamask/detect-provider';

const provider = await detectEthereumProvider();

if (provider) {
  console.log('MetaMask installed!');
} else {
  console.log('Please install MetaMask!');
}
```

### Connecting Accounts
This triggers the permission popup.

```javascript
try {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
} catch (error) {
  if (error.code === 4001) {
    // User rejected request
  }
}
```

### Switching Chains
Automatically prompt user to switch to a specific network (e.g., Polygon).

```javascript
try {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x89' }], // Hex for 137 (Polygon)
  });
} catch (switchError) {
  // This error code indicates that the chain has not been added to MetaMask.
  if (switchError.code === 4902) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x89',
            chainName: 'Polygon Mainnet',
            rpcUrls: ['https://polygon-rpc.com/'] /* ... */,
          },
        ],
      });
    } catch (addError) {
      // handle "add" error
    }
  }
}
```

### Sending Transactions

```javascript
const transactionParameters = {
  to: '0x...', // Required except during contract publications.
  from: window.ethereum.selectedAddress, // must match user's active address.
  value: '0x00', // Only required to send ether to the recipient from the initiating external account.
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
};

// txHash is a hex string
// As with any RPC call, it may throw an error
const txHash = await window.ethereum.request({
  method: 'eth_sendTransaction',
  params: [transactionParameters],
});
```

---

## MetaMask SDK

For more advanced integrations (especially Games and Mobile), use the **MetaMask SDK**. It enables connections from any platform (Unity, React Native, iOS, Android, Desktop) to the MetaMask Mobile app via a secure QR code bridge.

---

## Mobile Linking

For PWA/Mobile Web DApps, regular deep links work:
`https://metamask.app.link/dapp/yoursite.com`

---

## Resources

-   [MetaMask Docs](https://docs.metamask.io/)
-   [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)
-   [MetaMask SDK](https://c0f4f41c-2f55-4863-921b-sdk-docs.netlify.app/)

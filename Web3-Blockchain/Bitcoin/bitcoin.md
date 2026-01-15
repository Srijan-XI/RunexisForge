# Bitcoin Development

## Table of Contents
- [Introduction](#introduction)
- [How Bitcoin Works](#how-bitcoin-works)
- [Development Ecosystem](#development-ecosystem)
- [Bitcoin Script](#bitcoin-script)
- [Lightning Network](#lightning-network)
- [Bitcoin Core RPC](#bitcoin-core-rpc)
- [Ordinals & BRC-20](#ordinals--brc-20)
- [Resources](#resources)

---

## Introduction

**Bitcoin** is the first decentralized cryptocurrency, released in 2009 by Satoshi Nakamoto. Unlike Ethereum, Bitcoin's primary use case is as a store of value and medium of exchange ("digital gold"). It uses the **UTXO** (Unspent Transaction Output) model instead of the Account model found in Ethereum.

---

## How Bitcoin Works

-   **Consensus**: Proof of Work (PoW).
-   **Block Time**: ~10 minutes.
-   **Supply Cap**: 21 Million.
-   **UTXO Model**: Your balance is the sum of unspent outputs from previous transactions.

---

## Development Ecosystem

Developing on Bitcoin typically involves:
1.  **Bitcoin Core**: The reference implementation node.
2.  **Libbitcoin**: C++ toolkit.
3.  **BitcoinJ**: Java library.
4.  **Bitcore**: JavaScript library.

---

## Bitcoin Script

Bitcoin uses a stack-based, non-Turing complete scripting language. It is intentionally limited for security.

Example (P2PKH - Pay to Public Key Hash):
```opcodes
OP_DUP OP_HASH160 <PubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
```

---

## Lightning Network

A Layer 2 scaling solution for fast, cheap Bitcoin transactions.
-   **Payment Channels**: Off-chain transactions.
-   **BOLT**: ongoing specifications (Basis of Lightning Technology).
-   **Develop**: `LND` (Lightning Network Daemon), `c-lightning`.

---

## Bitcoin Core RPC

Interact with a node via JSON-RPC.

```bash
# Get blockchain info
bitcoin-cli getblockchaininfo

# Get balance
bitcoin-cli getbalance

# Send transaction
bitcoin-cli sendtoaddress "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" 0.1
```

---

## Ordinals & BRC-20

Recent innovations have brought NFT-like capabilities (Ordinals) and tokens (BRC-20) to Bitcoin by inscribing data onto individual Satoshis (sats).
-   **Ordinals**: Inscriptions of arbitrary data (images, text).
-   **BRC-20**: Experimental token standard built on Ordinals.

---

## Resources

-   [Bitcoin Developer Guide](https://developer.bitcoin.org/)
-   [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) - Free book by Andreas Antonopoulos.
-   [Lightning Labs](https://lightning.engineering/)
-   [Ordinal Theory Handbook](https://docs.ordinals.com/)

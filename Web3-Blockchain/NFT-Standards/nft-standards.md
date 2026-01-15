# NFT Standards - ERC-721 & ERC-1155

## Table of Contents
- [Introduction](#introduction)
- [ERC-721 (Non-Fungible Token)](#erc-721-non-fungible-token)
  - [Interface](#interface)
  - [Example Implementation](#example-implementation)
- [ERC-1155 (Multi-Token Standard)](#erc-1155-multi-token-standard)
  - [Key Differences](#key-differences)
  - [Batch Operations](#batch-operations)
- [Metadata Standards](#metadata-standards)
- [Marketplace Integration](#marketplace-integration)
- [Resources](#resources)

---

## Introduction

Non-Fungible Tokens (NFTs) are unique digital assets. Unlike ETH or BTC, where each unit is identical (fungible), each NFT has distinct properties. The Ethereum community has established standards to ensure these assets are compatible with wallets, marketplaces, and games.

---

## ERC-721 (Non-Fungible Token)

Proposed in 2018, **ERC-721** is the gold standard for NFTs. Each token ID represents a unique asset.

### Interface
Key functions include:
-   `ownerOf(uint256 tokenId)`
-   `transferFrom(address from, address to, uint256 tokenId)`
-   `approve(address to, uint256 tokenId)`
-   `setApprovalForAll(address operator, bool _approved)`

### Example Implementation
Using OpenZeppelin:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 private _nextTokenId;

    constructor() ERC721("MyCoolNFT", "MCN") {}

    function mint(address to) public {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
    }
}
```

---

## ERC-1155 (Multi-Token Standard)

**ERC-1155** (created by Enjin) allows a single contract to manage any combination of:
1.  Fungible Tokens (like currency)
2.  Non-Fungible Tokens (unique items)
3.  Semi-Fungible Tokens (tickets, game items where you have 100 swords)

### Key Differences
-   **Gas Efficiency**: Much cheaper to mint multiple items in one transaction.
-   **Single Contract**: One contract can hold the state of thousands of token types.
-   **Batch Transfers**: Send multiple token types to a recipient in one call.

### Batch Operations
`safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)`

**Example**:
```solidity
// Mint 100 Gold (ID 0) and 1 Sword (ID 1)
_mint(msg.sender, 0, 100, "");
_mint(msg.sender, 1, 1, "");
```

---

## Metadata Standards

For an NFT to display an image and name in wallets/marketplaces, it needs a `tokenURI`. This URI usually points to a JSON file (often hosted on IPFS).

```json
{
  "name": "Cool NFT #1",
  "description": "A very cool item.",
  "image": "ipfs://Qm...",
  "attributes": [
    { "trait_type": "Background", "value": "Blue" }
  ]
}
```

---

## Marketplace Integration

-   **Royalty Standard (ERC-2981)**: Standard way to signal royalty information to marketplaces.
-   **OpenSea**: Uses an off-chain order book (Seaport) but respects on-chain ownership.

---

## Resources

-   [EIP-721 Specification](https://eips.ethereum.org/EIPS/eip-721)
-   [EIP-1155 Specification](https://eips.ethereum.org/EIPS/eip-1155)
-   [OpenZeppelin Docs](https://docs.openzeppelin.com/)
-   [NFT School](https://nftschool.dev/)

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

---

## Advanced NFT Features

### Enumerable NFTs

```solidity
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract EnumerableNFT is ERC721Enumerable {
    constructor() ERC721("MyNFT", "MNFT") {}
    
    function mint(address to, uint tokenId) public {
        _safeMint(to, tokenId);
    }
    
    // Get all tokens owned by address
    function tokensOfOwner(address owner) external view returns (uint[] memory) {
        uint balance = balanceOf(owner);
        uint[] memory tokens = new uint[](balance);
        
        for (uint i = 0; i < balance; i++) {
            tokens[i] = tokenOfOwnerByIndex(owner, i);
        }
        
        return tokens;
    }
}
```

### Dynamic NFT Metadata

```solidity
contract DynamicNFT is ERC721 {
    struct Attributes {
        uint level;
        uint experience;
        string name;
    }
    
    mapping(uint => Attributes) public attributes;
    
    function tokenURI(uint tokenId) public view override returns (string memory) {
        Attributes memory attr = attributes[tokenId];
        
        string memory json = Base64.encode(
            bytes(string(abi.encodePacked(
                '{"name":"', attr.name, '",',
                '"description":"A dynamic NFT",',
                '"attributes":[',
                    '{"trait_type":"Level","value":', Strings.toString(attr.level), '},',
                    '{"trait_type":"Experience","value":', Strings.toString(attr.experience), '}',
                ']}'
            )))
        );
        
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
    
    function levelUp(uint tokenId) external {
        require(ownerOf(tokenId) == msg.sender);
        attributes[tokenId].level++;
    }
}
```

### Soulbound Tokens (Non-Transferable NFTs)

```solidity
contract SoulboundToken is ERC721 {
    constructor() ERC721("Soulbound", "SBT") {}
    
    // Override transfer functions to make non-transferable
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        require(from == address(0), "Soulbound: Transfer not allowed");
        return super._update(to, tokenId, auth);
    }
}
```

### NFT Staking

```solidity
contract NFTStaking {
    IERC721 public nftContract;
    IERC20 public rewardToken;
    
    mapping(uint => address) public stakedOwner;
    mapping(uint => uint) public stakeTime;
    
    uint public rewardRate = 10 ether; // 10 tokens per day
    
    function stake(uint tokenId) external {
        nftContract.transferFrom(msg.sender, address(this), tokenId);
        stakedOwner[tokenId] = msg.sender;
        stakeTime[tokenId] = block.timestamp;
    }
    
    function unstake(uint tokenId) external {
        require(stakedOwner[tokenId] == msg.sender);
        
        uint reward = calculateReward(tokenId);
        
        stakedOwner[tokenId] = address(0);
        stakeTime[tokenId] = 0;
        
        nftContract.transferFrom(address(this), msg.sender, tokenId);
        rewardToken.transfer(msg.sender, reward);
    }
    
    function calculateReward(uint tokenId) public view returns (uint) {
        uint duration = block.timestamp - stakeTime[tokenId];
        return (duration * rewardRate) / 1 days;
    }
}
```

---

## NFT Marketplaces

### Simple NFT Marketplace

```solidity
contract NFTMarketplace {
    struct Listing {
        address seller;
        uint price;
        bool active;
    }
    
    IERC721 public nftContract;
    mapping(uint => Listing) public listings;
    
    event Listed(uint indexed tokenId, address seller, uint price);
    event Sold(uint indexed tokenId, address buyer, uint price);
    
    function list(uint tokenId, uint price) external {
        require(nftContract.ownerOf(tokenId) == msg.sender);
        nftContract.transferFrom(msg.sender, address(this), tokenId);
        
        listings[tokenId] = Listing({
            seller: msg.sender,
            price: price,
            active: true
        });
        
        emit Listed(tokenId, msg.sender, price);
    }
    
    function buy(uint tokenId) external payable {
        Listing memory listing = listings[tokenId];
        require(listing.active, "Not listed");
        require(msg.value >= listing.price, "Insufficient payment");
        
        listings[tokenId].active = false;
        
        nftContract.transferFrom(address(this), msg.sender, tokenId);
        payable(listing.seller).transfer(listing.price);
        
        // Refund excess
        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }
        
        emit Sold(tokenId, msg.sender, listing.price);
    }
    
    function cancelListing(uint tokenId) external {
        Listing memory listing = listings[tokenId];
        require(listing.seller == msg.sender);
        require(listing.active);
        
        listings[tokenId].active = false;
        nftContract.transferFrom(address(this), msg.sender, tokenId);
    }
}
```

### Royalty Implementation (ERC-2981)

```solidity
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract NFTWithRoyalty is ERC721, ERC2981 {
    constructor() ERC721("MyNFT", "MNFT") {
        _setDefaultRoyalty(msg.sender, 500); // 5% royalty
    }
    
    function mint(address to, uint tokenId) public {
        _safeMint(to, tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

---

## NFT Use Cases & Applications

### Gaming NFTs

```solidity
contract GameItem is ERC1155 {
    uint public constant SWORD = 0;
    uint public constant SHIELD = 1;
    uint public constant POTION = 2;
    
    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, SWORD, 10**18, "");
        _mint(msg.sender, SHIELD, 10**27, "");
        _mint(msg.sender, POTION, 10**9, "");
    }
    
    function craft(uint itemId, uint amount) external {
        // Burn materials and mint new item
        _burn(msg.sender, POTION, 2);
        _mint(msg.sender, itemId, amount, "");
    }
}
```

### Membership & Access Tokens

```solidity
contract MembershipNFT is ERC721 {
    mapping(uint => uint) public expiryDate;
    
    function mint(address to, uint tokenId, uint duration) external {
        _safeMint(to, tokenId);
        expiryDate[tokenId] = block.timestamp + duration;
    }
    
    function isValid(uint tokenId) public view returns (bool) {
        return expiryDate[tokenId] > block.timestamp;
    }
    
    function hasAccess(address user) external view returns (bool) {
        uint balance = balanceOf(user);
        for (uint i = 0; i < balance; i++) {
            if (isValid(tokenOfOwnerByIndex(user, i))) {
                return true;
            }
        }
        return false;
    }
}
```

---

## NFT Minting Patterns

### Lazy Minting

```solidity
contract LazyMintNFT is ERC721 {
    using ECDSA for bytes32;
    
    mapping(uint => bool) public minted;
    
    struct NFTVoucher {
        uint tokenId;
        uint minPrice;
        string uri;
        bytes signature;
    }
    
    function redeem(NFTVoucher calldata voucher) external payable {
        require(msg.value >= voucher.minPrice);
        require(!minted[voucher.tokenId]);
        
        address signer = _verify(voucher);
        require(signer == owner(), "Invalid signature");
        
        _safeMint(msg.sender, voucher.tokenId);
        minted[voucher.tokenId] = true;
    }
    
    function _verify(NFTVoucher calldata voucher) internal view returns (address) {
        bytes32 digest = _hash(voucher);
        return digest.toEthSignedMessageHash().recover(voucher.signature);
    }
    
    function _hash(NFTVoucher calldata voucher) internal view returns (bytes32) {
        return keccak256(abi.encode(
            address(this),
            voucher.tokenId,
            voucher.minPrice,
            voucher.uri
        ));
    }
}
```

---

## Additional NFT Resources

### NFT Standards
- **ERC-721** - Non-fungible tokens
- **ERC-1155** - Multi-token standard
- **ERC-2981** - NFT royalty standard
- **ERC-4907** - Rentable NFTs
- **ERC-5192** - Minimal Soulbound NFTs

### NFT Tools & Services
- [OpenSea](https://opensea.io/) - NFT marketplace
- [Rarible](https://rarible.com/) - NFT platform
- [Pinata](https://pinata.cloud/) - IPFS pinning
- [NFT.Storage](https://nft.storage/) - Free IPFS storage
- [Reservoir](https://reservoir.tools/) - NFT liquidity

**Build innovative NFT projects and explore the future of digital ownership!** 🎨✨

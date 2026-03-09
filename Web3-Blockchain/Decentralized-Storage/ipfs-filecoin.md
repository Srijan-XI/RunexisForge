# IPFS & Filecoin - Decentralized Storage Guide

## Table of Contents
- [Introduction](#introduction)
- [IPFS (InterPlanetary File System)](#ipfs-interplanetary-file-system)
  - [What is IPFS](#what-is-ipfs)
  - [How IPFS Works](#how-ipfs-works)
  - [Content Addressing](#content-addressing)
  - [IPFS Installation & Setup](#ipfs-installation--setup)
  - [IPFS CLI Commands](#ipfs-cli-commands)
  - [IPFS in JavaScript](#ipfs-in-javascript)
  - [IPFS with Web3](#ipfs-with-web3)
  - [Pinning Services](#pinning-services)
- [Filecoin](#filecoin)
  - [What is Filecoin](#what-is-filecoin)
  - [How Filecoin Works](#how-filecoin-works)
  - [Filecoin vs IPFS](#filecoin-vs-ipfs)
  - [Filecoin Setup](#filecoin-setup)
  - [Storing Data on Filecoin](#storing-data-on-filecoin)
  - [Retrieving Data](#retrieving-data)
  - [Filecoin APIs](#filecoin-apis)
- [IPFS + Filecoin Integration](#ipfs--filecoin-integration)
- [NFT Storage Use Cases](#nft-storage-use-cases)
- [Web3.Storage](#web3storage)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)
- [Resources](#resources)

---

## Introduction

**Decentralized storage** is a core primitive of Web3, enabling:
- 🔒 **Censorship-resistant** content hosting
- 🌍 **Permanent** data availability
- 🚫 **No single point of failure**
- 💰 **Incentivized** storage networks

**IPFS** provides the protocol for content addressing and peer-to-peer distribution.  
**Filecoin** provides the incentive layer to ensure data persistence.

Together, they form a complete decentralized storage solution:
- IPFS = Transport layer (how files are stored and retrieved)
- Filecoin = Incentive layer (ensuring files stay available)

---

## IPFS (InterPlanetary File System)

### What is IPFS

**IPFS** is a distributed file system protocol that enables:
- **Content-addressed** storage (files identified by their content, not location)
- **Peer-to-peer** file sharing (no central servers)
- **Immutable** data (CIDs never change for the same content)
- **Deduplication** (identical files stored once)

**Key Differences from HTTP:**

| Feature | HTTP | IPFS |
|---------|------|------|
| **Addressing** | Location-based (URL) | Content-based (CID) |
| **Hosting** | Centralized servers | Distributed peers |
| **Availability** | Depends on server uptime | Available if any peer has it |
| **Deduplication** | No | Yes (same content = same CID) |
| **Versioning** | Manual | Built-in (via IPNS) |
| **Censorship** | Easy to block | Difficult to censor |

### How IPFS Works

1. **Add File**: File is chunked, hashed, and added to local IPFS node
2. **Generate CID**: Content Identifier (hash) is created: `QmXyz...`
3. **Announce to DHT**: Node announces it has this CID to the Distributed Hash Table
4. **Peer Discovery**: Other nodes query DHT to find who has the content
5. **Retrieve**: Content is fetched from the nearest peer

```
┌─────────────┐
│  Your File  │
└──────┬──────┘
       │ Split into chunks
       ▼
┌─────────────────┐
│  Merkle DAG      │  (Directed Acyclic Graph)
│  ┌───┐          │
│  │Rt │          │  Root hash = CID
│  └┬─┬┘          │
│   │ │           │
│ ┌─▼─▼─┐        │
│ │Ch1 Ch2│       │  Chunks hashed
│ └──────┘        │
└─────────────────┘
       │
       ▼
   QmXyz... (CID)
```

### Content Addressing

**CID = Content Identifier**

```plaintext
# Example CID (v1)
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi

# Structure
bafy          → CIDv1 indicator
bei           → Multibase encoding (base32)
gdy...        → Multihash (hash of the content)
```

**Why CIDs are powerful:**
```javascript
// Same content = same CID (always)
"Hello World" → QmWfVY9y3xjsixTgbd9AorQxH7VtMpzfx2HaWtsoUYecaX

// Different content = different CID
"Hello World!" → QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx

// If content changes, CID changes
// Old CID still points to old content (immutable)
```

### IPFS Installation & Setup

#### Desktop Installation

**IPFS Desktop** (easiest for beginners):
```bash
# macOS
brew install --cask ipfs

# Windows
choco install ipfs-desktop

# Or download from: https://github.com/ipfs/ipfs-desktop/releases
```

#### CLI Installation

**IPFS Kubo** (Go implementation):
```bash
# Linux/macOS
wget https://dist.ipfs.tech/kubo/v0.26.0/kubo_v0.26.0_linux-amd64.tar.gz
tar -xvzf kubo_v0.26.0_linux-amd64.tar.gz
cd kubo
sudo bash install.sh

# Verify installation
ipfs --version

# Initialize IPFS node
ipfs init

# Start daemon
ipfs daemon
```

**Windows:**
```powershell
# Download from https://dist.ipfs.tech/kubo/
# Extract and add to PATH

# Initialize
ipfs init

# Start daemon
ipfs daemon
```

**Configuration:**
```bash
# Set custom data directory
export IPFS_PATH=/path/to/ipfs

# Configure API port
ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001

# Configure gateway port
ipfs config Addresses.Gateway /ip4/127.0.0.1/tcp/8080

# Enable CORS (for web apps)
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
```

### IPFS CLI Commands

#### Basic Operations

```bash
# Add file to IPFS
ipfs add myfile.txt
# Returns: added QmXyz... myfile.txt

# Add directory
ipfs add -r my-folder/

# Add and wrap in directory
ipfs add -w file1.txt file2.txt

# Retrieve/view file
ipfs cat QmXyz...

# Download file
ipfs get QmXyz... -o downloaded-file.txt

# List directory contents
ipfs ls QmDirHash...
```

#### Advanced Commands

```bash
# Pin file (prevent garbage collection)
ipfs pin add QmXyz...

# Unpin file
ipfs pin rm QmXyz...

# List pinned files
ipfs pin ls

# Check peer connections
ipfs swarm peers

# Node info
ipfs id

# Storage stats
ipfs repo stat

# Garbage collection (remove unpinned data)
ipfs repo gc

# Publish to IPNS (mutable pointer to IPFS content)
ipfs name publish QmXyz...
# Returns: Published to k51qzi5... to /ipfs/QmXyz...

# Resolve IPNS name
ipfs name resolve k51qzi5...
```

#### Network Operations

```bash
# Connect to specific peer
ipfs swarm connect /ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMG...

# Disconnect peer
ipfs swarm disconnect /ip4/...

# Find providers for CID
ipfs dht findprovs QmXyz...

# Provide content to DHT
ipfs dht provide QmXyz...

# DHT query
ipfs dht query QmPeerId...
```

### IPFS in JavaScript

#### Installation

```bash
npm install ipfs-http-client
# Or for browser
npm install ipfs-core
```

#### Node.js Usage

```javascript
import { create } from 'ipfs-http-client';
import { readFileSync } from 'fs';

// Connect to local IPFS node
const ipfs = create({
  host: 'localhost',
  port: 5001,
  protocol: 'http'
});

// Or connect to Infura (public gateway)
const ipfsInfura = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: 'Basic ' + Buffer.from(
      projectId + ':' + projectSecret
    ).toString('base64')
  }
});

// Add file
async function addFile() {
  const file = readFileSync('myfile.txt');
  const result = await ipfs.add(file);
  
  console.log('CID:', result.cid.toString());
  // CID: QmXyz...
  
  return result.cid;
}

// Add JSON
async function addJSON() {
  const data = { name: 'Alice', age: 30 };
  const result = await ipfs.add(JSON.stringify(data));
  
  return result.cid.toString();
}

// Retrieve file
async function getFile(cid) {
  const chunks = [];
  
  for await (const chunk of ipfs.cat(cid)) {
    chunks.push(chunk);
  }
  
  const data = Buffer.concat(chunks);
  console.log('File content:', data.toString());
  return data;
}

// Add directory
async function addDirectory() {
  const files = [
    {
      path: '/images/cat.jpg',
      content: readFileSync('cat.jpg')
    },
    {
      path: '/images/dog.jpg',
      content: readFileSync('dog.jpg')
    },
    {
      path: '/metadata.json',
      content: JSON.stringify({ total: 2 })
    }
  ];
  
  const results = [];
  for await (const result of ipfs.addAll(files, { wrapWithDirectory: true })) {
    results.push(result);
    console.log(`${result.path}: ${result.cid}`);
  }
  
  // Last result is directory CID
  return results[results.length - 1].cid;
}

// Pin file
async function pinFile(cid) {
  await ipfs.pin.add(cid);
  console.log('Pinned:', cid);
}

// List pins
async function listPins() {
  for await (const { cid, type } of ipfs.pin.ls()) {
    console.log(`${type}: ${cid}`);
  }
}
```

#### React Integration

```jsx
import { create } from 'ipfs-http-client';
import { useState } from 'react';

function IPFSUploader() {
  const [ipfs] = useState(() => create({ url: 'http://localhost:5001' }));
  const [cid, setCid] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const added = await ipfs.add(file);
      setCid(added.cid.toString());
      console.log('IPFS CID:', added.cid.toString());
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload to IPFS</h2>
      <input type="file" onChange={uploadFile} disabled={loading} />
      
      {loading && <p>Uploading...</p>}
      
      {cid && (
        <div>
          <p>File uploaded!</p>
          <p>CID: {cid}</p>
          <a 
            href={`https://ipfs.io/ipfs/${cid}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View on IPFS
          </a>
        </div>
      )}
    </div>
  );
}

export default IPFSUploader;
```

### IPFS with Web3

#### NFT Metadata Storage

```javascript
import { create } from 'ipfs-http-client';

const ipfs = create({ url: 'https://ipfs.infura.io:5001' });

async function uploadNFTMetadata(imageFile, metadata) {
  // 1. Upload image
  const imageResult = await ipfs.add(imageFile);
  const imageURI = `ipfs://${imageResult.cid}`;
  
  console.log('Image CID:', imageResult.cid.toString());
  
  // 2. Create metadata JSON
  const nftMetadata = {
    name: metadata.name,
    description: metadata.description,
    image: imageURI,
    attributes: metadata.attributes
  };
  
  // 3. Upload metadata
  const metadataResult = await ipfs.add(JSON.stringify(nftMetadata));
  const metadataURI = `ipfs://${metadataResult.cid}`;
  
  console.log('Metadata CID:', metadataResult.cid.toString());
  
  return {
    imageURI,
    metadataURI,
    imageCID: imageResult.cid.toString(),
    metadataCID: metadataResult.cid.toString()
  };
}

// Usage
const result = await uploadNFTMetadata(imageFile, {
  name: 'Cool NFT #1',
  description: 'This is a cool NFT',
  attributes: [
    { trait_type: 'Rarity', value: 'Legendary' },
    { trait_type: 'Power', value: '100' }
  ]
});

// Use metadataURI in smart contract
// contract.mint(metadataURI);
```

#### Retrieve NFT Metadata

```javascript
async function getNFTMetadata(metadataURI) {
  // Convert ipfs:// to HTTP gateway
  const cid = metadataURI.replace('ipfs://', '');
  const url = `https://ipfs.io/ipfs/${cid}`;
  
  const response = await fetch(url);
  const metadata = await response.json();
  
  // Convert image URI
  if (metadata.image.startsWith('ipfs://')) {
    metadata.image = metadata.image.replace(
      'ipfs://',
      'https://ipfs.io/ipfs/'
    );
  }
  
  return metadata;
}

// Usage
const metadata = await getNFTMetadata('ipfs://QmXyz...');
console.log(metadata);
// {
//   name: "Cool NFT #1",
//   description: "...",
//   image: "https://ipfs.io/ipfs/QmAbc...",
//   attributes: [...]
// }
```

### Pinning Services

Since IPFS nodes garbage-collect unpinned content, you need **pinning services** for persistence.

#### Popular Pinning Services

| Service | Free Tier | Pricing | Features |
|---------|-----------|---------|----------|
| **Pinata** | 1 GB | $20/mo (100GB) | Simple API, analytics |
| **Web3.Storage** | 1 TB free | Free (Filecoin-backed) | NFT-focused |
| **NFT.Storage** | Unlimited (NFTs) | Free | NFT-specific, Filecoin |
| **Infura IPFS** | 5 GB | $50/mo (50GB) | Enterprise-grade |
| **Filebase** | 5 GB free | $6/mo (1TB) | S3-compatible |

#### Pinata Example

```javascript
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const PINATA_API_KEY = 'your_api_key';
const PINATA_SECRET_KEY = 'your_secret_key';

// Pin file
async function pinFileToPinata(filePath) {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  
  const data = new FormData();
  data.append('file', fs.createReadStream(filePath));
  
  const metadata = JSON.stringify({
    name: 'My File',
    keyvalues: {
      env: 'production'
    }
  });
  data.append('pinataMetadata', metadata);
  
  const response = await axios.post(url, data, {
    headers: {
      ...data.getHeaders(),
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_KEY
    }
  });
  
  return response.data.IpfsHash;
}

// Pin JSON
async function pinJSONToPinata(jsonData) {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  
  const response = await axios.post(
    url,
    jsonData,
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY
      }
    }
  );
  
  return response.data.IpfsHash;
}

// List pinned files
async function listPinnedFiles() {
  const url = 'https://api.pinata.cloud/data/pinList';
  
  const response = await axios.get(url, {
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_KEY
    }
  });
  
  return response.data.rows;
}

// Unpin file
async function unpinFile(cid) {
  const url = `https://api.pinata.cloud/pinning/unpin/${cid}`;
  
  await axios.delete(url, {
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_KEY
    }
  });
}
```

---

## Filecoin

### What is Filecoin

**Filecoin** is a decentralized storage network that:
- Provides **economic incentives** for storing data
- Uses **proof-of-storage** to verify data is actually stored
- Creates a **marketplace** for storage providers and clients
- Ensures **long-term data persistence**

**Key Players:**
- **Storage Providers** (miners): Store data, earn FIL tokens
- **Clients**: Pay FIL to store data
- **Retrieval Providers**: Earn FIL by serving data quickly

### How Filecoin Works

```
┌─────────────┐
│   Client    │  Wants to store 1GB for 6 months
└──────┬──────┘
       │ 1. Create storage deal
       ▼
┌──────────────────┐
│ Storage Provider │  Agrees to store for X FIL
└────────┬─────────┘
         │ 2. Data transfer
         ▼
    ┌─────────┐
    │ Stored  │  Data is stored
    └────┬────┘
         │ 3. Prove storage periodically
         ▼
    ┌──────────┐
    │ Rewards  │  Provider earns FIL
    └──────────┘
```

**Proof Mechanisms:**
1. **Proof-of-Replication (PoRep)**: Proves provider stored unique copy
2. **Proof-of-Spacetime (PoSt)**: Proves data is still stored over time

### Filecoin vs IPFS

| Feature | IPFS | Filecoin |
|---------|------|----------|
| **Purpose** | Content addressing & distribution | Incentivized persistent storage |
| **Persistence** | No guarantee (voluntary pinning) | Guaranteed by contracts |
| **Cost** | Free (but need pinning service) | Pay FIL for storage deals |
| **Retrieval** | Free (P2P) | May cost FIL |
| **Use Case** | Short-term sharing | Long-term archival |

**Best Practice:** Use both together
- Store data on Filecoin for persistence
- Access via IPFS for fast retrieval

### Filecoin Setup

#### Install Lotus (Filecoin Client)

```bash
# Linux/macOS
curl https://raw.githubusercontent.com/filecoin-project/lotus/master/scripts/install-lotus.sh | sh

# Or build from source
git clone https://github.com/filecoin-project/lotus.git
cd lotus
make clean all
sudo make install

# Verify
lotus --version
```

#### Connect to Network

```bash
# Start Lotus daemon (connects to mainnet)
lotus daemon

# Or connect to calibration testnet
lotus daemon --network=calibnet

# Wait for sync (can take hours for mainnet)
lotus sync wait

# Create wallet
lotus wallet new

# Get address
lotus wallet default

# Check balance
lotus wallet balance
```

### Storing Data on Filecoin

#### CLI Storage Deal

```bash
# Import data
lotus client import ./myfile.txt
# Returns: Import <DATA_CID>, Root <ROOT_CID>

# Find storage providers
lotus client query-ask <MINER_ID>

# Create storage deal
lotus client deal <DATA_CID> <MINER_ID> <PRICE> <DURATION>

# Example:
lotus client deal QmXyz... f01234 0.0000001 518400
# 518400 epochs ≈ 6 months

# Check deal status
lotus client list-deals

# Retrieve data
lotus client retrieve <DATA_CID> output.txt
```

#### Using Filecoin APIs

**Powergate** (simplified Filecoin API):

```bash
# Install Powergate
docker pull textile/powergate
docker run -p 6002:6002 textile/powergate
```

```javascript
import { createPow } from '@textile/powergate-client';

const pow = createPow({ host: 'http://localhost:6002' });

// Store data
async function storeOnFilecoin(data) {
  const { token } = await pow.ffs.create();
  pow.setToken(token);
  
  const buffer = Buffer.from(data);
  const { cid } = await pow.ffs.addToHot(buffer);
  
  console.log('Data CID:', cid);
  
  // Push to Filecoin (cold storage)
  const { jobId } = await pow.ffs.pushStorageConfig(cid);
  
  console.log('Storage job:', jobId);
  
  // Wait for deal
  const cancel = pow.ffs.watchJobs((job) => {
    console.log('Job update:', job);
    if (job.status === 'Success') {
      console.log('Deal complete!');
      cancel();
    }
  }, jobId);
  
  return cid;
}

// Retrieve data
async function retrieveFromFilecoin(cid) {
  const bytes = await pow.ffs.get(cid);
  return Buffer.from(bytes).toString();
}
```

### Retrieval

```bash
# Find providers that have the data
lotus client find <DATA_CID>

# Retrieve from specific provider
lotus client retrieve --provider <MINER_ID> <DATA_CID> output.txt

# Retrieve via IPFS (if available)
ipfs get <DATA_CID>
```

### Filecoin APIs

#### Web3.Storage (Easiest)

```javascript
import { Web3Storage } from 'web3.storage';

const client = new Web3Storage({ token: 'YOUR_API_TOKEN' });

// Upload files (automatically backed by Filecoin)
async function uploadFiles(files) {
  const cid = await client.put(files);
  console.log('Stored with CID:', cid);
  return cid;
}

// Retrieve
async function getFile(cid) {
  const res = await client.get(cid);
  const files = await res.files();
  
  for (const file of files) {
    console.log(`${file.name}: ${file.size} bytes`);
  }
  
  return files;
}

// Check status
async function checkStatus(cid) {
  const status = await client.status(cid);
  console.log('Deals:', status.deals);
  console.log('Pins:', status.pins);
}
```

#### NFT.Storage

```javascript
import { NFTStorage, File } from 'nft.storage';

const client = new NFTStorage({ token: 'YOUR_API_TOKEN' });

// Store NFT
async function storeNFT(imagePath, metadata) {
  const imageFile = new File([await readFile(imagePath)], 'nft.png', {
    type: 'image/png'
  });
  
  const nft = await client.store({
    name: metadata.name,
    description: metadata.description,
    image: imageFile,
    properties: metadata.attributes
  });
  
  console.log('NFT stored!');
  console.log('Metadata CID:', nft.ipnft);
  console.log('Metadata URL:', nft.url);
  
  return nft;
}

// The metadata is automatically in correct format:
// {
//   "name": "...",
//   "description": "...",
//   "image": "ipfs://bafyb.../nft.png",
//   "properties": {...}
// }
```

---

## IPFS + Filecoin Integration

**Best Architecture:**

```
User uploads file
    ↓
Add to IPFS (get CID)
    ↓
Pin to IPFS gateway (fast access)
    ↓
Create Filecoin deal (long-term storage)
    ↓
Data is:
  - Accessible via IPFS (fast)
  - Persisted via Filecoin (guaranteed)
```

**Implementation:**

```javascript
import { create } from 'ipfs-http-client';
import { Web3Storage } from 'web3.storage';

const ipfs = create({ url: 'http://localhost:5001' });
const web3storage = new Web3Storage({ token: 'YOUR_TOKEN' });

async function storeWithBackup(file) {
  // 1. Add to local IPFS
  const ipfsResult = await ipfs.add(file);
  const cid = ipfsResult.cid.toString();
  
  console.log('IPFS CID:', cid);
  
  // 2. Pin to IPFS gateway (Pinata, Infura, etc.)
  await ipfs.pin.add(cid);
  
  // 3. Backup to Filecoin via Web3.Storage
  const files = [new File([file], 'file.dat')];
  const filecoinCID = await web3storage.put(files);
  
  console.log('Filecoin CID:', filecoinCID);
  
  // CIDs should match (same content)
  console.assert(cid === filecoinCID, 'CIDs should match');
  
  return {
    cid,
    ipfsGateway: `https://ipfs.io/ipfs/${cid}`,
    web3StorageURL: `https://${filecoinCID}.ipfs.w3s.link/`
  };
}
```

---

## NFT Storage Use Cases

### Store NFT Collection

```javascript
import { NFTStorage } from 'nft.storage';
import { glob } from 'glob';
import { readFile } from 'fs/promises';
import path from 'path';

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

async function uploadNFTCollection(collectionDir, metadata) {
  const imagePaths = await glob(`${collectionDir}/*.png`);
  
  const nfts = [];
  
  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    const imageData = await readFile(imagePath);
    const imageFile = new File([imageData], `${i}.png`, { type: 'image/png' });
    
    const nft = await client.store({
      name: `${metadata.collectionName} #${i}`,
      description: metadata.description,
      image: imageFile,
      properties: {
        ...metadata.baseAttributes,
        tokenId: i
      }
    });
    
    nfts.push({
      tokenId: i,
      metadataURI: `ipfs://${nft.ipnft}`,
      metadataCID: nft.ipnft,
      imageURI: nft.data.image.href
    });
    
    console.log(`Uploaded NFT #${i}: ${nft.ipnft}`);
  }
  
  // Save mapping for smart contract
  await writeFile(
    'nft-metadata.json',
    JSON.stringify(nfts, null, 2)
  );
  
  return nfts;
}

// Usage
await uploadNFTCollection('./images', {
  collectionName: 'Cool Cats',
  description: 'A collection of cool cats',
  baseAttributes: {
    collection: 'Cool Cats',
    creator: 'Alice'
  }
});
```

---

## Web3.Storage

**Web3.Storage** provides free, Filecoin-backed storage with a simple API.

### Setup

```bash
npm install web3.storage
```

### Usage

```javascript
import { Web3Storage, getFilesFromPath } from 'web3.storage';

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

// Upload directory
async function uploadDirectory(dirPath) {
  const files = await getFilesFromPath(dirPath);
  const cid = await client.put(files, {
    name: 'My Website',
    wrapWithDirectory: true
  });
  
  console.log(`Uploaded to: https://${cid}.ipfs.w3s.link/`);
  return cid;
}

// Upload single file
async function uploadFile(filePath) {
  const files = await getFilesFromPath(filePath);
  const cid = await client.put(files);
  
  const url = `https://${cid}.ipfs.w3s.link/${files[0].name}`;
  console.log('File URL:', url);
  
  return { cid, url };
}

// List uploads
async function listUploads() {
  for await (const upload of client.list()) {
    console.log(`${upload.name}: ${upload.cid}`);
    console.log('  Created:', upload.created);
    console.log('  Deals:', upload.deals);
  }
}

// Check upload status
async function checkUpload(cid) {
  const status = await client.status(cid);
  
  console.log('CID:', status.cid);
  console.log('Created:', status.created);
  console.log('Filecoin deals:', status.deals.length);
  
  for (const deal of status.deals) {
    console.log(`  Provider: ${deal.miner}`);
    console.log(`  Status: ${deal.status}`);
  }
  
  return status;
}
```

---

## Practical Examples

### 1. Decentralized Blog

```javascript
import { Web3Storage } from 'web3.storage';
import markdown from 'markdown-it';

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });
const md = markdown();

async function publishBlogPost(post) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${post.title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1>${post.title}</h1>
      <p>By ${post.author} on ${post.date}</p>
      <article>
        ${md.render(post.content)}
      </article>
    </body>
    </html>
  `;
  
  const file = new File([html], 'index.html', { type: 'text/html' });
  const cid = await client.put([file]);
  
  const url = `https://${cid}.ipfs.w3s.link/index.html`;
  console.log('Blog post published:', url);
  
  return { cid, url };
}

// Usage
await publishBlogPost({
  title: 'My First Decentralized Blog Post',
  author: 'Alice',
  date: new Date().toISOString(),
  content: '# Hello IPFS!\n\nThis blog is hosted on IPFS and backed by Filecoin.'
});
```

### 2. Decentralized Image Gallery

```javascript
async function createGallery(imageFiles) {
  // Upload images
  const imageCIDs = [];
  for (const imageFile of imageFiles) {
    const cid = await client.put([imageFile]);
    imageCIDs.push({
      name: imageFile.name,
      cid,
      url: `https://${cid}.ipfs.w3s.link/${imageFile.name}`
    });
  }
  
  // Create HTML gallery
  const galleryHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>IPFS Gallery</title>
      <style>
        .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        img { width: 100%; border-radius: 8px; }
      </style>
    </head>
    <body>
      <h1>My IPFS Gallery</h1>
      <div class="gallery">
        ${imageCIDs.map(img => `
          <div>
            <img src="${img.url}" alt="${img.name}">
            <p>${img.name}</p>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;
  
  const indexFile = new File([galleryHTML], 'index.html', { type: 'text/html' });
  const galleryCID = await client.put([indexFile]);
  
  return `https://${galleryCID}.ipfs.w3s.link/index.html`;
}
```

### 3. Proof of Existence

```javascript
import crypto from 'crypto';

async function proveExistence(file) {
  // 1. Hash file
  const hash = crypto.createHash('sha256').update(file).digest('hex');
  
  // 2. Upload to IPFS
  const ipfsFile = new File([file], hash + '.dat');
  const cid = await client.put([ipfsFile]);
  
  // 3. Store proof
  const proof = {
    hash,
    cid,
    timestamp: Date.now(),
    ipfsURL: `https://${cid}.ipfs.w3s.link/${hash}.dat`
  };
  
  const proofFile = new File(
    [JSON.stringify(proof, null, 2)],
    'proof.json',
    { type: 'application/json' }
  );
  
  const proofCID = await client.put([proofFile]);
  
  console.log('File stored:', cid);
  console.log('Proof stored:', proofCID);
  console.log('Proof URL:', `https://${proofCID}.ipfs.w3s.link/proof.json`);
  
  return proof;
}

// Verify proof
async function verifyProof(file, proofCID) {
  const hash = crypto.createHash('sha256').update(file).digest('hex');
  
  const proofURL = `https://${proofCID}.ipfs.w3s.link/proof.json`;
  const response = await fetch(proofURL);
  const proof = await response.json();
  
  console.log('File hash:', hash);
  console.log('Proof hash:', proof.hash);
  console.log('Match:', hash === proof.hash);
  
  return hash === proof.hash;
}
```

---

## Best Practices

### 1. Choose the Right Storage

```javascript
// Small, frequently accessed data → IPFS only
// Examples: API responses, real-time data

// Large, archival data → Filecoin
// Examples: backups, historical records

// NFT assets → IPFS + Filecoin (via NFT.Storage)
// Examples: NFT images, metadata

// Public websites → Web3.Storage
// Examples: documentation, blogs
```

### 2. Use Directory Wrapping

```javascript
// Good: Wrap in directory for cleaner URLs
const cid = await client.put(files, { wrapWithDirectory: true });
// URL: ipfs://QmDir.../image.png

// Without wrapping:
// URL: ipfs://QmImageHash... (no filename)
```

### 3. Compress Before Upload

```javascript
import zlib from 'zlib';

async function uploadCompressed(file) {
  const compressed = zlib.gzipSync(file);
  const compressedFile = new File([compressed], 'data.gz');
  
  const cid = await client.put([compressedFile]);
  console.log(`Original: ${file.length} bytes`);
  console.log(`Compressed: ${compressed.length} bytes`);
  console.log(`Savings: ${(1 - compressed.length / file.length) * 100}%`);
  
  return cid;
}
```

### 4. Use CID in Smart Contracts

```solidity
// Store only CID in contract
contract NFT {
    mapping(uint256 => string) private _tokenURIs;
    
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        string memory cid = _tokenURIs[tokenId];
        return string(abi.encodePacked("ipfs://", cid));
    }
}
```

### 5. Implement Retry Logic

```javascript
async function uploadWithRetry(file, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const cid = await client.put([file]);
      return cid;
    } catch (error) {
      console.error(`Upload attempt ${i + 1} failed:`, error);
      if (i === maxRetries - 1) throw error;
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000));
    }
  }
}
```

---

## Performance Optimization

### 1. Use Multiple Gateways

```javascript
const GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://dweb.link/ipfs/'
];

async function fetchFromFastestGateway(cid) {
  const promises = GATEWAYS.map(gateway =>
    fetch(gateway + cid).then(res => ({ gateway, res }))
  );
  
  // Return first successful response
  const { gateway, res } = await Promise.race(promises);
  console.log('Fastest gateway:', gateway);
  
  return res;
}
```

### 2. Preload Content

```javascript
// Preconnect to IPFS gateways
<link rel="preconnect" href="https://ipfs.io">
<link rel="preconnect" href="https://cloudflare-ipfs.com">

// Prefetch known CIDs
const prefetch = (cid) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = `https://ipfs.io/ipfs/${cid}`;
  document.head.appendChild(link);
};
```

### 3. Chunk Large Files

```javascript
async function uploadLargeFile(file, chunkSize = 1024 * 1024) {
  const chunks = [];
  for (let i = 0; i < file.size; i += chunkSize) {
    chunks.push(file.slice(i, i + chunkSize));
  }
  
  console.log(`Split into ${chunks.length} chunks`);
  
  const cids = [];
  for (const chunk of chunks) {
    const cid = await ipfs.add(chunk);
    cids.push(cid);
  }
  
  // Store chunk manifest
  const manifest = { chunks: cids };
  const manifestCID = await ipfs.add(JSON.stringify(manifest));
  
  return manifestCID;
}
```

---

## Security Considerations

### 1. Encrypt Sensitive Data

```javascript
import crypto from 'crypto';

function encryptFile(buffer, password) {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(password, 'salt', 32);
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  
  return { encrypted, iv };
}

async function uploadEncrypted(file, password) {
  const { encrypted, iv } = encryptFile(file, password);
  
  // Upload encrypted file
  const encryptedFile = new File([encrypted], 'encrypted.dat');
  const cid = await client.put([encryptedFile]);
  
  // Store IV separately (or include with CID)
  return { cid, iv: iv.toString('hex') };
}

function decryptFile(encrypted, iv, password) {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(password, 'salt', 32);
  
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, 'hex')
  );
  
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}
```

### 2. Validate Content

```javascript
async function verifyContent(cid, expectedHash) {
  const data = await ipfs.cat(cid);
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  
  if (hash !== expectedHash) {
    throw new Error('Content hash mismatch! Possible tampering.');
  }
  
  return data;
}
```

### 3. Use Allowlists for User Uploads

```javascript
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif'];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function validateUpload(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  if (file.size > MAX_SIZE) {
    throw new Error('File too large');
  }
  
  return true;
}
```

---

## Resources

### IPFS Resources
- [IPFS Docs](https://docs.ipfs.tech/)
- [IPFS GitHub](https://github.com/ipfs/ipfs)
- [IPFS Blog](https://blog.ipfs.tech/)
- [ProtoSchool Tutorials](https://proto.school/)

### Filecoin Resources
- [Filecoin Docs](https://docs.filecoin.io/)
- [Lotus Documentation](https://lotus.filecoin.io/)
- [Filecoin Spec](https://spec.filecoin.io/)
- [Filecoin Slack](https://filecoin.io/slack)

### Storage Services
- [Web3.Storage](https://web3.storage/)
- [NFT.Storage](https://nft.storage/)
- [Pinata](https://www.pinata.cloud/)
- [Infura IPFS](https://infura.io/product/ipfs)
- [Filebase](https://filebase.com/)

### Tools
- [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)
- [IPFS Companion](https://github.com/ipfs/ipfs-companion) - Browser extension
- [ipfs-http-client](https://www.npmjs.com/package/ipfs-http-client)
- [web3.storage](https://www.npmjs.com/package/web3.storage)

### Community
- [IPFS Forums](https://discuss.ipfs.tech/)
- [Filecoin Slack](https://filecoin.io/slack)
- [r/ipfs](https://www.reddit.com/r/ipfs/)
- [r/filecoin](https://www.reddit.com/r/filecoin/)

---

**Decentralize All The Things! 🌐**

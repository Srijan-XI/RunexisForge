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

---

## Ethereum Clients

Ethereum clients are implementations of the Ethereum protocol that allow you to run a node, validate blocks, and interact with the network.

### Client Types

**Execution Clients** (formerly ETH1):
- Geth (Go Ethereum)
- Nethermind (.NET)
- Besu (Java)
- Erigon (Go - optimized)

**Consensus Clients** (formerly ETH2):
- Prysm (Go)
- Lighthouse (Rust)
- Teku (Java)
- Nimbus (Nim)

### Geth (Go Ethereum)

#### Installation

```bash
# Ubuntu/Debian
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum

# macOS
brew tap ethereum/ethereum
brew install ethereum

# From source
git clone https://github.com/ethereum/go-ethereum.git
cd go-ethereum
make geth
```

#### Running Geth

```bash
# Mainnet
geth

# Sepolia testnet
geth --sepolia

# With HTTP RPC
geth --http --http.api eth,net,web3

# Full sync
geth --syncmode full

# Snap sync (faster, default)
geth --syncmode snap

# Light mode
geth --syncmode light
```

#### Geth JavaScript Console

```javascript
// Attach to running geth
geth attach

// Get account balance
eth.getBalance("0xaddress...")

// Get block number
eth.blockNumber

// Get block
eth.getBlock(16000000)

// Create account
personal.newAccount("password")

// Unlock account
personal.unlockAccount("0xaddress...", "password", 300)

// Send transaction
eth.sendTransaction({
  from: "0xsender...",
  to: "0xrecipient...",
  value: web3.toWei(1, "ether")
})

// Deploy contract
var abi = [...] // Contract ABI
var bytecode = "0x..." // Contract bytecode
var MyContract = eth.contract(abi)
var contract = MyContract.new({
  from: eth.accounts[0],
  data: bytecode,
  gas: 3000000
})
```

### Nethermind

High-performance .NET Ethereum client.

```bash
# Download and extract
wget https://github.com/NethermindEth/nethermind/releases/download/1.25.0/nethermind-linux-amd64-1.25.0.zip
unzip nethermind-linux-amd64-1.25.0.zip
cd nethermind

# Run mainnet
./Nethermind.Runner --config mainnet

# Run with JSON RPC
./Nethermind.Runner --config mainnet --JsonRpc.Enabled true
```

### Erigon (formerly OpenEthereum/Turbo-Geth)

Optimized for performance and storage efficiency.

```bash
# Install
git clone https://github.com/ledgerwatch/erigon.git
cd erigon
make erigon

# Run
./build/bin/erigon --chain mainnet

# With RPC
./build/bin/erigon --chain mainnet --http --http.api=eth,net,web3
```

**Key Features:**
- Up to 70% disk space savings
- Faster initial sync
- Modular architecture
- Stage-based sync

### Running Full Node vs Archive Node

**Full Node:**
```bash
geth --syncmode snap
# Stores recent state (~700GB)
```

**Archive Node:**
```bash
geth --syncmode full --gcmode archive
# Stores all historical state (~14TB+)
# Required for historical queries
```

---

## Working with Ethereum Programmatically

### Web3.js

```bash
npm install web3
```

```javascript
const Web3 = require('web3');

// Connect to local node
const web3 = new Web3('http://localhost:8545');

// Or connect to Infura
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_KEY');

// Get balance
const balance = await web3.eth.getBalance('0xaddress...');
console.log('Balance:', web3.utils.fromWei(balance, 'ether'));

// Get latest block
const block = await web3.eth.getBlock('latest');
console.log('Latest block:', block.number);

// Send transaction
const tx = {
  from: '0xsender...',
  to: '0xrecipient...',
  value: web3.utils.toWei('1', 'ether'),
  gas: 21000,
};

const signedTx = await web3.eth.accounts.signTransaction(
  tx,
  'PRIVATE_KEY'
);

const receipt = await web3.eth.sendSignedTransaction(
  signedTx.rawTransaction
);
console.log('Transaction hash:', receipt.transactionHash);

// Interact with smart contract
const abi = [...]; // Contract ABI
const address = '0xcontract...';
const contract = new web3.eth.Contract(abi, address);

// Call view function
const result = await contract.methods.balanceOf('0xaddress...').call();

// Send transaction to contract
await contract.methods.transfer('0xrecipient...', amount).send({
  from: '0xsender...',
  gas: 100000
});

// Listen to events
contract.events.Transfer()
  .on('data', (event) => {
    console.log('Transfer event:', event.returnValues);
  })
  .on('error', console.error);
```

### Ethers.js (Modern Alternative)

```bash
npm install ethers
```

```javascript
const { ethers } = require('ethers');

// Connect to provider
const provider = new ethers.JsonRpcProvider('http://localhost:8545');

// Or use Infura/Alchemy
const provider = new ethers.InfuraProvider('mainnet', 'YOUR_KEY');

// Create wallet
const wallet = new ethers.Wallet('PRIVATE_KEY', provider);

// Get balance
const balance = await provider.getBalance('0xaddress...');
console.log('Balance:', ethers.formatEther(balance));

// Send transaction
const tx = await wallet.sendTransaction({
  to: '0xrecipient...',
  value: ethers.parseEther('1.0')
});

await tx.wait(); // Wait for confirmation
console.log('Transaction hash:', tx.hash);

// Contract interaction
const abi = [...];
const address = '0xcontract...';
const contract = new ethers.Contract(address, abi, provider);

// Read
const balance = await contract.balanceOf('0xaddress...');

// Write
const contractWithSigner = contract.connect(wallet);
const tx = await contractWithSigner.transfer('0xrecipient...', amount);
await tx.wait();

// Listen to events
contract.on('Transfer', (from, to, amount) => {
  console.log(`Transfer: ${from} -> ${to}: ${amount}`);
});
```

---

## Ethereum Development Workflow

### Project Setup with Hardhat

```bash
npm init -y
npm install --save-dev hardhat
npx hardhat init
```

**hardhat.config.js:**
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
```

### Writing Tests

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let token;
  let owner;
  let addr1;

  beforeEach(async function () {
    const Token = await ethers.getContractFactory("MyToken");
    [owner, addr1] = await ethers.getSigners();
    token = await Token.deploy();
  });

  it("Should assign total supply to owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens", async function () {
    await token.transfer(addr1.address, 50);
    expect(await token.balanceOf(addr1.address)).to.equal(50);
  });
});
```

### Deployment Script

```javascript
// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const contract = await MyContract.deploy(arg1, arg2);

  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());

  // Verify on Etherscan
  if (hre.network.name !== "hardhat") {
    await hre.run("verify:verify", {
      address: await contract.getAddress(),
      constructorArguments: [arg1, arg2],
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

## MEV (Maximal Extractable Value)

### Understanding MEV

MEV refers to the profit miners/validators can extract by reordering, including, or excluding transactions in blocks.

**Common MEV Strategies:**
- Front-running
- Back-running
- Sandwich attacks
- Liquidations
- Arbitrage

### Flashbots

Flashbots provides tools to democratize MEV extraction and reduce harmful MEV.

```javascript
// Flashbots bundle example
const flashbotsProvider = await FlashbotsBundleProvider.create(
  provider,
  authSigner
);

const signedBundle = await flashbotsProvider.signBundle([
  {
    signer: wallet,
    transaction: tx1
  },
  {
    signer: wallet,
    transaction: tx2
  }
]);

const simulation = await flashbotsProvider.simulate(
  signedBundle,
  targetBlockNumber
);

if (simulation.firstRevert) {
  console.log("Bundle reverts");
} else {
  const bundleSubmission = await flashbotsProvider.sendRawBundle(
    signedBundle,
    targetBlockNumber
  );
}
```

---

## Ethereum Scaling Solutions

### Layer 2 Comparison

| Solution | Type | TPS | Finality | Security |
|----------|------|-----|----------|----------|
| **Optimism** | Optimistic Rollup | ~2000 | 7 days (withdrawals) | Ethereum |
| **Arbitrum** | Optimistic Rollup | ~4000 | 7 days (withdrawals) | Ethereum |
| **zkSync Era** | ZK Rollup | ~2000 | Minutes | Ethereum |
| **Polygon zkEVM** | ZK Rollup | ~2000 | Minutes | Ethereum |
| **StarkNet** | ZK Rollup | ~10k+ | Minutes | Ethereum |

### Deploying to Layer 2

Most L2s are EVM-compatible - just change the RPC endpoint:

```javascript
// Optimism
networks: {
  optimism: {
    url: "https://mainnet.optimism.io",
    accounts: [PRIVATE_KEY]
  }
}

// Arbitrum
networks: {
  arbitrum: {
    url: "https://arb1.arbitrum.io/rpc",
    accounts: [PRIVATE_KEY]
  }
}
```

---

## Advanced Ethereum Patterns

### Proxy Patterns for Upgrades

```solidity
// Transparent Proxy Pattern
contract Proxy {
    address public implementation;
    address public admin;

    function upgradeTo(address newImplementation) external {
        require(msg.sender == admin);
        implementation = newImplementation;
    }

    fallback() external payable {
        address impl = implementation;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}
```

### Diamond Pattern (EIP-2535)

```solidity
// Allows multiple implementation contracts
// with shared storage
contract Diamond {
    struct FacetCut {
        address facetAddress;
        bytes4[] functionSelectors;
    }

    mapping(bytes4 => address) public selectorToFacet;

    function diamondCut(FacetCut[] memory cuts) external {
        for (uint i = 0; i < cuts.length; i++) {
            for (uint j = 0; j < cuts[i].functionSelectors.length; j++) {
                selectorToFacet[cuts[i].functionSelectors[j]] = cuts[i].facetAddress;
            }
        }
    }
}
```

---

##  Ethereum Security Best Practices

### Common Vulnerabilities

**1. Reentrancy:**
```solidity
// Vulnerable
function withdraw() public {
    uint amount = balances[msg.sender];
    (bool success,) = msg.sender.call{value: amount}("");
    balances[msg.sender] = 0; // State change after external call!
}

// Secure
function withdraw() public {
    uint amount = balances[msg.sender];
    balances[msg.sender] = 0; // State change first
    (bool success,) = msg.sender.call{value: amount}("");
    require(success);
}
```

**2. Integer Overflow (pre-0.8.0):**
```solidity
// Use OpenZeppelin SafeMath or Solidity 0.8+
uint256 total = a + b; // Automatically reverts on overflow in 0.8+
```

**3. Access Control:**
```solidity
// Use OpenZeppelin Ownable
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {
    function sensitiveFunction() public onlyOwner {
        // Only owner can call
    }
}
```

### Security Tools

```bash
# Slither - Static analyzer
pip3 install slither-analyzer
slither contracts/

# Mythril - Symbolic execution
pip3 install mythril
myth analyze contracts/MyContract.sol

# Echidna - Fuzzer
echidna-test contracts/MyContract.sol
```

---

## Real-World Ethereum Applications

### DeFi Protocol Example

```solidity
// Simplified lending protocol
contract LendingPool {
    mapping(address => uint) public deposits;
    mapping(address => uint) public borrows;

    function deposit() public payable {
        deposits[msg.sender] += msg.value;
    }

    function borrow(uint amount) public {
        require(deposits[msg.sender] * 2 >= amount, "Insufficient collateral");
        borrows[msg.sender] += amount;
        payable(msg.sender).transfer(amount);
    }

    function repay() public payable {
        borrows[msg.sender] -= msg.value;
    }

    function withdraw(uint amount) public {
        require(deposits[msg.sender] >= amount);
        require(deposits[msg.sender] - amount >= borrows[msg.sender] * 2);
        deposits[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
```

---

## Monitoring & Analytics

### The Graph Protocol

```graphql
# GraphQL query for Uniswap data
{
  pairs(first: 10, orderBy: volumeUSD, orderDirection: desc) {
    id
    token0 {
      symbol
    }
    token1 {
      symbol
    }
    volumeUSD
    reserveUSD
  }
}
```

### Event Monitoring

```javascript
// Monitor all transfers on a token
const contract = new ethers.Contract(address, abi, provider);

contract.on('Transfer', (from, to, amount, event) => {
  console.log({
    from,
    to,
    amount: ethers.formatUnits(amount, 18),
    blockNumber: event.blockNumber,
    txHash: event.transactionHash
  });
});
```

---

## Additional Resources

### Development Tools
- [Remix IDE](https://remix.ethereum.org/) - Online Solidity IDE
- [Hardhat](https://hardhat.org/) - Development environment
- [Foundry](https://book.getfoundry.sh/) - Rust-based toolkit
- [Tenderly](https://tenderly.co/) - Monitoring and debugging

### Infrastructure Providers
- [Infura](https://infura.io/) - RPC endpoints
- [Alchemy](https://www.alchemy.com/) - Web3 platform
- [QuickNode](https://www.quicknode.com/) - Node infrastructure

### Learning Resources
- [CryptoZombies](https://cryptozombies.io/) - Learn Solidity
- [Ethereum.org Developers](https://ethereum.org/en/developers/)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- [Solidity by Example](https://solidity-by-example.org/)

---

**This comprehensive guide covers Ethereum from running nodes to building dApps. Continue learning and building on the world's leading smart contract platform!** 🚀⟠

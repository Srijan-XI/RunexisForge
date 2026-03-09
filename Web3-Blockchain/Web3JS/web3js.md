# Web3.js & Ethers.js - Complete Guide to Ethereum JavaScript Libraries

## Table of Contents
- [Introduction](#introduction)
- [Library Comparison](#library-comparison)
- [Web3.js](#web3js)
  - [Installation & Setup](#installation--setup-web3js)
  - [Providers & Connection](#providers--connection)
  - [Accounts & Wallets](#accounts--wallets)
  - [Reading Blockchain Data](#reading-blockchain-data)
  - [Sending Transactions](#sending-transactions)
  - [Smart Contract Interaction](#smart-contract-interaction)
  - [Events & Subscriptions](#events--subscriptions)
  - [Utility Functions](#utility-functions)
- [Ethers.js](#ethersjs)
  - [Installation & Setup](#installation--setup-ethersjs)
  - [Providers](#providers-ethersjs)
  - [Signers & Wallets](#signers--wallets)
  - [Contract Interaction](#contract-interaction-ethersjs)
  - [Transactions](#transactions-ethersjs)
  - [Event Filtering](#event-filtering)
  - [ENS Integration](#ens-integration)
- [Viem (Modern Alternative)](#viem-modern-alternative)
- [Wallet Integration](#wallet-integration)
  - [MetaMask Connection](#metamask-connection)
  - [WalletConnect](#walletconnect)
  - [Multi-Wallet Support](#multi-wallet-support)
- [Real-World Use Cases](#real-world-use-cases)
- [Best Practices](#best-practices)
- [Migration Guides](#migration-guides)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Resources](#resources)

---

## Introduction

To build a **DApp** (Decentralized Application), your frontend JavaScript application needs to communicate with the Ethereum blockchain. Ethereum nodes expose a JSON-RPC API, but working directly with JSON-RPC is cumbersome. Web3 libraries abstract this complexity into easy-to-use JavaScript/TypeScript APIs.

These libraries handle:
- **Connecting to Ethereum networks** (Mainnet, testnets, L2s)
- **Reading blockchain state** (balances, blocks, transactions)
- **Interacting with smart contracts** (calling functions, listening to events)
- **Sending transactions** (ETH transfers, contract calls)
- **Wallet integration** (MetaMask, WalletConnect, Ledger)
- **Cryptographic operations** (signing, hashing, encryption)

---

## Library Comparison

### Web3.js vs Ethers.js vs Viem

| Feature | Web3.js | Ethers.js | Viem |
|---------|---------|-----------|------|
| **Release Year** | 2015 | 2016 | 2022 |
| **Bundle Size** | ~600KB | ~100KB | ~30KB |
| **TypeScript** | Improving (v4+) | Excellent | Native |
| **Learning Curve** | Moderate | Easy | Easy |
| **Documentation** | Good | Excellent | Excellent |
| **Community** | Largest (legacy) | Large | Growing |
| **Dependencies** | Many | Few | Minimal |
| **Tree Shaking** | Limited | Good | Excellent |
| **ENS Support** | Via plugin | Native | Native |
| **BigNumber** | BN.js | Native | Native BigInt |
| **Performance** | Moderate | Good | Excellent |
| **Wallet Support** | Good | Excellent | Excellent |
| **Best For** | Legacy projects | New projects | Modern TypeScript apps |

### When to Use Which

**Choose Web3.js if:**
- Working with existing Web3.js codebase
- Need specific Web3.js plugins/extensions
- Team is already familiar with Web3.js
- Using web3.js-dependent tools

**Choose Ethers.js if:**
- Starting a new project
- Want smaller bundle size
- Need excellent documentation
- Prefer cleaner, more modern API
- Building production dApps

**Choose Viem if:**
- Using TypeScript exclusively
- Need smallest possible bundle
- Want maximum type safety
- Building modern React apps (with Wagmi)
- Performance is critical

---

## Web3.js

### Installation & Setup (Web3.js)

```bash
# Install Web3.js
npm install web3

# With TypeScript types
npm install web3 @types/web3
```

### Providers & Connection

```javascript
import Web3 from 'web3';

// 1. Browser wallet (MetaMask)
let web3;
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
} else {
    console.error('No wallet detected');
}

// 2. HTTP Provider (Infura, Alchemy)
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_PROJECT_ID');

// 3. WebSocket Provider (for subscriptions)
const web3WS = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/YOUR_ID'));

// 4. IPC Provider (local node)
const web3IPC = new Web3(new Web3.providers.IpcProvider('/path/to/geth.ipc'));

// Check connection
const isListening = await web3.eth.net.isListening();
console.log('Connected:', isListening);

// Get network ID
const networkId = await web3.eth.net.getId();
console.log('Network ID:', networkId); // 1 = Mainnet, 5 = Goerli, 11155111 = Sepolia
```

### Accounts & Wallets

```javascript
// Get accounts (from connected wallet)
const accounts = await web3.eth.getAccounts();
const userAddress = accounts[0];

// Create new account
const newAccount = web3.eth.accounts.create();
console.log('Address:', newAccount.address);
console.log('Private Key:', newAccount.privateKey);

// Import account from private key
const privateKey = '0x...';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// Add to wallet (for signing)
web3.eth.accounts.wallet.add(account);

// Sign message
const message = 'Hello Ethereum!';
const signature = await web3.eth.personal.sign(message, userAddress);

// Recover address from signature
const recoveredAddress = web3.eth.accounts.recover(message, signature);
console.log('Signer:', recoveredAddress);
```

### Reading Blockchain Data

```javascript
// Get balance
const balance = await web3.eth.getBalance(userAddress);
console.log('Balance (Wei):', balance);
console.log('Balance (ETH):', web3.utils.fromWei(balance, 'ether'));

// Get latest block number
const blockNumber = await web3.eth.getBlockNumber();
console.log('Latest block:', blockNumber);

// Get block details
const block = await web3.eth.getBlock(blockNumber);
console.log('Block:', block);

// Get transaction by hash
const tx = await web3.eth.getTransaction('0x...');
console.log('Transaction:', tx);

// Get transaction receipt
const receipt = await web3.eth.getTransactionReceipt('0x...');
console.log('Receipt:', receipt);

// Get gas price
const gasPrice = await web3.eth.getGasPrice();
console.log('Gas Price (Gwei):', web3.utils.fromWei(gasPrice, 'gwei'));

// Get transaction count (nonce)
const nonce = await web3.eth.getTransactionCount(userAddress);
console.log('Nonce:', nonce);

// Get code at address (check if contract)
const code = await web3.eth.getCode('0xContractAddress');
const isContract = code !== '0x';
console.log('Is Contract:', isContract);
```

### Sending Transactions

```javascript
// Send ETH
const txObject = {
    from: userAddress,
    to: '0xRecipientAddress',
    value: web3.utils.toWei('0.1', 'ether'),
    gas: 21000,
    gasPrice: await web3.eth.getGasPrice()
};

// Send transaction (browser wallet will prompt)
const txHash = await web3.eth.sendTransaction(txObject);
console.log('Transaction Hash:', txHash);

// With private key signing
const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
console.log('Receipt:', receipt);

// Wait for transaction confirmation
web3.eth.sendTransaction(txObject)
    .on('transactionHash', (hash) => {
        console.log('TX Hash:', hash);
    })
    .on('receipt', (receipt) => {
        console.log('Confirmed!', receipt);
    })
    .on('error', (error) => {
        console.error('Error:', error);
    });

// Estimate gas
const estimatedGas = await web3.eth.estimateGas({
    from: userAddress,
    to: '0xRecipient',
    value: web3.utils.toWei('1', 'ether')
});
console.log('Estimated Gas:', estimatedGas);
```

### Smart Contract Interaction

```javascript
// Contract ABI (from compiler output)
const contractABI = [
    {
        "inputs": [{"name": "recipient", "type": "address"}, {"name": "amount", "type": "uint256"}],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "name": "from", "type": "address"},
            {"indexed": true, "name": "to", "type": "address"},
            {"indexed": false, "name": "value", "type": "uint256"}
        ],
        "name": "Transfer",
        "type": "event"
    }
];

const contractAddress = '0x...';
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Read data (view/pure functions - no gas)
const balance = await contract.methods.balanceOf(userAddress).call();
console.log('Token Balance:', balance);

// Get with specific block
const balanceAtBlock = await contract.methods.balanceOf(userAddress).call({}, 1000000);

// Write data (state-changing - costs gas)
const receipt = await contract.methods
    .transfer('0xRecipient', web3.utils.toWei('100', 'ether'))
    .send({ from: userAddress });

console.log('Transfer Receipt:', receipt);

// With gas estimation
const gasEstimate = await contract.methods
    .transfer('0xRecipient', web3.utils.toWei('100', 'ether'))
    .estimateGas({ from: userAddress });

await contract.methods
    .transfer('0xRecipient', web3.utils.toWei('100', 'ether'))
    .send({ 
        from: userAddress,
        gas: gasEstimate * 1.2 // Add 20% buffer
    });

// Access contract address and options
console.log('Contract Address:', contract.options.address);

// Deploy new contract
const MyContract = new web3.eth.Contract(contractABI);
const deployedContract = await MyContract
    .deploy({
        data: '0x608060405234801561001057600080fd5b50...', // Bytecode
        arguments: ['Arg1', 'Arg2'] // Constructor arguments
    })
    .send({
        from: userAddress,
        gas: 1500000,
        gasPrice: await web3.eth.getGasPrice()
    });

console.log('Deployed at:', deployedContract.options.address);
```

### Events & Subscriptions

```javascript
// Listen to past events
const events = await contract.getPastEvents('Transfer', {
    filter: { from: userAddress }, // Filter by indexed parameters
    fromBlock: 0,
    toBlock: 'latest'
});

console.log('Past Transfer events:', events);

// Subscribe to new events
contract.events.Transfer({
    filter: { to: userAddress }
})
.on('data', (event) => {
    console.log('New Transfer:', event.returnValues);
})
.on('error', (error) => {
    console.error('Event error:', error);
});

// Subscribe to all events
contract.events.allEvents()
.on('data', (event) => {
    console.log('Event:', event.event, event.returnValues);
});

// New block subscription
const subscription = web3.eth.subscribe('newBlockHeaders');
subscription.on('data', (blockHeader) => {
    console.log('New block:', blockHeader.number);
});

// Pending transactions
web3.eth.subscribe('pendingTransactions')
.on('data', (txHash) => {
    console.log('Pending TX:', txHash);
});

// Unsubscribe
subscription.unsubscribe();
```

### Utility Functions

```javascript
// Unit conversion
const weiAmount = web3.utils.toWei('1.5', 'ether');
const etherAmount = web3.utils.fromWei(weiAmount, 'ether');

// Available units: wei, kwei, mwei, gwei, szabo, finney, ether

// Hex conversion
const hexValue = web3.utils.toHex(255); // '0xff'
const numberValue = web3.utils.hexToNumber('0xff'); // 255

// Address utilities
const checksumAddress = web3.utils.toChecksumAddress('0xabcdef...');
const isValidAddress = web3.utils.isAddress('0x...');

// Hashing
const hash = web3.utils.sha3('Hello World');
const solidityHash = web3.utils.soliditySha3('string', 'address', 'uint256');

// ABI encoding
const encoded = web3.eth.abi.encodeParameters(
    ['uint256', 'string'],
    [123, 'Hello']
);

const decoded = web3.eth.abi.decodeParameters(
    ['uint256', 'string'],
    encoded
);

// Random hex
const randomHex = web3.utils.randomHex(32);

// BN (Big Number) operations
const bn1 = web3.utils.toBN('1000000000000000000');
const bn2 = web3.utils.toBN('500000000000000000');
const sum = bn1.add(bn2);
const product = bn1.mul(bn2);
```

---

## Ethers.js

### Installation & Setup (Ethers.js)

```bash
# Install Ethers.js v6 (latest)
npm install ethers

# Ethers v5 (if needed for compatibility)
npm install ethers@5
```

### Providers (Ethers.js)

```javascript
import { ethers } from 'ethers';

// 1. Browser wallet provider
const provider = new ethers.BrowserProvider(window.ethereum);

// 2. JSON-RPC provider (Infura, Alchemy, QuickNode)
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_ID');

// 3. WebSocket provider
const wsProvider = new ethers.WebSocketProvider('wss://mainnet.infura.io/ws/v3/YOUR_ID');

// 4. Alchemy provider
const alchemyProvider = new ethers.AlchemyProvider('mainnet', 'YOUR_ALCHEMY_KEY');

// 5. Infura provider
const infuraProvider = new ethers.InfuraProvider('mainnet', 'YOUR_INFURA_KEY');

// 6. Default provider (multiple fallbacks)
const defaultProvider = ethers.getDefaultProvider('mainnet');

// Get network info
const network = await provider.getNetwork();
console.log('Network:', network.name, 'Chain ID:', network.chainId);

// Get block number
const blockNumber = await provider.getBlockNumber();
console.log('Latest Block:', blockNumber);

// Get balance
const balance = await provider.getBalance('0x...');
console.log('Balance:', ethers.formatEther(balance), 'ETH');

// Get transaction count
const txCount = await provider.getTransactionCount('0x...');
console.log('Transaction Count:', txCount);
```

### Signers & Wallets

```javascript
// Get signer from browser wallet
const signer = await provider.getSigner();
const address = await signer.getAddress();
console.log('Signer Address:', address);

// Create wallet from private key
const privateKey = '0x...';
const wallet = new ethers.Wallet(privateKey, provider);
console.log('Wallet Address:', wallet.address);

// Create random wallet
const randomWallet = ethers.Wallet.createRandom();
console.log('Address:', randomWallet.address);
console.log('Mnemonic:', randomWallet.mnemonic.phrase);

// Wallet from mnemonic
const mnemonic = 'word word word...';
const walletFromMnemonic = ethers.Wallet.fromPhrase(mnemonic);

// Sign message
const message = 'Hello Ethereum!';
const signature = await signer.signMessage(message);
console.log('Signature:', signature);

// Verify signature
const recoveredAddress = ethers.verifyMessage(message, signature);
console.log('Recovered Address:', recoveredAddress);

// Sign typed data (EIP-712)
const domain = {
    name: 'MyDApp',
    version: '1',
    chainId: 1,
    verifyingContract: '0x...'
};

const types = {
    Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' }
    ]
};

const value = {
    name: 'Alice',
    wallet: '0x...'
};

const signature712 = await signer.signTypedData(domain, types, value);
```

### Contract Interaction (Ethers.js)

```javascript
const contractABI = [/* ... */];
const contractAddress = '0x...';

// Read-only contract
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Read-write contract (with signer)
const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);

// Read data (view/pure functions)
const balance = await contract.balanceOf('0x...');
console.log('Balance:', balance.toString());

// Write data (state-changing)
const tx = await contractWithSigner.transfer('0xRecipient', ethers.parseEther('100'));
console.log('Transaction Hash:', tx.hash);

// Wait for confirmation
const receipt = await tx.wait();
console.log('Transaction mined in block:', receipt.blockNumber);

// Wait for multiple confirmations
const receipt3 = await tx.wait(3); // Wait for 3 confirmations

// Call with overrides
const tx2 = await contractWithSigner.transfer(
    '0xRecipient',
    ethers.parseEther('100'),
    {
        gasLimit: 100000,
        gasPrice: ethers.parseUnits('50', 'gwei'),
        nonce: 42
    }
);

// Estimate gas
const gasEstimate = await contract.transfer.estimateGas('0xRecipient', ethers.parseEther('100'));
console.log('Estimated Gas:', gasEstimate.toString());

// Static call (simulate transaction without sending)
const result = await contract.transfer.staticCall('0xRecipient', ethers.parseEther('100'));

// Deploy contract
const factory = new ethers.ContractFactory(contractABI, bytecode, signer);
const deployedContract = await factory.deploy('Constructor', 'Args');
await deployedContract.waitForDeployment();
console.log('Deployed to:', await deployedContract.getAddress());

// Get contract at address
const newContract = deployedContract.attach('0x...');
```

### Transactions (Ethers.js)

```javascript
// Send ETH
const tx = await signer.sendTransaction({
    to: '0xRecipient',
    value: ethers.parseEther('1.0')
});

console.log('TX Hash:', tx.hash);
const receipt = await tx.wait();
console.log('Confirmed:', receipt);

// Send with gas settings
const tx2 = await signer.sendTransaction({
    to: '0xRecipient',
    value: ethers.parseEther('0.5'),
    gasLimit: 21000,
    maxFeePerGas: ethers.parseUnits('100', 'gwei'),
    maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei') // EIP-1559
});

// Get transaction
const transaction = await provider.getTransaction('0x...');
console.log('Transaction:', transaction);

// Get receipt
const txReceipt = await provider.getTransactionReceipt('0x...');
console.log('Receipt:', txReceipt);

// Get fee data (EIP-1559)
const feeData = await provider.getFeeData();
console.log('Max Fee:', ethers.formatUnits(feeData.maxFeePerGas, 'gwei'), 'Gwei');
console.log('Priority Fee:', ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei'), 'Gwei');
```

### Event Filtering

```javascript
// Query past events
const filter = contract.filters.Transfer(userAddress, null);
const events = await contract.queryFilter(filter, 0, 'latest');

events.forEach(event => {
    console.log('From:', event.args.from);
    console.log('To:', event.args.to);
    console.log('Amount:', ethers.formatEther(event.args.value));
});

// Listen to events
contract.on('Transfer', (from, to, amount, event) => {
    console.log(`Transfer: ${from} -> ${to}: ${ethers.formatEther(amount)} tokens`);
});

// Listen once
contract.once('Transfer', (from, to, amount) => {
    console.log('First transfer detected');
});

// Remove listener
const listener = (from, to, amount) => {
    console.log('Transfer event');
};
contract.on('Transfer', listener);
contract.off('Transfer', listener);

// Remove all listeners
contract.removeAllListeners('Transfer');

// Listen to new blocks
provider.on('block', (blockNumber) => {
    console.log('New block:', blockNumber);
});

// Listen to pending transactions
provider.on('pending', (txHash) => {
    console.log('Pending TX:', txHash);
});
```

### ENS Integration

```javascript
// Resolve ENS name to address
const address = await provider.resolveName('vitalik.eth');
console.log('Address:', address);

// Reverse lookup (address to ENS)
const ensName = await provider.lookupAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
console.log('ENS Name:', ensName);

// Get ENS resolver
const resolver = await provider.getResolver('vitalik.eth');
const avatar = await resolver.getAvatar();
const email = await resolver.getText('email');

console.log('Avatar:', avatar);
```

---
console.log('Avatar:', avatar);
```

---

## Viem (Modern Alternative)

Viem is the newest, most performant Ethereum library with first-class TypeScript support.

```typescript
import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { mainnet } from 'viem/chains'

// Public client (read-only)
const publicClient = createPublicClient({
    chain: mainnet,
    transport: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY')
})

// Wallet client (for signing)
const walletClient = createWalletClient({
    chain: mainnet,
    transport: custom(window.ethereum)
})

// Get balance
const balance = await publicClient.getBalance({ 
    address: '0x...' 
})

// Get block
const block = await publicClient.getBlock()

// Read contract
const data = await publicClient.readContract({
    address: '0x...',
    abi: contractABI,
    functionName: 'balanceOf',
    args: ['0x...']
})

// Write contract
const { request } = await publicClient.simulateContract({
    address: '0x...',
    abi: contractABI,
    functionName: 'transfer',
    args: ['0xRecipient', 1000n],
    account: '0x...'
})

const hash = await walletClient.writeContract(request)

// Watch events
const unwatch = publicClient.watchEvent({
    address: '0x...',
    event: transferEvent,
    onLogs: logs => console.log(logs)
})
```

**Viem Benefits:**
- **Type-safe**: Full TypeScript inference
- **Small**: 30KB vs 100KB (ethers) vs 600KB (web3.js)
- **Fast**: Optimized performance
- **Modern**: Uses native BigInt
- **Modular**: Tree-shakeable imports

---

## Wallet Integration

### MetaMask Connection

```javascript
// Detect MetaMask
const hasMetaMask = typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;

if (!hasMetaMask) {
    alert('Please install MetaMask: https://metamask.io');
    return;
}

// Request account access
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        const userAddress = accounts[0];
        console.log('Connected:', userAddress);
        
        // Get chainId
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log('Chain ID:', chainId);
        
        return userAddress;
    } catch (error) {
        if (error.code === 4001) {
            console.log('User rejected connection');
        } else {
            console.error('Error connecting:', error);
        }
    }
}

// Listen to account changes
window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
        console.log('Wallet disconnected');
    } else {
        console.log('Account changed to:', accounts[0]);
        // Update UI
    }
});

// Listen to network changes
window.ethereum.on('chainChanged', (chainId) => {
    console.log('Network changed to:', chainId);
    window.location.reload(); // Recommended by MetaMask
});

// Switch network
async function switchToMainnet() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }], // 0x1 = Mainnet
        });
    } catch (error) {
        if (error.code === 4902) {
            console.log('Network not added to MetaMask');
            await addNetwork();
        }
    }
}

// Add custom network
async function addNetwork() {
    await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: '0xA4B1', // Arbitrum One
            chainName: 'Arbitrum One',
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: ['https://arb1.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://arbiscan.io']
        }]
    });
}

// Add token to MetaMask
async function addTokenToWallet(tokenAddress, symbol, decimals, image) {
    await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
            type: 'ERC20',
            options: {
                address: tokenAddress,
                symbol: symbol,
                decimals: decimals,
                image: image
            }
        }
    });
}
```

### WalletConnect

```bash
npm install @web3modal/ethers ethers
```

```javascript
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID'

// 2. Set chains
const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
    name: 'My DApp',
    description: 'My DApp Description',
    url: 'https://myapp.com',
    icons: ['https://myapp.com/icon.png']
}

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId
})

// 4. Use modal
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'

function App() {
    const { open } = useWeb3Modal()
    const { address, isConnected } = useWeb3ModalAccount()

    return (
        <div>
            <button onClick={() => open()}>
                {isConnected ? address : 'Connect Wallet'}
            </button>
        </div>
    )
}
```

### Multi-Wallet Support (RainbowKit)

```bash
npm install @rainbow-me/rainbowkit wagmi viem
```

```javascript
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, coinbaseWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [publicProvider()]
);

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            metaMaskWallet({ projectId, chains }),
            coinbaseWallet({ appName: 'My DApp', chains }),
            walletConnectWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
});

function App() {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <YourApp />
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
```

---

## Real-World Use Cases

### 1. Token Balance Checker

```javascript
// Using Ethers.js
import { ethers } from 'ethers';

const ERC20_ABI = [
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)'
];

async function getTokenBalance(walletAddress, tokenAddress) {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    
    const [balance, decimals, symbol] = await Promise.all([
        contract.balanceOf(walletAddress),
        contract.decimals(),
        contract.symbol()
    ]);
    
    const formatted = ethers.formatUnits(balance, decimals);
    return `${formatted} ${symbol}`;
}

// Usage
const balance = await getTokenBalance('0x...', '0xUSDC_ADDRESS');
console.log('USDC Balance:', balance);
```

### 2. NFT Metadata Fetcher

```javascript
const NFT_ABI = [
    'function tokenURI(uint256 tokenId) view returns (string)'
];

async function getNFTMetadata(nftAddress, tokenId) {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(nftAddress, NFT_ABI, provider);
    
    const tokenURI = await contract.tokenURI(tokenId);
    
    // Fetch metadata JSON from IPFS or HTTP
    const response = await fetch(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'));
    const metadata = await response.json();
    
    return {
        name: metadata.name,
        description: metadata.description,
        image: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
        attributes: metadata.attributes
    };
}
```

### 3. DEX Token Swap UI

```javascript
// Uniswap V3 Router interaction
const ROUTER_ABI = [
    'function exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160)) returns (uint256)'
];

async function swapTokens(tokenIn, tokenOut, amountIn, minAmountOut) {
    const signer = await provider.getSigner();
    const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);
    
    // Approve token spending first
    const tokenContract = new ethers.Contract(tokenIn, ERC20_ABI, signer);
    const approveTx = await tokenContract.approve(ROUTER_ADDRESS, amountIn);
    await approveTx.wait();
    
    // Execute swap
    const params = {
        tokenIn,
        tokenOut,
        fee: 3000, // 0.3% pool
        recipient: await signer.getAddress(),
        deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes
        amountIn,
        amountOutMinimum: minAmountOut,
        sqrtPriceLimitX96: 0
    };
    
    const tx = await router.exactInputSingle(params);
    const receipt = await tx.wait();
    
    return receipt;
}
```

### 4. Gasless Transactions (Meta-Transactions)

```javascript
// Sign transaction off-chain, relay executes on-chain
import { ethers } from 'ethers';

async function signMetaTransaction(contractAddress, functionData, nonce) {
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    
    // EIP-712 domain
    const domain = {
        name: 'MyContract',
        version: '1',
        chainId: await signer.getChainId(),
        verifyingContract: contractAddress
    };
    
    const types = {
        MetaTransaction: [
            { name: 'nonce', type: 'uint256' },
            { name: 'from', type: 'address' },
            { name: 'functionData', type: 'bytes' }
        ]
    };
    
    const value = {
        nonce,
        from: userAddress,
        functionData
    };
    
    const signature = await signer.signTypedData(domain, types, value);
    
    // Send to relayer (who pays gas)
    await fetch('/api/relay', {
        method: 'POST',
        body: JSON.stringify({ domain, types, value, signature })
    });
}
```

### 5. Real-Time Price Oracle

```javascript
// Chainlink Price Feed integration
const PRICE_FEED_ABI = [
    'function latestRoundData() view returns (uint80,int256,uint256,uint256,uint80)'
];

async function getETHPrice() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const priceFeed = new ethers.Contract(
        '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH/USD on Mainnet
        PRICE_FEED_ABI,
        provider
    );
    
    const [, price, , updatedAt] = await priceFeed.latestRoundData();
    
    // Price has 8 decimals
    const formattedPrice = Number(price) / 1e8;
    const lastUpdate = new Date(Number(updatedAt) * 1000);
    
    return {
        price: formattedPrice,
        lastUpdate
    };
}

// Subscribe to price updates
priceFeed.on('AnswerUpdated', (current, roundId, timestamp) => {
    console.log('New ETH price:', Number(current) / 1e8);
});
```

---

## Best Practices

### 1. Error Handling

```javascript
async function safeContractCall() {
    try {
        const tx = await contract.someFunction();
        const receipt = await tx.wait();
        return receipt;
    } catch (error) {
        // User rejected transaction
        if (error.code === 'ACTION_REJECTED') {
            console.log('User cancelled transaction');
            return null;
        }
        
        // Insufficient funds
        if (error.code === 'INSUFFICIENT_FUNDS') {
            alert('Insufficient funds for transaction + gas');
            return null;
        }
        
        // Transaction reverted (custom error)
        if (error.data) {
            const decodedError = contract.interface.parseError(error.data);
            console.error('Contract error:', decodedError);
        }
        
        // Network error
        if (error.code === 'NETWORK_ERROR') {
            console.error('Network connection issue');
        }
        
        throw error;
    }
}
```

### 2. BigNumber Handling

```javascript
// WRONG: JavaScript numbers lose precision
const amount = 1000000000000000000; // Will lose precision!

// CORRECT: Use BigInt or library BigNumber
const amount = ethers.parseEther('1.0'); // Returns BigInt
const wei = ethers.parseUnits('100', 'gwei');

// Convert back to readable format
const readable = ethers.formatEther(amount); // '1.0'

// Math with BigNumbers
const total = amount + ethers.parseEther('0.5'); // 1.5 ETH
const doubled = amount * 2n; // Must use 2n for BigInt

// Comparison
if (balance >= amount) {
    console.log('Sufficient balance');
}
```

### 3. Gas Optimization

```javascript
// Estimate gas before sending
const gasEstimate = await contract.transfer.estimateGas(recipient, amount);

// Add buffer (10-20%)
const gasLimit = gasEstimate * 120n / 100n;

// Use EIP-1559 for better UX
const feeData = await provider.getFeeData();
const tx = await contract.transfer(recipient, amount, {
    maxFeePerGas: feeData.maxFeePerGas,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    gasLimit
});
```

### 4. Network Detection

```javascript
const CHAIN_IDS = {
    MAINNET: 1,
    GOERLI: 5,
    SEPOLIA: 11155111,
    POLYGON: 137,
    ARBITRUM: 42161,
    OPTIMISM: 10
};

async function ensureCorrectNetwork(requiredChainId) {
    const network = await provider.getNetwork();
    
    if (network.chainId !== requiredChainId) {
        // Request network switch
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${requiredChainId.toString(16)}` }]
            });
        } catch (error) {
            if (error.code === 4902) {
                alert('Please add this network to your wallet');
            }
            throw error;
        }
    }
}
```

### 5. State Management (React)

```javascript
import { create } from 'zustand';

// Zustand store for Web3 state
const useWeb3Store = create((set) => ({
    provider: null,
    signer: null,
    address: null,
    chainId: null,
    isConnected: false,
    
    connect: async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        
        set({
            provider,
            signer,
            address,
            chainId: Number(network.chainId),
            isConnected: true
        });
    },
    
    disconnect: () => {
        set({
            provider: null,
            signer: null,
            address: null,
            chainId: null,
            isConnected: false
        });
    }
}));

// In component
function MyComponent() {
    const { address, connect, isConnected } = useWeb3Store();
    
    return (
        <button onClick={connect}>
            {isConnected ? address : 'Connect Wallet'}
        </button>
    );
}
```

---

## Migration Guides

### Web3.js v1 to v4

```javascript
// v1 (old)
const web3 = new Web3(Web3.givenProvider);
const accounts = await web3.eth.getAccounts();

// v4 (new)
const web3 = new Web3(window.ethereum);
const accounts = await web3.eth.getAccounts();

// Contract events
// v1
myContract.events.Transfer({}, (error, event) => { /* ... */ });

// v4 (similar, but improved typing)
myContract.events.Transfer()
    .on('data', event => console.log(event))
    .on('error', error => console.error(error));
```

### Ethers.js v5 to v6

```javascript
// v5
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const balance = await provider.getBalance(address);
const formatted = ethers.utils.formatEther(balance);

// v6
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const balance = await provider.getBalance(address);
const formatted = ethers.formatEther(balance);

// BigNumber changes
// v5: Uses ethers.BigNumber
// v6: Uses native BigInt

// v5
const bn = ethers.BigNumber.from('1000000000000000000');

// v6
const bn = 1000000000000000000n; // Native BigInt
```

---

## Performance Optimization

### 1. Batch Requests

```javascript
// Instead of multiple calls
const balance1 = await provider.getBalance(addr1);
const balance2 = await provider.getBalance(addr2);
const balance3 = await provider.getBalance(addr3);

// Batch them
const [balance1, balance2, balance3] = await Promise.all([
    provider.getBalance(addr1),
    provider.getBalance(addr2),
    provider.getBalance(addr3)
]);
```

### 2. Multicall Pattern

```javascript
// Multicall3 contract (deployed on most networks)
const MULTICALL_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';

const multicall = new ethers.Contract(MULTICALL_ADDRESS, MULTICALL_ABI, provider);

const calls = [
    { target: tokenAddress, callData: iface.encodeFunctionData('balanceOf', [addr1]) },
    { target: tokenAddress, callData: iface.encodeFunctionData('balanceOf', [addr2]) },
    { target: tokenAddress, callData: iface.encodeFunctionData('balanceOf', [addr3]) }
];

const results = await multicall.aggregate3(calls);
// Process results
```

### 3. Caching

```javascript
const cache = new Map();

async function getCachedBalance(address) {
    const key = `balance_${address}`;
    
    if (cache.has(key)) {
        const { value, timestamp } = cache.get(key);
        // Cache valid for 10 seconds
        if (Date.now() - timestamp < 10000) {
            return value;
        }
    }
    
    const balance = await provider.getBalance(address);
    cache.set(key, { value: balance, timestamp: Date.now() });
    
    return balance;
}
```

---

## Testing

### Testing with Hardhat

```javascript
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('MyContract', function () {
    let contract, owner, addr1;
    
    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        
        const MyContract = await ethers.getContractFactory('MyContract');
        contract = await MyContract.deploy();
        await contract.waitForDeployment();
    });
    
    it('Should transfer tokens', async function () {
        await contract.transfer(addr1.address, 100);
        expect(await contract.balanceOf(addr1.address)).to.equal(100);
    });
    
    it('Should emit Transfer event', async function () {
        await expect(contract.transfer(addr1.address, 100))
            .to.emit(contract, 'Transfer')
            .withArgs(owner.address, addr1.address, 100);
    });
});
```

### Testing with Frontend (wagmi)

```javascript
import { renderHook, waitFor } from '@testing-library/react';
import { useAccount, useBalance } from 'wagmi';

test('should connect wallet', async () => {
    const { result } = renderHook(() => useAccount());
    
    await waitFor(() => {
        expect(result.current.isConnected).toBe(true);
    });
});
```

---

## Resources

### Official Documentation
- **Web3.js**: <https://web3js.readthedocs.io/>
- **Ethers.js**: <https://docs.ethers.org/>
- **Viem**: <https://viem.sh/>
- **Wagmi**: <https://wagmi.sh/>

### Tools & Libraries
- **RainbowKit**: <https://www.rainbowkit.com/> - Beautiful wallet connection UI
- **Web3Modal**: <https://web3modal.com/> - Multi-wallet connection modal
- **ConnectKit**: <https://docs.family.co/connectkit> - Wallet connection for families
- **Multicall**: <https://github.com/mds1/multicall> - Batch contract calls

### Node Providers
- **Infura**: <https://infura.io/>
- **Alchemy**: <https://www.alchemy.com/>
- **QuickNode**: <https://www.quicknode.com/>
- **Ankr**: <https://www.ankr.com/>
- **Chainstack**: <https://chainstack.com/>

### Learning Resources
- **useWeb3**: <https://www.useweb3.xyz/> - Curated Web3 resources
- **LearnWeb3 DAO**: <https://learnweb3.io/>
- **Ethereum Developer Resources**: <https://ethereum.org/en/developers/>
- **Scaffold-ETH**: <https://github.com/scaffold-eth/scaffold-eth-2>

### Community
- **Ethereum Stack Exchange**: <https://ethereum.stackexchange.com/>
- **/r/ethdev**: <https://reddit.com/r/ethdev>
- **Ethers.js Discord**: Community support
- **Web3.js Gitter**: Real-time chat

---

## Summary

Web3 JavaScript libraries are essential for building decentralized applications.

**Web3.js:**
✅ Largest community and ecosystem  
✅ Most comprehensive documentation  
✅ Wide plugin support  
⚠️ Larger bundle size  

**Ethers.js:**
✅ Smaller and faster  
✅ Excellent documentation  
✅ Modern, clean API  
✅ Better for new projects  

**Viem:**
✅ Smallest bundle (30KB)  
✅ TypeScript-first  
✅ Best performance  
✅ Future of Web3 libraries  

**Choose based on your needs:** Legacy support (Web3.js), balanced approach (Ethers.js), or cutting-edge TypeScript (Viem).


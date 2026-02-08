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

---

## Bitcoin Core Implementation

### Running a Bitcoin Core Node

#### Installation

```bash
# Ubuntu/Debian
sudo add-apt-repository ppa:bitcoin/bitcoin
sudo apt-get update
sudo apt-get install bitcoind bitcoin-qt

# macOS
brew install bitcoin

# From source
git clone https://github.com/bitcoin/bitcoin.git
cd bitcoin
./autogen.sh
./configure
make
sudo make install
```

#### Configuration

Create `~/.bitcoin/bitcoin.conf`:

```ini
# Network settings
testnet=1  # Use testnet (0 for mainnet)
server=1
daemon=1

# RPC settings
rpcuser=yourusername
rpcpassword=yourpassword
rpcallowip=127.0.0.1

# Connection settings
maxconnections=125
listen=1

# Wallet settings
disablewallet=0

# Pruning (to save disk space)
prune=550  # Keep only 550MB of block data
```

#### Starting the Node

```bash
# Start bitcoind
bitcoind -daemon

# Check status
bitcoin-cli getblockchaininfo

# Stop bitcoind
bitcoin-cli stop
```

### Bitcoin Core RPC Commands

#### Blockchain Information

```bash
# Get blockchain info
bitcoin-cli getblockchaininfo

# Get block count
bitcoin-cli getblockcount

# Get block hash
bitcoin-cli getblockhash 700000

# Get block data
bitcoin-cli getblock <blockhash>

# Get transaction
bitcoin-cli getrawtransaction <txid> true

# Get memory pool info
bitcoin-cli getmempoolinfo
```

#### Wallet Operations

```bash
# Create new wallet
bitcoin-cli createwallet "mywallet"

# List wallets
bitcoin-cli listwallets

# Get new address
bitcoin-cli getnewaddress

# Get balance
bitcoin-cli getbalance

# List unspent outputs
bitcoin-cli listunspent

# Send transaction
bitcoin-cli sendtoaddress "bc1qaddress..." 0.001

# Get transaction details
bitcoin-cli gettransaction <txid>

# Create raw transaction
bitcoin-cli createrawtransaction '[{"txid":"...","vout":0}]' '{"address":0.001}'

# Sign raw transaction
bitcoin-cli signrawtransactionwithwallet <hex>

# Send raw transaction
bitcoin-cli sendrawtransaction <signed_hex>
```

### Programming with Bitcoin

#### Using BitcoinJS (JavaScript)

```bash
npm install bitcoinjs-lib
```

```javascript
const bitcoin = require('bitcoinjs-lib');
const ECPair = require('ecpair').ECPairFactory(require('tiny-secp256k1'));

// Generate a random key pair
const keyPair = ECPair.makeRandom();
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

console.log('Address:', address);
console.log('Private Key:', keyPair.toWIF());

// Create a transaction
const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet });

psbt.addInput({
  hash: 'previous_tx_hash',
  index: 0,
  witnessUtxo: {
    script: Buffer.from('scriptPubKey', 'hex'),
    value: 100000, // satoshis
  },
});

psbt.addOutput({
  address: 'recipient_address',
  value: 90000, // Amount to send
});

// Sign and finalize
psbt.signInput(0, keyPair);
psbt.finalizeAllInputs();

const txHex = psbt.extractTransaction().toHex();
console.log('Transaction hex:', txHex);
```

#### Using python-bitcoinlib (Python)

```bash
pip install python-bitcoinlib
```

```python
import bitcoin.rpc

# Connect to Bitcoin Core RPC
proxy = bitcoin.rpc.Proxy()

# Get blockchain info
info = proxy.getblockchaininfo()
print(f"Chain: {info['chain']}")
print(f"Blocks: {info['blocks']}")

# Get block hash
block_hash = proxy.getblockhash(700000)
print(f"Block hash: {block_hash}")

# Get block
block = proxy.getblock(block_hash)
print(f"Transactions in block: {len(block.vtx)}")

# Create and send transaction
from bitcoin.core import *
from bitcoin.wallet import *

# Create a private key
secret = CBitcoinSecret('YOUR_PRIVATE_KEY_WIF')

# Create transaction input
txin = CMutableTxIn(COutPoint(lx('PREV_TX_HASH'), 0))

# Create transaction output
dest_addr = CBitcoinAddress('DESTINATION_ADDRESS')
txout = CMutableTxOut(0.001 * COIN, dest_addr.to_scriptPubKey())

# Create transaction
tx = CMutableTransaction([txin], [txout])

# Sign transaction
sig_hash = SignatureHash(script, tx, 0, SIGHASH_ALL)
sig = secret.sign(sig_hash) + bytes([SIGHASH_ALL])

# Send transaction
proxy.sendrawtransaction(tx)
```

---

## Advanced Bitcoin Concepts

### Segregated Witness (SegWit)

SegWit separates signature data from transaction data, reducing transaction size and enabling second-layer solutions.

**Benefits:**
- Smaller transaction size
- Fixes transaction malleability
- Enables Lightning Network
- Lower fees

**Address Types:**
- P2WPKH: Native SegWit (bc1q...)
- P2SH-P2WPKH: Wrapped SegWit (3...)

```javascript
// Create native SegWit address
const { address } = bitcoin.payments.p2wpkh({
  pubkey: keyPair.publicKey,
  network: bitcoin.networks.bitcoin
});
console.log('Native SegWit:', address); // bc1q...
```

### Taproot (BIP 340, 341, 342)

Taproot improves privacy, efficiency, and flexibility of Bitcoin scripts.

**Key Features:**
- Schnorr signatures
- MAST (Merklized Alternative Script Tree)
- Better privacy (complex scripts look like simple payments)
- Batch verification

**Address Format:** bc1p... (P2TR)

```javascript
// Create Taproot address
const { address } = bitcoin.payments.p2tr({
  internalPubkey: keyPair.publicKey.slice(1, 33),
  network: bitcoin.networks.bitcoin
});
console.log('Taproot address:', address); // bc1p...
```

### Multi-Signature Wallets

```javascript
const pubkeys = [
  Buffer.from(publicKey1, 'hex'),
  Buffer.from(publicKey2, 'hex'),
  Buffer.from(publicKey3, 'hex'),
];

// 2-of-3 multisig
const { address } = bitcoin.payments.p2sh({
  redeem: bitcoin.payments.p2ms({ m: 2, pubkeys }),
  network: bitcoin.networks.bitcoin
});

console.log('Multisig address:', address);
```

### Time-Locked Transactions

```javascript
// Create time-locked transaction (nLockTime)
const tx = new bitcoin.Transaction();
tx.locktime = 700000; // Block height
// or
tx.locktime = Math.floor(Date.now() / 1000) + 3600; // Unix timestamp (1 hour)

// Add inputs and outputs...
```

---

## Lightning Network Development

### Lightning Network Daemon (LND)

#### Installation

```bash
# Download latest release
wget https://github.com/lightningnetwork/lnd/releases/download/v0.17.0/lnd-linux-amd64-v0.17.0.tar.gz
tar -xzf lnd-linux-amd64-v0.17.0.tar.gz
sudo install -m 0755 -o root -g root -t /usr/local/bin lnd-linux-amd64-v0.17.0/*
```

#### Configuration

Create `~/.lnd/lnd.conf`:

```ini
[Application Options]
alias=MyLightningNode
color=#68F442
debuglevel=info

[Bitcoin]
bitcoin.active=1
bitcoin.testnet=1
bitcoin.node=bitcoind

[Bitcoind]
bitcoind.rpcuser=yourusername
bitcoind.rpcpass=yourpassword
bitcoind.zmqpubrawblock=tcp://127.0.0.1:28332
bitcoind.zmqpubrawtx=tcp://127.0.0.1:28333
```

#### Running LND

```bash
# Start LND
lnd

# Create wallet
lncli create

# Unlock wallet
lncli unlock

# Get node info
lncli getinfo

# Generate address
lncli newaddress p2wkh

# Open channel
lncli openchannel --node_key=NODE_PUBKEY --local_amt=100000

# Send payment
lncli sendpayment --pay_req=LIGHTNING_INVOICE

# Create invoice
lncli addinvoice --amt=1000 --memo="Payment for services"
```

### Lightning Network Applications

#### Building a Lightning App

```javascript
// Using ln-service (Node.js)
const lnService = require('ln-service');

const { lnd } = lnService.authenticatedLndGrpc({
  cert: 'BASE64_ENCODED_CERT',
  macaroon: 'BASE64_ENCODED_MACAROON',
  socket: '127.0.0.1:10009',
});

// Create invoice
const createInvoice = async () => {
  const invoice = await lnService.createInvoice({
    lnd,
    tokens: 1000,
    description: 'Payment for pizza',
  });
  
  console.log('Payment request:', invoice.request);
  console.log('Payment hash:', invoice.id);
  return invoice;
};

// Pay invoice
const payInvoice = async (request) => {
  const payment = await lnService.pay({
    lnd,
    request,
  });
  
  console.log('Payment preimage:', payment.secret);
  console.log('Fee paid:', payment.fee);
};

// Subscribe to invoices
const sub = lnService.subscribeToInvoices({ lnd });

sub.on('invoice_updated', (invoice) => {
  if (invoice.is_confirmed) {
    console.log('Payment received:', invoice.tokens);
  }
});
```

---

## Bitcoin Development Patterns

### HD Wallets (BIP 32, 39, 44)

```javascript
const bip39 = require('bip39');
const bip32 = require('bip32');

// Generate mnemonic
const mnemonic = bip39.generateMnemonic();
console.log('Mnemonic:', mnemonic);

// Generate seed
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Create HD wallet
const root = bip32.fromSeed(seed);

// Derive addresses (BIP 44 path: m/44'/0'/0'/0/0)
const path = "m/44'/0'/0'/0/0";
const child = root.derivePath(path);

const { address } = bitcoin.payments.p2wpkh({
  pubkey: child.publicKey,
  network: bitcoin.networks.bitcoin
});

console.log('Address:', address);
console.log('Private key:', child.toWIF());
```

### Payment Channels

```javascript
// Simplified payment channel concept
class PaymentChannel {
  constructor(alice, bob, capacity) {
    this.alice = alice;
    this.bob = bob;
    this.capacity = capacity;
    this.aliceBalance = capacity;
    this.bobBalance = 0;
  }

  // Alice pays Bob
  pay(amount) {
    if (this.aliceBalance >= amount) {
      this.aliceBalance -= amount;
      this.bobBalance += amount;
      
      // Create new channel state (off-chain)
      const channelState = {
        alice: this.aliceBalance,
        bob: this.bobBalance,
        nonce: Date.now()
      };
      
      // Both parties sign the state
      return channelState;
    }
    throw new Error('Insufficient balance');
  }

  // Close channel and settle on-chain
  close() {
    // Create closing transaction
    const closingTx = {
      outputs: [
        { address: this.alice, amount: this.aliceBalance },
        { address: this.bob, amount: this.bobBalance }
      ]
    };
    
    // Broadcast to blockchain
    return closingTx;
  }
}
```

### Atomic Swaps

```javascript
// HTLC (Hash Time Locked Contract) for atomic swaps
class HTLC {
  constructor(sender, receiver, hashlock, timelock, amount) {
    this.sender = sender;
    this.receiver = receiver;
    this.hashlock = hashlock; // SHA256 hash of secret
    this.timelock = timelock; // Block height or timestamp
    this.amount = amount;
    this.claimed = false;
  }

  // Receiver claims with secret
  claim(secret) {
    const hash = crypto.createHash('sha256').update(secret).digest('hex');
    
    if (hash === this.hashlock && !this.claimed) {
      this.claimed = true;
      // Transfer amount to receiver
      return true;
    }
    return false;
  }

  // Sender refunds after timelock
  refund(currentTime) {
    if (currentTime > this.timelock && !this.claimed) {
      // Return amount to sender
      return true;
    }
    return false;
  }
}
```

---

## Real-World Use Cases

### Case Study 1: El Salvador Bitcoin Adoption

**Implementation:**
- Chivo Wallet (Lightning-enabled)
- Bitcoin ATMs nationwide
- Merchant adoption incentives
- Government bonds (Bitcoin Bonds)

**Technical Stack:**
- Lightning Network for instant payments
- Bitcoin Core nodes
- Mobile wallets
- POS integration

**Results:**
- Reduced remittance costs
- Financial inclusion
- Tourism increase

### Case Study 2: Strike Payment App

**Features:**
- Instant Bitcoin payments
- Fiat to Bitcoin conversion
- Lightning Network integration
- Low fees (<1%)

**Architecture:**
- Lightning Network backend
- Real-time exchange rates
- KYC/AML compliance
- Multi-currency support

### Case Study 3: BTCPay Server

**Implementation:**
- Self-hosted payment processor
- No middleman fees
- Complete privacy
- Open source

```bash
# Install BTCPay Server
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_LIGHTNING="lnd"
./btcpay-setup.sh -i
```

**Use Cases:**
- E-commerce stores
- Donations
- Crowdfunding
- Subscription services

---

## Security Best Practices

### Private Key Management

```javascript
// NEVER store private keys in plain text
// Use environment variables or hardware wallets

// Good practice - use HD wallets
const mnemonic = bip39.generateMnemonic();
// Store mnemonic securely (encrypted, offline)

// Derive keys as needed
const seed = bip39.mnemonicToSeedSync(mnemonic, 'passphrase');
const root = bip32.fromSeed(seed);
```

### Transaction Verification

```javascript
// Always verify transactions before signing
function verifyTransaction(tx, expectedRecipient, expectedAmount) {
  const output = tx.outs.find(o => {
    const addr = bitcoin.address.fromOutputScript(o.script);
    return addr === expectedRecipient;
  });
  
  if (!output || output.value !== expectedAmount) {
    throw new Error('Transaction verification failed');
  }
  
  return true;
}
```

### Multi-Signature Security

```javascript
// 2-of-3 multisig for enhanced security
// Requires 2 signatures out of 3 keys
// Store keys in different locations:
// - Hardware wallet
// - Encrypted USB
// - Secure cloud backup
```

---

## Bitcoin Testing

### Testnet Development

```bash
# Run Bitcoin Core in testnet mode
bitcoind -testnet

# Get testnet coins from faucet
# https://testnet-faucet.mempool.co/

# Create testnet transaction
bitcoin-cli -testnet getnewaddress
bitcoin-cli -testnet sendtoaddress "tb1q..." 0.001
```

### Regtest (Local Testing)

```bash
# Start regtest node
bitcoind -regtest -daemon

# Generate blocks
bitcoin-cli -regtest generatetoaddress 101 $(bitcoin-cli -regtest getnewaddress)

# Mine blocks instantly for testing
bitcoin-cli -regtest generate 1
```

### Unit Testing Bitcoin Apps

```javascript
// Using Jest for Bitcoin app testing
describe('Bitcoin Wallet', () => {
  test('generates valid address', () => {
    const wallet = new BitcoinWallet();
    const address = wallet.generateAddress();
    
    expect(address).toMatch(/^(bc1|tb1|m|n|2)/);
  });

  test('creates valid transaction', () => {
    const tx = wallet.createTransaction({
      to: 'bc1qaddress...',
      amount: 0.001
    });
    
    expect(tx.outputs.length).toBeGreaterThan(0);
    expect(tx.inputs.length).toBeGreaterThan(0);
  });
});
```

---

## Future of Bitcoin Development

### Upcoming Improvements

**Taproot Assets:**
- Issue assets on Bitcoin
- Better privacy
- Efficient transfers

**RGB Protocol:**
- Smart contracts on Bitcoin
- Client-side validation
- Scalable token issuance

**Lightning Network v2:**
- Dual-funded channels
- Splicing
- Better routing

**Schnorr Signatures:**
- Batch verification
- Key aggregation
- Multi-signature efficiency

### Emerging Standards

**BIP 119 (CHECKTEMPLATEVERIFY):**
- Covenant opcode
- Vaults and congestion control

**BIP 118 (SIGHASH_ANYPREVOUT):**
- Enables eltoo Lightning channels
- Better channel management

---

## Additional Resources

### Development Tools
- [Bitcoin Core](https://bitcoincore.org/)
- [BTCPay Server](https://btcpayserver.org/)
- [Electrum](https://electrum.org/)
- [Bitcoin Dev Kit (BDK)](https://bitcoindevkit.org/)

### Learning Resources
- [Learn me a Bitcoin](https://learnmeabitcoin.com/)
- [Bitcoin Optech](https://bitcoinops.org/)
- [Programming Bitcoin book](https://programmingbitcoin.com/)
- [Bitcoin Stack Exchange](https://bitcoin.stackexchange.com/)

### Libraries & SDKs
- **JavaScript:** bitcoinjs-lib, bcoin
- **Python:** python-bitcoinlib, bit
- **Rust:** rust-bitcoin, bdk
- **Go:** btcd, btcsuite

### Community
- [Bitcoin Developer Mailing List](https://lists.linuxfoundation.org/mailman/listinfo/bitcoin-dev)
- [Bitcoin Core GitHub](https://github.com/bitcoin/bitcoin)
- [Lightning Network Specifications](https://github.com/lightning/bolts)

---

**This comprehensive guide covers Bitcoin development from running a node to building Lightning Network applications. Continue exploring, building, and contributing to the Bitcoin ecosystem!** ⚡₿

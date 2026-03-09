# Solana & Anchor Framework - Complete Development Guide

## Table of Contents
- [Introduction](#introduction)
- [Solana vs Ethereum](#solana-vs-ethereum)
- [Core Concepts](#core-concepts)
- [Development Environment Setup](#development-environment-setup)
- [Solana CLI](#solana-cli)
- [Anchor Framework](#anchor-framework)
  - [What is Anchor](#what-is-anchor)
  - [Project Structure](#project-structure)
  - [Writing Programs](#writing-programs)
  - [Testing](#testing)
  - [Deployment](#deployment)
- [Solana Web3.js](#solana-web3js)
- [Token Programs (SPL)](#token-programs-spl)
- [NFTs on Solana](#nfts-on-solana)
- [Real-World dApp Examples](#real-world-dapp-examples)
- [Best Practices](#best-practices)
- [Security Considerations](#security-considerations)
- [Performance Optimization](#performance-optimization)
- [Resources](#resources)

---

## Introduction

**Solana** is a high-performance blockchain designed for decentralized applications (dApps) and crypto-currencies. It achieves:
- **65,000+ transactions per second (TPS)** vs Ethereum's 15-30 TPS
- **Sub-second block times** (400ms)
- **Low transaction costs** ($0.00025 per transaction)
- **Proof of History (PoH)** consensus mechanism combined with Proof of Stake (PoS)

Solana is ideal for high-frequency applications like DEXs (Serum, Jupiter), NFT marketplaces (Magic Eden), and gaming.

---

## Solana vs Ethereum

| Feature | Solana | Ethereum |
|---------|--------|----------|
| **Consensus** | Proof of History + PoS | Proof of Stake (after merge) |
| **TPS** | 65,000+ | 15-30 (Layer 1) |
| **Block Time** | 400ms | 12 seconds |
| **Transaction Cost** | ~$0.00025 | $1-$50 (varies) |
| **Smart Contract Language** | Rust, C, C++ | Solidity, Vyper |
| **Account Model** | Account-based (different from Ethereum) | Account-based |
| **Developer Framework** | Anchor | Hardhat, Truffle |
| **Ecosystem Maturity** | Growing rapidly | Most mature |

**When to Choose Solana:**
- High-throughput applications (gaming, DEX, high-frequency trading)
- Need for low transaction costs
- Real-time responsiveness matters

---

## Core Concepts

### 1. **Accounts**
Everything in Solana is an account. Unlike Ethereum's contract-storage model:
- **Program accounts**: Store executable code (immutable once deployed)
- **Data accounts**: Store state/data (mutable)
- **System accounts**: Native accounts (e.g., wallet addresses)

Each account has:
```rust
pub struct Account {
    pub lamports: u64,        // Balance in lamports (1 SOL = 1B lamports)
    pub data: Vec<u8>,        // Arbitrary data
    pub owner: Pubkey,        // Program that owns this account
    pub executable: bool,     // Is this a program?
    pub rent_epoch: Epoch,    // Rent collection info
}
```

### 2. **Programs (Smart Contracts)**
Solana programs are **stateless** - they don't store data internally. Instead:
- Programs process instructions
- Data is stored in separate accounts
- Programs own data accounts

### 3. **Transactions and Instructions**
- **Transaction**: A signed message containing one or more instructions
- **Instruction**: A call to a specific program with accounts and data

```rust
pub struct Instruction {
    pub program_id: Pubkey,           // Which program to call
    pub accounts: Vec<AccountMeta>,   // Which accounts to use
    pub data: Vec<u8>,                // Instruction data
}
```

### 4. **Program Derived Addresses (PDAs)**
PDAs are accounts owned by programs (not by users). They enable:
- Deterministic address generation
- Programs to "sign" transactions
- Cross-program invocations (CPI)

```rust
let (pda, bump) = Pubkey::find_program_address(
    &[b"my-seed", user.key().as_ref()],
    program_id
);
```

### 5. **Rent**
Accounts must maintain a minimum balance (rent) to stay alive. Solutions:
- Make account "rent-exempt" by holding 2+ years of rent
- Anchor automatically makes accounts rent-exempt

---

## Development Environment Setup

### Prerequisites
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Verify installation
solana --version  # Should show v1.18.x or later

# Install Node.js & Yarn (for frontend)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
npm install -g yarn

# Install Anchor CLI
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest

# Verify Anchor
anchor --version  # Should show 0.30.x or later
```

### Configure Solana CLI
```bash
# Set cluster (devnet for development)
solana config set --url https://api.devnet.solana.com

# Create a wallet
solana-keygen new --outfile ~/.config/solana/devnet.json

# Set as default wallet
solana config set --keypair ~/.config/solana/devnet.json

# Check config
solana config get

# Get devnet SOL (airdrop)
solana airdrop 2

# Check balance
solana balance
```

---

## Solana CLI

### Wallet Management
```bash
# Create new keypair
solana-keygen new --outfile ~/my-wallet.json

# View public key
solana-keygen pubkey ~/my-wallet.json

# Check balance
solana balance <ADDRESS>

# Transfer SOL
solana transfer <RECIPIENT> 1.5 --from ~/my-wallet.json
```

### Cluster Management
```bash
# Switch to mainnet
solana config set --url https://api.mainnet-beta.solana.com

# Switch to testnet
solana config set --url https://api.testnet.solana.com

# Switch to local validator
solana config set --url http://localhost:8899

# Start local validator
solana-test-validator
```

### Account Inspection
```bash
# View account details
solana account <ADDRESS>

# View program account
solana program show <PROGRAM_ID>

# Get recent blockhash
solana recent-blockhash

# Get transaction details
solana confirm <SIGNATURE>
```

---

## Anchor Framework

### What is Anchor

**Anchor** is the Rust framework for Solana development - think of it as the "Hardhat of Solana". It provides:

✅ **Automatic account validation** - No manual account checking  
✅ **Serialization/deserialization** - Automatic data encoding  
✅ **Built-in testing framework** - TypeScript tests included  
✅ **IDL generation** - Auto-generate JSON interface for frontends  
✅ **Error handling** - Custom error codes  
✅ **CPI helpers** - Cross-program invocation made easy  

**Why Use Anchor?**
- Reduces boilerplate code by 70%+
- Prevents common security vulnerabilities
- Industry standard (used by Serum, Mango Markets, Jet Protocol)
- Great documentation and community

### Project Structure

Create a new Anchor project:
```bash
anchor init my_project
cd my_project
```

Directory structure:
```
my_project/
├── Anchor.toml          # Anchor config (cluster, wallet, programs)
├── Cargo.toml           # Rust workspace config
├── package.json         # Node.js dependencies
├── programs/            # Solana programs (Rust)
│   └── my_project/
│       ├── Cargo.toml   # Program dependencies
│       └── src/
│           └── lib.rs   # Main program code
├── tests/               # TypeScript tests
│   └── my_project.ts
├── app/                 # Frontend (optional)
├── migrations/          # Deployment scripts
└── target/              # Build artifacts
    ├── deploy/          # Deployed program keypairs
    ├── idl/             # Generated IDL files
    └── types/           # Generated TypeScript types
```

**Anchor.toml** configuration:
```toml
[features]
seeds = false
skip-lint = false

[programs.localnet]
my_project = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"

[programs.devnet]
my_project = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"

[registry]
url = "https://api.apr.dev"

[provider]
cluster = "Localnet"
wallet = "~/.config/solana/id.json"

[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"
```

### Writing Programs

#### Basic Program Structure

**programs/my_project/src/lib.rs:**
```rust
use anchor_lang::prelude::*;

// Program ID (auto-generated)
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod my_project {
    use super::*;

    // Instruction handlers go here
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = 0;
        msg!("Account initialized with data: {}", my_account.data);
        Ok(())
    }

    pub fn update(ctx: Context<Update>, new_data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = new_data;
        msg!("Account updated to: {}", my_account.data);
        Ok(())
    }
}

// Account validation for initialize instruction
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8, // discriminator + u64
    )]
    pub my_account: Account<'info, MyAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

// Account validation for update instruction
#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

// Account data structure
#[account]
pub struct MyAccount {
    pub data: u64,
}
```

#### Counter Program (Full Example)

```rust
use anchor_lang::prelude::*;

declare_id!("YourProgramIDHere");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        counter.authority = ctx.accounts.authority.key();
        msg!("Counter initialized!");
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = counter.count.checked_add(1)
            .ok_or(ErrorCode::Overflow)?;
        msg!("Counter incremented to: {}", counter.count);
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        require!(counter.count > 0, ErrorCode::Underflow);
        counter.count -= 1;
        msg!("Counter decremented to: {}", counter.count);
        Ok(())
    }

    pub fn reset(ctx: Context<Reset>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        require!(
            ctx.accounts.authority.key() == counter.authority,
            ErrorCode::Unauthorized
        );
        counter.count = 0;
        msg!("Counter reset!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 8 + 32, // discriminator + count + authority pubkey
        seeds = [b"counter", authority.key().as_ref()],
        bump,
    )]
    pub counter: Account<'info, Counter>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct Reset<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Counter {
    pub count: u64,
    pub authority: Pubkey,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Counter overflow")]
    Overflow,
    #[msg("Counter underflow")]
    Underflow,
    #[msg("Unauthorized access")]
    Unauthorized,
}
```

#### Account Constraints (Security)

Anchor provides powerful account validation macros:

```rust
#[derive(Accounts)]
pub struct Example<'info> {
    // Must be a signer
    #[account(mut)]
    pub signer: Signer<'info>,
    
    // Initialize new account
    #[account(
        init,
        payer = signer,
        space = 8 + 32 + 8,
    )]
    pub new_account: Account<'info, MyData>,
    
    // Must have specific owner
    #[account(
        mut,
        constraint = my_account.owner == signer.key() @ ErrorCode::Unauthorized
    )]
    pub my_account: Account<'info, MyData>,
    
    // PDA with seeds
    #[account(
        seeds = [b"vault", signer.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, Vault>,
    
    // Close account and return lamports
    #[account(
        mut,
        close = signer, // Recipient of lamports
    )]
    pub account_to_close: Account<'info, MyData>,
    
    // Has check (account exists)
    #[account(
        mut,
        has_one = authority @ ErrorCode::InvalidAuthority,
    )]
    pub vault: Account<'info, Vault>,
    pub authority: Signer<'info>,
}

#[account]
pub struct MyData {
    pub owner: Pubkey,
    pub value: u64,
}

#[account]
pub struct Vault {
    pub authority: Pubkey,
}
```

### Testing

Anchor includes a TypeScript testing framework using Mocha and Chai.

**tests/my_project.ts:**
```typescript
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MyProject } from "../target/types/my_project";
import { expect } from "chai";

describe("my_project", () => {
  // Configure client
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.MyProject as Program<MyProject>;
  
  // Generate keypair for test account
  const myAccount = anchor.web3.Keypair.generate();

  it("Initializes account", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([myAccount])
      .rpc();

    console.log("Transaction signature:", tx);

    // Fetch account data
    const account = await program.account.myAccount.fetch(
      myAccount.publicKey
    );
    expect(account.data.toNumber()).to.equal(0);
  });

  it("Updates account", async () => {
    await program.methods
      .update(new anchor.BN(42))
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .rpc();

    const account = await program.account.myAccount.fetch(
      myAccount.publicKey
    );
    expect(account.data.toNumber()).to.equal(42);
  });
});
```

#### Counter Test Example

```typescript
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { assert } from "chai";

describe("counter", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Counter as Program<Counter>;
  const authority = provider.wallet.publicKey;

  // Derive PDA for counter
  const [counterPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("counter"), authority.toBuffer()],
    program.programId
  );

  it("Initializes counter", async () => {
    await program.methods
      .initialize()
      .accounts({
        counter: counterPDA,
        authority: authority,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const counter = await program.account.counter.fetch(counterPDA);
    assert.equal(counter.count.toNumber(), 0);
    assert.equal(counter.authority.toBase58(), authority.toBase58());
  });

  it("Increments counter", async () => {
    await program.methods
      .increment()
      .accounts({ counter: counterPDA })
      .rpc();

    const counter = await program.account.counter.fetch(counterPDA);
    assert.equal(counter.count.toNumber(), 1);
  });

  it("Decrements counter", async () => {
    await program.methods
      .decrement()
      .accounts({ counter: counterPDA })
      .rpc();

    const counter = await program.account.counter.fetch(counterPDA);
    assert.equal(counter.count.toNumber(), 0);
  });

  it("Fails to decrement below zero", async () => {
    try {
      await program.methods
        .decrement()
        .accounts({ counter: counterPDA })
        .rpc();
      assert.fail("Should have thrown error");
    } catch (err) {
      assert.include(err.message, "Underflow");
    }
  });

  it("Resets counter", async () => {
    // Increment a few times
    for (let i = 0; i < 5; i++) {
      await program.methods
        .increment()
        .accounts({ counter: counterPDA })
        .rpc();
    }

    // Reset
    await program.methods
      .reset()
      .accounts({
        counter: counterPDA,
        authority: authority,
      })
      .rpc();

    const counter = await program.account.counter.fetch(counterPDA);
    assert.equal(counter.count.toNumber(), 0);
  });
});
```

**Run tests:**
```bash
# Build program
anchor build

# Run tests on local validator
anchor test

# Run tests on devnet
anchor test --provider.cluster devnet

# Run specific test file
anchor test -- --grep "Initialize"
```

### Deployment

#### Deploy to Devnet

```bash
# 1. Build program
anchor build

# 2. Get program ID
solana address -k target/deploy/my_project-keypair.json

# 3. Update program ID in lib.rs and Anchor.toml
# Edit programs/my_project/src/lib.rs:
# declare_id!("YourProgramIDHere");

# 4. Rebuild with correct ID
anchor build

# 5. Set cluster to devnet
solana config set --url https://api.devnet.solana.com

# 6. Airdrop SOL for deployment (needs ~5 SOL)
solana airdrop 2
solana airdrop 2
solana airdrop 2

# 7. Deploy
anchor deploy

# 8. Verify deployment
solana program show <PROGRAM_ID>
```

#### Deploy to Mainnet

```bash
# 1. Switch to mainnet
solana config set --url https://api.mainnet-beta.solana.com

# 2. Ensure wallet has enough SOL (~5-10 SOL for deployment)
solana balance

# 3. Deploy
anchor deploy

# 4. Make program immutable (optional, prevents updates)
solana program set-upgrade-authority <PROGRAM_ID> --final

# 5. Verify
solana program show <PROGRAM_ID>
```

#### Upgrade Program

```bash
# Deploy new version (keeps same program ID)
anchor build
anchor upgrade target/deploy/my_project.so --program-id <PROGRAM_ID>

# Or use deploy (automatically upgrades if program exists)
anchor deploy
```

---

## Solana Web3.js

@solana/web3.js is the JavaScript library for interacting with Solana from frontends.

### Installation

```bash
npm install @solana/web3.js @coral-xyz/anchor
```

### Basic Usage

```typescript
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import idl from "./idl/my_project.json";

// Connect to devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Get wallet (in browser, use window.solana from Phantom)
const wallet = Wallet.local(); // Or use Phantom: window.solana

// Create provider
const provider = new AnchorProvider(connection, wallet, {
  commitment: "confirmed",
});

// Load program
const programId = new PublicKey("YourProgramIDHere");
const program = new Program(idl, programId, provider);

// Call initialize instruction
const myAccount = Keypair.generate();

const tx = await program.methods
  .initialize()
  .accounts({
    myAccount: myAccount.publicKey,
    user: wallet.publicKey,
    systemProgram: SystemProgram.programId,
  })
  .signers([myAccount])
  .rpc();

console.log("Transaction signature:", tx);

// Fetch account data
const accountData = await program.account.myAccount.fetch(
  myAccount.publicKey
);
console.log("Account data:", accountData.data.toString());
```

### React Integration

**Install dependencies:**
```bash
npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui \
  @solana/wallet-adapter-wallets @solana/wallet-adapter-base
```

**App.tsx:**
```typescript
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import idl from "./idl/counter.json";
import { useMemo, useEffect, useState } from "react";

require("@solana/wallet-adapter-react-ui/styles.css");

function CounterApp() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const program = useMemo(() => {
    if (!wallet.publicKey) return null;
    
    const provider = new AnchorProvider(
      connection,
      wallet as any,
      { commitment: "confirmed" }
    );
    
    return new Program(
      idl as any,
      new PublicKey("YourProgramIDHere"),
      provider
    );
  }, [connection, wallet]);

  const [counterPDA] = useMemo(() => {
    if (!wallet.publicKey || !program) return [null];
    
    return PublicKey.findProgramAddressSync(
      [Buffer.from("counter"), wallet.publicKey.toBuffer()],
      program.programId
    );
  }, [wallet.publicKey, program]);

  useEffect(() => {
    if (!program || !counterPDA) return;
    
    // Fetch counter value
    program.account.counter
      .fetch(counterPDA)
      .then((account) => setCount(account.count.toNumber()))
      .catch(() => setCount(null));
  }, [program, counterPDA]);

  const initialize = async () => {
    if (!program || !counterPDA) return;
    setLoading(true);
    
    try {
      await program.methods
        .initialize()
        .accounts({
          counter: counterPDA,
          authority: wallet.publicKey!,
        })
        .rpc();
      
      setCount(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const increment = async () => {
    if (!program || !counterPDA) return;
    setLoading(true);
    
    try {
      await program.methods
        .increment()
        .accounts({ counter: counterPDA })
        .rpc();
      
      setCount((prev) => (prev !== null ? prev + 1 : null));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <WalletMultiButton />
      
      {wallet.publicKey && (
        <div>
          <h2>Counter: {count !== null ? count : "Not initialized"}</h2>
          
          {count === null ? (
            <button onClick={initialize} disabled={loading}>
              Initialize Counter
            </button>
          ) : (
            <button onClick={increment} disabled={loading}>
              Increment
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <CounterApp />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
```

---

## Token Programs (SPL)

SPL (Solana Program Library) provides standard token functionality similar to ERC-20.

### Create Token

```bash
# Install SPL Token CLI
cargo install spl-token-cli

# Create new token
spl-token create-token
# Returns: Creating token <TOKEN_ADDRESS>

# Create token account (like allowance in ERC-20)
spl-token create-account <TOKEN_ADDRESS>

# Mint tokens
spl-token mint <TOKEN_ADDRESS> 1000

# Check balance
spl-token balance <TOKEN_ADDRESS>

# Transfer tokens
spl-token transfer <TOKEN_ADDRESS> 100 <RECIPIENT_ADDRESS>
```

### Token Program in Anchor

```rust
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

#[program]
pub mod token_example {
    use super::*;

    pub fn mint_tokens(ctx: Context<MintTokens>, amount: u64) -> Result<()> {
        token::mint_to(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.authority.to_account_info(),
                },
            ),
            amount,
        )?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintTokens<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}
```

---

## NFTs on Solana

Solana uses **Metaplex** for NFT standards (like ERC-721).

### Create NFT with Metaplex

```bash
# Install Metaplex CLI
npm install -g @metaplex-foundation/js

# Or use Sugar (candy machine CLI)
bash <(curl -sSf https://sugar.metaplex.com/install.sh)
```

**TypeScript (using Metaplex JS SDK):**
```typescript
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const wallet = Keypair.generate(); // Or load from file

const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));

// Upload metadata to Arweave/IPFS
const { uri } = await metaplex.nfts().uploadMetadata({
  name: "My NFT",
  description: "This is my first Solana NFT",
  image: "https://example.com/image.png",
  attributes: [
    { trait_type: "Background", value: "Blue" },
    { trait_type: "Rarity", value: "Legendary" },
  ],
});

// Create NFT
const { nft } = await metaplex.nfts().create({
  uri,
  name: "My NFT",
  sellerFeeBasisPoints: 500, // 5% royalty
});

console.log("NFT created:", nft.address.toBase58());
```

---

## Real-World dApp Examples

### 1. Voting System

```rust
use anchor_lang::prelude::*;

declare_id!("VotingProgramID");

#[program]
pub mod voting {
    use super::*;

    pub fn create_proposal(
        ctx: Context<CreateProposal>,
        description: String,
        options: Vec<String>,
    ) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        proposal.authority = ctx.accounts.authority.key();
        proposal.description = description;
        proposal.options = options.iter().map(|_| 0).collect();
        proposal.option_names = options;
        proposal.is_active = true;
        Ok(())
    }

    pub fn vote(ctx: Context<Vote>, option_index: u8) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        require!(proposal.is_active, ErrorCode::ProposalClosed);
        require!(
            (option_index as usize) < proposal.options.len(),
            ErrorCode::InvalidOption
        );
        
        proposal.options[option_index as usize] += 1;
        Ok(())
    }

    pub fn close_proposal(ctx: Context<CloseProposal>) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        require!(
            ctx.accounts.authority.key() == proposal.authority,
            ErrorCode::Unauthorized
        );
        proposal.is_active = false;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(description: String, options: Vec<String>)]
pub struct CreateProposal<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 256 + 4 + (options.len() * 8) + 4 + (options.len() * 32) + 1,
    )]
    pub proposal: Account<'info, Proposal>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
}

#[derive(Accounts)]
pub struct CloseProposal<'info> {
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Proposal {
    pub authority: Pubkey,
    pub description: String,
    pub options: Vec<u64>,
    pub option_names: Vec<String>,
    pub is_active: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Proposal is closed")]
    ProposalClosed,
    #[msg("Invalid option index")]
    InvalidOption,
    #[msg("Unauthorized")]
    Unauthorized,
}
```

### 2. Escrow Program

```rust
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("EscrowProgramID");

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize_escrow(
        ctx: Context<InitializeEscrow>,
        amount: u64,
    ) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        escrow.initializer = ctx.accounts.initializer.key();
        escrow.initializer_deposit_account = ctx.accounts.initializer_deposit_account.key();
        escrow.initializer_receive_account = ctx.accounts.initializer_receive_account.key();
        escrow.amount = amount;
        
        // Transfer tokens to escrow
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.initializer_deposit_account.to_account_info(),
                    to: ctx.accounts.escrow_account.to_account_info(),
                    authority: ctx.accounts.initializer.to_account_info(),
                },
            ),
            amount,
        )?;
        
        Ok(())
    }

    pub fn exchange(ctx: Context<Exchange>) -> Result<()> {
        let escrow = &ctx.accounts.escrow;
        
        // Transfer from taker to initializer
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.taker_deposit_account.to_account_info(),
                    to: ctx.accounts.initializer_receive_account.to_account_info(),
                    authority: ctx.accounts.taker.to_account_info(),
                },
            ),
            escrow.amount,
        )?;
        
        // Transfer from escrow to taker
        let signer_seeds = &[
            b"escrow",
            escrow.initializer.as_ref(),
            &[ctx.bumps.escrow],
        ];
        
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.escrow_account.to_account_info(),
                    to: ctx.accounts.taker_receive_account.to_account_info(),
                    authority: ctx.accounts.escrow.to_account_info(),
                },
                &[signer_seeds],
            ),
            escrow.amount,
        )?;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeEscrow<'info> {
    #[account(
        init,
        payer = initializer,
        space = 8 + 32 + 32 + 32 + 8,
        seeds = [b"escrow", initializer.key().as_ref()],
        bump,
    )]
    pub escrow: Account<'info, Escrow>,
    
    #[account(mut)]
    pub initializer: Signer<'info>,
    
    #[account(mut)]
    pub initializer_deposit_account: Account<'info, TokenAccount>,
    
    pub initializer_receive_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub escrow_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Exchange<'info> {
    #[account(
        mut,
        seeds = [b"escrow", escrow.initializer.as_ref()],
        bump,
        close = initializer,
    )]
    pub escrow: Account<'info, Escrow>,
    
    /// CHECK: This is safe because we're just closing the account
    #[account(mut)]
    pub initializer: AccountInfo<'info>,
    
    #[account(mut)]
    pub initializer_receive_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub taker: Signer<'info>,
    
    #[account(mut)]
    pub taker_deposit_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub taker_receive_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub escrow_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Escrow {
    pub initializer: Pubkey,
    pub initializer_deposit_account: Pubkey,
    pub initializer_receive_account: Pubkey,
    pub amount: u64,
}
```

---

## Best Practices

### 1. **Use PDAs for Program-Owned Accounts**
```rust
// Good: Deterministic PDA
#[account(
    seeds = [b"vault", user.key().as_ref()],
    bump,
)]
pub vault: Account<'info, Vault>,

// Bad: Manually generated keypairs (harder to find later)
```

### 2. **Always Validate Account Ownership**
```rust
// Good: Anchor does this automatically
#[account(mut)]
pub my_account: Account<'info, MyAccount>,

// If using AccountInfo, validate manually:
require!(my_account.owner == program_id, ErrorCode::InvalidOwner);
```

### 3. **Use `has_one` Constraint**
```rust
#[derive(Accounts)]
pub struct UpdateVault<'info> {
    #[account(
        mut,
        has_one = authority @ ErrorCode::Unauthorized,
    )]
    pub vault: Account<'info, Vault>,
    pub authority: Signer<'info>,
}
```

### 4. **Close Accounts to Recover Rent**
```rust
#[account(
    mut,
    close = user, // Refund rent to user
)]
pub account_to_close: Account<'info, MyAccount>,
```

### 5. **Use Checked Math**
```rust
// Good
let new_value = old_value.checked_add(amount)
    .ok_or(ErrorCode::Overflow)?;

// Bad (can overflow)
let new_value = old_value + amount;
```

### 6. **Minimize Account Size**
```rust
// Only store essential data
#[account]
pub struct User {
    pub authority: Pubkey,  // 32 bytes
    pub balance: u64,       // 8 bytes
    // Total: 40 bytes + 8 (discriminator) = 48 bytes
}
```

---

## Security Considerations

### 1. **Signer Authorization**
Always verify signers:
```rust
pub fn sensitive_operation(ctx: Context<Operation>) -> Result<()> {
    require!(
        ctx.accounts.authority.key() == ctx.accounts.vault.authority,
        ErrorCode::Unauthorized
    );
    // ... rest of logic
}
```

### 2. **Account Validation**
Don't trust client-provided accounts:
```rust
#[derive(Accounts)]
pub struct Initialize<'info> {
    // Anchor validates this is a Signer
    pub user: Signer<'info>,
    
    // Anchor validates this is owned by System Program
    pub system_program: Program<'info, System>,
}
```

### 3. **Reentrancy Protection**
Solana doesn't have Ethereum-style reentrancy, but be careful with CPI:
```rust
// Update state BEFORE making CPI calls
ctx.accounts.vault.balance -= amount;

// Then do CPI
token::transfer(...)?;
```

### 4. **Integer Overflow**
```rust
// Use checked arithmetic
let result = value.checked_mul(2).ok_or(ErrorCode::Overflow)?;
```

### 5. **PDA Verification**
When using PDAs, verify the bump:
```rust
let (expected_pda, bump) = Pubkey::find_program_address(
    &[b"vault", user.key().as_ref()],
    program_id,
);

require!(vault.key() == expected_pda, ErrorCode::InvalidPDA);
```

---

## Performance Optimization

### 1. **Batch Transactions**
```typescript
// Instead of multiple transactions
const tx1 = await program.methods.increment().rpc();
const tx2 = await program.methods.increment().rpc();

// Use one transaction with multiple instructions
const tx = new Transaction();
tx.add(await program.methods.increment().instruction());
tx.add(await program.methods.increment().instruction());
await provider.sendAndConfirm(tx);
```

### 2. **Use Compute Budget**
```rust
use anchor_lang::prelude::*;
use solana_program::compute_budget::ComputeBudgetInstruction;

// Request more compute units
let compute_budget_ix = ComputeBudgetInstruction::set_compute_unit_limit(400_000);
```

### 3. **Minimize Account Reads**
```rust
// Read account data once, reuse
let vault = &ctx.accounts.vault;
let balance = vault.balance;
// Use `balance` multiple times instead of `vault.balance`
```

### 4. **Pack Data Efficiently**
```rust
#[account]
pub struct PackedData {
    pub flags: u8,  // Use bits for boolean flags
    // ...
}

// Set individual flags
data.flags |= 0b0000_0001;  // Set bit 0
data.flags &= 0b1111_1110;  // Clear bit 0
```

---

## Resources

### Official Documentation
- [Solana Docs](https://docs.solana.com/)
- [Anchor Book](https://book.anchor-lang.com/)
- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Solana Program Library](https://spl.solana.com/)

### Developer Tools
- [Solana Explorer](https://explorer.solana.com/)
- [Solscan](https://solscan.io/) - Block explorer
- [Anchor Playground](https://beta.solpg.io/) - Browser-based IDE
- [Solana Beach](https://solanabeach.io/) - Analytics

### Learning Resources
- [Buildspace Solana Course](https://buildspace.so/solana)
- [Solana Bootcamp](https://github.com/solana-labs/solana-bootcamp)
- [Rise In Solana](https://www.risein.com/courses/solana)
- [QuickNode Guides](https://www.quicknode.com/guides/solana-development)

### Community
- [Solana Discord](https://discord.gg/solana)
- [Anchor Discord](https://discord.gg/anchorlang)
- [Solana Stack Exchange](https://solana.stackexchange.com/)
- [r/solana](https://www.reddit.com/r/solana/)

### Example Projects
- [Anchor Examples](https://github.com/coral-xyz/anchor/tree/master/tests)
- [Solana Program Library](https://github.com/solana-labs/solana-program-library)
- [Serum DEX](https://github.com/project-serum/serum-dex)
- [Mango Markets](https://github.com/blockworks-foundation/mango-v3)

### Security
- [Sealevel Attacks](https://github.com/coral-xyz/sealevel-attacks) - Common vulnerabilities
- [Neodyme Security Blog](https://blog.neodyme.io/) - Solana security research
- [Soteria](https://github.com/blocksecteam/soteria) - Solana security scanner

---

**Happy Building on Solana! 🚀**
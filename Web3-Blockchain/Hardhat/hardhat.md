# Hardhat - Ethereum Development Environment

## Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Writing Contracts](#writing-contracts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Tasks & Scripts](#tasks--scripts)
- [Plugins](#plugins)
- [Console](#console)
- [Forking Mainnet](#forking-mainnet)
- [Resources](#resources)

---

## Introduction

**Hardhat** is a development environment to compile, deploy, test, and debug your Ethereum software. It helps developers manage and automate the recurring tasks inherent to the process of building smart contracts and DApps. It is built around the concept of **tasks** and **plugins**.

---

## Key Features

-   **Flexible**: Built on top of Node.js, heavily extensible via plugins.
-   **Hardhat Network**: A local Ethereum network designed for development.
-   **Console.log**: Debug Solidity contracts using `console.log()`.
-   **TypeScript Support**: First-class TypeScript support.
-   **Forking**: Simulate mainnet state locally.

---

## Installation

```bash
# Initialize a Node.js project
npm init -y

# Install Hardhat
npm install --save-dev hardhat

# Create a Hardhat project
npx hardhat init
```

Choose "Create a TypeScript project" (recommended) or "Create a JavaScript project".

---

## Project Structure

```
my-project/
├── contracts/        # Solidity source files
├── scripts/          # Deployment and maintenance scripts
├── test/             # Tests
├── hardhat.config.ts # Configuration file
├── package.json
└── tsconfig.json     # (If using TypeScript)
```

---

## Configuration

The `hardhat.config.ts` file is the entry point.

```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR-API-KEY",
      accounts: ["YOUR_PRIVATE_KEY"]
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  etherscan: {
    apiKey: "YOUR_ETHERSCAN_API_KEY"
  }
};

export default config;
```

---

## Writing Contracts

Create `contracts/Lock.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(block.timestamp < _unlockTime, "Unlock time should be in the future");
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }
}
```

Compile with:
```bash
npx hardhat compile
```

---

## Testing

Hardhat uses **Mocha** and **Chai** for testing, often with **Ethurs.js** or **Viem**.

Create `test/Lock.ts`:

```typescript
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = (await ethers.provider.getBlock("latest")).timestamp + ONE_YEAR_IN_SECS;

    const [owner, otherAccount] = await ethers.getSigners();
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: 1_000_000_000 });

    return { lock, unlockTime, owner, otherAccount };
  }

  it("Should set the right unlockTime", async function () {
    const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
    expect(await lock.unlockTime()).to.equal(unlockTime);
  });
});
```

Run tests:
```bash
npx hardhat test
```

---

## Deployment

Create `scripts/deploy.ts`:

```typescript
import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lock = await ethers.deployContract("Lock", [unlockTime], {
    value: 1_000_000_000,
  });

  await lock.waitForDeployment();

  console.log(`Lock with 1 ETH deployed to ${lock.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Deploy to local network:
```bash
npx hardhat node # Start local node in separate terminal
npx hardhat run scripts/deploy.ts --network localhost
```

---

## Tasks & Scripts

Hardhat is task runner. You can define custom tasks in `hardhat.config.ts`.

```typescript
import { task } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});
```

Run it: `npx hardhat accounts`

---

## Plugins

Hardhat has a rich plugin ecosystem. The most important is `@nomicfoundation/hardhat-toolbox`, which bundles:
-   `hardhat-ethers`
-   `hardhat-chai-matchers`
-   `hardhat-network-helpers`
-   `hardhat-verify` (Etherscan verification)
-   `hardhat-gas-reporter`
-   `solidity-coverage`

---

## Console

Interact with your contracts via a REPL.

```bash
npx hardhat console
> const Lock = await ethers.getContractFactory("Lock");
> const lock = await Lock.deploy(1234567890, { value: 100 });
> await lock.getAddress();
```

---

## Forking Mainnet

You can start Hardhat Network that forks mainnet from a specific block number. This allows you to interact with deployed protocols (Uniswap, Aave) locally without spending real ETH.

```typescript
networks: {
  hardhat: {
    forking: {
      url: "https://mainnet.infura.io/v3/...",
      blockNumber: 14390000
    }
  }
}
```

---

## Resources

-   [Hardhat Documentation](https://hardhat.org/docs)
-   [Hardhat Tutorial](https://hardhat.org/tutorial)
-   [Hardhat Plugins](https://hardhat.org/plugins)
-   [Nomic Foundation](https://nomic.foundation/)

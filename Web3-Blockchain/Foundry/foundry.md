# Foundry - Portable & Modular Ethereum Development

## Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Forge (Build & Test)](#forge-build--test)
  - [Building](#building)
  - [Testing](#testing)
  - [Fuzzing](#fuzzing)
  - [Gas Snapshots](#gas-snapshots)
- [Cast (Command Line)](#cast-command-line)
- [Anvil (Local Node)](#anvil-local-node)
- [Scripting (Solidity Scripting)](#scripting-solidity-scripting)
- [Resources](#resources)

---

## Introduction

**Foundry** is a blazing fast, portable, and modular toolkit for Ethereum application development written in Rust. It consists of three main components:
1.  **Forge**: Ethereum testing framework (like Truffle, Hardhat).
2.  **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions, and getting chain data.
3.  **Anvil**: Local Ethereum node, akin to Ganache or Hardhat Network.

Foundry is unique because it allows you to **write tests and scripts in Solidity**, rather than JavaScript or TypeScript.

---

## Key Features

-   **Speed**: Compilation and testing are incredibly fast due to Rust.
-   **Solidity Tests**: Write tests in Solidity. No need for context switching.
-   **Fuzzing**: Built-in property-based testing (fuzzing).
-   **Standard Library**: Comes with `forge-std` - a helpful standard library.
-   **Trace**: Powerful execution traces for debugging.

---

## Installation

Foundry manages its installation via `foundryup`.

```bash
# Install foundryup
curl -L https://foundry.paradigm.xyz | bash

# Run foundryup to install tools
foundryup
```

Verify:
```bash
forge --version
cast --version
anvil --version
```

---

## Project Structure

Create a new project:
```bash
forge init my-project
cd my-project
```

Structure:
```
my-project/
├── src/          # Smart contracts (Solidity)
├── test/         # Tests (Solidity)
├── script/       # Deployment scripts (Solidity)
├── lib/          # Dependencies (git submodules)
└── foundry.toml  # Configuration
```

---

## Forge (Build & Test)

### Building
Compiles your contracts.
```bash
forge build
```

### Testing
Foundry tests are written in Solidity. They should inherit from `Test` in `forge-std`.

`test/Counter.t.sol`:
```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

Run tests:
```bash
forge test
```

### Fuzzing
Foundry automatically fuzzes arguments in test functions. In `testSetNumber(uint256 x)`, Foundry will call this function with thousands of random values for `x`.

### Gas Snapshots
Track gas usage of your functions.
```bash
forge snapshot
```
Creates a `.gas-snapshot` file.

---

## Cast (Command Line)

Interact with the blockchain from the terminal.

**Get ETH balance**:
```bash
cast balance 0x...
```

**Call a function (read)**:
```bash
cast call 0xContractAddress "balanceOf(address)(uint256)" 0xUserAddress
```

**Send a transaction (write)**:
```bash
cast send --private-key <KEY> 0xContractAddress "transfer(address,uint256)" 0xRecipient 100
```

**Convert types**:
```bash
cast --to-dec 0x1a     # 26
cast --to-hex 26       # 0x1a
cast --to-wei 1 ether  # 1000000000000000000
```

---

## Anvil (Local Node)

Start a local development node (like Hardhat node).

```bash
anvil
```

It spins up a local RPC at `http://127.0.0.1:8545` with 10 test accounts pre-funded with 10,000 ETH.

---

## Scripting (Solidity Scripting)

Foundry allows you to write deployment scripts in Solidity.

`script/Deploy.s.sol`:
```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Counter.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        Counter counter = new Counter();

        vm.stopBroadcast();
    }
}
```

Run script:
```bash
forge script script/Deploy.s.sol --rpc-url <RPC_URL> --broadcast
```

---

## Resources

-   [Foundry Book](https://book.getfoundry.sh/) - The official comprehensive guide.
-   [Paradigm](https://www.paradigm.xyz/) - Creators of Foundry.
-   [Solmate](https://github.com/transmissions11/solmate) - Modern, opinionated Solidity building blocks (often used with Foundry).

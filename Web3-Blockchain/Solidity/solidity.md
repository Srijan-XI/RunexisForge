# Solidity - Smart Contract Language

## Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Development Tools](#development-tools)
- [Basic Syntax](#basic-syntax)
  - [Structure](#structure)
  - [Data Types](#data-types)
  - [Functions](#functions)
  - [Modifiers](#modifiers)
  - [Events](#events)
- [Advanced Concepts](#advanced-concepts)
  - [Inheritance](#inheritance)
  - [Interfaces](#interfaces)
  - [Errors](#errors)
- [Security Best Practices](#security-best-practices)
- [Example Contract](#example-contract)
- [Resources](#resources)

---

## Introduction

**Solidity** is an object-oriented, high-level language for implementing smart contracts. It is statically typed, supports inheritance, libraries, and complex user-defined types. It is designed to target the **Ethereum Virtual Machine (EVM)**.

---

## Key Features

-   **Statically Typed**: Variables must be defined with types.
-   **Contract-Oriented**: Inspired by classes in OOP.
-   **Inheritance**: Contracts can inherit properties/methods from others.
-   **Libraries**: Reusable code blocks.
-   **Events**: Logging mechanism for DApps.

---

## Development Tools

-   **Remix IDE**: Online browser-based IDE (Best for learning).
-   **Hardhat**: Standard JS/TS development environment.
-   **Foundry**: Rust-based, fast testing framework.
-   **VS Code**: with "Solidity" extension by Nomic Foundation.

---

## Basic Syntax

### Structure
Every Solidity file starts with a license identifier and version pragma.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    // State variables and functions go here
}
```

### Data Types
-   **address**: 20-byte Ethereum address.
-   **uint/int**: Unsigned/Signed integers (`uint256` is standard).
-   **bool**: `true` or `false`.
-   **string**: UTF-8 encoded string.
-   **mapping**: Key-value pairs (`mapping(address => uint) balances;`).
-   **struct**: Custom data structures.
-   **enum**: Enumerated lists.

### Functions
Functions are the executable units of code.

```solidity
function functionName(uint _x) public view returns (uint) {
    return _x + 1;
}
```

**Visibility**:
-   `public`: Accessible internally and externally.
-   `private`: Only accessible in the current contract.
-   `internal`: Accessible in current and derived contracts.
-   `external`: Only accessible from outside (or `this.func()`).

**Mutability**:
-   `pure`: Reads no state, writes no state.
-   `view`: Reads state, writes no state.
-   (none): Can read and write state.
-   `payable`: Can receive ETH.

### Modifiers
Reusable code to check conditions before function execution.

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _; // Continue execution
}
```

### Events
Allow logging to the blockchain (cheaper than storage). Frontends listen to these.

```solidity
event Transfer(address indexed from, address indexed to, uint amount);

function transfer(address _to, uint _amount) external {
    emit Transfer(msg.sender, _to, _amount);
}
```

---

## Advanced Concepts

### Inheritance
Contracts can inherit from multiple parents.

```solidity
contract A is B, C { ... }
```

### Interfaces
Define functions without implementation. Used to interact with other contracts (e.g., ERC-20 tokens).

### Errors
Custom errors save gas compared to string `require` messages.

```solidity
error InsufficientBalance(uint requested, uint available);
// revert InsufficientBalance(10, 5);
```

---

## Security Best Practices

1.  **Reentrancy**: Use Checks-Effects-Interactions pattern or `ReentrancyGuard`.
2.  **Integer Overflow**: Solidity 0.8+ handles this natively.
3.  **Access Control**: Always check `msg.sender` for sensitive functions.
4.  **Randomness**: Blockchain is deterministic; use Chainlink VRF for true random numbers.
5.  **Audit**: Always get external audits for production code.

---

## Example Contract

A simple storage contract with access control.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private value;
    address public owner;

    event ValueChanged(uint256 newValue);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    // Write function - costs gas
    function setValue(uint256 _newValue) public onlyOwner {
        value = _newValue;
        emit ValueChanged(_newValue);
    }

    // Read function - free (if called externally)
    function getValue() public view returns (uint256) {
        return value;
    }
}
```

---

## Resources

-   [Solidity Documentation](https://docs.soliditylang.org/)
-   [Solidity by Example](https://solidity-by-example.org/)
-   [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/) - Standard secure library.
-   [CryptoZombies](https://cryptozombies.io/) - Interactive coding game.

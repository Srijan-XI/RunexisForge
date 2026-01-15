# Truffle Suite - Ethereum Development Framework

## Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Truffle Suite](#truffle-suite)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Truffle Config](#truffle-config)
- [Migrations (Deployment)](#migrations-deployment)
- [Testing](#testing)
- [Console](#console)
- [Ganache](#ganache)
- [Resources](#resources)

---

## Introduction

**Truffle** is one of the oldest and most established development environments for Ethereum. It provides a suite of tools for smart contract compilation, linking, deployment, and binary management.

*Note: While Truffle was the industry standard for years, Hardhat and Foundry significantly gained popularity recently. However, Truffle remains widely used and supported.*

---

## Key Features

-   **Smart Contract Lifecycle Management**: Compilation, linking, deployment.
-   **Automated Testing**: Support for both JavaScript (Mocha/Chai) and Solidity tests.
-   **Scriptable Migrations**: automated deployment framework.
-   **Network Management**: Deploy to any number of public & private networks.
-   **Interactive Console**: Direct communication with your contracts.

---

## Truffle Suite

Truffle is part of a broader suite:
1.  **Truffle**: The CLI development tool.
2.  **Ganache**: Personal blockchain for Ethereum development (GUI & CLI).
3.  **Drizzle**: Reactive Redux library for frontend state management (less common now).

---

## Installation

```bash
# Global installation recommended
npm install -g truffle

# Verify
truffle version
```

---

## Project Structure

Initialize a project:
```bash
truffle init
# Or unbox a template
truffle unbox react
```

Structure:
```
my-project/
├── contracts/        # Solidity contracts directory
├── migrations/       # Deployment scripts
├── test/             # Test files
├── truffle-config.js # Truffle configuration file
```

---

## Truffle Config

`truffle-config.js` defines networks, compiler versions, and plugins.

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Ganache GUI default
      network_id: "*", // Match any network id
    },
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${projectId}`),
      network_id: 11155111,
    }
  },
  compilers: {
    solc: {
      version: "0.8.20",
    }
  }
};
```

---

## Migrations (Deployment)

Truffle uses "migrations" to manage deployment changes.

`migrations/1_initial_migration.js`:
```javascript
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
```

`migrations/2_deploy_contracts.js`:
```javascript
const MyContract = artifacts.require("MyContract");

module.exports = function (deployer) {
  deployer.deploy(MyContract, "ConstructorArg1");
};
```

Run migrations:
```bash
truffle migrate
```

---

## Testing

Truffle tests are usually written in JavaScript/TypeScript using Mocha & Chai.

`test/MyContract.test.js`:
```javascript
const MyContract = artifacts.require("MyContract");

contract("MyContract", (accounts) => {
  it("should initialize correctly", async () => {
    const instance = await MyContract.deployed();
    const value = await instance.myFunction();
    assert.equal(value, "ExpectedValue", "Value wasn't correctly set");
  });

  it("should allow owner to update", async () => {
    const instance = await MyContract.deployed();
    await instance.updateValue("NewValue", { from: accounts[0] });
    // Assert...
  });
});
```

Run tests:
```bash
truffle test
```

---

## Console

Interact with deployed contracts.

```bash
truffle console
truffle(development)> const instance = await MyContract.deployed()
truffle(development)> const accounts = await web3.eth.getAccounts()
truffle(development)> instance.balanceOf(accounts[0])
```

---

## Ganache

**Ganache** is a personal blockchain for rapid Ethereum and Corda distributed application development. You can use Ganache across the entire development cycle; enabling you to develop, deploy, and test your dApps in a safe and deterministic environment.

-   **Ganache UI**: Desktop application with visual block explorer.
-   **Ganache CLI**: Fast command-line version (`npm install -g ganache`).

---

## Resources

-   [Truffle Suite Docs](https://trufflesuite.com/docs/)
-   [Ganache](https://trufflesuite.com/ganache/)
-   [Truffle Boxes](https://trufflesuite.com/boxes/) - Boilerplates.

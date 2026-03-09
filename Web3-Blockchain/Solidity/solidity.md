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

---

## Advanced Solidity Patterns

### Factory Pattern

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Token {
    string public name;
    address public owner;

    constructor(string memory _name, address _owner) {
        name = _name;
        owner = _owner;
    }
}

contract TokenFactory {
    Token[] public deployedTokens;

    event TokenCreated(address tokenAddress, string name);

    function createToken(string memory name) public {
        Token newToken = new Token(name, msg.sender);
        deployedTokens.push(newToken);
        emit TokenCreated(address(newToken), name);
    }

    function getDeployedTokens() public view returns (Token[] memory) {
        return deployedTokens;
    }
}
```

### Proxy Pattern (Upgradeable Contracts)

```solidity
// Implementation contract
contract ImplementationV1 {
    uint256 public value;

    function setValue(uint256 _value) public {
        value = _value;
    }
}

// Proxy contract
contract Proxy {
    address public implementation;
    address public admin;

    constructor(address _implementation) {
        implementation = _implementation;
        admin = msg.sender;
    }

    function upgrade(address newImplementation) external {
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

### State Machine Pattern

```solidity
contract CrowdFunding {
    enum State { Fundraising, Expired, Successful }
    State public state = State.Fundraising;

    uint256 public goal;
    uint256 public deadline;
    uint256 public totalRaised;

    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    function contribute() public payable inState(State.Fundraising) {
        require(block.timestamp < deadline);
        totalRaised += msg.value;
    }

    function checkGoalReached() public {
        require(block.timestamp >= deadline);
        
        if (totalRaised >= goal) {
            state = State.Successful;
        } else {
            state = State.Expired;
        }
    }
}
```

---

## Gas Optimization Techniques

### 1. Use Calldata for Read-Only Function Parameters

```solidity
// Bad - costs more gas
function processArray(uint[] memory data) public {
    // ...
}

// Good - cheaper
function processArray(uint[] calldata data) public {
    // ...
}
```

### 2. Pack Variables

```solidity
// Bad - uses 3 storage slots
contract Inefficient {
    uint128 a;
    uint256 b;
    uint128 c;
}

// Good - uses 2 storage slots
contract Efficient {
    uint128 a;
    uint128 c;
    uint256 b;
}
```

### 3. Use Events Instead of Storage

```solidity
// Expensive
mapping(uint => string) public logs;

// Cheaper
event LogEntry(uint indexed id, string message);
```

### 4. Short Circuit with && and ||

```solidity
// More efficient - stops at first false
function check() public view returns (bool) {
    return cheapCheck() && expensiveCheck();
}
```

### 5. Unchecked Arithmetic (when safe)

```solidity
function increment(uint x) public pure returns (uint) {
    unchecked {
        return x + 1; // Saves gas, but overflow wraps
    }
}
```

---

## Security Patterns

### Checks-Effects-Interactions

```solidity
// Secure pattern to prevent reentrancy
function withdraw(uint amount) public {
    // 1. Checks
    require(balances[msg.sender] >= amount);
    
    // 2. Effects (update state first)
    balances[msg.sender] -= amount;
    
    // 3. Interactions (external calls last)
    (bool success,) = msg.sender.call{value: amount}("");
    require(success);
}
```

### Pull Over Push

```solidity
// Bad - pushing payments can fail and block contract
function distributeFunds() public {
    for (uint i = 0; i < recipients.length; i++) {
        recipients[i].transfer(amounts[i]); // Can fail
    }
}

// Good - let users pull their funds
mapping(address => uint) public pendingWithdrawals;

function withdraw() public {
    uint amount = pendingWithdrawals[msg.sender];
    pendingWithdrawals[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
}
```

### Rate Limiting

```solidity
contract RateLimited {
    mapping(address => uint) public lastAction;
    uint public constant COOLDOWN = 1 hours;

    modifier rateLimit() {
        require(block.timestamp >= lastAction[msg.sender] + COOLDOWN);
        _;
        lastAction[msg.sender] = block.timestamp;
    }

    function sensitiveAction() public rateLimit {
        // Protected function
    }
}
```

---

## Real-World Contract Examples

### ERC-20 Token (Full Implementation)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ERC20Token {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _initialSupply * 10**decimals;
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) 
        public returns (bool success) 
    {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Insufficient allowance");
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        
        emit Transfer(_from, _to, _value);
        return true;
    }
}
```

### Decentralized Auction

```solidity
contract Auction {
    address payable public beneficiary;
    uint public auctionEndTime;

    address public highestBidder;
    uint public highestBid;

    mapping(address => uint) public pendingReturns;
    bool public ended;

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    constructor(uint biddingTime, address payable beneficiaryAddress) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

    function bid() public payable {
        require(block.timestamp <= auctionEndTime, "Auction ended");
        require(msg.value > highestBid, "Bid not high enough");

        if (highestBid != 0) {
            pendingReturns[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    function withdraw() public returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;
            if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    function auctionEnd() public {
        require(block.timestamp >= auctionEndTime, "Auction not ended");
        require(!ended, "Already ended");

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);
        beneficiary.transfer(highestBid);
    }
}
```

### Staking Contract

```solidity
contract StakingContract {
    IERC20 public stakingToken;
    IERC20 public rewardToken;

    uint public rewardRate = 100; // Rewards per second
    uint public lastUpdateTime;
    uint public rewardPerTokenStored;

    mapping(address => uint) public userRewardPerTokenPaid;
    mapping(address => uint) public rewards;
    mapping(address => uint) public balances;

    uint private _totalSupply;

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function rewardPerToken() public view returns (uint) {
        if (_totalSupply == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored + 
            (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / _totalSupply);
    }

    function earned(address account) public view returns (uint) {
        return ((balances[account] * 
            (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) + 
            rewards[account];
    }

    function stake(uint amount) external updateReward(msg.sender) {
        _totalSupply += amount;
        balances[msg.sender] += amount;
        stakingToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint amount) external updateReward(msg.sender) {
        _totalSupply -= amount;
        balances[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
    }

    function getReward() external updateReward(msg.sender) {
        uint reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        rewardToken.transfer(msg.sender, reward);
    }
}
```

---

## Testing Solidity Contracts

### Hardhat Tests

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Token", function () {
  let token;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const Token = await ethers.getContractFactory("ERC20Token");
    token = await Token.deploy("MyToken", "MTK", 1000000);
  });

  describe("Deployment", function () {
    it("Should assign total supply to owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await token.transfer(addr1.address, 50);
      expect(await token.balanceOf(addr1.address)).to.equal(50);

      await token.connect(addr1).transfer(addr2.address, 50);
      expect(await token.balanceOf(addr2.address)).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialBalance = await token.balanceOf(owner.address);
      
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Insufficient balance");

      expect(await token.balanceOf(owner.address)).to.equal(initialBalance);
    });
  });
});
```

### Foundry Tests (Solidity)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ERC20Token.sol";

contract ERC20TokenTest is Test {
    ERC20Token token;
    address alice = address(0x1);
    address bob = address(0x2);

    function setUp() public {
        token = new ERC20Token("Test", "TST", 1000000);
    }

    function testInitialSupply() public {
        assertEq(token.totalSupply(), 1000000 * 10**18);
        assertEq(token.balanceOf(address(this)), 1000000 * 10**18);
    }

    function testTransfer() public {
        token.transfer(alice, 100);
        assertEq(token.balanceOf(alice), 100);
    }

    function testFailTransferInsufficientBalance() public {
        vm.prank(alice);
        token.transfer(bob, 1);
    }

    function testFuzzTransfer(uint256 amount) public {
        vm.assume(amount <= token.balanceOf(address(this)));
        token.transfer(alice, amount);
        assertEq(token.balanceOf(alice), amount);
    }
}
```

---

## Assembly and Low-Level Operations

### Inline Assembly

```solidity
function getCodeSize(address addr) public view returns (uint size) {
    assembly {
        size := extcodesize(addr)
    }
}

function memoryAllocation() public pure returns (bytes32 x) {
    assembly {
        let freeMemoryPointer := mload(0x40)
        mstore(freeMemoryPointer, 0x1234)
        x := mload(freeMemoryPointer)
        mstore(0x40, add(freeMemoryPointer, 0x20))
    }
}

function efficientKeccak(bytes memory data) public pure returns (bytes32) {
    bytes32 result;
    assembly {
        result := keccak256(add(data, 32), mload(data))
    }
    return result;
}
```

---

## Common Vulnerabilities & Prevention

### 1. Reentrancy

```solidity
// Vulnerable
function withdraw() public {
    uint amount = balances[msg.sender];
    (bool success,) = msg.sender.call{value: amount}("");
    balances[msg.sender] = 0; // After external call!
}

// Fixed with ReentrancyGuard
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Secure is ReentrancyGuard {
    function withdraw() public nonReentrant {
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success,) = msg.sender.call{value: amount}("");
        require(success);
    }
}
```

### 2. Front-Running

```solidity
// Mitigate with commit-reveal
mapping(address => bytes32) public commits;

function commit(bytes32 hash) public {
    commits[msg.sender] = hash;
}

function reveal(uint value, bytes32 salt) public {
    require(keccak256(abi.encodePacked(value, salt)) == commits[msg.sender]);
    // Process value
}
```

### 3. Integer Overflow (Pre-0.8.0)

```solidity
// Solidity 0.8+ automatically checks
uint256 a = type(uint256).max;
a = a + 1; // Reverts automatically

// For unchecked (when you want wrapping)
unchecked {
    a = a + 1; // Wraps to 0
}
```

---

## OpenZeppelin Integration

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MyToken is ERC20, Ownable, Pausable {
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _update(address from, address to, uint256 value)
        internal
        whenNotPaused
        override
    {
        super._update(from, to, value);
    }
}
```

---

## Best Practices Checklist

✅ **Security**
- Use latest Solidity version
- Run security audits (Slither, Mythril)
- Follow Checks-Effects-Interactions
- Use OpenZeppelin contracts
- Implement access control

✅ **Gas Optimization**
- Pack storage variables
- Use calldata for read-only
- Cache storage reads
- Use events for logs
- Optimize loops

✅ **Code Quality**
- Write comprehensive tests
- Document with NatSpec
- Use meaningful names
- Keep functions small
- Emit events for important state changes

✅ **Testing**
- Unit tests for all functions
- Integration tests
- Fuzz testing
- Test edge cases
- Check gas costs

---

## Additional Resources

### Learning Platforms
- [CryptoZombies](https://cryptozombies.io/)
- [Ethernaut](https://ethernaut.openzeppelin.com/) - Security challenges
- [Solidity by Example](https://solidity-by-example.org/)
- [Remix IDE](https://remix.ethereum.org/)

### Security Tools
- [Slither](https://github.com/crytic/slither)
- [Mythril](https://github.com/ConsenSys/mythril)
- [Echidna](https://github.com/crytic/echidna)
- [Manticore](https://github.com/trailofbits/manticore)

### Development Frameworks
- [Hardhat](https://hardhat.org/)
- [Foundry](https://book.getfoundry.sh/)
- [Truffle](https://trufflesuite.com/)
- [Brownie](https://eth-brownie.readthedocs.io/)

---

**Master Solidity to build secure, efficient, and innovative smart contracts on Ethereum!** 💎⚡

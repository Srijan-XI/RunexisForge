# Blockchain Oracles - Comprehensive Guide

## Table of Contents
- [Introduction](#introduction)
- [The Oracle Problem](#the-oracle-problem)
- [Types of Oracles](#types-of-oracles)
- [Chainlink](#chainlink)
  - [Architecture](#architecture)
  - [Price Feeds](#price-feeds)
  - [VRF (Verifiable Random Function)](#vrf-verifiable-random-function)
  - [Automation (Keepers)](#automation-keepers)
  - [Any API](#any-api)
  - [CCIP (Cross-Chain)](#ccip-cross-chain)
- [Band Protocol](#band-protocol)
  - [Architecture](#band-architecture)
  - [Price Data](#band-price-data)
  - [Integration](#band-integration)
- [Real-World Use Cases](#real-world-use-cases)
- [Security Considerations](#security-considerations)
- [Testing & Development](#testing--development)
- [Best Practices](#best-practices)
- [Comparison](#comparison)
- [Resources](#resources)

---

## Introduction

**Blockchain oracles** are bridges between blockchains and the external world. They provide smart contracts with access to off-chain data, enabling contracts to interact with real-world information and events.

**Why Oracles Matter:**
```
🌍 Real World          🔗 Oracle          ⛓️ Blockchain
────────────────      ────────────      ────────────────
API Data               ┌──────────┐      Smart Contract
Weather Info     ───►  │  Oracle  │  ───►  Uses Data
Stock Prices           │ Network  │       Makes Decision
Sports Results         └──────────┘       Executes Logic
```

**Without oracles, smart contracts are:**
- ❌ Isolated from external data
- ❌ Cannot trigger based on real-world events
- ❌ Limited to on-chain information only

**With oracles, smart contracts can:**
- ✅ Access price data for DeFi
- ✅ Get weather data for crop insurance
- ✅ Verify sports results for betting
- ✅ Generate provably random numbers
- ✅ Make HTTP API calls
- ✅ Automate execution based on conditions

---

## The Oracle Problem

Smart contracts are **deterministic** - every node must reach the same result. Accessing external data creates challenges:

### Centralized Oracle Risk

```
❌ Single Oracle (Centralized)
┌─────────────┐
│   Oracle    │ ← Single point of failure
│   Node      │ ← Can be manipulated
└──────┬──────┘ ← Data tampering possible
       │
       ▼
┌─────────────┐
│   Smart     │
│  Contract   │
└─────────────┘
```

**Problems:**
- 🚨 Single point of failure
- 🚨 Oracle can lie about data
- 🚨 No way to verify correctness
- 🚨 Defeats purpose of decentralization

### Decentralized Oracle Solution

```
✅ Decentralized Oracle Network
┌─────┐  ┌─────┐  ┌─────┐
│Node1│  │Node2│  │Node3│ ← Multiple independent nodes
└──┬──┘  └──┬──┘  └──┬──┘
   │        │        │
   └────────┼────────┘
            ▼
     ┌──────────────┐
     │ Aggregation  │ ← Median/consensus
     │   Contract   │
     └──────┬───────┘
            │
            ▼
     ┌──────────────┐
     │    Smart     │
     │   Contract   │
     └──────────────┘
```

**Benefits:**
- ✅ Multiple data sources = reliability
- ✅ Cryptographic proofs
- ✅ Reputation systems
- ✅ Economic incentives for honesty

---

## Types of Oracles

### 1. **Input Oracles**
Bring external data **into** the blockchain.

**Examples:**
- Price feeds (ETH/USD)
- Weather data
- Sports results

### 2. **Output Oracles**
Send blockchain data **to** external systems.

**Examples:**
- Trigger payment systems
- Update external databases
- Send notifications

### 3. **Cross-Chain Oracles**
Enable communication between different blockchains.

**Examples:**
- Chainlink CCIP
- LayerZero
- Wormhole

### 4. **Compute-Enabled Oracles**
Perform off-chain computation and return results.

**Examples:**
- Chainlink Automation
- Complex calculations
- VRF (random number generation)

---

## Chainlink

**Chainlink** is the leading decentralized oracle network, providing:
- 🔹 **Price Feeds**: Real-time asset prices
- 🔹 **VRF**: Verifiable randomness
- 🔹 **Automation**: Time/condition-based execution
- 🔹 **Any API**: Connect to any external API
- 🔹 **CCIP**: Cross-chain interoperability

### Architecture

```
┌──────────────────────────────────────────────┐
│           Chainlink Network                  │
│                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ Node 1  │  │ Node 2  │  │ Node 3  │    │
│  │ (API)   │  │ (API)   │  │ (API)   │    │
│  └────┬────┘  └────┬────┘  └────┬────┘    │
│       │            │            │          │
│       └────────────┼────────────┘          │
│                    ▼                        │
│           ┌────────────────┐                │
│           │  Aggregation   │                │
│           │    Contract    │                │
│           └────────┬───────┘                │
└────────────────────┼────────────────────────┘
                     │
                     ▼
              ┌──────────────┐
              │    Your      │
              │   Contract   │
              └──────────────┘
```

**Key Components:**
1. **On-Chain Contracts**: Aggregators, consumer contracts
2. **Off-Chain Network**: Independent node operators
3. **External Data**: APIs, data providers

### Price Feeds

Chainlink Price Feeds provide **decentralized, tamper-proof** price data for DeFi protocols.

**How it works:**
1. Multiple Chainlink nodes fetch prices from exchanges
2. Prices are aggregated on-chain
3. Your contract reads the aggregated price

#### Using Price Feeds

**Installation:**
```bash
npm install @chainlink/contracts
```

**Solidity Contract:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Ethereum Mainnet
     * Aggregator: ETH/USD
     * Address: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
        );
    }

    /**
     * Returns the latest ETH/USD price
     */
    function getLatestPrice() public view returns (int) {
        (
            /* uint80 roundID */,
            int price,
            /* uint startedAt */,
            /* uint timeStamp */,
            /* uint80 answeredInRound */
        ) = priceFeed.latestRoundData();
        
        return price; // Returns price with 8 decimals (e.g., 200000000000 = $2000.00)
    }

    /**
     * Returns price with proper decimals
     */
    function getPrice() public view returns (uint256) {
        (, int price, , ,) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        
        return uint256(price);
    }

    /**
     * Get price feed decimals
     */
    function getDecimals() public view returns (uint8) {
        return priceFeed.decimals();
    }

    /**
     * Get price feed description
     */
    function getDescription() public view returns (string memory) {
        return priceFeed.description();
    }
}
```

#### DeFi Lending with Price Feed

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ChainlinkLending {
    AggregatorV3Interface public ethUsdPriceFeed;
    AggregatorV3Interface public daiUsdPriceFeed;
    
    IERC20 public daiToken;
    
    uint256 public constant COLLATERAL_RATIO = 150; // 150% collateralization
    
    struct Loan {
        uint256 collateralAmount;  // ETH deposited
        uint256 borrowedAmount;     // DAI borrowed
    }
    
    mapping(address => Loan) public loans;
    
    constructor(address _ethUsdFeed, address _daiUsdFeed, address _daiToken) {
        ethUsdPriceFeed = AggregatorV3Interface(_ethUsdFeed);
        daiUsdPriceFeed = AggregatorV3Interface(_daiUsdFeed);
        daiToken = IERC20(_daiToken);
    }
    
    /**
     * Deposit ETH as collateral and borrow DAI
     */
    function depositAndBorrow(uint256 daiBorrowAmount) external payable {
        require(msg.value > 0, "Must deposit ETH");
        
        uint256 maxBorrow = getMaxBorrowAmount(msg.value);
        require(daiBorrowAmount <= maxBorrow, "Insufficient collateral");
        
        loans[msg.sender].collateralAmount += msg.value;
        loans[msg.sender].borrowedAmount += daiBorrowAmount;
        
        require(daiToken.transfer(msg.sender, daiBorrowAmount), "Transfer failed");
        
        emit Borrowed(msg.sender, msg.value, daiBorrowAmount);
    }
    
    /**
     * Calculate max DAI that can be borrowed for given ETH collateral
     */
    function getMaxBorrowAmount(uint256 ethAmount) public view returns (uint256) {
        uint256 ethPriceUsd = getEthPrice();
        uint256 daiPriceUsd = getDaiPrice();
        
        // ETH value in USD (with 18 decimals)
        uint256 collateralValueUsd = (ethAmount * ethPriceUsd) / 1e18;
        
        // Max borrow = (collateral value * 100) / collateral ratio
        uint256 maxBorrowUsd = (collateralValueUsd * 100) / COLLATERAL_RATIO;
        
        // Convert USD to DAI amount
        uint256 maxBorrowDai = (maxBorrowUsd * 1e18) / daiPriceUsd;
        
        return maxBorrowDai;
    }
    
    /**
     * Repay DAI loan and withdraw ETH collateral
     */
    function repayAndWithdraw() external {
        Loan memory loan = loans[msg.sender];
        require(loan.borrowedAmount > 0, "No active loan");
        
        // Transfer DAI from user
        require(
            daiToken.transferFrom(msg.sender, address(this), loan.borrowedAmount),
            "Repayment failed"
        );
        
        uint256 collateral = loan.collateralAmount;
        
        delete loans[msg.sender];
        
        // Return ETH collateral
        payable(msg.sender).transfer(collateral);
        
        emit Repaid(msg.sender, collateral, loan.borrowedAmount);
    }
    
    /**
     * Check if position is healthy (collateral ratio above threshold)
     */
    function isHealthy(address borrower) public view returns (bool) {
        Loan memory loan = loans[borrower];
        if (loan.borrowedAmount == 0) return true;
        
        uint256 maxBorrow = getMaxBorrowAmount(loan.collateralAmount);
        return loan.borrowedAmount <= maxBorrow;
    }
    
    /**
     * Liquidate undercollateralized position
     */
    function liquidate(address borrower) external {
        require(!isHealthy(borrower), "Position is healthy");
        
        Loan memory loan = loans[borrower];
        
        // Liquidator repays debt
        require(
            daiToken.transferFrom(msg.sender, address(this), loan.borrowedAmount),
            "Repayment failed"
        );
        
        delete loans[borrower];
        
        // Liquidator gets collateral + 5% bonus
        uint256 liquidationBonus = (loan.collateralAmount * 5) / 100;
        uint256 totalReward = loan.collateralAmount + liquidationBonus;
        
        payable(msg.sender).transfer(totalReward);
        
        emit Liquidated(borrower, msg.sender, loan.collateralAmount);
    }
    
    function getEthPrice() public view returns (uint256) {
        (, int price, , ,) = ethUsdPriceFeed.latestRoundData();
        require(price > 0, "Invalid ETH price");
        return uint256(price) * 1e10; // Convert 8 decimals to 18
    }
    
    function getDaiPrice() public view returns (uint256) {
        (, int price, , ,) = daiUsdPriceFeed.latestRoundData();
        require(price > 0, "Invalid DAI price");
        return uint256(price) * 1e10; // Convert 8 decimals to 18
    }
    
    event Borrowed(address indexed user, uint256 ethAmount, uint256 daiAmount);
    event Repaid(address indexed user, uint256 ethAmount, uint256 daiAmount);
    event Liquidated(address indexed borrower, address indexed liquidator, uint256 collateral);
}
```

**Price Feed Addresses:**

| Network | Pair | Address |
|---------|------|---------|
| Ethereum Mainnet | ETH/USD | `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419` |
| Ethereum Mainnet | BTC/USD | `0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c` |
| Ethereum Mainnet | LINK/USD | `0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c` |
| Polygon | ETH/USD | `0xF9680D99D6C9589e2a93a78A04A279e509205945` |
| BSC | BNB/USD | `0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE` |
| Arbitrum | ETH/USD | `0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612` |

[Full list of feeds](https://docs.chain.link/data-feeds/price-feeds/addresses)

### VRF (Verifiable Random Function)

Chainlink VRF provides **cryptographically secure randomness** for smart contracts.

**Use Cases:**
- 🎲 Gaming (card shuffling, loot boxes)
- 🎟️ NFT minting (rare traits)
- 🏆 Lottery/raffle selection
- 🎰 Gambling applications

**How VRF Works:**
```
1. Your contract requests randomness
       │
       ▼
2. Chainlink VRF Coordinator receives request
       │
       ▼
3. Off-chain oracle generates random number + proof
       │
       ▼
4. Coordinator verifies proof on-chain
       │
       ▼
5. Your contract receives provably random number
```

#### VRF Implementation

**Installation:**
```bash
npm install @chainlink/contracts
```

**Solidity Contract (VRF v2):**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

contract RandomWinner is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;
    
    // VRF configuration
    uint64 s_subscriptionId;
    bytes32 keyHash = 0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef; // Ethereum mainnet
    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1; // Number of random values
    
    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address public s_winner;
    
    address[] public players;
    
    constructor(uint64 subscriptionId, address vrfCoordinator) 
        VRFConsumerBaseV2(vrfCoordinator) 
    {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
    }
    
    /**
     * Enter the lottery
     */
    function enter() external payable {
        require(msg.value >= 0.01 ether, "Minimum 0.01 ETH");
        players.push(msg.sender);
    }
    
    /**
     * Pick winner using Chainlink VRF
     */
    function pickWinner() external {
        require(players.length > 0, "No players");
        
        // Request randomness
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }
    
    /**
     * Callback function called by VRF Coordinator
     */
    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        s_randomWords = randomWords;
        
        // Pick winner
        uint256 indexOfWinner = randomWords[0] % players.length;
        s_winner = players[indexOfWinner];
        
        // Transfer prize
        payable(s_winner).transfer(address(this).balance);
        
        // Reset lottery
        players = new address[](0);
        
        emit WinnerPicked(s_winner, address(this).balance);
    }
    
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
    
    event WinnerPicked(address winner, uint256 amount);
}
```

#### NFT with Random Traits

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

contract RandomNFT is ERC721, VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 s_subscriptionId;
    bytes32 keyHash;
    uint32 callbackGasLimit = 200000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1;
    
    uint256 public tokenCounter;
    
    struct NFTTraits {
        uint256 strength;    // 1-100
        uint256 speed;       // 1-100
        uint256 intelligence;// 1-100
        string rarity;       // Common, Rare, Epic, Legendary
    }
    
    mapping(uint256 => NFTTraits) public tokenIdToTraits;
    mapping(uint256 => address) public requestIdToSender;
    
    constructor(uint64 subscriptionId, address vrfCoordinator, bytes32 _keyHash)
        ERC721("RandomHero", "HERO")
        VRFConsumerBaseV2(vrfCoordinator)
    {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        keyHash = _keyHash;
    }
    
    /**
     * Request NFT mint with random traits
     */
    function requestNFT() external returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        
        requestIdToSender[requestId] = msg.sender;
        
        emit NFTRequested(requestId, msg.sender);
    }
    
    /**
     * VRF callback - mint NFT with random traits
     */
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) 
        internal 
        override 
    {
        address nftOwner = requestIdToSender[requestId];
        uint256 newTokenId = tokenCounter;
        
        _safeMint(nftOwner, newTokenId);
        
        // Generate random traits
        uint256 randomness = randomWords[0];
        
        NFTTraits memory traits;
        traits.strength = (randomness % 100) + 1;
        traits.speed = ((randomness / 100) % 100) + 1;
        traits.intelligence = ((randomness / 10000) % 100) + 1;
        
        // Determine rarity based on total stats
        uint256 totalStats = traits.strength + traits.speed + traits.intelligence;
        
        if (totalStats > 270) {
            traits.rarity = "Legendary"; // Top 1%
        } else if (totalStats > 240) {
            traits.rarity = "Epic";      // Top 10%
        } else if (totalStats > 210) {
            traits.rarity = "Rare";      // Top 30%
        } else {
            traits.rarity = "Common";
        }
        
        tokenIdToTraits[newTokenId] = traits;
        tokenCounter++;
        
        emit NFTMinted(newTokenId, nftOwner, traits);
    }
    
    function getTraits(uint256 tokenId) external view returns (NFTTraits memory) {
        require(_exists(tokenId), "Token does not exist");
        return tokenIdToTraits[tokenId];
    }
    
    event NFTRequested(uint256 indexed requestId, address requester);
    event NFTMinted(uint256 indexed tokenId, address owner, NFTTraits traits);
}
```

### Automation (Keepers)

**Chainlink Automation** (formerly Keepers) executes smart contract functions automatically when predefined conditions are met.

**Use Cases:**
- ⏰ Time-based execution (daily auctions, scheduled payments)
- 🔄 Condition-based triggers (rebalance portfolio when threshold hit)
- 🎯 Complex automation (harvest yield farm rewards)

**How it works:**
```
1. Register your contract with Chainlink Automation
       │
       ▼
2. Automation nodes continually call checkUpkeep()
       │
       ▼
3. If checkUpkeep returns true, performUpkeep() is called
       │
       ▼
4. Your contract executes the automated task
```

#### Automation Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract AutomatedAuction is AutomationCompatible {
    uint256 public auctionEndTime;
    address public highestBidder;
    uint256 public highestBid;
    bool public auctionEnded;
    
    mapping(address => uint256) public bids;
    
    event AuctionEnded(address winner, uint256 amount);
    event BidPlaced(address bidder, uint256 amount);
    
    constructor(uint256 _durationMinutes) {
        auctionEndTime = block.timestamp + (_durationMinutes * 1 minutes);
    }
    
    /**
     * Place bid
     */
    function bid() external payable {
        require(block.timestamp < auctionEndTime, "Auction ended");
        require(msg.value > highestBid, "Bid too low");
        
        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid; // Allow refund
        }
        
        highestBidder = msg.sender;
        highestBid = msg.value;
        
        emit BidPlaced(msg.sender, msg.value);
    }
    
    /**
     * Chainlink Automation calls this to check if upkeep is needed
     */
    function checkUpkeep(bytes calldata /* checkData */)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        upkeepNeeded = (block.timestamp >= auctionEndTime) && !auctionEnded;
    }
    
    /**
     * Chainlink Automation calls this to perform upkeep
     */
    function performUpkeep(bytes calldata /* performData */) external override {
        require(block.timestamp >= auctionEndTime, "Auction still active");
        require(!auctionEnded, "Already ended");
        
        auctionEnded = true;
        
        emit AuctionEnded(highestBidder, highestBid);
    }
    
    /**
     * Withdraw losing bids
     */
    function withdraw() external {
        uint256 amount = bids[msg.sender];
        require(amount > 0, "No funds");
        
        bids[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
```

### Any API

**Chainlink Any API** allows smart contracts to access **any external API**.

**Use Cases:**
- 🌦️ Weather data for parametric insurance
- 📊 Stock prices for tokenized securities
- ⚽ Sports results for betting platforms
- 🔍 Real-world event verification

#### Any API Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract WeatherOracle is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    
    uint256 public temperature;
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
    event TemperatureUpdated(uint256 temp);
    
    constructor() {
        setChainlinkToken(0x514910771AF9Ca656af840dff83E8264EcF986CA); // LINK token
        oracle = 0xYourOracleAddress;
        jobId = "YourJobId";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }
    
    /**
     * Request temperature data for a city
     */
    function requestTemperature(string memory city) public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId, 
            address(this), 
            this.fulfill.selector
        );
        
        // Set the URL to perform GET request on
        requestaddress(_request, "get", string(abi.encodePacked(
            "https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=",
            city
        )));
        
        // JSON path to temperature data
        request.add("path", "current.temp_c");
        
        // Multiply by result by 100 to remove decimals
        request.addInt("times", 100);
        
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Callback function
     */
    function fulfill(bytes32 _requestId, uint256 _temperature) 
        public 
        recordChainlinkFulfillment(_requestId) 
    {
        temperature = _temperature;
        emit TemperatureUpdated(_temperature);
    }
    
    /**
     * Withdraw LINK tokens
     */
    function withdrawLink() public {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }
}
```

### CCIP (Cross-Chain)

**Chainlink Cross-Chain Interoperability Protocol** enables secure cross-chain messaging and token transfers.

**Use Cases:**
- 🌉 Cross-chain token bridges
- 📨 Cross-chain messaging
- 🔄 Multi-chain DeFi protocols

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CCIPTokenSender {
    IRouterClient private router;
    IERC20 private linkToken;
    
    constructor(address _router, address _link) {
        router = IRouterClient(_router);
        linkToken = IERC20(_link);
    }
    
    function sendTokens(
        uint64 destinationChainSelector,
        address receiver,
        address token,
        uint256 amount
    ) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        IERC20(token).approve(address(router), amount);
        
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: "",
            tokenAmounts: getTokenAmounts(token, amount),
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 200_000})
            ),
            feeToken: address(linkToken)
        });
        
        uint256 fees = router.getFee(destinationChainSelector, message);
        
        linkToken.transferFrom(msg.sender, address(this), fees);
        linkToken.approve(address(router), fees);
        
        router.ccipSend(destinationChainSelector, message);
    }
    
    function getTokenAmounts(address token, uint256 amount) 
        private 
        pure 
        returns (Client.EVMTokenAmount[] memory) 
    {
        Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
        tokenAmounts[0] = Client.EVMTokenAmount({
            token: token,
            amount: amount
        });
        return tokenAmounts;
    }
}
```

---

## Band Protocol

**Band Protocol** is a cross-chain data oracle platform that aggregates and connects real-world data to smart contracts.

### Band Architecture

```
┌────────────────────────────────────────┐
│         Data Providers                 │
│  (CoinGecko, CoinMarketCap, etc.)     │
└────────────┬───────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│       BandChain (Cosmos SDK)           │
│                                        │
│  ┌──────────┐  ┌──────────┐          │
│  │Validator1│  │Validator2│   ...    │
│  └──────────┘  └──────────┘          │
│                                        │
│    Data aggregation & consensus        │
└────────────┬───────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│    Target Blockchains                  │
│  (Ethereum, BSC, Polygon, etc.)       │
└────────────────────────────────────────┘
```

**Key Features:**
- ✅ Cross-chain support (20+ blockchains)
- ✅ Fast finality (< 6 seconds)
- ✅ Customizable data scripts
- ✅ Cost-effective

### Band Price Data

**Standard Dataset:**
Band Protocol maintains a standard price dataset updated every 5-10 seconds.

#### Using Band Protocol on Ethereum

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IStdReference {
    struct ReferenceData {
        uint256 rate;        // Rate value (base/quote * 1e18)
        uint256 lastUpdatedBase;
        uint256 lastUpdatedQuote;
    }

    function getReferenceData(string memory _base, string memory _quote)
        external
        view
        returns (ReferenceData memory);

    function getReferenceDataBulk(string[] memory _bases, string[] memory _quotes)
        external
        view
        returns (ReferenceData[] memory);
}

contract BandPriceConsumer {
    IStdReference public ref;
    
    // Band StdReference contract address on Ethereum
    constructor(address _ref) {
        ref = IStdReference(_ref);
    }
    
    /**
     * Get price of base token in quote currency
     * Example: getPrice("BTC", "USD") returns Bitcoin price in USD
     */
    function getPrice(string memory _base, string memory _quote) 
        external 
        view 
        returns (uint256) 
    {
        IStdReference.ReferenceData memory data = ref.getReferenceData(_base, _quote);
        return data.rate;
    }
    
    /**
     * Get ETH price in USD
     */
    function getEthPrice() external view returns (uint256) {
        IStdReference.ReferenceData memory data = ref.getReferenceData("ETH", "USD");
        return data.rate; // Returns price with 18 decimals
    }
    
    /**
     * Get multiple prices in one call
     */
    function getMultiplePrices() external view returns (uint256, uint256, uint256) {
        string[] memory bases = new string[](3);
        bases[0] = "BTC";
        bases[1] = "ETH";
        bases[2] = "LINK";
        
        string[] memory quotes = new string[](3);
        quotes[0] = "USD";
        quotes[1] = "USD";
        quotes[2] = "USD";
        
        IStdReference.ReferenceData[] memory data = ref.getReferenceDataBulk(bases, quotes);
        
        return (data[0].rate, data[1].rate, data[2].rate);
    }
    
    /**
     * Convert amount from one currency to another
     */
    function convert(
        string memory _from, 
        string memory _to, 
        uint256 _amount
    ) external view returns (uint256) {
        IStdReference.ReferenceData memory data = ref.getReferenceData(_from, _to);
        return (_amount * data.rate) / 1e18;
    }
}
```

**Band Protocol Addresses:**

| Network | StdReference Contract |
|---------|----------------------|
| Ethereum | `0xDA7a001b254CD22e46d3eAB04d937489c93174C3` |
| BSC | `0xDA7a001b254CD22e46d3eAB04d937489c93174C3` |
| Polygon | `0x56E2898E0ceFF0D1222827759B56B28Ad812f92F` |
| Avalanche | `0x8c72A3e56c0Cc97BBB13bb85c36d936C97B1d3FA` |
| Fantom | `0x56E2898E0ceFF0D1222827759B56B28Ad812f92F` |

### Band Integration

#### DeFi Protocol with Band Oracle

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IStdReference {
    struct ReferenceData {
        uint256 rate;
        uint256 lastUpdatedBase;
        uint256 lastUpdatedQuote;
    }
    
    function getReferenceData(string memory _base, string memory _quote)
        external view returns (ReferenceData memory);
}

contract BandDEX {
    IStdReference public bandOracle;
    
    IERC20 public tokenA; // e.g., WETH
    IERC20 public tokenB; // e.g., USDC
    
    string public symbolA = "ETH";
    string public symbolB = "USDC";
    
    constructor(address _bandOracle, address _tokenA, address _tokenB) {
        bandOracle = IStdReference(_bandOracle);
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }
    
    /**
     * Swap tokenA for tokenB using Band Protocol price feed
     */
    function swapAforB(uint256 amountA) external {
        require(tokenA.transferFrom(msg.sender, address(this), amountA), "Transfer failed");
        
        // Get price from Band Protocol
        IStdReference.ReferenceData memory data = bandOracle.getReferenceData(symbolA, symbolB);
        uint256 price = data.rate; // How much symbolB per symbolA (with 18 decimals)
        
        // Calculate output amount
        uint256 amountB = (amountA * price) / 1e18;
        
        // Apply 0.3% fee
        uint256 fee = (amountB * 3) / 1000;
        uint256 amountOut = amountB - fee;
        
        require(tokenB.transfer(msg.sender,amountOut), "Transfer failed");
        
        emit Swap(msg.sender, amountA, amountOut);
    }
    
    /**
     * Swap tokenB for tokenA
     */
    function swapBforA(uint256 amountB) external {
        require(tokenB.transferFrom(msg.sender, address(this), amountB), "Transfer failed");
        
        // Get inverse price
        IStdReference.ReferenceData memory data = bandOracle.getReferenceData(symbolB, symbolA);
        uint256 price = data.rate;
        
        uint256 amountA = (amountB * price) / 1e18;
        
        uint256 fee = (amountA * 3) / 1000;
        uint256 amountOut = amountA - fee;
        
        require(tokenA.transfer(msg.sender, amountOut), "Transfer failed");
        
        emit Swap(msg.sender, amountB, amountOut);
    }
    
    event Swap(address indexed user, uint256 amountIn, uint256 amountOut);
}
```

---

## Real-World Use Cases

### 1. Parametric Crop Insurance

```solidity
contract CropInsurance {
    AggregatorV3Interface internal rainfallOracle;
    
    struct Policy {
        address farmer;
        uint256 premium;
        uint256 coverageAmount;
        uint256 rainfallThreshold; // mm
        uint256 policyEndDate;
        bool active;
        bool claimed;
    }
    
    mapping(uint256 => Policy) public policies;
    uint256 public policyCounter;
    
    function purchasePolicy(
        uint256 coverageAmount,
        uint256 rainfallThreshold,
        uint256 durationDays
    ) external payable {
        require(msg.value >= coverageAmount / 10, "Premium too low (need 10%)");
        
        policies[policyCounter] = Policy({
            farmer: msg.sender,
            premium: msg.value,
            coverageAmount: coverageAmount,
            rainfallThreshold: rainfallThreshold,
            policyEndDate: block.timestamp + (durationDays * 1 days),
            active: true,
            claimed: false
        });
        
        policyCounter++;
    }
    
    function claimPayout(uint256 policyId) external {
        Policy storage policy = policies[policyId];
        require(policy.farmer == msg.sender, "Not policy owner");
        require(block.timestamp >= policy.policyEndDate, "Policy not ended");
        require(!policy.claimed, "Already claimed");
        
        // Get rainfall data from oracle
        (, int256 rainfall, , ,) = rainfallOracle.latestRoundData();
        
        if (uint256(rainfall) < policy.rainfallThreshold) {
            policy.claimed = true;
            payable(msg.sender).transfer(policy.coverageAmount);
            emit PayoutClaimed(policyId, msg.sender, policy.coverageAmount);
        } else {
            revert("Rainfall threshold not met");
        }
    }
    
    event PayoutClaimed(uint256 policyId, address farmer, uint256 amount);
}
```

### 2. Sports Betting with Oracles

```solidity
contract SportsBetting {
    ChainlinkClient private oracle;
    
    struct Match {
        string teamA;
        string teamB;
        uint256 matchDate;
        string winner; // "A", "B", or "Draw"
        bool resultSettled;
    }
    
    struct Bet {
        address bettor;
        uint256 matchId;
        string prediction; // "A", "B", or "Draw"
        uint256 amount;
        bool claimed;
    }
    
    mappin(uint256 => Match) public matches;
    mapping(uint256 => Bet) public bets;
    
    uint256 public matchCounter;
    uint256 public betCounter;
    
    function createMatch(string memory teamA, string memory teamB, uint256 date) external {
        matches[matchCounter] = Match(teamA, teamB, date, "", false);
        matchCounter++;
    }
    
    function placeBet(uint256 matchId, string memory prediction) external payable {
        require(msg.value > 0, "Bet amount required");
        require(!matches[matchId].resultSettled, "Match already settled");
        
        bets[betCounter] = Bet(msg.sender, matchId, prediction, msg.value, false);
        betCounter++;
    }
    
    // Oracle callback to settle match result
    function settleMatch(uint256 matchId, string memory winner) external {
        matches[matchId].winner = winner;
        matches[matchId].resultSettled = true;
        emit MatchSettled(matchId, winner);
    }
    
    function claimWinnings(uint256 betId) external {
        Bet storage bet = bets[betId];
        Match storage match = matches[bet.matchId];
        
        require(match.resultSettled, "Match not settled");
        require(!bet.claimed, "Already claimed");
        require(keccak256(bytes(bet.prediction)) == keccak256(bytes(match.winner)), "Lost bet");
        
        bet.claimed = true;
        
        uint256 payout = bet.amount * 2; // 2x payout for correct prediction
        payable(bet.bettor).transfer(payout);
    }
    
    event MatchSettled(uint256 matchId, string winner);
}
```

---

## Security Considerations

### 1. Price Feed Staleness

Always check if price data is fresh:

```solidity
function getPrice() public view returns (uint256) {
    (
        uint80 roundID,
        int price,
        uint startedAt,
        uint timeStamp,
        uint80 answeredInRound
    ) = priceFeed.latestRoundData();
    
    require(price > 0, "Invalid price");
    require(answeredInRound >= roundID, "Stale price");
    require(timeStamp > 0, "Round not complete");
    require(block.timestamp - timeStamp < 3600, "Price too old (>1hr)");
    
    return uint256(price);
}
```

### 2. Circuit Breaker Pattern

Pause contract if oracle fails:

```solidity
contract CircuitBreaker {
    bool public paused;
    uint256 public lastPriceUpdate;
    uint256 public maxPriceDelay = 1 hours;
    
    function updatePrice() internal {
        (, int price, , uint timeStamp,) = priceFeed.latestRoundData();
        
        if (block.timestamp - timeStamp > maxPriceDelay) {
            paused = true;
            emit EmergencyPause("Oracle stale");
        }
        
        lastPriceUpdate = timeStamp;
    }
    
    modifier whenNotPaused() {
        require(!paused, "Contract paused");
        _;
    }
}
```

### 3. Multiple Oracle Sources

Use multiple oracles and compare:

```solidity
function getAveragePrice() public view returns (uint256) {
    uint256 chainlinkPrice = getChainlinkPrice();
    uint256 bandPrice = getBandPrice();
    
    // Prices should be within 5% of each other
    uint256 diff = chainlinkPrice > bandPrice 
        ? chainlinkPrice - bandPrice 
        : bandPrice - chainlinkPrice;
        
    require(diff * 100 / chainlinkPrice < 5, "Price deviation too high");
    
    return (chainlinkPrice + bandPrice) / 2;
}
```

### 4. Protect Against Flash Loan Attacks

Use TWAP (Time-Weighted Average Price):

```solidity
contract TWAPOracle {
    uint256[] public prices;
    uint256[] public timestamps;
    uint256 public constant PERIOD = 30 minutes;
    
    function updatePrice() external {
        (, int price, , uint timeStamp,) = priceFeed.latestRoundData();
        
        prices.push(uint256(price));
        timestamps.push(timeStamp);
        
        // Keep only last 30 minutes of data
        cleanOldPrices();
    }
    
    function getTWAP() public view returns (uint256) {
        require(prices.length > 0, "No price data");
        
        uint256 sum = 0;
        for (uint i = 0; i < prices.length; i++) {
            sum += prices[i];
        }
        
        return sum / prices.length;
    }
    
    function cleanOldPrices() internal {
        uint256 cutoff = block.timestamp - PERIOD;
        
        while (timestamps.length > 0 && timestamps[0] < cutoff) {
            // Remove first element
            for (uint i = 0; i < timestamps.length - 1; i++) {
                timestamps[i] = timestamps[i + 1];
                prices[i] = prices[i + 1];
            }
            timestamps.pop();
            prices.pop();
        }
    }
}
```

---

## Testing & Development

### Hardhat Testing

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PriceConsumer", function () {
  let priceConsumer;
  let mockAggregator;

  beforeEach(async function () {
    // Deploy mock aggregator
    const MockV3Aggregator = await ethers.getContractFactory("MockV3Aggregator");
    mockAggregator = await MockV3Aggregator.deploy(
      8,                    // decimals
      200000000000          // initial price ($2000 with 8 decimals)
    );

    // Deploy PriceConsumer
    const PriceConsumer = await ethers.getContract Factory("PriceConsumer");
    priceConsumer = await PriceConsumer.deploy(mockAggregator.address);
  });

  it("Should return the correct price", async function () {
    const price = await priceConsumer.getLatestPrice();
    expect(price).to.equal(200000000000);
  });

  it("Should update when oracle price changes", async function () {
    await mockAggregator.updateAnswer(250000000000); // $2500
    
    const price = await priceConsumer.getLatestPrice();
    expect(price).to.equal(250000000000);
  });
});
```

### Mocking Chainlink in Tests

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MockV3Aggregator {
    uint8 public decimals;
    int256 public latestAnswer;
    uint256 public latestTimestamp;
    uint256 public latestRound;

    constructor(uint8 _decimals, int256 _initialAnswer) {
        decimals = _decimals;
        updateAnswer(_initialAnswer);
    }

    function updateAnswer(int256 _answer) public {
        latestAnswer = _answer;
        latestTimestamp = block.timestamp;
        latestRound++;
    }

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (
            uint80(latestRound),
            latestAnswer,
            latestTimestamp,
            latestTimestamp,
            uint80(latestRound)
        );
    }
}
```

---

## Best Practices

### 1. **Always Validate Oracle Data**
```solidity
function validatePrice(int256 price, uint256 timestamp) internal view {
    require(price > 0, "Invalid price");
    require(block.timestamp - timestamp < 1 hours, "Stale data");
}
```

### 2. **Handle Oracle Failures Gracefully**
```solidity
try priceFeed.latestRoundData() returns (
    uint80 roundID,
    int price,
    uint,
    uint timeStamp,
    uint80
) {
    // Use price
} catch {
    // Fallback to backup oracle or pause contract
    paused = true;
}
```

### 3. **Use Circuit Breakers**
Implement automatic pausing when price deviates too much or is stale.

### 4. **Fund VRF Subscriptions Properly**
Always maintain sufficient LINK balance for VRF requests.

### 5. **Test on Testnets First**
Use Sepolia/Goerli testnets before deploying to mainnet.

### 6. **Monitor Oracle Health**
Set up monitoring for:
- Price staleness
- Deviation from other sources
- Oracle contract upgrades

---

## Comparison

| Feature | Chainlink | Band Protocol |
|---------|-----------|---------------|
| **Networks** | 15+ (Ethereum, BSC, Polygon, etc.) | 20+ (including Cosmos chains) |
| **Data Feeds** | 1000+ price feeds | 200+ symbols |
| **Update Frequency** | 0.5% deviation or 1 hour | 5-10 seconds |
| **Decentralization** | Multiple independent nodes | Validators on BandChain |
| **Customization** | Any API, custom adapters | Custom oracle scripts |
| **Additional Features** | VRF, Automation, CCIP | Fast finality, cross-chain |
| **Cost** | Moderate (depends on network) | Low (especially on BSC/Polygon) |
| **Maturity** | Most established (2017) | Newer (2019) |
| **Best For** | Comprehensive features, VRF | Cost-effective prices, cross-chain |

---

## Resources

### Chainlink
- [Chainlink Documentation](https://docs.chain.link/)
- [Price Feed Addresses](https://docs.chain.link/data-feeds/price-feeds/addresses)
- [VRF Documentation](https://docs.chain.link/vrf/v2/introduction)
- [Automation Documentation](https://docs.chain.link/chainlink-automation/introduction)
- [Chainlink GitHub](https://github.com/smartcontractkit/chainlink)

### Band Protocol
- [Band Protocol Docs](https://docs.bandchain.org/)
- [Standard Dataset](https://docs.bandchain.org/band-standard-dataset/supported-blockchains.html)
- [Contract Addresses](https://docs.bandchain.org/band-standard-dataset/supported-blockchains.html)
- [Band Protocol GitHub](https://github.com/bandprotocol)

### Learning
- [Chainlink Bootcamp](https://chain.link/bootcamp)
- [Patrick Collins Tutorials](https://www.youtube.com/c/PatrickCollins)
- [Band Protocol Blog](https://blog.bandprotocol.com/)

### Tools
- [Chainlink Faucets](https://faucets.chain.link/) - Get testnet LINK
- [VRF Subscription Manager](https://vrf.chain.link/)
- [Chainlink Market](https://market.link/) - Oracle services marketplace

---

**Happy Building with Oracles! 🔗📡**

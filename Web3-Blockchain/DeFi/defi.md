# DeFi Protocols - Integration Guide

## Table of Contents
- [Introduction](#introduction)
- [Uniswap (DEX)](#uniswap-dex)
  - [Concepts](#concepts)
  - [Integration Example](#integration-example)
- [Aave (Lending)](#aave-lending)
  - [Flash Loans](#flash-loans)
- [Chainlink (Oracles)](#chainlink-oracles)
  - [Price Feeds](#price-feeds)
  - [VRF (Randomness)](#vrf-randomness)
- [Resources](#resources)

---

## Introduction

**DeFi (Decentralized Finance)** refers to financial applications built on blockchain networks. The key characteristic is "Money Legos" (composability) — developers can plug into existing protocols like Uniswap or Aave to build new financial products.

---

## Uniswap (DEX)

**Uniswap** is the leading Decentralized Exchange. It uses an **AMM (Automated Market Maker)** model.

### Concepts
-   **Liquidity Pools**: Pairs of tokens (e.g., ETH/USDC) where users can trade.
-   **Swap**: Trading one token for another.
-   **V3**: Concentrated liquidity (more capital efficient).

### Integration Example
To swap tokens programmatically from your contract, you use the **SwapRouter**.

```solidity
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

ISwapRouter public immutable swapRouter;

function swapExactInputSingle(uint256 amountIn) external returns (uint256 amountOut) {
    IERC20(DAI).transferFrom(msg.sender, address(this), amountIn);
    IERC20(DAI).approve(address(swapRouter), amountIn);

    ISwapRouter.ExactInputSingleParams memory params =
        ISwapRouter.ExactInputSingleParams({
            tokenIn: DAI,
            tokenOut: WETH9,
            fee: 3000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

    amountOut = swapRouter.exactInputSingle(params);
}
```

---

## Aave (Lending)

**Aave** is a liquidity protocol where users can participate as depositors or borrowers.

### Flash Loans
Aave allows uncollateralized loans ("Flash Loans") as long as the borrowed amount (+ fee) is returned **within the same transaction block**.
-   **Use Cases**: Arbitrage, collateral swapping, self-liquidation.

**Logic**:
1.  Borrow 1,000,000 USDC.
2.  Do something profitable (Arbitrage on Uniswap).
3.  Repay 1,000,900 USDC (Loan + 0.09% fee).
4.  Keep the profit.
5.  (If you can't repay, the whole transaction reverts).

---

## Chainlink (Oracles)

Blockchains can't access off-chain data (API quotes, weather, sports). **Chainlink** is a decentralized oracle network that provides this data through a network of independent node operators.

### Why Oracles Matter

Smart contracts are deterministic and isolated - they can only access on-chain data. To interact with the real world, they need **oracles**:

```
Real World Data ────→ Oracle Network ────→ Smart Contract
(Stock prices,           (Chainlink,          (DeFi app)
 weather, sports)        Band Protocol)
```

**The Oracle Problem:** How do you trust off-chain data?
- ❌ **Centralized Oracle**: Single point of failure
- ✅ **Decentralized Oracle Network**: Multiple independent sources, cryptographically secured

### Chainlink Architecture

Chainlink uses a **three-layer architecture**:

1. **On-Chain Contracts**: Smart contracts that consume oracle data
2. **Oracle Network**: Decentralized nodes that fetch and aggregate data
3. **External Data Sources**: APIs, websites, payment systems

```
┌─────────────────┐
│  Data Providers │  (CoinGecko, CoinMarketCap, etc.)
└────────┬────────┘
         │
    ┌────▼────┐
    │ Chainlink│  Multiple nodes aggregate data
    │  Nodes   │
    └────┬────┘
         │
┌────────▼────────┐
│  Aggregator     │  On-chain contract
│  Contract       │
└────────┬────────┘
         │
┌────────▼────────┐
│  Your Smart     │
│  Contract       │
└─────────────────┘
```

### Price Feeds (Data Feeds)

Get real-time asset prices with cryptographic proof of accuracy.

#### Basic Usage

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

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
     * Returns the latest price with 8 decimals
     */
    function getLatestPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        
        return price; // Example: 200000000000 = $2,000.00 (8 decimals)
    }

    /**
     * Returns price with proper decimal handling
     */
    function getPrice() public view returns (uint256) {
        (, int price, , ,) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        
        return uint256(price);
    }

    /**
     * Get decimals for this price feed
     */
    function getDecimals() public view returns (uint8) {
        return priceFeed.decimals();
    }

    /**
     * Get full round data
     */
    function getRoundData(uint80 _roundId)
        public
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return priceFeed.getRoundData(_roundId);
    }
}
```

#### Multi-Asset Price Oracle

```solidity
contract MultiPriceOracle {
    mapping(string => AggregatorV3Interface) public priceFeeds;

    constructor() {
        // Ethereum Mainnet addresses
        priceFeeds["ETH/USD"] = AggregatorV3Interface(
            0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
        );
        priceFeeds["BTC/USD"] = AggregatorV3Interface(
            0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c
        );
        priceFeeds["LINK/USD"] = AggregatorV3Interface(
            0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c
        );
        priceFeeds["USDC/USD"] = AggregatorV3Interface(
            0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6
        );
    }

    function getPrice(string memory pair) public view returns (int256) {
        require(
            address(priceFeeds[pair]) != address(0),
            "Price feed not found"
        );
        
        (, int256 price, , uint256 updatedAt, ) = 
            priceFeeds[pair].latestRoundData();
        
        require(updatedAt > 0, "Round not complete");
        require(block.timestamp - updatedAt < 3600, "Price stale"); // 1 hour
        
        return price;
    }

    function convertUSDToToken(
        string memory pair,
        uint256 usdAmount
    ) public view returns (uint256) {
        int256 price = getPrice(pair);
        require(price > 0, "Invalid price");
        
        uint8 decimals = priceFeeds[pair].decimals();
        
        // USD amount / (price / 10^decimals)
        return (usdAmount * (10 ** decimals)) / uint256(price);
    }
}
```

#### DeFi Integration Example: Dynamic Collateral

```solidity
contract LendingProtocol {
    AggregatorV3Interface internal ethPriceFeed;
    
    struct Position {
        uint256 collateralETH;
        uint256 borrowedUSD;
    }
    
    mapping(address => Position) public positions;
    
    uint256 public constant COLLATERAL_RATIO = 150; // 150%
    
    constructor(address _priceFeed) {
        ethPriceFeed = AggregatorV3Interface(_priceFeed);
    }
    
    function deposit() external payable {
        positions[msg.sender].collateralETH += msg.value;
    }
    
    function borrow(uint256 usdAmount) external {
        Position storage pos = positions[msg.sender];
        
        // Get current ETH price
        (, int256 ethPrice, , ,) = ethPriceFeed.latestRoundData();
        require(ethPrice > 0, "Invalid price");
        
        // Calculate max borrow (collateral value / ratio)
        uint256 collateralValueUSD = (pos.collateralETH * uint256(ethPrice)) / 1e8;
        uint256 maxBorrow = (collateralValueUSD * 100) / COLLATERAL_RATIO;
        
        require(
            pos.borrowedUSD + usdAmount <= maxBorrow,
            "Insufficient collateral"
        );
        
        pos.borrowedUSD += usdAmount;
        
        // Transfer stablecoin to user
        // IERC20(stablecoin).transfer(msg.sender, usdAmount);
    }
    
    function isLiquidatable(address user) public view returns (bool) {
        Position memory pos = positions[user];
        if (pos.borrowedUSD == 0) return false;
        
        (, int256 ethPrice, , ,) = ethPriceFeed.latestRoundData();
        uint256 collateralValueUSD = (pos.collateralETH * uint256(ethPrice)) / 1e8;
        uint256 currentRatio = (collateralValueUSD * 100) / pos.borrowedUSD;
        
        return currentRatio < COLLATERAL_RATIO;
    }
}
```

### Chainlink VRF (Verifiable Random Function)

Generate provably fair and verifiable random numbers for gaming, NFT mints, and lotteries.

#### VRF v2 Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract NFTMinter is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;

    uint64 s_subscriptionId;
    bytes32 keyHash;
    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1;

    mapping(uint256 => address) public requestIdToSender;
    mapping(uint256 => uint256) public tokenIdToRandomness;

    event NFTMinted(uint256 indexed tokenId, uint256 randomness, string rarity);

    constructor(
        uint64 subscriptionId,
        address vrfCoordinator,
        bytes32 _keyHash
    ) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        keyHash = _keyHash;
    }

    function requestRandomNFT() external returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        
        requestIdToSender[requestId] = msg.sender;
        return requestId;
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        uint256 randomness = randomWords[0];
        address owner = requestIdToSender[requestId];
        
        uint256 tokenId = mintNFT(owner, randomness);
        tokenIdToRandomness[tokenId] = randomness;
        
        string memory rarity = getRarity(randomness);
        emit NFTMinted(tokenId, randomness, rarity);
    }

    function mintNFT(address to, uint256 randomness) 
        internal 
        returns (uint256) 
    {
        // Mint NFT logic
        return 1; // tokenId
    }

    function getRarity(uint256 randomness) 
        public 
        pure 
        returns (string memory) 
    {
        uint256 rand = randomness % 100;
        
        if (rand < 1) return "Legendary"; // 1%
        if (rand < 6) return "Epic";      // 5%
        if (rand < 21) return "Rare";     // 15%
        if (rand < 51) return "Uncommon"; // 30%
        return "Common";                  // 49%
    }
}
```

#### Lottery Example

```solidity
contract ChainlinkLottery is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;
    
    uint64 s_subscriptionId;
    bytes32 keyHash;
    
    address[] public players;
    address public recentWinner;
    
    enum LotteryState { OPEN, CALCULATING }
    LotteryState public state;
    
    event LotteryEntered(address indexed player);
    event WinnerPicked(address indexed winner, uint256 amount);
    
    constructor(
        uint64 subscriptionId,
        address vrfCoordinator,
        bytes32 _keyHash
    ) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        keyHash = _keyHash;
        state = LotteryState.OPEN;
    }
    
    function enter() external payable {
        require(state == LotteryState.OPEN, "Lottery not open");
        require(msg.value >= 0.01 ether, "Not enough ETH");
        
        players.push(msg.sender);
        emit LotteryEntered(msg.sender);
    }
    
    function pickWinner() external {
        require(state == LotteryState.OPEN, "Already calculating");
        require(players.length > 0, "No players");
        
        state = LotteryState.CALCULATING;
        
        COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            3, // confirmations
            100000, // gas limit
            1 // num words
        );
    }
    
    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        uint256 indexOfWinner = randomWords[0] % players.length;
        address winner = players[indexOfWinner];
        recentWinner = winner;
        
        uint256 prize = address(this).balance;
        
        // Reset
        players = new address[](0);
        state = LotteryState.OPEN;
        
        (bool success, ) = winner.call{value: prize}("");
        require(success, "Transfer failed");
        
        emit WinnerPicked(winner, prize);
    }
}
```

### Chainlink Automation (Keepers)

Automate smart contract functions (upkeep) in a decentralized manner.

```solidity
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

contract CounterAutomation is AutomationCompatibleInterface {
    uint256 public counter;
    uint256 public lastTimeStamp;
    uint256 public interval;

    constructor(uint256 updateInterval) {
        interval = updateInterval;
        lastTimeStamp = block.timestamp;
        counter = 0;
    }

    function checkUpkeep(bytes calldata /* checkData */)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    function performUpkeep(bytes calldata /* performData */) 
        external 
        override 
    {
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;
            counter = counter + 1;
        }
    }
}
```

### Chainlink Any API (HTTP Requests)

Make HTTP requests to any API from your smart contract.

```solidity
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract WeatherOracle is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public temperature;
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7;
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    function requestTemperature(string memory city) public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        string memory url = string(
            abi.encodePacked(
                "https://api.openweathermap.org/data/2.5/weather?q=",
                city,
                "&appid=YOUR_API_KEY"
            )
        );
        
        request.add("get", url);
        request.add("path", "main,temp");
        request.addInt("times", 100); // Multiply by 100 to preserve decimals

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _temperature)
        public
        recordChainlinkFulfillment(_requestId)
    {
        temperature = _temperature;
    }
}
```

---

## Band Protocol

**Band Protocol** is another decentralized oracle network, focusing on cross-chain data availability and fast finality.

### Band Protocol vs Chainlink

| Feature | Chainlink | Band Protocol |
|---------|-----------|---------------|
| **Architecture** | Off-chain aggregation | On-chain aggregation (Cosmos SDK) |
| **Speed** | 1-2 minutes | 3-6 seconds |
| **Cost** | Higher gas costs | Lower gas costs |
| **Blockchain** | Ethereum-first | Cosmos-native, multi-chain |
| **Data Sources** | Extensive (thousands) | Growing |
| **Adoption** | Industry leader | Growing rapidly in Asia |

### When to Use Band Protocol

✅ **Use Band Protocol if:**
- You need **faster updates** (seconds vs minutes)
- Building on **Cosmos** ecosystem
- Need **lower gas costs**
- Operating in **Asian markets**

✅ **Use Chainlink if:**
- Maximum **security** and **decentralization**
- Need **VRF** or **Automation**
- Building on **Ethereum** mainnet
- Want widest **DeFi integration**

### Band Protocol Architecture

```
┌──────────────┐
│ Data Sources │  (Exchanges, APIs)
└──────┬───────┘
       │
┌──────▼───────┐
│  Band Chain  │  Cosmos-based blockchain
│  (Validators)│  Aggregates data on-chain
└──────┬───────┘
       │
┌──────▼────────┐
│  Bridge       │  Relays to target chain
│  Contracts    │
└──────┬────────┘
       │
┌──────▼────────┐
│  Your Smart   │  Consumes data
│  Contract     │
└───────────────┘
```

### Band Protocol Standard Reference

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IStdReference {
    struct ReferenceData {
        uint256 rate; // Base/quote exchange rate, multiplied by 1e18
        uint256 lastUpdatedBase; // Timestamp when base was updated
        uint256 lastUpdatedQuote; // Timestamp when quote was updated
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

    constructor(IStdReference _ref) {
        ref = _ref; // BSC Testnet: 0xDA7a001b254CD22e46d3eAB04d937489c93174C3
    }

    function getPrice(string memory base, string memory quote)
        external
        view
        returns (uint256)
    {
        IStdReference.ReferenceData memory data = ref.getReferenceData(base, quote);
        return data.rate;
    }

    function getMultiplePrices(string[] memory bases, string[] memory quotes)
        external
        view
        returns (uint256[] memory)
    {
        IStdReference.ReferenceData[] memory data = ref.getReferenceDataBulk(bases, quotes);
        
        uint256[] memory prices = new uint256[](data.length);
        for (uint256 i = 0; i < data.length; i++) {
            prices[i] = data[i].rate;
        }
        
        return prices;
    }

    function getETHPrice() external view returns (uint256) {
        IStdReference.ReferenceData memory data = ref.getReferenceData("ETH", "USD");
        return data.rate;
    }

    function convertETHToUSD(uint256 ethAmount) external view returns (uint256) {
        IStdReference.ReferenceData memory data = ref.getReferenceData("ETH", "USD");
        return (ethAmount * data.rate) / 1e18;
    }
}
```

### Band Protocol Multi-Price Oracle

```solidity
contract BandMultiAssetOracle {
    IStdReference public ref;
    
    mapping(string => bool) public supportedAssets;
    
    event PriceUpdated(string indexed symbol, uint256 price, uint256 timestamp);
    
    constructor(address _ref) {
        ref = IStdReference(_ref);
        
        // Add supported assets
        supportedAssets["BTC"] = true;
        supportedAssets["ETH"] = true;
        supportedAssets["BNB"] = true;
        supportedAssets["USDT"] = true;
    }
    
    function getAssetPrice(string memory asset) 
        public 
        view 
        returns (uint256 price, uint256 lastUpdated) 
    {
        require(supportedAssets[asset], "Asset not supported");
        
        IStdReference.ReferenceData memory data = 
            ref.getReferenceData(asset, "USD");
        
        return (data.rate, data.lastUpdatedBase);
    }
    
    function getMultipleAssetPrices(string[] memory assets)
        external
        view
        returns (uint256[] memory prices, uint256[] memory timestamps)
    {
        uint256 length = assets.length;
        prices = new uint256[](length);
        timestamps = new uint256[](length);
        
        string[] memory quotes = new string[](length);
        for (uint256 i = 0; i < length; i++) {
            quotes[i] = "USD";
        }
        
        IStdReference.ReferenceData[] memory data = 
            ref.getReferenceDataBulk(assets, quotes);
        
        for (uint256 i = 0; i < length; i++) {
            prices[i] = data[i].rate;
            timestamps[i] = data[i].lastUpdatedBase;
        }
        
        return (prices, timestamps);
    }
    
    function isPriceStale(string memory asset, uint256 maxAge) 
        public 
        view 
        returns (bool) 
    {
        (, uint256 lastUpdated) = getAssetPrice(asset);
        return (block.timestamp - lastUpdated) > maxAge;
    }
}
```

### Band Protocol DeFi Integration

```solidity
contract BandLendingProtocol {
    IStdReference public ref;
    
    struct Position {
        uint256 collateralAmount;
        string collateralAsset;
        uint256 borrowedUSD;
    }
    
    mapping(address => Position) public positions;
    uint256 public constant COLLATERAL_RATIO = 150; // 150%
    
    constructor(address _ref) {
        ref = IStdReference(_ref);
    }
    
    function depositCollateral(string memory asset, uint256 amount) external {
        // Transfer tokens
        // IERC20(assetAddress).transferFrom(msg.sender, address(this), amount);
        
        Position storage pos = positions[msg.sender];
        pos.collateralAmount += amount;
        pos.collateralAsset = asset;
    }
    
    function borrow(uint256 usdAmount) external {
        Position storage pos = positions[msg.sender];
        require(pos.collateralAmount > 0, "No collateral");
        
        // Get current price from Band
        IStdReference.ReferenceData memory data = 
            ref.getReferenceData(pos.collateralAsset, "USD");
        
        require(
            block.timestamp - data.lastUpdatedBase < 300,
            "Price too stale"
        );
        
        uint256 collateralValueUSD = (pos.collateralAmount * data.rate) / 1e18;
        uint256 maxBorrow = (collateralValueUSD * 100) / COLLATERAL_RATIO;
        
        require(
            pos.borrowedUSD + usdAmount <= maxBorrow,
            "Insufficient collateral"
        );
        
        pos.borrowedUSD += usdAmount;
        
        // Transfer stablecoin
    }
    
    function getHealthFactor(address user) public view returns (uint256) {
        Position memory pos = positions[user];
        if (pos.borrowedUSD == 0) return type(uint256).max;
        
        IStdReference.ReferenceData memory data = 
            ref.getReferenceData(pos.collateralAsset, "USD");
        
        uint256 collateralValueUSD = (pos.collateralAmount * data.rate) / 1e18;
        
        // Health factor = (collateral value / borrowed) * 100
        return (collateralValueUSD * 100) / pos.borrowedUSD;
    }
}
```

### Band Protocol - Dynamic NFT

```solidity
contract DynamicNFT {
    IStdReference public ref;
    
    struct NFTData {
        uint256 tokenId;
        string baseAsset; // "BTC", "ETH", etc.
        uint256 priceThreshold;
        string currentTier;
    }
    
    mapping(uint256 => NFTData) public nftData;
    
    event NFTTierChanged(uint256 indexed tokenId, string newTier, uint256 price);
    
    constructor(address _ref) {
        ref = IStdReference(_ref);
    }
    
    function mint(string memory baseAsset, uint256 threshold) 
        external 
        returns (uint256) 
    {
        uint256 tokenId = 1; // Generate token ID
        
        nftData[tokenId] = NFTData({
            tokenId: tokenId,
            baseAsset: baseAsset,
            priceThreshold: threshold,
            currentTier: "Bronze"
        });
        
        // Mint NFT
        return tokenId;
    }
    
    function updateNFTTier(uint256 tokenId) external {
        NFTData storage data = nftData[tokenId];
        
        IStdReference.ReferenceData memory priceData = 
            ref.getReferenceData(data.baseAsset, "USD");
        
        string memory newTier;
        
        if (priceData.rate > data.priceThreshold * 2) {
            newTier = "Diamond";
        } else if (priceData.rate > data.priceThreshold * 1.5) {
            newTier = "Gold";
        } else if (priceData.rate > data.priceThreshold) {
            newTier = "Silver";
        } else {
            newTier = "Bronze";
        }
        
        if (keccak256(bytes(newTier)) != keccak256(bytes(data.currentTier))) {
            data.currentTier = newTier;
            emit NFTTierChanged(tokenId, newTier, priceData.rate);
        }
    }
}
```

---

## Oracle Best Practices

### 1. Always Validate Oracle Data

```solidity
function getValidatedPrice() public view returns (uint256) {
    (, int256 price, , uint256 updatedAt, ) = 
        priceFeed.latestRoundData();
    
    // Check price is positive
    require(price > 0, "Invalid price");
    
    // Check price is recent (within 1 hour)
    require(block.timestamp - updatedAt < 3600, "Stale price");
    
    // Check for circuit breaker (price not too extreme)
    require(price < 1000000 * 1e8, "Price too high");
    
    return uint256(price);
}
```

### 2. Use Multiple Oracles for Critical Operations

```solidity
contract MultiOracleValidator {
    AggregatorV3Interface public chainlinkFeed;
    IStdReference public bandFeed;
    
    uint256 public constant MAX_DEVIATION = 5; // 5% max difference
    
    function getValidatedPrice(string memory asset) 
        public 
        view 
        returns (uint256) 
    {
        // Get Chainlink price
        (, int256 clPrice, , ,) = chainlinkFeed.latestRoundData();
        
        // Get Band price
        IStdReference.ReferenceData memory bandData = 
            bandFeed.getReferenceData(asset, "USD");
        
        uint256 chainlinkPrice = uint256(clPrice) * 1e10; // Convert to 18 decimals
        uint256 bandPrice = bandData.rate;
        
        // Calculate deviation
        uint256 diff = chainlinkPrice > bandPrice 
            ? chainlinkPrice - bandPrice 
            : bandPrice - chainlinkPrice;
        
        uint256 deviation = (diff * 100) / chainlinkPrice;
        
        require(deviation <= MAX_DEVIATION, "Price deviation too high");
        
        // Return average
        return (chainlinkPrice + bandPrice) / 2;
    }
}
```

### 3. Implement Circuit Breakers

```solidity
contract CircuitBreakerOracle {
    AggregatorV3Interface public priceFeed;
    
    int256 public lastPrice;
    uint256 public constant MAX_PRICE_CHANGE = 10; // 10% max change
    
    function getPrice() public returns (uint256) {
        (, int256 price, , ,) = priceFeed.latestRoundData();
        
        if (lastPrice != 0) {
            int256 diff = price > lastPrice 
                ? price - lastPrice 
                : lastPrice - price;
            
            uint256 changePercent = uint256((diff * 100) / lastPrice);
            
            require(
                changePercent <= MAX_PRICE_CHANGE,
                "Price change too extreme"
            );
        }
        
        lastPrice = price;
        return uint256(price);
    }
}
```

### 4. Handle Oracle Downtime

```solidity
contract FallbackOracle {
    AggregatorV3Interface public primaryFeed;
    AggregatorV3Interface public fallbackFeed;
    
    uint256 public constant TIMEOUT = 3600; // 1 hour
    
    function getPrice() public view returns (uint256) {
        try this.getPrimaryPrice() returns (uint256 price) {
            return price;
        } catch {
            return getFallbackPrice();
        }
    }
    
    function getPrimaryPrice() external view returns (uint256) {
        (, int256 price, , uint256 updatedAt, ) = 
            primaryFeed.latestRoundData();
        
        require(block.timestamp - updatedAt < TIMEOUT, "Primary oracle timeout");
        require(price > 0, "Invalid price");
        
        return uint256(price);
    }
    
    function getFallbackPrice() internal view returns (uint256) {
        (, int256 price, , uint256 updatedAt, ) = 
            fallbackFeed.latestRoundData();
        
        require(block.timestamp - updatedAt < TIMEOUT, "Fallback oracle timeout");
        require(price > 0, "Invalid price");
        
        return uint256(price);
    }
}
```

---

## Oracle Security Considerations

### Common Vulnerabilities

1. **Price Manipulation**: Flash loan attacks to manipulate spot prices
2. **Stale Data**: Using outdated oracle data
3. **Oracle Downtime**: Oracle network unavailable
4. **Front-Running**: Exploiting oracle update lag

### Security Checklist

✅ Always check `updatedAt` timestamp  
✅ Validate price is within reasonable bounds  
✅ Use multiple oracle sources for critical operations  
✅ Implement circuit breakers for extreme price changes  
✅ Have fallback mechanisms  
✅ Never use spot prices from DEXs alone (use TWAP or oracles)  
✅ Consider oracle gas costs in your economics  

---

## Resources

### Chainlink Resources
- [Chainlink Documentation](https://docs.chain.link/)
- [Chainlink Price Feeds](https://data.chain.link/)
- [Chainlink VRF](https://docs.chain.link/vrf/v2/introduction)
- [Chainlink Automation](https://docs.chain.link/chainlink-automation/introduction)
- [Chainlink GitHub](https://github.com/smartcontractkit/chainlink)

### Band Protocol Resources
- [Band Protocol Docs](https://docs.bandchain.org/)
- [Band Standard Reference](https://docs.bandchain.org/products/band-standard-dataset)
- [Band Explorer](https://cosmoscan.io/)
- [Band GitHub](https://github.com/bandprotocol)

### Oracle Tutorials
- [Chainlink Bootcamp](https://chain.link/bootcamp)
- [Using Chainlink with Hardhat](https://docs.chain.link/getting-started/deploy-your-first-contract)
- [Band Protocol Integration Guide](https://docs.bandchain.org/developer-guides/integration-guide)

### Other Resources
-   [Uniswap Docs](https://docs.uniswap.org/)
-   [Aave Docs](https://docs.aave.com/)
-   [DeFi Developer Roadmap](https://defideveloper.com/)

---

## Resources

-   [Uniswap Docs](https://docs.uniswap.org/)
-   [Aave Docs](https://docs.aave.com/)
-   [Chainlink Docs](https://docs.chain.link/)
-   [DeFi Developer Roadmap](https://defideveloper.com/)

---

## Advanced DeFi Concepts

### Liquidity Mining & Yield Farming

```solidity
contract YieldFarm {
    IERC20 public stakingToken;
    IERC20 public rewardToken;
    
    mapping(address => uint) public stakedBalance;
    mapping(address => uint) public rewards;
    
    uint public rewardRate = 100; // tokens per block
    
    function stake(uint amount) external {
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakedBalance[msg.sender] += amount;
    }
    
    function calculateReward(address user) public view returns (uint) {
        return stakedBalance[user] * rewardRate / 1e18;
    }
    
    function claim() external {
        uint reward = calculateReward(msg.sender);
        rewards[msg.sender] = 0;
        rewardToken.transfer(msg.sender, reward);
    }
}
```

### Automated Market Maker (AMM) Implementation

```solidity
contract SimpleDEX {
    IERC20 public tokenA;
    IERC20 public tokenB;
    
    uint public reserveA;
    uint public reserveB;
    
    // Constant product formula: x * y = k
    function swap(address tokenIn, uint amountIn) external returns (uint amountOut) {
        require(tokenIn == address(tokenA) || tokenIn == address(tokenB));
        
        bool isTokenA = tokenIn == address(tokenA);
        (IERC20 tokenInContract, IERC20 tokenOutContract, uint reserveIn, uint reserveOut) = 
            isTokenA ? (tokenA, tokenB, reserveA, reserveB) : (tokenB, tokenA, reserveB, reserveA);
        
        tokenInContract.transferFrom(msg.sender, address(this), amountIn);
        
        // Apply 0.3% fee
        uint amountInWithFee = amountIn * 997;
        amountOut = (amountInWithFee * reserveOut) / (reserveIn * 1000 + amountInWithFee);
        
        tokenOutContract.transfer(msg.sender, amountOut);
        
        _update();
    }
    
    function addLiquidity(uint amountA, uint amountB) external {
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);
        _update();
    }
    
    function _update() private {
        reserveA = tokenA.balanceOf(address(this));
        reserveB = tokenB.balanceOf(address(this));
    }
}
```

### Lending Protocol Example

```solidity
contract LendingProtocol {
    mapping(address => uint) public supplied;
    mapping(address => uint) public borrowed;
    
    uint public constant COLLATERAL_RATIO = 150; // 150%
    uint public interestRate = 5; // 5% APY
    
    function supply() external payable {
        supplied[msg.sender] += msg.value;
    }
    
    function borrow(uint amount) external {
        uint maxBorrow = (supplied[msg.sender] * 100) / COLLATERAL_RATIO;
        require(borrowed[msg.sender] + amount <= maxBorrow, "Insufficient collateral");
        
        borrowed[msg.sender] += amount;
        payable(msg.sender).transfer(amount);
    }
    
    function repay() external payable {
        require(borrowed[msg.sender] >= msg.value);
        borrowed[msg.sender] -= msg.value;
    }
    
    function withdraw(uint amount) external {
        uint locked = (borrowed[msg.sender] * COLLATERAL_RATIO) / 100;
        require(supplied[msg.sender] - amount >= locked);
        
        supplied[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
```

---

## Real-World DeFi Integrations

### Compound Finance Integration

```solidity
interface CErc20 {
    function mint(uint) external returns (uint);
    function redeem(uint) external returns (uint);
    function borrow(uint) external returns (uint);
    function repayBorrow(uint) external returns (uint);
}

contract CompoundUser {
    CErc20 public cToken;
    IERC20 public underlying;
    
    function supplyToCompound(uint amount) external {
        underlying.approve(address(cToken), amount);
        require(cToken.mint(amount) == 0, "Mint failed");
    }
    
    function borrowFromCompound(uint amount) external {
        require(cToken.borrow(amount) == 0, "Borrow failed");
    }
}
```

### Curve Finance Integration

```javascript
// Using Web3.js to interact with Curve
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_KEY');

const curvePoolABI = [...];
const curvePoolAddress = '0x...';
const pool = new web3.eth.Contract(curvePoolABI, curvePoolAddress);

// Swap tokens on Curve
async function swapOnCurve(tokenInIndex, tokenOutIndex, amount) {
    const minAmountOut = await pool.methods
        .get_dy(tokenInIndex, tokenOutIndex, amount)
        .call();
    
    await pool.methods
        .exchange(tokenInIndex, tokenOutIndex, amount, minAmountOut)
        .send({ from: userAddress });
}
```

---

## DeFi Security Considerations

### Price Oracle Manipulation

```solidity
// Use Time-Weighted Average Price (TWAP)
contract TWAPOracle {
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
    uint32 public blockTimestampLast;
    
    function update() external {
        (uint price0Cumulative, uint price1Cumulative, uint32 blockTimestamp) = 
            currentCumulativePrices();
        
        uint32 timeElapsed = blockTimestamp - blockTimestampLast;
        
        if (timeElapsed > 0) {
            price0Average = (price0Cumulative - price0CumulativeLast) / timeElapsed;
            price1Average = (price1Cumulative - price1CumulativeLast) / timeElapsed;
            
            price0CumulativeLast = price0Cumulative;
            price1CumulativeLast = price1Cumulative;
            blockTimestampLast = blockTimestamp;
        }
    }
}
```

### Flash Loan Protection

```solidity
contract FlashLoanProtected {
    mapping(address => uint) public lastActionBlock;
    
    modifier noFlashLoan() {
        require(lastActionBlock[tx.origin] != block.number, "Flash loan detected");
        lastActionBlock[tx.origin] = block.number;
        _;
    }
    
    function sensitiveOperation() external noFlashLoan {
        // Protected against flash loan attacks
    }
}
```

---

## DeFi Analytics & Monitoring

### Tracking Protocol TVL

```javascript
const ethers = require('ethers');

async function getProtocolTVL(protocolAddress, tokenAddresses) {
    let totalTVL = 0;
    
    for (const tokenAddr of tokenAddresses) {
        const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);
        const balance = await token.balanceOf(protocolAddress);
        const price = await getTokenPrice(tokenAddr); // From price feed
        
        totalTVL += parseFloat(ethers.formatUnits(balance, 18)) * price;
    }
    
    return totalTVL;
}
```

---

## Additional DeFi Resources

### Protocols to Study
- **MakerDAO** - Decentralized stablecoin
- **Compound** - Lending protocol
- **Aave** - Lending with flash loans
- **Uniswap V3** - Concentrated liquidity DEX
- **Curve** - Stablecoin swaps
- **Yearn Finance** - Yield aggregator
- **Synthetix** - Synthetic assets
- **Balancer** - Weighted pools

### Tools & Dashboards
- [DeFi Llama](https://defillama.com/) - TVL analytics
- [Dune Analytics](https://dune.com/) - On-chain data
- [DeBank](https://debank.com/) - Portfolio tracker
- [Zapper](https://zapper.xyz/) - DeFi dashboard

**Continue exploring DeFi protocols and building innovative financial applications!** 🚀💰

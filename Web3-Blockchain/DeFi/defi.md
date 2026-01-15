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

Blockchains can't access off-chain data (API quotes, weather, sports). **Chainlink** is a decentralized oracle network that provides this data.

### Price Feeds
Get the real-world price of assets (e.g., ETH/USD).

```solidity
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

AggregatorV3Interface internal priceFeed;

constructor() {
    priceFeed = AggregatorV3Interface(0x...); // ETH/USD Address
}

function getLatestPrice() public view returns (int) {
    (
        , int price, , ,
    ) = priceFeed.latestRoundData();
    return price;
}
```

### VRF (Randomness)
Generates Verifiable Random Functions. Critical for gaming and NFT mints (rare items).

---

## Resources

-   [Uniswap Docs](https://docs.uniswap.org/)
-   [Aave Docs](https://docs.aave.com/)
-   [Chainlink Docs](https://docs.chain.link/)
-   [DeFi Developer Roadmap](https://defideveloper.com/)

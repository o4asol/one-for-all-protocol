#!/usr/bin/env node
/*
   * OFA Tokenomics Simulator
   * Mathematical scenarios only. Nothing here is a forecast or a promise.
   * Implements the same formulas documented in docs/TOKENOMICS.md so the
   * team can explore fee-rate and volume assumptions interactively instead
   * of hand-editing markdown tables. Reads no live or on-chain data.
   * Run with: node scripts/tokenomics-simulator.js
   */

const FEE_RATES = [0.01, 0.015, 0.02, 0.025, 0.03, 0.035, 0.04, 0.05];
const VOLUMES = [10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000];
const HOLDER_SHARES = [0.0001, 0.001, 0.005, 0.01, 0.02, 0.05];

const DEFAULT_SPLIT = { holders: 0.5, treasury: 0.3, liquidity: 0.2 };

function formatUsd(n) {
    return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function totalFee(volume, feeRate) {
    return volume * feeRate;
}

function holderPool(volume, feeRate, split) {
    return totalFee(volume, feeRate) * split.holders;
}

function holderReward(volume, feeRate, split, holderShareOfEligibleSupply) {
    return holderPool(volume, feeRate, split) * holderShareOfEligibleSupply;
}

function printFeeMatrix() {
    console.log('=== Total Daily Fee Generated (USD) ===');
    console.log('Mathematical scenario tool, not a forecast. See docs/TOKENOMICS.md.');
    const header = ['Daily Volume'].concat(FEE_RATES.map(function (r) { return (r * 100) + '%'; }));
    console.log(header.join(' | '));
    for (const volume of VOLUMES) {
          const row = [formatUsd(volume)];
          for (const rate of FEE_RATES) {
                  row.push(formatUsd(totalFee(volume, rate)));
          }
          console.log(row.join(' | '));
    }
}

function printHolderRewardMatrix(feeRate, split) {
    console.log('');
    console.log('=== Illustrative Per-Holder Daily Reward (USD) ===');
    console.log('Fee rate ' + (feeRate * 100) + '%, holder pool share ' + (split.holders * 100) + '%. Illustrative only, see docs/TOKENOMICS.md section 3.');
    const header = ['Holder Share of Eligible Supply'].concat(VOLUMES.map(formatUsd));
    console.log(header.join(' | '));
    for (const share of HOLDER_SHARES) {
          const row = [(share * 100) + '%'];
          for (const volume of VOLUMES) {
                  row.push(formatUsd(holderReward(volume, feeRate, split, share)));
          }
          console.log(row.join(' | '));
    }
}

function main() {
    console.log('OFA Tokenomics Simulator - mathematical scenarios only, not promises.');
    console.log('No live on-chain data is read by this script. All numbers are hypothetical inputs.');
    printFeeMatrix();
    printHolderRewardMatrix(0.02, DEFAULT_SPLIT);
    console.log('');
    console.log('Adjust FEE_RATES, VOLUMES, HOLDER_SHARES, or DEFAULT_SPLIT above to explore other scenarios.');
}

main();

module.exports = {
    totalFee: totalFee,
    holderPool: holderPool,
    holderReward: holderReward,
    FEE_RATES: FEE_RATES,
    VOLUMES: VOLUMES,
    HOLDER_SHARES: HOLDER_SHARES,
    DEFAULT_SPLIT: DEFAULT_SPLIT
};

# OFA Tokenomics Modeling (Scenarios, Not Promises)

Status: PROPOSED / modeling only. Nothing in this document is a promised return, a guaranteed yield, or final tokenomics. All figures are mathematical scenarios based on simple percentage math, intended to help the team pick a fee structure. Actual results depend on real trading volume, SOL price, and holder distribution, none of which can be predicted.

## 1. Method

Total daily fee = Daily Volume (USD) x Total Fee Rate. This section models total fee generated across a range of daily volumes and total fee rates. It does not yet decide how that fee splits between holders, treasury, and liquidity/ecosystem - that split is modeled separately in Section 2, and clearly labeled illustrative.

## 2. Total Daily Fee Generated (USD), By Volume and Fee Rate

| Daily Volume | 1% | 1.5% | 2% | 2.5% | 3% | 3.5% | 4% | 5% |
|---|---|---|---|---|---|---|---|---|
| $10,000 | $100 | $150 | $200 | $250 | $300 | $350 | $400 | $500 |
| $100,000 | $1,000 | $1,500 | $2,000 | $2,500 | $3,000 | $3,500 | $4,000 | $5,000 |
| $500,000 | $5,000 | $7,500 | $10,000 | $12,500 | $15,000 | $17,500 | $20,000 | $25,000 |
| $1,000,000 | $10,000 | $15,000 | $20,000 | $25,000 | $30,000 | $35,000 | $40,000 | $50,000 |
| $5,000,000 | $50,000 | $75,000 | $100,000 | $125,000 | $150,000 | $175,000 | $200,000 | $250,000 |
| $10,000,000 | $100,000 | $150,000 | $200,000 | $250,000 | $300,000 | $350,000 | $400,000 | $500,000 |
| $50,000,000 | $500,000 | $750,000 | $1,000,000 | $1,250,000 | $1,500,000 | $1,750,000 | $2,000,000 | $2,500,000 |

## 3. Illustrative Fee Split (NOT Final)

For the purpose of modeling holder rewards, this section assumes an illustrative split of 50% to holders, 30% to treasury/operations, and 20% to liquidity/ecosystem. This is a placeholder for discussion, chosen for round numbers, not a decision. It is deliberately similar in spirit to (but not copied from) the observed IMG split (docs/research/IMG_POSTMORTEM.md section 3), so that comparisons in Section 6 are meaningful. The final split is an open question in docs/ROADMAP.md.

At a 2% total fee rate (chosen as a mid-range reference point, not a recommendation), the holder-reward pool (50% of total fee) by volume:

| Daily Volume | Total Fee (2%) | Holder Pool (50%) | Treasury (30%) | Liquidity/Ecosystem (20%) |
|---|---|---|---|---|
| $10,000 | $200 | $100 | $60 | $40 |
| $100,000 | $2,000 | $1,000 | $600 | $400 |
| $500,000 | $10,000 | $5,000 | $3,000 | $2,000 |
| $1,000,000 | $20,000 | $10,000 | $6,000 | $4,000 |
| $5,000,000 | $100,000 | $50,000 | $30,000 | $20,000 |
| $10,000,000 | $200,000 | $100,000 | $60,000 | $40,000 |
| $50,000,000 | $1,000,000 | $500,000 | $300,000 | $200,000 |

## 4. Per-Holder Reward Scenarios (Mathematical Only)

Daily reward for a holder = Holder Pool x (holder's share of eligible supply). "Eligible supply" means the portion of supply counted for reward purposes (see docs/REWARD_ENGINE.md for eligibility rules - e.g. whether liquidity-pool-held tokens or team-held tokens are excluded). These figures use the 2% fee / 50% holder-pool assumption from Section 3 and are daily USD figures, not annualized, not compounded, and not a promise of continued volume.

| Holder's Share of Eligible Supply | Daily Volume $100,000 | Daily Volume $1,000,000 | Daily Volume $10,000,000 |
|---|---|---|---|
| 0.01% | $0.10 | $1.00 | $10.00 |
| 0.1% | $1.00 | $10.00 | $100.00 |
| 0.5% | $5.00 | $50.00 | $500.00 |
| 1% | $10.00 | $100.00 | $1,000.00 |
| 2% | $20.00 | $200.00 | $2,000.00 |
| 5% | $50.00 | $500.00 | $5,000.00 |

These are point-in-time daily figures at a specific, hypothetical volume level. Actual annualized outcomes depend entirely on future volume, which cannot be predicted or promised, and which historically has been highly volatile for comparable tokens (see the IMG postmortem's ATH-to-current drawdown of roughly 99%).

## 5. Round-Trip Trading Cost, By Fee Rate

A simple buy-then-sell round trip pays the total fee rate twice (once on entry, once on exit), before considering price impact or slippage:

| Total Fee Rate | Approx. Round-Trip Cost |
|---|---|
| 1% | ~2% |
| 1.5% | ~3% |
| 2% | ~4% |
| 2.5% | ~5% |
| 3% | ~6% |
| 3.5% | ~7% |
| 4% | ~8% |
| 5% | ~10% |

## 6. Discussion: Where Should OFA Land?

IMG's flat 5% (docs/research/IMG_POSTMORTEM.md) implies a ~10% round-trip cost on every trade, applied even to plain transfers. Section 5 above shows that cost roughly doubles between a 2.5% and 5% fee. Lower fees produce a smaller holder-reward pool per dollar of volume (Section 2), but plausibly encourage more volume by reducing friction, which is the core tension the project brief asks us to model rather than resolve by assumption. This document does not pick a final number. docs/adr/001-reward-fee-architecture.md tracks the open decision on how the fee is levied (trade-level vs. transfer-level); the specific percentage is a separate, still-open decision that should be revisited once direct DBC integration testing (docs/ARCHITECTURE.md) gives the team real data on how fee rate affects observed trading behavior on comparable configurations.

## 7. Explicit Disclaimers

- Nothing in this document is investment advice or a guaranteed or expected return.
- - "Daily volume" scenarios are hypothetical inputs chosen to span a wide range, not a forecast of OFA's actual volume.
  - - SOL-denominated rewards will fluctuate in USD terms with the SOL price; this document uses USD throughout purely to keep the arithmetic simple and comparable across scenarios.
    - - These tables should be regenerated by the tokenomics simulator (see scripts/tokenomics-simulator.html) once real fee-split and eligibility rules are finalized, rather than hand-edited.
      - 

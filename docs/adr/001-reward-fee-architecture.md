# ADR 001: Reward Fee Architecture

Status: PROPOSED

Date: 2026-08 (August 2026)

## Context

OFA needs a mechanism that takes a share of value from trading activity and turns it into holder rewards. There are three broad ways to implement the fee that funds those rewards, and the project brief explicitly asks us not to default to the pattern IMG used (a flat token-level tax applied to every transaction type including plain transfers) without comparing alternatives. See docs/research/IMG_POSTMORTEM.md and docs/research/METEORA_DBC.md for supporting research.

## Options Considered

### Option A: Token-level transfer tax

Implemented via a Token-2022 extension (e.g. a transfer-fee-style extension) or a transfer-hook program that runs on every transfer, including plain wallet-to-wallet movement, not just swaps. This is the pattern IMG uses.

### Option B: Pool/trading-level fee

Implemented via the DBC bonding-curve trading fee and/or the migrated DAMM v2 pool's own trading fee. This fee only applies to swaps against the curve/pool - a plain transfer between two wallets is not a swap and is not fee-generating.

### Option C: Hybrid

A small or zero token-level tax combined with the primary fee living at the pool/trading level - for example, keeping a transfer mechanism available for future flexibility but defaulting its rate to zero, while the trading-level fee does the real work.

## Comparison

| Dimension | A: Token-Level Tax | B: Trading-Level Fee | C: Hybrid |
|---|---|---|---|
| Security | Transfer hooks add executable code to every transfer, larger attack surface | Fee logic lives inside audited Meteora programs, smaller custom surface | Same as B, plus optional dormant transfer-tax code that must still be reviewed even if set to zero |
| Wallet compatibility | Some wallets/tools historically mishandle Token-2022 transfer fees or hooks; user confusion risk | No special wallet handling required beyond standard swap flows | Same as B if the transfer-tax path is inactive; same risk as A if ever activated |
| Jupiter compatibility | Historically, fee-on-transfer/hook tokens have caused routing or quoting friction on aggregators | Directly compatible - Jupiter already routes through DBC/DAMM pools | Same as B while the transfer tax is inactive |
| DEX compatibility | Extra integration work for any venue to handle correctly | Native - it is just the pool's own fee | Same as B while inactive |
| CEX compatibility | Transfer-fee tokens have a documented history of listing/custody friction, since exchanges must move tokens internally without unexpectedly losing value to tax | No special CEX handling needed for a standard SPL/Token-2022 mint without transfer fees | Same as B while inactive |
| Token-2022 compatibility | Requires the transfer-fee extension or a transfer-hook program specifically | Compatible with plain Token-2022 (no transfer-fee extension needed) | Compatible, with the extension present but configured to zero |
| Arbitrage / market-making friction | Every rebalancing transfer is taxed, discouraging tight markets | Only actual swaps are taxed; internal transfers by market makers are not penalized | Same as B while inactive |
| Computational complexity | Extra on-chain logic runs on every transfer | Fee logic already exists inside Meteora's programs | Slightly higher due to unused-but-present code paths |
| Development complexity | OFA must build/maintain transfer-fee or transfer-hook logic | OFA configures existing DBC/DAMM fee parameters only | Same as A for the dormant path, plus B for the active path |
| Audit complexity | Custom transfer logic must be audited | Smaller custom surface (see docs/ARCHITECTURE.md) | Larger than B because the dormant path still needs review |
| UX | Users are taxed even for benign actions like consolidating wallets | Users are only taxed when they trade, matching "trading generates rewards" | Matches B as long as the transfer tax stays at zero |
| Attack surface | Larger - a transfer hook is executable code triggered on every transfer | Smaller - relies on Meteora's existing, more heavily used programs | Larger than B, smaller than a fully active Option A |

## Decision

PROPOSED (not yet finalized): default to Option B - fund holder rewards from DBC/DAMM trading-level fees, not a token-level transfer tax, and do not adopt a Token-2022 transfer-fee extension or transfer hook unless a specific, documented product need emerges that trading-level fees cannot satisfy. This is consistent with docs/research/METEORA_DBC.md's finding that DBC/DAMM fees only apply to swaps, and with the project brief's explicit preference for "trading generates rewards" over taxing ordinary transfers.

This decision is marked PROPOSED rather than ACCEPTED because it has not yet been validated against a working devnet integration, and because the exact fee rate (see docs/TOKENOMICS.md) is a separate, still-open decision.

## Consequences

- OFA's token contract can likely remain a plain Token-2022 or SPL Token mint with no custom transfer logic, keeping the audited custom-code surface limited to the reward engine (docs/REWARD_ENGINE.md) rather than the token itself.
- - Reward funding depends entirely on trading volume through the DBC/DAMM pools, not on total transfer activity - this must be reflected accurately in docs/TOKENOMICS.md's modeling, which already uses "daily volume" rather than "daily transfer count" as its input.
  - - If a future feature genuinely requires a transfer hook (for example, some form of on-chain reputation or anti-bot logic), this ADR should be revisited with a new ADR rather than silently reversed.
   
    - ## Open Questions
   
    - - Should any transfer-level mechanism exist at all, even at zero rate, for future flexibility, given that Section 11 above shows it adds audit and compatibility surface even when inactive? Recommendation pending devnet testing.
      - - Final confirmation that Jupiter and target CEX/DEX venues have no special requirements for the specific Token-2022 configuration OFA ends up choosing (plain mint vs. mint with unused extensions).
        - 

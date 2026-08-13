# Solana Launchpad Comparison - August 2026

Status: Research draft. Compiled from official launchpad sites, developer docs, and secondary press coverage during August 2026. Confidence varies by row; see notes under each platform. Ranking reflects OFA's specific priorities (holder rewards, SOL rewards, fee control, custom UI, low platform cut), not general popularity or volume.

## 1. Method

Nearly every actively-used Solana launchpad found in this research (Bags, Believe, Jupiter Studio, and others) is built as a UI/partner layer on top of Meteora's Dynamic Bonding Curve (DBC) rather than a competing bonding-curve implementation. Since DBC config creation is permissionless (see docs/research/METEORA_DBC.md), "use a launchpad" and "integrate directly with DBC from our own frontend" are two points on the same spectrum, not fundamentally different technologies. The comparison below treats "Direct Meteora DBC integration" as its own row alongside third-party launchpads.

For platforms named in the OFA project brief that produced no independently verifiable information in this research pass (SendShot, Dialect, Trendex, Split, DiviLauncher), we report that fact honestly rather than fabricating a comparison. They are listed at the bottom as unverified.

## 2. Comparison Table

| Platform | Built on DBC | Native Holder Rewards | SOL Rewards | Fee Control | Locked LP | DAMM v2 | Jupiter Routing | Anti-Sniper | Platform Cut | Custom UI |
|---|---|---|---|---|---|---|---|---|---|---|
| Direct Meteora DBC (custom frontend) | Yes (native) | No - custom build required | Possible (quote mint) | Full - we control the config | Yes, per DBC migration rules | Yes | Yes, once liquid | Yes (fee scheduler / rate limiter) | None beyond Meteora's built-in 20% protocol fee | Full - it is our own frontend |
| Bags.fm | Yes | No - creator/team fee splits only, not a holder mechanism | Possible (quote mint) | Configurable creator fee, plus multi-wallet fee-split feature | Per DBC/DAMM migration | Yes (via DBC) | Yes | Inherits DBC config | Reported ~1% of trading volume to creator "forever"; platform's own cut not fully itemized in sources reviewed | Limited - primarily Bags' own app/API |
| Believe (formerly Clout/Launch Coin) | Yes | No - creator/"internet capital markets" coin model | Possible (quote mint) | Partner-level config, not fully itemized in sources reviewed | Per DBC/DAMM migration | Yes (via DBC) | Yes | Inherits DBC config | Not fully itemized in sources reviewed; ecosystem-reported partner fees in the tens of millions of dollars across the sector | Limited - Believe's own app |
| Jupiter Studio | Yes | No - creator fee only | Possible (quote mint) | Fixed: 1% total fee split 50/50 between creator and Jupiter | Per DBC/DAMM migration | Yes (via DBC) | Yes (native, Jupiter's own router) | Inherits DBC config | 50% of the 1% fee to Jupiter | Limited - Jupiter's own app, though Jupiter's aggregation still routes to any pool |
| Moonshot | Reported to use Meteora liquidity infrastructure; not independently confirmed as DBC in sources reviewed | No - creator fee only | Possible (quote mint) | Reported creator share around 50% of trading fees in older coverage; current-year figure not independently confirmed | Not confirmed in sources reviewed | Not confirmed | Not confirmed | Not confirmed | Not confirmed | Limited - mobile-first app |
| RevShare (revshare.dev) | Not confirmed - site describes itself as a multi-chain (Solana, Ethereum, Base, BNB Chain, Monad) launch and trading platform with "holder rewards" messaging, but this research pass did not find technical documentation confirming the underlying mechanism | Marketed, mechanism unverified | Not confirmed | Not confirmed | Not confirmed | Not confirmed | Not confirmed | Not confirmed | Not confirmed | Not confirmed |
| SendShot, Dialect, Trendex, Split, DiviLauncher | Unverified | Unverified | Unverified | Unverified | Unverified | Unverified | Unverified | Unverified | Unverified | Unverified |

Cells marked "Not confirmed" or "Unverified" should be treated as open research items, not as "No."

## 3. Ranking For OFA

### 1 - Direct Meteora DBC integration from a custom OFA frontend

This is the strongest fit for OFA's stated priorities: full fee configuration (creator_trading_fee_percentage, base fee mode, collect fee mode), a config we control end-to-end (we become our own "partner"), no extra platform fee layered on top of Meteora's own 20% protocol cut, full compatibility with a custom black/neon-green frontend, and direct access to Jupiter routing once the token is liquid. The tradeoff is engineering effort: OFA has to integrate the Meteora TypeScript SDK / API directly, handle config creation and pool creation transactions, and take on more launch-day responsibility than clicking through a third-party UI. This matches the project brief's stated preference for low platform cut, transparent configuration, and custom-UI compatibility over minimal-code convenience.

### 2 - Bags.fm

Bags is the strongest third-party fallback. It already runs on Meteora DBC, so the underlying mechanics are the same programs OFA would use directly. Its multi-wallet fee-split feature is useful even though it is not a holder-reward feature by itself: it can route the creator's fee share directly to an OFA-controlled reward-vault address instead of a single team wallet, which is a meaningful building block. It has visible adoption (independent tooling like "ClaimScan" was built around tracking unclaimed Bags creator fees, which is a signal of real usage). The cost is a platform-level cut and less control over the end-user launch UI than a fully custom frontend.

### 3 - Jupiter Studio

Jupiter Studio is a reasonable fallback specifically because of Jupiter's routing dominance and brand trust in the Solana ecosystem, which could help distribution and liquidity quality once OFA graduates off the curve. Its fee model is simpler and less configurable (fixed 1% split 50/50 with Jupiter) than Bags or a direct integration, and creator-fee-only design means OFA would still need the same custom holder-distribution component regardless of using Jupiter Studio.

## 4. Cross-Cutting Finding

No platform reviewed in this research - including direct Meteora DBC - natively distributes trading fees proportionally to all token holders based on wallet balance alone. Every option produces a stream of quote-token (SOL/USDC) revenue to a partner and/or creator address; turning that into "every OFA holder can see SOL_CLAIMABLE and press CLAIM SOL" is custom work under any of the options above. This reinforces the recommendation in docs/research/METEORA_DBC.md and docs/REWARD_ENGINE.md: choose the launch venue based on fee control, cost, and UX, not on the false expectation that any of them eliminates the need for a custom reward engine.

## 5. Confidence Notes

- Bags, Believe, and Jupiter Studio figures come from a mix of official docs and independent tech press/reviews (CryptoSlate, DEV Community, DEXTools, Gate.com, Token Dispatch) found during this research pass; exact current fee splits should be re-verified against each platform's own live documentation before any integration decision.
- - Moonshot's Meteora integration and current fee structure could not be confirmed to the same standard as Bags/Believe/Jupiter Studio in this pass and needs dedicated follow-up research.
  - - RevShare.dev is a real, live site as of this research, but its "holder rewards" claim is marketing copy from its landing page; no technical documentation describing the underlying distribution mechanism was located. It should not be assumed to solve OFA's holder-distribution problem until independently verified.
    - - No evidence of SendShot, Dialect (as a launchpad), Trendex, Split, or DiviLauncher was found under those names in this research pass. They may be misremembered names, very new/low-visibility platforms, or discontinued. Do not cite them as existing Solana launchpads until independently confirmed.
      - 

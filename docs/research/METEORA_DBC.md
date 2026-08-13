# Meteora Dynamic Bonding Curve (DBC) - Research Notes

Status: Research draft, compiled August 2026 directly from current Meteora developer documentation (docs.meteora.ag). All claims below are sourced from official Meteora documentation pages read during this research pass; program IDs and numeric limits are quoted from those pages and should be re-verified against docs.meteora.ag before any production use, since on-chain programs and limits can change.

## 1. What DBC Is

Dynamic Bonding Curve (DBC) is Meteora's permissionless token launch product. A token launches into a virtual, program-managed bonding curve rather than a manually seeded AMM pool. Buys and sells move the token along a configurable curve of up to 16 active price segments. Once accumulated quote-token reserves (e.g. SOL or USDC) reach a configured migration threshold, the pool "graduates" and liquidity migrates into a real Meteora DAMM v1 or DAMM v2 pool.

The current DBC mainnet program ID, per official docs: dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN.

## 2. Why This Matters for OFA

DBC bundles several launch problems that OFA would otherwise need to build from scratch: on-chain price discovery, anti-sniper fee shaping, configurable fee splits between a launch partner and the token creator, automatic migration into permanent liquidity, and native Token-2022 support (including transfer-hook pools). Reusing DBC instead of writing a custom bonding-curve or AMM program is consistent with OFA's stated preference for battle-tested infrastructure over custom financial code.

## 3. Permissioning (Important Finding)

Per the official "DBC Accounts and Permissions" documentation: "Any payer can create a config account." Creating a DBC launch config is a permissionless action - it does not require approval from Meteora or from any third-party launchpad. A launchpad (like Bags, Believe, or Jupiter Studio) is a convenience/UI/partner-fee layer on top of DBC, not a required gatekeeper.

This means OFA has two realistic integration paths:
1. Launch directly against the DBC program using Meteora's SDK/API from a custom OFA frontend, configuring OFA itself as the "partner" (fee claimer).
2. 2. Launch through an existing DBC-based launchpad (see docs/research/LAUNCHPAD_COMPARISON_AUG_2026.md), trading some configurability and taking on a platform fee cut in exchange for a ready-made UI, distribution, and less custom code.
  
   3. ## 4. Fees
  
   4. DBC trading fee = Base Fee + optional Dynamic Fee. Fee rates are stored as numerators over 1,000,000,000 (a 0.25% fee is stored as 2,500,000). The bonding-phase minimum base fee is 0.25% and the maximum total fee is capped at 99%.
  
   5. Base fee modes available: a fee scheduler (linear or exponential decay, or a constant/"fixed" pattern), and a rate limiter mode where fee increases with buy size during a configured launch window. An optional dynamic fee can layer on top of either mode to respond to volatility.
  
   6. Fee distribution on every bonding-curve swap: Protocol receives 20% of the total trading fee. A referral fee, when present, is paid out of that protocol share (not in addition to it). The remaining 80% ("non-protocol" fee) is split between Partner and Creator according to a configured creator_trading_fee_percentage - if that percentage is 0%, the partner gets the entire non-protocol fee; if it is set higher, the creator gets that share and the partner gets the rest. Partner, creator, and protocol trading fees accrue continuously and can be claimed as they accrue, without waiting for migration.
  
   7. Separately, DBC supports an optional pool-creation fee (paid once, split between protocol and partner) and a migration fee (taken from the migration quote amount when the pool graduates, split between partner and creator, plus a fixed 0.2% protocol liquidity migration fee that is deducted from what goes into the migrated pool).
  
   8. Important nuance: none of these fee categories are "holder rewards." They are Protocol / Referral / Partner / Creator allocations only. Whoever controls the partner and creator claim authorities receives SOL or the quote token - by default, nobody but the configured partner/creator wallets. Distributing any portion of that revenue to ordinary OFA holders is not a DBC feature; it requires OFA to build its own downstream reward engine that receives the partner/creator fee share and then re-distributes it. This is the central technical fact behind section 9-10 of the OFA project brief ("Creator Rewards != Holder Rewards").
  
   9. ## 5. Migration and Liquidity
  
   10. When the quote reserve reaches the configured migration threshold, normal DBC trading stops and the pool moves through lifecycle states (PreBondingCurve -> PostBondingCurve or LockedVesting -> CreatedPool) before liquidity is deposited into a DAMM v1 or DAMM v2 pool. DBC enforces that at least 10% of migrated liquidity must remain locked after one day, and DAMM v2 vesting locks can last up to 2 years. DAMM v1 migration is restricted to plain SPL Token base and quote mints; DAMM v2 is required for Token-2022 launches. Withdrawal of any unused ("leftover") fixed-supply tokens after migration is a permissionless instruction, but funds can only be sent to the config's pre-declared leftover_receiver address - it cannot be redirected to an arbitrary wallet after the fact.
  
   11. ## 6. Token-2022 and Transfer Hooks
  
   12. DBC can launch either plain SPL Token or Token-2022 base mints. Token-2022 launches that need a transfer hook (a custom program that runs on every transfer) use a separate "ConfigWithTransferHook" template and a "TransferHookPool" account type, and always migrate to DAMM v2. The base mint's transfer hook is revoked automatically when the bonding curve completes. This is directly relevant to OFA's question of whether a token-level transfer tax is feasible: a Token-2022 transfer hook could theoretically apply logic on every transfer (including plain wallet-to-wallet movement), which is exactly the "flat tax on everything" pattern IMG used and which the OFA brief asks us to avoid defaulting to. DBC's own trading fees, in contrast, only apply to swaps against the DBC curve or the migrated DAMM pool - not to plain transfers - which is a better match for "trading generates rewards, transfers don't."
  
   13. ## 7. Stake2Earn (m3m3) - Fee Sharing With Stakers
  
   14. Meteora also operates a separate program, informally called Stake2Earn (SDK package @meteora-ag/m3m3, on-chain program stake_for_fee), that lets a pool creator lock DAMM v1 LP into a program-owned escrow so that holders who stake the pool's base token can earn a share of the released LP trading fees. Key constraints found in official docs:
   15. - Stake2Earn only supports DAMM v1 constant-product pools where the quote mint is SOL or USDC.
       - - Reward participation is based on a ranked "top staker list," with a configurable list length between 5 and 1,000 entries, and a hard limit of 10,000 tracked full-balance entries.
         - - Fee release happens over a configurable drip duration between 6 hours and 31 days, and unstaking has its own configurable cooldown in the same range.
          
           - This is the closest thing Meteora offers to a native "holder reward" primitive, but it has two properties that make it an imperfect fit for OFA's stated goal of rewarding all eligible holders proportionally: (1) it requires an explicit staking action rather than rewarding passive holding, and (2) it is capped at a maximum of 10,000 tracked accounts and prioritizes a top-N staker list rather than guaranteeing every holder, however small, participates. A project with hundreds of thousands of holders (a scale the OFA brief explicitly asks us to plan for) would not be fully served by Stake2Earn alone. It is also DAMM v1-only, while Token-2022 launches are required to migrate to DAMM v2, which is a direct compatibility conflict if OFA's base token uses Token-2022.
          
           - ## 8. Direct Answer to the Core Architecture Question
          
           - Can "OFA trade -> DBC/launchpad fee -> SOL revenue -> holder reward allocation -> reward vault -> OFA holders -> claim SOL" be achieved entirely with existing infrastructure and no custom program at all?
          
           - Answer: NO, not entirely, based on the evidence gathered in this research pass. DBC and DAMM reliably get quote-token (SOL/USDC) revenue into a partner or creator wallet without custom code. Stake2Earn can share DAMM v1 LP fees with a bounded set of stakers, but does not cover DAMM v2, does not cover all holders unconditionally, and requires staking rather than holding. Getting from "SOL sitting in a partner/creator wallet" to "proportionally claimable by every OFA holder, including holders who never take any extra action" requires OFA to build and audit a minimal custom reward-distribution component. Section 10-12 of the OFA project brief anticipates this; see docs/REWARD_ENGINE.md and docs/adr/001-reward-fee-architecture.md for the proposed minimal design.
          
           - ## 9. Open Items For Deeper Verification
          
           - - We read documentation pages directly; we did not independently call the DBC or Stake2Earn programs on devnet during this research pass. Numeric limits and fee formulas should be re-checked against the live SDK/IDL before implementation.
             - - We did not find, in this pass, an official Meteora fee-sharing primitive that pays proportionally to all SPL/Token-2022 holders based on wallet balance alone (as opposed to staked balance or LP position). If such a feature exists elsewhere in Meteora's product suite, it was not surfaced by this research and should be re-checked.
               - 

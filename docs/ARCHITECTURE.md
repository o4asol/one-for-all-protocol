# OFA Architecture (Proposed)

Status: PROPOSED / research-stage. No production token, program, or account referenced in this document exists yet. This document describes the intended system shape based on docs/research/METEORA_DBC.md and docs/research/LAUNCHPAD_COMPARISON_AUG_2026.md, so it will change as research and prototyping continue.

## 1. Summary

OFA is composed of three layers that already have a natural separation of concerns:

1. Token and liquidity layer - a Meteora Dynamic Bonding Curve (DBC) launch, migrating to a Meteora DAMM v2 pool, handling price discovery, trading, and liquidity. This layer is existing, audited, battle-tested infrastructure. OFA does not fork or reimplement it.
2. 2. Reward engine layer - a minimal, custom, security-reviewed component that (a) receives OFA's share of trading-fee revenue in the quote asset (SOL at launch), (b) calculates each eligible holder's entitlement, and (c) lets holders claim their share. This is the only layer that needs custom financial code, per the finding in docs/research/METEORA_DBC.md section 8.
   3. 3. Frontend/transparency layer - the public website showing balances, claimable rewards, and protocol-wide statistics, plus a transparency dashboard exposing every address and configuration parameter that matters (docs/SECURITY.md, section 20 of the project brief).
     
      4. ## 2. Component Diagram (Text Form)
     
      5. Trader swaps OFA on the DBC curve or migrated DAMM v2 pool
      6.   -> DBC/DAMM collects a trading fee in the quote asset (SOL)
      7.     -> Configured shares are claimed by protocol/partner/creator addresses (Meteora-native, see docs/research/METEORA_DBC.md)
      8.   -> OFA's creator/partner share is claimed into an OFA-controlled Reward Intake Address
      9.     -> Reward Intake Address periodically funds the Reward Vault (see docs/REWARD_ENGINE.md)
      10.   -> Off-chain indexer computes each eligible holder's proportional entitlement from on-chain balance snapshots
      11.     -> Entitlement is published either as an on-chain accumulator or a signed/Merkle claim structure
      12.   -> Holder calls CLAIM SOL from the OFA frontend, which submits a claim transaction against the Reward Vault
      13.     -> Reward Vault pays out SOL directly to the holder's own wallet (non-custodial - the vault never holds a holder's OFA tokens)
     
      14. ## 3. Why This Split
     
      15. Reusing DBC/DAMM for everything except holder distribution follows the project brief's explicit preference for existing, battle-tested infrastructure over custom financial code. It also means the highest-risk custom code OFA ships is scoped narrowly: a reward vault and a claim mechanism, not a bonding curve, not an AMM, not routing, not a custom token-transfer tax program. Smaller custom surface area means a smaller audit scope and a smaller attack surface.
     
      16. ## 4. Token Layer Decisions (Proposed)
     
      17. - Token standard: Token-2022, without a transfer hook, unless research in a later milestone proves a transfer hook is required. Rationale: docs/research/METEORA_DBC.md section 6 shows transfer hooks add complexity and DAMM v2-only migration, and the project brief prefers taxing trades, not transfers - which argues against needing a hook at all. A plain Token-2022 mint (or even plain SPL Token) paired with DBC's own trading-fee collection, rather than a token-level transfer fee extension, is the current default recommendation. This must be revisited once the Reward Engine design in docs/REWARD_ENGINE.md is finalized.
          - - Mint authority: intended to be revoked (set to null) after any required initial configuration is complete, so supply cannot be inflated later. This mirrors the IMG postmortem's observation that its own mint authority is not active.
            - - Freeze authority: default assumption is also revoked unless a specific, documented reason to keep it is identified and reviewed under docs/SECURITY.md.
              - - Launch venue: direct Meteora DBC integration from OFA's own frontend is the current top recommendation (docs/research/LAUNCHPAD_COMPARISON_AUG_2026.md, ranking section), with Bags.fm as the documented fallback if direct integration proves too slow to build safely.
               
                - ## 5. Reward Engine Layer Decisions (Proposed)
               
                - Full design lives in docs/REWARD_ENGINE.md. At the architecture level, the key decisions are:
               
                - - Model: claim-based (holders accumulate entitlement and pull funds) rather than push-based (protocol proactively sends to every wallet), because push does not scale to large holder counts without prohibitive transaction and compute costs (see docs/REWARD_ENGINE.md section 3 for the comparison).
                  - - Reward asset: modeled as a configurable parameter (rewardAsset), defaulting to SOL, so that a future move to USDC or another crypto-native SPL asset does not require a full redesign. See docs/REWARD_ENGINE.md section 6.
                    - - Accounting: a hybrid of off-chain indexing (to compute entitlement from historical balances efficiently) with on-chain verification (so no holder has to trust the off-chain indexer blindly - claims are verified against on-chain state or a published, auditable snapshot root).
                      - - Control: reward-asset changes, vault configuration changes, and any pause/upgrade capability are proposed to sit behind a multisig and, where practical, a timelock - never a single hot wallet - per docs/SECURITY.md.
                       
                        - ## 6. Frontend/Transparency Layer
                       
                        - The public frontend (see Section 19 of the project brief for visual direction) reads on-chain state directly wherever possible instead of trusting a centralized API for financial numbers. The minimum dashboard surface is: OFA_BALANCE, ELIGIBLE_OFA, SOL_EARNED, SOL_CLAIMABLE, TOTAL_SOL_CLAIMED, TOTAL_SOL_DISTRIBUTED_BY_PROTOCOL, and a CLAIM_SOL action. During development, all numbers are explicitly labeled as mock data until real on-chain state exists; see docs/ROADMAP.md for when that changes.
                       
                        - A separate transparency page lists every address and authority that matters: token mint, DBC/DAMM pool addresses, reward vault, treasury (if any), mint/freeze authority status, multisig signers, and links to this repository and any future audit reports.
                       
                        - ## 7. What Is Explicitly Out Of Scope
                       
                        - - Any production deployment, mint, or fund movement (see the project brief's absolute rule).
                          - - Stocks, RWAs, tokenized securities, or any reward asset that is not a crypto-native SPL asset.
                            - - Wash trading, fake volume, or any artificial metric generation, in the simulator or in production.
                              - - A custom AMM, custom bonding curve, or custom router - these are provided by Meteora/Jupiter and should not be reimplemented.
                               
                                - ## 8. Open Questions
                               
                                - - Final choice between direct DBC integration and a launchpad fallback (owner: engineering, blocked on a small proof-of-concept devnet integration, not on legal/financial approval).
                                  - - Whether a transfer hook is ever justified for a future feature (owner: engineering + security review, not urgent).
                                    - - Final reward-asset governance mechanism (multisig composition, timelock duration) - see docs/SECURITY.md and requires human sign-off before any mainnet relevance.
                                      - 

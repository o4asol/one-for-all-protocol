# OFA Reward Engine (Proposed Design)

Status: PROPOSED. This is the one component of OFA that is not "just reuse existing infrastructure" (see docs/research/METEORA_DBC.md section 8). It is therefore the highest-scrutiny piece of custom code in the project and must be treated as financial software: reviewed, tested, and never deployed to mainnet without explicit human approval.

## 1. Requirements Recap

The frontend needs to show, per wallet: OFA_BALANCE, ELIGIBLE_OFA, SOL_EARNED, SOL_CLAIMABLE, TOTAL_SOL_CLAIMED, and protocol-wide TOTAL_SOL_DISTRIBUTED, plus a CLAIM_SOL action. The invariant that must never be violated: distributed rewards + claimable rewards + remaining allocated (unclaimed) rewards must never exceed funded rewards, and no wallet may claim more than its legitimate entitlement.

## 2. Push vs. Claim

Push model: the protocol proactively sends SOL to every eligible holder's wallet on some schedule.
Claim model: the protocol accumulates each holder's entitlement in a verifiable form, and the holder submits a transaction to withdraw it whenever they want.

Push does not scale. At 1,000 holders, a push distribution is a few thousand transactions - manageable. At 100,000 holders, it is 100,000+ transactions per distribution cycle, with real compute and transaction-fee costs, and at 1,000,000 holders it becomes both expensive and slow, and produces large numbers of "dust" transfers for small balances that cost more in network fees than they deliver in value. Claim scales because cost is borne per-claim, by the claimant, only when they choose to claim, and holders with dust-sized entitlements can simply not claim (or the system can enforce a minimum claim threshold) instead of forcing a payout no one asked for.

Recommendation: claim model, matching the preference already stated in the project brief.

## 3. Scaling Comparison

| Holder Count | Push Feasibility | Claim Feasibility |
|---|---|---|
| 1,000 | Feasible, low cost | Trivially feasible |
| 10,000 | Expensive but possible | Feasible |
| 100,000 | Impractical at reasonable cost/frequency | Feasible - cost is distributed to claimants |
| 1,000,000 | Not practical | Feasible with an efficient entitlement data structure (Section 5) |

## 4. Accounting Model Options

Option A - Pure on-chain accounting: every holder has a per-wallet account tracking accrued entitlement, updated whenever fees are funded and whenever balances change. This is simple to reason about and fully on-chain-verifiable, but requires an update to every holder's account whenever their balance changes (a transfer), which reintroduces some of push's scaling problem onto ordinary token transfers - exactly the friction the project brief wants OFA to avoid.

Option B - Off-chain indexing + on-chain verification (recommended direction): an off-chain indexer (something OFA operates, or something built from public infrastructure like a Solana RPC/geyser-based indexer) computes, at each snapshot or epoch boundary, every eligible wallet's balance and resulting entitlement for that period. That computation is published as a compact, verifiable structure - most commonly a Merkle tree, where the root is written on-chain and each holder's claim is a Merkle proof against that root. The claim instruction verifies the proof on-chain before releasing funds, so the indexer is a convenience, not a trust requirement. No per-holder on-chain account has to be touched until a holder actually claims.

Option C - Hybrid streaming accumulator (e.g. a "reward-per-token" running value, similar in spirit to standard staking-reward-per-token designs used across DeFi): a single global accumulator increases every time new SOL is funded, scaled by total eligible supply; each holder's claimable amount is computed on-demand as (current global accumulator - the holder's last-claimed accumulator value) x their balance at claim time. This avoids needing snapshots or a new Merkle tree every epoch, but requires the holder's balance to be read correctly at claim time and requires care so that transferring tokens does not let a holder claim rewards twice, once as the sender and once as the receiver, for the same accrued period.

Recommendation: prototype Option C for its operational simplicity, but validate it specifically against the double-claim and buy/sell-mid-period edge cases in Section 6 before considering Option B unnecessary. Either B or C is preferable to A. This must be validated with real tests (docs/SECURITY.md, docs/TESTING references) before any devnet deployment.

## 5. Handling Scale (Up To ~1,000,000 Holders)

- Snapshots/epochs (Option B) bound the amount of work per distribution cycle to "compute a tree over N holders," which is off-chain and can be done at any scale; only the root goes on-chain.
- - A streaming accumulator (Option C) bounds on-chain work to O(1) per claim, independent of total holder count, at the cost of more careful per-transfer accounting logic (typically handled by requiring a "harvest" step on transfer/transfer-hook, or by accepting that transfers effectively reset accrual for the moved tokens - an explicit design choice that must be documented and tested, not left implicit).
  - - Either way, the OFA token contract/mint itself should not need to change or be touched by the reward engine's internal accounting - keeping the reward engine and the token mint decoupled is part of why direct DBC integration (docs/ARCHITECTURE.md) does not require a custom token program.
   
    - ## 6. Edge Cases That Must Be Tested (Not Just Discussed)
   
    - - A holder buys mid-epoch: they should not receive full-epoch rewards for tokens they only held for part of the period, unless the design explicitly chooses simple end-of-epoch-balance accounting and documents that tradeoff.
      - - A holder sells mid-epoch: they should not lose entitlement they already legitimately accrued before selling.
        - - A holder transfers between their own two wallets: should not create free extra entitlement, and should not be exploitable by rapidly moving balances between many addresses to claim disproportionately (a Sybil/flash-balance attack).
          - - Dust balances: claims below a minimum economic threshold should be handled explicitly (e.g. accrue until above a minimum claimable amount) rather than allowed to create unprofitable, spam-prone claim transactions.
            - - Double claims: the on-chain claim instruction must mark entitlement as consumed atomically with the payout, and this must be tested under concurrent/duplicate submission.
              - - Unauthorized claims: only the legitimate holder (verified via their signature and their actual balance/proof) may claim their own entitlement - never an address supplied by an unauthenticated caller.
                - - Reward-vault depletion: the vault must never approve a claim it cannot fund; funded vs. claimable vs. distributed accounting (Section 1's invariant) must be enforced on-chain, not just assumed by off-chain bookkeeping.
                  - - Rounding: fractional-lamport rounding must consistently favor the vault (never allow cumulative rounding to let total claims exceed total funded amounts).
                   
                    - ## 7. Modular Reward Asset
                   
                    - `rewardAsset` should be a configuration value, not a hardcoded constant, so that a future move to USDC or another approved crypto-native SPL asset is a configuration change plus a new deployment of the same audited logic, not a rewrite. This project explicitly excludes stocks, RWAs, or tokenized securities as reward assets (see project brief section 1 and docs/research/REGULATORY_CONSIDERATIONS.md). Changing `rewardAsset` is a sensitive operation and must be gated the same way as any other sensitive configuration change - see Section 8.
                   
                    - ## 8. Governance Of Sensitive Parameters
                   
                    - Reward-asset changes, vault upgrade authority, and any pause capability should sit behind a multisig, and ideally a timelock that gives holders visible advance notice before a change takes effect. A single hot wallet with unilateral control over the reward vault is explicitly called out as a top risk in docs/SECURITY.md and must not be the production design. The specific multisig composition (number of signers, who holds keys) is an open decision requiring human input - this document does not, and cannot, choose that for the team.
                   
                    - ## 9. What This Document Does Not Do
                   
                    - It does not write production Rust/Anchor program code, does not deploy anything, and does not decide the final accounting model (B vs. C) without a working devnet prototype and tests. Those are the next reversible engineering milestones tracked in docs/ROADMAP.md.
                    - 

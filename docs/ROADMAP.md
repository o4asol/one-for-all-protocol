# OFA Roadmap

Status: living document. No step below implies a launch date or a promise. The absolute rule from the project brief remains in force at every stage: do not launch OFA, do not deploy to mainnet, do not spend or move production funds, and do not handle production keys or seed phrases, until a human explicitly approves that specific step.

## Phase 0 - Research and Scaffolding (This Session)

- [x] Create the one-for-all-protocol GitHub repository with base scaffolding (README, LICENSE, .gitignore).
- [ ] - [x] Research Infinite Money Glitch (IMG) and publish docs/research/IMG_POSTMORTEM.md.
- [ ] - [x] Research current Meteora DBC and publish docs/research/METEORA_DBC.md.
- [ ] - [x] Compare current Solana launchpads and publish docs/research/LAUNCHPAD_COMPARISON_AUG_2026.md.
- [ ] - [x] Research regulatory considerations (non-legal-advice) and publish docs/research/REGULATORY_CONSIDERATIONS.md.
- [ ] - [x] Publish docs/ARCHITECTURE.md, docs/TOKENOMICS.md, docs/REWARD_ENGINE.md, docs/SECURITY.md, and docs/adr/001-reward-fee-architecture.md as PROPOSED drafts.
- [ ] - [ ] Publish an initial tokenomics simulator (static, client-side only, mock data) - see Phase 1.
- [ ] - [ ] Human review of all Phase 0 documents and open questions below.

- [ ] ## Phase 1 - Prototyping (Proposed Next Steps, Reversible/Devnet-Only)

- [ ] - Build a static tokenomics simulator (HTML/JS) implementing the formulas in docs/TOKENOMICS.md so the team can adjust fee % and volume assumptions interactively, without hand-editing markdown tables.
- [ ] - Stand up a minimal devnet-only proof of concept: create a DBC config and virtual pool on devnet (not mainnet) to validate the integration path described in docs/ARCHITECTURE.md, using throwaway devnet keys only.
- [ ] - Prototype the reward-engine accounting model (docs/REWARD_ENGINE.md Option B vs. C) with unit tests covering the edge cases in docs/REWARD_ENGINE.md section 6, on devnet/local validator only.
- [ ] - Begin the frontend shell (visual direction from the project brief: black/neon-green terminal aesthetic) wired to mock data only, clearly labeled as mock in the UI itself.

- [ ] ## Phase 2 - Hardening (Blocked On Phase 1 Results)

- [ ] - Independent code review of the reward engine.
- [ ] - Expand docs/SECURITY.md based on real code, not just the pre-implementation threat model.
- [ ] - Decide the final fee rate and fee split (docs/TOKENOMICS.md, docs/adr/001-reward-fee-architecture.md) with real devnet data, not just modeling.
- [ ] - Decide the final launch venue (direct DBC integration vs. Bags.fm fallback) based on Phase 1 engineering experience, not just the desk research in docs/research/LAUNCHPAD_COMPARISON_AUG_2026.md.
- [ ] - Human decision on multisig composition and any timelock parameters (docs/SECURITY.md, docs/REWARD_ENGINE.md section 8).
- [ ] - Third-party security audit of any program intended for mainnet use.

- [ ] ## Phase 3 - Launch Readiness (Requires Explicit Human Approval At Every Step)

- [ ] - Legal review of docs/research/REGULATORY_CONSIDERATIONS.md's open questions with qualified counsel.
- [ ] - Finalized, non-mock transparency dashboard wired to real (initially devnet, later mainnet-candidate) on-chain state.
- [ ] - A documented, human-approved go/no-go decision before any mainnet action. No AI agent working on this repository is authorized to make that decision or execute it unilaterally.

- [ ] ## Open Questions Requiring Human Input

- [ ] - Final legal entity / structure (if any) for the project, and jurisdiction - this affects docs/research/REGULATORY_CONSIDERATIONS.md's open items directly.
- [ ] - Final brand/name clearance: the working name "ONE FOR ALL" should be checked for trademark conflicts before being treated as permanent branding (project brief section 3).
- [ ] - Multisig signer selection (who actually holds keys) - this cannot be decided by an AI agent.
- [ ] - Final fee rate and fee split - Phase 2 decision, needs real data plus human judgment call.
- [ ] - Reward asset governance process (Section 13/14 of the project brief) - specific mechanism (multisig-only vs. multisig+timelock vs. something else) needs a human decision.

- [ ] ## Explicitly Not Scheduled

- [ ] Nothing in this roadmap schedules a mainnet launch date. Launch timing is a human decision made after Phase 2 and Phase 3 are genuinely complete, not a target this roadmap is optimizing toward.
- [ ] 

# ONE FOR ALL (OFA)

A community-oriented, experimental, open-source Solana holder-reward protocol.

Core principle: trading generates the power. Holders inherit it.

## Status: Research and Architecture Only. NOT LAUNCHED.

There is no production $OFA token, no deployed mainnet program, and no live liquidity. This repository currently contains research, proposed architecture, and documentation. Nothing here is investment advice, a guaranteed return, or a promise of future performance. See docs/ROADMAP.md for the current phase and docs/SECURITY.md for the project's security posture.

## What Is OFA

OFA proposes a simple mechanism: trading activity involving the OFA token generates protocol fee revenue, and a configured share of that revenue is distributed to eligible OFA holders as SOL, with the reward asset designed to be configurable rather than permanently hardcoded (see docs/REWARD_ENGINE.md). The intended end-user experience is a dashboard showing OFA_BALANCE, ELIGIBLE_OFA, SOL_EARNED, SOL_CLAIMABLE, TOTAL_SOL_CLAIMED, and TOTAL_SOL_DISTRIBUTED_BY_PROTOCOL, plus a CLAIM_SOL action.

## Why Research First

Before writing any custom financial code or touching mainnet, this project researched an existing comparable protocol (Infinite Money Glitch / $IMG) and the current Solana launch/liquidity ecosystem (Meteora's Dynamic Bonding Curve and the launchpads built on it), in order to avoid reinventing infrastructure that already exists and to learn from a real prior example's strengths and weaknesses. See docs/research/.

## Repository Map

docs/research/ holds the IMG postmortem, Meteora DBC research, launchpad comparison, and non-legal-advice regulatory research. docs/ARCHITECTURE.md describes the proposed system architecture. docs/TOKENOMICS.md contains fee and reward modeling scenarios that are explicitly not final tokenomics and not promises. docs/REWARD_ENGINE.md proposes the design for the one custom, security-critical component of this project. docs/SECURITY.md holds the threat model and AI-agent operating rules. docs/ROADMAP.md tracks the phased plan and open questions requiring human input. docs/adr/ holds architecture decision records. The app/, sdk/, programs/, tests/, and scripts/ directories are currently mostly empty scaffolding for future work; see each directory's own README for details.

## Absolute Rule

This project does not launch a token, deploy to mainnet, spend or move production funds, generate or store seed phrases, expose private keys, mint production supply, revoke production authorities, or execute any irreversible production transaction as part of normal research and development. Any such action requires explicit, informed human approval outside of routine repository activity. See docs/SECURITY.md and docs/ROADMAP.md.

## Contributing

See CONTRIBUTING.md.

## License

MIT - see LICENSE.

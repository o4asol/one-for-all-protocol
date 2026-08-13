# programs/

This directory will hold OFA's own on-chain program(s) - expected to be limited to the reward engine (reward vault + claim logic) described in docs/REWARD_ENGINE.md. It is currently empty. No token/bonding-curve/AMM program belongs here; those are provided by Meteora (see docs/research/METEORA_DBC.md and docs/ARCHITECTURE.md).

Nothing in this directory may be deployed to mainnet without explicit human approval, a completed security review, and (for anything handling pooled holder funds) a third-party audit. Devnet/local-validator deployment for testing is fine per docs/SECURITY.md section 3.

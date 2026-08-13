# tests/

This directory will hold automated tests for anything in programs/ and sdk/, especially the reward engine. It is currently empty because no reward-engine code exists yet.

Per docs/SECURITY.md section 5 and docs/REWARD_ENGINE.md section 6, once reward-engine code exists, tests here must cover at minimum: reward calculations, multiple holders, changing balances, buys, sells, transfers, dust amounts, very large balances, rounding, repeated claim attempts, double-claim attempts, unauthorized claim attempts, reward-vault depletion scenarios, unauthorized configuration-change attempts, reward-asset change attempts, and malformed accounts. The core invariant every test suite must protect: distributed + claimable + remaining allocated rewards must never exceed funded rewards, and no wallet may claim more than its legitimate entitlement.

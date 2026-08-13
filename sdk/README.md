# sdk/

This directory will hold a thin TypeScript SDK wrapping: (1) Meteora DBC/DAMM SDK calls needed for OFA's launch configuration and pool interactions, and (2) client helpers for the OFA reward engine (building claim transactions, reading entitlement, reading protocol-wide stats). It is currently empty.

Per docs/ARCHITECTURE.md, this SDK should not reimplement bonding-curve, AMM, or routing logic - it wraps Meteora's own official SDK/API and adds only what is specific to OFA's reward engine.

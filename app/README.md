# app/

This directory will hold the OFA frontend (the public dashboard and claim UI described in docs/ARCHITECTURE.md section 6). It is currently empty.

Planned stack and rules, per docs/ROADMAP.md Phase 1:
- Reads on-chain state directly wherever possible instead of trusting a centralized API for financial numbers.
- - Ships with all figures explicitly labeled as mock data until real on-chain state exists (see NEXT_PUBLIC_USE_MOCK_DATA in .env.example).
  - - Visual direction: black background, neon/electric green accents, terminal-inspired, minimal, original artwork only - no copyrighted characters or imagery (see project brief section 3 and 19).
    - - No wallet auto-signing, no blind-signing prompts; every transaction the UI builds should be human-readable in the connecting wallet before the user approves it.
      - 

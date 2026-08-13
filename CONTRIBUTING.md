# Contributing to ONE FOR ALL (OFA)

Thanks for your interest in this project. OFA is experimental, research-stage, open-source software for a proposed Solana holder-reward protocol. No production token exists yet. Please read docs/ROADMAP.md and docs/SECURITY.md before contributing.

## Ground Rules

- No production keys, seed phrases, or real secrets in any commit, issue, or PR. Use `.env.example` as a template; real `.env` files are git-ignored.
- - Treat any change touching the reward engine, fee configuration, or anything financial as sensitive: it needs tests and review, not just a quick PR.
  - - This project explicitly does not launch a token, deploy to mainnet, or move funds as part of normal development. See the absolute rule in docs/ROADMAP.md.
    - - Keep marketing language honest: no guaranteed-return claims anywhere in code, docs, or UI copy (see docs/research/REGULATORY_CONSIDERATIONS.md section 5).
     
      - ## Branching
     
      - `main` is the stable branch. Please branch from `main` using a descriptive prefix:
      - - `research/*` for research documents (e.g. `research/img-postmortem`)
        - - `docs/*` for documentation and architecture (e.g. `docs/protocol-architecture`)
          - - `feat/*` for new functionality (e.g. `feat/reward-dashboard`)
            - - `fix/*` for bug fixes
             
              - ## Commits
             
              - Use short, descriptive, conventional-style commit messages, for example:
              - - `docs: add IMG protocol postmortem`
                - - `feat: add tokenomics simulator`
                  - - `fix: correct rounding in reward engine`
                   
                    - ## Pull Requests
                   
                    - Open a PR against `main` and describe what changed and why. Do not merge unfinished or unreviewed work, especially anything touching reward calculations, fee configuration, or authority/permission logic. Link to the relevant doc (e.g. docs/REWARD_ENGINE.md, docs/adr/001-reward-fee-architecture.md) when a change implements or revises a documented design decision.
                   
                    - ## Testing Expectations
                   
                    - Any code touching reward calculations must include tests for the edge cases listed in docs/REWARD_ENGINE.md section 6 and docs/SECURITY.md section 5 (dust, rounding, double claims, unauthorized claims, vault depletion, and so on) before it can be merged.
                   
                    - ## Reporting Security Issues
                   
                    - See docs/SECURITY.md section 1. Do not open a public issue with exploit details for a serious vulnerability; use the more limited-disclosure path described there instead.
                    - 

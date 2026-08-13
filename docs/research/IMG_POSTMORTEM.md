# IMG Postmortem: Infinite Money Glitch ($IMG)

Status: Research draft. Compiled August 2026 from public, third-party-verifiable sources.
Purpose: Extract engineering and economic lessons for the ONE FOR ALL (OFA) reward protocol.

This document separates claims into four categories: CONFIRMED FACT (directly observed on-chain or via primary/official sources), STRONG EVIDENCE (consistent across multiple independent secondary sources), REASONABLE INFERENCE (a logical conclusion drawn from confirmed data, not stated outright by any source), and SPECULATION (plausible but unverified; must not be treated as fact).

## 1. Sources Consulted

- On-chain data via Solscan for the IMG mint (Token-2022 program).
- - Official project site (imgsolana.com), snapshot taken August 2026.
  - - CoinGecko market and metadata pages for IMG.
    - - DEX aggregator listings referenced by CoinGecko (Raydium, Meteora DAMM v2).
      - - General web search results (CoinMarketCap, Kraken, Coinbase, OKX, GeckoTerminal listing pages).
       
        - ## 2. Identity and On-Chain Basics
       
        - CONFIRMED FACT
        - - Token: Infinite Money Glitch, ticker IMG.
          - - Mint address: znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh.
            - - Token program: Token-2022 (TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb), confirmed via Solscan "Token Extensions: TRUE" and Owner Program field.
              - - Decimals: 6.
                - - First mint timestamp: 2025-02-19 03:01:28 UTC (Solscan).
                  - - Creator wallet: 6rCzKkKyYUTEX4cw3yBS9ShLYrvPUoo9Hb67wfkhB1Wc (Solscan "Creator" field).
                    - - Max supply: 1,000,000,000 IMG. Circulating/current supply observed at research time: approximately 978.85M, roughly 2% below max supply.
                      - - Solscan reports mint "Authority: N/A" for the token at research time, consistent with no active mint authority.
                       
                        - REASONABLE INFERENCE
                        - - The gap between max supply (1B) and current supply (~978.85M) is consistent with the project's advertised burn mechanism having removed roughly 2% of supply since launch, rather than a pre-mine adjustment. This is an inference from the numbers, not an on-chain-confirmed causal link.
                         
                          - ## 3. Advertised Economic Design
                         
                          - CONFIRMED FACT (from the official project site, imgsolana.com, August 2026 snapshot)
                          - - The project advertises a flat 5% tax applied to buys, sells, and transfers.
                            - - Rewards are advertised as distributed to holders on a 6-hour cycle.
                              - - A volume-driven burn mechanism is advertised as reducing circulating supply over time.
                                - - The site's live fee-split dashboard showed an approximate allocation of 50% to holder rewards, 40% to an "Infra Wallet," and 10% to an on-chain incinerator/burn address at the time of this research. This is a live, dashboard-reported figure and may change; it should be treated as a snapshot, not a permanent protocol parameter.
                                  - - The mechanism is implemented using Token-2022's extension model rather than an external smart contract, according to the project's own description.
                                   
                                    - REASONABLE INFERENCE
                                    - - Because Token-2022 fee/extension logic executes at the token-program level, reward collection does not depend on a separate custom program processing every transfer, which plausibly reduces one category of smart-contract risk relative to older "reflection token" designs on standard SPL Token. This is a plausible technical property of Token-2022, not a claim we independently audited for this specific mint.
                                     
                                      - ## 4. Market History
                                     
                                      - CONFIRMED FACT (CoinGecko, snapshot August 2026)
                                      - - All-time high: $0.04172. All-time low: $0.0001842.
                                        - - Price at research time was roughly 98.9% below the all-time high.
                                          - - Market capitalization at research time was approximately $447,000-$470,000, against a fully diluted valuation of the same magnitude (supply is not meaningfully inflating).
                                            - - 24-hour trading volume at research time was approximately $1,200-$1,700 - i.e., market cap is roughly 300-400x daily volume, indicating very thin, low-activity trading at this stage of the token's life.
                                              - - Primary trading venues identified: Raydium (IMG/WSOL, IMG/USDC, IMG/PENGU pairs) and Meteora DAMM v2 (IMG/USDC, IMG/OGDOGE pairs).
                                                - - Holder count at research time: approximately 21,000-23,000 addresses (Solscan reported 21,259; the project's own site reported approximately 22.8K; the discrepancy likely reflects different snapshot times or counting methodology).
                                                 
                                                  - STRONG EVIDENCE
                                                  - - Search engine results reference pages for IMG on Kraken, Coinbase, and OKX. These appear to be price-index/informational pages rather than confirmed evidence of active order-book trading on those centralized exchanges. We could not confirm genuine CEX spot trading of IMG from the sources reviewed, and this should not be assumed.
                                                   
                                                    - REASONABLE INFERENCE
                                                    - - A ~99% drawdown from all-time high combined with daily volume roughly three orders of magnitude smaller than market cap is consistent with a token that experienced a sharp speculative peak followed by a long tail of declining attention - the "boring volume" phase OFA needs to be able to survive.
                                                      - - Because 24h volume is so low relative to supply and holder count, the SOL rewards currently being generated for holders are almost certainly a small fraction of what they were during the token's peak activity period. This directly illustrates the "lower attention -> lower volume -> smaller rewards -> weaker holding incentive" side of the flywheel described in the OFA project brief.
                                                       
                                                        - SPECULATION (unverified - flagged explicitly, not to be treated as fact)
                                                        - - Specific claims about why IMG initially went viral (e.g., particular influencer campaigns) were not independently verified beyond the existence of third-party promotional YouTube content referencing the token roughly a year before this research. We found no primary source confirming coordinated marketing spend, team identity, or team conduct after launch.
                                                          - - We found no verifiable evidence, in either direction, of a "community takeover" of the project, insider selling, or team abandonment. Any such claim circulating elsewhere should be treated as unconfirmed unless a primary source is found.
                                                           
                                                            - ## 5. The Flywheel, Applied to IMG
                                                           
                                                            - The brief for this research describes a flywheel:
                                                           
                                                            - high volume -> fees -> SOL rewards -> attractive holding proposition -> attention -> volume
                                                           
                                                            - and its reverse:
                                                           
                                                            - lower attention -> lower volume -> smaller rewards -> weaker holding incentive -> selling -> lower attention
                                                           
                                                            - IMG's current data (very low volume relative to a ~$450K market cap and ~99% drawdown from all-time high) is consistent with the token having entered the reverse leg of this flywheel. A flat 5% tax that felt sustainable at peak volume becomes a heavier relative burden on the remaining trading activity once volume collapses, because every remaining trade pays the same friction while the reward pool it feeds has shrunk.
                                                           
                                                            - ## 6. What IMG Got Right (Reasonable Inference from Design + Adoption)
                                                           
                                                            - - Implementing the tax and reward accounting at the Token-2022 program level, rather than through a bolted-on external contract, is a legitimate technical simplification versus older SPL "reflection" tokens.
                                                              - - A single, simple headline mechanic ("hold, earn every 6 hours, burn with volume") is easy to market and easy to understand, which plausibly contributed to its initial holder count (tens of thousands of addresses).
                                                                - - Pairing a claimable/distributed reward with a deflationary burn gives holders two distinct value narratives (yield and scarcity) instead of one.
                                                                 
                                                                  - ## 7. What OFA Should Do Differently
                                                                 
                                                                  - - Do not assume a flat, uniform tax rate is the right default. Section 6 of the OFA tokenomics research models multiple fee levels (1%-5%) specifically because IMG's flat 5% on every transaction type (including plain transfers) is a plausible source of friction that a lower, trading-focused fee could avoid.
                                                                    - - Separate "trading generates rewards" from "moving tokens between your own wallets costs money." IMG taxes transfers the same as trades; OFA's architecture (see docs/adr/001-reward-fee-architecture.md) should evaluate whether pool-level trading fees can substitute for a token-level transfer tax.
                                                                      - - Publish holder-reward-pool health (funded vs. distributed vs. claimable) transparently and continuously, not only during high-attention periods, so the community can evaluate sustainability during the "boring volume" phase rather than being surprised by it.
                                                                        - - Avoid describing a reward rate that implies a fixed schedule (like a flat 6-hour cycle) as guaranteed; frame it as an engineering parameter that depends on actual trading volume.
                                                                         
                                                                          - ## 8. Open Questions for Future Research
                                                                         
                                                                          - - We have not obtained a full authority report (freeze authority, all extension configuration) for the IMG mint beyond what Solscan's summary view exposes; a deeper on-chain audit would need direct RPC queries against the mint account.
                                                                            - - We have not confirmed the exact history of IMG's liquidity migration between Raydium and Meteora DAMM v2, or whether Meteora DBC was used at launch (DBC's mainnet program was not necessarily live in its current form in February 2025; this needs direct confirmation before being stated as fact).
                                                                              - - Team identity and post-launch team conduct remain unconfirmed from the sources available in this research pass.
                                                                                - 

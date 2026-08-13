## IMPORTANT: THIS IS NOT LEGAL ADVICE

This document is engineering-team research about publicly discussed regulatory topics relevant to a fee-sharing crypto token. It is not legal advice, is not exhaustive, and must not be relied on as a substitute for a licensed attorney. Anything below marked as a "question for counsel" must be resolved with a real lawyer before OFA finalizes tokenomics, marketing language, or launches anything.

# Regulatory Considerations - OFA Research

Status: Research draft, August 2026. This document separates engineering-level observations (things we can factually describe about how the system works) from legal questions (things only a qualified attorney can answer). It does not reach conclusions on legal questions.

## 1. Why This Document Exists

OFA proposes to take a share of trading activity and distribute a crypto asset (initially SOL) to holders of another crypto asset (OFA). That structure sits close to several areas of US regulatory attention: securities law, money transmission, and tax/reporting obligations. The goal of this document is to flag those areas honestly so the team asks the right questions before launch, not to design around them.

## 2. Securities Law - Question For Counsel

Engineering observation: OFA's proposed design involves buying a token, and receiving a share of protocol-generated revenue (SOL) based on holding it. Historically, US regulators and courts have used tests such as the Howey test (an investment of money, in a common enterprise, with an expectation of profit derived from the efforts of others) to evaluate whether an arrangement is a security. Whether any specific token structure meets that test is a fact-specific legal determination.

Question for counsel: Does a token that automatically shares protocol trading-fee revenue with holders create a materially different securities-law risk profile than a token with no such mechanism? Does the answer change depending on whether the fee-sharing is described as automatic/protocol-level versus discretionary/team-controlled?

Engineering-level design choices that plausibly reduce (but do not eliminate) this category of risk, subject to legal review:
- Avoiding any language that promises profit, fixed yield, or guaranteed returns (see Section 5).
- - Making the reward mechanism fully on-chain, transparent, and non-discretionary once deployed, rather than a team promise to pay out revenue later.
  - - Not marketing OFA as an investment, security, or "passive income" product.
   
    - ## 3. Money Transmission - Question For Counsel
   
    - Engineering observation: OFA does not currently plan to custody user funds, exchange fiat, or operate as an intermediary moving value between third parties on their behalf outside of on-chain, non-custodial smart contract logic that any holder can independently verify and interact with directly.
   
    - Question for counsel: Does operating a claim mechanism (even a non-custodial, on-chain one) that aggregates trading fees and later releases them to holders create any state or federal money-transmission licensing consideration, especially if a team-controlled key can pause, configure, or influence the reward vault?
   
    - Engineering-level note: the more centralized control OFA's reward vault retains (e.g., a single hot wallet that can withdraw at will) the more this question matters. Section 13 of docs/REWARD_ENGINE.md and this project's security posture (docs/SECURITY.md) recommend multisig/timelock control specifically to reduce this category of risk, subject to legal review.
   
    - ## 4. Tax and Information Reporting - Question For Counsel
   
    - Engineering observation: Receiving SOL as a reward, and later disposing of OFA or SOL, are both events that may be taxable to the recipient in various jurisdictions, and reward-generating protocols have historically drawn scrutiny regarding whether the protocol operator has any reporting obligations about payments made to users.
   
    - Question for counsel: Does distributing SOL to holders create any tax information-reporting obligation for the OFA project/team/DAO in the jurisdictions where team members or the legal entity (if any) are based? What disclosures, if any, should the frontend show users about their own tax responsibility?
   
    - Engineering-level note we can state factually: OFA does not plan to withhold taxes, file on behalf of users, or act as a broker. The frontend should include a plain-language disclaimer that users are responsible for their own tax obligations, without that disclaimer being treated as a substitute for the legal analysis above.
   
    - ## 5. Marketing Language - Engineering Guidance We Can Set Ourselves
   
    - Unlike the sections above, this section is something the team can act on directly without waiting for legal sign-off, because it is about honesty rather than a legal test.
   
    - Do not use, in any OFA-controlled channel:
    - - "Guaranteed returns," "guaranteed yield," "guaranteed APY," or "risk-free."
      - - Specific promised percentage returns of any kind.
        - - Language implying OFA is professionally managed on holders' behalf for profit ("our team invests your rewards for you").
          - - Comparisons to bank interest, dividends, or other regulated financial products' guarantees.
           
            - Do use:
            - - Clear, current, on-chain-verifiable numbers (funded vs. distributed vs. claimable), labeled as historical facts, not forward guarantees.
              - - Explicit "this is not investment advice, this is experimental software" framing, consistent with the README.
                - - Clearly labeled mathematical scenarios in docs/TOKENOMICS.md rather than promised outcomes.
                 
                  - ## 6. Sanctions / Eligibility - Question For Counsel
                 
                  - Question for counsel: Does OFA need any wallet-screening, geofencing, or terms-of-service restrictions (e.g., excluding sanctioned jurisdictions) for the claim frontend, given that it will handle SOL distribution? What, if anything, is standard practice for comparable non-custodial Solana protocols?
                 
                  - ## 7. What OFA Will Not Do (Regardless Of Legal Analysis)
                 
                  - Independent of the open legal questions above, the project brief and this research explicitly rule out: designing the reward mechanism to intentionally evade a regulatory classification, fabricating volume or holder metrics to influence perceived legitimacy, and using any legal ambiguity as a justification to mislead holders about how the system works. These are engineering-ethics commitments, not legal conclusions.
                 
                  - ## 8. Summary Table
                 
                  - | Topic | Type | Status |
                  - |---|---|---|
                  - | Securities classification of holder fee-sharing | Legal question | Open - needs counsel |
                  - | Money transmission exposure of the reward vault | Legal question | Open - needs counsel |
                  - | Tax reporting obligations for the project | Legal question | Open - needs counsel |
                  - | Sanctions / eligibility screening needs | Legal question | Open - needs counsel |
                  - | Marketing language avoiding guaranteed-return claims | Engineering guidance | Can implement now |
                  - | Non-discretionary, transparent, on-chain reward logic | Engineering/design goal | Can implement now, still subject to legal review of overall structure |
                  - 

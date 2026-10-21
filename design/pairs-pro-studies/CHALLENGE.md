# Pairs Pro — open design challenge

Copy this entire brief into another design/coding agent. The task is to create **one original competing design**, not to implement a production frontend. The existing twenty studies are reference competitors, not a mandatory visual template.

## Your assignment

You are a senior product designer who can build high-fidelity, interactive HTML prototypes. Create a new Pairs Pro design direction that is cleaner, sharper and easier to understand than the existing wireframes. Optimize for visual hierarchy, restraint, financial readability and a coherent journey. This is purely a visual and interaction design experiment.

Pairs Pro helps people inspect and manage liquidity-provider positions across concentrated-liquidity pools. The everyday holder wants to know: What do I own? How has it changed? Where is it allocated? What can I do next? A manager needs a denser workspace to configure base/limit ranges and preview changes. The product should feel useful to a holder before it looks impressive to a protocol engineer.

First propose three genuinely different visual theses in one sentence each. Choose the strongest, explain the choice in at most 100 words, then build it. Continue to the finished artifact without waiting for aesthetic approval. Do not stop at a plan or a moodboard.

## Resources

If working in this repository, use these paths relative to `/Users/taylorluk/workspace/pairs-pro`:

- Existing 20-entry gallery: `design/pairs-pro-studies/index.html`.
- Design review and screen rationale: `design/pairs-pro-studies/README.md`.
- Shared μi component CSS: `design/pairs-pro-studies/framework/mui.css`.
- Existing full briefs: `design/pairs-pro-studies/PROMPTS.md`.
- Fixture content: this brief below; `design/pairs-pro-studies/src/studio.js` can clarify labels and interactions.
- Original wireframe: https://decouple.co/design/pairs-pro/.
- Experiment-format reference: https://miaai-lab.github.io/MiniMax-M3.1-Flash-100-HTML-Files/.

For a different environment, use the attached `pairs-pro-studies.zip` as the resource bundle. The only required framework resource is `framework/mui.css`; retain it as the common base. State any resource you could not inspect. Do not imply that a reference was reviewed if it was unavailable.

Study enough of the current work to identify two concrete visual weaknesses and an unoccupied direction. Do not simply recolor one existing entry. You may reuse the sample data and common controls, but create your own composition and visual thesis. Specify what changes in hierarchy, typography, spacing, row composition and chart treatment.

## Required output: seven screens in one HTML

| ID | Device / canvas | Screen | Core job |
| --- | --- | --- | --- |
| M01 | Mobile 390 × 844; also usable at 360px | Portfolio | **Most important:** personal value, time-qualified change, three positions, next step. |
| M02 | Same mobile canvas | Pools | Search and compare token pairs, venue, liquidity, price and estimated APY. |
| M03 | Same mobile canvas | Pool detail | Price chart, ranges, pool/vault totals, own position and primary action. |
| M04 | Same mobile canvas | Deposit | Token inputs, balance feedback, expected shares and review dialog. |
| M05 | Same mobile canvas | Withdraw | Shares to withdraw, token outputs, instant / waiting / claimable example states. |
| D01 | Desktop 1440 × 900 | Pool workspace | Broad chart and holdings table alongside personal position and actions. |
| D02 | Desktop 1440 × 900 | Strategy settings | Anchor / Range / Weight / Exposure groups with adjacent preview and review. |

The entry must contain all seven, with a full-board view and a way to focus each screen. Phones may scroll internally, but headings and the next action should remain easy to find. Desktop canvases may scale on a smaller display. The gallery chrome is not the product UI; clearly distinguish it from the simulated screens.

Use the existing **μi HTML/CSS component layer**, not React Material UI. Theme it with tokens and restrained component rules. Add only the CSS/JavaScript needed for this prototype. One self-contained HTML embeds μi CSS, your CSS, JavaScript and SVG charts. No build step or dependency installation should be necessary to open the final entry. Use system fonts and inline vector charts; no external fonts, CDNs, imagery or runtime network calls.

## Fixed demonstration content

Use this fixture so visual comparisons are fair. Preserve meaning and quantities; improve labels and grouping where justified. All numbers and charts are illustrative and visibly labelled Demo.

- Portfolio value: **$12,480.22**. Deposited capital: $11,862.14. Sample 30-day change: +$618.08 / +5.21%. Estimated 30-day fees: $238.14. Three positions on Base.
- Holdings: WETH/USDC $8,400.00 (+4.82% / 30D, VeloV3 / 0.05%); cbBTC/USDC $2,880.22 (+6.14% / 30D, UniV3 / 0.30%); AERO/USDC $1,200.00 (+5.76% / 30D, VeloV3 / 0.30%). Allocation proportions: 67.3%, 23.1%, 9.6%.
- Main journey: **WETH/USDC, VeloV3, Base**, 0.05% fee. WETH price: 2,431.50 USDC/WETH. 24h sample change: +1.20%. Vault TVL: $2.42M. Underlying pool TVL: $41.0M. Estimated APY over 30 days: 21.1%. Sample vault fees over 30 days: $31.0k.
- Own main-pool position: $8,400.00; sample share price 1.7154 USD/share; available shares 4,896.8170 after downward four-decimal rounding. Underlying amounts approximately 1.7273 WETH and 4,200.00 USDC. Estimated emissions 12.40 AERO, explicitly an estimate rather than an available claim.
- Other discovery rows: WETH/USDC UniV3 0.05%, pool TVL $184.2M, estimated APY 12.4%; cbBTC/USDC UniV3 0.30%, pool TVL $62.1M, estimated APY 8.9%, price 97,412 USDC; AERO/USDC VeloV3 0.30%, pool TVL $9.3M, estimated APY 34.6%, price 1.284 USDC. Do not silently route a different pool to the WETH sample without an explicit prototype notice.
- Sample allocation: base 80%, price range 2,289.70–2,581.80; limit 20%, range 2,446.10–2,540.90. Prices are USDC/WETH by default. A price/tick toggle may use fixed illustrative tick labels; do not imply an engine calculation was performed.
- Default deposit: 0.5 WETH + 1,215.75 USDC, total $2,431.50. Expected shares = total / 1.7154. Minimum shares = expected × 0.995. Review shows exact token approvals, minimum shares, estimated $0.42 fee and 10-minute deadline. Use fixed demo balances, state them, and reject inputs exceeding them.
- Withdraw: input shares; offer 25/50/75/100%. Outputs scale from the sample position; minimum amounts are estimated outputs × 0.995. Separate immediate withdrawal from a queued sample and a settled/claimable sample. Label a different venue/chain explicitly when demonstrating another exit model.
- Config defaults: reference pool WETH/USDC; interval 1 hour; day/hour EMA 20/20; base ATR 5×, limit ATR 3× (both 1–15); chase 67%; offset Base/Limit/Both; complementary base/limit weights 80/20; target base ratio 50%; tolerance 30%; slippage control on; keeper strategy enabled. The range preview is schematic, not a strategy implementation. Saving a config and later allocation are distinct presentation states.
- Optional vault holdings table: base 412.18 WETH + 1,003,200 USDC; limit 0 WETH + 408,110 USDC; unused 1.42 WETH + 2,544 USDC; total 413.60 WETH + 1,413,854 USDC. These are vault holdings, not the user's personal outputs.

## Revision 2 layout requirements (21 October 2026)

Retain the twenty directions in the curated collection. Use compact underline period tabs with generous hit areas. Pool discovery uses separate DEX and network dropdowns. The pool header combines WETH price (with units), vault TVL, underlying pool TVL, estimated APY and vault fees in one metrics bar; stack the same information compactly on phones. Put “Base in range” inside the Blocks position card: identity, a range with min/current/max labels, three aligned information rows and actions. Mobile actions may remain in the bottom dock for reach. Put “Show range” below the chart, right aligned. Use “Withdraw” for the visible exit action; internal contract/API terms are unchanged. Distinguish base/limit band identity from keeper/projected provenance.

## Required interactions and presentation states

Make search/filter, chart type/period, show ranges, price/tick toggle, deposit inputs/review, redeem percentages/state examples and complementary weight editing respond meaningfully. Review modals should reflect entered values. Prototype confirmations end in an explicit simulated result.

Provide a preview-state selector for normal, holder-only, disconnected, wrong-network and unavailable-history examples. A holder-only preview can withdraw while deposit/config controls are unavailable. Missing chart history should not erase separately available current balances and withdrawal examples. Context, source and snapshot can live in one accessible disclosure rather than being repeated beside every metric.

Use semantic HTML, real labels, visible keyboard focus, at least 44 × 44px mobile button targets, readable contrast and status cues beyond color. Choose one dominant action per screen; a discovery list need not invent a global primary button. Respect reduced motion. Avoid microscopic mono text, repeated dashboard tiles, oversized empty cards, decorative crypto art, unnecessary gradients and promotional APY language. Keep USD values, token quantities, percentage changes and their time periods unambiguous.

## Submission and collaboration contract

Write only inside a new unique directory:

`design/pairs-pro-studies/entrants/<agent-or-model>-<direction-slug>/`

Check whether that directory is already owned before starting; choose a new slug if necessary. Do not overwrite the twenty existing entries, gallery, renderer, prompts or framework. Do not change production source, contracts, app defaults or other agents' files. No deployment is requested. Do not contact other agents or create tasks as part of this brief.

Deliver:

1. `index.html` — complete standalone seven-screen entry.
2. `PROMPT.md` — the exact final design prompt and chosen visual thesis; include three initial theses and why this one won.
3. `README.md` — entry name, designer/model if known, two weaknesses addressed, five meaningful departures from existing studies, opening instructions, verification performed and remaining limits.
4. `preview-mobile.png` and `preview-desktop.png` — actual rendered screenshots if browser tools are available. Otherwise state that visual verification remains incomplete; do not fabricate screenshots or results.
5. `entry.json` with `name`, `slug`, `author`, `html`, `screens` (the seven IDs), `framework` (`μi`), `thesis`, `accent`, `previews` and `verification` fields, using relative paths. The curator will integrate selected entries later; do not edit the shared gallery yourself.

Check 390px and 360px phone layouts, the 1440px desktop composition, clipping of values/actions, button target sizes, keyboard access and the required interactions. Report what actually ran. Finish with compact links to the entry, screenshots and notes.

## Judging rubric — 100 points

| Dimension | Points | What wins |
| --- | --- | --- |
| Hierarchy and financial readability | 30 | Value, meaning, timeframe and next action are clear within a glance. |
| Seven-screen coherence | 20 | Mobile and desktop feel like one usable product, not unrelated poster designs. |
| Originality of composition | 20 | A distinct, appropriate visual thesis expressed beyond palette changes. |
| Interaction clarity | 15 | Inputs and states behave intelligibly; reviews reflect the user's choices. |
| Accessibility and narrow-layout craft | 10 | Legible type, focus, contrast, touch targets and no clipped essentials. |
| Restraint and finish | 5 | Precise spacing and alignment, no unnecessary decoration or copy. |

A beautiful portfolio hero alone is insufficient. All seven screens and the common framework are entry requirements. Treat scores as editorial comparison, not measured user preference. Be candid about tradeoffs; aim to win through a clearer product experience.

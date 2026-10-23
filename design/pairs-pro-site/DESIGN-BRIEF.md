# Pairs.pro — homepage design brief

## The proposition

**Sharper AMM LP.**

Create markets. Shape liquidity.

Pairs.pro brings market-aware strategies, on-chain vaults and venue operations together. The commercial audience is the team responsible for a token market or a portfolio of reserve assets. A curator packages those strategies for capital owners.

The page should make that product feel coherent, precise and desirable before it becomes technical.

## What the visitor needs to understand

Within one screen: this is professional AMM liquidity management, driven by market information and inventory.

After the page: the product combines range placement, venue income, external references and vault ownership; it applies to the visitor's market; a call is a useful way to shape a mandate.

The primary question is **What market are you trying to build or operate?**

## One visual thesis

Use a Swiss financial editorial system with an original liquidity instrument. The typography establishes authority. The instrument explains why the product exists. Neither needs decorative crypto imagery.

The governing visual relationship is:

```text
MARKET INFORMATION → STRATEGY → LIQUIDITY POSITION
```

The instrument shows two smooth liquidity envelopes—broad base liquidity and focused liquidity—over a fine tick-level field. The contours, rather than two large rectangular blocks, are the visual subject. A pool-price marker keeps the shape anchored to a market.

Two independent controls change the schematic: asset profile (Spot, Stable, LST/LRT, Volatile) and strategy (Optimal-Range, Market-Aware, Follow-Tick, Vol+). Profiles change concentration, symmetry and tails; strategies change placement and the relationship being explained. LST/LRT covers liquid-staking and liquid-restaking token pairs. wstETH is an LST; do not describe it as restaking exposure.

Market-Aware + LST/LRT adds a small accrual-step interaction: the reference anchor and market price move together on a schematic log-price axis, keeping relative market deviation unchanged. Label the quote WETH per wstETH. This explains the difference between reference accrual and a discount/premium; it does not forecast yield. The [carry-aware design](../../docs/vision/carry-aware-liquidity.md) defines the policy behind the visual.

Keep liquidity intent separate from execution footprint. The fine bars sample a profile at price; they are not individual positions or a claim that the protocol constructs dozens of NFTs. The two envelopes are conceptual layers, not an exact plot of contract liquidity or an executable allocation. Shape precisely. Execute selectively. Position count and rebalance cost belong in the operating story without invented gas savings or a new vault architecture.

This is product vision. The page contains no build-stage labels, implementation registers, status matrices or research scorecards. It also contains no invented performance, partners, TVL or testimonials.

## Composition

### Hero

Make Sharper AMM LP. the dominant typographic object. Place a one-sentence category explanation and Book a call beside the instrument. The instrument should feel like part of the product, not a chart screenshot pasted into a landing page.

The first screen contains brand, proposition, audience, a mechanism and an action. Avoid a long qualification paragraph.

### Product

Explain trend/volatility, inventory and venue economics as three connected decisions. Use aligned editorial columns or a ruled sequence; avoid three generic icon cards.

### Strategy library

Present the strategies in this order: 1. Optimal-Range, 2. Market-Aware, 3. Follow-Tick, 4. Vol+. Give each a distinct job within one family. Aero/MetaDEX-optimized operation remains a venue specialization rather than a fifth strategy. A small selector can change the instrument's emphasis. The text remains readable without interacting.

### Two markets

Use two substantial panels or editorial spreads: build liquidity for an asset; deploy reserve assets into liquidity. Curator/private-vault design follows as the product wrapper around those mandates.

### Conversion

Use Create markets. Shape liquidity. as the hero lead and closing headline. Keep Sharper AMM LP. as the brand line. Book a call remains the single dominant action. Read the whitepaper supplies an alternative for technical visitors.

## Engineering animation

Motion should explain a change in profile or strategy input and its effect. Use a brief sequence with a stable axis, named envelopes and a visible relationship to inventory or fees. Keep both contours smooth as they transition, with fine tick samples subordinate to the lines. Use a dashed base contour and solid focused contour so the layers remain distinguishable without color.

- Optimal-Range: change trend and price movement, then show placement and concentration.
- Market-Aware: compare pool price with a reference and show the intended decision region. For LST/LRT, separate reference accrual from residual market deviation rather than showing a static peg.
- Follow-Tick: show a tick-spaced focused range following pool price; explain Aero/MetaDEX gauge/reward operation as a specialization.
- Vol+: connect volatility/velocity/flow to a schematic fee response.

No animated balance growth, APY counter or always-successful trade path. Label the instrument Schematic. Treat the geometry as explanatory, not a second strategy implementation.

Use one short transition per selection. Pause rather than loop. A static reduced-motion view must retain the full explanation.

## Swiss direction

Use a deliberate grid, asymmetric hierarchy, oversized sans-serif typography, strong spacing and fine rules. Black and warm white form the base. One accent identifies action or a selected relationship.

System or bundled fonts are enough for the study. Good spacing matters more than a fashionable typeface. Use monospaced type only for small instrument labels.

The wordmark is one uninterrupted Pairs.pro: “Pairs” bold at 700 and “.pro” thin at 200. Use a system sans-serif with real light weights for the header and footer wordmarks. Do not make the suffix smaller or insert a space. Normal body mentions of the product retain ordinary text styling.

Avoid rounded card mosaics, glass, gradients, glowing networks, stock candles, token coins and pseudo-scientific microtype.

## CTA and access

Book a call appears in the header, hero and closing. Read the whitepaper is a text link in the hero and closing. Invite only is a quiet access cue. App is a utility link.

The prototype booking action opens a simple conversation panel. Production scheduling details are configured separately. Do not submit information from a design prototype.

## Responsive craft

Desktop uses a twelve-column composition with generous margins. Mobile reorders to headline, explanation, action and instrument. Markets become two consecutive editorial sections, not compressed cards.

Review at 1440 × 1000, 390 × 844 and 360 px wide. Keep body type comfortable, action targets at least 44 px, keyboard focus visible and diagrams meaningful without color alone. Do not make phone readers drag through a miniature desktop chart.

## References

[IRIS](https://iris.credit/) supplies an ambition for mechanism-led presentation and a focused call to action. [Decouple](https://decouple.co/) and [Sense Capital](https://sense.capital/) supply institutional context. Study their purpose; create an original identity and instrument.

The [wireframe](WIREFRAME.md) fixes the content order. The [challenge](CHALLENGE.md) opens the composition to ten competing designs.

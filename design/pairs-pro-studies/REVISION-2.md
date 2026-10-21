# Revision 2 — mobile-first refinement

21 October 2026. All twenty directions retained. This round changes the shared product composition and controls; it does not select a winning theme or turn the studies into a production frontend.

## Round 1 — mobile

Applied compact underline tabs for 7D / 30D / All. The visible tab treatment has no vertical padding or filled pill; buttons retain 44px hit areas. Replaced DEX segments and the static network badge with separate labelled native dropdowns. Both filters combine with search and show a clear empty result for networks absent from this fixture.

Moved WETH price and its units into the same header group as vault TVL, underlying pool TVL, estimated APY and vault fees. The phone uses a full-width price row and a compact 2×2 metrics grid. Review identified excessive repeated captions; trimmed them on mobile while retaining units and 30D labels.

Rebuilt the position card using the Blocks information architecture: identity/status, a min/current/max range, three aligned information rows, share ownership and actions. “Base in range” belongs to this card. The mobile action pair stays in the bottom dock for reach. Visible exit wording is “Withdraw.”

Reference inspected: `mission/design/blocks.js`, `posCard`, `rangeBarFull` and the Position block's common header/bar/three-rows/actions skeleton. This study adapts that information architecture to the existing WETH/USDC fixture.

## Round 2 — desktop

Placed all five metrics in one full-width header bar. Their labels share a common label height and their numeric values align on one baseline. Removed the isolated price hero. Kept the position card beside the main chart with a horizontal Add liquidity / Withdraw action pair.

Moved Show range below the chart, right aligned, on both mobile and desktop. It remains independently operable alongside period and chart-type controls. Reviewed the compact default portfolio tabs and the dark Circuit treatment.

## Round 3 — consistency and interactions

Added explicit dropdown chevrons. Followed withdrawal wording through the screen name, heading, amount label, percentage group, review and activity labels. The review preserves four-decimal share precision. Internal action/function and contract/API names remain unchanged; the earlier story document's visible “Redeem” wording is superseded for these experiments by the user's 21 October request.

Kept base/limit identity separate from keeper/projected provenance. Both band types have a dashed projected segment at the left and a solid keeper-run segment at the right of the illustrative chart. The legend no longer calls the limit band projected by definition.

## Verification

- 20 directions × 390px and 360px phone canvases: 40 layout cases, each with five phone and two desktop frames.
- Checked horizontal overflow, 44px mobile buttons, one dominant action per frame, manager action visibility, aligned desktop metric values, position-only range status, two dropdowns, below-chart/right-aligned range control, compact period padding and Withdraw heading.
- Exercised DEX filtering, network empty state, search composition, hiding ranges across a period change, immediate withdrawal review, waiting/claimable examples and holder/history presentation.
- JavaScript parse check and 200 palette contrast checks pass; minimum palette ratio remains 4.60:1.
- Exact observations and source hashes are in `browser-verification.json` and `verification.json`.

New screenshots: `previews/revision2-mobile-pool.png`, `previews/revision2-mobile-pools.png`, `previews/revision2-mobile-position.png`, `previews/revision2-desktop-pool.png` and `previews/revision2-withdrawal-review.png`. Earlier screenshots remain as baseline records.

Limitations: internal phone canvases rather than physical-device testing; no new usability sessions, print/PDF review or full accessibility certification. All balances, band paths and interaction outcomes remain illustrative.

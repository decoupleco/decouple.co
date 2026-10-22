# Revision 4 — compact headers and studio UX

22 October 2026. All twenty directions retained. Design experiments only.

| Review finding | Applied revision | Evidence |
| --- | --- | --- |
| Pool identity consumes its own tall band | Pair and protocol metadata move into the application header; desktop settings uses the same identity | Desktop header + metrics: 233 → 159 native canvas px, 31.8% shorter |
| Metric definitions compete with values | Order: WETH price · USDC, Pool TVL, Vault TVL, Est. APY · 30D, Fees · 30D; redundant subtitles removed | All twenty directions checked |
| Price stack has too much vertical air | Label/value gap 6px; value/change gap 6.6667px, each one-third less than approved earlier spacing | Computed desktop styles checked |
| Several overview titles collapse to body text | Escape quoted font-family names before placing them in HTML attributes | Orchard, Signal, Tide and Circuit now retain intended families; all20 gallery titles32px at1265px viewport |
| Studio headlines dominate the overview | Smaller type, calmer tracking and line height; study titles retain theme personality | Actual browser capture in previews/revision-4-overview.png |
| Comparing across collections loses orientation | Sticky filter toolbar, visible selection count, Clear, query-preserved collection and full preview links | New10 reload and Clear checked |
| Mobile loses pool context during actions | Compact pool identity on detail, deposit and withdrawal; queued exits show their own Arc / AeroCL2 metadata | Five phone frames ×20themes ×2canvas widths; no horizontal overflow |

## Checks and limits

`node design/pairs-pro-studies/build.mjs`:20 directions,21 standalone HTML files,200 palette comparisons, minimum4.6:1. Browser results: `browser-verification-revision-4.json`. Both desktop views share the header. No change to theme palettes or product flow. Canvas checks cover390/360 widths; they are not native-device testing or fresh verification of every pre-existing control.

TUI overview review and new multi-session workspace: [UX review](../pairs-pro-tui-studies/UX-REVIEW-2026-10-22.md).

# Revision 1 / design review record

2026-10-21. Bounded scope: ten browser-local terminal UI design studies inspired by the supplied backtest TUI brief and screenshots. No engine review or production changes.

## Review rounds

1. **Composition:** created ten distinct panel arrangements with a shared fixture, terminal-style controls and one chart renderer. Preferred Flightdeck as the baseline, Quiet focus for focused replay, Outline for a light console. Existing twenty web designs retained.
2. **Readability:** moved chart-axis labels into fixed-width HTML text rails, separated nearby bounds/current-price labels, reduced dense-mode metadata, fixed grid tracks to account for gaps, and used honest fixed preview dimensions with horizontal scrolling on a narrow browser. Default is 120×40.
3. **Interaction:** verified event links, bounded history, compact secondary switching and full-screen inspector, explicit end reveal, help/Escape, pause/play, time span, comparison and native Tab. Playback does not steal browser focus. Fixed active-control contrast and completed the Amber tape quote board.

## Decisive checks

- `node design/pairs-pro-tui-studies/build.mjs`: 11 standalone HTML files; zero runtime dependencies; 120 text/background palette checks at ≥4.5:1; all 96 cursor prefixes; candle bounds; illustrative end readouts. Full fixture/source hashes: `verification.json`.
- Browser: 10 directions × 4 sizes = **40 cases**, no page overflow, grid overflow or title clipping; every chart retains ≥24 px drawing height. Intentional horizontal scrolling is confined to the preview container.
- First cursor on all ten: no future sample/event elements, all five end-result cells hidden. Representative middle/end interactions and reveal checked. Detailed observations: `browser-verification.json`.
- Actual browser captures: `previews/`.

## Limits / next decision

These checks cover an HTML prototype, not ANSI rendering, terminal capabilities, native keyboard handling, financial attribution, engine equivalence or real backtest correctness. P&L and time paths are explicitly illustrative. The studio implements a documented subset of the source keymap. No real A/B simulation, export or live/paper behavior.

Select one composition before translating it into the native cell renderer. Recommended decision: **Flightdeck as default; borrow Quiet focus compact behavior; retain Outline as the light palette/layout candidate.**

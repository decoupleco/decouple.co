# Omarchy collection / review record

2026-10-21. Scope: ten additional browser-local terminal design variants. Selected from the live Omarchy community catalogue; exact source palette files pinned by commit. Originals remain separate.

## Decisions

- Pair ten actual community palettes with ten Pairs Pro compositions. Colors come from the source files; the financial layouts are our interpretation.
- Add a **Same Flightdeck grid** mode so the reviewer can separate palette preference from panel arrangement.
- Preserve source backgrounds. All eight mapped background/text/accent/semantic roles are checked for membership in their pinned source file before adaptations; local border values are permitted.
- Adapt text colors only as needed for ≥4.5:1 against both terminal surfaces. Record original and adjusted hex values. Most changes are in Solarized Light; small changes affect Flexoki, Cobalt2 and Monochrome.
- Preserve grayscale meaning with hollow/solid candles, benchmark line styles, token boundaries and quote hatching. Shorten the exposure legend to fit narrow instrument panes.
- Shortlist Evergarden for focused replay, Cobalt2 for a full instrument stack, Solarized Light for daylight use. This is a design judgement, not a user-tested ranking.

## Evidence

- `node design/pairs-pro-tui-omarchy/build.mjs`: 11 self-contained HTML files, 10 source palettes / compositions, zero runtime dependencies, source-color provenance checks, 120 contrast pairs ≥4.5:1, 96 fixture-prefix checks, candle bounds and illustrative endpoints. Exact source/fixture hashes and adaptations in `verification.json`.
- Browser: **80 geometry cases** (10 palettes × suggested/fixed layouts × 4 sizes), no page/grid overflow or title clipping; drawing height ≥24 px.
- **40 cursor observations** across ten palettes at cursors 0, 50, 92 and 95. No future sample elements; end cells hidden until finish or explicit reveal.
- Core interactions: compact secondary switch / full-screen info, reveal, help/Escape, native Tab, source table, two-palette comparison. Hollow candle and exposure hatch elements verified in Monochrome.
- Actual screenshot captures in `previews/`; raw browser observations in `browser-verification.json`.

## Limits

HTML composition study, not ANSI/native-cell rendering. Synthetic replay and illustrative attribution. No real engine validation, backtest claims, operating-system installation or live operation. Only the documented subset of the source TUI keymap is implemented. The source catalogue and community palettes may evolve; this collection uses the pinned versions in `sources.json`.

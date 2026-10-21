# Consolidation / Default 10 + Omar 10

2026-10-21. User requested one studio grouped as **All 20**, **Default 10**, **Omar 10**, preserving the twenty existing designs.

## Result

- Canonical studio: `design/pairs-pro-tui-studies/`.
- One rendering implementation, style base, model and builder. Set definitions are separate configuration files under `src/sets/`.
- All 20 names, original layout assignments and mapped palette values match the releases before consolidation (Default at `d5e702f`, Omar at `136abae`). No new theme or composition was substituted.
- One common gallery/control shell. Set labels on thumbnails, URL-persisted set selection, set-aware detail navigation and comparisons across both sets.
- The former Omarchy gallery and ten detail pages redirect to the canonical Omar set. Its duplicate JavaScript renderer, styles and model were deleted; its build command delegates to the canonical builder. Existing default detail URLs still work.
- Both ZIP download paths provide the same consolidated package. Historical evidence remains in version control and legacy evidence files.

## Checks

- Exact preservation comparison: all twenty `name`, `layout`, `bg`, `panel`, `line`, `fg`, `muted`, `accent`, `positive`, `negative`, and `fee` fields match the pre-refactor generated definitions.
- Build: 21 standalone HTML files, 20 unique studies, two sets of ten, 240 terminal text contrast checks at ≥4.5:1, 96 fixture prefixes; same fixture SHA-256 as both previous releases.
- Browser: 20 designs × four sizes = 80 layout checks with no page/grid overflow or title clipping; chart height ≥24 px.
- Set controls show 20 / 10 / 10. Cross-set comparison retains both selections. Omar detail navigation stays within ten entries; All 20 exposes twenty.
- All eleven old Omarchy routes tested in the browser and resolved to the correct canonical path and Omar set.

HTML design experiments only; native terminal rendering and real engine behavior are outside scope. No changes to production or the twenty web UI designs.

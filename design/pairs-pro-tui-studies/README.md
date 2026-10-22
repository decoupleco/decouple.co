# Pairs Pro / consolidated terminal design studio

One gallery and rendering implementation for **All 20**, **Default 10**, and **Omar 10**. These are the same twenty existing studies, organized into sets rather than replaced.

- Default 10: Flightdeck, Split screen, Ledger, Event rail, Lab paper, Quiet focus, Lap timer, Matrix, Amber tape, Outline.
- Omar 10: Bauhaus, Gruvbox Material, Rosé Pine Moon, Flexoki Dark, Catppuccin Dark, Cobalt2, Solarized Light, Evergarden, Vesper, Monochrome. “Omar” labels the Omarchy-inspired set.

Open `index.html`. Set buttons filter the gallery and persist in the URL (`?set=all`, `?set=default`, `?set=omar`). Select two studies across either set to compare. Detail navigation follows the selected set; All 20 lets you move through both sets. The Layout control offers the original composition or a fixed Flightdeck grid.

## Refactor boundaries

The twenty names, original compositions and final mapped palette values are unchanged. Set metadata, gallery navigation, shared rendering and source organization are consolidated. The gallery and controls use the common light studio shell, like the web UI studies. Omar pane accents, hollow Monochrome candles and exposure hatching remain specific to that set.

One renderer: `src/studio.js`. One style base: `src/studio.css`. One model/fixture: `src/model.mjs` and generated `fixture.json`. Set definitions: `src/sets/default.mjs` and `src/sets/omar.mjs`. Omarchy palette sources remain pinned in `sources.json`; all readability adaptations are recorded in the generated `prompts.json` and `verification.json`.

The former `pairs-pro-tui-omarchy` gallery and ten detail URLs redirect to the canonical studio and Omar set. Its builder delegates to this one; its duplicate renderer, styles and model have been removed. Both ZIP download URLs provide the same consolidated bundle.

## Replay and limits

Browser-local illustrative data only. Keyboard replay, stepping, event navigation, inspect/reveal, P&L illustration, history, month-to-date and help are retained. Tab stays native; shortcuts apply only to a focused terminal. At 80×24, price plus one secondary instrument remains; n cycles it and i opens full-screen info. End results are hidden until completion or explicit reveal. Charts and timestamped details stop at the cursor.

Composition sizes are HTML previews using an 8×16 px reference cell, not exact native terminal snapshots. No simulator, wallet, paper/live behavior or actual historical backtest is executed. Financial readouts and attribution are illustrative. Real exports and the remaining expert commands are outside the design scope.

Fixture SHA-256 remains `1701202e73f3539621e5dc7d8247d08130068300e3ace9ae027eb0d9df32a306`.

## Build and evidence

```sh
node design/pairs-pro-tui-studies/build.mjs
python3 -m http.server 8765 --bind 127.0.0.1 --directory design
```

Open `/pairs-pro-tui-studies/`. No dependencies. The builder produces 21 self-contained HTML files and eleven legacy redirects. Standalone HTML files require no assets or network connection.

`verification.json` records set counts, source/fixture hashes, 240 terminal text contrast pairs and 96 fixture-prefix checks. `browser-verification.json` records set filtering, navigation, comparison, sizes and redirects. `CONSOLIDATION.md` records preservation checks and release scope. `PROMPTS.md` and `CHALLENGE.md` support further sets without duplicating the studio.

Previous releases: original TUI `d5e702f`; Omarchy addition `136abae`. Their historical screenshots/review records remain in Git. The twenty web UI studies are separate and unchanged.


## 22 October UX review and sessions experiment

[Multi-session workspace](sessions.html): twelve supplied session identities, searchable left-arrow picker, network filter, Summary / Events / log views, all twenty palettes. [Review decisions, evidence and implementation boundary](UX-REVIEW-2026-10-22.md). Historical excerpt and illustrative process states; no process connection. Both studio overviews received typography and comparison refinements.

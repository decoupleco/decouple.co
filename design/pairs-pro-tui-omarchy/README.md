# Pairs Pro / Omarchy-inspired terminal studio

Ten additional terminal design variants, selected from the [Omarchy community catalogue](https://omarchy.org/themes/). The original ten TUI studies and twenty web studies remain separate.

This is a browser-local design collection. It reuses the first studio’s synthetic replay fixture and controls, with new source-derived color mappings and workspace compositions. Nothing from the real simulator is executed.

## Ten source palettes and layout interpretations

| Community palette / pinned source | Background / active accent | Pairs Pro composition | Contrast-adjusted text roles |
| --- | --- | --- | --- |
| [Bauhaus](https://github.com/mwaltzer/omarchy-bauhaus-theme/blob/bfcabfddb89dc56e95441b7a43919c662a468a14/alacritty.toml) | `#101318` / `#e37b66` | Geometric instrument grid | None |
| [Gruvbox Material](https://github.com/curbol/omarchy-gruvbox-material/blob/1bcf7f9339ce99fc7a93e1757da66d8ac7c5d47d/colors.toml) | `#282828` / `#e78a4e` | Warm results ledger | None |
| [Rosé Pine Moon](https://github.com/Memnoc/omarchy-rose-pine-moon-theme/blob/e44dcc84ac6c49f52340dc4aa53955b7143a4ccd/colors.toml) | `#232136` / `#9ccfd8` | Soft split workspace | None |
| [Flexoki Dark](https://github.com/euandeas/omarchy-flexoki-dark-theme/blob/aa418ffb68ec1eaa72a85b02970ada07ce6f3d26/colors.toml) | `#100f0f` / `#4385be` | Ink workbench | negative |
| [Catppuccin Dark](https://github.com/Luquatic/omarchy-catppuccin-dark/blob/54b98a5c7302783298df05238ab55f312ec327ea/colors.toml) | `#010101` / `#89b4fa` | Pastel event workspace | None |
| [Cobalt2](https://github.com/hoblin/omarchy-cobalt2-theme/blob/579fb7d8890000d315da9e18da6c0885de008ea3/colors.toml) | `#122738` / `#ffc600` | Blue and gold flightdeck | negative |
| [Solarized Light](https://github.com/dfrico/omarchy-solarized-light-theme/blob/e7cd8f3024f34105e31faa8d83db1852a5131850/alacritty.toml) | `#fdf6e3` / `#1e6ca4` | Daylight research sheet | fg, muted, accent, positive, negative, fee |
| [Evergarden](https://github.com/celsobenedetti/omarchy-evergarden/blob/1e5196cf9167e74c3a4fafb5be964cb15a3dc299/colors.toml) | `#232a2e` / `#b3e6db` | Quiet green focus | None |
| [Vesper](https://github.com/thmoee/omarchy-vesper-theme/blob/427bb540bdba152cd48f7f1e4274f96a11cd591e/alacritty.toml) | `#101010` / `#ffc799` | Peach benchmark desk | None |
| [Monochrome](https://github.com/Swarnim114/omarchy-monochrome-theme/blob/10aa54d4b31284f24d73c5aa5532795f4bc85046/alacritty.toml) | `#282828` / `#d4d4d4` | Grayscale tape console | muted, negative |

The catalogue supplies theme inspiration and repository links. **All financial panel arrangements are our interpretations**, not Omarchy features or an upstream endorsement. “Top ten” here means a deliberately varied design selection, not an external popularity ranking.

- **Evergarden:** strongest focused candidate; low-noise green, one secondary plot at a time.
- **Cobalt2:** strongest full instrument layout; deep blue, gold strategy and a persistent inspector.
- **Solarized Light:** the daylight alternative; cream, ink and a research-sheet composition.

## What was learned from Omarchy

Use one coordinated palette across terminal surfaces, status bars, active edges and content. Prefer compact tiled workspaces, consistent monospace rhythm and a small active-state signal. Keep the shell quiet so information carries the composition. We adopted those ideas without wallpaper, logos, font downloads or decorative operating-system chrome.

Source palettes are read from their community ports, not assumed from general theme names. For example, the selected Catppuccin port uses `#010101` as its background. Each source file is pinned by full Git commit and URL in `sources.json`. The file text is retained for reproducibility; no upstream application code or install scripts were executed.

Source colors are mapped to semantic roles. Some source dim/comment colors are unsuitable for small financial labels, so readable source foreground variants are used instead. The build then makes the smallest 1% RGB blend toward black (light backgrounds) or white (dark backgrounds) required for **4.5:1 on both terminal surfaces**. `verification.json` records the exact adjustments. These are inspired adaptations, not exact theme reproductions. Border shades may be locally selected; backgrounds retain the source values.

Monochrome uses hollow rising candles and solid falling candles. Exposure distinguishes BTC from USDC with a boundary and quote hatching; deployed/idle uses solid/tint. Strategy and HODL retain solid/dashed lines. Labels and patterns carry meaning as well as hue.

## Use

Open `index.html`; compare any two palettes, expand the source mapping table, or open a numbered standalone HTML. In a variant choose **Suggested composition** or **Same Flightdeck grid** to isolate palette differences. Four composition sizes: 160×48, 120×40, 100×30 and 80×24. These are HTML previews using an 8×16 reference cell, not native terminal snapshots. Narrow browsers scroll the preview horizontally.

Replay controls: play/pause, cursor step/scrub, event jumps, inspector, end reveal, P&L, month-to-date, history, help and focused keyboard shortcuts. Native Tab is preserved. At 80×24, price and one secondary instrument remain; n cycles the secondary; i opens full-screen info. All plots, events and monthly rows stop at the cursor, and end metrics remain hidden unless finished or revealed.

Data and attribution are illustrative. No live/paper mode, actual A/B engine, export, engine log, depth or moving-average implementation. Existing source keymap is represented by its documented browser subset.

## Reproduce

```sh
node design/pairs-pro-tui-omarchy/build.mjs
python3 -m http.server 8765 --bind 127.0.0.1 --directory design/pairs-pro-tui-omarchy
```

No dependencies or runtime network requests. Every numbered HTML contains its renderer, styles, palette and fixture. The renderer starts from the first studio’s source at Pairs Pro `d5e702f0fed4552ad61d0a3fd171dfd8de822b9f`; this collection’s modifications are local to its own directory.

Fixture SHA-256: `1701202e73f3539621e5dc7d8247d08130068300e3ace9ae027eb0d9df32a306`. Its generated path and values are identical to the first ten TUI studies. No historical performance should be inferred.

- `PROMPTS.md` / `prompts.json`: shared prompt, ten direction briefs, pinned source links and contrast adaptations.
- `CHALLENGE.md`: prompt for another design agent.
- `sources.json`: catalogue URL, ten pinned source files, source text.
- `verification.json`: source/fixture hashes, 120 color contrast pairs, 96 fixture prefix checks, candle bounds and demo endpoint values.
- `browser-verification.json`: composition and interaction checks with limits.
- `previews/`: actual browser screenshots.

Keep production, simulator and contract work outside this design experiment.

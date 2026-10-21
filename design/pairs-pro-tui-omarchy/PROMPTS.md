# Pairs Pro / Omarchy terminal prompts

## Shared prompt

Create a Pairs Pro backtest replay TUI inspired by one commit-pinned community palette from Omarchy’s theme catalogue. Preserve the same synthetic fixture and financial units across all variants. Map source colors to background, text, active strategy, exposure, benchmark and fee roles; document all contrast adaptations. Treat the layout as your own interpretation, not a claim that Omarchy supplies financial information architecture. Use square tiled panes, monospace labels, an active-pane edge and a compact workspace status line. Keep PRICE, VALUE per $100 initial, EXPOSURE deployed/idle and FEES ledger per period. One replay cursor bounds charts, logs and monthly rows. Hide end results until completion or explicit reveal. At 80×24 keep price and one secondary chart; use i for full-screen info. Demonstrate browser-local replay, step, event jumps, help and keyboard focus. Preserve native Tab. Use shapes and patterns as well as color, particularly in Monochrome. Include source URL, pinned commit, a design tradeoff and a same-layout palette comparison option. No external assets, fonts, runtime dependencies, engine or live connections.

<a id="01-bauhaus"></a>

## 01 / Bauhaus

**Composition:** Geometric instrument grid.

Coral, sand and cool slate in a strict four-pane grid. Equal instrument weights and numbered headers make the composition feel measured and architectural.

**Tradeoff:** Best for scanning equal instruments. The price pane gives up visual priority.

**Palette:** background #101318, text #eaeff5, secondary #c6ced8, accent #e37b66.

**Source:** https://github.com/mwaltzer/omarchy-bauhaus-theme/blob/bfcabfddb89dc56e95441b7a43919c662a468a14/alacritty.toml

**Contrast adaptations:** None.

<a id="02-gruvbox-material"></a>

## 02 / Gruvbox Material

**Composition:** Warm results ledger.

Warm charcoal, parchment text and orange commands. A fixed left ledger keeps results in view while the chart stack explains where the return came from.

**Tradeoff:** Strong for long attribution sessions. The ledger uses a third of the width.

**Palette:** background #282828, text #d4be98, secondary #a89984, accent #e78a4e.

**Source:** https://github.com/curbol/omarchy-gruvbox-material/blob/1bcf7f9339ce99fc7a93e1757da66d8ac7c5d47d/colors.toml

**Contrast adaptations:** None.

<a id="03-rose-pine-moon"></a>

## 03 / Rosé Pine Moon

**Composition:** Soft split workspace.

Moonlit violet with foam, rose and gold. Price and portfolio value share the top row, keeping market movement and strategy response in a single glance.

**Tradeoff:** A calm comparison workspace. Less height for the price chart.

**Palette:** background #232136, text #e0def4, secondary #908caa, accent #9ccfd8.

**Source:** https://github.com/Memnoc/omarchy-rose-pine-moon-theme/blob/e44dcc84ac6c49f52340dc4aa53955b7143a4ccd/colors.toml

**Contrast adaptations:** None.

<a id="04-flexoki-dark"></a>

## 04 / Flexoki Dark

**Composition:** Ink workbench.

Almost-black ink, warm paper text and selective blue. A wide price pane sits above three ruled instruments; restrained accents carry only active information.

**Tradeoff:** Clear visual hierarchy with little color noise. Some source hues need brighter text variants.

**Palette:** background #100f0f, text #cecdc3, secondary #878580, accent #4385be.

**Source:** https://github.com/euandeas/omarchy-flexoki-dark-theme/blob/aa418ffb68ec1eaa72a85b02970ada07ce6f3d26/colors.toml

**Contrast adaptations:** [{"role":"negative","original":"#d14d41","adjusted":"#d25145"}].

<a id="05-catppuccin-dark"></a>

## 05 / Catppuccin Dark

**Composition:** Pastel event workspace.

The selected community port uses a near-black background with Mocha pastels. A timestamp rail makes rebalances the entry points into a blue-led chart stack.

**Tradeoff:** Good for decision-by-decision replay. The rail benefits from 120 columns or more.

**Palette:** background #010101, text #cdd6f4, secondary #bac2de, accent #89b4fa.

**Source:** https://github.com/Luquatic/omarchy-catppuccin-dark/blob/54b98a5c7302783298df05238ab55f312ec327ea/colors.toml

**Contrast adaptations:** None.

<a id="06-cobalt2"></a>

## 06 / Cobalt2

**Composition:** Blue and gold flightdeck.

Deep blue panes, a gold active edge and white readouts. Price remains the hero; value, exposure and fees align underneath, beside a persistent results inspector.

**Tradeoff:** The strongest instrument hierarchy. Gold is reserved for selection and the strategy line.

**Palette:** background #122738, text #ffffff, secondary #aaaaaa, accent #ffc600.

**Source:** https://github.com/hoblin/omarchy-cobalt2-theme/blob/579fb7d8890000d315da9e18da6c0885de008ea3/colors.toml

**Contrast adaptations:** [{"role":"negative","original":"#ff628c","adjusted":"#ff648d"}].

<a id="07-solarized-light"></a>

## 07 / Solarized Light

**Composition:** Daylight research sheet.

Cream paper, blue ink and restrained ochre. A light research sheet places price and value beside exposure and fee instruments, with a ruled event history below.

**Tradeoff:** Best daylight candidate. Chart-label colors are darkened to retain readable contrast.

**Palette:** background #fdf6e3, text #566c73, secondary #586b72, accent #1e6ca4.

**Source:** https://github.com/dfrico/omarchy-solarized-light-theme/blob/e7cd8f3024f34105e31faa8d83db1852a5131850/alacritty.toml

**Contrast adaptations:** [{"role":"fg","original":"#586e75","adjusted":"#566c73"},{"role":"muted","original":"#657b83","adjusted":"#586b72"},{"role":"accent","original":"#268bd2","adjusted":"#1e6ca4"},{"role":"positive","original":"#859900","adjusted":"#606e00"},{"role":"negative","original":"#dc322f","adjusted":"#c42d2a"},{"role":"fee","original":"#b58900","adjusted":"#846400"}].

<a id="08-evergarden"></a>

## 08 / Evergarden

**Composition:** Quiet green focus.

Eucalyptus text, mint highlights and a charcoal-green ground. One secondary instrument at a time leaves room to study price and the current position.

**Tradeoff:** The calmest focused replay. Switching is needed to inspect every secondary instrument.

**Palette:** background #232a2e, text #adc9bc, secondary #839e9a, accent #b3e6db.

**Source:** https://github.com/celsobenedetti/omarchy-evergarden/blob/1e5196cf9167e74c3a4fafb5be964cb15a3dc299/colors.toml

**Contrast adaptations:** None.

<a id="09-vesper"></a>

## 09 / Vesper

**Composition:** Peach benchmark desk.

Black, white and a controlled peach accent. Portfolio value takes the main pane; price, exposure and fees explain the strategy’s distance from HODL below.

**Tradeoff:** Best for reading the benchmark race. The market chart is secondary.

**Palette:** background #101010, text #ffffff, secondary #a0a0a0, accent #ffc799.

**Source:** https://github.com/thmoee/omarchy-vesper-theme/blob/427bb540bdba152cd48f7f1e4274f96a11cd591e/alacritty.toml

**Contrast adaptations:** None.

<a id="10-monochrome"></a>

## 10 / Monochrome

**Composition:** Grayscale tape console.

A grayscale quote board and event tape. Hollow rising candles, solid falling candles, line patterns and exposure hatching preserve distinctions without hue.

**Tradeoff:** Useful for low-color terminals and contrast review. Pattern and label design must carry every distinction.

**Palette:** background #282828, text #d4d4d4, secondary #8e8e8e, accent #d4d4d4.

**Source:** https://github.com/Swarnim114/omarchy-monochrome-theme/blob/10aa54d4b31284f24d73c5aa5532795f4bc85046/alacritty.toml

**Contrast adaptations:** [{"role":"muted","original":"#888888","adjusted":"#8e8e8e"},{"role":"negative","original":"#888888","adjusted":"#8e8e8e"}].

# Pairs Pro / Twenty terminal design studies

One studio. Default 10 and Omar 10. Preserve existing designs; extend with another named set when needed.

## Default 10 / shared brief

Design a Pairs Pro backtest replay terminal, not a trading dashboard. Use a monospace cell rhythm, square ruled panels, compact textual commands, and restrained color. Preserve PRICE, VALUE ($ per $100 initial), EXPOSURE (% of value: base/quote, deployed/idle), FEES (ledger $ per period) and a single replay cursor. Price has base/wide and limit/tight bands plus rebalance markers. Strategy value is solid, HODL 50/50 dashed, optional HODL100 dotted. Inspect now/end metrics, ranges and run provenance; hide end metrics until completion or an explicit reveal. Compact 80×24 shows price plus one secondary instrument, cycling with n; info becomes a full-screen view. Demonstrate pause/play, step, event navigation, span selection, info, P&L, monthly history and help. Confine shortcuts to a focused terminal and preserve native browser Tab/Escape. Browser-local illustrative data only. Paper/live and collect/allocate/free are unavailable. Produce a self-contained HTML with no remote fonts, assets or dependencies, a gallery thumbnail, a concise rationale, a tradeoff and a shared-fixture comparison. Vary layout and information priority, not just palette. Avoid rounded web cards, chrome effects, neon, decorative scanlines and fake performance claims.

<a id="01-flightdeck"></a>

### Flightdeck

The clearest evolution of the current TUI: one tall price pane, three aligned instrument strips, and a persistent now/end inspector.

Tradeoff: Best all-rounder. An inspector costs chart width.

<a id="02-split"></a>

### Split screen

Give price and value equal weight. Read market action on the left and the strategy’s response on the right; exposure and fee strips sit directly beneath.

Tradeoff: Fast cause-and-effect comparison. Less vertical space for price.

<a id="03-ledger"></a>

### Ledger

Start with the numbers. A fixed left ledger anchors current performance while a chart stack explains it, with fees and divergence kept explicit.

Tradeoff: Excellent for attribution. Metrics lead the eye before the market.

<a id="04-rail"></a>

### Event rail

Place a timestamped rebalance rail beside the price stack. Every event is a navigation target, so the replay feels like stepping through a debugger.

Tradeoff: Strong for reviewing decisions. The event rail needs a wide terminal.

<a id="05-paper"></a>

### Lab paper

A light, ink-on-paper research layout: price and value to the left, exposure and fees to the right, with a ruled audit trail below.

Tradeoff: Good for daylight and screenshots. Fewer dark/light exposure shades.

<a id="06-focus"></a>

### Quiet focus

Protect the price chart. Show only one secondary instrument at a time and keep the inspector slim. Designed for deliberate keyboard-led replay.

Tradeoff: Lowest cognitive load. Secondary charts require a switch.

<a id="07-race"></a>

### Lap timer

Make the race against HODL the hero. A large value pane comes first; price, exposure and fees explain the gap beneath it.

Tradeoff: Best for benchmark questions. Price is intentionally secondary.

<a id="08-matrix"></a>

### Matrix

Use a strict two-by-two instrument grid with a shared time window. Read each plot independently without changing the panel arrangement.

Tradeoff: Predictable scanning. Price loses its visual priority.

<a id="09-tape"></a>

### Amber tape

A compact quote board above a wide price chart, a right-hand event tape, and three narrow lower instruments. Restrained amber without CRT effects.

Tradeoff: Efficient at 160 columns. Lower charts become small at 100.

<a id="10-outline"></a>

### Outline

A restrained, almost monochrome console. A full-width price chart sits above a three-instrument row, with key results in a narrow ruled footer.

Tradeoff: Easy to port to basic terminals. Meaning relies on labels and line patterns.

## Omar 10 / shared brief

Create a Pairs Pro backtest replay TUI inspired by one commit-pinned community palette from Omarchy’s theme catalogue. Preserve the same synthetic fixture and financial units across all variants. Map source colors to background, text, active strategy, exposure, benchmark and fee roles; document all contrast adaptations. Treat the layout as your own interpretation, not a claim that Omarchy supplies financial information architecture. Use square tiled panes, monospace labels, an active-pane edge and a compact workspace status line. Keep PRICE, VALUE per $100 initial, EXPOSURE deployed/idle and FEES ledger per period. One replay cursor bounds charts, logs and monthly rows. Hide end results until completion or explicit reveal. At 80×24 keep price and one secondary chart; use i for full-screen info. Demonstrate browser-local replay, step, event jumps, help and keyboard focus. Preserve native Tab. Use shapes and patterns as well as color, particularly in Monochrome. Include source URL, pinned commit, a design tradeoff and a same-layout palette comparison option. No external assets, fonts, runtime dependencies, engine or live connections.

<a id="01-bauhaus"></a>

### Bauhaus

Coral, sand and cool slate in a strict four-pane grid. Equal instrument weights and numbered headers make the composition feel measured and architectural.

Tradeoff: Best for scanning equal instruments. The price pane gives up visual priority.

Source: https://github.com/mwaltzer/omarchy-bauhaus-theme/blob/bfcabfddb89dc56e95441b7a43919c662a468a14/alacritty.toml

<a id="02-gruvbox-material"></a>

### Gruvbox Material

Warm charcoal, parchment text and orange commands. A fixed left ledger keeps results in view while the chart stack explains where the return came from.

Tradeoff: Strong for long attribution sessions. The ledger uses a third of the width.

Source: https://github.com/curbol/omarchy-gruvbox-material/blob/1bcf7f9339ce99fc7a93e1757da66d8ac7c5d47d/colors.toml

<a id="03-rose-pine-moon"></a>

### Rosé Pine Moon

Moonlit violet with foam, rose and gold. Price and portfolio value share the top row, keeping market movement and strategy response in a single glance.

Tradeoff: A calm comparison workspace. Less height for the price chart.

Source: https://github.com/Memnoc/omarchy-rose-pine-moon-theme/blob/e44dcc84ac6c49f52340dc4aa53955b7143a4ccd/colors.toml

<a id="04-flexoki-dark"></a>

### Flexoki Dark

Almost-black ink, warm paper text and selective blue. A wide price pane sits above three ruled instruments; restrained accents carry only active information.

Tradeoff: Clear visual hierarchy with little color noise. Some source hues need brighter text variants.

Source: https://github.com/euandeas/omarchy-flexoki-dark-theme/blob/aa418ffb68ec1eaa72a85b02970ada07ce6f3d26/colors.toml

<a id="05-catppuccin-dark"></a>

### Catppuccin Dark

The selected community port uses a near-black background with Mocha pastels. A timestamp rail makes rebalances the entry points into a blue-led chart stack.

Tradeoff: Good for decision-by-decision replay. The rail benefits from 120 columns or more.

Source: https://github.com/Luquatic/omarchy-catppuccin-dark/blob/54b98a5c7302783298df05238ab55f312ec327ea/colors.toml

<a id="06-cobalt2"></a>

### Cobalt2

Deep blue panes, a gold active edge and white readouts. Price remains the hero; value, exposure and fees align underneath, beside a persistent results inspector.

Tradeoff: The strongest instrument hierarchy. Gold is reserved for selection and the strategy line.

Source: https://github.com/hoblin/omarchy-cobalt2-theme/blob/579fb7d8890000d315da9e18da6c0885de008ea3/colors.toml

<a id="07-solarized-light"></a>

### Solarized Light

Cream paper, blue ink and restrained ochre. A light research sheet places price and value beside exposure and fee instruments, with a ruled event history below.

Tradeoff: Best daylight candidate. Chart-label colors are darkened to retain readable contrast.

Source: https://github.com/dfrico/omarchy-solarized-light-theme/blob/e7cd8f3024f34105e31faa8d83db1852a5131850/alacritty.toml

<a id="08-evergarden"></a>

### Evergarden

Eucalyptus text, mint highlights and a charcoal-green ground. One secondary instrument at a time leaves room to study price and the current position.

Tradeoff: The calmest focused replay. Switching is needed to inspect every secondary instrument.

Source: https://github.com/celsobenedetti/omarchy-evergarden/blob/1e5196cf9167e74c3a4fafb5be964cb15a3dc299/colors.toml

<a id="09-vesper"></a>

### Vesper

Black, white and a controlled peach accent. Portfolio value takes the main pane; price, exposure and fees explain the strategy’s distance from HODL below.

Tradeoff: Best for reading the benchmark race. The market chart is secondary.

Source: https://github.com/thmoee/omarchy-vesper-theme/blob/427bb540bdba152cd48f7f1e4274f96a11cd591e/alacritty.toml

<a id="10-monochrome"></a>

### Monochrome

A grayscale quote board and event tape. Hollow rising candles, solid falling candles, line patterns and exposure hatching preserve distinctions without hue.

Tradeoff: Useful for low-color terminals and contrast review. Pattern and label design must carry every distinction.

Source: https://github.com/Swarnim114/omarchy-monochrome-theme/blob/10aa54d4b31284f24d73c5aa5532795f4bc85046/alacritty.toml

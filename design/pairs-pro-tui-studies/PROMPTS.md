# Pairs Pro / terminal design prompts

## Shared prompt

Design a Pairs Pro backtest replay terminal, not a trading dashboard. Use a monospace cell rhythm, square ruled panels, compact textual commands, and restrained color. Preserve PRICE, VALUE ($ per $100 initial), EXPOSURE (% of value: base/quote, deployed/idle), FEES (ledger $ per period) and a single replay cursor. Price has base/wide and limit/tight bands plus rebalance markers. Strategy value is solid, HODL 50/50 dashed, optional HODL100 dotted. Inspect now/end metrics, ranges and run provenance; hide end metrics until completion or an explicit reveal. Compact 80×24 shows price plus one secondary instrument, cycling with n; info becomes a full-screen view. Demonstrate pause/play, step, event navigation, span selection, info, P&L, monthly history and help. Confine shortcuts to a focused terminal and preserve native browser Tab/Escape. Browser-local illustrative data only. Paper/live and collect/allocate/free are unavailable. Produce a self-contained HTML with no remote fonts, assets or dependencies, a gallery thumbnail, a concise rationale, a tradeoff and a shared-fixture comparison. Vary layout and information priority, not just palette. Avoid rounded web cards, chrome effects, neon, decorative scanlines and fake performance claims.

<a id="01-flightdeck"></a>

## 01 / Flightdeck

**Composition:** Instrument stack.

The clearest evolution of the current TUI: one tall price pane, three aligned instrument strips, and a persistent now/end inspector.

**Tradeoff:** Best all-rounder. An inspector costs chart width.

**Palette:** background #0d121a, text #e2e9f1, secondary #98a8bc, accent #78aaff.

<a id="02-split"></a>

## 02 / Split screen

**Composition:** Dual monitor.

Give price and value equal weight. Read market action on the left and the strategy’s response on the right; exposure and fee strips sit directly beneath.

**Tradeoff:** Fast cause-and-effect comparison. Less vertical space for price.

**Palette:** background #101815, text #e3ebe6, secondary #a1b4a7, accent #9adaac.

<a id="03-ledger"></a>

## 03 / Ledger

**Composition:** Accountant’s console.

Start with the numbers. A fixed left ledger anchors current performance while a chart stack explains it, with fees and divergence kept explicit.

**Tradeoff:** Excellent for attribution. Metrics lead the eye before the market.

**Palette:** background #191713, text #ece7db, secondary #b6ae9b, accent #e9c37d.

<a id="04-rail"></a>

## 04 / Event rail

**Composition:** Replay debugger.

Place a timestamped rebalance rail beside the price stack. Every event is a navigation target, so the replay feels like stepping through a debugger.

**Tradeoff:** Strong for reviewing decisions. The event rail needs a wide terminal.

**Palette:** background #18151d, text #ebe3ef, secondary #b9a7c1, accent #cba6ee.

<a id="05-paper"></a>

## 05 / Lab paper

**Composition:** Light research terminal.

A light, ink-on-paper research layout: price and value to the left, exposure and fees to the right, with a ruled audit trail below.

**Tradeoff:** Good for daylight and screenshots. Fewer dark/light exposure shades.

**Palette:** background #f4f1e8, text #272e2b, secondary #61675f, accent #2f5a85.

<a id="06-focus"></a>

## 06 / Quiet focus

**Composition:** Single question.

Protect the price chart. Show only one secondary instrument at a time and keep the inspector slim. Designed for deliberate keyboard-led replay.

**Tradeoff:** Lowest cognitive load. Secondary charts require a switch.

**Palette:** background #101918, text #e0ece7, secondary #a0b6ae, accent #9acdbb.

<a id="07-race"></a>

## 07 / Lap timer

**Composition:** Benchmark first.

Make the race against HODL the hero. A large value pane comes first; price, exposure and fees explain the gap beneath it.

**Tradeoff:** Best for benchmark questions. Price is intentionally secondary.

**Palette:** background #10161c, text #deebef, secondary #9cafbc, accent #77cfdf.

<a id="08-matrix"></a>

## 08 / Matrix

**Composition:** Four equal instruments.

Use a strict two-by-two instrument grid with a shared time window. Read each plot independently without changing the panel arrangement.

**Tradeoff:** Predictable scanning. Price loses its visual priority.

**Palette:** background #161a22, text #e3e7f1, secondary #a6b0c4, accent #a2b7f5.

<a id="09-tape"></a>

## 09 / Amber tape

**Composition:** Market desk.

A compact quote board above a wide price chart, a right-hand event tape, and three narrow lower instruments. Restrained amber without CRT effects.

**Tradeoff:** Efficient at 160 columns. Lower charts become small at 100.

**Palette:** background #16140f, text #eee5d3, secondary #bdb095, accent #edc281.

<a id="10-outline"></a>

## 10 / Outline

**Composition:** Monochrome workbench.

A restrained, almost monochrome console. A full-width price chart sits above a three-instrument row, with key results in a narrow ruled footer.

**Tradeoff:** Easy to port to basic terminals. Meaning relies on labels and line patterns.

**Palette:** background #eaeef0, text #26323c, secondary #596976, accent #345b83.

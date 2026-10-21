# Pairs Pro — design experiment prompts

Use the shared brief, then append exactly one direction. Keep the same seven tasks and sample content when comparing outputs.

## Shared brief

Create a high-fidelity Pairs Pro product design study, not a landing page. Use the existing μi HTML/CSS component layer (buttons, fields, tabs, segments, panels and numeric styles); do not introduce React Material UI or a second component framework. Deliver one self-contained HTML file containing five 390px mobile screens and two 1440px desktop screens, with inline CSS, JavaScript and SVG. It must open offline, without a server, external fonts, images, CDNs or wallets.

Use the same seven screens, content and deterministic sample data in every variant: M01 Portfolio, M02 Pools, M03 Pool detail, M04 Deposit review, M05 Withdraw, D01 Pool workspace, D02 Strategy settings. Preserve a coherent flow from monitoring through pool selection, inspection and transaction review. Portfolio is the primary daily-use screen. Mobile must work at 360px as well as 390px. Desktop chart plus position sidebar must remain visually distinct from the manager configuration form.

All money and charts are illustrative and visibly labelled Demo. Distinguish market/pool TVL from vault TVL and the user's position; estimated APY from realized returns; immediate withdrawal from queued requests; and projected bands from sample allocation history. Show units and percentages together. Never call an estimate guaranteed or claimable unless the state supports it. Keep price as the default for base/limit ranges and provide an accessible price/tick toggle. Put source, block and kind in an accessible disclosure instead of repeating metadata beside every figure.

Keep manager actions outside ordinary holder flows. A holder can withdraw without a deposit role. Model wrong-network and history-unavailable states; missing history must not hide a separately available withdrawal quote. Review screens expose exact approvals, minimum outputs/shares, fee and deadline. Configuration groups are Anchor, Range, Weight, Exposure; one base-weight slider controls the complementary limit weight. A config save is not an allocation transaction. Confirmations are prototype-only and never connect to a wallet or send a transaction.

Revision 2 layout contract: keep the twenty directions. Use DEX and network dropdowns on Pools. Put WETH price, vault TVL, pool TVL, estimated APY and vault fees in one header metrics bar; stack it compactly on mobile. Put Base in range inside a Blocks-style position card with identity, min/current/max range, three aligned information rows and actions. Use Withdraw as the visible exit label. Put Show range below the chart, right aligned. Period controls use compact underline tabs with 44px hit areas. Distinguish base/limit identity from keeper/projected provenance.

Revision 3: amount inputs share a flat card surface, with visible focus around the whole card instead of a nested numeric rectangle. Every position card has an explicit border. On desktop, move the compact vault table to the sidebar and reserve the primary column below the price chart for two secondary panels: Position value / Exposure, and Fees / Price per share. Stack these panels on mobile. Exposure is WETH as a share of USD position value; fees are cumulative vault fees for the selected period. Keep personal values distinct from whole-vault balances.

Use semantic HTML, real labels, keyboard focus, at least 44px touch targets, non-color status cues and readable contrast. Give each screen one dominant action. Avoid tiny mono copy, giant empty tiles, gratuitous gradients, glossy crypto visuals, fake live data and hover-only essential information. Charts, toggles, filters, amount inputs, transaction review, range units and configuration previews must respond meaningfully. Respect reduced motion. Change visual hierarchy, module composition, density and typography for the chosen direction—not merely the accent color.

## 01 · Quiet Ledger

**Product archetype:** Private finance

Design a calm private-finance instrument. Use warm white, forest ink and restrained emerald. Give portfolio value a serif display treatment; keep units, tables and inputs in a clean sans. Lead with personal capital and time-qualified change, then show holdings as spacious rows. Use subtle panel boundaries, 16px corners, flat surfaces and a small allocation strip. Desktop should feel like a well-edited financial workspace. Avoid luxury ornament, gold trim and marketing slogans.

## 02 · Blueprint

**Product archetype:** Strategy research

Make a precise strategy-research notebook in ink blue and white. Use square panels, numbered sections, narrow technical captions and monospaced secondary figures. Organize the portfolio as a matrix of value, return and allocation, with a full-width chart below. Show price bands as measured intervals rather than decorative gradients. Put data-source context in a fixed caption, not everywhere. Desktop configuration is a structured instrument panel, with preview next to inputs. Avoid cyan glow, illegible graph-paper texture and microscopic labels.

## 03 · Orchard

**Product archetype:** Personal wealth

Create an approachable wealth companion using white, soft sage and deep olive. Use generous spacing and rounded, flat panels with a distinctly humanist type voice. Put an allocation ring beside the portfolio value. Show three digestible holdings, not a wall of KPIs. Pair every chart with a plain-language interpretation and preserve exact quantities in the transaction flow. Desktop is calm and broad, with a clear action rail. Avoid cartoon illustrations, gamified yield, pastel low contrast and oversized empty cards.

## 04 · Ticker

**Product archetype:** Trading terminal

Build a disciplined dark trading terminal. Use charcoal green, pale ink and one muted lime action color. Make portfolio rows and price charts the dominant language, with a compact NAV header and aligned numeric columns. Keep all touch targets at least 44px even when visual spacing is dense. Use a segmented instrument header, small status lamps with text labels and shallow corners. Desktop gets a technical side rail and a large price canvas. No CRT effects, scanlines, blinking values, neon bloom or invented live feeds.

## 05 · Folio

**Product archetype:** Financial editorial

Treat Pairs Pro as a beautifully edited financial journal that is still a working app. Use warm paper, charcoal and a restrained terracotta action. Serif section titles and large value figures contrast with precise sans-serif controls. Replace nested cards with horizontal rules and numbered sections. Place asset names and quantities on generous baseline-aligned rows. The desktop workspace should read as a two-column financial spread. Avoid faux paper textures, decorative quotations and large narrative blocks that delay a transaction.

## 06 · Atlas

**Product archetype:** Research workspace

Create an analytical research workspace with white panels, slate typography and quiet indigo. Put context breadcrumbs and a slim vertical accent next to important numbers. Portfolio overview should pair value and a compact trend, followed by a single clean holdings panel. Desktop uses a permanent workspace rail, contextual tabs and a right-hand position summary. Configuration retains its four semantic groups, with changed values easy to inspect. Avoid generic SaaS statistic tiles, excessive chips and nesting every row in its own card.

## 07 · Index

**Product archetype:** Swiss financial instrument

Apply a Swiss editorial grid to a real liquidity-management app. Use white, black, disciplined alignment and almost no rounding. Establish hierarchy with size, spacing and rules, not colored containers. Portfolio value is oversized but compact; the return figure is anchored on the same grid. Holdings are a ruled ledger. Charts are monochrome with patterned bands and textual legends. Reserve semantic colors for positive, warning and error states. Desktop is a wide financial instrument with visible column structure. Avoid brutalist thick borders and decorative giant typography.

## 08 · Nocturne

**Product archetype:** Night portfolio

Design an elegant night portfolio with deep navy surfaces and readable silver-blue text. Use a serif portfolio figure and modest rounded containers. The hero should be a quiet text block above a luminous but restrained line chart, with value details on dark cards below. Keep charts, transaction amounts and minimum outputs readable in low light. Desktop uses layered flat surfaces rather than glass. Avoid purple gradients, transparent cards, stars, glow and washed-out text.

## 09 · Signal

**Product archetype:** Operations cockpit

Build an operations cockpit that makes state and consequences obvious. Use near-white panels, dark blue-grey and burnt-orange action accents. Begin with a compact status strip, then place the main value on a hard-aligned numeric grid. Use base and limit exposure bars as a recurring organizing device. Desktop separates observe, preview and apply. Config review must distinguish saving parameters from a later keeper allocation. Avoid alarm fatigue, treating green as a safety guarantee, and exposing manager controls to a holder.

## 10 · Tide

**Product archetype:** Modern brokerage

Design a modern brokerage-style LP app in white and confident blue. Use an app-like header, a broad value card and clean grouped rows. Favor easy thumb reach, large numeric inputs and a predictable navigation bar. Bring a small allocation graphic into the value card and use a pale-blue strip to group the user position on the pool screen. Desktop combines a substantial chart with a sticky action card. Avoid sales banners, promotional APY, stock photography and dashboard-card repetition.

## 11 · Margin

**Product archetype:** Financial statement

Design a contemporary financial statement, not a dashboard. Use white, burgundy ink and a narrow margin rule. Put a numbered statement header above the portfolio total, then place the 30-day change on its own ruled line. Holdings read as ledger entries; a small margin label identifies each section. Pool cards become numbered horizontal records. Desktop has a restrained statement index instead of a heavy navigation slab. Give transaction totals receipt-like emphasis. Avoid legal-document density, tiny footnotes and ornamental seals.

## 12 · Estuary

**Product archetype:** Treasury overview

Create a light treasury overview using white and deep teal. Beneath the portfolio total, show three labelled horizontal allocation bars with amounts; this allocation ladder is the visual signature, not a ring or a large colored card. Keep section headings short and rows open. Use thin contour-like chart rules and a quiet pale-teal chart bed. Desktop places a tidy treasury summary beside a broad plot. Settings should use flat grouped panels and a strong preview edge. Avoid ocean imagery, wave decorations and pretending this is cash management.

## 13 · Studio

**Product archetype:** Curated investment workspace

Design a curated investment studio: white, aubergine ink and muted lilac. Use a distinctive serif value on a broad typographic stage with an offset annotation column for period and change. Let white space and asymmetry establish hierarchy, while exact figures stay aligned. Holdings get small numbered labels rather than boxed KPIs. Pool detail keeps a large clean plotting area with a slim caption column. Desktop mixes one open canvas with a compact lilac action panel. Avoid art-gallery marketing copy, abstract sculptures and layouts that sacrifice readable transaction data.

## 14 · Circuit

**Product archetype:** Quant workstation

Build a quant workstation in graphite blue with subdued cyan. The portfolio hero is a split numeric matrix: a large net value cell above a pair of clearly labelled delta cells. Use monospaced figures but readable sans-serif prose and 44px controls. Organize holdings as precision rows with a strong left edge. Chart modules have a measurement-rail treatment; desktop gives the plot maximum width and keeps actions compact. Config is a restrained two-column instrument. No neon, code rain, fake terminal logs, blinking lamps or decorative complexity.

## 15 · Kiln

**Product archetype:** Independent finance

Create an independent-finance product with warm ivory, brown ink and clay accents. Use a softly inset portfolio statement: small heading, large serif total, then a crisp return line and an understated allocation strip. Section headings resemble simple index tabs. Holdings and pool rows use warm rules, not repeated shadow cards. The deposit review should feel like a clear, carefully typeset receipt. Desktop keeps this warmth but uses an exact grid and compact side summary. Avoid handmade textures, craft illustrations and rounded shapes without a functional purpose.

## 16 · Paper

**Product archetype:** Investment digest

Make an investment digest that behaves like a working app. Use near-white paper, dark green-black type and very thin rules. A serif masthead introduces two portfolio columns: current value and time-qualified change. Controls, units and compact tables stay in sans-serif. Holdings resemble an edited financial bulletin with clear line spacing. Pool detail pairs a strong price heading with an open chart. Desktop reads as a financial spread with an actionable right column. Avoid long articles, multi-column body prose on mobile, fake paper grain and newspaper gimmicks.

## 17 · Vector

**Product archetype:** Allocation instrument

Design a precise allocation instrument in white, slate and steel blue. Put the portfolio total above a wide segmented exposure bar; label each segment beneath it with token, proportion and value. Use crisp technical labels sparingly and flat, shallow components. Holdings have a subtle column ruler and pool rows expose the most relevant comparison figures. Desktop should feel like a broad instrument plane with a compact action dock. Range previews reuse the same allocation grammar. Avoid aircraft gauges, dials and metaphor-heavy controls.

## 18 · Grove

**Product archetype:** Nordic wealth workspace

Create a Nordic wealth workspace with white, pale olive and earthy ink. Use open whitespace instead of containers. The portfolio total is large and left aligned; a smaller return annotation sits below a long hairline with a modest three-pool marker. Put holdings on generous, unboxed rows and use a narrow label column to organize detail. Desktop gets an unusually quiet rail and a broad open chart area. Settings groups are separated by spacing and headings, not nested cards. Avoid botanical drawings, lifestyle imagery and excessive empty space that pushes the action away.

## 19 · Cobalt

**Product archetype:** Digital asset banking

Design a confident digital-asset banking interface. Use a single solid cobalt portfolio panel with white figures, an understated account label and a compact 30-day return strip. Surround it with clean white space. Holdings use stacked account-like rows with amounts flush right; pool cards become orderly groups. Desktop uses one blue action summary beside a neutral chart, not a blue background everywhere. Keep form inputs large and exact. Avoid generic bank-card illustrations, glossy gradients, floating coins and trust claims implied by banking language.

## 20 · Relay

**Product archetype:** Task-first finance

Create a task-first financial workspace in white, ink and restrained violet. A small three-step sequence, Observe / Understand / Act, anchors the portfolio before a split summary of value and period change. Keep steps descriptive, never a fake completion meter. Holdings and pool rows use a simple left marker to guide scanning. Transaction screens make input, review and completion visibly distinct. Desktop configuration follows the same grouped-task rhythm with preview adjacent. Avoid checklist clutter, gamification, excessive pills and making routine monitoring look like unfinished work.

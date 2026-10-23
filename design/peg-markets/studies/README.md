# peg.markets — ten design directions

23 October 2026. Gallery: https://decouple.co/design/peg-markets/studies/ · built by `bun build.js` from `../fixture.js`.
Each study is seven screens (M01 Swap · M02 Markets · M03 Market · M04 Mint · M05 Channel · D01 Markets desktop ·
D02 Settlement desktop) on the μi framework, in one static file with no script.

## Method

A direction is five structural choices — navigation, lead block, market row, chart, action placement — plus a theme.
The build fails unless every pair of directions differs in at least three of the five, every theme's text and button
pairs reach 4.5:1, every screen has at most one primary action and every study is ≤ 40,000 B brotli. This answers the
Pairs.pro finding that twenty studies were mostly recolours of one layout.

## Directions

| File | Direction | Structure (nav · lead · row · chart · action) | Thesis | Judgment |
| --- | --- | --- | --- | --- |
| [01-weekly-flow.html](01-weekly-flow.html) | Weekly Flow · Flow instrument | week · fee · gauge · overlay · dock | The week is the unit of peg.markets: show this week's flow against its cap, and every fee, lock and settlement explains itself. | **Shortlist** |
| [02-rate-board.html](02-rate-board.html) | Rate Board · FX dealing board | seg · quote · board · spread · inline | A currency market reads like a rate board: quote, oracle and the fee between them, in columns you can scan. |  |
| [03-balance-sheet.html](03-balance-sheet.html) | Balance Sheet · Private ledger | crumbs · ledger · ledger · area · sheet | Your position is a balance sheet: collateral on one side, debt on the other, and every action is a journal entry. | **Shortlist** |
| [04-desk.html](04-desk.html) | Desk · Treasury terminal | rail · quote · table · multiples · side | For people who run a book: one dense table, small multiples, and a ticket that never leaves the screen. |  |
| [05-pocket.html](05-pocket.html) | Pocket · Consumer wallet | tabs · balance · cards · area · sheet | Lead with what you hold and what it is worth; a market is a card you open, not a table you read. |  |
| [06-ladder.html](06-ladder.html) | Ladder · Collateral map | seg · ladder · ladder · area · dock | Collateral is the product: draw every market as its physical collateral — available, locked, borrowed against — on one scale. |  |
| [07-index.html](07-index.html) | Index · Swiss statement | seg · ledger · table · overlay · inline | Nothing between you and the numbers: black on white, rules not boxes, one table per question. | **Shortlist** |
| [08-cockpit.html](08-cockpit.html) | Cockpit · Operations console | status · meters · meters · spread · side | Every market is three meters — flow against cap, utilisation, debt against ceiling — under a strip that says how fresh it all is. |  |
| [09-tasks.html](09-tasks.html) | Tasks · Task-first | steps · tasks · cards · spark · dock | Start from what you want to do — swap, mint, earn — and show only the numbers that decision needs, one step at a time. |  |
| [10-night.html](10-night.html) | Night · Night blueprint | week · fee · board · band · inline | An outline instrument for after hours: the oracle as a band, the fee as its width, and nothing filled that is not money. |  |

Shortlist (editorial, not user research): **Weekly Flow** carries the product's own idea, the flow against the cap,
into every screen; **Balance Sheet** suits a holder who thinks in positions and reads before → after as a journal;
**Index** is the sharpest minimum and the easiest to build to the budgets.

## Verification

| Page | brotli B | gzip B | worst contrast | min distance |
| --- | ---: | ---: | ---: | ---: |
| 01-weekly-flow.html | 9,559 | 11,734 | 5.58 | 3 |
| 02-rate-board.html | 9,482 | 11,774 | 5.89 | 3 |
| 03-balance-sheet.html | 9,310 | 11,516 | 5.8 | 3 |
| 04-desk.html | 9,352 | 11,727 | 5.94 | 4 |
| 05-pocket.html | 9,234 | 11,373 | 5.52 | 3 |
| 06-ladder.html | 9,307 | 11,480 | 4.72 | 4 |
| 07-index.html | 9,093 | 11,229 | 6.15 | 3 |
| 08-cockpit.html | 9,576 | 11,958 | 5.57 | 4 |
| 09-tasks.html | 9,026 | 11,000 | 4.61 | 4 |
| 10-night.html | 9,615 | 11,936 | 6.54 | 3 |

- `bun ../check.mjs 0*.html 10-night.html`: all 18 derived figures close against `fixture.json`; each page shows 14–16.
- Browser (Chrome, 1440 wide): CLS 0 at load on all ten, zero external resources, zero scripts, no element wider than
  its phone frame. Gallery: shortlist filter and three-way compare by screen work.
- Not tested: physical devices, screen readers, real users, print.

## Join

[CHALLENGE.md](CHALLENGE.md) is the brief for a further entrant (written for Codex). Entrants write only under
`entrants/<agent>-<slug>/`.

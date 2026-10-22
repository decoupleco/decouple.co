# Pairs Pro — twenty visual design experiments

Updated 22 October 2026 · revision 5. Visual and interaction design studies. Open `index.html` to compare twenty directions; each numbered HTML contains five mobile screens and two desktop screens. Every HTML embeds its styles, JavaScript and vector charts. No installation, remote fonts or assets are required.

## Revision 5

The chosen reference is applied to all twenty desktop themes: brand, Pools breadcrumb, pair, protocol metadata and wallet share one full-width top header. The ordered metrics span the full width beneath it; navigation starts below. Both desktop views use this header. Mobile remains unchanged. Forty desktop header checks passed; see `browser-verification-revision-5.json` and `previews/revision-5-header.png`.

## Revision 4

Compact pool identity in application headers, tighter ordered metrics, repaired quoted-font titles and clearer studio filters/comparison. [Review and measurements](REVISION-4.md).

## Revision 3

Amount fields now inherit a clean card surface, with the focus indicator on the card. Position cards retain an explicit boundary in every theme. The vault table is compact and lives in the desktop sidebar. The primary chart column has two secondary panels: Position value / Exposure and Fees / Price per share. Their period follows the main chart. The panels stack below the position card on mobile. [Review log and definitions](REVISION-3.md).

## Revision 2

All twenty directions remain. The 21 October refinement tightens period tabs, uses DEX/network dropdowns, groups price and pool metrics into the header, aligns the position card with Blocks, labels the exit Withdraw, and places Show range below the chart at the right. Mobile was reviewed first, desktop second, then all directions and states. [Three-round log and evidence](REVISION-2.md).

## Design review

The [round-3 wireframe](https://decouple.co/design/pairs-pro/) is useful as a functional inventory. Its visual hierarchy makes the product feel more complicated than the holder's everyday task: repeated outlines, metric tiles and metadata compete with the main figure and action. The many role frames also make it difficult to judge a continuous journey.

These studies change five things:

1. Lead with personal position value and time-qualified change. Separate that from vault and underlying-pool totals.
2. Replace equal-weight boxes with one dominant figure, a quieter second tier and well-aligned holdings rows.
3. Use distinct spaces for monitoring, transaction review and manager configuration. Avoid asking a chart page to do everything.
4. Keep operational detail in disclosures and focused screens. Price bands remain readable before technical tick details are requested.
5. Explore composition, typography, density and component treatment together. A new accent color alone is not a new design direction.

This is an editorial design assessment, not user research or an evaluation of protocol behavior.

## Seven screens

| ID | Screen | Why it belongs |
| --- | --- | --- |
| M01 | Portfolio | **Most important daily screen:** value, change, holdings and next step. |
| M02 | Pools | Discover and compare an opportunity; search and protocol filters. |
| M03 | Pool detail | Understand the price, ranges and personal position before acting. |
| M04 | Deposit | Focus on amounts, expected shares and a clear review. |
| M05 | Withdraw | Focus on outputs and the distinction between instant, waiting and claimable states. |
| D01 | Pool workspace | A broad chart with a position/action sidebar and allocation detail. |
| D02 | Strategy settings | Four manager groups with adjacent preview and review. |

## Twenty directions

The shortlist is a design judgment, not a measured preference ranking. File numbers are stable IDs, not scores.

| File | Direction / project archetype | Design thesis | Judgment |
| --- | --- | --- | --- |
| [01-ledger.html](01-ledger.html) | Quiet Ledger / private finance | Warm white, forest ink, serif value card, spacious rows | **First choice:** balanced and distinctive |
| [02-blueprint.html](02-blueprint.html) | Blueprint / strategy research | Technical grid, indexed modules, precise blue rules | Strong analytical alternative |
| [03-orchard.html](03-orchard.html) | Orchard / personal wealth | Humanist type, sage surfaces, allocation ring | **Shortlist:** most approachable |
| [04-ticker.html](04-ticker.html) | Ticker / trading terminal | Dark green, aligned numbers, compact technical rows | For experienced active LPs |
| [05-folio.html](05-folio.html) | Folio / financial editorial | Paper tones, serif display, ruled sections | Distinctive reading hierarchy |
| [06-atlas.html](06-atlas.html) | Atlas / research workspace | Indigo context rail, breadcrumbs, notebook panels | Familiar analytical workspace |
| [07-swiss.html](07-swiss.html) | Index / Swiss financial instrument | Black and white, hard alignment, minimal card treatment | **Shortlist:** sharpest minimal option |
| [08-nocturne.html](08-nocturne.html) | Nocturne / night portfolio | Navy, silver-blue, quiet serif figure | Calm dark alternative |
| [09-signal.html](09-signal.html) | Signal / operations cockpit | Status strip, numeric grid, amber actions | Better for manager-heavy usage |
| [10-tide.html](10-tide.html) | Tide / modern brokerage | Blue action hierarchy, grouped rows, familiar app rhythm | Useful conventional baseline |
| [11-margin.html](11-margin.html) | Margin / financial statement | Burgundy margin, statement total, ruled change line | For statement-first readers |
| [12-estuary.html](12-estuary.html) | Estuary / treasury overview | Labelled allocation ladder, teal contours, open rows | Makes position distribution explicit |
| [13-studio.html](13-studio.html) | Studio / curated investment workspace | Serif value stage, offset lilac annotation | More expressive typographic identity |
| [14-circuit.html](14-circuit.html) | Circuit / quant workstation | Dark numeric matrix, cyan measurement rails | Precise dark alternative |
| [15-kiln.html](15-kiln.html) | Kiln / independent finance | Warm inset statement, tab headings, receipt totals | Practical character and warmth |
| [16-paper.html](16-paper.html) | Paper / investment digest | Digest masthead, two-column figures, fine rules | Reading-first portfolio check-in |
| [17-vector.html](17-vector.html) | Vector / allocation instrument | Segmented exposure, labelled proportions, chart plane | Allocation as a recurring visual language |
| [18-grove.html](18-grove.html) | Grove / Nordic wealth workspace | Open whitespace, olive hairlines, side annotation | Quiet minimal furniture |
| [19-cobalt.html](19-cobalt.html) | Cobalt / digital asset banking | Solid blue total panel, stacked account rows | Strong identity and action hierarchy |
| [20-relay.html](20-relay.html) | Relay / task-first finance | Observe/understand/act sequence, split summary | Organizes the journey around tasks |

Start by comparing M01 across Quiet Ledger, Orchard and Index. Then compare M03 and M05 to see whether the preferred visual language still works with detail and action. Use D02 to assess the same direction at higher information density. Choose a direction before combining individual components.

## How to browse

- Gallery: use **All 20 / Original 10 / New 10** to browse the two collections. Select up to three directions and press **Compare shortlist**. Switch the comparison between all five mobile tasks.
- Study: use **Full board** or focus one screen. The full board has five horizontally scrollable phone canvases and two desktop canvases below.
- Change **Phone canvas** between 390 and 360px. Phone content scrolls independently; desktop canvases are 1440 × 900 scaled to the page.
- Try search/filter, chart modes and periods, show ranges, price/tick toggle, deposit amount/review, withdrawal state tabs and manager weight/review.
- **Preview state** demonstrates role, connection, network and unavailable-history presentation. These are visual fixtures.
- **Read design brief** and gallery disclosures expose the prompts; print styling is also supplied.

All confirmations are simulated. The sample journey uses WETH/USDC on Base; other pool cards show an explicit context notice. Charts and figures are illustrative. Config range previews are schematic and do not implement the strategy engine.

If a browser requires local HTTP, run from the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory design/pairs-pro-studies
```

Then open `http://127.0.0.1:8765/`. The temporary server used during browser review was stopped after completion.

## Invite another agent

[CHALLENGE.md](CHALLENGE.md) is a complete copy-ready assignment for another agent. It includes the product context, seven-screen contract, fixed sample content, shared framework, interactions, deliverables, entry directory and a 100-point editorial rubric. It asks for three initial visual theses and one fully built contender.

Give the agent the brief and this folder or ZIP. Entrants write only in `entrants/<agent-or-model>-<direction-slug>/`, so independent work cannot overwrite the curated twenty. They return a standalone seven-screen HTML, exact prompt, rationale, screenshots when available and `entry.json`. Integration is a later curator decision. No other agent was launched or messaged by this task.

## Prompt method and references

The [HTML design challenge](https://miaai-lab.github.io/MiniMax-M3.1-Flash-100-HTML-Files/) provided a useful experiment format: a concrete task, a named visual direction, explicit constraints, and a self-contained result. Its operations-console prompt was inspected as a structural reference. The resulting briefs here are new and specific to Pairs Pro.

Each direction combines the same product/task brief with a different archetype, visual thesis, palette, typography, layout behavior and exclusions. Shared content makes comparisons useful; explicit composition requirements prevent twenty recolors of a single dashboard.

[Prompts in Markdown](PROMPTS.md) · [complete machine-readable prompts](prompts.json).

Framework: the existing wireframe's **μi HTML/CSS component layer**, not React Material UI. Reset, theme, base and component layers were extracted from `/Users/taylorluk/workspace/decouple/design/preview.html` using that repository's `lib/ui.js` layer helper. Provenance: `459d779916453dffe2207da79f1e312e506e6a7c`. All directions share the vendored framework and renderer; theme-specific composition rules live in `src/studio.css` and `src/studio.js`.

Product-screen context: `docs/refresh-user-stories.md`, revision 3. The scope is visual and interaction design; existing production files remain outside this experiment.

## Reproduce and verification

```sh
node design/pairs-pro-studies/build.mjs
```

This regenerates twenty-one standalone HTML files, prompt artifacts and `verification.json` using Node's standard library only.

- Twenty variants × seven screens = **140 screen designs**.
- Browser geometry checks: all twenty at 390px and 360px phone canvas widths; seven frames each, no horizontal content overflow, no visible mobile button below 44 × 44px, no frame with multiple primary actions, and manager review actions within the desktop canvas.
- Shared interactions exercised: comparison, pool search/filter, chart mode, range units, deposit input/review, maximum withdrawal, waiting/claim states, role/history presentation and config weight/review.
- 200 palette text/button contrast checks pass, minimum **4.60:1**. This is a palette check, not a complete accessibility assessment.
- JavaScript syntax check passes. Saved source hashes and palette results: [verification.json](verification.json). Browser observations: [browser-verification.json](browser-verification.json).
- Expansion screenshot: [Margin / Estuary / Cobalt](previews/expansion-comparison.png).
- Screenshots: [shortlist](previews/shortlist.png), [gallery](previews/gallery.png), [pool workspace](previews/pool-workspace.png), [manager workspace](previews/manager-workspace.png).

Not tested: physical devices, true browser viewport resizing, screen-reader usability, printed PDF layout or usability with real users. The browser tool blocks `file:` navigation, so direct-from-disk opening was not browser-verified; the rendered pages were verified through local HTTP. All HTML dependencies are inline.

## Source branch and publication

The consolidated source branch is `design` in `decoupleco/pairs-pro`, based on `docs/refresh-user-stories` revision 3 (`8722dbe62c78fc7352a4f8e6a4437b62d04c1628`). It includes the existing user-story spec and wireframe PDF alongside these experiments.

Public gallery: https://decouple.co/design/pairs-pro-studies/.

The site is served from `decoupleco/decouple.co`, branch `gh-pages`. Publish only the `design/pairs-pro-studies/` subtree from a clean checkout of that branch; preserve sibling pages. The static payload consists of the standalone HTML, prompt/review documents, framework resource, screenshots and the downloadable ZIP. Keep the source renderer/build scripts and verification reports in the Pairs Pro source branch. Record the source commit and published-file hashes in the hosting subtree's `publication.json`.

The older mission/design `deploy.js` rebuilds and replaces the entire `/design` directory, so it is not the publishing command for these studies. Future full-site publishes must preserve this subtree.

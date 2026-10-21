# Revision 3 — defined cards, compact balances and secondary charts

21 October 2026. All twenty visual directions retained. Changes are confined to the design experiment.

## Mobile inputs and card definition

The rectangular focus indicator was attached to the amount input itself. Amount inputs now have a transparent surface that inherits the flat amount-card background. Focus is indicated by one continuous accent perimeter around the whole card; the number no longer gets its own box. This applies to deposit and withdrawal amount fields. Keyboard focus remains visible and does not change geometry.

Removed legacy theme rules that erased position-card borders. Every position card now has an explicit border, a solid theme surface and the direction's corner radius, on both phone and desktop canvases.

## Pool workspace composition

Moved vault balances from the main chart column into the sidebar below the personal position card. The compact table uses Range / WETH / USDC / USD total columns with Base, Limit, Idle and Total rows. USD rows retain cents, so displayed row sums reconcile exactly with the displayed total. The heading states that these are whole-vault balances, not the holder's position.

The supplied TUI image informed the compact table arrangement only. Its runner, simulation, keyboard shortcut and live-strategy text is outside this design task.

Kept the main price chart readable. The two secondary panels sit side by side below it on desktop and stack below the position card on mobile. Allocation ranges and the last rebalance remain available in a closed sidebar disclosure, rather than competing with the charts.

## Metric definitions and interactions

- **Position value / Exposure:** one selectable personal-position panel. Current value is $8,400. Exposure is WETH as a share of the position's USD value, currently 50%; the other half is USDC. Exposure uses filled WETH bars and outlined USDC bars, so the distinction does not depend on color alone.
- **Fees / Price per share:** one selectable vault panel. Fees are cumulative whole-vault fees for the chosen window: illustrative $7,400 / 7D, $31,000 / 30D and $92,400 / All. Price per share is shown in USD/share, currently 1.7154. These metrics use separate selections and explicit units, rather than a misleading shared axis.
- The main chart period updates both secondary panels while preserving their selected metrics. Returning from Liquidity to Price resets the primary and secondary periods together.
- Missing history shows a placeholder rather than inventing a series. Current position value or price per share can remain visible separately. Disconnected previews withhold personal history while public vault charts remain available.

All curves, balances and outcomes are deterministic demonstration data. They are not a history service or strategy engine.

## Review and verification

Reviewed the mobile input focus, desktop space allocation, card definition, table density, normal/alternate metric views and history/disconnected presentation. A first stacked desktop arrangement clipped the second panel; the final desktop composition puts both panels in one row. A second sidebar pass tightened repeated copy and row spacing so the table total and closed allocation disclosure fit the 900px canvas.

Final browser checks cover all twenty directions at 390px and 360px phone canvas widths: forty cases, each retaining five mobile screens and two desktop screens. Checks include horizontal overflow, mobile button targets, primary-action count, manager action visibility, position borders, both secondary panels inside the desktop frame, complete sidebar visibility, table placement/width and transparent input surfaces.

Interaction checks cover card-level focus, Exposure and price-per-share switching, period synchronization, fee-window totals, returning to the main Price view, history placeholders and disconnected/public separation. Build parsing and two hundred palette text/button contrast checks pass. Exact source hashes and observations are recorded in `verification.json` and `browser-verification.json`.

Screenshots: `previews/revision3-mobile-input.png`, `previews/revision3-desktop-pool.png`, `previews/revision3-exposure-pps.png`.

Limits: internal canvas checks rather than physical-device testing; no new user study, print/PDF review or complete accessibility certification. Production source is unchanged.

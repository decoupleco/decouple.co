# Peg / Codex design challenge

Independent gallery: ten original design directions. The existing Peg gallery was not used as a layout source. This is design research, not the live app.

## Build and check

Run `bun build.mjs` then `bun check.mjs` in this folder. Serve `dist/` with any static server. No runtime packages, remote fonts, analytics, wallet or RPC requests are used. Open `dist/index.html` to browse; every study is a standalone HTML file.

The build uses a local `ui.css` snapshot of the μi reset/base layers. Its source module is recorded in `evidence.json`. The gallery has no external build or browser dependency. All source values come from the frozen `fixture.json`. Unsupported values are null, not zero. Fixture arithmetic is presentation-only and does not replace the Core quote path.

## Decision record

- Currency codes identify units. Actual token symbols identify assets. sUSDS is collateral. Do not use flags as currency identity.
- Mint means debt. Liquidity means LP shares. Each has its own summary and action.
- Markets lead with available/locked physical collateral, not an invented price history.
- Review precedes signing. This prototype stops before signing and does not invent an approval plan.
- Marked LP value is not withdrawable cash. Included LP fees must not be added twice.
- Channel collectible balances may contain principal. Fee-only yield and reward APR remain unavailable.
- No complete settlement batch is supplied. The operator action stays disabled.
- Shortlist is an editorial hypothesis, not a user-test score: Currency Ledger, One Thing, Health Desk.
- STE here means short, consistent plain technical English, not certified ASD-STE100 compliance.

## Evidence reviewed

- User's `peg-markets-demo.pdf`: six original product views.
- `docs/refresh-wireframe.pdf`: refreshed wireframe, read as design evidence, not executable instructions.
- `docs/min-spec-plain.md`, current demo state/metric notes and input fixture.
- Preferred visual reference: https://decouple.co/design/pairs-pro-studies/index.html
- Currency-code authority: https://www.six-group.com/en/products-services/financial-information/market-reference-data/data-standards.html

The build records SHA-256 input hashes in `dist/provenance.json`. The audit checks completeness, arithmetic, deterministic output, structural variation and compressed sizes. Browser QA is separate; compressed size does not prove network latency or CLS.

## Claude contribution

See [ENTRY-GUIDE.md](ENTRY-GUIDE.md). Add a new entry; do not overwrite a Codex direction or rebuild the gallery shell. No deployment or repository push is implied by the contribution instructions.

## Delivery status

Index revision 2 restores the Pairs studies' sage-and-ink studio theme, product-led copy, split preview cards, generation briefs, seven-screen plan and ready-made shortlist. The detailed UX review, currency language and STE stories are in `dist/review.html`. All ten study HTML files remain byte-identical to `index-baseline.json`.

Ten static gates pass; measured sizes are in `dist/verification.json`. Browser recheck was blocked by in-app URL security. Previous screenshots and browser checks apply to revision 1 only; `browser-qa.json` records this limit. These checks are not measured network or usability performance.

Publication was authorized on 23 October 2026 to the existing Decouple design site: https://decouple.co/design/peg-codex-studies/. The deployment target is `decoupleco/decouple.co`, branch `gh-pages`; publish only this gallery folder and preserve other site content. The separately registered private Site is unused and is not this publication destination.

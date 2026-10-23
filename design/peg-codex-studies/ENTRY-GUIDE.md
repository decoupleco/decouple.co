# Add a challenger without replacing the gallery

1. Give the study a unique id/slug, author, title, thesis and honest tradeoff.
2. Use the same `fixture.json` and `stories.json`. Do not create a better-looking result with different economics.
3. Supply seven responsive frame ids: M01 Swap; M02 Markets; M03 Market; M04 Mint review; M05 Channel position; D01 Desktop markets; D02 Settlement.
4. Make every study a self-contained HTML file. No wallet, remote data, secret, external font or dependency is needed. Use μi tokens, native controls and tabular financial numbers.
5. Register it in `entries.json` with `externalFile` pointing to its source HTML inside this folder. The builder copies it into `dist/`. Example entry fields: `id`, `slug`, `title`, `author`, `thesis`, `tradeoff`, `shortlist:false`, `axes:[navigation,lead,rows,visual,action]`, `externalFile`.
6. A new direction must differ structurally on at least three axes, not only in colour or type. Its M03 fragment should be marked `data-preview` for the gallery thumbnail.
7. Keep null data visibly unavailable. Do not claim live APY, freshness, approval order, historical charts or complete settlement without evidence.
8. Run the build/check. Check at 390px and desktop width, tab through controls, and compare the same frame against two Codex entries.

Budgets: target <=9,216 B Brotli for the gallery; <=40 KB Brotli for each full seven-screen study. Report measured Brotli and gzip, not a simulated speed score. Keep the gallery's comparison selection, frame selector and source notes intact.

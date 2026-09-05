# Hermes · The Health Atlas

An independently runnable adaptation of [Ash’s Human Atlas](https://github.com/ashemag/human-atlas), pinned to commit `7a383d3ee2759e3ddf157c704fb8814fd0c50bcb`.

## Run

Use Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3016. `npm run build` produces `dist/`. Serve the build at an origin root (not a GitHub Pages subdirectory without base-path adaptation). No API keys are required.

The first dev/build run downloads the original BodyParts3D assets from the pinned upstream commit and verifies every file’s SHA-256 and size using `model-manifest.json`. The ~95 MB source assets are reproducible downloads, not duplicated Git blobs. Once cached locally, builds can reuse them offline. The browser normally downloads the compressed geometry (~33 MB). Application source is vendored in this directory and remains independently editable.

## Included

- The original 2,234-mesh 3D anatomy engine, picking, rotation, isolation, system layers, and full exploded anatomy explorer.
- Local CSV, JSON, and Apple Health XML quantity-record imports, with timestamp, unit, source, and body-system metadata.
- Metric selection, source and date filtering, raw-reading trends, latest value, and first-to-last change. Units are never combined into one series. Kilograms for mass are converted to pounds; Apple fraction percentages are converted to percent.
- Manual readings, deduplication by metric/unit/date/source, JSON exports, and an explicitly labeled synthetic example.
- Responsive map/layers/details panels and readable empty/error states.

## Data contract

```json
{"measurements":[{"metric":"Resting heart rate","value":58,"unit":"bpm","date":"2026-09-05T08:00:00-04:00","source":"Your device","system":"cardiac"}]}
```

The row above is an example, not Jon’s record. CSV uses the same fields as headers; `system` is optional. Use ISO timestamps with a timezone, or date-only YYYY-MM-DD. Arbitrary numeric metrics remain available even without a recognized body-system mapping. Supported system IDs are in `app/anatomy.ts`, plus `general`.

Apple XML imports numeric `HKQuantityTypeIdentifier` records. Nonnumeric records are counted and skipped. Sleep stages, workouts, clinical documents, genomic data, and vendor-specific wide CSVs need an adapter or numeric summary. Imports fail atomically on invalid numeric rows. Duplicate source/timestamp rows are replaced, not summed. Multiple devices remain distinct. The graph shows observations, not daily aggregation or a diagnostic score.

There are no live OAuth connections or scheduled background syncs. To connect the locally running Hermes Health application, export its data into this schema or add an authenticated adapter. This repository’s existing main-branch homepage does not contain that private application or its connectors. Actual health data and account secrets are not included in source.

Measurements are session-only in memory. Export before closing or clearing the tab. The app does not upload imports or add them to GitHub. Personal imports belong outside source control; `personal-data/` is ignored as a precaution.

## Validation

```bash
npm run check
npm run validate:data
node scripts/validate-atlas.mjs
node scripts/validate-interactions.mjs
npm run build
```

The import tests cover date normalization, numeric validation, unit conversion, CSV quoting, deduplication, and profile bounds. Anatomical structure is reference geometry, not an individual body scan. Metric/system associations organize data and do not infer organ health.

## Credits

Ash’s application is MIT licensed; the original LICENSE is retained. BodyParts3D has a separate CC BY 4.0 license. Preserve [the anatomy attribution](public/ATTRIBUTION.md). The spiritual sibling also adapts landmark definitions from the owner’s earlier “Neidan — The Inner Atlas” source. See `app/edition.ts` for the default application edition.

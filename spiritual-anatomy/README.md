# Neidan · The Inner Atlas

A spiritual-anatomy adaptation of [Ash’s Human Atlas](https://github.com/ashemag/human-atlas), with landmark placement adapted from the owner’s earlier “Neidan — The Inner Atlas.” The physical reference remains BodyParts3D; spiritual geometry consists of illustrative points and paths layered in the same 3D scene.

## Run

Use Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3016. `npm run build` produces `dist/`. Serve at an origin root. The first dev/build run fetches ~95 MB of anatomy assets pinned to upstream commit `7a383d3ee2759e3ddf157c704fb8814fd0c50bcb`; `model-manifest.json` verifies each SHA-256 and byte count. Source code is vendored and independently editable. Models are cached locally; the browser normally loads ~33 MB of compressed geometry.

## Maps

- Neidan: three dantian, crown, perineum, and bilateral sole landmarks.
- Qigong: a simplified small-circulation map with rear ascent and front descent.
- Attention sequence: perineum → belly → chest → throat → brow, carried forward from the earlier atlas as a separate illustrative path.
- Yoga: a seven-chakra presentation, distinct from dantian and glands.
- Kabbalah: ten sefirot in a Keter-inclusive three-column scheme. Column lines are not a canonical 22-path reconstruction.
- Human Design: a neutral nine-center template, with optional imported definition. It does not compute gates, channels, authority, or type.
- Chinese medicine: five-phase/zang associations, with approximate regions and no lab-value interpretation.
- Alchemy: jing, qi, and shen at the three fields.
- Gene Keys: 11 editable profile spheres in a surrounding reading arrangement.
- I Ching: 64 selectable hexagrams in King Wen number order. This circle is not the traditional gate/zodiac wheel.
- Astrology: a zodiac reference ring with imported planetary longitudes. No ephemeris or birth-chart calculation is included.

The atlas supports multiple active maps, opacity control, labels, source-linked inspection, local contemplation notes, and the inherited full anatomy explorer. With more than 18 points active, only the selected point’s text label appears on the body to limit crowding; all points remain selectable in 3D and in the landmark list. Positions are approximate. Co-location is a comparative display, not evidence that traditions are equivalent or that energy centers are physical organs.

## Your profile

Enter sphere values in the UI, or import JSON:

```json
{
  "geneKeys": {},
  "definedCenters": [],
  "planets": [],
  "notes": {}
}
```

Use these exact Gene Keys sphere names: `Life’s Work`, `Evolution`, `Radiance`, `Purpose`, `Attraction`, `IQ`, `EQ`, `SQ`, `Core / Vocation`, `Culture`, `Pearl`. Values are integers 1–64.

Human Design center IDs, in order, are `hd-0` Head, `hd-1` Ajna, `hd-2` Throat, `hd-3` G / Identity, `hd-4` Heart / Ego, `hd-5` Spleen, `hd-6` Solar Plexus, `hd-7` Sacral, and `hd-8` Root. The absence of imported definition means unknown, not an assertion that a center is undefined.

A planet entry has `name` and `longitude`; longitude must be at least 0 and below 360. Use tropical longitudes to match the displayed tropical reference labels; sidereal charts require consistent adjustment. No birth details or personal chart values are bundled.

Profile and notes save in this browser’s local storage. Export a backup for other devices. Imported personal information is not uploaded or committed to GitHub. Local storage is not encrypted; source contains no personal records.

## Sources and credits

- [Golden Elixir: dantian](https://www.goldenelixir.com/jindan/dantian.html).
- [Himalayan Academy: chakras](https://www.himalayanacademy.com/media/books/the-chakras_ei/web/ch16.html).
- [Chabad: two systems of ten sefirot](https://www.chabad.org/library/article_cdo/aid/137112/jewish/Two-Systems-of-Ten-Sefirot.htm).
- [Jovian Archive: nine centers](https://jovianarchive.com/pages/the-nine-centers-of-the-bodygraph-in-human-design).
- [Gene Keys: reading your profile](https://genekeys.com/how-to-read-your-profile/) and [I Ching](https://genekeys.com/i-ching/).
- [Stanford Encyclopedia of Philosophy: religious Daoism](https://plato.stanford.edu/entries/daoism-religion/).

Interpretations vary across lineages. This is an educational and contemplative atlas, not a clinical locator or a set of advanced practice instructions. No chakra/gland equivalence, energy measurement, genetic claim, or physiological effect is asserted.

Ash’s MIT LICENSE and the separate [BodyParts3D CC BY 4.0 attribution](public/ATTRIBUTION.md) are preserved.

## Validation

```bash
npm run check
npm run validate:data
node scripts/validate-atlas.mjs
node scripts/validate-interactions.mjs
npm run build
```

The underlying mesh validation, interaction contracts, and personal import validation remain runnable. Actual browser/WebGL visual testing is separate from these automated checks.

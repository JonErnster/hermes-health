# Two anatomy applications

This branch adds two independently runnable application copies, adapted from ashemag/human-atlas:

- **health-atlas/** provides local health data imports, body-system association, and source-aware trends.
- **spiritual-anatomy/** provides Neidan, qigong, chakras, Kabbalah, Gene Keys, Human Design, I Ching, astrology, and traditional Chinese medicine overlays.

Each folder has its own package.json, lockfile, source, license, asset manifest, and README. Run `npm ci` followed by `npm run dev` inside the desired folder. They both default to port 3016; to run both at once, use `npm run dev -- --port 3017` for the second.

The application source is included. Anatomical assets are fetched automatically at the pinned upstream commit and verified against checksums. They are not duplicated as large blobs in this repository.

These are source applications saved on the `atlas-apps` branch, not deployed websites. Existing homepage files are retained. Health-provider OAuth integrations and personalized natal/profile computation are not included. No personal health readings, birth details, or journal text are bundled.

The earlier Neidan project was found in the owner’s ChatGPT Sites source rather than among accessible GitHub repositories. Its general landmark placement and attention-path structure informed the spiritual adaptation.

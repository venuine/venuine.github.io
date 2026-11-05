# Vien — Developer Portfolio

An interactive portfolio in charcoal, ivory, and metallic gold. Built with HTML, CSS, and JavaScript, with no dependency installation or build step.

## Project structure

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages publication
├── public/                       # Published website only
│   ├── index.html
│   └── assets/
│       ├── css/                  # Styles, in established cascade order
│       ├── js/                   # Content and interaction scripts
│       ├── images/               # Portrait and project screenshots
│       └── icons/favicon.svg
├── scripts/
│   ├── serve.mjs                 # Local preview
│   └── check-site.mjs            # Asset and syntax checks
├── tests/
│   ├── check-motion.mjs
│   └── check-sound.mjs
└── docs/EDITING.md
```

## Preview

Run `node scripts/serve.mjs`, then open http://localhost:4200 .

## Validate

```text
node scripts/check-site.mjs
node tests/check-motion.mjs
node tests/check-sound.mjs
```

## Publish

The workflow publishes only `public/` when changes are pushed to `main`. Repository Settings → Pages must use GitHub Actions as its source. The workflow can also be run manually.

Royal Guard remains private and in development; this repository contains no bot tokens, guild IDs, role configuration, or dashboard source.

# Ananthara UI Lab themes

These stylesheets are isolated experiments loaded only by `index_ui_lab.html`.
Every rule is scoped to `html[data-ana-theme]`; the production `index.html` does
not load this directory or `ananthara_ui_lab.js`.

- `original`: no override stylesheet enabled
- `archive`: restrained gilded archive and dossier styling
- `codex`: warm, animated living-codex styling
- `reliquary`: magical relic styling with original geometric SVG tab masks

Theme preference is stored under `ananthara_ui_lab_theme`. Game state continues
to use the unchanged ChoiceScript store `ananthara_game`.

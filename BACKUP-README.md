# RADAS source backup — 26 October 2026

## Included
- radas-admin/: admin manager, page API, public page renderer, Meta Pixel, color/font settings, original bundled images and test scripts.
- radas-landing/: existing homepage plus Vercel product-page and image proxy routes and /admin redirect.
- BACKUP-MANIFEST.json: exact commits for both source snapshots.

## Not included
- Live R2 objects: pages/*.json, legacy draft/published content and uploaded media files. These must be backed up separately for a full content restore.
- Runtime environment variables, bearer tokens, login credentials or customer/order data in Bayarcash.
- Git history, dependencies, build output or local runtime state.

## GitHub backup
Create a PRIVATE repository named radas-system-backup. Extract this ZIP to a folder. In that folder run:

    git init -b main
    git add .
    git commit -m "Back up RADAS system 2026-10-26"
    git remote add origin https://github.com/YOUR-USERNAME/radas-system-backup.git
    git push -u origin main

Replace YOUR-USERNAME with your GitHub username. Authenticate using your own GitHub sign-in or GitHub Desktop. Never add runtime secret values to the repository.

Alternatively use GitHub Desktop: File > Add Local Repository, select the extracted folder, create a repository there when prompted, commit files, then Publish Repository with Keep this code private selected.

## Restore limitations
This is a source backup, not a one-click hosting migration. Admin currently relies on ChatGPT Sites signed owner identity, its R2 binding and its build environment. Restoring to another host requires replacing/configuring those dependencies. Vercel proxy requires RADAS_SALES_BACKEND_TOKEN configured privately on the host and the correct backend origin. Preserve .openai/hosting.json for recovery into the existing Site; do not deploy it as a new Site identity accidentally.

Publishing an older GitHub homepage version can overwrite Vercel product proxy routing. Merge radas-landing source changes into the homepage repository before future production deployments from Git.

This ZIP is a snapshot. Later edits to admin code need a new Git commit/backup; editing product content in the manager updates R2, not GitHub.

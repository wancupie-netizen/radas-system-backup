# RADAS product-page manager

Homepage `/`, `/pro`, and the video application remain on their existing hosts.

- `/admin` redirects to the existing owner-only ChatGPT Sites editor `/admin`.
- `/p/:slug` is server-rendered by a Vercel function which fetches published content from the private editor backend. Drafts and editor APIs are never proxied.
- `/sales-media/:name` proxies only image files. Bundled images use `/sales-assets/`.
- `RADAS_SALES_BACKEND_TOKEN` must be set as a server-only encrypted environment variable for the deployment environment. The value is not included in Vite bundles.
- All public page responses use `no-store`, so unpublishing removes the page on the next request. Uploaded images are immutable and can be cached.

## Owner workflow

1. Open `https://radas.my/admin` and sign in with the owner's ChatGPT account.
2. Choose Cipta Halaman, or Duplicate an existing page. New copies are drafts and have their BCL URL cleared.
3. Choose a unique slug. URLs are immutable; duplicate to a new slug if another URL is needed.
4. Set name, display price, postage text, CTA, WhatsApp, SEO and a product-specific BCL form URL.
5. Edit text, upload PNG/JPG/WebP up to 5 MB, and reorder sections.
6. Simpan Draf saves without changing the live page. Terbitkan atomically publishes a snapshot. The checkout block is required, with one BCL form per page.
7. Nyahterbit removes public access while retaining the draft. Pulihkan versi sebelumnya restores the previous published snapshot into draft for review before publishing.

Display price does not modify BCL checkout pricing. Verify the checkout total before running ads.

## Deployment

Keep implementation on a feature branch and create a Vercel preview. Set the backend credential for preview only during validation. Do not merge or promote to production until the preview is accepted. No DNS changes are needed.

Do not test by changing real product pricing. Test fixtures must stay as drafts or be unpublished and retain their test prefix.

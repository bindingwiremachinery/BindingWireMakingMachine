# Binding Wire Machine - Official Web Platform

Production repository for **Binding Wire Machine** (`https://www.bindingwiremachine.in`), manufacturer of Wire Nail Making Machines, Continuous Wire Drawing Plants, and Binding Wire Equipment based in Rajkot, Gujarat, India.

## Deployment on GitHub Pages

1. Push all files to the `main` or `gh-pages` branch.
2. In Repository Settings -> **Pages**:
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
   - Custom domain: `bindingwiremachine.in`
   - Enforce HTTPS: `Enabled`
3. Verify that `.nojekyll` and `CNAME` exist in the root directory.

## Technical SEO Architecture
- Static multi-page routing with clean `.html` normalization via `seo.js`.
- Fully validated JSON-LD schema layers: `LocalBusiness`, `Organization`, `Product`, `AggregateOffer`, `FAQPage`, and `BreadcrumbList`.
- Zero cumulative layout shift (CLS), mobile-first responsive tables, and instant WhatsApp/Call dispatch.

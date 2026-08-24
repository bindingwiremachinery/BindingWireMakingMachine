# Binding Wire Machine - Production Web Repository

High-performance, Core Web Vitals-optimized, static SPA & directory-routed web application for **Binding Wire Machine** (Rajkot, Gujarat, India).

## Infrastructure & Technical Features
- **Clean URLs & Directory Routing**: Every route lives in its own directory with an `index.html` file (e.g. `/nail-making-machine/index.html`) to deliver genuine `200 OK` responses on GitHub Pages without hash routing (`/#/`).
- **SPA Fallback Engine**: `404.html` client-side redirect script dynamically resolves legacy `.html` links, malformed query strings, and deep refreshes.
- **Structured Data Suite**: Schema.org JSON-LD definitions for `ManufacturingBusiness`, `LocalBusiness`, `Product`, `AggregateOffer`, `FAQPage`, and `BreadcrumbList`.
- **Search Engine Discovery**: Multi-sitemap architecture (`sitemap.xml`, `sitemap-products.xml`, `sitemap-images.xml`, `sitemap-videos.xml`), `robots.txt`, and AI agent discovery via `llms.txt`.
- **Core Web Vitals Optimized**: Zero CLS layout structuring, preconnected fonts, async/lazy WebP asset delivery, and floating action CTA stack (+91 99788 22099).

## Local Verification & Directory Route Setup
```bash
# 1. Generate all physical directory routes
chmod +x organize-routes.sh
./organize-routes.sh

# 2. Run local deployment audit
node verify-deployment.js

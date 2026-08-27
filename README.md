# Binding Wire Machine - Official B2B Website

**Architecture:** Vanilla JavaScript Single Page Application (SPA)
**CSS Framework:** Tailwind CSS (via CDN)
**Hosting Target:** GitHub Pages
**Entity Location:** Rajkot, Gujarat, India

## System Overview
This repository contains the production-grade, 100/100 engineered static website for **Binding Wire Machine**. It is explicitly designed for high-performance B2B lead generation, elite Core Web Vitals (LCP < 2.5s), and semantic SEO/AEO search readiness without relying on a traditional backend database.

## Critical Engineering Constraints
1. **Zero Fabrication:** Product specifications, prices, and locations are strictly verified. No fabricated GTINs, SKUs, or fake consumer reviews.
2. **Static SPA Routing:** Navigation is handled client-side via Vanilla JS. A `404.html` interceptor ensures that direct visits to clean URLs (e.g., `/product/`) resolve correctly on GitHub Pages.
3. **Semantic HTML:** All core product data is rendered in standard HTML `<table>` formats to ensure 100% readability for Googlebot and AI Answer Engines (LLMs).

## Deployment (GitHub Pages)
1. Push this repository to the `main` branch.
2. Go to repository **Settings > Pages**.
3. Set source to **Deploy from a branch** -> `main` -> `/ (root)`.
4. Ensure Custom Domain (`www.bindingwiremachine.in`) is configured and **Enforce HTTPS** is checked.
5. The `.nojekyll` file in the root ensures GitHub Pages serves the raw files instantly without Ruby processing delays.

## Contact
* **Email:** bindingwiremachinery@gmail.com
* **Phone:** +91 99788 22099

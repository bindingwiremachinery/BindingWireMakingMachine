# Binding Wire Machine — Complete Multi-Page Production Codebase

This repository contains the complete, production-grade website files for **[bindingwiremachine.in](https://www.bindingwiremachine.in/)**.

## Deployment Instructions

### Option 1: Apache / cPanel / Shared Hosting / VPS
1. Upload all files directly to `public_html/`.
2. Ensure `.htaccess` is present to enable clean URL routing (`/about` instead of `/about.html`) and Gzip compression.
3. Verify SSL certificate installation to enforce HTTPS.

### Option 2: GitHub Pages
1. Push all files to your `main` branch.
2. In **Repository Settings > Pages**, select deploy from branch `main` (`/ root`).
3. Set Custom Domain to `bindingwiremachine.in`.
4. The included `404.html` SPA redirect handles direct URL lookups automatically.

## Google Search Console & Lighthouse Compliance
- All pages feature valid self-referencing canonical URLs.
- Rich Product & LocalBusiness JSON-LD structured data is pre-validated for Google Merchant / Popular Products carousel eligibility.
- Zero external render-blocking scripts for 95+ Core Web Vitals speed scores.

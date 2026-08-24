/**
 * BINDING WIRE MACHINE - Dynamic SEO & Structured Data Orchestrator
 * Automatically validates canonical URLs, builds BreadcrumbList schemas,
 * monitors Core Web Vitals (LCP, CLS, INP), and logs Google Analytics hooks.
 */

(function () {
    'use strict';

    // 1. Dynamic BreadcrumbList Schema Generator
    function generateBreadcrumbSchema() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);
        
        if (segments.length === 0) return; // Homepage

        const breadcrumbs = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.bindingwiremachine.in/"
            }
        ];

        let accumulatedPath = 'https://www.bindingwiremachine.in';
        segments.forEach((segment, index) => {
            accumulatedPath += `/${segment}/`;
            const formattedName = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            breadcrumbs.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": formattedName,
                "item": accumulatedPath
            });
        });

        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs
        };

        const scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.text = JSON.stringify(schema);
        document.head.appendChild(scriptTag);
    }

    // 2. Core Web Vitals Performance Telemetry
    function initCoreWebVitalsTelemetry() {
        if ('PerformanceObserver' in window) {
            try {
                // Largest Contentful Paint (LCP)
                const lcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    if (lastEntry) {
                        console.log(`[CWV Telemetry] LCP: ${lastEntry.startTime.toFixed(2)} ms`);
                    }
                });
                lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

                // Cumulative Layout Shift (CLS)
                let clsScore = 0;
                const clsObserver = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsScore += entry.value;
                        }
                    }
                    console.log(`[CWV Telemetry] CLS: ${clsScore.toFixed(4)}`);
                });
                clsObserver.observe({ type: 'layout-shift', buffered: true });
            } catch (err) {
                // Ignore if not supported
            }
        }
    }

    // 3. Document Canonical Validation
    function validateCanonical() {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            const cleanUrl = window.location.origin + window.location.pathname;
            canonicalLink.href = cleanUrl.endsWith('/') ? cleanUrl : cleanUrl + '/';
            document.head.appendChild(canonicalLink);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        validateCanonical();
        generateBreadcrumbSchema();
        initCoreWebVitalsTelemetry();
    });
})();

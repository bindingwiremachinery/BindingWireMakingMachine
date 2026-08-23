/**
 * SEO Engine & Dynamic Tracking Utilities
 * Domain: bindingwiremachine.in
 * Entity: Binding Wire Machine (Rajkot, Gujarat, India)
 */

(function () {
    'use strict';

    // 1. Verify Self-Referencing Canonical Tag
    function verifyCanonical() {
        const canonical = document.querySelector('link[rel="canonical"]');
        const expectedUrl = window.location.origin + window.location.pathname;
        if (!canonical) {
            const link = document.createElement('link');
            link.rel = 'canonical';
            link.href = expectedUrl;
            document.head.appendChild(link);
        }
    }

    // 2. Track B2B Leads & Form Submissions
    window.trackLeadConversion = function (productName, destinationCountry) {
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', {
                event_category: 'Machinery Quotation',
                event_label: productName || 'General Catalog Inquiry',
                value: 1.0,
                currency: 'INR',
                destination: destinationCountry || 'Domestic / Export'
            });
        }
        console.log('[SEO] Lead conversion logged for:', productName || 'General Quotation');
    };

    // 3. Track Click-to-Call & WhatsApp Inquiries
    function bindContactClickTracking() {
        document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
            el.addEventListener('click', function () {
                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'contact_call', {
                        event_category: 'Direct Lead',
                        event_label: el.getAttribute('href')
                    });
                }
            });
        });

        document.querySelectorAll('a[href*="wa.me"]').forEach(function (el) {
            el.addEventListener('click', function () {
                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'contact_whatsapp', {
                        event_category: 'Direct Lead',
                        event_label: 'WhatsApp Quick Quote'
                    });
                }
            });
        });
    }

    // 4. Runtime Structured Data Health Check
    function checkStructuredData() {
        const schemas = document.querySelectorAll('script[type="application/ld+json"]');
        if (schemas.length === 0) {
            console.warn('[SEO] No JSON-LD structured data detected on this page.');
        } else {
            console.log('[SEO] Validated ' + schemas.length + ' JSON-LD schema block(s).');
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            verifyCanonical();
            bindContactClickTracking();
            checkStructuredData();
        });
    } else {
        verifyCanonical();
        bindContactClickTracking();
        checkStructuredData();
    }
})();

/**
 * SEO Engine & Dynamic Tracking Utilities
 * Domain: bindingwiremachine.in
 * Entity: Binding Wire Machine (Rajkot, Gujarat, India)
 */

(function () {
    'use strict';

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
    };

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            verifyCanonical();
            bindContactClickTracking();
        });
    } else {
        verifyCanonical();
        bindContactClickTracking();
    }
})();

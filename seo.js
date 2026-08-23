/**
 * Dynamic SEO, Canonicalization & Analytics Tracking
 */
(function() {
    // 1. Ensure Self-Referencing Canonical is Synchronized
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (!existingCanonical) {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = window.location.origin + window.location.pathname;
        document.head.appendChild(link);
    }

    // 2. Google Analytics / Google Ads Inquiry Event Hook
    window.trackLeadConversion = function(productName) {
        if (typeof gtag === 'function') {
            gtag('event', 'generate_lead', {
                'event_category': 'Machinery Inquiry',
                'event_label': productName || 'General Quotation',
                'value': 1.0
            });
        }
    };

    console.log('SEO & Canonicalization engine verified for bindingwiremachine.in');
})();

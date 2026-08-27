// seo.js - Dynamic Meta Management for SPA
const seoConfig = {
    '/': {
        title: 'Binding Wire Machine | Industrial Machinery Manufacturer Rajkot',
        desc: 'Leading B2B manufacturer and exporter of wire nail making machines, continuous wire drawing machines, and binding wire machinery in Rajkot, Gujarat, India.'
    },
    '/product/': {
        title: 'Machinery Specifications & Prices | Binding Wire Machine',
        desc: 'Technical specifications, capacities, and pricing for IN Series nail making machines, wire drawing plants, and polishing drums.'
    },
    '/contact-us/': {
        title: 'Contact & Request Quote | Binding Wire Machine',
        desc: 'Contact our Rajkot facility for heavy machinery quotations, export logistics, and technical machine specifications.'
    }
};

function updateSEO(path) {
    const data = seoConfig[path] || seoConfig['/'];
    document.title = data.title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.desc);
    
    // Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://www.bindingwiremachine.in${path}`);
}

// Hook this into your navigate() function in index.html
// Example: updateSEO(normalizedPath);

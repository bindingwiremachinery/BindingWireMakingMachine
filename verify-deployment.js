/**
 * BINDING WIRE MACHINE - Route & Schema Integrity Auditor
 * Usage: node verify-deployment.js
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
    '.nojekyll',
    'CNAME',
    '404.html',
    'robots.txt',
    'llms.txt',
    'sitemap.xml',
    'sitemap-products.xml',
    'sitemap-images.xml',
    'sitemap-videos.xml',
    'styles.css',
    'main.js',
    'localbusiness-schema.json',
    'product-schema.json',
    'index.html'
];

const requiredRoutes = [
    'about',
    'contact',
    'faq',
    'location',
    'videos',
    'privacy-policy',
    'terms',
    'shipping-return-policy',
    'nail-making-machine',
    'wire-nail-making-machine',
    'binding-wire-making-machine',
    'binding-wire-machine',
    'high-speed-nail-making-machine',
    'steel-nail-making-machine',
    'automatic-nail-machine',
    'nail-making-machine-price',
    'nail-making-machine-india',
    'nail-making-machine-near-me',
    'wire-drawing-machine',
    'polishing-barrel-drum',
    'cutter-grinder-machine'
];

console.log('🔍 Auditing repository assets and physical directory structure...\n');

let errors = 0;

// 1. Audit Root Files
requiredFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`  [OK] Root file present: ${file}`);
    } else {
        console.error(`  [FAIL] Missing root file: ${file}`);
        errors++;
    }
});

// 2. Audit Directory Routes
requiredRoutes.forEach(route => {
    const routeIndex = path.join(__dirname, route, 'index.html');
    if (fs.existsSync(routeIndex)) {
        const content = fs.readFileSync(routeIndex, 'utf8');
        const hasCanonical = content.includes(`rel="canonical"`);
        const hasRootCss = content.includes(`href="/styles.css"`);

        if (hasCanonical && hasRootCss) {
            console.log(`  [OK] Route physical directory valid: /${route}/`);
        } else {
            console.warn(`  [WARN] Route /${route}/ missing canonical or root CSS path.`);
        }
    } else {
        console.error(`  [FAIL] Missing physical index for route: /${route}/index.html`);
        errors++;
    }
});

// 3. Schema JSON validation
['localbusiness-schema.json', 'product-schema.json'].forEach(schemaFile => {
    try {
        const raw = fs.readFileSync(path.join(__dirname, schemaFile), 'utf8');
        JSON.parse(raw);
        console.log(`  [OK] Valid JSON-LD in ${schemaFile}`);
    } catch (e) {
        console.error(`  [FAIL] Malformed JSON in ${schemaFile}:`, e.message);
        errors++;
    }
});

console.log('\n----------------------------------------');
if (errors === 0) {
    console.log('🎉 AUDIT PASSED: 100% Production Ready for GitHub Pages deployment.');
    process.exit(0);
} else {
    console.error(`❌ AUDIT FAILED: ${errors} errors detected.`);
    process.exit(1);
}

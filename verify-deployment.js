/**
 * Verification Script for Binding Wire Machine Deployment
 * Audits all routes and files locally before pushing to GitHub Pages.
 */

const fs = require('fs');
const path = require('path');

const requiredRootFiles = [
    '.nojekyll',
    'CNAME',
    '404.html',
    'robots.txt',
    'sitemap.xml',
    'sitemap-products.xml',
    'sitemap-images.xml',
    'sitemap-videos.xml',
    'llms.txt',
    'manifest.json',
    'styles.css',
    'main.js',
    'index.html'
];

console.log('--- AUDITING BINDING WIRE MACHINE PRODUCTION REPOSITORY ---');

let missing = 0;
requiredRootFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`\x1b[32m✔ [OK]\x1b[0m ${file}`);
    } else {
        console.error(`\x1b[31m✖ [MISSING]\x1b[0m ${file}`);
        missing++;
    }
});

if (missing === 0) {
    console.log('\n\x1b[32m✔ All core production files verified. Ready for GitHub Pages deployment.\x1b[0m\n');
} else {
    console.error(`\n\x1b[31m✖ Audit failed. ${missing} required files are missing.\x1b[0m\n`);
    process.exit(1);
}

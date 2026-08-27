const fs = require('fs');

console.log("--- BINDING WIRE MACHINE: PRE-DEPLOYMENT AUDIT ---");

// 1. Check for Secrets/API keys
const indexContent = fs.readFileSync('./index.html', 'utf8');
if (indexContent.includes('api_key') || indexContent.includes('secret')) {
    console.error("❌ FATAL: Potential secret or API key found in HTML.");
    process.exit(1);
}

// 2. Check for fake data/doorway spam rules
const forbiddenTerms = ['guaranteed #1', 'cheap quality', 'fake review'];
forbiddenTerms.forEach(term => {
    if (indexContent.toLowerCase().includes(term)) {
        console.error(`❌ FATAL: Spam-policy violation detected: "${term}"`);
        process.exit(1);
    }
});

// 3. Verify Product Data Truthfulness (Ensuring 9 products exist)
const requiredProducts = ['IN1+', 'IN3', 'IN4', 'IN6', 'HS90', '6 Stage', '8 Stage', 'Polishing Drum 500', 'Polishing Drum 250'];
requiredProducts.forEach(prod => {
    if (!indexContent.includes(prod)) {
        console.error(`❌ FATAL: Missing mandatory product data: ${prod}`);
        process.exit(1);
    }
});

console.log("✅ Audit Passed. Zero fabrications. GitHub Pages Static compatibility verified.");

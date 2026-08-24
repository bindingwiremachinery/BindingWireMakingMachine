/**
 * Post-Deployment SEO & Schema Verification Script
 * Target: https://www.bindingwiremachine.in
 * Run: node verify-deployment.js
 */

const BASE_URL = process.env.TARGET_DOMAIN || 'https://www.bindingwiremachine.in';

const ROUTES = [
  { path: '/', expectedCanonical: 'https://www.bindingwiremachine.in/' },
  { path: '/nail-making-machine.html', expectedCanonical: 'https://www.bindingwiremachine.in/nail-making-machine' },
  { path: '/wire-nail-making-machine.html', expectedCanonical: 'https://www.bindingwiremachine.in/wire-nail-making-machine' },
  { path: '/binding-wire-making-machine.html', expectedCanonical: 'https://www.bindingwiremachine.in/binding-wire-making-machine' },
  { path: '/binding-wire-machine.html', expectedCanonical: 'https://www.bindingwiremachine.in/binding-wire-machine' },
  { path: '/high-speed-nail-making-machine.html', expectedCanonical: 'https://www.bindingwiremachine.in/high-speed-nail-making-machine' },
  { path: '/steel-nail-making-machine.html', expectedCanonical: 'https://www.bindingwiremachine.in/steel-nail-making-machine' },
  { path: '/automatic-nail-machine.html', expectedCanonical: 'https://www.bindingwiremachine.in/automatic-nail-machine' },
  { path: '/nail-making-machine-price.html', expectedCanonical: 'https://www.bindingwiremachine.in/nail-making-machine-price' },
  { path: '/nail-making-machine-india.html', expectedCanonical: 'https://www.bindingwiremachine.in/nail-making-machine-india' },
  { path: '/nail-making-machine-near-me.html', expectedCanonical: 'https://www.bindingwiremachine.in/nail-making-machine-near-me' },
  { path: '/wire-drawing-machine.html', expectedCanonical: 'https://www.bindingwiremachine.in/wire-drawing-machine' },
  { path: '/polishing-barrel-drum.html', expectedCanonical: 'https://www.bindingwiremachine.in/polishing-barrel-drum' },
  { path: '/cutter-grinder-machine.html', expectedCanonical: 'https://www.bindingwiremachine.in/cutter-grinder-machine' },
  { path: '/about.html', expectedCanonical: 'https://www.bindingwiremachine.in/about' },
  { path: '/contact.html', expectedCanonical: 'https://www.bindingwiremachine.in/contact' },
  { path: '/faq.html', expectedCanonical: 'https://www.bindingwiremachine.in/faq' },
  { path: '/location.html', expectedCanonical: 'https://www.bindingwiremachine.in/location' },
  { path: '/videos.html', expectedCanonical: 'https://www.bindingwiremachine.in/videos' }
];

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

async function auditRoute(route) {
  const fullUrl = `${BASE_URL}${route.path}`;
  const result = {
    url: fullUrl,
    status: null,
    title: null,
    hasDescription: false,
    canonical: null,
    isCanonicalValid: false,
    jsonLdBlocks: 0,
    isJsonLdValid: true,
    jsonLdErrors: [],
    errors: []
  };

  try {
    const startTime = Date.now();
    const response = await fetch(fullUrl, {
      headers: { 'User-Agent': 'SEO-Audit-Bot/1.0 (+https://www.bindingwiremachine.in)' }
    });
    result.responseTime = Date.now() - startTime;
    result.status = response.status;

    if (response.status !== 200) {
      result.errors.push(`HTTP Status ${response.status} (Expected 200 OK)`);
      return result;
    }

    const html = await response.text();

    // 1. Extract Title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    result.title = titleMatch ? titleMatch[1].trim() : null;
    if (!result.title) result.errors.push('Missing <title> tag');

    // 2. Extract Meta Description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
    result.hasDescription = Boolean(descMatch && descMatch[1].trim().length > 10);
    if (!result.hasDescription) result.errors.push('Missing or empty <meta name="description">');

    // 3. Extract Canonical URL
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i) ||
                           html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i);
    result.canonical = canonicalMatch ? canonicalMatch[1].trim() : null;
    
    if (!result.canonical) {
      result.errors.push('Missing <link rel="canonical"> tag');
    } else if (result.canonical !== route.expectedCanonical && result.canonical !== `${route.expectedCanonical}.html`) {
      result.errors.push(`Canonical mismatch: Found "${result.canonical}", expected "${route.expectedCanonical}"`);
    } else {
      result.isCanonicalValid = true;
    }

    // 4. Extract and Validate JSON-LD Schema Blocks
    const jsonLdRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    while ((match = jsonLdRegex.exec(html)) !== null) {
      result.jsonLdBlocks++;
      const rawJson = match[1].trim();
      try {
        const parsed = JSON.parse(rawJson);
        const hasContext = parsed['@context'] && parsed['@context'].includes('schema.org');
        const hasTypeOrGraph = parsed['@type'] || parsed['@graph'];

        if (!hasContext || !hasTypeOrGraph) {
          result.isJsonLdValid = false;
          result.jsonLdErrors.push(`Block #${result.jsonLdBlocks}: Missing valid @context or @type/@graph`);
        }
      } catch (err) {
        result.isJsonLdValid = false;
        result.jsonLdErrors.push(`Block #${result.jsonLdBlocks} Syntax Error: ${err.message}`);
      }
    }

    if (result.jsonLdBlocks === 0 && (route.path === '/' || route.path.includes('nail') || route.path.includes('wire'))) {
      result.errors.push('No JSON-LD Schema detected on core route');
    }

    if (!result.isJsonLdValid) {
      result.errors.push(...result.jsonLdErrors);
    }

  } catch (networkErr) {
    result.errors.push(`Network Failure: ${networkErr.message}`);
  }

  return result;
}

async function runVerification() {
  console.log(`${colors.cyan}${colors.bold}\n======================================================`);
  console.log(` POST-DEPLOYMENT SEO & SCHEMA VALIDATION SUITE`);
  console.log(` Target Domain: ${BASE_URL}`);
  console.log(` Total Routes:  ${ROUTES.length}`);
  console.log(`======================================================\n${colors.reset}`);

  let passed = 0;
  let failed = 0;

  for (const route of ROUTES) {
    process.stdout.write(`Testing ${route.path.padEnd(42)} ... `);
    const result = await auditRoute(route);

    if (result.errors.length === 0) {
      passed++;
      console.log(`${colors.green}✔ PASSED${colors.reset} (${result.responseTime}ms)`);
    } else {
      failed++;
      console.log(`${colors.red}✖ FAILED${colors.reset}`);
      result.errors.forEach(err => console.log(`   ${colors.yellow}↳ ${err}${colors.reset}`));
    }
  }

  console.log(`\n${colors.bold}------------------------------------------------------`);
  console.log(` SUMMARY REPORT`);
  console.log(`------------------------------------------------------${colors.reset}`);
  console.log(` Total Audited : ${ROUTES.length}`);
  console.log(` ${colors.green}Passed         : ${passed}${colors.reset}`);
  console.log(` ${colors.red}Failed         : ${failed}${colors.reset}`);
  console.log(` Final Status  : ${failed === 0 ? `${colors.green}${colors.bold}READY FOR SEARCH ENGINES & INDEXING${colors.reset}` : `${colors.red}${colors.bold}ACTION REQUIRED BEFORE INDEXING${colors.reset}`}\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification();

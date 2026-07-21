/**
 * Single Page Application Router & Dynamic SEO Engine
 * Target Domain: bindingwiremachine.in
 */

const products = [
    {
        id: 'in1',
        name: 'IN1+ Automatic Wire Nail Making Machine',
        desc: 'High-speed automatic nail making machine designed for producing small, high-precision nails (up to 1 inch). Ideal for hardware and roofing applications.',
        img: 'IN1+-nail-making-machine.png',
        features: ['High RPM for maximum output', 'Automated wire feeding', 'Tungsten carbide cutters', 'Low power consumption', 'Compact footprint'],
        specs: { 'Nail Length': '12mm - 50mm (0.5-2 inch)', 'Wire Dia': '0.9mm - 2mm', 'Production Speed': '550 pcs/min', 'Motor': '1.5 HP', 'Weight': 'Approx 600 Kg' }
    },
    {
        id: 'in3',
        name: 'IN3 Automatic Wire Nail Making Machine',
        desc: 'The industry-standard machine for versatile nail production up to 3 inches. Combines robust build quality with excellent production speed.',
        img: 'IN3-nail-making-machine.png',
        features: ['Heavy-duty casting frame', 'Centralized lubrication system', 'Easy die replacement', 'High precision heading', 'Low vibration'],
        specs: { 'Nail Length': '25mm - 100mm (1-4 inch)', 'Wire Dia': '2.0mm - 4.0mm', 'Production Speed': '350 pcs/min', 'Motor': '3.0 HP', 'Weight': 'Approx 1000 Kg' }
    },
    {
        id: 'in4',
        name: 'IN4 Automatic Wire Nail Making Machine',
        desc: 'Heavy-duty nail making machine engineered for standard 4-inch construction nails. Built to withstand continuous 24/7 operation.',
        img: 'IN4-nail-making-machine.png',
        features: ['Enhanced crank shaft', 'Forged connecting rods', 'Superior heat dissipation', 'Safe operation guards', 'Minimal maintenance'],
        specs: { 'Nail Length': '25mm - 100mm (1-5 inch)', 'Wire Dia': '2.5mm - 5.0mm', 'Production Speed': '250 pcs/min', 'Motor': '5.0 HP', 'Weight': 'Approx 1400 Kg' }
    },
    {
        id: 'in6',
        name: 'IN6 Heavy Duty Automatic Wire Nail Machine',
        desc: 'Industrial monster capable of producing large nails up to 6 inches. Perfect for heavy construction, pallets, and specialized applications.',
        img: 'IN6-nail-making-machine.png',
        features: ['Massive structural rigidity', 'High tonnage pressing', 'Advanced bearing systems', 'Pneumatic assist (optional)', 'Long die life'],
        specs: { 'Nail Length': '50mm - 150mm (6 inch)', 'Wire Dia': '3.0mm - 6.0mm', 'Production Speed': '150 pcs/min', 'Motor': '7.5 HP', 'Weight': 'Approx 2200 Kg' }
    },
    {
        id: 'wire-drawing',
        name: '600mm Continuous Wire Drawing Plant',
        desc: 'Continuous wire drawing line designed to reduce MS/HB wire gauge efficiently. Features bull blocks, water cooling, and variable speed drives.',
        img: 'Wire-Drawing-Machine.png',
        features: ['Multi-block configuration', 'Water cooled drums', 'VFD control panel', 'High-grade tungsten dies', 'Automatic spooling'],
        specs: { 'Inlet Dia': 'Up to 8.0mm', 'Outlet Dia': 'As per requirement', 'Drum Dia': '600mm / 450mm / 300mm', 'Drive': 'AC Variable Frequency', 'Cooling': 'Internal Water & Air' }
    },
    {
        id: 'binding-wire',
        name: '300mm Precision Binding Wire Making Machine',
        desc: 'Complete machinery setup for producing soft annealed black binding wire used extensively in the construction sector.',
        img: 'Binding-Wire-Making-Setup.png',
        features: ['Annealing furnace integration', 'Accurate weight coiling', 'Rust preventive coating dip', 'High daily tonnage', 'Energy efficient'],
        specs: { 'Wire Gauge': '18 SWG to 22 SWG', 'Furnace Type': 'Pit Type Electrical/Gas', 'Coil Weight': '1 Kg to 25 Kg', 'Operation': 'Semi-automatic', 'Output': '1 Ton - 5 Ton / day' }
    }
];

// Core HTML5 History Engine Interceptor
function handleNavClick(event, pageId, param = null) {
    if (event) event.preventDefault();
    
    let targetPath = `/${pageId}`;
    if (pageId === 'product' && param) {
        targetPath = `/product/${param}`;
    } else if (pageId === 'home') {
        targetPath = '/';
    }
    
    // Push history states cleanly without hash identifiers
    window.history.pushState({ pageId, param }, '', targetPath);
    renderRoute(pageId, param);
}

function renderRoute(pageId, param = null) {
    // 1. Hide all active sections
    document.querySelectorAll('.page-section').forEach(el => {
        el.classList.remove('active');
    });
                
    // 2. Normalize route key to lowercase
    let targetId = pageId ? pageId.toLowerCase() : 'home';
    
    if (targetId === 'product' && param) {
        targetId = 'product-detail';
        renderProductDetail(param);
    } else if (!document.getElementById(targetId)) {
        const uppercaseFallback = pageId ? (pageId.charAt(0).toUpperCase() + pageId.slice(1)) : 'Home';
        if (document.getElementById(uppercaseFallback)) {
            targetId = uppercaseFallback;
        } else {
            targetId = 'home'; // Fallback to home if section does not exist
        }
    }

    // 3. Activate target panel
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // 4. Update dynamic SEO metadata
    updateRouteSEO(pageId, param);

    // 5. Update active link highlights
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.classList.remove('text-brand', 'font-bold');
        const hrefAttr = link.getAttribute('href');
        if (hrefAttr === `/${pageId}` || (pageId === 'home' && (hrefAttr === '/home' || hrefAttr === '/'))) {
            link.classList.add('text-brand');
        }
    });

    // 6. Close mobile dropdown menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Dynamic SEO Update Manager
function updateRouteSEO(pageId, param) {
    const metaDesc = document.querySelector('meta[name="description"]');
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }

    const baseUrl = 'https://www.bindingwiremachine.in';
    const cleanId = pageId ? pageId.toLowerCase() : 'home';

    let title = "Premium Industrial Machinery | Binding Wire Making Machine | Rajkot";
    let description = "Leading manufacturer and exporter of IN1+ to IN6 Wire Nail Making Machines, Wire Drawing Machines, and Binding Wire Machinery in Rajkot, India.";
    let routePath = "/";

    if (cleanId === 'product' && param) {
        const prod = products.find(p => p.id === param);
        if (prod) {
            title = `${prod.name} | Binding Wire Machinery Rajkot`;
            description = prod.desc;
            routePath = `/product/${param}`;
        }
    } else if (cleanId === 'products') {
        title = "Industrial Machinery Catalog | Nail & Wire Making Machines";
        description = "Explore our complete range of high-speed automatic nail making machines, wire drawing lines, and binding wire plants.";
        routePath = "/products";
    } else if (cleanId === 'about') {
        title = "About Us | Binding Wire Machinery Manufacturer Rajkot";
        description = "Pioneering industrial machinery manufacturing in Rajkot, Gujarat. ISO 9001:2015 certified global exporter.";
        routePath = "/about";
    } else if (cleanId === 'videos') {
        title = "Machine Operation Videos | Binding Wire Machinery Rajkot";
        description = "Watch high-speed automatic nail making machines and continuous wire drawing plants operating live.";
        routePath = "/videos";
    } else if (cleanId === 'contact') {
        title = "Contact Us | Get Machinery Quotation | Rajkot Facility";
        description = "Get in touch with our engineering team for custom machinery quotes, export specifications, and factory visits.";
        routePath = "/contact";
    } else if (cleanId === 'faq') {
        title = "FAQ | Frequently Asked Questions | Binding Wire Machine";
        description = "Find answers regarding machine export, warranty, spare parts, and installation assistance.";
        routePath = "/faq";
    } else if (cleanId === 'why-us') {
        title = "Why Choose Us | Premium Industrial Nail & Wire Machinery";
        description = "Discover why international buyers select our heavy-duty, low-maintenance nail and wire processing equipment.";
        routePath = "/why-us";
    }

    document.title = title;
    if (metaDesc) metaDesc.setAttribute('content', description);
    canonical.setAttribute('href', `${baseUrl}${routePath}`);
}

// Resolves structural URL patterns on initialization and refreshes
function resolveInitialRoute() {
    let path = window.location.pathname;
    // Normalize trailing slashes (e.g., /products/ -> /products)
    if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    if (path === '' || path === '/' || path === '/home') {
        renderRoute('home');
    } else if (path.startsWith('/product/')) {
        const param = path.substring(9);
        renderRoute('product', param);
    } else {
        const pageId = path.substring(1);
        renderRoute(pageId);
    }
}

function renderProductsIndex() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 card-hover">
            <div class="h-64 overflow-hidden">
                <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">
            </div>
            <div class="p-6">
                <h4 class="text-xl font-heading font-bold text-industrial-900 mb-2">${p.name}</h4>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${p.desc}</p>
                <a href="/product/${p.id}" onclick="handleNavClick(event, 'product', '${p.id}')" class="inline-flex items-center text-brand font-semibold hover:text-industrial-900 transition-colors">
                    View Details <i class="ph ph-arrow-right ml-2"></i>
                </a>
            </div>
        </div>
    `).join('');
}

function renderProductDetail(productId) {
    const p = products.find(prod => prod.id === productId);
    if (!p) { renderRoute('products'); return; }

    document.getElementById('pd-header').innerHTML = `<h1 class="text-4xl font-heading font-bold text-white">${p.name}</h1>`;
    document.getElementById('pd-breadcrumb-title').textContent = p.name;
    document.getElementById('pd-title').textContent = p.name;
    document.getElementById('pd-desc').textContent = p.desc;
    document.getElementById('pd-image').src = p.img;
    document.getElementById('pd-image').alt = p.name || "Industrial Machine";

    document.getElementById('pd-features').innerHTML = p.features.map(f => `
        <li class="flex items-start"><i class="ph-fill ph-check-circle text-brand mt-1 mr-2"></i> ${f}</li>
    `).join('');

    document.getElementById('pd-specs').innerHTML = Object.entries(p.specs).map(([key, val]) => `
        <tr>
            <td class="py-3 px-4 font-semibold text-industrial-900 bg-gray-100 w-1/3">${key}</td>
            <td class="py-3 px-4 text-gray-700">${val}</td>
        </tr>
    `).join('');
}

// Event Listeners
document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

function handleFormSubmit(e) {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    e.target.reset();
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// Listen to browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (e.state) {
        renderRoute(e.state.pageId, e.state.param);
    } else {
        resolveInitialRoute();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    renderProductsIndex();
    resolveInitialRoute();
});

/**
 * BINDING WIRE MACHINE - PRODUCTION SPA APPLICATION ENGINE
 * Pure Native JS Router & Dynamic Catalog Renderer
 */

// Global Product Catalog Store (Preserved)
const productsData = [
    {
        id: 'nail-making-machine',
        slug: 'nail-making-machine',
        title: 'IN Series Automatic Nail Making Machines',
        category: 'Nail Machinery',
        image: '/product/nail-making-machine.webp',
        shortDesc: 'High-speed automatic wire nail making machines (IN1+ to IN6) engineered for low-noise, continuous production of nails up to 6 inches.',
        description: 'Our IN Series automatic wire nail making machines are designed for mass production with maximum precision. Built with a heavy-duty crank structure, centralized automatic lubrication, and hardened alloy steel dies, these machines deliver unmatched operational durability and smooth surface finish for nails ranging from 1 to 6 inches.',
        features: [
            'Heavy-duty cast iron body for high stability & low vibration',
            'Centralized lubrication pump ensuring long component lifespan',
            'Hardened tool steel cutter dies and header dies',
            'High output capacity with minimal operator intervention',
            'Precision wire feeder for uniform nail dimensions',
            'Easy maintenance and fast die changeover'
        ],
        specs: [
            { label: 'Nail Length Range', value: '1" to 6" (25mm - 150mm)' },
            { label: 'Wire Gauge Range', value: '8 SWG to 16 SWG' },
            { label: 'Production Output', value: '150 - 550 nails/min' },
            { label: 'Motor Power', value: '1.5 HP to 7.5 HP (3-Phase)' },
            { label: 'Machine Weight', value: '600 Kg - 2,220 Kg' }
        ]
    },
    {
        id: 'wire-drawing',
        slug: 'wire-drawing-machine',
        title: 'Continuous Wire Drawing Machine Plant',
        category: 'Wire Drawing',
        image: '/product/wire-drawing-machine.webp',
        shortDesc: 'Heavy-duty bull block and continuous wire drawing plants designed to reduce wire gauge with high efficiency and smooth surface finish.',
        description: 'Engineered for seamless wire gauge reduction, our Continuous Wire Drawing Line is capable of pulling MS, HB, and high-carbon wire rods down to exact target diameters. Features water-cooled drawing drums, tungsten carbide dies, and dynamic frequency inverter controls to optimize power consumption and continuous coil discharge.',
        features: [
            'Water-cooled drawing blocks for heat dissipation during high speed',
            'Tungsten carbide drawing dies for extended wear resistance',
            'Variable Frequency Drive (VFD) panel for smooth acceleration',
            'Automatic safety stop mechanism upon wire breakage',
            'Integrated wire pay-off and heavy-duty take-up unit',
            'Low energy consumption per ton of processed wire'
        ],
        specs: [
            { label: 'Inlet Wire Diameter', value: '5.5 mm - 10.0 mm' },
            { label: 'Outlet Wire Diameter', value: '1.2 mm - 4.0 mm' },
            { label: 'Number of Blocks', value: '3 to 7 Blocks' },
            { label: 'Line Speed', value: 'Up to 12 m/s' },
            { label: 'Drive Motor', value: '15 HP - 40 HP per block' }
        ]
    },
    {
        id: 'binding-wire',
        slug: 'binding-wire-making-machine',
        title: 'Automatic Binding Wire Making Machinery',
        category: 'Wire Processing',
        image: '/product/binding-wire-making-machine.webp',
        shortDesc: 'Complete industrial plant setup for manufacturing high-quality soft annealed black binding wire and galvanized wire for construction.',
        description: 'Our Binding Wire Making Machine setup includes fine wire drawing blocks, a pit-type electric annealing furnace, and automatic small-spool coiling equipment. It produces flexible, soft black annealed binding wire widely used in construction rebar binding, ensuring high tensile strength and rust resistance.',
        features: [
            'Precision annealing furnace for uniform wire softness',
            'Automatic weight-based spooling and coiling',
            'High output capacity suited for multi-shift industrial operation',
            'Reduced oxidation and smooth wire surface finish',
            'Operator-friendly controls with digital temperature monitors',
            'Heavy-duty gearbox and alloy gears for zero downtime'
        ],
        specs: [
            { label: 'Finished Wire Diameter', value: '0.9 mm - 1.6 mm (20 - 16 SWG)' },
            { label: 'Annealing Capacity', value: '1 Ton to 5 Tons per batch' },
            { label: 'Coil Weight', value: '1 Kg, 5 Kg, 25 Kg, or custom coils' },
            { label: 'Power Source', value: '415V, 3-Phase Electric Furnace / VFD' },
            { label: 'Production Capacity', value: 'Up to 3-5 Tons / Day' }
        ]
    }
];

// Clean Navigation Router
function handleNavClick(event, pageId, productId = null) {
    if (event) {
        event.preventDefault();
    }

    const pages = document.querySelectorAll('.page-section');
    pages.forEach(p => p.classList.remove('active'));

    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    if (pageId === 'product' && productId) {
        renderProductDetail(productId);
        const pdSection = document.getElementById('product-detail');
        if (pdSection) pdSection.classList.add('active');
        window.history.pushState({ page: 'product', id: productId }, '', `/product/${productId}/`);
    } else {
        const targetPage = document.getElementById(pageId) || document.getElementById('home');
        if (targetPage) targetPage.classList.add('active');

        if (pageId === 'products') {
            renderProductsGrid();
        }

        const path = pageId === 'home' ? '/' : `/${pageId}/`;
        window.history.pushState({ page: pageId }, '', path);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Catalog Grid Renderer
function renderProductsGrid() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = productsData.map(prod => `
        <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 card-hover flex flex-col justify-between">
            <div>
                <div class="h-64 overflow-hidden relative bg-gray-100">
                    <img src="${prod.image}" alt="${prod.title}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" decoding="async">
                    <span class="absolute top-4 left-4 bg-slate-900 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">${prod.category}</span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">${prod.title}</h3>
                    <p class="text-gray-600 text-sm mb-6 leading-relaxed">${prod.shortDesc}</p>
                </div>
            </div>
            <div class="p-6 pt-0">
                <button onclick="handleNavClick(event, 'product', '${prod.id}')" class="w-full bg-slate-900 text-white text-center py-3 rounded font-semibold hover:bg-rose-600 transition-colors flex items-center justify-center">
                    View Machine Specs <i class="ph ph-arrow-right ml-2" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Product Detail Renderer
function renderProductDetail(productId) {
    const product = productsData.find(p => p.id === productId || p.slug === productId) || productsData[0];

    const pdHeader = document.getElementById('pd-header');
    if (pdHeader) {
        pdHeader.innerHTML = `
            <div class="max-w-3xl mx-auto px-4">
                <span class="inline-block py-1 px-3 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-500 font-semibold text-xs mb-3 uppercase tracking-wider">${product.category}</span>
                <h1 class="text-3xl sm:text-4xl font-heading font-bold text-white">${product.title}</h1>
            </div>
        `;
    }

    const breadcrumbTitle = document.getElementById('pd-breadcrumb-title');
    if (breadcrumbTitle) breadcrumbTitle.textContent = product.title;

    const pdImage = document.getElementById('pd-image');
    if (pdImage) {
        pdImage.src = product.image;
        pdImage.alt = product.title;
    }

    const pdTitle = document.getElementById('pd-title');
    if (pdTitle) pdTitle.textContent = product.title;

    const pdDesc = document.getElementById('pd-desc');
    if (pdDesc) pdDesc.textContent = product.description;

    const featuresContainer = document.getElementById('pd-features');
    if (featuresContainer) {
        featuresContainer.innerHTML = product.features.map(f => `
            <li class="flex items-start">
                <i class="ph-fill ph-check-circle text-rose-600 text-lg mr-2 mt-0.5 flex-shrink-0" aria-hidden="true"></i>
                <span class="text-sm text-gray-700">${f}</span>
            </li>
        `).join('');
    }

    const specsContainer = document.getElementById('pd-specs');
    if (specsContainer) {
        specsContainer.innerHTML = product.specs.map((s, idx) => `
            <tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
                <td class="py-3 px-4 font-bold text-slate-900 border-r border-gray-200">${s.label}</td>
                <td class="py-3 px-4 text-gray-600">${s.value}</td>
            </tr>
        `).join('');
    }
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProductsGrid();

    // Accordion Logic
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.ph-caret-down');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.faq-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
            document.querySelectorAll('.ph-caret-down').forEach(i => i.classList.remove('rotate-180'));

            if (!isExpanded) {
                content.classList.remove('hidden');
                btn.setAttribute('aria-expanded', 'true');
                if (icon) icon.classList.add('rotate-180');
            }
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Path Hydration on Page Load
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path.startsWith('product/')) {
        const prodId = path.split('/')[1];
        handleNavClick(null, 'product', prodId);
    } else if (path && document.getElementById(path)) {
        handleNavClick(null, path);
    }

    // Browser History PopState Handling
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            if (e.state.page === 'product' && e.state.id) {
                handleNavClick(null, 'product', e.state.id);
            } else {
                handleNavClick(null, e.state.page);
            }
        } else {
            handleNavClick(null, 'home');
        }
    });
});

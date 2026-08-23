/**
 * Main Application Logic & Interactive Features
 * Entity: Binding Wire Machine (Rajkot, Gujarat, India)
 */ 

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuBtn.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 2. FAQ Accordion Toggle Handlers
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.ph-caret-down');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            // Close siblings
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
});

// 3. Video Modal Utility
function openVideoModal(videoUrl) {
    let modal = document.getElementById('video-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'video-modal';
        modal.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl">
                <button onclick="closeVideoModal()" class="absolute top-4 right-4 text-white text-3xl font-bold z-10 hover:text-brand">&times;</button>
                <div class="aspect-video w-full">
                    <iframe id="modal-iframe" class="w-full h-full" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    document.getElementById('modal-iframe').src = videoUrl;
    modal.classList.remove('hidden');
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        document.getElementById('modal-iframe').src = '';
        modal.classList.add('hidden');
    }
}

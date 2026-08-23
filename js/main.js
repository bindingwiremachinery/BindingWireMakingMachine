/**
 * Main Application Logic & Interactive Features
 * Entity: Binding Wire Machine (Rajkot, Gujarat, India)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile menu when clicking any link inside it
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 2. FAQ Accordion Toggle Handlers (Supports both class & inline triggers)
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('svg');
            const isShown = content && (content.classList.contains('show') || content.style.display === 'block');

            // Close all open FAQs
            document.querySelectorAll('.faq-content').forEach(c => {
                c.classList.remove('show');
                c.style.display = 'none';
            });
            document.querySelectorAll('.faq-btn').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                const svg = b.querySelector('svg');
                if (svg) svg.style.transform = 'rotate(0deg)';
            });

            // Open clicked FAQ if previously closed
            if (!isShown && content) {
                content.classList.add('show');
                content.style.display = 'block';
                btn.setAttribute('aria-expanded', 'true');
                if (icon) {
                    icon.style.transition = 'transform 0.2s ease';
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
});

// 3. Standalone Video Modal Utility (Pure CSS / Zero Tailwind Dependency)
function openVideoModal(videoUrl) {
    let modal = document.getElementById('video-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'video-modal';
        modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:100; display:flex; align-items:center; justify-content:center; padding:1rem;';
        modal.innerHTML = `
            <div style="position:relative; width:100%; max-width:850px; background:#000; border-radius:8px; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);">
                <button onclick="closeVideoModal()" aria-label="Close Video Modal" style="position:absolute; top:12px; right:16px; color:#fff; font-size:32px; font-weight:bold; background:none; border:none; cursor:pointer; z-index:10; line-height:1;">&times;</button>
                <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden;">
                    <iframe id="modal-iframe" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        
        // Close when clicking modal backdrop
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeVideoModal();
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeVideoModal();
        });

        document.body.appendChild(modal);
    }
    
    document.getElementById('modal-iframe').src = videoUrl;
    modal.style.display = 'flex';
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        const iframe = document.getElementById('modal-iframe');
        if (iframe) iframe.src = '';
        modal.style.display = 'none';
    }
}

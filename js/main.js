document.addEventListener('DOMContentLoaded', () => {
    // 1. Single Source of Truth Table Render
    const tableBody = document.getElementById('product-table-body');
    if (tableBody && typeof indianNailMachineData !== 'undefined') {
        tableBody.innerHTML = indianNailMachineData.map(m => `
            <tr>
                <td style="font-weight:bold;">${m.model}</td>
                <td>${m.length}</td>
                <td>${m.thickness}</td>
                <td>${m.speed}</td>
                <td>${m.capacity}</td>
                <td>${m.motor}</td>
                <td>${m.weight}</td>
                <td style="color:var(--brand); font-weight:bold;">${m.price}</td>
            </tr>
        `).join('');
    }

    // 2. High-Performance Video Facade
    const videoFacade = document.getElementById('video-facade');
    if (videoFacade) {
        videoFacade.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            this.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        });
    }

    // 3. Accessible FAQ Accordion
    const faqBtns = document.querySelectorAll('.faq-btn');
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const contentId = btn.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const isVisible = content.style.display === 'block';
            
            // Close all
            document.querySelectorAll('.faq-content').forEach(c => {
                c.style.display = 'none';
            });
            document.querySelectorAll('.faq-btn').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked
            if (!isVisible) {
                content.style.display = 'block';
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
});

/**
 * BINDING WIRE MACHINE - PRODUCTION ENGINE (GitHub Pages Ready)
 * Handles: Animated Stats Counters, Parallax Scrolling, Form Validations,
 * Price Estimators, and UI Micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initBackToTop();
  initParallax();
  initFormValidation();
  initPricingCalculator();
});

// 1. Animated Stats Counter (Triggered when scrolled into viewport)
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observerOptions = { threshold: 0.3 };
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 1500;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.innerText = target.toLocaleString();
            clearInterval(timer);
          } else {
            entry.target.innerText = Math.floor(current).toLocaleString();
          }
        }, stepTime);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => counterObserver.observe(counter));
}

// 2. Parallax Depth Controller
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const parallaxLayers = document.querySelectorAll('[data-parallax-speed]');
    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-parallax-speed'));
      layer.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

// 3. Back to Top Button Controller
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 4. Form Validation & WhatsApp Lead Generator
function initFormValidation() {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        
        // Extract field values
        const name = form.querySelector('#rfqName')?.value || 'Buyer';
        const phone = form.querySelector('#rfqPhone')?.value || '';
        const email = form.querySelector('#rfqEmail')?.value || '';
        const machine = form.querySelector('#rfqMachine')?.value || 'Machinery Inquiry';
        const msg = form.querySelector('#rfqMsg')?.value || '';

        const feedbackBox = form.querySelector('.form-feedback');
        if (feedbackBox) {
          feedbackBox.classList.remove('d-none');
          feedbackBox.innerHTML = `
            <div class="alert alert-success mt-3 py-2">
              <strong>Requirement Received!</strong> Opening WhatsApp to connect directly with our Rajkot engineering plant...
            </div>
          `;
        }

        // WhatsApp redirect fallback
        const waText = encodeURIComponent(
          `*New RFQ from website*\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Machine:* ${machine}\n*Notes:* ${msg}`
        );
        setTimeout(() => {
          window.open(`https://wa.me/919978822099?text=${waText}`, '_blank');
          form.reset();
        }, 1200);
      }
      form.classList.add('was-validated');
    }, false);
  });
}

// 5. Interactive Price / Output Estimator
function initPricingCalculator() {
  const nailOutputRange = document.getElementById('calcTargetOutput');
  const machineTypeSelect = document.getElementById('calcMachineType');
  const estimatedCapDisplay = document.getElementById('calcEstimatedCap');
  const estimatedCostDisplay = document.getElementById('calcEstimatedPrice');

  if (!nailOutputRange || !machineTypeSelect) return;

  function recalculate() {
    const outputKg = parseInt(nailOutputRange.value, 10);
    const machineBase = parseInt(machineTypeSelect.value, 10);
    const outputValEl = document.getElementById('calcOutputVal');
    if (outputValEl) outputValEl.innerText = `${outputKg.toLocaleString()} kg/day`;

    const basePriceINR = (outputKg * 140) + machineBase;
    if (estimatedCostDisplay) {
      estimatedCostDisplay.innerText = `₹ ${basePriceINR.toLocaleString('en-IN')}`;
    }
    if (estimatedCapDisplay) {
      estimatedCapDisplay.innerText = `${Math.round(outputKg / 8)} kg/hr (8hr shift)`;
    }
  }

  nailOutputRange.addEventListener('input', recalculate);
  machineTypeSelect.addEventListener('change', recalculate);
  recalculate();
}

/**
 * Main Application Logic & User Interaction
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });
  }

  // FAQ Accordions
  const faqButtons = document.querySelectorAll('.faq-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.ph-caret-down');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
      document.querySelectorAll('.ph-caret-down').forEach(i => i.classList.remove('rotate-180'));

      if (!isExpanded && content) {
        content.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for contacting Binding Wire Machine! Our engineering team in Rajkot will respond with specifications and pricing within 24 hours.');
      contactForm.reset();
    });
  }
});

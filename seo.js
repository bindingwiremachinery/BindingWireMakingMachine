/**
 * SEO & Dynamic Route Metadata Handler
 * Ensures consistent canonical links, Open Graph, and Structured Data
 */
(function() {
  'use strict';

  window.initSEO = function(routePath) {
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      const cleanPath = window.location.pathname.replace(/\.html$/, '');
      canonicalLink.setAttribute('href', 'https://www.bindingwiremachine.in' + (cleanPath === '/index' ? '/' : cleanPath));
    }
  };

  // Client-side URL normalization (.html cleanup in history state)
  if (window.location.pathname.endsWith('.html') && window.location.pathname !== '/404.html') {
    const cleanUrl = window.location.pathname.replace(/\.html$/, '') + window.location.search + window.location.hash;
    window.history.replaceState(null, '', cleanUrl);
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.initSEO(window.location.pathname);
  });
})();

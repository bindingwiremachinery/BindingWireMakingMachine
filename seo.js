const seoMeta = {
  home: {
    title: "Binding wire machine | Wire Nail & Binding Wire Machine Manufacturer",
    desc: "Leading manufacturer and global exporter of high-speed automatic wire nail making machines and continuous wire drawing plants in Rajkot, Gujarat."
  },
  products: {
    title: "Machinery Catalog | Wire Nail & Wire Drawing Plants",
    desc: "Explore complete technical specs for our IN Series nail making machines, wire drawing blocks, and binding wire production units."
  },
  contact: {
    title: "Contact Binding wire machine | Factory Rajkot Gujarat",
    desc: "Get direct quotes for wire nail making machines and wire drawing setups. Phone / WhatsApp: +91 99788 22099."
  }
};

export function updateSEO(pageKey, dynamicData = null) {
  const meta = dynamicData || seoMeta[pageKey] || seoMeta.home;
  
  // Title update
  document.title = meta.title;
  
  // Meta Description update
  let descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute('content', meta.desc);
  
  // OpenGraph Meta update
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);

  // Canonical Link update
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', window.location.href);
}

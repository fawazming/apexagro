/* Apex Globatech Agro — main.js
   Handles: spinner, modular header/footer, nav, reveal-on-scroll,
   cookie consent, WhatsApp fab visibility. */
(function () {
  'use strict';

  var PHONE_DISPLAY = '+234 806 342 7928';
  var PHONE_TEL = '+2348063427928';
  var WHATSAPP = '2348063427928';

  /* ---------------- Spinner ---------------- */
  var spinner = document.getElementById('spinner');
  function hideSpinner() {
    if (!spinner) return;
    spinner.classList.add('hidden');
    setTimeout(function () { if (spinner.parentNode) spinner.parentNode.removeChild(spinner); }, 600);
  }
  if (document.readyState === 'complete') hideSpinner();
  else window.addEventListener('load', hideSpinner);
  // Safety net
  setTimeout(hideSpinner, 2500);

  /* ---------------- Modular Header & Footer ---------------- */
  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');
  var currentPage = getPageName();

  function getPageName() {
    var p = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (p === '' || p === '/' ) p = 'index.html';
    return p;
  }

  function current(path) {
    return currentPage === path ? 'active' : '';
  }

  var NAV = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'products.html', label: 'Products' },
    { href: 'services.html', label: 'Services' },
    { href: 'gallery.html', label: 'Gallery' },
    { href: 'contact.html', label: 'Contact' }
  ];

  function headerHTML() {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '" class="nav-link text-gray-700 hover:text-forest py-2 lg:py-0 ' + current(n.href) + '">' + n.label + '</a>';
    }).join('');
    return '' +
    '<div class="bg-forest text-white text-sm">' +
      '<div class="max-w-7xl mx-auto px-5 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-2">' +
        '<p class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-leaf inline-block"></span>Remo Sagamu, Ogun State, Nigeria</p>' +
        '<div class="flex items-center gap-4">' +
          '<a href="tel:' + PHONE_TEL + '" class="hover:text-gold flex items-center gap-1.5">' +
            '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .7-.2 1l-2.3 2.2z"/></svg>' +
            PHONE_DISPLAY + '</a>' +
          '<a href="mailto:info@apexglobatechagro.com" class="hover:text-gold hidden sm:flex items-center gap-1.5">' +
            '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>' +
            'info@apexglobatechagro.com</a>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div id="main-nav" class="sticky top-0 z-50 bg-white/95 glass shadow-sm" x-data="{ open: false }">' +
      '<div class="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between">' +
        '<a href="index.html" class="flex items-center gap-2" aria-label="Apex Globatech Agro home">' +
          '<img src="img/optimized/logo.png" alt="Apex Globatech Agro logo" width="160" height="57" class="h-12 w-auto">' +
        '</a>' +
        '<nav class="hidden lg:flex items-center gap-8 text-sm" aria-label="Primary">' + links + '</nav>' +
        '<div class="hidden lg:block">' +
          '<a href="contact.html" class="btn-gold rounded-full px-5 py-2.5 text-sm">Get a Quote</a>' +
        '</div>' +
        '<button @click="open = !open" class="lg:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Toggle menu" aria-expanded="open">' +
          '<svg x-show="!open" class="w-7 h-7 text-forest" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>' +
          '<svg x-show="open" x-cloak class="w-7 h-7 text-forest" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M6 18L18 6"/></svg>' +
        '</button>' +
      '</div>' +
      '<div x-show="open" x-cloak x-transition class="lg:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-3 text-sm">' +
        NAV.map(function (n) { return '<a href="' + n.href + '" @click="open=false" class="nav-link text-gray-700 ' + current(n.href) + '">' + n.label + '</a>'; }).join('') +
        '<a href="contact.html" @click="open=false" class="btn-gold rounded-full px-5 py-2.5 text-center mt-2">Get a Quote</a>' +
      '</div>' +
    '</div>';
  }

  function footerHTML() {
    return '' +
    '<div class="bg-forest text-white relative overflow-hidden">' +
      '<div class="absolute inset-0 leaf-pattern opacity-20"></div>' +
      '<div class="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">' +
        '<div>' +
          '<img src="img/optimized/logo-white.png" alt="Apex Globatech Agro" width="200" height="100" class="h-16 w-auto mb-4">' +
          '<p class="text-white/80 text-sm leading-relaxed">Quality planting materials, farm establishment, agricultural consultancy and agro-support services — growing better farms, together.</p>' +
          '<p class="mt-4 font-heading font-semibold text-gold text-sm">Quality Planting. Better Farming. Greater Future.</p>' +
        '</div>' +
        '<div>' +
          '<h3 class="font-heading font-semibold text-gold mb-4">Quick Links</h3>' +
          '<ul class="space-y-2 text-sm text-white/85">' +
            NAV.map(function (n) { return '<li><a href="' + n.href + '" class="hover:text-gold">' + n.label + '</a></li>'; }).join('') +
            '<li><a href="privacy.html" class="hover:text-gold">Privacy Policy</a></li>' +
            '<li><a href="terms.html" class="hover:text-gold">Terms of Service</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h3 class="font-heading font-semibold text-gold mb-4">Products</h3>' +
          '<ul class="space-y-2 text-sm text-white/85">' +
            '<li><a href="products.html" class="hover:text-gold">Pineapple Suckers</a></li>' +
            '<li><a href="products.html" class="hover:text-gold">Oil Palm Seedlings</a></li>' +
            '<li><a href="products.html" class="hover:text-gold">Plantain &amp; Banana Suckers</a></li>' +
            '<li><a href="products.html" class="hover:text-gold">Cocoa Seedlings</a></li>' +
            '<li><a href="products.html" class="hover:text-gold">Coconut &amp; Citrus Seedlings</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h3 class="font-heading font-semibold text-gold mb-4">Contact</h3>' +
          '<ul class="space-y-3 text-sm text-white/85">' +
            '<li class="flex items-start gap-2"><span>📍</span> Remo Sagamu, Ogun State, Nigeria</li>' +
            '<li class="flex items-start gap-2"><span>📞</span> <a href="tel:' + PHONE_TEL + '" class="hover:text-gold">' + PHONE_DISPLAY + '</a></li>' +
            '<li class="flex items-start gap-2"><span>✉️</span> <a href="mailto:info@apexglobatechagro.com" class="hover:text-gold">info@apexglobatechagro.com</a></li>' +
            '<li class="flex items-start gap-2"><span>🌐</span> www.apexglobatechagro.com</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="relative border-t border-white/10">' +
        '<div class="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/70">' +
          '<p>© <span id="year">2026</span> Apex Globatech Agro Ltd. All rights reserved.</p>' +
          '<p class="font-heading">🌱 Quality Planting. Better Farming. Greater Future.</p>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  if (headerEl) headerEl.innerHTML = headerHTML();
  if (footerEl) footerEl.innerHTML = footerHTML();

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }
  if (document.readyState !== 'loading') initReveal();
  else document.addEventListener('DOMContentLoaded', initReveal);

  /* ---------------- Cookie consent ---------------- */
  var cookieBar = document.getElementById('cookie-bar');
  function setCookie(name, value, days) {
    var d = new Date(); d.setTime(d.getTime() + days * 86400000);
    document.cookie = name + '=' + value + '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
  }
  function getCookie(name) {
    var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? m.pop() : null;
  }
  if (cookieBar) {
    if (!getCookie('apex_cookie_consent')) {
      setTimeout(function () { cookieBar.classList.add('show'); }, 1800);
    }
    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');
    function hideBar() { cookieBar.classList.remove('show'); setTimeout(function(){ cookieBar.style.display='none'; }, 500); }
    if (acceptBtn) acceptBtn.addEventListener('click', function () {
      setCookie('apex_cookie_consent', 'all', 365); hideBar();
      try { if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'granted' }); } catch (e) {}
    });
    if (declineBtn) declineBtn.addEventListener('click', function () {
      setCookie('apex_cookie_consent', 'essential', 365); hideBar();
    });
  }

  /* ---------------- WhatsApp FAB visibility ---------------- */
  var fab = document.getElementById('wa-fab');
  if (fab) {
    setTimeout(function () { fab.classList.remove('hidden'); fab.classList.add('opacity-100'); }, 2600);
  }
  // Update WhatsApp links with real number placeholder if needed
  document.querySelectorAll('a[href^="https://wa.me/234XXXXXXXXXX"]').forEach(function (a) {
    a.href = a.href.replace('234XXXXXXXXXX', WHATSAPP);
  });

})();

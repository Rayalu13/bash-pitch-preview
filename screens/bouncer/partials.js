// Reusable header / footer markup so each screen only declares what differs.
// Drop a <div data-topbar></div> or <nav data-bottom-nav="entries"></nav> into a screen
// and this script will fill it in.

(function () {
  const LOGO_SRC = '../assets/png/logo.png';

  const calendarGradientSVG = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="cgrad-__ID__" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FE8C00"/>
        <stop offset="1" stop-color="#F83600"/>
      </linearGradient></defs>
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1 .9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z" fill="url(#cgrad-__ID__)"/>
    </svg>
  `;

  function topbar(date) {
    const id = Math.random().toString(36).slice(2, 8);
    return `
      <div class="topbar">
        <div class="brand"><span class="brand-dot"></span><span class="brand-text">DUNE&nbsp;·&nbsp;GUEST&nbsp;REGISTER</span></div>
        <div class="date-chip">
          <div class="ic">${calendarGradientSVG.replaceAll('__ID__', id)}</div>
          <div class="pill">${date || 'Today'}</div>
        </div>
      </div>
      <div class="topbar-spacer"></div>
    `;
  }

  const NAV_ICONS = {
    home: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 7.5L10 1.67L17.5 7.5V16.67C17.5 17.11 17.32 17.53 17.01 17.85C16.7 18.16 16.28 18.33 15.83 18.33H12.5V11.67H7.5V18.33H4.17C3.72 18.33 3.3 18.16 2.99 17.85C2.68 17.53 2.5 17.11 2.5 16.67V7.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    scan: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.33 5.1V3.32C18.33 2.14 17.8 1.67 16.48 1.67H15.11M18.33 15.11V16.48C18.33 17.8 17.8 18.33 16.48 18.33H15.11M4.89 1.67H3.53C2.2 1.67 1.67 2.14 1.67 3.32V5.09M1.67 15.11V16.48C1.67 17.8 2.2 18.33 3.53 18.33H4.89" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M15.5 7.76V5.49C15.5 4.79 15.18 4.5 14.39 4.5H12.37C11.57 4.5 11.25 4.79 11.25 5.49V7.76C11.25 8.47 11.57 8.75 12.37 8.75H14.39C15.18 8.75 15.5 8.47 15.5 7.76ZM15.5 14.39V12.37C15.5 11.57 15.18 11.25 14.39 11.25H12.37C11.57 11.25 11.25 11.57 11.25 12.37V14.39C11.25 15.18 11.57 15.5 12.37 15.5H14.39C15.18 15.5 15.5 15.18 15.5 14.39ZM8.75 7.76V5.49C8.75 4.79 8.43 4.5 7.64 4.5H5.62C4.82 4.5 4.5 4.79 4.5 5.49V7.76C4.5 8.47 4.82 8.75 5.62 8.75H7.64C8.43 8.75 8.75 8.47 8.75 7.76ZM8.75 14.39V12.37C8.75 11.57 8.43 11.25 7.64 11.25H5.62C4.82 11.25 4.5 11.57 4.5 12.37V14.39C4.5 15.18 4.82 15.5 5.62 15.5H7.64C8.43 15.5 8.75 15.18 8.75 14.39Z" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    user: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.67 17.5V15.83C16.67 14.95 16.32 14.1 15.69 13.48C15.07 12.85 14.22 12.5 13.33 12.5H6.67C5.78 12.5 4.93 12.85 4.31 13.48C3.68 14.1 3.33 14.95 3.33 15.83V17.5" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M10 9.17C11.84 9.17 13.33 7.67 13.33 5.83C13.33 3.99 11.84 2.5 10 2.5C8.16 2.5 6.67 3.99 6.67 5.83C6.67 7.67 8.16 9.17 10 9.17Z" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`,
  };

  function bottomNav(active) {
    function tab(key, href) {
      const isActive = key === active ? ' active' : '';
      return `<a href="${href}" class="${isActive.trim()}">${NAV_ICONS[key]}</a>`;
    }
    return `
      ${tab('home', 'bouncer-entries.html')}
      ${tab('scan', 'entry-scanner.html')}
      ${tab('user', '#')}
    `;
  }

  function tabsRow(active) {
    function t(key, label, href) {
      return `<a class="tab${key === active ? ' active' : ''}" data-w="${key}" href="${href}">${label}</a>`;
    }
    return `
      ${t('entries', 'Entries', 'bouncer-entries.html')}
      ${t('reservations', 'Reservations', 'bouncer-reservations.html')}
      ${t('guestlist', 'Guest List', 'bouncer-guestlist.html')}
    `;
  }

  function fab(href) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="#121212" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`;
  }

  // Auto-render on DOM ready
  function applyEmbedMode() {
    // When loaded inside the app.html iframe, swap to scrollable viewport mode
    // so the phone container fits 360x800 and the inner list scrolls.
    if (window.self === window.top) return;
    document.documentElement.classList.add('embed');

    // Wrap all non-pinned children inside .phone in a scrollable region
    // so the bottom-nav / fab / sheets stay viewport-pinned and the list scrolls.
    const phone = document.querySelector('.phone, .phone-tall, .phone-1237');
    if (!phone) return;

    // Items that should NOT be wrapped (they're pinned or overlay)
    const pinnedSelector = '.bottom-nav, .fab, .dim, .sheet, .dialog, .toast, .modal-card';
    // The scrolling region holds everything else (topbar, tabs, kpi, search, lists, cards...)
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-scroll';
    const kids = Array.from(phone.children);
    let inserted = false;
    kids.forEach(child => {
      if (child.matches(pinnedSelector)) return;
      if (!inserted) {
        phone.insertBefore(wrapper, child);
        inserted = true;
      }
      wrapper.appendChild(child);
    });
  }

  function render() {
    applyEmbedMode();
    document.querySelectorAll('[data-topbar]').forEach(el => {
      el.outerHTML = topbar(el.getAttribute('data-topbar') || 'Today');
    });
    document.querySelectorAll('[data-bottom-nav]').forEach(el => {
      el.innerHTML = bottomNav(el.getAttribute('data-bottom-nav'));
    });
    document.querySelectorAll('[data-tabs]').forEach(el => {
      el.innerHTML = tabsRow(el.getAttribute('data-tabs'));
    });
    document.querySelectorAll('[data-fab]').forEach(el => {
      el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#121212" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();

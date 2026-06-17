/* ==========================================================================
   BASH · Bouncer + Event Entry - single-file SPA
   ========================================================================== */

const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/></svg>`,
  scan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
  edit: `<svg viewBox="0 0 14 14" fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.4 2.3 11.7 4.6M2 12l1-3.7 6.4-6.4 2.7 2.7L5.7 11l-3.7 1Z"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="#121212" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  cal: `<svg viewBox="0 0 24 24" fill="none"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FE8C00"/><stop offset="1" stop-color="#F83600"/></linearGradient></defs><rect x="3" y="5" width="18" height="16" rx="3" fill="url(#cg)"/><rect x="7" y="2" width="2" height="6" rx="1" fill="url(#cg)"/><rect x="15" y="2" width="2" height="6" rx="1" fill="url(#cg)"/><rect x="6" y="11" width="3" height="3" rx=".6" fill="white"/><rect x="11" y="11" width="3" height="3" rx=".6" fill="white"/><rect x="16" y="11" width="3" height="3" rx=".6" fill="white"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round"><path d="M14.5 18 8.5 12l6-6"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#2ECC71"/><path d="m7.5 12.5 3 3 6-6" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  warn: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#E90E04"/><path d="M12 7v6" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1.3" fill="white"/></svg>`,
};

/* ============= State ============= */

const SEED_ENTRIES = [
  { id: 'e1', name: 'John Doe', phone: '9876543210', notes: 'Hall A', type: 'walkin', maleEntered: 1, maleExpected: 1, femaleEntered: 0, femaleExpected: 0, time: '6:30 PM', date: today(), status: 'active' },
  { id: 'e2', name: 'Marham Band', phone: '9876543210', notes: 'Hall A', type: 'guestlist', maleEntered: 3, maleExpected: 5, femaleEntered: 2, femaleExpected: 5, time: '6:30 PM', date: today(), status: 'active' },
  { id: 'e3', name: 'Corporate Booking', phone: '9876543210', notes: 'Hall A', type: 'reservation', maleEntered: 19, maleExpected: 20, femaleEntered: 20, femaleExpected: 20, time: '6:30 PM', date: today(), status: 'active' },
  { id: 'e4', name: 'Priya', phone: '9876543210', notes: 'Table 25', type: 'reservation', maleEntered: 4, maleExpected: 5, femaleEntered: 3, femaleExpected: 3, time: '6:30 PM', date: today(), status: 'active' },
  { id: 'e5', name: 'Sasha', phone: '9876543210', notes: 'Table 4', type: 'reservation', maleEntered: 12, maleExpected: 23, femaleEntered: 1, femaleExpected: 5, time: '6:30 PM', date: today(), status: 'active' },
  { id: 'e6', name: 'DJ Avinash', phone: '9876543210', notes: 'Backstage', type: 'guestlist', maleEntered: 0, maleExpected: 5, femaleEntered: 0, femaleExpected: 5, time: '6:30 PM', date: today(), status: 'active' },
  { id: 'e7', name: 'Gretchen Donin', phone: '9876543210', notes: 'Hall A', type: 'guestlist', maleEntered: 1, maleExpected: 5, femaleEntered: 0, femaleExpected: 5, time: '6:30 PM', date: today(), status: 'active' },
];

const SEED_BOOKINGS = [
  {
    id: 'b1',
    bookingId: 'BK28492',
    name: 'Avinash R',
    phone: '+91 9001112222',
    event: { name: 'Seoulful Saturdays', date: 'SAT 12 MAY, 2026', time: '10PM' },
    tickets: [
      { name: 'Ladies', total: 1, approved: 0 },
      { name: 'Early Bird – Right Lounge', total: 3, approved: 0 },
      { name: 'VIP', total: 3, approved: 0 },
    ],
  },
  {
    id: 'b2',
    bookingId: 'BK28505',
    name: 'Riya Kapoor',
    phone: '+91 9123456780',
    event: { name: 'Seoulful Saturdays', date: 'SAT 12 MAY, 2026', time: '10PM' },
    tickets: [
      { name: 'General', total: 2, approved: 0 },
      { name: 'VIP', total: 1, approved: 0 },
    ],
  },
];

const STORE_KEY = 'bash.bouncer.v1';

const Store = {
  state: null,
  _ls(fn) { try { return fn(); } catch (e) { return null; } },
  load() {
    const raw = this._ls(() => localStorage.getItem(STORE_KEY));
    if (raw) {
      try { this.state = JSON.parse(raw); return; } catch (e) {}
    }
    this.state = {
      entries: JSON.parse(JSON.stringify(SEED_ENTRIES)),
      bookings: JSON.parse(JSON.stringify(SEED_BOOKINGS)),
      tab: 'entries',
      bottomNav: 'home',
      lastBookingId: null,
      lastApprovedAt: null,
    };
    this.save();
  },
  save() { this._ls(() => localStorage.setItem(STORE_KEY, JSON.stringify(this.state))); },
  reset() { this._ls(() => localStorage.removeItem(STORE_KEY)); this.load(); },

  setTab(tab) { this.state.tab = tab; this.save(); },
  setNav(n) { this.state.bottomNav = n; this.save(); },

  addEntry(entry) {
    this.state.entries.unshift({ id: 'e' + Date.now(), date: today(), status: 'active', ...entry });
    this.save();
  },
  updateEntry(id, patch) {
    const e = this.state.entries.find(x => x.id === id);
    if (e) Object.assign(e, patch);
    this.save();
  },
  deleteEntry(id) {
    this.state.entries = this.state.entries.filter(e => e.id !== id);
    this.save();
  },
  getEntry(id) { return this.state.entries.find(e => e.id === id); },

  getBooking(id) {
    return this.state.bookings.find(b => b.id === id || b.bookingId.toLowerCase() === id.toLowerCase());
  },
  approveBooking(id) {
    const b = this.getBooking(id);
    if (!b) return null;
    b.tickets.forEach(t => t.approved = t.total);
    this.state.lastApprovedAt = Date.now();
    // Add an Event Entry row to the entries feed
    const totalGuests = b.tickets.reduce((s, t) => s + t.total, 0);
    this.state.entries.unshift({
      id: 'e' + Date.now(),
      name: b.name,
      phone: b.phone,
      notes: `Booking: ${b.bookingId}`,
      type: 'event-entry',
      maleEntered: totalGuests, maleExpected: totalGuests,
      femaleEntered: 0, femaleExpected: 0,
      time: nowTime(),
      date: today(),
      status: 'active',
    });
    this.save();
    return b;
  },
};

/* ============= Helpers ============= */

function today() {
  const d = new Date();
  return d.toISOString().slice(0,10);
}
function nowTime() {
  const d = new Date();
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2,'0');
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ap}`;
}
function readableDate() {
  return new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
}
function classFor(type) {
  return ({ walkin: 'walkin', reservation: 'reservation', guestlist: 'guestlist', bashuser: 'bashuser', 'event-entry': 'walkin' })[type] || 'walkin';
}
function labelFor(type) {
  return ({ walkin: 'Walk In', reservation: 'Reservation', guestlist: 'Guest List', bashuser: 'Bash User', 'event-entry': 'Event Entry' })[type] || type;
}
function statusOf(e) {
  if (e.status === 'cancelled') return 'cancelled';
  if (e.status === 'noshow') return 'cancelled';
  if (e.type === 'walkin' || e.type === 'event-entry') return 'complete';
  const expM = +e.maleExpected || 0, expF = +e.femaleExpected || 0;
  const entM = +e.maleEntered || 0, entF = +e.femaleEntered || 0;
  if (expM + expF === 0) return 'pending';
  if (entM >= expM && entF >= expF) return 'complete';
  if (entM + entF === 0) return 'pending';
  return 'partial';
}
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ============= Router ============= */

const Router = {
  current: '#/home',
  go(hash) {
    location.hash = hash;
  },
  go: function(hash) { location.hash = hash; },
  back() { history.back(); },
};

window.addEventListener('hashchange', render);
window.addEventListener('load', () => {
  Store.load();
  if (!location.hash) location.hash = '#/home';
  bindReset();
  render();
});

function bindReset() {
  document.getElementById('reset-btn').addEventListener('click', () => {
    Store.reset();
    location.hash = '#/home';
    render();
  });
}

/* ============= Render Loop ============= */

function render() {
  const root = document.getElementById('app');
  const hash = location.hash || '#/home';
  const [path, ...params] = hash.replace(/^#\//,'').split('/');
  const args = params.join('/');

  let html = '';
  switch (path) {
    case 'home':       html = viewHome();              break;
    case 'create':     html = viewCreate(args || 'walkin'); break;
    case 'edit':       html = viewEdit(args);          break;
    case 'scanner':    html = viewScanner();           break;
    case 'verify':     html = viewVerify();            break;
    case 'scan-fail':  html = viewScanFail();          break;
    case 'booking':    html = viewBooking(args);       break;
    case 'approved':   html = viewApproved(args);      break;
    case 'profile':    html = viewProfile();           break;
    default:           html = viewHome();
  }
  root.innerHTML = `<div class="fade-in" style="display:flex;flex-direction:column;flex:1;min-height:0;position:relative">${html}</div>`;

  bindEvents();
}

/* ============= Common bits ============= */

function topbar() {
  const d = new Date();
  const day = d.toLocaleDateString('en-US', { weekday: 'short' });   // "Tue"
  const dom = d.getDate();                                            // 12
  const mon = d.toLocaleDateString('en-US', { month: 'short' });     // "May"
  const dateStr = `${day}, ${dom} ${mon}`;
  return `
    <div class="topbar">
      <div class="brand"><span class="brand-dot"></span><span class="brand-text">DUNE&nbsp;·&nbsp;GUEST&nbsp;REGISTER</span></div>
      <div class="date-chip">
        <span class="date-chip__ic">${ICONS.cal}</span>
        <span class="date-chip__txt">${dateStr}</span>
      </div>
    </div>`;
}

function bottomNav(active) {
  const labels = { home: 'Home', scan: 'Scan', user: 'Profile' };
  const item = (key, route) => {
    const isActive = active === key;
    return `
    <a class="${isActive ? 'active' : ''}" href="#" data-nav="${key}" data-route="${route}">
      ${ICONS[key === 'home' ? 'home' : key === 'scan' ? 'scan' : 'user']}
      ${isActive ? `<span class="nav-label">${labels[key]}</span>` : ''}
    </a>`;
  };
  return `
    <nav class="bottom-nav">
      ${item('home', '#/home')}
      ${item('scan', '#/scanner')}
      ${item('user', '#/profile')}
    </nav>`;
}

function tabsRow(active) {
  const t = (key, label) => `<a class="tab ${active === key ? 'active' : ''}" data-w="${key}" href="#" data-tab="${key}">${label}</a>`;
  return `
    <div class="tabs">
      ${t('entries', 'Entries')}
      ${t('reservations', 'Reservations')}
      ${t('guestlist', 'Guest List')}
    </div>`;
}

/* ============= Bouncer Home ============= */

function viewHome() {
  const tab = Store.state.tab;
  let body;
  if (tab === 'entries')      body = entriesTab();
  else if (tab === 'reservations') body = reservationsTab();
  else                         body = guestListTab();

  // FAB target depends on tab
  const fabTarget = tab === 'reservations' ? '#/create/reservation'
                    : tab === 'guestlist'  ? '#/create/guestlist'
                    : '#/create/walkin';

  return `
    ${topbar()}
    ${tabsRow(tab)}
    <div class="scroll">${body}</div>
    <a class="fab" href="${fabTarget}" aria-label="Add">${ICONS.plus}</a>
    ${bottomNav('home')}
  `;
}

/* --- KPI rows --- */

function kpiEntries() {
  const items = Store.state.entries.filter(e => e.status === 'active');
  const total = items.length;
  const counts = { walkin: 0, reservation: 0, guestlist: 0, 'event-entry': 0 };
  items.forEach(e => counts[e.type] = (counts[e.type] || 0) + 1);
  const max = Math.max(1, ...Object.values(counts));
  const pct = v => Math.round((v / Math.max(1, total)) * 100);
  return `
    <div class="kpi-row">
      <div class="kpi-card">
        <div class="label">Total Entries</div>
        <div class="value mono">${total}</div>
      </div>
      <div class="kpi-legend">
        <div class="bar">
          <span style="background:var(--c-walkin);width:${pct(counts.walkin)}%"></span>
          <span style="background:var(--c-reservation);width:${pct(counts.reservation)}%"></span>
          <span style="background:var(--c-guestlist);width:${pct(counts.guestlist)}%"></span>
          <span style="background:var(--c-bashuser);width:${pct(counts['event-entry'])}%"></span>
        </div>
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-walkin)"></span><span class="name">Walk-in</span></div><span class="num mono">${counts.walkin}</span></div>
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-reservation)"></span><span class="name">Reservation</span></div><span class="num mono">${counts.reservation}</span></div>
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-guestlist)"></span><span class="name">Guest list</span></div><span class="num mono">${counts.guestlist}</span></div>
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-bashuser)"></span><span class="name">Event Entry</span></div><span class="num mono">${counts['event-entry']}</span></div>
      </div>
    </div>`;
}

function kpiReservations() {
  const items = Store.state.entries.filter(e => e.type === 'reservation');
  const counts = { complete:0, partial:0, pending:0, cancelled:0 };
  items.forEach(e => counts[statusOf(e)]++);
  return `
    <div class="kpi-row">
      <div class="kpi-card">
        <div class="label">Total Reservations</div>
        <div class="value mono">${items.length}</div>
      </div>
      <div class="kpi-legend">
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-complete)"></span><span class="name">Complete</span></div><span class="num mono">${counts.complete}</span></div>
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-partial)"></span><span class="name">Partial</span></div><span class="num mono">${counts.partial}</span></div>
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-pending)"></span><span class="name">Pending</span></div><span class="num mono">${counts.pending}</span></div>
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-walkin)"></span><span class="name">Cancelled</span></div><span class="num mono">${counts.cancelled}</span></div>
      </div>
    </div>`;
}

function kpiGuestList() {
  const items = Store.state.entries.filter(e => e.type === 'guestlist');
  const counts = { complete:0, partial:0, pending:0, cancelled:0 };
  items.forEach(e => counts[statusOf(e)]++);
  return `
    <div class="kpi-row">
      <div class="kpi-card">
        <div class="label">Total Guests</div>
        <div class="value mono">${items.length}</div>
      </div>
      <div class="kpi-legend">
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-complete)"></span><span class="name">Complete</span></div><span class="num mono">${counts.complete}</span></div>
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-partial)"></span><span class="name">Partial</span></div><span class="num mono">${counts.partial}</span></div>
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-pending)"></span><span class="name">Pending</span></div><span class="num mono">${counts.pending}</span></div>
        <div class="row"><div class="left"><span class="sw" style="background:var(--c-walkin)"></span><span class="name">No-show</span></div><span class="num mono">${counts.cancelled}</span></div>
      </div>
    </div>`;
}

function searchBar(id = 'q') {
  return `
    <div class="search">
      ${ICONS.search}
      <input id="${id}" type="text" placeholder="Search" oninput="window.__filterEntries(this.value)" />
    </div>`;
}

/* --- Tabs --- */

function entriesTab() {
  const items = Store.state.entries
    .filter(e => e.status !== 'deleted')
    .sort((a,b) => b.id.localeCompare(a.id));
  return `
    ${kpiEntries()}
    ${searchBar()}
    <div class="entry-list" id="entries-list">
      ${items.length === 0 ? emptyState('No entries yet', 'Tap + to add your first walk-in.') : items.map(entryRow).join('')}
    </div>`;
}

function entryRow(e) {
  const tcMap = { walkin:'tc-walkin', reservation:'tc-reservation', guestlist:'tc-guestlist', bashuser:'tc-bashuser', 'event-entry':'tc-event' };
  const tc = tcMap[e.type] || 'tc-walkin';
  const label = labelFor(e.type);
  const cancelled = e.status === 'cancelled' || e.status === 'noshow';
  const editable = e.type === 'walkin' || e.type === 'reservation' || e.type === 'guestlist';
  return `
    <a class="entry-row" data-search="${esc(e.name + ' ' + e.phone)}" data-id="${e.id}" ${editable && !cancelled ? `href="#/edit/${e.id}"` : ''} ${cancelled?'style="opacity:0.55"':''}>
      <div class="name">${esc(e.name)}</div>
      <div class="type-chip ${tc}">${label}</div>
      ${(e.type === 'walkin' && !cancelled) ? `<span class="edit-pill">${ICONS.edit} Edit</span>` : ''}
      <div class="badges">
        <span class="badge"><span class="mono">${e.maleEntered}</span> Male</span>
        ${e.femaleExpected || e.femaleEntered ? `<span class="badge"><span class="mono">${e.femaleEntered}</span> Female</span>` : ''}
      </div>
      <div class="meta">
        <div>Phone:  <span class="mono">${esc(e.phone)}</span></div>
        <div class="time mono">${esc(e.time)}</div>
      </div>
      ${e.notes ? `<div class="notes">${esc(e.notes)}</div>` : ''}
    </a>`;
}

function reservationsTab() {
  const items = Store.state.entries.filter(e => e.type === 'reservation');
  return `
    ${kpiReservations()}
    ${searchBar()}
    <div class="r-list">
      ${items.length === 0 ? emptyState('No reservations', 'Tap + to add a reservation.') : items.map(reservationCard).join('')}
    </div>`;
}

function guestListTab() {
  const items = Store.state.entries.filter(e => e.type === 'guestlist');
  return `
    ${kpiGuestList()}
    ${searchBar()}
    <div class="r-list">
      ${items.length === 0 ? emptyState('No guest list yet', 'Tap + to add a guest list group.') : items.map(reservationCard).join('')}
    </div>`;
}

function reservationCard(e) {
  const st = statusOf(e);
  const ribbon = { complete:'COMPLETE', partial:'PARTIAL', pending:'PENDING', cancelled: e.type === 'guestlist' ? 'NO-SHOW' : 'CANCELLED' }[st];
  return `
    <div class="r-card" data-id="${e.id}">
      <span class="r-ribbon ${st}">${ribbon}</span>
      <a href="#/edit/${e.id}" class="r-edit">${ICONS.edit} Edit</a>
      <div class="r-head">
        <div class="r-name">${esc(e.name)}</div>
        <div class="r-time mono">${esc(e.time)}</div>
      </div>
      <div class="r-meta">
        <p>Phone:  <span class="mono">${esc(e.phone)}</span></p>
        ${e.notes ? `<p>${esc(e.notes)}</p>` : ''}
      </div>
      <div class="r-counts">
        <div class="col">
          <div class="lbl">MALE GUESTS</div>
          <div class="val mono">${e.maleEntered} / ${e.maleExpected}</div>
        </div>
        <div class="col">
          <div class="lbl">FEMALE GUESTS</div>
          <div class="val mono">${e.femaleEntered} / ${e.femaleExpected}</div>
        </div>
      </div>
    </div>`;
}

function emptyState(title, sub) {
  return `<div class="empty">
    <div class="ic">${ICONS.plus}</div>
    <div style="color:#ccc;font-weight:600">${title}</div>
    <div>${sub}</div>
  </div>`;
}

/* ============= Create / Edit ============= */

function viewCreate(type) {
  // Render the home view in the background, plus a bottom sheet overlay
  // The form lives inside the sheet
  return `
    ${viewHome()}
    <div class="overlay" data-close-overlay="#/home">
      <div class="sheet" onclick="event.stopPropagation()">
        <div class="sheet-handle"></div>
        ${createForm(type, null)}
      </div>
    </div>
  `;
}

function viewEdit(id) {
  const e = Store.getEntry(id);
  if (!e) { location.hash = '#/home'; return ''; }
  return `
    ${viewHome()}
    <div class="overlay" data-close-overlay="#/home">
      <div class="sheet" onclick="event.stopPropagation()">
        <div class="sheet-handle"></div>
        ${createForm(e.type, e)}
      </div>
    </div>`;
}

function createForm(type, existing) {
  const isEdit = !!existing;
  const e = existing || {
    type, name: '', phone: '', notes: '',
    maleEntered: 0, maleExpected: 0,
    femaleEntered: 0, femaleExpected: 0,
    time: '6:30 PM', date: today(),
  };
  const title = isEdit ? `Edit ${typeLabel(type)}` : `Add ${typeLabel(type)}`;
  const showExpected = type === 'reservation' || type === 'guestlist';
  const showDateTime = type === 'reservation';

  return `
    <form class="form" data-form="${isEdit?'edit':'create'}" data-id="${existing?existing.id:''}" data-type="${type}" onsubmit="return window.__submitForm(event)">
      <div class="form-head">
        <h3>${title}</h3>
        <a href="#/home" class="close-x">${ICONS.close}</a>
      </div>

      <div class="seg">
        ${segOpt('walkin','Walk-in', type)}
        ${segOpt('reservation','Reservation', type)}
        ${segOpt('guestlist','Guest List', type)}
      </div>

      <div class="field">
        <label>Enter Name</label>
        <input name="name" value="${esc(e.name)}" placeholder="Customer name" required />
      </div>

      <div class="field">
        <label>Phone number</label>
        <input name="phone" value="${esc(e.phone)}" placeholder="9876543210" class="mono" inputmode="tel" />
      </div>

      ${showDateTime ? `
        <div class="row-2-fields">
          <div class="field"><label>Date</label><input name="date" value="${esc(e.date || today())}" type="date" /></div>
          <div class="field"><label>Time</label><input name="time" value="${esc(e.time || '6:30 PM')}" /></div>
        </div>` : ''}

      <div class="field">
        <label>Notes</label>
        <input name="notes" value="${esc(e.notes)}" placeholder="Table, hall, etc." />
      </div>

      ${showExpected ? `
        <div class="form-section-label">Expected guests</div>
        <div class="counter-row">
          ${counter('maleExpected', 'Male', e.maleExpected)}
          ${counter('femaleExpected', 'Female', e.femaleExpected)}
        </div>` : ''}

      <div class="form-section-label">${isEdit && showExpected ? 'Guests entered' : 'Guests'}</div>
      <div class="counter-row">
        ${counter('maleEntered', 'Male', e.maleEntered, isEdit && showExpected ? +e.maleExpected : null)}
        ${counter('femaleEntered', 'Female', e.femaleEntered, isEdit && showExpected ? +e.femaleExpected : null)}
      </div>

      <div class="form-actions">
        ${isEdit ? `<button type="button" class="btn-danger" onclick="window.__confirmDangerous('${type}','${existing.id}')">${dangerLabel(type)}</button>` : ''}
        <button type="submit" class="btn-primary">${isEdit ? 'Save' : `Add ${typeLabel(type)}`}</button>
      </div>
    </form>`;
}

function segOpt(key, label, current) {
  const active = key === current;
  return `<button type="button" class="opt ${active?'on':''}" onclick="window.__switchType('${key}')">${label}</button>`;
}

function counter(field, label, value, max = null) {
  return `
    <div class="counter">
      <div class="ctr-lbl">${label}</div>
      <div class="ctr">
        <button type="button" class="ctr-btn" data-step="${field}:-1">−</button>
        <div class="ctr-val mono" data-counter="${field}">${value || 0}${max != null ? ` / ${max}` : ''}</div>
        <button type="button" class="ctr-btn" data-step="${field}:1" ${max != null ? `data-max="${max}"` : ''}>+</button>
      </div>
    </div>`;
}

function typeLabel(t) { return { walkin:'Walk-in', reservation:'Reservation', guestlist:'Guest List' }[t] || t; }
function dangerLabel(t) { return ({ walkin:'Delete Entry', reservation:'Cancel Reservation', guestlist:'Mark No-show' })[t] || 'Delete'; }

/* ============= Scanner Flow ============= */

function viewScanner() {
  return `
    <div class="scanner-stage" id="scanner-stage" style="flex:1;position:relative;overflow:hidden">
      <div class="scanner-top">
        <a href="#/home" class="scanner-btn">${ICONS.back}</a>
        <div class="scanner-title">Scan QR Code</div>
        <a href="#/scan-fail" class="scanner-btn" title="Simulate fail">
          <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.7" stroke="white" stroke-width="1.5"/><path d="M8 10.67V8" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="5.5" r=".8" fill="white"/></svg>
        </a>
      </div>

      <div class="qr-window-wrap">
        <div class="qr-window"></div>
        <div class="qr-corner tl"></div>
        <div class="qr-corner tr"></div>
        <div class="qr-corner bl"></div>
        <div class="qr-corner br"></div>
      </div>

      <a class="scanner-cta" href="#/verify">${ICONS.scan} Verify Using Booking ID</a>
    </div>
    ${bottomNav('scan')}
  `;
}

function viewVerify() {
  return `
    <div class="verify-stage">
      <div class="scanner-top">
        <a href="#/scanner" class="scanner-btn">${ICONS.back}</a>
        <div class="scanner-title">Verify Booking ID</div>
        <div style="width:36px"></div>
      </div>
      <form onsubmit="return window.__submitVerify(event)" class="verify-form">
        <div class="bid-input-wrap">
          <label>Booking ID</label>
          <input name="bid" class="mono" value="BK28492" placeholder="BK00000" autofocus />
        </div>
        <p class="verify-hint">Enter the unique Booking ID printed on the ticket. We'll pull up the booking and approve entry.</p>
        <div style="padding:0 20px">
          <button type="submit" class="btn-primary" style="width:100%">Verify Booking</button>
        </div>
        <div class="verify-try">
          Try: ${SEED_BOOKINGS.map(b => `<a href="#" onclick="document.querySelector('[name=bid]').value='${b.bookingId}';return false">${b.bookingId}</a>`).join(' · ')}
        </div>
      </form>
    </div>
    ${bottomNav('scan')}
  `;
}

function viewScanFail() {
  return `
    <div class="scanner-stage" style="flex:1;position:relative">
      <div class="scanner-top">
        <a href="#/scanner" class="scanner-btn">${ICONS.back}</a>
        <div></div><div></div>
      </div>
      <div class="qr-window-wrap dim">
        <div class="qr-window"></div>
        <div class="qr-corner tl"></div><div class="qr-corner tr"></div>
        <div class="qr-corner bl"></div><div class="qr-corner br"></div>
      </div>
      <div class="modal-card">
        <div class="top">
          <div class="icon-circ">${ICONS.warn}</div>
          <div class="title">Unable to recognise QR</div>
        </div>
        <form onsubmit="return window.__submitVerify(event)">
          <label style="color:#fff;font-size:12px;display:block;margin:8px 0 6px">Enter Booking ID</label>
          <input name="bid" class="mono" style="font-size:16px;padding:6px 0;width:100%;background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.3);color:#fff;outline:none" placeholder="BK00000" />
          <div class="row" style="display:flex;gap:10px;margin-top:14px">
            <a href="#/scanner" class="btn-secondary" style="margin:0;flex:1;height:40px;line-height:40px;font-size:14px">Cancel</a>
            <button type="submit" class="btn-primary" style="margin:0;flex:1;height:40px;line-height:40px;font-size:14px">Verify</button>
          </div>
        </form>
      </div>
    </div>
    ${bottomNav('scan')}
  `;
}

function viewBooking(id) {
  const b = Store.getBooking(id);
  if (!b) {
    return `
      ${viewScanner()}
      <div class="confirm">
        <h3>Booking not found</h3>
        <p>No booking matches that ID. Try BK28492 or BK28505.</p>
        <div class="row"><a href="#/verify" class="btn-primary" style="margin:0">Try again</a></div>
      </div>`;
  }
  const allTotal = b.tickets.reduce((s,t) => s + t.total, 0);
  const allApproved = b.tickets.every(t => t.approved >= t.total);

  return `
    <div class="bd-stage" style="flex:1;display:flex;flex-direction:column;position:relative">
      <div class="bd-head">
        <a href="#/scanner" class="bd-close-x">${ICONS.close}</a>
        <div class="brand"><span class="brand-dot"></span><span class="brand-text">DUNE&nbsp;·&nbsp;GUEST&nbsp;REGISTER</span></div>
        <div style="width:24px"></div>
      </div>
      <div class="bd-title">Booking Details</div>

      <div class="bd-event">
        <div class="poster"><img src="assets/png/event_logo_1.png" alt="" onerror="this.style.display='none'" /></div>
        <div class="meta">
          <div class="name">${esc(b.event.name)}</div>
          <div class="date"><b class="mono">${esc(b.event.date)}</b> · <span class="mono">${esc(b.event.time)}</span></div>
        </div>
      </div>

      <div class="bd-user">
        <div class="col">
          <div class="top">${esc(b.name)}</div>
          <div class="sub mono">${esc(b.phone)}</div>
        </div>
        <div class="divider"></div>
        <div class="col">
          <div class="top">Booking ID</div>
          <div class="sub mono">${esc(b.bookingId)}</div>
        </div>
      </div>

      ${allApproved ? `
        <div class="bd-no-tickets" style="color:var(--c-complete);background:rgba(46,204,113,0.08);border-color:rgba(46,204,113,0.2)">
          ${ICONS.check}
          <div class="lbl" style="color:var(--c-complete)">All Tickets Approved</div>
        </div>` : ''}

      <div class="bd-tickets">
        ${b.tickets.map((t, i) => `
          <div class="bd-ticket">
            <div class="t-name">${t.total} x ${esc(t.name)}</div>
            ${t.approved >= t.total ? `<div class="check">${ICONS.check}</div>` : ''}
          </div>`).join('')}
      </div>

      <div class="bd-actions">
        ${allApproved
          ? `<a href="#/scanner" class="bd-approve" style="flex:1">Close</a>`
          : `<a href="#/scanner" class="bd-cancel">Cancel</a>
             <button type="button" class="bd-approve" onclick="window.__approve('${b.id}')">Approve · ${allTotal} tickets</button>`}
      </div>
    </div>
    ${bottomNav('scan')}
  `;
}

function viewApproved(id) {
  return viewBooking(id);
}

/* ============= Profile ============= */

function viewProfile() {
  return `
    ${topbar()}
    <div class="scroll" style="padding:24px 20px">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--orange-grad);display:grid;place-items:center;font-weight:700;font-size:22px">B</div>
        <div>
          <div style="font-size:16px;font-weight:600">Bouncer · Tonight</div>
          <div class="mono" style="color:var(--text-dim);font-size:12px">${esc(readableDate())}</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px">
        <div class="kpi-card"><div class="label">Active</div><div class="value mono">${Store.state.entries.filter(e => e.status === 'active').length}</div></div>
        <div class="kpi-card"><div class="label">Cancelled</div><div class="value mono">${Store.state.entries.filter(e => e.status === 'cancelled' || e.status === 'noshow').length}</div></div>
      </div>

      <div style="background:var(--surface);border-radius:12px;padding:14px;font-size:13px;color:var(--text-dim);line-height:1.55">
        This is a clickable demo. Data lives in your browser only - hit "Reset demo data" at the bottom-right of the page to start fresh.
      </div>
    </div>
    ${bottomNav('user')}
  `;
}

/* ============= Event handlers ============= */

function bindEvents() {
  // Tabs
  document.querySelectorAll('[data-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      Store.setTab(el.dataset.tab);
      render();
    });
  });

  // Bottom nav
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const r = el.dataset.route;
      Store.setNav(el.dataset.nav);
      location.hash = r;
    });
  });

  // Overlay close on backdrop tap
  document.querySelectorAll('[data-close-overlay]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el) location.hash = el.dataset.closeOverlay;
    });
  });

  // Counters
  document.querySelectorAll('[data-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [field, deltaStr] = btn.dataset.step.split(':');
      const delta = +deltaStr;
      const display = document.querySelector(`[data-counter="${field}"]`);
      if (!display) return;
      const raw = display.textContent.split('/')[0].trim();
      let v = Math.max(0, (+raw || 0) + delta);
      const max = btn.dataset.max ? +btn.dataset.max : null;
      if (max != null && v > max) v = max;
      const maxPart = display.textContent.includes('/') ? display.textContent.split('/')[1] : '';
      display.textContent = maxPart ? `${v} / ${maxPart.trim()}` : `${v}`;
      // also keep a hidden input for submit
      let inp = document.querySelector(`input[name="${field}"]`);
      if (!inp) {
        inp = document.createElement('input');
        inp.type = 'hidden'; inp.name = field;
        document.querySelector('form').appendChild(inp);
      }
      inp.value = v;
    });
  });

  // Pre-populate hidden counter inputs from initial display
  document.querySelectorAll('[data-counter]').forEach(el => {
    const field = el.dataset.counter;
    const v = el.textContent.split('/')[0].trim();
    let inp = document.querySelector(`input[name="${field}"]`);
    if (!inp) {
      inp = document.createElement('input');
      inp.type = 'hidden'; inp.name = field;
      const form = document.querySelector('form');
      if (form) form.appendChild(inp);
    }
    inp.value = +v || 0;
  });

  // QR auto-scan animation
  const stage = document.getElementById('scanner-stage');
  if (stage && location.hash === '#/scanner') {
    // brief pulse, no auto-navigate
  }
}

/* ============= Form actions ============= */

window.__filterEntries = function(q) {
  q = q.toLowerCase().trim();
  document.querySelectorAll('#entries-list [data-search], .r-list .r-card').forEach(row => {
    const text = (row.dataset.search || row.textContent).toLowerCase();
    row.style.display = q && !text.includes(q) ? 'none' : '';
  });
};

window.__switchType = function(t) {
  const form = document.querySelector('form[data-form]');
  if (!form) return;
  // Navigate to the matching create form
  if (form.dataset.form === 'create') {
    location.hash = `#/create/${t}`;
  } else {
    form.dataset.type = t;
    // Re-render via state? simpler: just toggle pills and reset type
    document.querySelectorAll('.seg .opt').forEach(b => b.classList.remove('on'));
    [...document.querySelectorAll('.seg .opt')].find(b => b.textContent.trim().toLowerCase().includes(t.replace('list',''))).classList.add('on');
  }
};

window.__submitForm = function(ev) {
  ev.preventDefault();
  const form = ev.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const id = form.dataset.id;
  const type = form.dataset.type;

  const entry = {
    name: data.name?.trim(),
    phone: data.phone?.trim() || '',
    notes: data.notes?.trim() || '',
    type,
    maleEntered: +data.maleEntered || 0,
    maleExpected: +data.maleExpected || (type === 'walkin' ? +data.maleEntered || 0 : 0),
    femaleEntered: +data.femaleEntered || 0,
    femaleExpected: +data.femaleExpected || (type === 'walkin' ? +data.femaleEntered || 0 : 0),
    time: data.time?.trim() || nowTime(),
    date: data.date || today(),
  };

  if (!entry.name) {
    toast('Name is required', 'err');
    return false;
  }

  if (form.dataset.form === 'edit') {
    Store.updateEntry(id, entry);
    toast(`${typeLabel(type)} updated`);
  } else {
    Store.addEntry(entry);
    toast(`${typeLabel(type)} added`);
  }

  // After save, jump to the matching tab
  Store.setTab(type === 'reservation' ? 'reservations' : type === 'guestlist' ? 'guestlist' : 'entries');
  location.hash = '#/home';
  return false;
};

window.__confirmDangerous = function(type, id) {
  const label = dangerLabel(type);
  const messages = {
    walkin: ['Delete Walk-in Entry', 'Do you really want to remove this Walk-in?'],
    reservation: ['Cancel Reservation', 'Do you really want to Cancel this Reservation?'],
    guestlist: ['No-Show of Guest', 'Do you really want to mark this Guest as No-Show?'],
  };
  const [title, msg] = messages[type];
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="overlay" style="z-index:30">
      <div class="confirm" style="position:absolute;left:20px;right:20px;top:50%;transform:translateY(-50%)">
        <h3>${title}</h3>
        <p>${msg}</p>
        <div class="row">
          <button class="btn-secondary" onclick="this.closest('.overlay').remove()">No</button>
          <button class="btn-primary" onclick="window.__confirmYes('${type}','${id}')">Yes</button>
        </div>
      </div>
    </div>`;
  document.getElementById('app').appendChild(wrap.firstElementChild);
};

window.__confirmYes = function(type, id) {
  if (type === 'walkin') {
    Store.deleteEntry(id);
    toast('Walk-in deleted');
  } else if (type === 'reservation') {
    Store.updateEntry(id, { status: 'cancelled' });
    toast('Reservation cancelled');
  } else if (type === 'guestlist') {
    Store.updateEntry(id, { status: 'noshow' });
    toast('Marked as no-show');
  }
  document.querySelector('.overlay')?.remove();
  Store.setTab(type === 'reservation' ? 'reservations' : type === 'guestlist' ? 'guestlist' : 'entries');
  location.hash = '#/home';
};

window.__simulateScan = function() {
  // Pretend the camera caught the first booking
  const b = Store.state.bookings[0];
  if (!b) return;
  toast('QR detected');
  setTimeout(() => { location.hash = `#/booking/${b.id}`; }, 250);
};

window.__submitVerify = function(ev) {
  ev.preventDefault();
  const bid = ev.target.querySelector('[name="bid"]').value.trim();
  const b = Store.getBooking(bid);
  if (!b) {
    toast(`No booking found for ${bid}`, 'err');
    return false;
  }
  location.hash = `#/booking/${b.id}`;
  return false;
};

window.__approve = function(bid) {
  const b = Store.approveBooking(bid);
  if (b) {
    toast(`Entry approved · ${b.tickets.reduce((s,t)=>s+t.total,0)} tickets`);
    location.hash = `#/approved/${bid}`;
  }
};

/* ============= Toast ============= */

function toast(msg, kind = 'ok') {
  const host = document.createElement('div');
  host.className = 'toast-host';
  host.innerHTML = `<div class="toast ${kind === 'err' ? 'err' : ''}">
    <div class="dot">${kind === 'err' ? '!' : ''}</div>
    <div>${esc(msg)}</div>
  </div>`;
  document.getElementById('app').appendChild(host);
  setTimeout(() => host.remove(), 2200);
}

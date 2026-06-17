// Tiny nav helper: closes sheets/dialogs, handles "back".
document.addEventListener('click', (e) => {
  const closer = e.target.closest('[data-close]');
  if (closer) {
    const sel = closer.getAttribute('data-close');
    const el = sel ? document.querySelector(sel) : closer.closest('.dim, .sheet, .dialog');
    if (el) el.style.display = 'none';
    if (sel === 'dim-all') document.querySelectorAll('.dim,.sheet,.dialog').forEach(n => n.style.display = 'none');
  }
  const opener = e.target.closest('[data-open]');
  if (opener) {
    const sel = opener.getAttribute('data-open');
    const el = document.querySelector(sel);
    if (el) el.style.display = '';
  }
});

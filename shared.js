// Tweaks controller
(function() {
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "type": "default",
    "palette": "graphite",
    "display": "cards"
  }/*EDITMODE-END*/;

  const KEY = 'resume_tweaks_v2';
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) return { ...DEFAULTS, ...JSON.parse(raw) }; } catch(e){}
    return { ...DEFAULTS };
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch(e){} }
  function apply(s) {
    const r = document.documentElement;
    r.setAttribute('data-type', s.type);
    r.setAttribute('data-palette', s.palette);
    r.setAttribute('data-display', s.display);
    window.dispatchEvent(new CustomEvent('tweakschanged', { detail: s }));
  }
  const state = load();
  apply(state);
  window.ResumeTweaks = {
    get: () => ({ ...state }),
    set(p) { Object.assign(state, p); save(state); apply(state); syncPanel();
      try { window.parent.postMessage({ type:'__edit_mode_set_keys', edits:p }, '*'); } catch(e){} }
  };

  function buildPanel() {
    if (document.getElementById('tweaks-panel')) return;
    const p = document.createElement('div');
    p.id = 'tweaks-panel';
    p.className = 'tweaks-panel';
    p.innerHTML = `
      <h3>Tweaks</h3>
      <div class="tw-group" data-key="type">
        <div class="tw-label">Typography</div>
        <div class="tw-opts">
          <button class="tw-opt" data-val="default">SF</button>
          <button class="tw-opt" data-val="rounded">Rounded</button>
          <button class="tw-opt" data-val="serif">Serif</button>
        </div>
      </div>
      <div class="tw-group" data-key="palette">
        <div class="tw-label">Appearance</div>
        <div class="tw-opts">
          <button class="tw-opt" data-val="light">Light</button>
          <button class="tw-opt" data-val="silver">Silver</button>
          <button class="tw-opt" data-val="graphite">Graphite</button>
        </div>
      </div>
      <div class="tw-group" data-key="display">
        <div class="tw-label">Career Display</div>
        <div class="tw-opts">
          <button class="tw-opt" data-val="cards">Cards</button>
          <button class="tw-opt" data-val="timeline">Timeline</button>
          <button class="tw-opt" data-val="list">List</button>
        </div>
      </div>`;
    document.body.appendChild(p);
    p.addEventListener('click', (e) => {
      const b = e.target.closest('.tw-opt');
      if (!b) return;
      const k = b.parentElement.parentElement.dataset.key;
      window.ResumeTweaks.set({ [k]: b.dataset.val });
    });
  }
  function syncPanel() {
    const p = document.getElementById('tweaks-panel');
    if (!p) return;
    p.querySelectorAll('.tw-group').forEach(g => {
      const k = g.dataset.key;
      g.querySelectorAll('.tw-opt').forEach(b => b.classList.toggle('active', b.dataset.val === state[k]));
    });
  }
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') { buildPanel(); syncPanel(); document.getElementById('tweaks-panel').classList.add('open'); }
    else if (d.type === '__deactivate_edit_mode') { const el = document.getElementById('tweaks-panel'); if (el) el.classList.remove('open'); }
  });
  try { window.parent.postMessage({ type:'__edit_mode_available' }, '*'); } catch(e){}

  document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav ul a').forEach(a => {
      if (a.getAttribute('href') === path) a.classList.add('active');
    });
  });
})();

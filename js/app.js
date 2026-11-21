window.App = {
  _lastAction: null,
  _toastTimer: null,

  escape(v) {
    return String(v ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  },

  toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  },

  route() {
    const r = decodeURIComponent(location.hash.slice(1)).split('?')[0];
    return Navigation.items.some(i => i[0] === r) ? r : 'inicio';
  },

  wrap(title, subtitle) {
    return `<div class="detail-heading">
      <div class="eyebrow">DOCUMENTACIÓN TÉCNICA · FINALSOFT</div>
      <h1>${this.escape(title)}</h1>
      <p class="detail-description">${this.escape(subtitle)}</p>
    </div>`;
  },

  home() {
    return `
    <section class="hero">
      <div class="hero-bg-topo" aria-hidden="true">
        <div class="topo-composite">
          <img src="assets/images/topologia/sede-secundaria.png" class="topo-piece" alt="">
          <img src="assets/images/topologia/enlace-wan.png" class="topo-piece" alt="">
          <img src="assets/images/topologia/sede-principal.png" class="topo-piece" alt="">
          <img src="assets/images/topologia/dispositivos-externos.png" class="topo-piece" alt="">
        </div>
      </div>
      <div class="hero-content">
        <div class="hero-col-side" aria-hidden="true">
          <span>SISTEMAS Y</span>
          <span>SERVICIOS</span>
          <span>TELEMÁTICOS</span>
          <span>ING. SISTEMAS</span>
          <span>UDENAR</span>
        </div>
        <div class="hero-col-center">
          <div class="eyebrow">PROYECTO FINAL · LABORATORIO DE REDES</div>
          <h1>Infraestructura<br>de <span class="highlight">Red.</span></h1>
          <p>Red corporativa de dos sedes interconectadas mediante un enlace WAN con routers Debian, servicios internos y salida a Internet.</p>
          <div class="hero-actions">
            <button class="btn primary" data-go="topologia">◈ &nbsp; Explorar topología</button>
            <button class="btn ghost" data-go="routers">⇄ &nbsp; Ver routers</button>
          </div>
        </div>
        <div class="hero-col-side right" aria-hidden="true">
          <span>GNS3 · DEBIAN</span>
          <span>DOS SEDES</span>
          <span>PROYECTO FINAL</span>
          <span>finalsoft.net</span>
        </div>
      </div>
    </section>
    <div class="stats">
      <div class="stat"><span class="stat-ico">▥</span><strong>02</strong><span>SEDES INTERCONECTADAS</span></div>
      <div class="stat"><span class="stat-ico">⇄</span><strong>03</strong><span>ROUTERS DEBIAN</span></div>
      <div class="stat"><span class="stat-ico">▤</span><strong>05</strong><span>SERVIDORES CORPORATIVOS</span></div>
      <div class="stat"><span class="stat-ico">◉</span><strong>01</strong><span>DOMINIO INTERNO</span></div>
    </div>
    <div class="section-label">
      <h2>Visión general de la red</h2>
      <span>Selecciona un nodo para explorarlo</span>
    </div>
    ${Topology.render()}
    <div class="section-label">
      <h2>Explora los componentes</h2>
      <span>Configuración, explicación y evidencias</span>
    </div>
    <div class="grid3">${this.cards()}</div>`;
  },

  cards() {
    return Navigation.items
      .filter(x => !['inicio', 'topologia'].includes(x[0]))
      .map(([id, label, icon]) => {
        const d = window.FINALSOFT_DATA[id];
        return `<article class="section-card" tabindex="0" role="link" data-go="${id}">
          <div class="sc-icon">${icon}</div>
          <h3>${this.escape(label)}</h3>
          <p>${this.escape((d?.description || '').slice(0, 115))}${d?.description?.length > 115 ? '…' : ''}</p>
          <span class="link-arrow">Ver documentación →</span>
        </article>`;
      }).join('');
  },

  topologia() {
    return this.wrap('Topología de red', 'Mapa general simplificado de la infraestructura. Puedes abrir cada dispositivo o revisar las capturas reales del laboratorio.') +
      Topology.render() +
      `<div class="section-label"><h2>Direccionamiento y enlaces</h2></div>` +
      this.table(window.FINALSOFT_DATA.infraestructura.table) +
      `<div class="section-label"><h2>Captura de GNS3</h2></div>` +
      Gallery.render(window.FINALSOFT_DATA.infraestructura.images);
  },

  table(rows) {
    if (!rows?.length) return '';
    const [head, ...rest] = rows;
    return `<div class="table-wrap"><table>
      <thead><tr>${head.map(c => `<th>${this.escape(c)}</th>`).join('')}</tr></thead>
      <tbody>${rest.map(r => `<tr>${r.map(c => `<td>${this.escape(c)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  },

  details(id) {
    const d = window.FINALSOFT_DATA[id];
    if (!d) return this.home();
    const current = (new URLSearchParams(location.hash.split('?')[1] || '')).get('tab') || 'proceso';
    const tabs = [
      ['proceso',    'Procedimiento'],
      ['archivos',   'Archivos y comandos'],
      ['pruebas',    'Pruebas'],
      ['evidencias', 'Evidencias']
    ];
    const selected = tabs.some(t => t[0] === current) ? current : 'proceso';

    let content = '';
    if (selected === 'proceso') {
      content = `<div class="grid2">
        <div class="panel">
          <h2>Cómo se implementó</h2>
          ${(d.steps || []).map(([title, detail], i) => `
            <div class="step">
              <div class="step-num">${String(i + 1).padStart(2, '0')}</div>
              <div><h3>${this.escape(title)}</h3><p>${this.escape(detail)}</p></div>
            </div>`).join('')}
        </div>
        <div class="panel">
          <h2>¿Por qué se hizo así?</h2>
          <p>${this.escape(d.description)}</p>
          <div class="callout">Los comandos y resultados se presentan como documentación del laboratorio, no como una consola conectada en tiempo real.</div>
          ${d.note ? `<div class="callout warning">${this.escape(d.note)}</div>` : ''}
          <button class="btn primary" data-tab="archivos">Ver archivos modificados →</button>
        </div>
      </div>
      ${d.table ? `<div class="section-label"><h2>Tabla de referencia</h2></div>${this.table(d.table)}` : ''}`;
    } else if (selected === 'archivos') {
      content = `<p>Archivos y comandos documentados. Algunos bloques son fragmentos representativos, indicados en sus títulos, y no deben confundirse con la configuración completa.</p>
        ${(d.files || []).map(([label, code]) => CodeViewer.render(label, code)).join('')}`;
    } else if (selected === 'pruebas') {
      content = `<div class="panel">
        <h2>Comprobaciones realizadas</h2>
        ${(d.checks || []).map(c => `<div class="check-line"><span class="tick">✓</span><span>${this.escape(c)}</span></div>`).join('')}
        <div class="callout">Resultados reportados en la memoria técnica del laboratorio. Esta página no ejecuta comandos en GNS3.</div>
        <button class="btn" data-tab="evidencias">Ver capturas de pruebas →</button>
      </div>`;
    } else {
      content = Gallery.render(d.images);
    }

    return this.wrap(d.title, d.description) +
      `<div class="badges">${(d.badges || []).map(b => `<span class="pill">${this.escape(b)}</span>`).join('')}</div>
      <div class="tabs" role="tablist" aria-label="Secciones del servicio">
        ${tabs.map(([t, label], i) => `<button
          class="tab${selected === t ? ' active' : ''}"
          role="tab"
          aria-selected="${selected === t}"
          tabindex="${selected === t ? '0' : '-1'}"
          id="tab-${t}"
          data-tab="${t}">${String(i + 1).padStart(2, '0')}. ${label}</button>`).join('')}
      </div>
      <div id="tabpanel-${selected}" role="tabpanel" aria-labelledby="tab-${selected}">${content}</div>`;
  },

  render() {
    const isTabSwitch = this._lastAction === 'tab';
    this._lastAction = null;

    const id = this.route();
    Navigation.active(id);
    document.title = (Navigation.items.find(i => i[0] === id)?.[1] || 'Inicio') + ' | FinalSoft';

    document.getElementById('content').innerHTML =
      id === 'inicio'    ? this.home() :
      id === 'topologia' ? this.topologia() :
      this.details(id);

    document.querySelectorAll('[data-go]').forEach(b => {
      const go = () => { this._lastAction = 'nav'; Navigation.go(b.dataset.go); };
      b.addEventListener('click', go);
      b.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });

    // Tab click: set hash only — hashchange drives the render (no double render)
    document.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => {
      this._lastAction = 'tab';
      location.hash = id + '?tab=' + b.dataset.tab;
    }));

    // Arrow-key navigation between tabs
    const tablist = document.querySelector('[role="tablist"]');
    if (tablist) {
      tablist.addEventListener('keydown', e => {
        const tabs = [...tablist.querySelectorAll('[role="tab"]')];
        const idx = tabs.indexOf(document.activeElement);
        if (idx === -1) return;
        let next = -1;
        if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
        if (e.key === 'ArrowLeft')  next = (idx - 1 + tabs.length) % tabs.length;
        if (next !== -1) { tabs[next].focus(); e.preventDefault(); }
      });
    }

    Topology.bind();
    Gallery.bind();
    CodeViewer.bind();

    if (isTabSwitch) {
      document.querySelector('[role="tab"][aria-selected="true"]')?.focus();
    } else {
      window.scrollTo(0, 0);
    }
  },

  _initSearch() {
    const searchInput   = document.getElementById('searchInput');
    const searchResults = document.getElementById('search-results');
    if (!searchInput || !searchResults) return;

    const hide = () => {
      searchResults.classList.add('hidden');
      searchInput.setAttribute('aria-expanded', 'false');
    };

    const doSearch = q => {
      const lq = q.toLowerCase().trim();
      if (!lq) { hide(); return; }

      const matches = Navigation.items
        .filter(([id]) => id !== 'inicio')
        .filter(([id, label]) => {
          const data = window.FINALSOFT_DATA[id] || {};
          return (label + ' ' + JSON.stringify(data)).toLowerCase().includes(lq);
        })
        .map(([id, label]) => ({ id, label }));

      // Topology/IP search via infraestructura data
      if (!matches.some(m => m.id === 'topologia')) {
        const infra = JSON.stringify(window.FINALSOFT_DATA.infraestructura || {}).toLowerCase();
        if (infra.includes(lq)) matches.unshift({ id: 'topologia', label: 'Topología GNS3' });
      }

      searchResults.innerHTML = matches.length
        ? matches.map(({ id, label }) =>
            `<button class="sr-item" data-go="${id}">${this.escape(label)}</button>`).join('')
        : '<div class="sr-empty">Sin resultados</div>';

      searchResults.classList.remove('hidden');
      searchInput.setAttribute('aria-expanded', 'true');
    };

    searchInput.addEventListener('input', e => doSearch(e.target.value));

    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') { hide(); searchInput.blur(); }
      if (e.key === 'Enter') {
        const first = searchResults.querySelector('.sr-item');
        if (first) { Navigation.go(first.dataset.go); hide(); searchInput.value = ''; }
      }
      if (e.key === 'ArrowDown') {
        searchResults.querySelector('.sr-item')?.focus();
        e.preventDefault();
      }
    });

    searchResults.addEventListener('click', e => {
      const item = e.target.closest('.sr-item');
      if (item) { Navigation.go(item.dataset.go); hide(); searchInput.value = ''; }
    });

    searchResults.addEventListener('keydown', e => {
      const items = [...searchResults.querySelectorAll('.sr-item')];
      const idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { items[Math.min(idx + 1, items.length - 1)]?.focus(); e.preventDefault(); }
      if (e.key === 'ArrowUp')   { idx <= 0 ? searchInput.focus() : items[idx - 1].focus(); e.preventDefault(); }
      if (e.key === 'Enter' && idx !== -1) { Navigation.go(items[idx].dataset.go); hide(); searchInput.value = ''; }
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.search-wrap')) hide();
    });
  },

  init() {
    Navigation.draw();
    this.render();
    // hashchange is the sole driver of re-renders after init
    window.addEventListener('hashchange', () => this.render());

    document.getElementById('modalClose').addEventListener('click', () =>
      document.getElementById('modal').classList.add('hidden'));
    document.getElementById('modal').addEventListener('click', e => {
      if (e.target.id === 'modal') e.currentTarget.classList.add('hidden');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.getElementById('modal').classList.add('hidden');
    });

    this._initSearch();
  }
};

window.addEventListener('DOMContentLoaded', () => App.init());

window.Navigation = {
  items: [
    ['inicio',    'Inicio',                '⌂'],
    ['topologia', 'Topología GNS3',        '◈'],
    ['routers',   'Routers R1 y R2',       '⇄'],
    ['dhcp',      'Servidor DHCP',         '▤'],
    ['dns',       'Servidor DNS',          '◉'],
    ['web',       'Servidor WEB',          '▣'],
    ['correo',    'Servidor CORREO',       '✉'],
    ['backup',    'Servidor BACKUP',       '◷'],
    ['gateway',   'Gateway R3',            '⬡'],
    ['pruebas',   'Pruebas y evidencias',  '✓']
  ],
  _short: {
    topologia: 'Topología', routers: 'Routers', dhcp: 'DHCP',
    dns: 'DNS', web: 'WEB', correo: 'Correo',
    backup: 'Backup', gateway: 'Gateway', pruebas: 'Pruebas'
  },
  draw() {
    document.getElementById('nav').innerHTML = this.items
      .filter(([id]) => id !== 'inicio')
      .map(([id]) => `<a href="#${id}" class="pill-item" data-route="${id}">${this._short[id]}</a>`)
      .join('');
  },
  go(id) {
    window.location.hash = id;
  },
  active(id) {
    document.querySelectorAll('[data-route]').forEach(a => {
      const on = a.dataset.route === id;
      a.classList.toggle('active', on);
      a.setAttribute('aria-current', on ? 'page' : 'false');
    });
    const crumb = document.getElementById('crumb');
    if (crumb) crumb.textContent = this.items.find(x => x[0] === id)?.[1] || 'Inicio';
  }
};

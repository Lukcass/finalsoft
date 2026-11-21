window.FINALSOFT_DATA = window.FINALSOFT_DATA || {};
window.FINALSOFT_DATA["dns"] = {
  "title": "Servidor DNS",
  "description": "BIND9 resuelve los nombres internos del dominio finalsoft.net y admite consultas desde las dos sedes.",
  "badges": [
    "194.170.100.4",
    "BIND9",
    "Zona directa e inversa"
  ],
  "steps": [
    [
      "Instalar BIND9",
      "Se instalaron bind9 y dnsutils en Debian."
    ],
    [
      "Definir zonas",
      "Se declaró una zona directa finalsoft.net y otra inversa 100.170.194.in-addr.arpa."
    ],
    [
      "Permitir consultas de ambas sedes",
      "named.conf.options autoriza 194.170.100.0/24 y 194.170.200.0/24."
    ],
    [
      "Verificar",
      "Se revisaron named-checkzone, dig, host y nslookup."
    ]
  ],
  "files": [
    [
      "/etc/bind/named.conf.local",
      "zone \"finalsoft.net\" IN {\n    type master;\n    file \"/etc/bind/finalsoft.net/db.finalsoft.net\";\n};\nzone \"100.170.194.in-addr.arpa\" IN {\n    type master;\n    file \"/etc/bind/finalsoft.net/db.194.170.100\";\n};"
    ],
    [
      "/etc/bind/finalsoft.net/db.finalsoft.net · registros",
      "dns     IN A  194.170.100.4\nwww     IN A  194.170.100.5\ncorreo  IN A  194.170.100.6\nbackup  IN A  194.170.100.7"
    ],
    [
      "/etc/bind/named.conf.options · opciones relevantes",
      "recursion yes;\nallow-query { localhost; 194.170.100.0/24; 194.170.200.0/24; };\nallow-recursion { localhost; 194.170.100.0/24; 194.170.200.0/24; };\nlisten-on { 127.0.0.1; 194.170.100.4; };\nlisten-on-v6 { none; };"
    ],
    [
      "Pruebas",
      "sudo named-checkconf\ndig @127.0.0.1 www.finalsoft.net\nnslookup www.finalsoft.net 194.170.100.4\nnslookup correo.finalsoft.net 194.170.100.4"
    ]
  ],
  "table": [
    [
      "Nombre",
      "IP"
    ],
    [
      "dns.finalsoft.net",
      "194.170.100.4"
    ],
    [
      "www.finalsoft.net",
      "194.170.100.5"
    ],
    [
      "correo.finalsoft.net",
      "194.170.100.6"
    ],
    [
      "backup.finalsoft.net",
      "194.170.100.7"
    ]
  ],
  "checks": [
    "www.finalsoft.net resuelve a 194.170.100.5",
    "correo.finalsoft.net resuelve a 194.170.100.6",
    "Las consultas desde la sede secundaria responden correctamente"
  ],
  "images": [
    [
      "dns/consulta-www.png",
      "Zonas y consultas DNS",
      "named-checkconf -z, dig de www.finalsoft.net y resolución inversa."
    ]
  ]
};

window.FINALSOFT_DATA = window.FINALSOFT_DATA || {};
window.FINALSOFT_DATA["infraestructura"] = {
  "title": "Resumen de la infraestructura",
  "description": "Red corporativa de dos sedes interconectadas mediante un enlace WAN y con servicios internos centralizados.",
  "badges": [
    "GNS3",
    "Debian",
    "finalsoft.net"
  ],
  "steps": [
    [
      "Direccionamiento",
      "Se definieron redes independientes para cada LAN y el enlace punto a punto."
    ],
    [
      "Enrutamiento",
      "Se utilizaron dos routers Debian, uno por sede, y R3 para el acceso externo."
    ],
    [
      "Servicios",
      "Los servidores de la sede principal ofrecen DHCP, DNS, portal WEB, correo y backup."
    ]
  ],
  "table": [
    [
      "Red",
      "Dirección",
      "Máscara"
    ],
    [
      "Sede principal",
      "194.170.100.0/24",
      "255.255.255.0"
    ],
    [
      "Sede secundaria",
      "194.170.200.0/24",
      "255.255.255.0"
    ],
    [
      "Enlace R1–R2",
      "200.10.20.0/30",
      "255.255.255.252"
    ],
    [
      "NAT1 externa",
      "192.168.42.0/24",
      "255.255.255.0"
    ]
  ],
  "files": [],
  "checks": [
    "Dos sedes conectadas mediante R1 y R2",
    "Servidores en la sede principal accesibles desde ambas LAN",
    "Salida a Internet mediante R3"
  ],
  "images": [
    [
      "topologia/gns3-general.png",
      "Topología GNS3",
      "Sube aquí tu captura completa de GNS3."
    ]
  ]
};

window.FINALSOFT_DATA = window.FINALSOFT_DATA || {};
window.FINALSOFT_DATA["dhcp"] = {
  "title": "Servidor DHCP y relay",
  "description": "Entrega direcciones automáticas a clientes de las dos sedes. DHCP está en la LAN principal y R1 reenvía las solicitudes de la sede secundaria.",
  "badges": [
    "194.170.100.3",
    "isc-dhcp-server",
    "isc-dhcp-relay"
  ],
  "steps": [
    [
      "IP fija",
      "El servidor DHCP mantiene 194.170.100.3/24 en ens3."
    ],
    [
      "Configurar rangos",
      "En dhcpd.conf se declararon los ámbitos .100–.200 de ambas LAN y las reservas MAC de los servidores."
    ],
    [
      "Configurar relay",
      "R1 utiliza isc-dhcp-relay con destino 194.170.100.3 para atender clientes de la LAN secundaria."
    ],
    [
      "Verificar",
      "Se revisó la sintaxis del archivo y la asignación automática de direcciones."
    ]
  ],
  "files": [
    [
      "/etc/default/isc-dhcp-server",
      "INTERFACESv4=\"ens3\"\nINTERFACESv6=\"\""
    ],
    [
      "/etc/dhcp/dhcpd.conf · fragmentos principales",
      "authoritative;\ndefault-lease-time 600;\nmax-lease-time 7200;\n\nsubnet 194.170.100.0 netmask 255.255.255.0 {\n  range 194.170.100.100 194.170.100.200;\n  option routers 194.170.100.1;\n  option domain-name-servers 194.170.100.4, 8.8.8.8;\n}\nsubnet 194.170.200.0 netmask 255.255.255.0 {\n  range 194.170.200.100 194.170.200.200;\n  option routers 194.170.200.254;\n  option domain-name-servers 194.170.100.4, 8.8.8.8;\n}\n# También hay reservas host por dirección MAC para DNS, WEB, CORREO y BACKUP."
    ],
    [
      "R1 · /etc/default/isc-dhcp-relay",
      "SERVERS=\"194.170.100.3\"\nINTERFACES=\"ens3 ens4\"\nOPTIONS=\"\""
    ],
    [
      "Comandos de comprobación",
      "sudo dhcpd -t -cf /etc/dhcp/dhcpd.conf\nsudo systemctl restart isc-dhcp-server\nip a"
    ]
  ],
  "checks": [
    "Los clientes principales reciben IP dentro de 194.170.100.100–200",
    "Los clientes secundarios reciben IP dentro de 194.170.200.100–200 por relay",
    "Servidores DNS, WEB, CORREO y BACKUP reciben direcciones reservadas"
  ],
  "images": [
    [
      "dhcp/dhcp-principal.png",
      "DHCP sede principal",
      "Captura de la IP asignada a un cliente."
    ],
    [
      "dhcp/dhcp-secundaria.png",
      "DHCP sede secundaria",
      "Captura de la asignación vía relay."
    ]
  ]
};

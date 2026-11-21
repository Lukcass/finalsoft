window.FINALSOFT_DATA = window.FINALSOFT_DATA || {};
window.FINALSOFT_DATA["gateway"] = {
  "title": "Gateway R3 · NAT y firewall",
  "description": "R3 conecta las LAN internas con NAT1, publica HTTP del servidor WEB y bloquea tráfico entrante no autorizado.",
  "badges": [
    "LAN 194.170.100.2",
    "Externa 192.168.42.87",
    "iptables"
  ],
  "steps": [
    [
      "Interfaces y rutas",
      "ens3 pertenece a la LAN principal y ens4 recibe IP de NAT1. R3 conoce la ruta de la LAN secundaria vía R2."
    ],
    [
      "Activar forwarding",
      "Se habilitó net.ipv4.ip_forward=1."
    ],
    [
      "Habilitar NAT",
      "MASQUERADE permite salida de las dos LAN; DNAT redirige HTTP externo al servidor WEB."
    ],
    [
      "Aplicar firewall",
      "Se permite la navegación interna y HTTP hacia WEB, bloqueando SSH y el resto del tráfico externo no autorizado."
    ],
    [
      "Persistencia",
      "iptables-persistent guarda las reglas en /etc/iptables/rules.v4."
    ]
  ],
  "files": [
    [
      "R3 · /etc/network/interfaces",
      "auto ens3\niface ens3 inet static\n    address 194.170.100.2\n    netmask 255.255.255.0\n    up ip route add 194.170.200.0/24 via 194.170.100.1\n\nauto ens4\niface ens4 inet dhcp"
    ],
    [
      "/etc/sysctl.d/99-gateway.conf",
      "net.ipv4.ip_forward=1"
    ],
    [
      "Reglas NAT principales",
      "sudo iptables -t nat -A POSTROUTING -s 194.170.100.0/24 -o ens4 -j MASQUERADE\nsudo iptables -t nat -A POSTROUTING -s 194.170.200.0/24 -o ens4 -j MASQUERADE\nsudo iptables -t nat -A PREROUTING -i ens4 -p tcp --dport 80 -j DNAT --to-destination 194.170.100.5:80"
    ],
    [
      "Reglas firewall · ejemplos",
      "sudo iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\nsudo iptables -A FORWARD -i ens3 -o ens4 -s 194.170.100.0/24 -j ACCEPT\nsudo iptables -A FORWARD -i ens3 -o ens4 -s 194.170.200.0/24 -j ACCEPT\nsudo iptables -A FORWARD -i ens4 -o ens3 -p tcp -d 194.170.100.5 --dport 80 -j ACCEPT\nsudo iptables -A FORWARD -i ens4 -p tcp --dport 22 -j DROP\nsudo iptables -A FORWARD -i ens4 -j DROP"
    ],
    [
      "Guardar y verificar",
      "sudo netfilter-persistent save\nsudo iptables -L FORWARD -n -v\nsudo iptables -t nat -L PREROUTING -n -v\ncurl -I http://192.168.42.87"
    ]
  ],
  "checks": [
    "R3 responde ping 8.8.8.8: 0 % pérdida según el documento",
    "Desde el Webterm externo, curl -I http://192.168.42.87 devuelve HTTP/1.1 200 OK",
    "SSH desde la red externa terminó por tiempo de espera",
    "Contadores FORWARD registraron tráfico saliente de ambas redes"
  ],
  "images": [
    [
      "gateway/r3-rutas.png",
      "R3: tabla de rutas",
      "ip route de R3. Los dos comandos iptables de la captura devolvieron error de sintaxis; ver nota."
    ],
    [
      "gateway/nat-firewall.png",
      "NAT y firewall",
      "Pendiente: salida de iptables -t nat -L -n -v y iptables -L FORWARD -n -v."
    ],
    [
      "internet/acceso-web-externo.png",
      "Acceso externo y bloqueos",
      "curl devuelve 200 OK; el ping y el SSH hacia R3 desde fuera no responden."
    ],
    [
      "internet/google-principal.png",
      "Internet sede principal",
      "Pendiente: Webterm abriendo Google."
    ],
    [
      "internet/google-secundaria.png",
      "Internet sede secundaria",
      "Pendiente: Webterm abriendo Google."
    ]
  ]
};

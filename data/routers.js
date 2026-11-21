window.FINALSOFT_DATA = window.FINALSOFT_DATA || {};
window.FINALSOFT_DATA["routers"] = {
  "title": "Routers R1 y R2",
  "description": "Dos nodos Debian QEMU con dos interfaces virtio-net-pci cada uno que realizan el enrutamiento entre la sede principal y la sede secundaria.",
  "badges": [
    "R1 · secundaria",
    "R2 · principal",
    "WAN 200.10.20.0/30"
  ],
  "steps": [
    [
      "Preparar nodos",
      "En GNS3 se asignaron dos tarjetas virtio-net-pci a cada Debian para separar WAN y LAN."
    ],
    [
      "Configurar IP y rutas",
      "Se editaron los archivos /etc/network/interfaces de R1 y R2 para asignar IP estáticas y rutas."
    ],
    [
      "Activar reenvío IPv4",
      "En /etc/sysctl.conf se habilitó net.ipv4.ip_forward=1 en ambos equipos."
    ],
    [
      "Comprobar conectividad",
      "Se revisaron ip a, ip route y ping entre R1 y R2."
    ]
  ],
  "files": [
    [
      "R1 · /etc/network/interfaces",
      "auto ens3\niface ens3 inet static\n    address 200.10.20.2\n    netmask 255.255.255.252\n    gateway 200.10.20.1\n\nauto ens4\niface ens4 inet static\n    address 194.170.200.254\n    netmask 255.255.255.0"
    ],
    [
      "R2 · /etc/network/interfaces",
      "auto ens3\niface ens3 inet static\n    address 200.10.20.1\n    netmask 255.255.255.252\n    up ip route add 194.170.200.0/24 via 200.10.20.2\n\nauto ens4\niface ens4 inet static\n    address 194.170.100.1\n    netmask 255.255.255.0\n    up ip route add default via 194.170.100.2"
    ],
    [
      "R1 y R2 · /etc/sysctl.conf",
      "net.ipv4.ip_forward=1"
    ],
    [
      "Aplicar y verificar",
      "sudo sysctl -p\nsudo systemctl restart networking\nip a\nip route\nping -c 4 200.10.20.2"
    ]
  ],
  "checks": [
    "R2 → R1 por WAN: ping 200.10.20.2, sin pérdida de paquetes según el documento",
    "R1 utiliza R2 como gateway del enlace WAN",
    "R2 conoce la ruta de retorno hacia la LAN secundaria"
  ],
  "images": [
    [
      "routers/r1-config.png",
      "Direcciones en R1",
      "Captura de ip a en el router R1."
    ],
    [
      "routers/r2-config.png",
      "Direcciones en R2",
      "Captura de ip route en R2."
    ],
    [
      "routers/ping-enlace.png",
      "Prueba del enlace",
      "Ping entre los routers Debian."
    ]
  ]
};

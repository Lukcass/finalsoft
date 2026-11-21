window.FINALSOFT_DATA = window.FINALSOFT_DATA || {};
window.FINALSOFT_DATA["pruebas"] = {
  "title": "Evidencias y pruebas finales",
  "description": "Resumen de las verificaciones documentadas y galería de capturas que puedes incorporar al portal.",
  "badges": [
    "Red interna",
    "Servicios",
    "Acceso externo"
  ],
  "steps": [
    [
      "Conectividad WAN",
      "Ping entre routers R1 y R2."
    ],
    [
      "Asignación de IP y DNS",
      "Clientes de ambas LAN y consultas al dominio interno."
    ],
    [
      "Correo interno",
      "Mensajes entre Camilo y Lucas y bloqueo de envío hacia Gmail."
    ],
    [
      "Publicación WEB y seguridad",
      "HTTP externo, salida a Internet y bloqueo de SSH."
    ],
    [
      "Backup",
      "Copia generada y ejecución de cron."
    ]
  ],
  "files": [
    [
      "Pruebas rápidas",
      "ip a\nip route\nping -c 4 200.10.20.2\nnslookup www.finalsoft.net 194.170.100.4\ncurl -I http://192.168.42.87\nsudo crontab -l"
    ]
  ],
  "checks": [
    "Las pruebas marcadas corresponden a resultados del documento de laboratorio, no verificaciones en vivo."
  ],
  "images": [
    [
      "topologia/gns3-general.png",
      "Topología completa",
      "Imagen real de la infraestructura en GNS3."
    ],
    [
      "routers/ping-enlace.png",
      "Ping punto a punto",
      "R1 y R2."
    ],
    [
      "correo/correo-enviado.png",
      "Envío de correo",
      "SquirrelMail."
    ],
    [
      "correo/bloqueo-gmail.png",
      "Bloqueo de Gmail",
      "Error 554."
    ],
    [
      "internet/google-principal.png",
      "Google en sede principal",
      "Webterm principal."
    ],
    [
      "internet/google-secundaria.png",
      "Google en sede secundaria",
      "Webterm secundario."
    ],
    [
      "internet/acceso-web-externo.png",
      "HTTP externo",
      "Acceso desde NAT1."
    ],
    [
      "backup/backup-exitoso.png",
      "Respaldo exitoso",
      "Script de backup."
    ]
  ]
};

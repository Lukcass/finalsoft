window.FINALSOFT_DATA = window.FINALSOFT_DATA || {};
window.FINALSOFT_DATA["backup"] = {
  "title": "Servidor BACKUP",
  "description": "Respaldos automáticos del contenido WEB mediante rsync y SSH desde una máquina Debian independiente.",
  "badges": [
    "194.170.100.7",
    "rsync + SSH",
    "Cron · 08:15"
  ],
  "steps": [
    [
      "Preparar acceso seguro",
      "Se creó un usuario respaldo en el servidor WEB y claves SSH Ed25519 en BACKUP."
    ],
    [
      "Transferencia con rsync",
      "Se comprobó la lectura del directorio /var/www/html desde BACKUP."
    ],
    [
      "Crear script",
      "backup_web.sh descarga, comprime, registra la operación y elimina copias antiguas."
    ],
    [
      "Programar cron",
      "Se instaló una tarea diaria a las 08:15, hora America/Bogota."
    ]
  ],
  "files": [
    [
      "BACKUP · herramientas",
      "sudo apt update\nsudo apt install rsync openssh-client cron -y\nsudo ssh-keygen -t ed25519 -N \"\" -f /root/.ssh/id_backup"
    ],
    [
      "/usr/local/bin/backup_web.sh · resumen de operación",
      "# Script original documentado en el proyecto\n# 1. rsync sobre SSH: copia /var/www/html\n# 2. tar -czf: genera web_FECHA.tar.gz\n# 3. find -mtime +7 -delete: elimina copias antiguas\n# 4. Registra resultado en /backups/backup.log\n# Ver el archivo completo en el documento del proyecto"
    ],
    [
      "Cron del usuario root",
      "15 8 * * * /usr/local/bin/backup_web.sh"
    ],
    [
      "Verificación",
      "sudo bash -n /usr/local/bin/backup_web.sh\nsudo /usr/local/bin/backup_web.sh\nsudo ls -lh /backups/web/\nsudo cat /backups/backup.log\nsudo crontab -l"
    ]
  ],
  "checks": [
    "Se creó un respaldo comprimido web_2026-11-19_22-19.tar.gz",
    "El registro /backups/backup.log confirmó COPIA EXITOSA",
    "La tarea de cron quedó programada diariamente a las 8:15"
  ],
  "images": [
    [
      "backup/backup-exitoso.png",
      "Respaldo generado",
      "Cron 08:15, archivo .tar.gz y registro COPIA EXITOSA en backup.log."
    ]
  ]
};

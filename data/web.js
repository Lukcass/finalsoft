window.FINALSOFT_DATA = window.FINALSOFT_DATA || {};
window.FINALSOFT_DATA["web"] = {
  "title": "Servidor WEB",
  "description": "Apache2 publica el portal corporativo de FinalSoft desde /var/www/html, con el nombre www.finalsoft.net.",
  "badges": [
    "194.170.100.5",
    "Apache2",
    "Puerto 80"
  ],
  "steps": [
    [
      "IP reservada",
      "El servidor recibe 194.170.100.5 por reserva DHCP."
    ],
    [
      "Instalar Apache2",
      "Se instaló el servidor HTTP Apache."
    ],
    [
      "Crear VirtualHost",
      "Se configuró el dominio y DocumentRoot, activando el sitio finalsoft.conf."
    ],
    [
      "Publicar el portal",
      "Los archivos de este proyecto se copian a /var/www/html y se incluyen en el backup."
    ]
  ],
  "files": [
    [
      "/etc/network/interfaces",
      "auto ens3\niface ens3 inet dhcp"
    ],
    [
      "/etc/apache2/sites-available/finalsoft.conf",
      "<VirtualHost *:80>\n  ServerName www.finalsoft.net\n  DocumentRoot /var/www/html\n  ErrorLog ${APACHE_LOG_DIR}/finalsoft_error.log\n  CustomLog ${APACHE_LOG_DIR}/finalsoft_access.log combined\n</VirtualHost>"
    ],
    [
      "Activar y comprobar",
      "sudo a2ensite finalsoft.conf\nsudo a2dissite 000-default.conf\nsudo apache2ctl configtest\nsudo systemctl restart apache2"
    ]
  ],
  "checks": [
    "Apache informa Syntax OK",
    "Desde un Webterm principal responde http://194.170.100.5",
    "Desde ambas sedes se puede usar el nombre www.finalsoft.net si DNS y rutas funcionan"
  ],
  "images": [
    [
      "web/portal-principal.png",
      "Portal WEB",
      "Captura del portal abierto en Webterm."
    ]
  ]
};

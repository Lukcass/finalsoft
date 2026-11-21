window.FINALSOFT_DATA = window.FINALSOFT_DATA || {};
window.FINALSOFT_DATA["correo"] = {
  "title": "Servidor CORREO",
  "description": "Servicio de correo interno con Postfix, Dovecot y SquirrelMail para las cuentas corporativas de finalsoft.net.",
  "badges": [
    "194.170.100.6",
    "Postfix + Dovecot",
    "SquirrelMail"
  ],
  "steps": [
    [
      "Postfix · SMTP",
      "Se configuró correo.finalsoft.net, mydestination, mynetworks y almacenamiento Maildir."
    ],
    [
      "Dovecot · IMAP",
      "Se configuró mail_location = maildir:~/Maildir para leer los buzones."
    ],
    [
      "SquirrelMail · Webmail",
      "El cliente web se publicó en /webmail/ con Apache y PHP, en el entorno de laboratorio."
    ],
    [
      "Restricción a correo interno",
      "Se creó una lista regexp que no rechaza cuentas @finalsoft.net y rechaza destinatarios externos."
    ],
    [
      "Pruebas funcionales",
      "Camilo envió mensajes a Lucas y se probó el rechazo de un destinatario Gmail."
    ]
  ],
  "files": [
    [
      "Postfix · parámetros principales",
      "sudo postconf -e \"myhostname = correo.finalsoft.net\"\nsudo postconf -e \"mydestination = \\$myhostname, finalsoft.net, localhost.localdomain, localhost\"\nsudo postconf -e \"mynetworks = 127.0.0.0/8 194.170.100.0/24 194.170.200.0/24\"\nsudo postconf -e \"inet_protocols = ipv4\"\nsudo postconf -e \"home_mailbox = Maildir/\""
    ],
    [
      "/etc/dovecot/conf.d/10-mail.conf",
      "mail_location = maildir:~/Maildir"
    ],
    [
      "/etc/postfix/destinatarios_internos",
      "/@finalsoft\\.net$/ DUNNO\n/.*/ REJECT Solo se permite correo interno"
    ],
    [
      "Prueba y activación de la regla",
      "sudo cp /etc/postfix/main.cf /etc/postfix/main.cf.bak\nprintf '/@finalsoft\\\\.net$/ DUNNO\\n/.*/ REJECT Solo se permite correo interno\\n' | sudo tee /etc/postfix/destinatarios_internos\nsudo /usr/sbin/postmap -q 'lucas@finalsoft.net' regexp:/etc/postfix/destinatarios_internos\nsudo /usr/sbin/postmap -q 'usuario@gmail.com' regexp:/etc/postfix/destinatarios_internos\n# En la práctica se aplicó la restricción con postconf y después:\nsudo /usr/sbin/postfix check\nsudo /usr/sbin/postfix reload"
    ]
  ],
  "checks": [
    "Camilo → Lucas: mensaje recibido correctamente",
    "SquirrelMail abre mediante http://correo.finalsoft.net/webmail/",
    "Envío a Gmail rechazado: 554 5.7.1 Solo se permite correo interno"
  ],
  "images": [
    [
      "correo/postfix-dovecot.png",
      "Postfix y Dovecot",
      "Puertos 25, 110 y 143 en escucha y ajustes de Dovecot (laboratorio, sin TLS)."
    ],
    [
      "correo/squirrelmail-login.png",
      "Inicio de sesión SquirrelMail",
      "Pendiente: captura del login del webmail."
    ],
    [
      "correo/correo-enviado.png",
      "Correo enviado",
      "Pendiente: mensaje interno desde Camilo."
    ],
    [
      "correo/correo-recibido.png",
      "Correo recibido",
      "Pendiente: mensaje recibido por Lucas."
    ],
    [
      "correo/bloqueo-gmail.png",
      "Correo externo rechazado",
      "Pendiente: error 554 5.7.1."
    ]
  ],
  "note": "La configuración descrita reproduce la práctica de laboratorio. No publica contraseñas; Postfix y Dovecot sin TLS y versiones antiguas de PHP/SquirrelMail no son apropiados para Internet pública."
};

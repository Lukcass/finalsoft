# Contexto del proyecto: FinalSoft

Sitio web ESTÁTICO (HTML/CSS/JS, sin build ni dependencias) que documenta un laboratorio
de redes (Sistemas y Servicios Telemáticos, Ingeniería de Sistemas, Universidad de Nariño)
hecho en GNS3 con Debian. Debe seguir abriéndose con doble clic en `index.html`
(sin servidor, sin fetch, sin npm).

## Estructura
- `index.html`: punto de entrada. `css/`: estilos. `js/`: app, navegación, topología SVG, galería, visor de código.
- `data/*.js`: contenido de cada servicio (pasos, archivos, pruebas y lista `images`).
- `assets/images/<servicio>/`: capturas. Si falta una, se muestra `evidencia-pendiente.svg`.
- `docs/Proyecto_Final_Routers_Sedes.docx`: documento fuente del proyecto (configuraciones completas). Úsalo como fuente de verdad del contenido técnico.
- `referencia/room-and-pillar.png`: diseño visual que se quiere imitar.

## Red (resumen)
- Sede principal 194.170.100.0/24 · Sede secundaria 194.170.200.0/24 · Enlace WAN R1–R2 200.10.20.0/30
- R1 = secundaria (LAN 194.170.200.254, WAN .2) · R2 = principal (LAN 194.170.100.1, WAN .1)
- R3 = gateway/NAT/firewall (LAN 194.170.100.2, externa 192.168.42.87 vía NAT1)
- Servidores sede principal: DHCP .3, DNS .4, WEB .5, CORREO .6, BACKUP .7 (dominio finalsoft.net)

## Capturas incluidas (reales, del laboratorio)
Son PNG con fondo transparente y texto dorado de terminal: deben verse bien sobre fondo oscuro Y claro.
- topologia/: sede-principal, sede-secundaria, enlace-wan, dispositivos-externos (piezas del esquema de GNS3, sin fondo)
- routers/r2-config.png (ip a, ip route, ping R2→R1)
- dhcp/dhcp-principal.png, dhcp/dhcp-secundaria.png
- dns/consulta-www.png · web/apache-status.png · correo/postfix-dovecot.png
- backup/backup-exitoso.png · gateway/r3-rutas.png · internet/acceso-web-externo.png

## Capturas pendientes (aparecen como "Evidencia pendiente")
routers/r1-config, web/portal-principal, correo/squirrelmail-login, correo/correo-enviado,
correo/correo-recibido, correo/bloqueo-gmail, gateway/nat-firewall, internet/google-principal,
internet/google-secundaria. No inventes capturas ni las simules: déjalas pendientes.

## Observaciones sobre el contenido (revisar con la persona antes de cambiar)
- gateway/r3-rutas.png muestra dos comandos iptables con error de sintaxis ("Invalid rule number"):
  no sirve como prueba del NAT/firewall; falta una captura correcta (iptables -t nat -L -n -v y iptables -L FORWARD -n -v).
- correo/postfix-dovecot.png muestra ssl = no y disable_plaintext_auth = no (solo laboratorio).
- Las pruebas de firewall deberían incluir reglas en INPUT; el SSH a R3 desde fuera no pasa por FORWARD.

## Diseño objetivo (referencia/room-and-pillar.png)
- Fondo gris casi negro; tarjeta grande redondeada encima
- Título enorme sans-serif (tipo Inter/Helvetica) que se solapa con la imagen central
- Textos pequeños monoespaciados en mayúsculas a los lados del título
- Encabezado fino con líneas: "Room ——— & ——— Pillar"
- Un único acento verde lima; menú flotante en píldora, abajo y centrado
- Imagen central en blanco y negro con grano/puntos: usar la topología de red, no la roca

## Reglas de trabajo
- Plan antes de editar. Cambios pequeños. Un commit por cambio lógico.
- No introducir frameworks ni build tools. Mantener accesibilidad (teclado, aria) y responsive.
- No escribir contraseñas ni datos privados en el sitio.

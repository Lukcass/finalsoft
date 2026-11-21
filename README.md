# FinalSoft — Documentación interactiva de red

Sitio web **estático** (HTML, CSS y JavaScript) basado en el documento del proyecto *Sistemas y Servicios Telemáticos*.

## Cómo abrir en Windows

1. Extrae el ZIP.
2. Entra a `finalsoft-web`.
3. Abre `index.html` con Chrome, Firefox o Edge. **No necesitas instalar nada**. El sitio utiliza archivos JavaScript locales y no requiere `fetch` ni servidor de desarrollo.

## Cómo publicarlo en el servidor Apache Debian

La instalación documentada tiene `DocumentRoot /var/www/html` y dominio `www.finalsoft.net`. Copia **el contenido interior** de `finalsoft-web/` a `/var/www/html/` de tu servidor WEB. Asegúrate de dejar `index.html` directamente dentro de esa ruta, junto con las carpetas `css`, `js`, `data` y `assets`. Puedes guardar una copia del sitio anterior antes de reemplazarlo. Después abre `http://www.finalsoft.net` desde un Webterm que resuelva el DNS interno.

## Añadir tus capturas

Las carpetas están preparadas para imágenes reales, pero **no se incluyen capturas inventadas**. Si no hay archivo, verás una ilustración con el mensaje "Evidencia pendiente".

Copia tus imágenes con estos nombres (o cambia las rutas en `data/*.js`):

- `assets/images/topologia/gns3-general.png`
- `assets/images/routers/r1-config.png`, `r2-config.png`, `ping-enlace.png`
- `assets/images/dhcp/dhcp-principal.png`, `dhcp-secundaria.png`
- `assets/images/dns/consulta-www.png`
- `assets/images/web/portal-principal.png`
- `assets/images/correo/squirrelmail-login.png`, `correo-enviado.png`, `correo-recibido.png`, `bloqueo-gmail.png`
- `assets/images/backup/backup-exitoso.png`
- `assets/images/gateway/nat-firewall.png`
- `assets/images/internet/google-principal.png`, `google-secundaria.png`, `acceso-web-externo.png`

## Archivos clave

- `index.html`: punto de entrada y estructura.
- `css/`: diseño responsive.
- `js/app.js`: páginas, pestañas, componentes; `navigation.js`: menú; `topology.js`: esquema; `gallery.js`: imágenes; `code-viewer.js`: copiar comandos.
- `data/`: contenido editable de cada servicio.

## Advertencias

- Las pruebas y estados del sitio son **documentación histórica**, no lectura en vivo de los servicios.
- Las configuraciones de algunos archivos se presentan como fragmentos explicativos, no como recetas exhaustivas.
- El sitio no contiene credenciales, claves privadas ni capturas reales. No publiques secretos en la carpeta web.
- El laboratorio de correo utiliza componentes antiguos y ajustes sin cifrado; no debe exponerse tal como está a Internet pública.
# finalsoft

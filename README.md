# Hermanos Barrios · propuesta web no oficial

Sitio estático en español, sin compilación ni dependencias JavaScript. Publicar solo como demostración no oficial hasta obtener autorización.

## Cloudflare Pages
Conectar el repositorio, rama main, preset None, comando de compilación vacío, directorio de salida "." (raíz). No añadir variables. También compatible con GitHub Pages desde main / root.

## Archivos
- index.html: contenido y componentes semánticos.
- css/styles.css: diseño, responsive, accesibilidad.
- js/main.js: menú, galería, configurador y formulario local.
- assets/favicon.svg y assets/wood.svg: identidad conceptual y respaldo gráfico.
- robots.txt y _headers: bloqueo preventivo de rastreadores, noindex y cabeceras de seguridad para Cloudflare. Meta noindex y CSP también en HTML.

## Contenido y fuentes
- https://www.einforma.com/informacion-empresa/carpinteria-ebanisteria-hermanos-barrios — constitución de la sociedad en 2006, objeto social.
- https://www.cylex.es/fuenlabrada-madrid/carpinter%C3%ADa-ebanister%C3%ADa-hermanos-barrios-s-l--13465583.html — teléfono y dirección.
- https://firmania.es/fuenlabrada-madrid/carpinter%C3%ADa-ebanister%C3%ADa-hermanos-barrios-sl-1803841 — contacto y horario publicado.
- https://fuenlabradavirtual.com/hogar/tienda-de-armarios/carpinteria-ebanisteria-hermanos-barrios-s-l-1985/ — categoría comercial.
- https://www.axesor.es/Informes-Empresas/296787/EBANISTERIA_BARRIOS_E_HIJOS_SL.html — antecedente societario de 1991, coincidencia de teléfono; no demuestra continuidad.
- Fotografías ilustrativas de Unsplash, no atribuidas al negocio. Se han visualizado los ocho originales a través de sus enlaces de descarga; la carga desde el sitio publicado debe comprobarse. Se usan enlaces externos con respaldo gráfico local. Autores y páginas de referencia:
  - Clay Banks: https://unsplash.com/photos/tN1oFRA5saY
  - Lisa Anna: https://unsplash.com/photos/6Y3avYzs6os
  - Aleksandra Dementeva: https://unsplash.com/photos/qWi5wl1Ncrk
  - Craft Kitties: https://unsplash.com/photos/GfYA6q5ESLI
  - McFollis: https://unsplash.com/photos/oKm0abwopb0
  - Rumman Amin: https://unsplash.com/photos/3fFBoEHee28
  - Tim JT: https://unsplash.com/photos/AKqGrt7Q1DU
  - Will Suddreth: https://unsplash.com/photos/o54RjF-C7xo
  Revisar condiciones de uso, optimizar y alojar fotografías localmente o sustituir por imágenes reales autorizadas antes de la publicación oficial.

## Privacidad
Formulario sin action ni nombres de campos transmisibles, deshabilitado hasta cargar JS, sin almacenamiento, sin analítica, sin petición de red al enviar; usar datos ficticios. Recursos gráficos externos pueden recibir datos técnicos de conexión; no hay mapas incrustados. Enlaces de teléfono y mapa son acciones explícitas.

## Validación antes de publicación oficial
Confirmar actividad, identidad jurídica vigente, titularidad del teléfono, ubicación y horario, catálogo y proceso de trabajo, permisos de marca e imágenes, antecedentes históricos. No se incluyen reseñas inventadas, precios, garantías ni fechas de fundación no acreditadas. El configurador es orientativo y no calcula presupuestos. Retirar noindex y adaptar privacidad/formulario únicamente tras autorización.

## Pruebas manuales
Abrir index.html con un servidor estático, probar 360, 768 y 1440 px, menú por teclado y Escape, filtros y diálogo de galería (flechas y Escape), todas las opciones del configurador, formulario válido e inválido sin red y enlaces externos. Confirmar carga de fotos y revisar consola. Comparativa: Los Andes tiene nueve secciones y cuatro FAQ en el HTML consultado; esta demo amplía ambos elementos.

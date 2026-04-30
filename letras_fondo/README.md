# Portafolio Sharon Natividad

Portfolio personal en HTML/CSS/JS puro, listo para GitHub Pages.

## 📁 Estructura

```
.
├── index.html       ← Página principal
├── styles.css       ← Todos los estilos (incluye modo claro/oscuro)
├── script.js        ← Modal, toggle de tema, navegación
└── videos/          ← Tus videos de demo
    ├── dashboard-mype.mp4
    ├── efact-bot.mp4
    ├── caja-chica.mp4
    └── combustible.mp4
```

## 🚀 Cómo subirlo a tu repo

1. **Descarga la carpeta `final/`** y descomprime.
2. **Renombra `final/` a la raíz** de tu repo `SharonNatize.github.io` (o copia el contenido directamente).
3. **Crea la carpeta `videos/`** dentro y agrega tus videos con los nombres que están en `script.js`:
   - `videos/dashboard-mype.mp4`
   - `videos/efact-bot.mp4`
   - `videos/caja-chica.mp4`
   - `videos/combustible.mp4`
4. *(Opcional)* Agrega una imagen poster `.jpg` con el mismo nombre para que se vea antes de hacer play:
   - `videos/dashboard-mype.jpg`, etc.
5. Commit y push:
   ```bash
   git add .
   git commit -m "feat: nuevo diseño de portafolio"
   git push
   ```

## 🎨 Cómo personalizar

### Cambiar color de acento
En `styles.css`, línea 7:
```css
--accent: #7C3AED;  /* violeta actual */
```
Otros colores que probamos:
- Azul: `#2563EB`
- Verde: `#10B981`
- Negro: `#0F172A`

### Editar proyectos
En `script.js`, edita el array `PROJECTS` (líneas 8-100). Cada proyecto tiene:
- `icon`, `title`, `sub`, `desc`, `long`
- `metric`, `tags`, `role`, `duration`, `stack`, `results`
- `video` (ruta al .mp4) y `poster` (imagen previa, opcional)

### Editar textos del hero/servicios
Directamente en `index.html`. Está bien comentado por secciones:
- `<!-- HERO -->`
- `<!-- SERVICIOS -->`
- `<!-- SOBRE MÍ -->`
- `<!-- CTA -->`

## 📹 Recomendaciones para tus videos

- **Formato:** `.mp4` con codec H.264
- **Duración:** 30-60 segundos (cortos y al grano)
- **Tamaño:** máximo 8-10MB cada uno (GitHub Pages tiene límite)
- **Resolución:** 1280×720 (suficiente para el modal)
- **Si el video pesa mucho:** súbelo a YouTube/Vimeo (unlisted) y reemplaza
  el `<video>` por un `<iframe>` en `script.js` función `openModal`.

## 🌓 Modo claro/oscuro

Funciona automáticamente:
- Detecta la preferencia del sistema operativo del visitante
- El toggle en la navbar permite cambiarlo manualmente
- Se guarda en `localStorage` para que recuerde la preferencia

## ✏️ Cuando esté listo el servicio de RRHH

En `index.html`, busca la sección `<!-- SERVICIOS -->` y la card con la badge "Próximamente":
1. Elimina la línea: `<div class="service-badge">Próximamente</div>`
2. Actualiza el texto del servicio con la descripción real
3. Agrega un nuevo proyecto en `script.js` cuando tengas el caso real

## 📞 Datos de contacto configurados

- WhatsApp: +51 949 782 397
- Email: natize.sh7@gmail.com
- GitHub: github.com/SharonNatize

Si cambian, busca y reemplaza en `index.html`.

---

¡Cualquier duda, escríbeme! 💜

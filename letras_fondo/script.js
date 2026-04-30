/* =========================
   Sharon Natividad — Portfolio
   script.js (vanilla JS, no dependencies)
   ========================= */

// ----- DATOS DE PROYECTOS -----
// Edita aquí para añadir/modificar proyectos.
// "video": ruta al archivo en /videos/  (puede ser .mp4 o .webm)
// "poster": imagen de preview opcional. Si no hay video, muestra fallback.
const PROJECTS = [
  {
    id: "dashboard-mype",
    icon: "📊",
    title: "Dashboard de Gestión Comercial",
    sub: "MYPE · Sector retail",
    desc: "Sistema de visualización financiera sobre Google Sheets. 6 módulos con filtros en vivo por período.",
    long: "Diseñé un dashboard ejecutivo sobre Google Sheets pensado para pequeños negocios que aún no tienen un ERP. Permite filtrar ventas, gastos y flujo de caja por período sin tocar fórmulas, con KPIs que se actualizan automáticamente cuando llega data nueva.",
    metric: "6 módulos",
    tags: ["Apps Script", "Google Sheets"],
    role: "Diseño · Desarrollo",
    duration: "3 semanas",
    stack: ["Google Apps Script", "Google Sheets API", "JavaScript"],
    results: [
      "Visibilidad ejecutiva sin contratar un ERP",
      "Filtros por período sin abrir fórmulas",
      "Actualización automática de KPIs",
    ],
    video: "videos/dashboard-mype.mp4",
    poster: "videos/dashboard-mype.jpg",
  },
  {
    id: "efact-bot",
    icon: "🤖",
    title: "Bot de Guías de Remisión",
    sub: "Logística · Portal eFact",
    desc: "Llenado masivo automatizado de guías. Estable ante actualizaciones del SO con manejo de errores.",
    long: "Bot en Python + Selenium que automatiza el llenado masivo de guías de remisión en el portal eFact. Diseñé el flujo para que sea estable ante cambios del navegador o del sistema, con reintentos automáticos y logs claros para el equipo de logística.",
    metric: "Llenado masivo",
    tags: ["Python", "Selenium"],
    role: "Desarrollo · QA",
    duration: "4 semanas",
    stack: ["Python", "Selenium", "Chromium WebDriver"],
    results: [
      "Reducción drástica del tiempo manual",
      "Manejo automático de errores y reintentos",
      "Estable ante updates del portal",
    ],
    video: "videos/efact-bot.mp4",
    poster: "videos/efact-bot.jpg",
  },
  {
    id: "caja-chica",
    icon: "📸",
    title: "Caja Chica con Fotos",
    sub: "Operaciones",
    desc: "Subida de comprobantes desde la planilla, organizados en Drive por línea de negocio.",
    long: "Solución en Apps Script que permite al equipo de operaciones subir fotos de comprobantes directamente desde la planilla de caja chica. Las imágenes se organizan automáticamente en Drive por línea de negocio, eliminando la búsqueda interminable por WhatsApp.",
    metric: "Cero búsquedas",
    tags: ["Apps Script", "Drive"],
    role: "Diseño · Desarrollo",
    duration: "2 semanas",
    stack: ["Google Apps Script", "Drive API"],
    results: [
      "Comprobantes organizados sin esfuerzo",
      "Trazabilidad por línea de negocio",
      "Mucho menos tiempo buscando documentos",
    ],
    video: "videos/caja-chica.mp4",
    poster: "videos/caja-chica.jpg",
  },
  {
    id: "combustible",
    icon: "⛽",
    title: "Asignación de Combustible",
    sub: "Flota · MINIVAN / CAMIÓN",
    desc: "Macro Excel para gestión de combustible. Distribución automática de costos entre negocios.",
    long: "Macro VBA que gestiona el control de combustible por vehículo y distribuye automáticamente los costos entre las distintas líneas de negocio. Incluye un panel de edición e historial de cargas, manteniendo todo dentro del Excel que el equipo ya usa.",
    metric: "Distribución auto",
    tags: ["VBA", "Excel"],
    role: "Diseño · Desarrollo",
    duration: "2 semanas",
    stack: ["Excel", "VBA"],
    results: [
      "Distribución de costos sin cálculos manuales",
      "Historial completo por vehículo",
      "Panel editable para correcciones",
    ],
    video: "videos/combustible.mp4",
    poster: "videos/combustible.jpg",
  },
];

// ----- THEME TOGGLE -----
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
html.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ----- RENDER PROJECTS -----
const grid = document.getElementById("projects-grid");
PROJECTS.forEach((p, idx) => {
  const card = document.createElement("button");
  card.className = "project-card";
  card.dataset.idx = idx;
  card.innerHTML = `
    <div class="project-card-head">
      <div class="project-icon">${p.icon}</div>
      <div class="project-metric">${p.metric}</div>
    </div>
    <div>
      <div class="project-sub">${p.sub}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </div>
    <div class="project-card-foot">
      <div class="project-tags">
        ${p.tags.map(t => `<span>${t}</span>`).join("")}
      </div>
      <span class="project-link">Ver detalle →</span>
    </div>
  `;
  card.addEventListener("click", () => openModal(idx));
  grid.appendChild(card);
});

// ----- MODAL -----
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");

function openModal(idx) {
  const p = PROJECTS[idx];
  document.getElementById("modal-icon").textContent = p.icon;
  document.getElementById("modal-sub").textContent = p.sub;
  document.getElementById("modal-title").textContent = p.title;
  document.getElementById("modal-long").textContent = p.long;

  // Media — intenta video, si no hay, muestra fallback
  const media = document.getElementById("modal-media");
  media.innerHTML = "";
  if (p.video) {
    const v = document.createElement("video");
    v.src = p.video;
    v.controls = true;
    v.playsInline = true;
    if (p.poster) v.poster = p.poster;
    // Fallback si el video no carga
    v.addEventListener("error", () => {
      media.innerHTML = `<div class="modal-media-fallback">Demo en video próximamente · <em>${p.title}</em></div>`;
    });
    media.appendChild(v);
  } else {
    media.innerHTML = `<div class="modal-media-fallback">Demo en video próximamente · <em>${p.title}</em></div>`;
  }

  // Meta
  const meta = document.getElementById("modal-meta");
  meta.innerHTML = `
    <div class="meta-block"><strong>Rol</strong><span>${p.role}</span></div>
    <div class="meta-block"><strong>Duración</strong><span>${p.duration}</span></div>
    <div class="meta-block"><strong>Stack principal</strong><span>${p.stack.slice(0,2).join(" · ")}</span></div>
  `;

  // Results
  const results = document.getElementById("modal-results");
  results.innerHTML = p.results.map(r => `<li>${r}</li>`).join("");

  // Stack
  const stack = document.getElementById("modal-stack");
  stack.innerHTML = p.stack.map(s => `<span>${s}</span>`).join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  // Pausa el video si estaba reproduciéndose
  const v = modal.querySelector("video");
  if (v) v.pause();
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// ----- SMOOTH SCROLL para anchors -----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      }
    }
  });
});

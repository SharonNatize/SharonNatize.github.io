// ===========================================
//  SHARON NATIVIDAD · PORTFOLIO
//  script.js · v2 · Peek Carousel mejorado
// ===========================================

document.getElementById('year').textContent = new Date().getFullYear();

// ===== THEME TOGGLE =====
// (la detección inicial corre inline en el <head> para evitar flash)
const themeToggle = document.getElementById('themeToggle');
const htmlEl      = document.documentElement;

themeToggle.addEventListener('click', () => {
    const next = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== MENÚ HAMBURGUESA =====
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    const spans  = navToggle.querySelectorAll('span');
    if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
});

// ===== ANIMACIONES FADE-IN =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
});

// ===== PEEK CAROUSEL =====
const viewport  = document.querySelector('.carousel-viewport');
const track     = document.getElementById('carouselTrack');
const prevBtn   = document.getElementById('carouselPrev');
const nextBtn   = document.getElementById('carouselNext');
const dotBtns   = document.querySelectorAll('#carouselDots .dot');
const cardItems = track.querySelectorAll('.project-card');
let current = 0;

function goTo(index) {
    current = Math.max(0, Math.min(index, cardItems.length - 1));
    const viewW    = viewport.offsetWidth;
    const cardW    = cardItems[0].offsetWidth;
    const cardLeft = cardItems[current].offsetLeft;
    const offset   = (viewW - cardW) / 2 - cardLeft;
    track.style.transform = `translateX(${offset}px)`;
    cardItems.forEach((c, i) => c.classList.toggle('is-active', i === current));
    dotBtns.forEach((d, i) => d.classList.toggle('active', i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === cardItems.length - 1;
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));
dotBtns.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.index)));

// Clic en card lateral navega; clic en thumb de card activa lo maneja el modal
cardItems.forEach((card, i) => {
    card.addEventListener('click', e => {
        if (i === current && e.target.closest('.card-thumb')) return;
        if (i !== current) goTo(i);
    });
});

// Swipe móvil
let touchStartX = 0;
viewport.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
viewport.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
});

// Navegación con teclado (solo cuando el modal está cerrado)
document.addEventListener('keydown', e => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    if (modalOverlay.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
});

window.addEventListener('resize', () => goTo(current));
goTo(0);

// ===== MODAL DE DEMO =====
const modalOverlay = document.getElementById('demoModal');
const modalVideo   = document.getElementById('modalVideo');
const modalClose   = document.getElementById('modalClose');

document.querySelectorAll('.card-thumb').forEach((thumb, i) => {
    thumb.addEventListener('click', e => {
        if (i !== current) return;
        e.stopPropagation();
        modalVideo.src = thumb.dataset.video;
        modalOverlay.classList.add('open');
        modalVideo.play().catch(() => {});
    });
});

function closeModal() {
    modalOverlay.classList.remove('open');
    modalVideo.pause();
    modalVideo.src = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
});

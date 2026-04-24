// ===========================================
//  SHARON NATIVIDAD · PORTFOLIO
//  script.js
// ===========================================

// ----- Año actual en el footer -----
document.getElementById('year').textContent = new Date().getFullYear();


// ----- Navbar: cambio de estilo al hacer scroll -----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ----- Menú hamburguesa (móvil) -----
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    const spans  = navToggle.querySelectorAll('span');

    if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        navToggle.setAttribute('aria-label', 'Cerrar menú');
    } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        navToggle.setAttribute('aria-label', 'Abrir menú');
    }
});

// Cerrar el menú al hacer clic en un enlace
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => {
            s.style.transform = '';
            s.style.opacity   = '';
        });
        navToggle.setAttribute('aria-label', 'Abrir menú');
    });
});

// Cerrar menú con Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => {
            s.style.transform = '';
            s.style.opacity   = '';
        });
        navToggle.setAttribute('aria-label', 'Abrir menú');
    }
});


// ----- Animaciones de entrada con Intersection Observer -----
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

// Escalonar la entrada de las tarjetas de proyecto
document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
});


// ----- Carousel de proyectos -----
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

cardItems.forEach((card, i) => {
    card.addEventListener('click', () => { if (i !== current) goTo(i); });
});

let touchStartX = 0;
viewport.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
viewport.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
});

window.addEventListener('resize', () => goTo(current));
goTo(0);


// ----- Modal de demo -----
const modalOverlay = document.getElementById('demoModal');
const modalVideo   = document.getElementById('modalVideo');
const modalClose   = document.getElementById('modalClose');

document.querySelectorAll('.card-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        modalVideo.src = thumb.dataset.video;
        modalOverlay.classList.add('open');
        modalVideo.play();
    });
});

function closeModal() {
    modalOverlay.classList.remove('open');
    modalVideo.pause();
    modalVideo.src = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
});


// ----- Smooth scroll para los enlaces de navegación -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
});

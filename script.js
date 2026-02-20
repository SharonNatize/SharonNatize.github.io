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

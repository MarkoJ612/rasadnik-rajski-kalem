document.addEventListener("DOMContentLoaded", () => {

    // ---- HERO SLIDER ----
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentIndex = 0;
        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 3000);
    }

    // ---- SCROLL INDIKATOR ----
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const heroHeight = document.querySelector('.hero')?.offsetHeight || window.innerHeight;
            window.scrollTo({ top: heroHeight, behavior: 'smooth' });
        });
    }

    // ---- HAMBURGER MENI ----
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- LIGHTBOX ----
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentLbIndex = 0;
    const images = [];

    galleryItems.forEach((item, i) => {
        const img = item.querySelector('img');
        if (img) images.push(img.src);
        item.addEventListener('click', () => openLightbox(i));
    });

    function openLightbox(index) {
        currentLbIndex = index;
        lightboxImg.src = images[currentLbIndex];
        updateCounter();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigate(dir) {
        currentLbIndex = (currentLbIndex + dir + images.length) % images.length;
        lightboxImg.style.animation = 'none';
        lightboxImg.offsetHeight;
        lightboxImg.style.animation = '';
        lightboxImg.src = images[currentLbIndex];
        updateCounter();
    }

    function updateCounter() {
        if (lightboxCounter) lightboxCounter.textContent = (currentLbIndex + 1) + ' / ' + images.length;
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'Escape') closeLightbox();
    });

});

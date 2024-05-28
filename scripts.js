// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const hero = document.getElementById('hero');
        const offset = window.pageYOffset;
        hero.style.backgroundPositionY = offset * 0.5 + 'px';
    });

    // Form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for your message!');
    });
});

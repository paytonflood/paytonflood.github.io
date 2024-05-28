document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', () => {
        const hero = document.getElementById('hero');
        const offset = window.pageYOffset;
        hero.style.backgroundPositionY = offset * 0.5 + 'px';
    });
});

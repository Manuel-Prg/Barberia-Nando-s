document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Prevenir el scroll del body cuando el menú está abierto
            document.body.classList.toggle('menu-open');
        });

        // Cerrar el menú al hacer clic en un enlace
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Cerrar el menú al redimensionar la ventana a un tamaño de escritorio
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});
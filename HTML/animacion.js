document.addEventListener('DOMContentLoaded', function () {
    // Configuración del Intersection Observer
    const observerOptions = {
        root: null, // Usa el viewport como área de observación
        rootMargin: '0px',
        threshold: 0.1 // Activa la animación cuando el 10% del elemento es visible
    };

    // Callback para el Intersection Observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Añade la clase 'visible'
                observer.unobserve(entry.target); // Deja de observar el elemento
            }
        });
    };

    // Crear el Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todos los elementos con la clase 'animate-on-scroll'
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});
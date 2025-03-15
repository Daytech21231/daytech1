document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', function () {
        searchWord();
    });

    // Permitir que el botón de búsqueda también funcione con "Enter"
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchWord();
        }
    });

    // Eliminar resaltados cuando el campo de búsqueda esté vacío
    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() === '') {
            clearHighlights();
        }
    });

    function searchWord() {
        const query = searchInput.value.trim(); // Obtener la frase o palabra a buscar
        const elementsToSearch = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li:not(:has(a)), th, td'); // Elementos a buscar (excluyendo <li><a>)
        let found = false;
        let firstMatch = null; // Almacenar la primera coincidencia para desplazarse a ella

        // Limpiar resaltados anteriores
        clearHighlights();

        // Buscar y resaltar las coincidencias
        if (query !== '') {
            const lowerQuery = query.toLowerCase(); // Convertir la consulta a minúsculas

            elementsToSearch.forEach(function (element) {
                const text = element.textContent;
                const lowerText = text.toLowerCase(); // Convertir el texto del elemento a minúsculas

                // Buscar todas las coincidencias de la palabra o frase
                if (lowerText.includes(lowerQuery)) {
                    const regex = new RegExp(`(${query})`, 'gi'); // Expresión regular para buscar coincidencias

                    // Recorrer los nodos hijos del elemento
                    Array.from(element.childNodes).forEach(child => {
                        if (child.nodeType === Node.TEXT_NODE) {
                            // Solo modificar nodos de texto
                            const newText = child.textContent.replace(regex, '<strong style="color: #0077cc;">$1</strong>');
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = newText;

                            // Reemplazar el nodo de texto con el nuevo contenido
                            while (tempDiv.firstChild) {
                                element.insertBefore(tempDiv.firstChild, child);
                            }
                            element.removeChild(child);
                        }
                    });

                    found = true;

                    // Guardar la primera coincidencia para desplazarse a ella
                    if (!firstMatch) {
                        firstMatch = element;
                    }
                }
            });

            if (found) {
                // Desplazar la página hasta la primera coincidencia
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert('No se encontró el término buscado.');
            }
        }
    }

    function clearHighlights() {
        const elementsToClear = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li:not(:has(a)), th, td');
        elementsToClear.forEach(function (element) {
            // Restaurar el contenido original del elemento
            if (element.innerHTML !== element.textContent) {
                element.innerHTML = element.textContent;
            }
        });
    }

    // Redirigir al hacer clic en el título "DAYTECH"
    const navbarTitle = document.querySelector('.navbar h1'); // Selecciona el título "DAYTECH"

    if (navbarTitle) {
        navbarTitle.addEventListener('click', function () {
            window.location.href = 'index.html'; // Redirige a index.html
        });

        // Cambiar el cursor a "pointer" para indicar que es clickeable
        navbarTitle.style.cursor = 'pointer';
    }
});
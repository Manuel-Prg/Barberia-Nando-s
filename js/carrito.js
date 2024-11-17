document.addEventListener('DOMContentLoaded', function() {
    actualizarContadorCarrito();

    // Escuchar cambios en el localStorage
    window.addEventListener('storage', function(e) {
        if (e.key === 'carrito') {
            actualizarContadorCarrito();
        }
    });
});

function actualizarContadorCarrito() {
    const contador = document.querySelector('.carrito-contador');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    contador.textContent = totalItems;
    contador.style.display = totalItems > 0 ? 'inline-block' : 'none';
}
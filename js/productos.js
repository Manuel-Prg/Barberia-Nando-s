document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    function agregarAlCarrito(evento) {
        const boton = evento.target;
        const id = boton.dataset.id;
        const nombre = boton.dataset.nombre;
        const precio = parseFloat(boton.dataset.precio);

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        const productoExistente = carrito.find(item => item.id === id);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ id, nombre, precio, cantidad: 1 });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarIconoCarrito();
        mostrarNotificacion(`${nombre} agregado al carrito`);
    }

    function actualizarIconoCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        
        const iconoCarrito = document.querySelector('.icono-carrito');
        if (iconoCarrito) {
            iconoCarrito.textContent = totalItems;
            iconoCarrito.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    function mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.textContent = mensaje;
        notificacion.className = 'notificacion';
        document.body.appendChild(notificacion);
        setTimeout(() => {
            notificacion.remove();
        }, 3000);
    }

    actualizarIconoCarrito();
});
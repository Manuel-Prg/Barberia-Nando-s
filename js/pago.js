document.addEventListener('DOMContentLoaded', function() {
    const tarjeta = document.querySelector('.tarjeta');
    const numeroTarjeta = document.getElementById('numero-tarjeta');
    const nombreTarjeta = document.getElementById('nombre');
    const fechaExpiracion = document.getElementById('fecha-expiracion');
    const cvv = document.getElementById('cvv');
    const tarjetaAnimada = document.querySelector('.tarjeta-animada');

    const tarjetaNumero = document.querySelector('.tarjeta-numero');
    const tarjetaNombre = document.querySelector('.tarjeta-nombre');
    const tarjetaExpiracion = document.querySelector('.tarjeta-expiracion');
    const tarjetaCvv = document.querySelector('.tarjeta-cvv');
    const tarjetaTipo = document.querySelector('.tarjeta-tipo');

    const metodoPagoInputs = document.querySelectorAll('input[name="metodo-pago"]');
    const formularioTarjeta = document.getElementById('formulario-tarjeta');
    const formularioMercadoPago = document.getElementById('formulario-mercadopago');
    const formularioPayPal = document.getElementById('formulario-paypal');

    metodoPagoInputs.forEach(input => {
        input.addEventListener('change', function() {
            switch(this.value) {
                case 'tarjeta':
                    formularioTarjeta.style.display = 'block';
                    tarjetaAnimada.style.display = 'block';
                    formularioMercadoPago.style.display = 'none';
                    formularioPayPal.style.display = 'none';
                    break;
                case 'mercadopago':
                    formularioTarjeta.style.display = 'none';
                    tarjetaAnimada.style.display = 'none';
                    formularioMercadoPago.style.display = 'block';
                    formularioPayPal.style.display = 'none';
                    break;
                case 'paypal':
                    formularioTarjeta.style.display = 'none';
                    tarjetaAnimada.style.display = 'none';
                    formularioMercadoPago.style.display = 'none';
                    formularioPayPal.style.display = 'block';
                    break;
            }
        });
    });

    const formularioPago = document.querySelector('.formulario-pago');
    const animacionTransaccion = document.getElementById('animacion-transaccion');
    const mensajeTransaccion = document.getElementById('mensaje-transaccion');

    formularioPago.addEventListener('submit', function(e) {
        e.preventDefault();
        const metodoPagoSeleccionado = document.querySelector('input[name="metodo-pago"]:checked').value;
        
        switch(metodoPagoSeleccionado) {
            case 'tarjeta':
                simularTransaccion('Procesando pago con tarjeta...');
                break;
            case 'mercadopago':
                simularTransaccion('Redirigiendo a Mercado Pago...');
                break;
            case 'paypal':
                simularTransaccion('Redirigiendo a PayPal...');
                break;
        }
    });


    function actualizarTarjeta(e) {
        const { id, value } = e.target;
        switch (id) {
            case 'numero-tarjeta':
                tarjetaNumero.textContent = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim() || '•••• •••• •••• ••••';
                detectarTipoTarjeta(value);
                break;
            case 'nombre':
                tarjetaNombre.textContent = value || 'Nombre del Titular';
                break;
            case 'fecha-expiracion':
                tarjetaExpiracion.textContent = value || 'MM/AA';
                break;
            case 'cvv':
                tarjetaCvv.textContent = value || '';
                break;
        }
    }

    function detectarTipoTarjeta(numero) {
        const primerDigito = numero.charAt(0);
        switch (primerDigito) {
            case '4':
                tarjetaTipo.textContent = 'Visa';
                break;
            case '5':
                tarjetaTipo.textContent = 'MasterCard';
                break;
            case '3':
                tarjetaTipo.textContent = 'American Express';
                break;
            default:
                tarjetaTipo.textContent = '';
        }
    }

    function formatearNumeroTarjeta(e) {
        if (e.key !== 'Backspace') {
            const input = e.target;
            const { selectionStart } = input;
            const inputValue = input.value.replace(/\s/g, '');
            
            if (inputValue.length > 0) {
                input.value = inputValue.match(/.{1,4}/g).join(' ');
                input.setSelectionRange(selectionStart, selectionStart);
            }
        }
    }

    function formatearFechaExpiracion(e) {
        if (e.key !== 'Backspace') {
            const input = e.target;
            const { selectionStart } = input;
            const inputValue = input.value.replace('/', '');
            
            if (inputValue.length > 0) {
                input.value = inputValue.match(/.{1,2}/g).join('/');
                input.setSelectionRange(selectionStart, selectionStart);
            }
        }
    }

    numeroTarjeta.addEventListener('input', actualizarTarjeta);
    numeroTarjeta.addEventListener('keyup', formatearNumeroTarjeta);
    nombreTarjeta.addEventListener('input', actualizarTarjeta);
    fechaExpiracion.addEventListener('input', actualizarTarjeta);
    fechaExpiracion.addEventListener('keyup', formatearFechaExpiracion);
    cvv.addEventListener('input', actualizarTarjeta);

    cvv.addEventListener('focus', () => tarjeta.classList.add('is-flipped'));
    cvv.addEventListener('blur', () => tarjeta.classList.remove('is-flipped'));

    formularioPago.addEventListener('submit', function(e) {
        e.preventDefault();
        const metodoPagoSeleccionado = document.querySelector('input[name="metodo-pago"]:checked').value;
        
        switch(metodoPagoSeleccionado) {
            case 'tarjeta':
                simularTransaccion('Procesando pago con tarjeta...');
                break;
            case 'mercadopago':
                simularTransaccion('Redirigiendo a Mercado Pago...');
                break;
            case 'paypal':
                simularTransaccion('Redirigiendo a PayPal...');
                break;
        }
    });

    function simularTransaccion(mensaje) {
        animacionTransaccion.style.display = 'flex';
        mensajeTransaccion.textContent = mensaje;

        const tiempoProceso = Math.random() * 2000 + 2000;

        setTimeout(() => {
            mensajeTransaccion.textContent = 'Transacción exitosa';

            setTimeout(() => {
                animacionTransaccion.style.display = 'none';
                mostrarMensajeExito();
                limpiarFormulario();
                limpiarCarrito();
            }, 1000);
        }, tiempoProceso);
    }
    function mostrarMensajeExito() {
        const mensajeExito = document.createElement('div');
        mensajeExito.textContent = '¡Pago realizado con éxito!';
        mensajeExito.className = 'mensaje-exito';
        document.body.appendChild(mensajeExito);

        setTimeout(() => {
            mensajeExito.remove();
        }, 3000);
    }

    function limpiarFormulario() {
        formularioPago.reset();
        actualizarTarjeta({ target: { id: 'numero-tarjeta', value: '' } });
        actualizarTarjeta({ target: { id: 'nombre', value: '' } });
        actualizarTarjeta({ target: { id: 'fecha-expiracion', value: '' } });
        actualizarTarjeta({ target: { id: 'cvv', value: '' } });
    }

    function limpiarCarrito() {
        localStorage.removeItem('carrito');
        cargarProductos();
    }

    //funcion para cargar los productos
    function cargarProductos() {
        const listaProductos = document.getElementById('lista-productos');
        const subtotalElement = document.getElementById('subtotal');
        const impuestosElement = document.getElementById('impuestos');
        const totalElement = document.getElementById('total');
        
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let subtotal = 0;

        listaProductos.innerHTML = '';
        
        carrito.forEach(item => {
            const li = document.createElement('li');
            const subtotalItem = item.precio * item.cantidad;
            li.innerHTML = `
                <div class="producto-item">
                    <div class="producto-info">
                        <span>${item.nombre} x${item.cantidad}</span>
                        <span>$${subtotalItem.toFixed(2)}</span>
                    </div>
                    <button class="btn-eliminar" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            listaProductos.appendChild(li);
            subtotal += subtotalItem;
        });

        const impuestos = subtotal * 0.10;
        const total = subtotal + impuestos;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        impuestosElement.textContent = `$${impuestos.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;

        // Agregar event listeners a los botones de eliminar
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', eliminarProducto);
        });
    }

    function eliminarProducto(e) {
        const id = e.currentTarget.dataset.id;
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Eliminar el producto del carrito
        carrito = carrito.filter(item => item.id !== id);
        
        // Actualizar localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Recargar los productos
        cargarProductos();
        
        // Mostrar notificación
        mostrarNotificacion('Producto eliminado del carrito');
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

    cargarProductos();
});
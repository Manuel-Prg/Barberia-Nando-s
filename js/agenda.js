document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        select: function(info) {
            document.getElementById('fecha').value = info.startStr;
            llenarHorasDisponibles(info.startStr);
        }
    });
    calendar.render();

    function llenarHorasDisponibles(fecha) {
        var horaSelect = document.getElementById('hora');
        horaSelect.innerHTML = '<option value="">Seleccione una hora</option>';
        
        // Aquí deberías obtener las horas disponibles para la fecha seleccionada
        // Por ahora, usaremos horas fijas como ejemplo
        var horasDisponibles = ['09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00'];
        
        horasDisponibles.forEach(function(hora) {
            var option = document.createElement('option');
            option.value = hora;
            option.textContent = hora;
            horaSelect.appendChild(option);
        });
    }

    document.getElementById('form-cita').addEventListener('submit', function(e) {
        e.preventDefault();
        
        var nombre = document.getElementById('nombre').value;
        var telefono = document.getElementById('telefono').value;
        var email = document.getElementById('email').value;
        var fecha = document.getElementById('fecha').value;
        var hora = document.getElementById('hora').value;
        var servicio = document.getElementById('servicio').value;

        // Aquí deberías enviar los datos a tu servidor para procesar la cita
        // Por ahora, solo mostraremos un alert con la información
        alert('Cita agendada:\nNombre: ' + nombre + '\nTeléfono: ' + telefono + 
              '\nEmail: ' + email + '\nFecha: ' + fecha + '\nHora: ' + hora + 
              '\nServicio: ' + servicio);

        // Limpia el formulario
        this.reset();
        document.getElementById('fecha').value = '';
    });
});
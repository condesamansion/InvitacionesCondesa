document.addEventListener('DOMContentLoaded', function() {
  const generarBtn = document.getElementById('generarBtn');
  const nuevoBtn = document.getElementById('nuevoBtn');
  const fechaInput = document.getElementById('fechaInput');

  // Formatear fecha a dd/mm/aa
  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = String(fecha.getFullYear()).slice(-2);
    return `${dia}/${mes}/${anio}`;
  }

  generarBtn.addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value.trim();
    const vendedor = document.getElementById('vendedor').value.trim();
    const beneficio = document.getElementById('beneficio').value.trim();
    const notas = document.getElementById('notas').value.trim();
    const wpp = document.getElementById('wpp').value.trim();
    const fechaISO = fechaInput.value;

    if (!nombre || !vendedor || !beneficio || !fechaISO || !wpp) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const fechaFormateada = formatearFecha(fechaISO);
    
    // Crear URL sin encoding (los parámetros se codificarán al generar el QR)
    const params = new URLSearchParams();
    params.append('nombre', nombre);
    params.append('vendedor', vendedor);
    params.append('beneficio', beneficio);
    params.append('notas', notas);
    params.append('fecha', fechaFormateada);
    
    const fullURL = `./invitacion.html?${params.toString()}`;

    // Generar QR
    const qrDiv = document.getElementById('qrcode');
    qrDiv.innerHTML = '';
    new QRCode(qrDiv, {
      text: fullURL,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });

    // Mostrar mensaje
    document.getElementById('qrMensaje').textContent = 
      `Esta invitación me la envía ${vendedor}, la cual consta de "${beneficio}" para la noche del ${fechaFormateada}.`;

    // Configurar WhatsApp
    const mensaje = `Hola! Esta es tu invitación especial:\n\n*De:* ${vendedor}\n*Para:* ${nombre}\n*Beneficios:* ${beneficio}\n*Fecha:* ${fechaFormateada}\n\n${fullURL}`;
    const waLink = `https://wa.me/54${wpp}?text=${encodeURIComponent(mensaje)}`;
    
    const linkEl = document.getElementById('waLink');
    linkEl.href = waLink;
    linkEl.style.display = 'inline-block';
  });

  nuevoBtn.addEventListener('click', function() {
    // Limpiar formulario
    document.getElementById('nombre').value = '';
    document.getElementById('vendedor').value = '';
    document.getElementById('beneficio').value = '';
    document.getElementById('notas').value = '';
    document.getElementById('wpp').value = '';
    fechaInput.value = '';

    // Limpiar resultados
    document.getElementById('qrcode').innerHTML = '';
    document.getElementById('qrMensaje').textContent = '';
    document.getElementById('waLink').style.display = 'none';
  });
});

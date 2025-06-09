document.addEventListener("DOMContentLoaded", () => {
  // Formatear fecha a dd/mm/aa al seleccionar
  document.getElementById("fechaInput").addEventListener("change", (e) => {
    const fecha = new Date(e.target.value);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = String(fecha.getFullYear()).slice(-2);
    document.getElementById("fecha").value = `${dia}/${mes}/${anio}`;
  });

  document.getElementById("generarBtn").addEventListener("click", () => {
    const nombre = encodeURIComponent(document.getElementById("nombre").value);
    const vendedor = encodeURIComponent(document.getElementById("vendedor").value);
    const beneficio = encodeURIComponent(document.getElementById("beneficio").value);
    const notas = encodeURIComponent(document.getElementById("notas").value);
    const fecha = encodeURIComponent(document.getElementById("fecha").value);
    const wpp = document.getElementById("wpp").value;

    if (!nombre || !vendedor || !beneficio || !fecha || !wpp) {
      alert("Completá todos los campos obligatorios: nombre, entregado por, beneficios, fecha y WhatsApp.");
      return;
    }

    const base = "./invitacion.html";
    const fullURL = `${base}?nombre=${nombre}&vendedor=${vendedor}&beneficio=${beneficio}&notas=${notas}&fecha=${fecha}`;

    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = "";
    new QRCode(qrDiv, fullURL);

    document.getElementById("qrMensaje").textContent = 
      `Esta invitación me la envía ${vendedor}, la cual consta de "${beneficio}" para la noche del ${fecha}.`;

    const mensaje = `Hola! Esta es tu invitación para el bar 🍸\n\n*De:* ${vendedor}\n*Beneficio:* ${beneficio}\n*Fecha:* ${fecha}\n\n${fullURL}`;
    const waLink = `https://wa.me/54${wpp}?text=${encodeURIComponent(mensaje)}`;

    const linkEl = document.getElementById("waLink");
    linkEl.href = waLink;
    linkEl.textContent = "Enviar invitación por WhatsApp ➜";
    linkEl.style.display = "inline-block";
  });

  // Botón "Nuevo QR" (sin cambios)
  document.getElementById("nuevoBtn").addEventListener("click", () => {
    document.getElementById("nombre").value = "";
    document.getElementById("vendedor").value = "";
    document.getElementById("beneficio").value = "";
    document.getElementById("notas").value = "";
    document.getElementById("fechaInput").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("wpp").value = "";

    document.getElementById("qrcode").innerHTML = "";
    document.getElementById("qrMensaje").textContent = "";
    const linkEl = document.getElementById("waLink");
    linkEl.href = "#";
    linkEl.textContent = "";
    linkEl.style.display = "none";
  });
});

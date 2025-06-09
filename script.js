document.getElementById("generarBtn").addEventListener("click", () => {
  const nombre = encodeURIComponent(document.getElementById("nombre").value);
  const entregado = encodeURIComponent(document.getElementById("entregado").value);
  const beneficio = encodeURIComponent(document.getElementById("beneficio").value);
  const notas = encodeURIComponent(document.getElementById("notas").value);
  const fechaInput = document.getElementById("fecha").value;
  const wpp = document.getElementById("wpp").value;

  if (!nombre || !entregado || !beneficio || !wpp || !fechaInput) {
    alert("Por favor, completá todos los campos requeridos.");
    return;
  }

  // Formatear fecha como dd/mm/aa
  const fechaObj = new Date(fechaInput);
  const dd = String(fechaObj.getDate()).padStart(2, '0');
  const mm = String(fechaObj.getMonth() + 1).padStart(2, '0');
  const aa = String(fechaObj.getFullYear()).slice(-2);
  const fechaFormateada = `${dd}/${mm}/${aa}`;
  const fecha = encodeURIComponent(fechaFormateada);

  const base = "https://condesamansion.github.io/InvitacionesCondesa/invitacion.html";
  const fullURL = `${base}?nombre=${nombre}&beneficio=${beneficio}&notas=${notas}&fecha=${fecha}&entregado=${entregado}`;

  // Generar QR
  const qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = "";
  new QRCode(qrDiv, fullURL);

  // Mensaje visible bajo el QR
  const resumen = `Esta invitación me la envía ${decodeURIComponent(entregado)}, la cual consta de ${decodeURIComponent(beneficio)} para la noche del ${fechaFormateada}.`;
  document.getElementById("mensajeResumen").textContent = resumen;

  // WhatsApp
  const mensaje = `Hola! Esta es tu invitación para Condesa 👑\n${fullURL}`;
  const waLink = `https://wa.me/54${wpp}?text=${encodeURIComponent(mensaje)}`;

  const linkEl = document.getElementById("waLink");
  linkEl.href = waLink;
  linkEl.textContent = "Enviar invitación por WhatsApp ➜";
  linkEl.style.display = "inline-block";
});

document.getElementById("nuevoBtn").addEventListener("click", () => {
  document.getElementById("nombre").value = "";
  document.getElementById("entregado").value = "";
  document.getElementById("beneficio").value = "";
  document.getElementById("notas").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("wpp").value = "";

  document.getElementById("qrcode").innerHTML = "";
  document.getElementById("mensajeResumen").textContent = "";
  const linkEl = document.getElementById("waLink");
  linkEl.href = "#";
  linkEl.textContent = "";
  linkEl.style.display = "none";
});

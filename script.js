document.getElementById("generarBtn").addEventListener("click", () => {
  const nombre = encodeURIComponent(document.getElementById("nombre").value);
  const beneficio = encodeURIComponent(document.getElementById("beneficio").value);
  const notas = encodeURIComponent(document.getElementById("notas").value);
  const fecha = encodeURIComponent(document.getElementById("fecha").value);
  const wpp = document.getElementById("wpp").value;

  if (!nombre || !beneficio || !wpp || !fecha) {
    alert("Por favor, completá nombre, beneficios, fecha y número de WhatsApp.");
    return;
  }

  // URL en GitHub Pages (reemplazá con tu URL real)
  const base = "https://tuusuario.github.io/tu-repositorio/invitacion.html";
  const fullURL = `${base}?nombre=${nombre}&beneficio=${beneficio}&notas=${notas}&fecha=${fecha}`;

  // Generar QR
  const qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = "";
  new QRCode(qrDiv, fullURL);

  // Enlace de WhatsApp
  const mensaje = `Hola! Esta es tu invitación para Condesa 👑\n${fullURL}`;
  const waLink = `https://wa.me/54${wpp}?text=${encodeURIComponent(mensaje)}`;

  const linkEl = document.getElementById("waLink");
  linkEl.href = waLink;
  linkEl.textContent = "Enviar invitación por WhatsApp ➜";
  linkEl.style.display = "inline-block";
});

document.getElementById("nuevoBtn").addEventListener("click", () => {
  document.getElementById("nombre").value = "";
  document.getElementById("beneficio").value = "";
  document.getElementById("notas").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("wpp").value = "";

  document.getElementById("qrcode").innerHTML = "";
  const linkEl = document.getElementById("waLink");
  linkEl.href = "#";
  linkEl.textContent = "";
  linkEl.style.display = "none";
});

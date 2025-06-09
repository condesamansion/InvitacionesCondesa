const formulario = document.getElementById("formulario");
const qrContainer = document.getElementById("qrContainer");
const qrCodeDiv = document.getElementById("qrcode");
const mensajeQR = document.getElementById("mensajeQR");
const descargarQR = document.getElementById("descargarQR");
const resetBtn = document.getElementById("resetBtn");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const entregadoPor = document.getElementById("entregadoPor").value.trim();
  const beneficios = document.getElementById("beneficios").value.trim();
  const notas = document.getElementById("notas").value.trim();
  const fecha = document.getElementById("fecha").value;

  if (!nombre || !entregadoPor || !beneficios || !fecha) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  // Codificamos los datos como parámetros de URL
  const params = new URLSearchParams({
    nombre,
    entregadoPor,
    beneficios,
    notas,
    fecha,
  });

  const urlBase = `${window.location.origin}${window.location.pathname.replace("index.html", "")}`;
  const invitacionURL = `${urlBase}invitacion.html?${params.toString()}`;

  // Limpiar QR anterior
  qrCodeDiv.innerHTML = "";

  // Crear nuevo QR
  new QRCode(qrCodeDiv, {
    text: invitacionURL,
    width: 200,
    height: 200,
  });

  mensajeQR.textContent = `Esta invitación me la envía ${entregadoPor}, la cual consta de "${beneficios}" para la noche del ${fecha.split("-").reverse().join("/")}.`;

  setTimeout(() => {
    const qrCanvas = qrCodeDiv.querySelector("canvas");
    const qrDataUrl = qrCanvas.toDataURL("image/png");
    descargarQR.href = qrDataUrl;
    qrContainer.style.display = "block";
  }, 500);
});

resetBtn.addEventListener("click", () => {
  formulario.reset();
  qrContainer.style.display = "none";
  qrCodeDiv.innerHTML = "";
  mensajeQR.textContent = "";
});

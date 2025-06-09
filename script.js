document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const qrContainer = document.getElementById("qrContainer");
  const qrCodeDiv = document.getElementById("qrcode");
  const mensajeQR = document.getElementById("mensajeQR");
  const descargarQR = document.getElementById("descargarQR");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const resetBtn = document.getElementById("resetBtn");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const entregadoPor = document.getElementById("entregadoPor").value.trim();
    const beneficios = document.getElementById("beneficios").value.trim();
    const notas = document.getElementById("notas").value.trim();
    const fecha = document.getElementById("fecha").value;
    const telefono = document.getElementById("telefono").value.trim();

    if (!nombre || !entregadoPor || !beneficios || !fecha || !telefono) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const params = new URLSearchParams({
      nombre,
      entregadoPor,
      beneficios,
      notas,
      fecha,
    });

    const baseUrl = `${window.location.origin}${window.location.pathname.replace("index.html", "")}`;
    const invitacionURL = `${baseUrl}invitacion.html?${params.toString()}`;

    qrCodeDiv.innerHTML = "";
    new QRCode(qrCodeDiv, {
      text: invitacionURL,
      width: 200,
      height: 200,
    });

    const fechaFormateada = fecha.split("-").reverse().join("/");
    mensajeQR.textContent = `Esta invitación me la envía ${entregadoPor}, la cual consta de "${beneficios}" para la noche del ${fechaFormateada}.`;

    setTimeout(() => {
      const canvas = qrCodeDiv.querySelector("canvas");
      if (canvas) {
        const blob = dataURLtoBlob(canvas.toDataURL("image/png"));
        const qrURL = URL.createObjectURL(blob);

        // Asignar descarga
        descargarQR.href = qrURL;

        // Mensaje con link temporal al QR
        const mensajeWpp = `Hola! Esta es tu invitación para Condesa 👑\n\nConsta de "${beneficios}" para la noche del ${fechaFormateada}.\n\nDescargá tu QR desde aquí y mostralo en puerta:\n${qrURL}`;

        whatsappBtn.href = `https://wa.me/54${telefono}?text=${encodeURIComponent(mensajeWpp)}`;
        qrContainer.style.display = "block";
      }
    }, 500);
  });

  resetBtn.addEventListener("click", () => {
    formulario.reset();
    qrContainer.style.display = "none";
    qrCodeDiv.innerHTML = "";
    mensajeQR.textContent = "";
  });

  // Función para convertir base64 a Blob
  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const qrContainer = document.getElementById("qrContainer");
  const canvasFinal = document.getElementById("canvasFinal");
  const descargarQR = document.getElementById("descargarQR");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const resetBtn = document.getElementById("resetBtn");

  formulario.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const entregadoPor = document.getElementById("entregadoPor").value.trim();
    const beneficios = document.getElementById("beneficios").value.trim();
    const notas = document.getElementById("notas").value.trim();
    const fecha = document.getElementById("fecha").value;
    const telefono = document.getElementById("telefono").value.trim();

    if (!nombre || !entregadoPor || !beneficios || !fecha || !telefono) {
      alert("Por favor, completá todos los campos obligatorios.");
      return;
    }

    const params = new URLSearchParams({
      nombre,
      entregadoPor,
      beneficios,
      notas,
      fecha
    });

    const baseUrl = `${window.location.origin}${window.location.pathname.replace("index.html", "")}`;
    const urlQR = `${baseUrl}invitacion.html?${params.toString()}`;

    // Crear QR en canvas oculto
    const qrTempDiv = document.createElement("div");
    const qr = new QRCode(qrTempDiv, {
      text: urlQR,
      width: 596,
      height: 596,
      correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(async () => {
      const qrCanvas = qrTempDiv.querySelector("canvas");
      const qrImage = new Image();
      qrImage.src = qrCanvas.toDataURL("image/jpg");

      qrImage.onload = async () => {
        const ctx = canvasFinal.getContext("2d");

        const fondo = new Image();
        fondo.src = "img/fondo.jpg";

        fondo.onload = async () => {
          ctx.clearRect(0, 0, canvasFinal.width, canvasFinal.height);
          ctx.drawImage(fondo, 0, 0, 899, 1274);

          ctx.font = "900 50px Montserrat";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText(nombre.toUpperCase(), 899 / 2, 532);

          ctx.drawImage(qrImage, 151, 582, 596, 596);

          const dataUrl = canvasFinal.toDataURL("image/jpg");
          const blob = dataURLtoBlob(dataUrl);
          const tempUrl = URL.createObjectURL(blob);
          descargarQR.href = tempUrl;

          // Subir a Imgur
          const imgurLink = await subirAImgur(dataUrl);
          if (!imgurLink) {
            alert("No se pudo subir la imagen a Imgur.");
            return;
          }

          const fechaFormateada = fecha.split("-").reverse().join("/");
          const mensaje = `Hola! Esta es tu invitación para Condesa 👑\n\nConsta de "${beneficios}" para la noche del ${fechaFormateada}.\n\nDescargá tu QR desde aquí y mostralo en puerta:\n${imgurLink}\n\n⚠️ Importante: descargá el QR antes de las 24 hs. El QR desaparecerá!`;

          whatsappBtn.href = `https://wa.me/54${telefono}?text=${encodeURIComponent(mensaje)}`;
          qrContainer.style.display = "block";
        };
      };
    }, 500);
  });

  resetBtn.addEventListener("click", () => {
    formulario.reset();
    qrContainer.style.display = "none";
    const ctx = canvasFinal.getContext("2d");
    ctx.clearRect(0, 0, canvasFinal.width, canvasFinal.height);
  });

  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  }

  async function subirAImgur(base64Image) {
    const clientId = "4b1a3546c844fbd"; // Reemplazar por tu Client ID
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${clientId}`,
        Accept: "application/json"
      },
      body: new URLSearchParams({
        image: base64Image.split(",")[1],
        type: "base64"
      })
    });

    const data = await response.json();
    return data.success ? data.data.link : null;
  }
});

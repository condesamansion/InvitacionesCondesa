document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const qrContainer = document.getElementById("qrContainer");
  const qrCodeDiv = document.getElementById("qrcode");
  const mensajeQR = document.getElementById("mensajeQR");
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
    const qr = new QRCode(qrCodeDiv, {
      text: invitacionURL,
      width: 200,
      height: 200,
    });

    const fechaFormateada = fecha.split("-").reverse().join("/");
    mensajeQR.textContent = `Esta invitación me la envía ${entregadoPor}, la cual consta de "${beneficios}" para la noche del ${fechaFormateada}.`;

    setTimeout(async () => {
      const canvas = qrCodeDiv.querySelector("canvas");
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/png");

        // Subir a Imgur
        const imgurLink = await subirAImgur(dataUrl);
        if (!imgurLink) {
          alert("No se pudo subir el QR a Imgur.");
          return;
        }

        // Descargar directamente
        const blob = dataURLtoBlob(dataUrl);
        const tempUrl = URL.createObjectURL(blob);
        descargarQR.href = tempUrl;

        // Mensaje de WhatsApp
        const mensajeWpp = `Hola! Esta es tu invitación para Condesa 👑\n\nConsta de "${beneficios}" para la noche del ${fechaFormateada}.\n\nDescargá tu QR desde aquí y mostralo en puerta:\n${imgurLink}\n\n⚠️ Importante: descargá el QR antes de las 24 hs. El QR desaparecerá!`;

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
    const clientId = "4b1a3546c844fbd"; // 👈 REEMPLAZAR
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

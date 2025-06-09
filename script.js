document.getElementById("generarBtn").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const beneficio = document.getElementById("beneficio").value.trim();
  const notas = document.getElementById("notas").value.trim();
  const fechaInput = document.getElementById("fecha").value;
  const entregado = document.getElementById("entregado").value.trim();

  if (!nombre || !beneficio || !fechaInput || !entregado) {
    alert("Por favor, completá todos los campos obligatorios.");
    return;
  }

  const [yyyy, mm, dd] = fechaInput.split("-");
  const fecha = `${dd}/${mm}/${yyyy.slice(2)}`; // formato dd/mm/aa

  const mensajeQR = `🎫 INVITACIÓN CONDESA\n\n📛 Nombre: ${nombre}\n🎁 Beneficio: ${beneficio}\n📅 Fecha: ${fecha}\n📝 Notas: ${notas}\n👤 Entregado por: ${entregado}`;

  // Limpiar QR anterior
  const qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = "";

  const qr = new QRCode(qrDiv, {
    text: mensajeQR,
    width: 256,
    height: 256,
  });

  // Mostrar descripción debajo del QR
  document.getElementById("descripcionQR").textContent = `Esta invitación me la envía ${entregado}, la cual consta de ${beneficio} para la noche del ${fecha}.`;

  // Esperar a que el QR esté generado para convertirlo en imagen
  setTimeout(() => {
    const qrImg = qrDiv.querySelector("img") || qrDiv.querySelector("canvas");
    if (qrImg) {
      const dataURL = qrImg.toDataURL ? qrImg.toDataURL("image/png") : qrImg.src;
      const link = document.getElementById("descargarQR");
      link.href = dataURL;
      link.style.display = "inline-block";
    }
  }, 500);
});

document.getElementById("nuevoBtn").addEventListener("click", () => {
  document.getElementById("nombre").value = "";
  document.getElementById("beneficio").value = "";
  document.getElementById("notas").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("entregado").value = "";

  document.getElementById("qrcode").innerHTML = "";
  document.getElementById("descripcionQR").textContent = "";
  const link = document.getElementById("descargarQR");
  link.href = "#";
  link.style.display = "none";
});

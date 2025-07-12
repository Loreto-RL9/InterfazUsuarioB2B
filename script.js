const sheetURL = "https://script.google.com/macros/s/AKfycby1ari_smtWC9u1_eenxu3Swx3o81RPYYpC99V4aVxaJgjAdrg_gYoMeMPfh3_d_JOnrA/exec";

function guardarNombre() {
  const nombre = document.getElementById("nombreComprador").value.trim();
  if (nombre) {
    localStorage.setItem("comprador", nombre);
    document.getElementById("pantallaInicial").style.display = "none";
    document.getElementById("formulario").style.display = "block";
  } else {
    alert("Por favor, escribe tu nombre.");
  }
}

function enviarDatos() {
  const nombre = localStorage.getItem("comprador");
  const disponibilidad = document.getElementById("disponibilidad").value;

  // checkboxes marcados
  const requerimientos = Array.from(
    document.querySelectorAll('#requerimientos input[type="checkbox"]:checked')
  ).map(opt => opt.value).join(", ");

  if (!nombre) {
    alert("Error: comprador no identificado.");
    return;
  }

  fetch(sheetURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      nombre: nombre,
      disponibilidad: disponibilidad,
      requerimientos: requerimientos
    })
  })
  .then(res => res.text())
  .then(msg => {
    document.getElementById("mensaje").textContent = msg.includes("success")
      ? "Actualización exitosa."
      : "No se encontró el comprador.";
  })
  .catch(err => {
    document.getElementById("mensaje").textContent = "Error al actualizar.";
    console.error(err);
  });
}

window.onload = () => {
  const comprador = localStorage.getItem("comprador");
  if (comprador) {
    document.getElementById("pantallaInicial").style.display = "none";
    document.getElementById("formulario").style.display = "block";
  }
};

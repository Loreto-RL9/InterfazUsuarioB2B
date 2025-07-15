let nombre = localStorage.getItem("comprador");

if (!nombre) {
  document.getElementById("modalNombre").style.display = "flex";
} else {
  document.getElementById("formularioCard").style.display = "block";
}

function guardarNombre() {
  const input = document.getElementById("inputNombre").value.trim();
  if (input) {
    localStorage.setItem("comprador", input);
    nombre = input;
    document.getElementById("modalNombre").style.display = "none";
    document.getElementById("formularioCard").style.display = "block";
  }
}

function enviar() {
  const disponibilidad = document.getElementById("disponibilidad").value;
  const requerimientos = Array.from(
    document.querySelectorAll('#requerimientos input[type="checkbox"]:checked')
  ).map(opt => opt.value);

  fetch('https://qqegzhoxhzsgcqiulqul.supabase.co/rest/v1/Estado', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'tu_anon_key_aqui',
      'Authorization': 'Bearer tu_anon_key_aqui',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify([{
      Compradores: nombre,
      Disponibilidad: disponibilidad,
      Requerimientos: requerimientos
    }])
  })
  .then(res => {
    const msg = document.getElementById("mensaje");
    if (res.ok) {
      msg.textContent = "Actualizado correctamente";
      msg.style.color = "green";
    } else {
      msg.textContent = "Error al actualizar";
      msg.style.color = "red";
    }
    setTimeout(() => msg.textContent = "", 5000);
  })
  .catch(() => {
    const msg = document.getElementById("mensaje");
    msg.textContent = "Error al conectar";
    msg.style.color = "red";
    setTimeout(() => msg.textContent = "", 5000);
  });
}

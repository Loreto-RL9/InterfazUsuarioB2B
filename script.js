const API_URL = "https://qqegzhoxhzsgcqiulqul.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZWd6aG94aHpzZ2NxaXVscXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MzA0ODUsImV4cCI6MjA2ODEwNjQ4NX0.iAFhr3QoYJDkP1_iXGSsDZAd_f00RxuFK0HCdvo7ryE"; // ⚠️ ocultar en producción

let nombreGlobal = "";

function confirmarNombre() {
  const inputNombre = document.getElementById("nombreComprador");
  const nombre = inputNombre.value.trim();

  if (!nombre) {
    alert("Por favor ingresa tu nombre.");
    return;
  }

  nombreGlobal = nombre;

  document.getElementById("nombreMostrado").innerText = nombre;
  document.getElementById("moduloIdentidad").classList.add("oculto");
  document.getElementById("formularioModulo").classList.remove("oculto");
}

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const disponibilidad = document.getElementById("disponibilidad").value;

  const requerimientos = Array.from(document.querySelectorAll(".checkbox-group input[type=checkbox]:checked"))
    .map(input => input.value);

  if (!nombreGlobal) {
    alert("Nombre no definido. Vuelve a ingresar.");
    return;
  }

  console.log("Nombre:", nombreGlobal);
  console.log("Disponibilidad:", disponibilidad);
  console.log("Requerimientos:", requerimientos);

  try {
    const res = await fetch(`${API_URL}/rest/v1/Estado`, {
      method: "PATCH",
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        "x-client-info": "valion-frontend",
        comprador: nombreGlobal // importante para política RLS
      },
      body: JSON.stringify({
        Disponibilidad: disponibilidad,
        Requerimientos: requerimientos // Enviar como arreglo, no como string
      })
    });

    const mensaje = document.getElementById("mensajeConfirmacion");

    if (res.ok) {
      mensaje.innerText = "Actualizado correctamente.";
      mensaje.style.color = "green";
    } else {
      const errorText = await res.text();
      console.error("Error al actualizar:", errorText);
      mensaje.innerText = "Error al actualizar. Verifica el nombre.";
      mensaje.style.color = "red";
    }

    setTimeout(() => {
      mensaje.innerText = "";
    }, 5000);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("mensajeConfirmacion").innerText = "Error en la actualización.";
  }
});

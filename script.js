const API_URL = "https://qqegzhoxhzsgcqiulqul.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZWd6aG94aHpzZ2NxaXVscXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MzA0ODUsImV4cCI6MjA2ODEwNjQ4NX0.iAFhr3QoYJDkP1_iXGSsDZAd_f00RxuFK0HCdvo7ryE"; // Reemplaza con tu clave real

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const comprador = document.getElementById("nombreComprador").value.trim();
  const disponibilidad = document.getElementById("disponibilidad").value;

  const requerimientos = Array.from(document.querySelectorAll(".checkbox-group input[type=checkbox]:checked"))
    .map(input => input.value);

  if (!comprador) {
    alert("Por favor ingresa tu nombre asignado.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/rest/v1/Estado?Compradores=eq.${comprador}`, {
      method: "PATCH",
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        Disponibilidad: disponibilidad,
        Requerimientos: requerimientos.join(", ")
      })
    });

    const mensaje = document.getElementById("mensajeConfirmacion");

    if (res.ok) {
      mensaje.innerText = "Actualizado correctamente.";
      mensaje.style.color = "green";
    } else {
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

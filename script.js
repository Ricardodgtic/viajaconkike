// Número de WhatsApp de ejemplo: reemplazalo por el número real de la agencia.
// Formato internacional, solo números y código de país. Argentina: 549 + característica + número.
const WHATSAPP_NUMBER = "549XXXXXXXXXX";

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-destination]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("destination").value = button.dataset.destination;
    document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
    document.getElementById("name").focus({ preventScroll: true });
  });
});

document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const destination = String(form.get("destination") || "").trim();
  const date = String(form.get("date") || "").trim();
  const travelers = String(form.get("travelers") || "").trim();
  const details = String(form.get("details") || "").trim();

  const message = [
    "¡Hola! Quisiera consultar por un viaje.",
    `Nombre: ${name}`,
    `Destino: ${destination}`,
    `Fecha aproximada: ${date || "A definir"}`,
    `Viajeros: ${travelers}`,
    `Detalles: ${details || "Sin detalles adicionales"}`
  ].join("\\n");

  if (WHATSAPP_NUMBER.includes("X")) {
    const status = document.getElementById("form-status");
    status.textContent = "¡Formulario validado! Para activar WhatsApp, editá script.js y reemplazá 549XXXXXXXXXX por el número real de la agencia. Mientras tanto, podés copiar este mensaje:";
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "text-button";
    copyButton.textContent = "Copiar mensaje";
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(message);
        copyButton.textContent = "Mensaje copiado ✓";
      } catch {
        window.prompt("Copiá tu mensaje:", message);
      }
    });
    status.appendChild(document.createElement("br"));
    status.appendChild(copyButton);
    return;
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

import { clientService } from "../service/client-service.js";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = form.querySelector("[data-nombre]").value;
    const email = form.querySelector("[data-email]").value;

    clientService.crearCliente(nombre, email)
        .then(() => {
            window.location.href = "registro_completado.html";
        })
        .catch((error) => {
            console.error("Error al registrar:", error);
            alert("Error al registrar el cliente: " + error.message);
        });
});

import { petService } from "../service/pet-service.js";

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const tipo = document.querySelector("[data-tipo]").value;
    const raza = document.querySelector("[data-raza]").value;
    const edad = document.querySelector("[data-edad]").value;
    const dueno = document.querySelector("[data-dueno]").value;
    petService.crearMascota(nombre, tipo, raza, edad, dueno).then((respuesta) => {
        console.log("mascota creada", respuesta);
        window.location.href = "./registro_completado_mascota.html";
    }).catch((error) => {
        console.log("error", error);
        alert("Error al registrar la mascota: " + error.message);
    });
});

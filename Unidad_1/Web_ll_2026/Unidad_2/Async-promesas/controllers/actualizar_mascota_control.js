import { petService } from "../service/pet-service.js";

const formulario = document.querySelector("[data-form]");

const obInfo = async () => {
    const url = new URL(window.location);
    const id = (url.searchParams.get("id"))
    if (id == null) {
        window.location.href = "./error.html"
    }
    const nombre = document.querySelector("[data-nombre]")
    const tipo = document.querySelector("[data-tipo]")
    const raza = document.querySelector("[data-raza]")
    const edad = document.querySelector("[data-edad]")
    const dueno = document.querySelector("[data-dueno]")
    try {
        const mascota = await petService.obtenerMascota(id);
        if (mascota.nombre && mascota.tipo && mascota.raza) {
            nombre.value = mascota.nombre;
            tipo.value = mascota.tipo;
            raza.value = mascota.raza;
            edad.value = mascota.edad;
            dueno.value = mascota.dueno;
        } else {
            throw new Error();
        }
    } catch (error) {
        window.location.href = "./error.html"
    }
};
obInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector("[data-nombre]").value;
    const tipo = document.querySelector("[data-tipo]").value;
    const raza = document.querySelector("[data-raza]").value;
    const edad = document.querySelector("[data-edad]").value;
    const dueno = document.querySelector("[data-dueno]").value;
    petService.actualizarMascota(nombre, tipo, raza, edad, dueno, id).then(() => {
        window.location.href = "./lista_mascota.html";
    });
})

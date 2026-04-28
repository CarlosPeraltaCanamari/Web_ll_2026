import { clientService } from "../service/client-service.js";
const formulario = document.querySelector("[data-form]");
const obInfo = async () => {
    const url = new URL(window.location);
    const id = (url.searchParams.get("id"))
    if (id == null) {
        window.location.href = "./error.html"
    }
    const nombre = document.querySelector("[data-nombre]")
    const apellido = document.querySelector("[data-apellido]")
    const email = document.querySelector("[data-email]")
    try {
        const perfil = await clientService.cliente(id);
        if (perfil.nombre && perfil.apellido && perfil.email) {
            nombre.value = perfil.nombre;
            apellido.value = perfil.apellido;
            email.value = perfil.email;
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
    const apellido = document.querySelector("[data-apellido]").value;
    const email = document.querySelector("[data-email]").value;
    clientService.actualizarCliente(nombre, apellido, email, id).then(() => {
        window.location.href = "./lista_cliente.html";
    });
})
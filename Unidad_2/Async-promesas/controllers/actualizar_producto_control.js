import { productService } from "../service/product-service.js";

const formulario = document.querySelector("[data-form]");

const obInfo = async () => {
    const url = new URL(window.location);
    const id = (url.searchParams.get("id"))
    if (id == null) {
        window.location.href = "./error.html"
    }
    const nombre = document.querySelector("[data-nombre]")
    const precio = document.querySelector("[data-precio]")
    const description = document.querySelector("[data-description]")
    try {
        const producto = await productService.obtenerProducto(id);
        if (producto.nombre && producto.precio && producto.description) {
            nombre.value = producto.nombre;
            precio.value = producto.precio;
            description.value = producto.description;
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
    const precio = document.querySelector("[data-precio]").value;
    const description = document.querySelector("[data-description]").value;
    productService.actualizarProducto(nombre, precio, description, id).then(() => {
        window.location.href = "./lista_producto.html";
    });
})

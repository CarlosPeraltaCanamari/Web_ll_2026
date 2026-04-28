import { productService } from "../service/product-service.js";

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const description = document.querySelector("[data-description]").value;
    productService.crearProducto(nombre, precio, description).then((respuesta) => {
        console.log("producto creado", respuesta);
        window.location.href = "./registro_completado_producto.html";
    }).catch((error) => {
        console.log("error", error);
    });
});

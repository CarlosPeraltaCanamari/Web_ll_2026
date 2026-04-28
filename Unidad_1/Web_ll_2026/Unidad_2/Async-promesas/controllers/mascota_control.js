import { petService } from "../service/pet-service.js";

const crearfila = (nombre, tipo, raza, edad, dueno, id) => {
    const fila = document.createElement('tr');
    const contenido = `
    <td class="td" data-td>
        ${nombre}
    </td>
    <td>${tipo}</td>
    <td>${raza}</td>
    <td>${edad}</td>
    <td>${dueno}</td>
    <td>
        <ul class="table__button-control">
        <li>
            <a
            href="../screens/editar_mascota.html?id=${id}"
            class="simple-button simple-button--edit"
            >
            Editar
            </a>
        </li>
        <li>
            <button class="simple-button simple-button--delete" type="button" id="${id}">
            Eliminar
            </button>
        </li>
        </ul>
    </td>
    `;
    fila.innerHTML = contenido;

    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        const id = btn.id;
        petService.eliminarMascota(id).then(respuesta => {
            alert("Mascota eliminada");
            window.location.reload();
        }).catch(error => alert("Error al eliminar mascota"));
    })
    return fila;
}

const table = document.querySelector("[data-table]");
petService
    .listarMascotas()
    .then((data) => {
        data.forEach(({ nombre, tipo, raza, edad, dueno, id }) => {
            const nuevaFila = crearfila(nombre, tipo, raza, edad, dueno, id)
            table.appendChild(nuevaFila)
        });
    }).catch((error) => alert("Error cargando mascotas"));

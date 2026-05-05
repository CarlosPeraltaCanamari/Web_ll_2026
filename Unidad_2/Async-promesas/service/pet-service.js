// Servicio para mascotas - Async/Promesas con Fetch

//---Con json-server (localhost:3000)---//
/*
const listarMascotas = () => fetch("http://localhost:3000/mascotas").then((respuesta) => respuesta.json());

const crearMascota = (nombre, tipo, raza, edad, dueno) => {
    return fetch("http://localhost:3000/mascotas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, tipo, raza, edad, dueno, id: uuid.v4() })
    }).then(respuesta => respuesta.json());
};

const actualizarMascota = (nombre, tipo, raza, edad, dueno, id) => {
    return fetch(`http://localhost:3000/mascotas/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ nombre, tipo, raza, edad, dueno })
        })
        .then(respuesta => respuesta.json()).catch((err) => console.log(err));
}

const eliminarMascota = (id) => {
    console.log("eliminar mascota", id);
    return fetch(`http://localhost:3000/mascotas/${id}`,
        {
            method: "DELETE"
        }).then(respuesta => respuesta.json());
};

const obtenerMascota = (id) => {
    return fetch(`http://localhost:3000/mascotas/${id}`).then((respuesta) => respuesta.json());
}
*/

//---Con Express (localhost:3000)---//
const BASE_URL = "http://localhost:3000/mascotas";

const request = async (url, option = {}) => {
    const res = await fetch(url, option);
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const mensaje = data?.mensaje ?? data?.error ?? text ?? 'Error';
        throw new Error(mensaje);
    }
    return data;
}

//GET - Listar todas
const listarMascotas = async () => {
    try {
        const data = await request(BASE_URL);
        console.log(`Se listaron ${data.length} mascotas`);
        return data;
    } catch (error) {
        console.error("Error al listar mascotas:", error.message);
        throw error;
    }
}

//GET por id
const obtenerMascota = async (id) => {
    if (!id) {
        console.error("No se proporcionó un ID para buscar la mascota");
        throw new Error("ID de la mascota es requerido");
    }
    try {
        const data = await request(`${BASE_URL}/${id}`);
        console.log(`Mascota encontrada: ${data.nombre}`);
        return data;
    } catch (error) {
        console.error(`Error al obtener mascota con ID ${id}:`, error.message);
        throw error;
    }
}

//POST - Crear
const crearMascota = async (nombre, tipo, raza, edad, dueno) => {
    if (!nombre || nombre.trim() === '') {
        console.error("El nombre es obligatorio para registrar una mascota");
        throw new Error("El nombre es obligatorio");
    }
    if (!tipo || tipo.trim() === '') {
        console.error("El tipo es obligatorio para registrar una mascota");
        throw new Error("El tipo es obligatorio");
    }
    try {
        const data = await request(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, tipo, raza, edad, dueno, id: uuid.v4() })
        });
        console.log(`Mascota registrada exitosamente: ${nombre}`);
        return data;
    } catch (error) {
        console.error(`No se pudo registrar la mascota "${nombre}":`, error.message);
        throw error;
    }
}

//PUT - Actualizar
const actualizarMascota = async (nombre, tipo, raza, edad, dueno, id) => {
    if (!id) {
        console.error("No se proporcionó un ID para actualizar");
        throw new Error("ID de la mascota es requerido para actualizar");
    }
    if (!nombre || nombre.trim() === '') {
        console.error("El nombre es obligatorio para actualizar");
        throw new Error("El nombre es obligatorio");
    }
    try {
        const data = await request(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, tipo, raza, edad, dueno })
        });
        console.log(`Mascota actualizada exitosamente: ${nombre}`);
        return data;
    } catch (error) {
        console.error(`No se pudo actualizar la mascota con ID ${id}:`, error.message);
        throw error;
    }
}

//DELETE - Eliminar
const eliminarMascota = async (id) => {
    if (!id) {
        console.error("No se proporcionó un ID para eliminar");
        throw new Error("ID de la mascota es requerido para eliminar");
    }
    try {
        const data = await request(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        console.log(`Mascota con ID ${id} eliminada exitosamente`);
        return data;
    } catch (error) {
        console.error(`No se pudo eliminar la mascota con ID ${id}:`, error.message);
        throw error;
    }
}

export const petService = {
    listarMascotas,
    crearMascota,
    actualizarMascota,
    eliminarMascota,
    obtenerMascota
};

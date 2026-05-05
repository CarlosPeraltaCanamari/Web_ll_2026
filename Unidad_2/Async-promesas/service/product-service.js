// Servicio para productos

//---Con json-server (localhost:3000)---//
/*
const listarProductos = () => fetch("http://localhost:3000/productos").then((respuesta) => respuesta.json());

const crearProducto = (nombre, precio, description) => {
    return fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, precio, description, id: uuid.v4() })
    }).then(respuesta => respuesta.json());
};

const actualizarProducto = (nombre, precio, description, id) => {
    return fetch(`http://localhost:3000/productos/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ nombre, precio, description })
        })
        .then(respuesta => respuesta.json()).catch((err) => console.log(err));
}

const eliminarProducto = (id) => {
    console.log("eliminar producto", id);
    return fetch(`http://localhost:3000/productos/${id}`,
        {
            method: "DELETE"
        }).then(respuesta => respuesta.json());
};

const obtenerProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`).then((respuesta) => respuesta.json());
}
*/

//---Con Express (localhost:3000)---//
const BASE_URL = "http://localhost:3000/productos";

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

//GET - Listar todos
const listarProductos = async () => {
    try {
        const data = await request(BASE_URL);
        console.log(`Se listaron ${data.length} productos`);
        return data;
    } catch (error) {
        console.error("Error al listar productos:", error.message);
        throw error;
    }
}

//GET por id
const obtenerProducto = async (id) => {
    if (!id) {
        console.error("No se proporcionó un ID para buscar el producto");
        throw new Error("ID del producto es requerido");
    }
    try {
        const data = await request(`${BASE_URL}/${id}`);
        console.log(`Producto encontrado: ${data.nombre}`);
        return data;
    } catch (error) {
        console.error(`Error al obtener producto con ID ${id}:`, error.message);
        throw error;
    }
}

//POST - Crear
const crearProducto = async (nombre, precio, description) => {
    if (!nombre || nombre.trim() === '') {
        console.error("El nombre es obligatorio para registrar un producto");
        throw new Error("El nombre es obligatorio");
    }
    if (!precio && precio !== 0) {
        console.error("El precio es obligatorio para registrar un producto");
        throw new Error("El precio es obligatorio");
    }
    try {
        const data = await request(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, description, id: uuid.v4() })
        });
        console.log(`Producto registrado exitosamente: ${nombre}`);
        return data;
    } catch (error) {
        console.error(`No se pudo registrar el producto "${nombre}":`, error.message);
        throw error;
    }
}

//PUT - Actualizar
const actualizarProducto = async (nombre, precio, description, id) => {
    if (!id) {
        console.error("No se proporcionó un ID para actualizar");
        throw new Error("ID del producto es requerido para actualizar");
    }
    if (!nombre || nombre.trim() === '') {
        console.error("El nombre es obligatorio para actualizar");
        throw new Error("El nombre es obligatorio");
    }
    try {
        const data = await request(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, description })
        });
        console.log(`Producto actualizado exitosamente: ${nombre}`);
        return data;
    } catch (error) {
        console.error(`No se pudo actualizar el producto con ID ${id}:`, error.message);
        throw error;
    }
}

//DELETE - Eliminar
const eliminarProducto = async (id) => {
    if (!id) {
        console.error("No se proporcionó un ID para eliminar");
        throw new Error("ID del producto es requerido para eliminar");
    }
    try {
        const data = await request(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        console.log(`Producto con ID ${id} eliminado exitosamente`);
        return data;
    } catch (error) {
        console.error(`No se pudo eliminar el producto con ID ${id}:`, error.message);
        throw error;
    }
}

export const productService = {
    listarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerProducto
};

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

//---Con Supabase---//
const URL_SUPABASE = "https://tqkrmznxbnvmxrxythkp.supabase.co";
const SUPABASE_KEY = "sb_publishable_DcCgC0-Ps337U0-GXaGnag_HMcEMyZU";
const table = "productos";
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`;

const HEADERS = {
    'apiKey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

const request = async(url, option={})=>{
    const res = await fetch(url,{headers: HEADERS, ...option});
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if(!res.ok){
        const mensaje = data?.mensaje ?? data?.error ?? text ?? 'Error';
        throw new Error(mensaje);
    }
    return data;
}

//GET
const listarProductos = () =>{
    return request(`${API_URL}?select=id,nombre,precio,description`);
}

//Get por id
const obtenerProducto = (id)=>{
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,precio,description`).then(data => data?.[0]);
}

//POST
const crearProducto = (nombre, precio, description) =>{
    return request(API_URL, {
        method: 'POST',
        body: JSON.stringify({nombre, precio, description})
    }).then(data=>data?.[0]);
}

//PATCH
const actualizarProducto = (nombre, precio, description, id) =>{
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({nombre, precio, description})
    }).then(data=>data?.[0] ?? Promise.reject(new Error('Producto no encontrado')));
}

//DELETE
const eliminarProducto = (id) =>{
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE'
    }).then(data=>data?.[0] ?? Promise.reject(new Error('Producto no encontrado')));
}

export const productService = {
    listarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerProducto
};

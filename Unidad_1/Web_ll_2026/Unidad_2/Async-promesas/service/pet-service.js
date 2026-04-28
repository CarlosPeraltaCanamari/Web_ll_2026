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

//---Con Supabase---//
const URL_SUPABASE = "https://tqkrmznxbnvmxrxythkp.supabase.co";
const SUPABASE_KEY = "sb_publishable_DcCgC0-Ps337U0-GXaGnag_HMcEMyZU";
const table = "mascotas";
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
const listarMascotas = () =>{
    return request(`${API_URL}?select=id,nombre,tipo,raza,edad,dueno`);
}

//Get por id
const obtenerMascota = (id)=>{
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,tipo,raza,edad,dueno`).then(data => data?.[0]);
}

//POST
const crearMascota = (nombre, tipo, raza, edad, dueno) =>{
    return request(API_URL, {
        method: 'POST',
        body: JSON.stringify({nombre, tipo, raza, edad, dueno})
    }).then(data=>data?.[0]);
}

//PATCH
const actualizarMascota = (nombre, tipo, raza, edad, dueno, id) =>{
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({nombre, tipo, raza, edad, dueno})
    }).then(data=>data?.[0] ?? Promise.reject(new Error('Mascota no encontrada')));
}

//DELETE
const eliminarMascota = (id) =>{
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE'
    }).then(data=>data?.[0] ?? Promise.reject(new Error('Mascota no encontrada')));
}

export const petService = {
    listarMascotas,
    crearMascota,
    actualizarMascota,
    eliminarMascota,
    obtenerMascota
};

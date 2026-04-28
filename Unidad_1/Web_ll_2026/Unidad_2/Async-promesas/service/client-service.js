//recepcion de datos
/*const crearfila = (nombre, email) =>{
    const fila = document.createElement('tr');//creamosnueva fila
    //html como variable
    const contenido = `
    <td class="td" data-td>
        ${nombre}
    </td>
    <td>${email}</td>
    <td>
        <ul class="table__button-control">
        <li>
            <a
            href="../screens/editar_cliente.html"
            class="simple-button simple-button--edit"
            >
            Editar
            </a>
        </li>
        <li>
            <button class="simple-button simple-button--delete" type="button">
            Eliminar
            </button>
        </li>
        </ul>
    </td>
    `;
    fila.innerHTML=contenido;
    return fila;
}*/

/*const listar_clientes = () =>{
    const promesa = new Promise((resolve, reject) =>{
        const http = new XMLHttpRequest();//variable para request con http
        http.open("GET", "http://localhost:3000/perfil");
        http.send();
        http.onload = () =>{
            const response = JSON.parse(http.response)
            if(http.response >= 400){
                reject(response);
            }else
                resolve(response);
        }
    })
    return promesa;
}
listar_clientes()
    .then((data)=>{
        data.forEach((perfil)=>{
            const nuevafila = crearfila(perfil.nombre, perfil.email);
            table.appendChild(nuevafila);
        });
})
    .catch((error)=>alert("sin conexcion"));*/
//--optimizado--//
/*const listar_clientes = () => fetch("http://localhost:3000/perfil").then((respuesta) => respuesta.json());

const crearCliente = (nombre, email) => {
    return fetch("http://localhost:3000/perfil", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email, id: uuid.v4() })
    }).then(respuesta => respuesta.json());
};

const actualizarCliente = (nombre, email, id) => { //SOLO MODIFICO EL NOMBRE Y EL EMAIL
    return fetch(`http://localhost:3000/perfil/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ nombre, email })
        })
        .then(respuesta => respuesta.json()).catch((err) => console.log(err));
}

const eliminarCliente = (id) => {
    console.log("eliminar", id);
    return fetch(`http://localhost:3000/perfil/${id}`,
        {
            method: "DELETE"
        }).then(respuesta => respuesta.json());
};
//referencia a identificador
const cliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta) => respuesta.json());
}*/

//---Con mySQL---//
/*const API_BASE_URL = "http://localhost/api/conexion.php";

const listar_clientes = () =>{
    return fetch(API_BASE_URL).then((response) =>{
        if(!response.ok)throw new Error("Error al obtener los clientes");
        return response.json();
    });
}

const crearCliente = (nombre, apellido, email) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, apellido, email, id: uuid.v4() })
    }).then((response) => {
        if(!response.ok)throw new Error("Error al crear el cliente");
        return response.json();
    });
};

const actualizarCliente = (nombre, apellido, email, id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, apellido, email, id })
    }).then((response) => {
        if(!response.ok)throw new Error("Error al actualizar el cliente");
        return response.json();
    });

}

const eliminarCliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE"
    }).then((response) => {
        if(!response.ok)throw new Error("Error al eliminar el cliente");
        return response.json();
    });
};

const cliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`).then((response)=>response.json());
}*/

const URL_SUPABASE = "https://tqkrmznxbnvmxrxythkp.supabase.co";
const SUPABASE_KEY = "sb_publishable_DcCgC0-Ps337U0-GXaGnag_HMcEMyZU";
const table = "clientes";
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`;

const HEADERS = {
    'apiKey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

const request = async(url, option={})=>{
    const res = await fetch(url,{headers: HEADERS, ...option});
    const text = await res.text();;
    const data = text ? JSON.parse(text) : null;

    if(!res.ok){
        const mensaje = data?.mensaje ?? data?.error ?? text ?? 'Error';
        throw new Error(mensaje);
    }
    return data;
}

//GET
const listar_clientes = () =>{
    return request(`${API_URL}?select=id,nombre,email`);
}

//Get por id
const cliente = (id)=>{
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,email`);
}

//POST
const crearCliente = (nombre, email) =>{
    return request(API_URL, {
        method: 'POST',
        body: JSON.stringify({nombre, email})
    }).then(data=>data?.[0]);
}

//PATCH
const actualizarCliente = (nombre, email, id) =>{
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({nombre, email})
    }).then(data=>data?.[0] ?? Promise.reject(new Error('Cliente no encontrado')));
}

//DELETE
const eliminarCliente = (id) =>{
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE'
    }).then(data=>data?.[0] ?? Promise.reject(new Error('Cliente no encontrado')));
}

export const clientService = {
    listar_clientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    cliente
};
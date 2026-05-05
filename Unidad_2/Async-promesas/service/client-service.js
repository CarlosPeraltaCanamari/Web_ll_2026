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

//---Con Local API PHP y SQL Server---//
/*const API_URL = "../api/clientes.php";

const request = async(url, option={})=>{
    const res = await fetch(url, option);
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if(!res.ok){
        const mensaje = data?.mensaje ?? data?.error ?? text ?? 'Error';
        throw new Error(mensaje);
    }
    return data;
}

//GET
const listar_clientes = () =>{
    return request(API_URL);
}

//Get por id
const cliente = (id)=>{
    return request(`${API_URL}?id=${id}`);
}

//POST
const crearCliente = (nombre, email) =>{
    return request(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nombre, email})
    });
}

//PUT (Actualizar)
const actualizarCliente = (nombre, email, id) =>{
    return request(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id, nombre, email})
    });
}

//DELETE
const eliminarCliente = (id) =>{
    return request(`${API_URL}?id=${id}`, {
        method: 'DELETE'
    });
}*/

//---Con Express (localhost:3000)---//
const BASE_URL = "http://localhost:3000/clientes";

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
const listar_clientes = async () => {
    try {
        const data = await request(BASE_URL);
        console.log(`Se listaron ${data.length} clientes`);
        return data;
    } catch (error) {
        console.error("Error al listar clientes:", error.message);
        throw error;
    }
}

//GET por id
const cliente = async (id) => {
    if (!id) {
        console.error("No se proporcionó un ID para buscar el cliente");
        throw new Error("ID del cliente es requerido");
    }
    try {
        const data = await request(`${BASE_URL}/${id}`);
        console.log(`Cliente encontrado: ${data.nombre}`);
        return data;
    } catch (error) {
        console.error(`Error al obtener cliente con ID ${id}:`, error.message);
        throw error;
    }
}

//POST - Crear
const crearCliente = async (nombre, email) => {
    if (!nombre || nombre.trim() === '') {
        console.error("El nombre es obligatorio para registrar un cliente");
        throw new Error("El nombre es obligatorio");
    }
    if (!email || email.trim() === '') {
        console.error("El email es obligatorio para registrar un cliente");
        throw new Error("El email es obligatorio");
    }
    try {
        const data = await request(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, id: uuid.v4() })
        });
        console.log(`Cliente registrado exitosamente: ${nombre}`);
        return data;
    } catch (error) {
        console.error(`No se pudo registrar el cliente "${nombre}":`, error.message);
        throw error;
    }
}

//PUT - Actualizar
const actualizarCliente = async (nombre, email, id) => {
    if (!id) {
        console.error("No se proporcionó un ID para actualizar");
        throw new Error("ID del cliente es requerido para actualizar");
    }
    if (!nombre || nombre.trim() === '') {
        console.error("El nombre es obligatorio para actualizar");
        throw new Error("El nombre es obligatorio");
    }
    if (!email || email.trim() === '') {
        console.error("El email es obligatorio para actualizar");
        throw new Error("El email es obligatorio");
    }
    try {
        const data = await request(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email })
        });
        console.log(`Cliente actualizado exitosamente: ${nombre}`);
        return data;
    } catch (error) {
        console.error(`No se pudo actualizar el cliente con ID ${id}:`, error.message);
        throw error;
    }
}

//DELETE - Eliminar
const eliminarCliente = async (id) => {
    if (!id) {
        console.error("No se proporcionó un ID para eliminar");
        throw new Error("ID del cliente es requerido para eliminar");
    }
    try {
        const data = await request(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        console.log(`Cliente con ID ${id} eliminado exitosamente`);
        return data;
    } catch (error) {
        console.error(`No se pudo eliminar el cliente con ID ${id}:`, error.message);
        throw error;
    }
}

export const clientService = {
    listar_clientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    cliente
};
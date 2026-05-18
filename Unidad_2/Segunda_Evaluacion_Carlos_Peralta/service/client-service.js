const API_URL = "http://localhost:3000";

const request = async (url, option = {}) => {
    const res = await fetch(url, option);
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const mensaje = data?.mensaje ?? data?.error ?? text ?? 'Error';
        throw new Error(mensaje);
    }
    return data;
};

const $pelicula = document.getElementById("pelicula");
const $sala = document.getElementById("sala");
const $funcion = document.getElementById("funcion");
const $butaca = document.getElementById("butaca");
const $tarifa = document.getElementById("tarifa");
const $nombre = document.getElementById("nombre");
const $correo = document.getElementById("correo");
const $telefono = document.getElementById("telefono");
const $btnAgregar = document.getElementById("btn-agregar");
const $datos = document.getElementById("datos");

const renderSelect = (select, options, placeholder) => {
    select.innerHTML = `<option value="">${placeholder}</option>`;
    options.forEach(({ value, label }) => {
        const option = document.createElement("option");
        option.value = String(value);
        option.textContent = label;
        select.appendChild(option);
    });
};

const cargarPeliculas = async () => {
    const peliculas = await request(`${API_URL}/peliculas`);
    renderSelect(
        $pelicula,
        peliculas.map((p) => ({ value: p.id_pelicula, label: p.titulo })),
        "Seleccione una pelicula"
    );
};

const cargarSalas = async () => {
    const salas = await request(`${API_URL}/salas`);
    renderSelect(
        $sala,
        salas.map((s) => ({ value: s.id_sala, label: `${s.nombre} (${s.capacidad} asientos)` })),
        "Seleccione una sala"
    );
};

const cargarFunciones = async () => {
    const params = new URLSearchParams();
    if ($pelicula.value) {
        params.set("id_pelicula", $pelicula.value);
    }
    if ($sala.value) {
        params.set("id_sala", $sala.value);
    }

    const qs = params.toString();
    const funciones = await request(`${API_URL}/funciones${qs ? `?${qs}` : ""}`);
    renderSelect(
        $funcion,
        funciones.map((f) => ({
            value: f.id_funcion,
            label: `${new Date(f.fecha_hora).toLocaleString()} - ${f.titulo} (${f.sala})`
        })),
        "Seleccione una función"
    );
};

const cargarButacasDisponibles = async () => {
    if (!$funcion.value) {
        renderSelect($butaca, [], "Seleccione una butaca");
        return;
    }

    const butacas = await request(`${API_URL}/butacas-disponibles?id_funcion=${$funcion.value}`);
    renderSelect(
        $butaca,
        butacas.map((n) => ({ value: n, label: `Butaca ${n}` })),
        "Seleccione una butaca"
    );
};

const cargarClientes = async () => {
    const clientes = await request(`${API_URL}/clientes`);
    $datos.innerHTML = "";

    clientes.forEach((cliente) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${cliente.id_cliente}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.correo}</td>
            <td>${cliente.telefono}</td>
        `;
        $datos.appendChild(tr);
    });
};

const crearCliente = async () => {
    return request(`${API_URL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre: $nombre.value.trim(),
            correo: $correo.value.trim(),
            telefono: $telefono.value.trim()
        })
    });
};

const comprarBoleto = async (idCliente) => {
    return request(`${API_URL}/compra-boletos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id_cliente: idCliente,
            id_funcion: Number($funcion.value),
            numero_butaca: Number($butaca.value),
            precio: Number($tarifa.value)
        })
    });
};

const validarFormulario = () => {
    if (!$nombre.value.trim() || !$correo.value.trim() || !$telefono.value.trim()) {
        throw new Error("Completa los datos del cliente");
    }
    if (!$pelicula.value || !$sala.value || !$funcion.value || !$butaca.value || !$tarifa.value) {
        throw new Error("Selecciona película, sala, función, butaca y tarifa");
    }
};

const onAgregar = async () => {
    try {
        validarFormulario();
        const nuevoCliente = await crearCliente();
        await comprarBoleto(nuevoCliente.id_cliente);
        await cargarClientes();
        await cargarButacasDisponibles();
        alert("Compra realizada con éxito");
    } catch (error) {
        alert(error.message);
    }
};

$pelicula.addEventListener("change", cargarFunciones);
$sala.addEventListener("change", cargarFunciones);
$funcion.addEventListener("change", cargarButacasDisponibles);
$btnAgregar.addEventListener("click", onAgregar);

const init = async () => {
    try {
        await Promise.all([cargarPeliculas(), cargarSalas(), cargarClientes()]);
        await cargarFunciones();
    } catch (error) {
        console.error(error);
        alert("No se pudo cargar la información inicial");
    }
};

init();

// Variables globales
let datosGuardados = [];
let idSeleccionado = null;
const caritas = ['(^_^)', '(>_<)', '(*_*)', '(o_O)', '(^o^)', '(@_@)', '(T_T)', '(=_=)'];
const STORAGE_KEY = 'usuarios_formulario';

// Utilidades
function obj(id) { return document.getElementById(id); }
function generarId() { return '_' + Math.random().toString(36).slice(2, 9); }
function caraAleatoria() { return caritas[Math.floor(Math.random() * caritas.length)]; }

// Guardar en LocalStorage
function guardarEnStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datosGuardados));
}

// Cargar desde LocalStorage
function cargarDelStorage() {
    const datos = localStorage.getItem(STORAGE_KEY);
    if (datos) {
        datosGuardados = JSON.parse(datos);
    }
}

// Validaciones mejoradas
const validaciones = {
    nombre: (valor) => {
        valor = valor.trim();
        if (!valor) return { valido: false, error: 'El nombre es requerido' };
        if (valor.length < 2) return { valido: false, error: 'El nombre debe tener al menos 2 caracteres' };
        if (valor.length > 50) return { valido: false, error: 'El nombre no puede exceder 50 caracteres' };
        if (!/^[a-záéíóúñ\s]+$/i.test(valor)) return { valido: false, error: 'El nombre solo puede contener letras' };
        return { valido: true };
    },
    curso: (valor) => {
        valor = valor.trim();
        if (!valor) return { valido: false, error: 'El curso es requerido' };
        if (valor.length < 3) return { valido: false, error: 'El curso debe tener al menos 3 caracteres' };
        if (valor.length > 80) return { valido: false, error: 'El curso no puede exceder 80 caracteres' };
        return { valido: true };
    },
    edad: (valor) => {
        valor = valor.trim();
        if (!valor) return { valido: false, error: 'La edad es requerida' };
        const edad = parseInt(valor);
        if (isNaN(edad) || edad < 0 || edad > 120) return { valido: false, error: 'La edad debe estar entre 0 y 120' };
        return { valido: true };
    },
    hermanos: (valor) => {
        valor = valor.trim();
        if (valor === '') return { valido: true }; // Opcional
        const hermanos = parseInt(valor);
        if (isNaN(hermanos) || hermanos < 0 || hermanos > 99) return { valido: false, error: 'Los hermanos deben estar entre 0 y 99' };
        return { valido: true };
    },
    ciudad: (valor) => {
        valor = valor.trim();
        if (!valor) return { valido: false, error: 'La ciudad es requerida' };
        if (valor.length < 2) return { valido: false, error: 'La ciudad debe tener al menos 2 caracteres' };
        if (valor.length > 50) return { valido: false, error: 'La ciudad no puede exceder 50 caracteres' };
        return { valido: true };
    }
};

// Mostrar error en campo
function mostrarError(idCampo, mensaje) {
    const campo = obj(idCampo);
    const contenedor = campo.parentElement;

    campo.classList.add('error');

    let errorDiv = contenedor.querySelector('.error-mensaje');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-mensaje';
        contenedor.appendChild(errorDiv);
    }

    errorDiv.textContent = mensaje;
    errorDiv.classList.add('visible');
}

// Limpiar error en campo
function limpiarError(idCampo) {
    const campo = obj(idCampo);
    const contenedor = campo.parentElement;

    campo.classList.remove('error');
    const errorDiv = contenedor.querySelector('.error-mensaje');
    if (errorDiv) {
        errorDiv.classList.remove('visible');
    }
}

function renderizarApp() {
    const app = obj('app');

    const contenedorPrincipal = document.createElement('div');
    contenedorPrincipal.className = 'contenedor-principal';
    contenedorPrincipal.setAttribute('role', 'main');
    contenedorPrincipal.appendChild(Encabezado());

    const cuerpoPaneles = document.createElement('div');
    cuerpoPaneles.className = 'cuerpo-paneles';
    cuerpoPaneles.appendChild(Formulario());
    cuerpoPaneles.appendChild(PanelDatos());

    contenedorPrincipal.appendChild(cuerpoPaneles);

    app.appendChild(contenedorPrincipal);

    asignarEventos();
    actualizarVista();
}

function asignarEventos() {
    obj('btn-agregar').onclick = agregarUsuario;
    obj('btn-guardar-cambios').onclick = guardarEdicion;
    obj('btn-cancelar-cambios').onclick = () => {
        obj('modal-edicion').classList.remove('abierto');
        idSeleccionado = null;
    };

    // Permitir agregar con Enter
    ['f-nom', 'f-cur', 'f-edad', 'f-herm', 'f-ciudad'].forEach(id => {
        const campo = obj(id);
        campo.addEventListener('keydown', e => {
            if (e.key === 'Enter') agregarUsuario();
        });
        // Limpiar error al escribir
        campo.addEventListener('input', () => {
            limpiarError(id);
        });
    });
}

function obtenerDatosFormulario() {
    return {
        nombre: obj('f-nom').value,
        curso: obj('f-cur').value,
        edad: obj('f-edad').value,
        hermanos: obj('f-herm').value,
        ciudad: obj('f-ciudad').value
    };
}

function limpiarCampos() {
    ['f-nom', 'f-cur', 'f-edad', 'f-herm', 'f-ciudad'].forEach(id => {
        obj(id).value = '';
        limpiarError(id);
    });
}

function actualizarVista() {
    const divContenedor = obj('lista-usuarios');
    divContenedor.innerHTML = '';

    if (datosGuardados.length === 0) {
        divContenedor.innerHTML = `
      <div class="caja-vacia">
        <span class="carita">( o_o )</span>
        <div>Nada aquí todavía...<br>¡Agrega alguien!</div>
      </div>`;
    } else {
        datosGuardados.forEach(u => divContenedor.appendChild(Tarjeta(u)));
    }

    obj('contador-usuarios').textContent = datosGuardados.length;
}

function agregarUsuario() {
    const info = obtenerDatosFormulario();

    // Validar cada campo
    let esValido = true;

    const campos = ['nombre', 'curso', 'edad', 'ciudad'];
    campos.forEach(campo => {
        const resultado = validaciones[campo](info[campo]);
        if (!resultado.valido) {
            mostrarError('f-' + (campo === 'nombre' ? 'nom' : campo === 'curso' ? 'cur' : campo === 'edad' ? 'edad' : 'ciudad'), resultado.error);
            esValido = false;
        } else {
            limpiarError('f-' + (campo === 'nombre' ? 'nom' : campo === 'curso' ? 'cur' : campo === 'edad' ? 'edad' : 'ciudad'));
        }
    });

    // Validar hermanos si existe
    if (info.hermanos) {
        const resultado = validaciones.hermanos(info.hermanos);
        if (!resultado.valido) {
            mostrarError('f-herm', resultado.error);
            esValido = false;
        } else {
            limpiarError('f-herm');
        }
    } else {
        limpiarError('f-herm');
    }

    if (!esValido) return;

    // Agregar usuario con datos limpios
    datosGuardados.push({
        id: generarId(),
        nombre: info.nombre.trim(),
        curso: info.curso.trim(),
        edad: info.edad.trim(),
        hermanos: info.hermanos.trim() || '0',
        ciudad: info.ciudad.trim()
    });

    guardarEnStorage();
    limpiarCampos();
    actualizarVista();
}

function borrarUsuario(id) {
    if (confirm('¿Está seguro que desea borrar este usuario?')) {
        const indice = datosGuardados.findIndex(u => u.id === id);
        if (indice !== -1) {
            datosGuardados.splice(indice, 1);
            guardarEnStorage();
            actualizarVista();
        }
    }
}

function abrirEdicion(id) {
    const registro = datosGuardados.find(u => u.id === id);
    if (!registro) return;
    idSeleccionado = id;

    obj('e-nom').value = registro.nombre;
    obj('e-cur').value = registro.curso;
    obj('e-edad').value = registro.edad;
    obj('e-herm').value = registro.hermanos;
    obj('e-ciudad').value = registro.ciudad;

    obj('modal-edicion').classList.add('abierto');
}

function guardarEdicion() {
    const registro = datosGuardados.find(u => u.id === idSeleccionado);
    if (!registro) return;

    const datosEditados = {
        nombre: obj('e-nom').value,
        curso: obj('e-cur').value,
        edad: obj('e-edad').value,
        hermanos: obj('e-herm').value,
        ciudad: obj('e-ciudad').value
    };

    // Validar datos editados
    let esValido = true;
    const camposEdicion = ['nombre', 'curso', 'edad', 'ciudad'];

    camposEdicion.forEach(campo => {
        const resultado = validaciones[campo](datosEditados[campo]);
        if (!resultado.valido) {
            alert(resultado.error);
            esValido = false;
        }
    });

    if (!esValido) return;

    // Actualizar registro
    registro.nombre = datosEditados.nombre.trim();
    registro.curso = datosEditados.curso.trim();
    registro.edad = datosEditados.edad.trim();
    registro.hermanos = datosEditados.hermanos.trim() || '0';
    registro.ciudad = datosEditados.ciudad.trim();

    guardarEnStorage();

    const notif = obj('mensaje-notificacion');
    notif.classList.add('visible');
    setTimeout(() => {
        notif.classList.remove('visible');
        obj('modal-edicion').classList.remove('abierto');
        idSeleccionado = null;
        actualizarVista();
    }, 1200);
}

// Iniciar app
cargarDelStorage();
renderizarApp();
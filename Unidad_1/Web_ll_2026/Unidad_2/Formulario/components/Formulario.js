function Formulario() {
    const div = document.createElement('div');
    div.className = 'panel-formulario';
    div.innerHTML = `
        <div class="etiqueta-panel">Formulario</div>

        <form id="formulario-usuarios" action="#" onsubmit="agregarUsuario(); return false;">
            <div class="campo">
                <label for="f-nom" class="etiqueta-campo">
                    <span class="flecha">→</span>
                    Nombre completo
                </label>
                <input id="f-nom" type="text" placeholder="Ej: Juan García" required aria-required="true">
            </div>
            
            <div class="campo">
                <label for="f-cur" class="etiqueta-campo">
                    <span class="flecha">→</span>
                    Curso
                </label>
                <input id="f-cur" type="text" placeholder="Ej: Programación 101" required aria-required="true">
            </div>
            
            <div class="campo">
                <label for="f-edad" class="etiqueta-campo">
                    <span class="flecha">→</span>
                    Edad
                </label>
                <input id="f-edad" type="number" placeholder="0" min="0" max="120" required aria-required="true">
            </div>
            
            <div class="campo">
                <label for="f-herm" class="etiqueta-campo">
                    <span class="flecha">→</span>
                    Cantidad de hermanos
                </label>
                <input id="f-herm" type="number" placeholder="0" min="0" max="99">
            </div>
            
            <div class="campo">
                <label for="f-ciudad" class="etiqueta-campo">
                    <span class="flecha">→</span>
                    Ciudad de nacimiento
                </label>
                <input id="f-ciudad" type="text" placeholder="Ej: Madrid" required aria-required="true">
            </div>

            <button type="submit" class="btn-agregar" id="btn-agregar" aria-label="Agregar nuevo usuario">
                + Agregar usuario
            </button>
        </form>
    `;
    return div;
}

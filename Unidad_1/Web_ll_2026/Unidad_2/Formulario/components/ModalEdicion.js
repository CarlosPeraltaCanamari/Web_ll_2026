function ModalEdicion() {
    const div = document.createElement('div');
    div.className = 'superposicion-edicion';
    div.id = 'modal-edicion';
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-label', 'Modal de edición de usuario');
    div.innerHTML = `
        <h2 class="titulo-edicion">Editando usuario</h2>
        
        <form id="formulario-edicion">
            <div class="campo">
                <label for="e-nom" class="etiqueta-campo">
                    <span class="flecha">→</span>
                    Nombre
                </label>
                <input id="e-nom" type="text" aria-required="true">
            </div>
            
            <div class="campo">
                <label for="e-cur" class="etiqueta-campo">
                    <span class="flecha">→</span>
                    Curso
                </label>
                <input id="e-cur" type="text" aria-required="true">
            </div>
            
            <div class="campo">
                <label for="e-edad" class="etiqueta-campo">
                    <span class="flecha">→</span>
                    Edad
                </label>
                <input id="e-edad" type="number" min="0" max="120" aria-required="true">
            </div>
            
            <div class="campo">
                <label for="e-herm" class="etiqueta-campo">
                    <span class="flecha">→</span>
                    Hermanos
                </label>
                <input id="e-herm" type="number" min="0" max="99">
            </div>
            
            <div class="campo">
                <label for="e-ciudad" class="etiqueta-campo">
                    <span class="flecha">→</span>
                    Ciudad
                </label>
                <input id="e-ciudad" type="text" aria-required="true">
            </div>
            
            <button type="button" class="btn-guardar" id="btn-guardar-cambios">Guardar cambios</button>
            <button type="button" class="btn-cancelar" id="btn-cancelar-cambios">Cancelar</button>
        </form>
        
        <div class="notificacion" id="mensaje-notificacion" role="status" aria-live="polite">
            Cambios guardados exitosamente
        </div>
    `;
    return div;
}

function PanelDatos() {
    const div = document.createElement('div');
    div.className = 'panel-formulario panel-datos panel-datos-relativo';
    div.setAttribute('role', 'region');
    div.setAttribute('aria-label', 'Lista de usuarios registrados');
    div.innerHTML = `
        <div class="etiqueta-panel etiqueta-panel-verde">
            Datos registrados
            <span class="medalla-contador" id="contador-usuarios" aria-live="polite" aria-label="Total de usuarios registrados">0</span>
        </div>
        <div class="contenedor-tarjetas" id="lista-usuarios">
            <div class="caja-vacia">
                <span class="carita">( o_o )</span>
                <div>Nada aquí todavía...<br>¡Agrega alguien!</div>
            </div>
        </div>
    `;

    div.appendChild(ModalEdicion());

    return div;
}

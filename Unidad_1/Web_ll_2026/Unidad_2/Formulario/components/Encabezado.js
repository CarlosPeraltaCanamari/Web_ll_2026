const Encabezado = () => {
    const div = document.createElement('div');
    div.className = 'encabezado';
    div.setAttribute('role', 'banner');
    div.innerHTML = `
        <div class="punto-encabezado" style="background:#ef4444" aria-hidden="true"></div>
        <div class="punto-encabezado" style="background:#f59e0b" aria-hidden="true"></div>
        <div class="punto-encabezado" style="background:#10b981" aria-hidden="true"></div>
        <h1 class="titulo-encabezado">Registro de Usuarios</h1>
        <div class="punto-encabezado" style="background:#6366f1" aria-hidden="true"></div>
    `;
    return div;
};

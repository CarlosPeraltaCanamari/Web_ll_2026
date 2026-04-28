function Tarjeta(usuario) {
  const contenedor = document.createElement('article');
  contenedor.className = 'tarjeta';
  contenedor.dataset.id = usuario.id;
  contenedor.setAttribute('role', 'region');
  contenedor.setAttribute('aria-label', `Tarjeta de usuario: ${usuario.nombre}`);

  const contenido = document.createElement('div');
  contenido.innerHTML = `
        <div class="nombre-tarjeta">${caraAleatoria()} ${usuario.nombre || '???'}</div>
        <div class="fila-tarjeta">Curso: <b>${usuario.curso || '-'}</b></div>
        <div class="fila-tarjeta">Edad: <b>${usuario.edad || '?'}</b> | Hermanos: <b>${usuario.hermanos || '0'}</b></div>
        <div class="fila-tarjeta">Ciudad: <b>${usuario.ciudad || '-'}</b></div>
        <div class="botones-tarjeta">
            <button class="btn-pequeno btn-pequeno-editar" onclick="abrirEdicion('${usuario.id}')" aria-label="Editar usuario ${usuario.nombre}">Editar</button>
            <button class="btn-pequeno btn-pequeno-borrar" onclick="borrarUsuario('${usuario.id}')" aria-label="Borrar usuario ${usuario.nombre}">Borrar</button>
        </div>
    `;

  contenedor.appendChild(contenido);
  return contenedor;
}

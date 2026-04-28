const putData = () => {
    const id = document.getElementById('inputPutId').value.trim();
    const titulo = document.getElementById('inputPutTitulo').value.trim();
    const descripcion = document.getElementById('inputPutDescripcion').value.trim();

    if (!id || !titulo || !descripcion) {
        showResult('Por favor completa el ID, Título y Descripción para actualizar.', true);
        return;
    }

    const updateData = {
        titulo: titulo,
        descripcion: descripcion,
        fecha: new Date().toISOString()
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(updateData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Http error estado: ${response.status}`);
        }
        return response.json();
    })
    .then(data => showResult(data))
    .catch(error => showResult(error.message, true));
};
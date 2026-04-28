const postData = () => {
    const titulo = document.getElementById('inputTitulo').value.trim();
    const descripcion = document.getElementById('inputDescripcion').value.trim();

    if (!titulo || !descripcion) {
        showResult('Por favor completa el Título y la Descripción antes de enviar.', true);
        return;
    }

    const newPost = {
        titulo: titulo,
        descripcion: descripcion,
        fecha: new Date().toISOString()
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newPost)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Http error estado: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        showResult(data);
        limpiarFormulario();
    })
    .catch(error => showResult(error.message, true));
};
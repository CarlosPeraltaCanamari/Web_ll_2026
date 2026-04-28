const deleteData = () => {
    const id = document.getElementById('inputDeleteId').value.trim();

    if (!id) {
        showResult('Por favor ingresa el ID del post a eliminar.', true);
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Http error estado: ${response.status}`);
        }
        showResult({ message: `Post ${id} eliminado correctamente`, status: response.status });
    })
    .catch(error => showResult(error.message, true));
};
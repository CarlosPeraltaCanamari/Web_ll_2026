const API_URL = "http://localhost:3001/posts";

const getData = () => {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => showResult(data))
        .catch(error => showResult(error.message, true));
};
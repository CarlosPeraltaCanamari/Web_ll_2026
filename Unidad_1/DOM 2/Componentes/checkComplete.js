const checkComplete = () => {
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-check-square");
    icon.addEventListener("click", color); 
    return icon;
};

const color = (evento) => {
    const element = evento.target;
    element.classList.add("fas", "completeIcon");
    element.classList.remove("far");
    element.style.color = "green";
};

export default checkComplete;
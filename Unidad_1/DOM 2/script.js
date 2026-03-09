import checkComplete from "./Componentes/checkComplete.js";  
import deleteIcon from "./Componentes/deleteIcon.js";  

(() => {
  const form = document.querySelector("form");

  const createTask = (evento) => {
    evento.preventDefault();
    const input = document.querySelector("[data-form-input]");
    const valor = input.value;
    const list = document.querySelector("[data-list]");
    const task = document.createElement("li");
    task.classList.add("card");
    input.value = "";
    const contTask = document.createElement("div");
    const titleTask = document.createElement("span");
    titleTask.classList.add("task");
    titleTask.innerText = valor;
    contTask.appendChild(checkComplete());
    contTask.appendChild(titleTask);
    task.appendChild(contTask);
    task.appendChild(deleteIcon());
    list.appendChild(task);
  };

  form.addEventListener("submit", createTask);
})();
import checkComplete from "./Componentes/checkComplete.js";
import deleteIcon from "./Componentes/deleteIcon.js";

(() => {
  const form = document.querySelector("form");
  const input = document.querySelector("[data-form-input]");

  input.addEventListener("input", () => {
    input.value = input.value.replace(/[0-9]/g, "");
    input.setCustomValidity("");
  });

  const createTask = (evento) => {
    evento.preventDefault();
    const valor = input.value.trim();

    if (!valor) {
      input.setCustomValidity("Por favor, ingresá una tarea.");
      input.reportValidity();
      return;
    }

    if (/[0-9]/.test(valor)) {
      input.setCustomValidity("No se permiten números en la tarea.");
      input.reportValidity();
      return;
    }

    input.setCustomValidity("");
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
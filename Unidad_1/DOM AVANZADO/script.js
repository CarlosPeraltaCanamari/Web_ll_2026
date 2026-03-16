(() => {
    // ── FORMULARIO ──────────────────────────────────────────────
    const form = (() => {
        const formEl = document.querySelector("[data-form]");
        const inputTask = document.querySelector("[data-input-task]");
        const inputDesc = document.querySelector("[data-input-descripcion]");
        const inputFecha = document.querySelector("[data-input-fecha]");
        const inputPrioridad = document.querySelector("[data-input-prioridad]");
        const inputCategoria = document.querySelector("[data-input-categoria]");
        const inputResponsable = document.querySelector("[data-input-responsable]");
        const inputEstado = document.querySelector("[data-input-estado]");

        // ✅ .value en lugar de .ariaValueMax
        const datosForm = () => ({
            task: inputTask.value.trim(),
            description: inputDesc.value.trim(),
            date: inputFecha.value.trim(),
            priority: inputPrioridad.value.trim(),
        });

        const reset = () => {
            inputTask.value = "";
            inputDesc.value = "";
            inputFecha.value = "";
            inputPrioridad.value = "";
        };

        const setDatos = (callback) => {
            formEl.addEventListener("submit", (e) => {
                e.preventDefault();
                callback(datosForm());
                reset();
            });
        };

        return { setDatos };
    })();

    // ── TABLA ────────────────────────────────────────────────────
    const tabla = (() => {
        // ✅ corchetes [0] en vez de paréntesis (0)
        const cuerpoTabla = document
            .getElementById("taskTable")
            .getElementsByTagName("tbody")[0];

        const addTask = (task) => {
            const fila = cuerpoTabla.insertRow();

            // ✅ insertCell con C mayúscula
            fila.insertCell(0).textContent = task.task;
            fila.insertCell(1).textContent = task.description;
            fila.insertCell(2).textContent = task.date;
            fila.insertCell(3).textContent = task.priority;

            // Columna de acciones
            const celdaAcciones = fila.insertCell(4);
            const acciones = document.createElement("div");
            // ✅ className sin paréntesis, es propiedad no método
            acciones.className = "actions";

            // Botón "Hecho"
            const btnHecho = document.createElement("button");
            btnHecho.textContent = "Hecho";
            btnHecho.className = "view";
            btnHecho.addEventListener("click", () => {
                fila.classList.toggle("completed");
                // Actualizamos las cards cuando cambia el estado
                cards.update();
            });

            // Botón "Eliminar"
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.className = "delete";
            btnEliminar.addEventListener("click", () => {
                // ✅ rowIndex - 1 (resta, no asignación)
                cuerpoTabla.deleteRow(fila.rowIndex - 1);
                cards.update();
            });

            acciones.appendChild(btnHecho);
            acciones.appendChild(btnEliminar);
            celdaAcciones.appendChild(acciones);

            // Refrescamos las cards al añadir tarea
            cards.update();
        };

        const getTask = () =>
            Array.from(cuerpoTabla.rows).map((row) => ({
                task: row.cells[0].textContent,
                description: row.cells[1].textContent,
                date: row.cells[2].textContent,
                priority: row.cells[3].textContent,
                completed: row.classList.contains("completed"),
            }));

        // ✅ objeto en vez de array
        return { addTask, getTask };
    })();

    const datosForm = () => ({
        task: inputTask.value.trim(),
        description: inputDesc.value.trim(),
        date: inputFecha.value.trim(),
        priority: inputPrioridad.value.trim(),
        category: inputCategoria.value.trim(),
        responsable: inputResponsable.value.trim(),
        estado: inputEstado.value.trim(),
    });

    const reset = () => {
        inputTask.value = "";
        inputDesc.value = "";
        inputFecha.value = "";
        inputPrioridad.value = "";
        inputCategoria.value = "";
        inputResponsable.value = "";
        inputEstado.value = "";
    };

    // ── CARDS ────────────────────────────────────────────────────
    const cards = (() => {
        const contenedor = document.getElementById("taskCards");

        const update = () => {
            const tareas = tabla.getTask();
            contenedor.innerHTML = "";

            tareas.forEach((task) => {
                const card = document.createElement("div");
                card.className = "taskCard";
                // Clase extra si está completada
                if (task.completed) card.classList.add("completed");

                // ✅ cada campo usa su propiedad correcta
                card.innerHTML = `
          <p><strong>Nombre:</strong> ${task.task}</p>
          <p><strong>Descripción:</strong> ${task.description}</p>
          <p><strong>Fecha:</strong> ${task.date}</p>
          <p><strong>Prioridad:</strong> ${task.priority}</p>
          <span class="badge ${task.completed ? "done" : "pending"}">
            ${task.completed ? "✔ Completada" : "⏳ Pendiente"}
          </span>
        `;

                contenedor.appendChild(card);
            });
        };

        // ✅ exponemos update para que tabla pueda llamarlo
        return { update };
    })();

    // ── CONEXIÓN PRINCIPAL ───────────────────────────────────────
    form.setDatos((datos) => {
        tabla.addTask(datos);
    });
})();
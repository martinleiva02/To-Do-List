const tarea = document.getElementById("tarea");
const agregar = document.getElementById("agregar");
const lista = document.getElementById("lista");

let tareas = [];
const tareasGuardadas = localStorage.getItem("tareas");

if (tareasGuardadas) {
    tareas = JSON.parse(tareasGuardadas);
};

tareas.forEach((tareaGuardada) => {
    mostrarTarea(tareaGuardada)
});
function guardarTareas(){
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function agregarTarea() {
    const textoTarea = tarea.value;

    if (textoTarea.trim() === "") { 
        return; 
    }

    const nuevaTarea = { 
        nombre: textoTarea, 
        completada: false 
    };

    tareas.push(nuevaTarea); 

    guardarTareas();

    mostrarTarea(nuevaTarea);

    tarea.value = ""; 
    tarea.focus(); 
}

function mostrarTarea(tarea) {
    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = tarea.nombre;
    
    if (tarea.completada){
        nuevoElemento.classList.add("completada");
    };
    
    lista.appendChild(nuevoElemento);
    
    nuevoElemento.addEventListener("click", () => {
        tarea.completada = !tarea.completada;
        nuevoElemento.classList.toggle("completada");
        guardarTareas();
    });
    
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "❌";
    nuevoElemento.appendChild(botonEliminar);
    
    botonEliminar.addEventListener("click", (event) => {
        event.stopPropagation();
        const indice = tareas.indexOf(tarea);

        tareas.splice(indice, 1);

        guardarTareas();

        nuevoElemento.remove();
    })
};

agregar.addEventListener("click", agregarTarea);

tarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        agregarTarea()
    }
})

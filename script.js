// === Definición de la malla (todos los ramos + prerequisitos) ===
// (igual que antes, no cambia nada)
const malla = [
  { id: "FIS101", nombre: "Introducción a la física", prereqs: [] },
  { id: "MAT101", nombre: "Cálculo I", prereqs: [] },
  { id: "ALG101", nombre: "Álgebra I", prereqs: [] },
  { id: "GEN101", nombre: "Identidad y equidad de género", prereqs: [] },
  { id: "ING101", nombre: "Inglés I", prereqs: [] },
  { id: "COM101", nombre: "Comunicación efectiva", prereqs: [] },
  { id: "PROY101", nombre: "Proyecto: introducción a la ingeniería", prereqs: [] },
  { id: "FIS102", nombre: "Mecánica", prereqs: ["FIS101","MAT101"] },
  { id: "MAT102", nombre: "Cálculo II", prereqs: ["MAT101"] },
  { id: "ALG102", nombre: "Álgebra II", prereqs: ["ALG101"] },
  { id: "PRO102", nombre: "Programación", prereqs: ["ALG101","PROY101"] },
  { id: "GEN102", nombre: "Diálogo, fe y cultura", prereqs: ["GEN101"] },
  { id: "ING102", nombre: "Inglés II", prereqs: ["ING101"] },
  { id: "MAT201", nombre: "Ecuaciones diferenciales", prereqs: ["MAT102","ALG102"] },
  { id: "MAT202", nombre: "Cálculo III", prereqs: ["MAT102"] },
  { id: "QUI201", nombre: "Química general", prereqs: [] },
  { id: "PRO201", nombre: "Programación orientada a objetos", prereqs: ["PRO102"] },
  { id: "PRO202", nombre: "Técnicas y metodologías de programación avanzada", prereqs: ["PRO102"] },
  { id: "COM201", nombre: "Comunicación efectiva II", prereqs: ["COM101"] },
  { id: "ELEC201", nombre: "Formación general electiva", prereqs: [] },
  { id: "FIS201", nombre: "Electromagnetismo", prereqs: ["FIS102","MAT202"] },
  { id: "EST201", nombre: "Estadística", prereqs: [] },
  { id: "SUS201", nombre: "Ingeniería y desarrollo sustentable", prereqs: [] },
  { id: "EMP201", nombre: "Emprendimiento", prereqs: [] },
  { id: "PRO203", nombre: "Estructuras de datos", prereqs: ["PRO201","PRO202"] },
  { id: "PROY201", nombre: "Proyecto: diseño e innovación", prereqs: ["PROY101"] },
  { id: "ELEC301", nombre: "Electrotecnia", prereqs: ["MAT201","FIS201"] },
  { id: "DS301", nombre: "Introducción a data science", prereqs: ["EST201","EMP201","PRO203"] },
  { id: "DIG301", nombre: "Diseño sistemas digitales", prereqs: ["ALG102"] },
  { id: "BD301", nombre: "Base de datos", prereqs: ["PRO203","EMP201"] },
  { id: "ELECPRO301", nombre: "Electivo profesional", prereqs: [] },
  { id: "PROY301", nombre: "Proyecto: integrador programación avanzada", prereqs: ["PRO202"] },
  { id: "ARQ301", nombre: "Arquitectura y organización de computadores", prereqs: ["DIG301"] },
  { id: "FUN301", nombre: "Fundamentos de la computación", prereqs: ["PRO203"] },
  { id: "WEB301", nombre: "Introducción al desarrollo web/móvil", prereqs: ["BD301"] },
  { id: "ISW301", nombre: "Ingeniería de software", prereqs: ["PRO203"] },
  { id: "ELECPRO302", nombre: "Electivo profesional", prereqs: [] },
  { id: "PROY302", nombre: "Proyecto: Integrador de software", prereqs: ["PROY301"] },
  { id: "SI401", nombre: "Sistemas de información I", prereqs: ["BD301"] },
  { id: "LEN401", nombre: "Lenguajes de programación", prereqs: ["PRO203"] },
  { id: "ALG401", nombre: "Diseño y análisis de algoritmos", prereqs: ["FUN301"] },
  { id: "SO401", nombre: "Sistemas operativos", prereqs: ["ARQ301"] },
  { id: "ELECPRO401", nombre: "Electivo profesional", prereqs: [] },
  { id: "GEN401", nombre: "Diálogo, fe y ciencia", prereqs: ["GEN102"] },
  { id: "PROY401", nombre: "Proyecto: Integrador de plataformas", prereqs: ["PROY302"] },
  { id: "PRA401", nombre: "Práctica profesional", prereqs: [] },
  { id: "SI402", nombre: "Sistemas de información II", prereqs: ["SI401"] },
  { id: "GEST401", nombre: "Gestión de proyectos TI", prereqs: ["SI401"] },
  { id: "ARQ402", nombre: "Arquitecturas de sistemas", prereqs: ["SO401"] },
  { id: "RED401", nombre: "Redes de computadores", prereqs: ["SO401"] },
  { id: "ELECPRO402", nombre: "Electivo profesional", prereqs: [] },
  { id: "ETI401", nombre: "Ética moral y profesional", prereqs: ["GEN401"] },
  { id: "PROY402", nombre: "Proyecto: Integrador gestión TI", prereqs: ["PROY401"] },
  { id: "EVAL501", nombre: "Evaluación de proyectos TI", prereqs: ["SI402","GEST401"] },
  { id: "ELECPRO501A", nombre: "Electivo profesional", prereqs: [] },
  { id: "ELECPRO501B", nombre: "Electivo profesional", prereqs: [] },
  { id: "ELECPRO501C", nombre: "Electivo profesional", prereqs: [] },
  { id: "ELECPRO501D", nombre: "Electivo profesional", prereqs: [] },
  { id: "ELECPRO501E", nombre: "Electivo profesional", prereqs: [] },
  { id: "CAP501", nombre: "Capstone project", prereqs: ["PRA401"] },
];

// === Estado de cursos aprobados ===
const aprobadas = new Set();

// === Render dinámico ===
function render() {
  const cont = document.getElementById("malla");
  cont.innerHTML = "";

  let semestreActual = 1;
  let semestreDiv = crearSemestreDiv(semestreActual);

  malla.forEach((curso, index) => {
    if (index % 6 === 0 && index !== 0) {
      cont.appendChild(semestreDiv);
      semestreActual++;
      semestreDiv = crearSemestreDiv(semestreActual);
    }

    const habilitado = curso.prereqs.every(p => aprobadas.has(p));
    const aprobado = aprobadas.has(curso.id);

    const div = document.createElement("div");
    div.className = "curso";

    if (aprobado) {
      div.classList.add("aprobado");
    } else if (!habilitado) {
      div.classList.add("bloqueado");
    } else {
      div.classList.add("disponible");
    }

    div.innerText = curso.nombre;

    div.onclick = () => {
      if (habilitado || aprobado) {
        if (aprobado) {
          aprobadas.delete(curso.id);
        } else {
          aprobadas.add(curso.id);
        }
        render();
      }
    };

    semestreDiv.querySelector(".cursos").appendChild(div);
  });

  cont.appendChild(semestreDiv);
}

function crearSemestreDiv(n) {
  const semDiv = document.createElement("div");
  semDiv.className = "semestre";

  const h2 = document.createElement("h2");
  h2.innerText = `Semestre ${n}`;
  semDiv.appendChild(h2);

  const cursosDiv = document.createElement("div");
  cursosDiv.className = "cursos";
  semDiv.appendChild(cursosDiv);

  return semDiv;
}

render();


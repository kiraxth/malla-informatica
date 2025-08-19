// === Ramo con prerequisitos ===
const malla = {
  "I semestre": [
    { id: "fisica", nombre: "Introducción a la física", prereqs: [] },
    { id: "calculo1", nombre: "Cálculo I", prereqs: [] },
    { id: "algebra1", nombre: "Álgebra I", prereqs: [] },
    { id: "genero", nombre: "Identidad y equidad de género", prereqs: [] },
    { id: "ingles1", nombre: "Inglés I", prereqs: [] },
    { id: "comunicacion1", nombre: "Comunicación efectiva", prereqs: [] },
    { id: "proyecto1", nombre: "Proyecto: Introducción a la ingeniería", prereqs: [] }
  ],
  "II semestre": [
    { id: "mecanica", nombre: "Mecánica", prereqs: ["fisica", "calculo1"] },
    { id: "calculo2", nombre: "Cálculo II", prereqs: ["calculo1"] },
    { id: "algebra2", nombre: "Álgebra II", prereqs: ["algebra1"] },
    { id: "programacion", nombre: "Programación", prereqs: ["algebra1","proyecto1"] },
    { id: "dialogo1", nombre: "Diálogo, fe y cultura", prereqs: ["genero"] },
    { id: "ingles2", nombre: "Inglés II", prereqs: ["ingles1"] }
  ],
  "III semestre": [
    { id: "ecuaciones", nombre: "Ecuaciones diferenciales", prereqs: ["algebra2","calculo2"] },
    { id: "calculo3", nombre: "Cálculo III", prereqs: ["calculo2"] },
    { id: "quimica", nombre: "Química general", prereqs: [] },
    { id: "poo", nombre: "Programación orientada a objetos", prereqs: ["programacion"] },
    { id: "metodologias", nombre: "Técnicas y metodologías de programación avanzada", prereqs: ["programacion"] },
    { id: "comunicacion2", nombre: "Comunicación efectiva II", prereqs: ["comunicacion1"] },
    { id: "electivo1", nombre: "Formación general electiva", prereqs: [] }
  ],
  "IV semestre": [
    { id: "electromagnetismo", nombre: "Electromagnetismo", prereqs: ["mecanica","calculo3","algebra1"] },
    { id: "estadistica", nombre: "Estadística", prereqs: [] },
    { id: "sustentable", nombre: "Ingeniería y desarrollo sustentable", prereqs: [] },
    { id: "emprendimiento", nombre: "Emprendimiento", prereqs: [] },
    { id: "estructuras", nombre: "Estructuras de datos", prereqs: ["poo","metodologias"] },
    { id: "proyecto2", nombre: "Proyecto: Diseño e innovación", prereqs: ["proyecto1"] }
  ],
  "V semestre": [
    { id: "electrotecnia", nombre: "Electrotecnia", prereqs: ["ecuaciones","electromagnetismo"] },
    { id: "datascience", nombre: "Introducción a data science", prereqs: ["estadistica","estructuras","emprendimiento"] },
    { id: "digitales", nombre: "Diseño sistemas digitales", prereqs: ["algebra2"] },
    { id: "basedatos", nombre: "Base de datos", prereqs: ["estructuras","emprendimiento"] },
    { id: "electivoprof1", nombre: "Electivo profesional", prereqs: [] },
    { id: "proyecto3", nombre: "Proyecto: Integrador programación avanzada", prereqs: ["estructuras"] }
  ],
  "VI semestre": [
    { id: "arquitectura", nombre: "Arquitectura y organización de computadores", prereqs: ["digitales"] },
    { id: "fundamentos", nombre: "Fundamentos de la computación", prereqs: ["estructuras"] },
    { id: "desarrollo", nombre: "Introducción al desarrollo web/móvil", prereqs: ["basedatos"] },
    { id: "software", nombre: "Ingeniería de software", prereqs: ["estructuras"] },
    { id: "electivoprof2", nombre: "Electivo profesional", prereqs: [] },
    { id: "proyecto4", nombre: "Proyecto: Integrador de software", prereqs: ["proyecto3"] }
  ],
  "VII semestre": [
    { id: "sistinfo1", nombre: "Sistemas de información I", prereqs: ["basedatos"] },
    { id: "lenguajes", nombre: "Lenguajes de programación", prereqs: ["estructuras"] },
    { id: "algoritmos", nombre: "Diseño y análisis de algoritmos", prereqs: ["fundamentos"] },
    { id: "sistemasop", nombre: "Sistemas operativos", prereqs: ["arquitectura"] },
    { id: "electivoprof3", nombre: "Electivo profesional", prereqs: [] },
    { id: "dialogo2", nombre: "Diálogo, fe y ciencia", prereqs: ["dialogo1"] },
    { id: "proyecto5", nombre: "Proyecto: Integrador de plataformas", prereqs: ["proyecto4"] },
    { id: "practica", nombre: "Práctica profesional", prereqs: [] }
  ],
  "VIII semestre": [
    { id: "sistinfo2", nombre: "Sistemas de información II", prereqs: ["sistinfo1"] },
    { id: "gestionTI", nombre: "Gestión de proyectos TI", prereqs: ["sistinfo1"] },
    { id: "arquitecturas", nombre: "Arquitecturas de sistemas", prereqs: ["sistemasop"] },
    { id: "redes", nombre: "Redes de computadores", prereqs: ["sistemasop"] },
    { id: "electivoprof4", nombre: "Electivo profesional", prereqs: [] },
    { id: "etica", nombre: "Ética moral y profesional", prereqs: ["dialogo2"] },
    { id: "proyecto6", nombre: "Proyecto: Integrador gestión TI", prereqs: ["proyecto5"] }
  ],
  "IX semestre": [
    { id: "evaluacion", nombre: "Evaluación de proyectos TI", prereqs: ["sistinfo2","gestionTI"] },
    { id: "electivoprof5", nombre: "Electivo profesional", prereqs: [] },
    { id: "electivoprof6", nombre: "Electivo profesional", prereqs: [] },
    { id: "electivoprof7", nombre: "Electivo profesional", prereqs: [] },
    { id: "electivoprof8", nombre: "Electivo profesional", prereqs: [] },
    { id: "electivoprof9", nombre: "Electivo profesional", prereqs: [] }
  ],
  "X semestre": [
    { id: "capstone", nombre: "Capstone project", prereqs: ["practica"] }
  ]
};

// === Cursos aprobados ===
const aprobadas = new Set();

// === Render dinámico ===
function render() {
  const cont = document.getElementById("contenedor-malla");
  cont.innerHTML = "";

  Object.keys(malla).forEach(sem => {
    const col = document.createElement("div");
    col.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.innerText = sem;
    col.appendChild(titulo);

    malla[sem].forEach(curso => {
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

      col.appendChild(div);
    });

    cont.appendChild(col);
  });
}

render();

import { asignadosSN, misCursosEstudiante, cargarFacultades, asignaCursos} from './ui.js'
cargarFacultades()
asignadosSN()
document.getElementById('btnBusqueda').addEventListener('click', misCursosEstudiante)
document.getElementById('listaMisCursos').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-asignar')) {
    const codigoCurso = e.target.dataset.id
    asignaCursos(codigoCurso)
  }
})
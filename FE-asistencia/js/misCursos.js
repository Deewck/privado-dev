import { asignadosSN, misCursosEstudiante, cargarFacultades} from './ui.js'
cargarFacultades()
asignadosSN()
document.getElementById('btnBusqueda').addEventListener('click', misCursosEstudiante)
document.getElementById('listaMisCursos').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-asignar')) {
    const idCurso = e.target.dataset.id
  }
})
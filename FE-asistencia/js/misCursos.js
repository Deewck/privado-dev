if (!localStorage.getItem('token')) {
  window.location.href = '/view/login.html'
}
import { asignadosSN, misCursosEstudiante, cargarFacultades, asignaCursos, cerrarSesion} from './ui.js'
cargarFacultades()
asignadosSN()
cerrarSesion()
document.getElementById('btnBusqueda').addEventListener('click', misCursosEstudiante)
document.getElementById('listaMisCursos').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-asignar')) {
    const codigoCurso = e.target.dataset.id
    asignaCursos(codigoCurso)
  }
})
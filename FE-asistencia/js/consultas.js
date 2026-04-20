if (!localStorage.getItem('token')) {
  window.location.href = '/view/login.html'
}
import { cargarFacultades, cargarCiclos, cargarCursos, cerrarSesion } from './ui.js'

window.addEventListener('DOMContentLoaded', () => {
  cargarFacultades()
  cerrarSesion()
  document.getElementById('facultadSelect').addEventListener('change', cargarCiclos)
  document.getElementById('botonBusca').addEventListener('click', cargarCursos)
})
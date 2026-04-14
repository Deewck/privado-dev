import { cargarFacultades, cargarCiclos, cargarCursos } from './ui.js'

window.addEventListener('DOMContentLoaded', () => {
  cargarFacultades()
  document.getElementById('facultadSelect').addEventListener('change', cargarCiclos)
  document.getElementById('botonBusca').addEventListener('click', cargarCursos)
})
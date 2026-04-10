import { obtenerCursos } from './consultas.js'

export async function cargarCursosUI() {
  const facultad = document.getElementById('facultadSelect').value
  const ciclo = document.getElementById('cicloSelect').value

  const data = await obtenerCursos(facultad, ciclo)

  const lista = document.getElementById('listaCursos')
  lista.innerHTML = ''

  data.forEach(curso => {
    lista.innerHTML += `<li>${curso.descripcion}</li>`
  })
}
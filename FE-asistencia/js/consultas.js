import { fetchAPI } from './api.js'

export async function obtenerCursos(facultad, ciclo) {
  let url = `/consultas/cursos?`

  if (facultad) url += `facultad=${facultad}&`
  if (ciclo) url += `ciclo=${ciclo}`

  return await fetchAPI(url)
}
import { fetchAPI } from './api.js'

document.getElementById('btnAnalizar').addEventListener('click', async () => {
  const nombre = document.getElementById('nombre').value
  const total_clases = Number(document.getElementById('totalClases').value)
  const asistencias = Number(document.getElementById('asistencias').value)
  const resultado = document.getElementById('resultado')

  if (!nombre.trim() || !total_clases || asistencias < 0) {
    resultado.classList.remove('d-none')
    resultado.className = 'alert alert-danger mt-4'
    resultado.innerHTML = 'Complete todos los campos correctamente.'
    return
  }

  try {
    const data = await fetchAPI('/ia/analizar-asistencia', {
      method: 'POST',
      body: JSON.stringify({
        nombre,
        total_clases,
        asistencias
      })
    })

    resultado.classList.remove('d-none')
    resultado.className = 'alert alert-info mt-4'
    resultado.innerHTML = `
      <strong>Estudiante:</strong> ${nombre}<br>
      <strong>Porcentaje:</strong> ${data.porcentaje}%<br>
      <strong>Análisis:</strong> ${data.analisis}
    `
  } catch (error) {
    console.error(error)
    resultado.classList.remove('d-none')
    resultado.className = 'alert alert-danger mt-4'
    resultado.innerHTML = 'Error al analizar asistencia.'
  }
})
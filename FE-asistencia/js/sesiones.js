import { creaSesion, creaToken, mostrarQR, cerrarSesion } from './ui.js'

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('token')) {
    window.location.href = '/view/login.html'
    return
  }
  cerrarSesion()
  document.getElementById('botonSesion').addEventListener('click', creaSesion)
  document.getElementById('listaMisCursos').addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-crearSesion')) {
      const codigoCurso = e.target.dataset.id
      const tokenQR = await creaToken(codigoCurso)
      mostrarQR(tokenQR)
    }
  })

})
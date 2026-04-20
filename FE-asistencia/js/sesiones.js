if (!localStorage.getItem('token')) {
  window.location.href = '/view/login.html'
}
import { creaSesion, creaToken, mostrarQR } from './ui.js'
document.getElementById('botonSesion').addEventListener('click', creaSesion)
document.getElementById('listaMisCursos').addEventListener('click', async (e) => {
  if (e.target.classList.contains('btn-crearSesion')) {
    const codigoCurso = e.target.dataset.id
    const tokenQR = await creaToken(codigoCurso)
    mostrarQR(tokenQR)
  }
})
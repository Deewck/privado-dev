if (!localStorage.getItem('token')) {
  window.location.href = '/view/login.html'
}
import { asistencias, cerrarSesion } from './ui.js'
import { fetchAPI } from './api.js'

function iniciarScanner() {
  if (!window.Html5Qrcode) {
    alert('Librería QR no cargó')
    return
  }
  const html5QrCode = new window.Html5Qrcode("reader")
  const config = { fps: 10, qrbox: 250 }
  html5QrCode.start(
    { facingMode: "environment" },
    config,
    async (decodedText) => {
      console.log("QR leído:", decodedText)
      await marcarAsistencia(decodedText)
      html5QrCode.stop()
    },
    (errorMessage) => {
    }
  ).catch(err => {
    console.error("ERROR CAMARA:", err)
    alert("ERROR CAMARA: " + err)
  })
}
async function marcarAsistencia(token) {
  try {
    const data = await fetchAPI('/asistencias', {
      method: 'POST',
      body: JSON.stringify({ token })
    })
    console.log('Asistencia:', data)
    const modal = document.getElementById('asistenciaOK')
    modal.classList.remove('d-none')
    asistencias()
  } catch (err) {
    console.error(err)
    alert('Error al registrar asistencia')
  }
}
window.addEventListener('DOMContentLoaded', () => {
  asistencias()
  cerrarSesion()
  document.getElementById('btnScan').addEventListener('click', () => {
    iniciarScanner()
  })
  const modal = document.getElementById('asistenciaOK')
  document.getElementById('btnCerrar').addEventListener('click', () => {
    modal.classList.add('d-none')
  })
  document.getElementById('cerrarQR').addEventListener('click', () => {
    modal.classList.add('d-none')
  })
})
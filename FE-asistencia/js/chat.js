import { fetchAPI } from './api.js'
import { cerrarSesion } from './ui.js'
cerrarSesion()
const chat = document.getElementById('chat')
const input = document.getElementById('mensaje')

document.getElementById('enviar').addEventListener('click', async () => {
  const mensaje = input.value

  if (!mensaje.trim()) return

  chat.innerHTML += `<div><b>Tú:</b> ${mensaje}</div>`

  const data = await fetchAPI('/ia/chat', {
    method: 'POST',
    body: JSON.stringify({ mensaje })
  })

  chat.innerHTML += `<div><b>IA:</b> ${data.respuesta}</div><hr>`

  input.value = ''
  chat.scrollTop = chat.scrollHeight
})
const API = 'http://localhost:3000'

const TOKEN = 'TU_ACCESS_TOKEN'

async function crearSesion() {
  const codigoCurso = document.getElementById('codigoCurso').value

  const res = await fetch(`${API}/sesiones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({ codigoCurso })
  })

  const data = await res.json()
  if (data.token) {
    generarQR(data.token)
  } else {
    alert(JSON.stringify(data))
  }
}

function generarQR(token) {
  const canvas = document.getElementById('qr')
  QRCode.toCanvas(canvas, token)
}

async function registrarAsistencia() {
  const token = document.getElementById('tokenInput').value

  const res = await fetch(`${API}/asistencias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({ token })
  })

  const data = await res.json()

  document.getElementById('resultado').innerText =
    JSON.stringify(data, null, 2)
}
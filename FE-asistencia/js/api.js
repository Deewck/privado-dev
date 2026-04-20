export const API = ''

export async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/view/login.html'
    return
  }
  const res = await fetch(API + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    ...options
  })
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('token')
    window.location.href = '/view/login.html'
    return
  }
  if (!res.ok) {
    const text = await res.text()
    console.error('Error API:', text)
    throw new Error('Error en la API')
  }
  return res.json()
}
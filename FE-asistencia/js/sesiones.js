export const API = 'http://localhost:3000'

export async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    // ...options
  })

  return res.json()
}
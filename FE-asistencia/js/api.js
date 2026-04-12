export const API = 'http://localhost:3000'

export async function fetchAPI(endpoint, options = {}) {

  const token = localStorage.getItem('token')
  const res = await fetch(API + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    ...options
  })
  return res.json()
}
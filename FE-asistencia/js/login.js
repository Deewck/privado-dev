window.login = async function () {
  const emailInput = document.getElementById('usuario')
  const email = emailInput.value
  const passwordInput = document.getElementById('password')
  const password = passwordInput.value
  try {
    if (!email.trim()) {
  		emailInput.value = ''
  		emailInput.placeholder = 'Campo obligatorio'
  		emailInput.classList.add('is-invalid')
  		return
		} else {
			emailInput.classList.remove('is-invalid')
		}
    if (!password.trim()) {
  		passwordInput.value = ''
  		passwordInput.placeholder = 'Campo obligatorio'
  		passwordInput.classList.add('is-invalid')
  		return
		} else {
			passwordInput.classList.remove('is-invalid')
		}
    const res = await fetch('https://krkbhgonicjfrclsaeio.supabase.co/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'sb_publishable_u-o0r_RB34FYu6D_MdRD8A_DdJH30HC'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    console.log('LOGIN RESPONSE:', data)
    if (data.access_token) {
      localStorage.setItem('token', data.access_token)
      window.location.href = '../view/index.html'
    } else {
      alert('Credenciales incorrectas')
    }
  } catch (err) {
    console.error(err)
    alert('Error en login')
  }
}
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('confirmar').addEventListener('click', login)
})
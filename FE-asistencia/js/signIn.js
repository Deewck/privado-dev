window.singin = async function () {
  const emailInput = document.getElementById('email')
	const email = emailInput.value
  const passwordInput = document.getElementById('password')
	const password = passwordInput.value
  const primerNombreInput = document.getElementById('primerNombre')
  const primerNombre = primerNombreInput.value
	const segundoNombreInput = document.getElementById('segundoNombre')
	const segundoNombre = segundoNombreInput.value
	const masNombresInput = document.getElementById('masNombres')
	const masNombres = masNombresInput.value
	const primerApellidoInput = document.getElementById('primerApellido')
	const primerApellido = primerApellidoInput.value
	const segundoApellidoInput = document.getElementById('segundoApellido')
	const segundoApellido = segundoApellidoInput.value
	const carnetInput = document.getElementById('carnet')
	const carnet = carnetInput.value
	const rolSeleccionado = document.querySelector('input[name="tipoUsuario"]:checked')
	const rol = rolSeleccionado.value 
	const errorRol = document.getElementById('errorRol')
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
		if (!primerNombre.trim()) {
  		primerNombreInput.value = ''
  		primerNombreInput.placeholder = 'Campo obligatorio'
  		primerNombreInput.classList.add('is-invalid')
  		return
		} else {
			primerNombreInput.classList.remove('is-invalid')
		}
		if (!primerApellido.trim()) {
  		primerApellidoInput.value = ''
  		primerApellidoInput.placeholder = 'Campo obligatorio'
  		primerApellidoInput.classList.add('is-invalid')
  		return
		} else {
			primerApellidoInput.classList.remove('is-invalid')
		}
		if (!rolSeleccionado) {
  		errorRol.classList.remove('d-none')
  		return
		} else {
  		errorRol.classList.add('d-none') 
		}
		if (rol === 'ESTUDIANTE'&!carnet.trim()) {
  		carnetInput.value = ''
  		carnetInput.placeholder = 'Campo obligatorio'
  		carnetInput.classList.add('is-invalid')
  		return
		} else {
			carnetInput.classList.remove('is-invalid')
		}
    // const res = await fetch('https://krkbhgonicjfrclsaeio.supabase.co/auth/v1/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'apikey': 'sb_publishable_u-o0r_RB34FYu6D_MdRD8A_DdJH30HC'
    //   },
    //   body: JSON.stringify({ email, password })
    // })
    // const data = await res.json()
    // console.log('Sign In RESPONSE:', data)
    // if (data.access_token) {
    //   localStorage.setItem('token', data.access_token)
    //   window.location.href = '../view/index.html'
    // } else {
    //   alert('Credenciales incorrectas')
    // }
  } catch (err) {
    console.error(err)
    alert('Error al crear usuario')
  }
}
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('confirmar').addEventListener('click', singin)
})
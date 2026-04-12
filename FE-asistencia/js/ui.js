import { fetchAPI } from './api.js'
//Funcion para Cambo box de facultades
async function cargarFacultades() {
  try {
    const data = await fetchAPI('/consultas/facultades')
    console.log('FACULTADES:', data)
    const select = document.getElementById('facultadSelect')
    select.innerHTML = '<option value="">Seleccione...</option>'
    data.forEach(f => {
      const option = document.createElement('option')
      option.value = f.codigo
      option.textContent = f.codigo
      select.appendChild(option)
    })
  } catch (err) {
    console.error(err)
  }
}
//Funcion para Cambo box de ciclos
async function cargarCiclos() {
  try {
    const facultad = document.getElementById('facultadSelect').value
    const data = await fetchAPI(`/consultas/ciclos?facultad=${facultad}`)
    console.log('CICLOS:', data)
    const select = document.getElementById('cicloSelect')
    select.innerHTML = '<option value="">Seleccione...</option>'
    const ciclos = data[0].ciclos
    ciclos.forEach(c => {
      const option = document.createElement('option')
      option.value = c.codigo
      option.textContent = c.codigo
      select.appendChild(option)
    })
  } catch (err) {
    console.error(err)
  }
}
//Funcion para Cursos Con/sin filtro de ciclos
async function cargarCursos() {
  let data
  try {
    const facultad = document.getElementById('facultadSelect').value
    const ciclo = document.getElementById('cicloSelect').value
    if (ciclo) {
      data = await fetchAPI(`/consultas/cursos?facultad=${facultad}&ciclo=${ciclo}`)
    } else {
      data = await fetchAPI(`/consultas/cursos?facultad=${facultad}`)
    }
    console.log('Cursos:', data)
    const select = document.getElementById('listaCursos')
    select.innerHTML = '<div class="list-group-item fw-bold"> <div class="d-flex justify-content-between"> <span>Código</span> <span>Descripción</span> </div> </div>'
    data.forEach(f => {
      const li = document.createElement('li')
      li.classList.add('list-group-item')
      li.value = f.codigo
      li.innerHTML = `
        <div class="d-flex justify-content-between">
          <span>${f.codigo}</span>
          <span>${f.descripcion}</span>
        </div>
      `
      select.appendChild(li)
    })
  } catch (err) {
    console.error(err)
  }
}
window.addEventListener('DOMContentLoaded', () => {
  cargarFacultades()
  document.getElementById('facultadSelect').addEventListener('change', cargarCiclos) 
  document.getElementById('botonBusca').addEventListener('click', cargarCursos)
})
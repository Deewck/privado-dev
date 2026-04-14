import { fetchAPI } from './api.js'
//Funcion para Cambo box de facultades
export async function cargarFacultades() {
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
export async function cargarCiclos() {
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
export async function cargarCursos() {
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
export async function asignadosSN() {
  try {
    const radio = document.getElementById('asignado')
    radio.addEventListener('click', function () {
      if (this.checked && this.dataset.checked === 'true') {
        this.checked = false
        this.dataset.checked = 'false'
      } else {
        this.dataset.checked = 'true'
      }
    })
  } catch (err) {
    console.error(err)
  }
}
export async function misCursosEstudiante() {
  let data
  try {
    const radio = document.getElementById('asignado')
    let asignado = null
    let estado = null
    let corr = 1
    if (radio.checked) {
      asignado = radio.value
    }
    if (asignado) {
      estado = 'Asignado'
      data = await fetchAPI(`/consultas/cursoInscripcion?estado=${asignado}`)
    } else {
      asignado = 'no_asignados'
      estado = 'Asignar'
      data = await fetchAPI(`/consultas/cursoInscripcion?estado=${asignado}`)
    }
    console.log('Mis-Cursos:', data)
    const select = document.getElementById('listaMisCursos')
    select.innerHTML = `
      <div class="list-group-item fw-bold">
        <div class="row text-center">
          <div class="col-1">Ciclo</div>
          <div class="col-1">Código</div>
          <div class="col-4 text-start">Descripción</div>
          <div class="col-6 text-start">Estado</div>
        </div>
      </div>
    `
    data.forEach(ciclo => {
      ciclo.cursos.forEach(curso => {
        const li = document.createElement('li')
        li.classList.add('list-group-item')
        if (estado === 'Asignado') {
          li.innerHTML = `
          <div class="row text-center">
            <div class="col-1">${ciclo.codigo}</div>
            <div class="col-1">${curso.codigo}</div>
            <div class="col-4 text-start">${curso.descripcion}</div>
            <div class="col-6 text-start">
              <button id="btnBusqueda" class="btn btn-success w-10">${estado}</button>
            </div>
          </div>
        `
        } else if (estado === 'Asignar') { 
          li.innerHTML = `
          <div class="row text-center">
            <div class="col-1">${ciclo.codigo}</div>
            <div class="col-1">${curso.codigo}</div>
            <div class="col-4 text-start">${curso.descripcion}</div>
            <div class="col-6 text-start">
              <button data-id="${curso.idCurso}" class="btn btn-danger btn-asignar w-10">${estado}</button>
            </div>
          </div>
        `
        }
      select.appendChild(li)
    })
  })
  } catch (err) {
    console.error(err)
  }
}
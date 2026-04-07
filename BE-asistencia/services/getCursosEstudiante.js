import supabase from './supabaseClient.js'

export const obtenerInscripciones = async (user, estado) => {
  const idEstudiante = user.idUsuario
  if (estado === 'asignados') {
    const { data, error } = await supabase
      .from('ciclos')
      .select('codigo, descripcion, cursos (codigo, descripcion, inscripciones(idEstudiante))')
      .eq('inscripciones.idEstudiante', idEstudiante)
    if (error) throw error
    const inscripcionesFiltradas = data.filter(c => c.inscripciones.length > 0)
    return inscripcionesFiltradas
  }
//   if (estado === 'no_asignados') {
//     const { data, error } = await supabase
//       .from('ciclos')
//       .select('codigo, descripcion, cursos (codigo, descripcion)')
//       .is('cursos.idCatedratico', null)
//     if (error) throw error
//     const inscripcionesFiltradas = data.filter(c => c.inscripciones.length > 0)
//     return inscripcionesFiltradas
//   }
}
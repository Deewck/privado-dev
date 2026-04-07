import supabase from '../services/supabaseClient.js'

export const obtenerInscripciones = async (user, estado) => {
  const idEstudiante = user.idUsuario
  if (estado === 'asignados') {
    const { data, error } = await supabase
      .from('ciclos')
      .select(`
        codigo,
        descripcion,
        cursos (
          codigo,
          descripcion,
          inscripciones (idEstudiante)
        )
      `)
      .eq('cursos.inscripciones.idEstudiante', idEstudiante)
    if (error) throw error
    const resultado = data
      .map(ciclo => ({
        codigo: ciclo.codigo,
        descripcion: ciclo.descripcion,
        cursos: ciclo.cursos
          .filter(curso => curso.inscripciones.length > 0)
          .map(curso => ({
            codigo: curso.codigo,
            descripcion: curso.descripcion
          }))
      }))
      .filter(ciclo => ciclo.cursos.length > 0)
    return resultado
  }
}
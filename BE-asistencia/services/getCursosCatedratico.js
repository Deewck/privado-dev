import supabase from '../services/supabaseClient.js'

export const obtenerCursos = async (user, estado) => {
  const idCatedratico = user.idUsuario
  if (estado === 'asignados') {
    const { data, error } = await supabase
      .from('ciclos')
      .select('codigo, descripcion, cursos (codigo, descripcion)')
      .eq('cursos.idCatedratico', idCatedratico)
    if (error) throw error
    const ciclosFiltrados = data.filter(c => c.cursos.length > 0)
    return ciclosFiltrados
  }
  if (estado === 'no_asignados') {
    const { data, error } = await supabase
      .from('ciclos')
      .select('codigo, descripcion, cursos (codigo, descripcion)')
      .is('cursos.idCatedratico', null)
    if (error) throw error
    const ciclosFiltrados = data.filter(c => c.cursos.length > 0)
    return ciclosFiltrados
  }
}
import supabase from '../services/supabaseClient.js'

export const obtenerAsistencia = async (user, estado) => {
  const idEstudiante = user.idUsuario
  const { data, error } = await supabase
    .from('porcentaje_asistencias')
    .select('*')
    .eq('idEstudiante', idEstudiante)
  if (error) throw error
  return data
  
}
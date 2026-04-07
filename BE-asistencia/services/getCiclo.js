import supabase from '../services/supabaseClient.js'

export const obtenerCiclo = async (user, facultad) => {
  const idUser = user.idUsuario
  const { data, error } = await supabase
    .from('facultades')
    .select('codigo, descripcion, ciclos (codigo, descripcion)')
    .eq('codigo', facultad)
  if (error) throw error
  return data
}
import supabase from '../services/supabaseClient.js'

export const obtenerFacultad = async (user) => {
  const idUser = user.idUsuario
  const { data, error } = await supabase
    .from('facultades')
    .select('codigo, descripcion')
  if (error) throw error
  return data
}
import supabase from '../services/supabaseClient.js'

export const obtenerRol = async (user) => {
  const idUser = user.idUsuario
  const { data, error } = await supabase
    .from('roles')
    .select('codigo, descripcion')
  if (error) throw error
  return data
}
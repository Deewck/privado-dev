import supabase from '../services/supabaseClient.js'

export const miRol = async (user) => {
  const idUsuario = user.idUsuario
  const { data, error } = await supabase
    .from('usuarios')
    .select('roles (codigo)')
    .eq('idUsuario', idUsuario)
  if (error) throw error
  return data
}
import supabase from '../services/supabaseClient.js'

export const obtenerRol = async (codigo) => {
  if (!codigo) {
    const { data, error } = await supabase
    .from('roles')
    .select('codigo, descripcion, idRol')
    if (error) throw error
    return data
  } else {
    const { data, error } = await supabase
    .from('roles')
    .select('codigo, descripcion, idRol')
    .eq('codigo', codigo)
    if (error) throw error
    console.log(codigo)
    return data
  }
}
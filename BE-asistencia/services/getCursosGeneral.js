import supabase from '../services/supabaseClient.js'

export const obtenerCursosGeneral = async (user, facultad, ciclo) => {
  if (!facultad) {
    throw new Error('Error.- Facultad no encontrada o no se envió')
  }
  const { data, error } = await supabase
    .from('facultades')
    .select('idFacultad')
    .eq('codigo', facultad)
  if (error) throw error
  const idFacultad = data[0].idFacultad
  if (!ciclo) {
    const { data, error } = await supabase
      .from('vl_cursos_filtros')
      .select('codigo, descripcion')
      .eq('idFacultad', idFacultad)
    if (error) throw error
    return data
  } else {
    const { data: dataCiclo, error: errorCiclo } = await supabase
      .from('ciclos')
      .select('idCiclo')
      .eq('codigo', ciclo)
    if (errorCiclo) throw errorCiclo
    const idCiclo = dataCiclo[0].idCiclo
    const { data, error } = await supabase
      .from('vl_cursos_filtros')
      .select('codigo, descripcion')
      .eq('idCiclo', idCiclo)
    if (error) throw error
    return data
  }
}
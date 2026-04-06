import supabase from '../services/supabaseClient.js'

export const cursosCatedratico = (idCurso, estadoAsignacion) => {
  return async (req, res, next) => {
    try{
      const {idRol} = req.user
      const {data: dataRol, error } = await supabase
        .from('roles')
        .select('codigo')
        .eq('idRol', idRol)
        .maybeSingle()
    if (error) throw error
    if (!dataRol) {
      return res.status(404).json({ error: 'Error.- Rol no encontrado' })
    }
    if (dataRol.codigo !== rolEsperado){
      return res.status(403).json({ error: `Error.- Se requiere el rol ${rolEsperado}` })
    }
    next()
    } catch (err) {    
      console.log('ROL ERROR:', err)
      res.status(500).json({ error: 'Error.- En rol' })
    }
  }
}
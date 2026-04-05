import supabase from '../services/supabaseClient.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const jwt = authHeader?.split(' ')[1]
    if (!jwt) {
      return res.status(401).json({ error: 'Error.- No auotrizado' })
    }
    const { data, error } = await supabase.auth.getUser(jwt)
    if (error || !data?.user) {
      return res.status(401).json({ error: 'Error.- Token inválido' })
    }
    const { data: usuarioDB, error: errorUsuario } = await supabase
      .from('usuarios')
      .select('idUsuario, idRol, email')
      .eq('email', data.user.email)
      .maybeSingle()
    if (errorUsuario) throw errorUsuario
    if (!usuarioDB) {
      return res.status(404).json({ error: 'Error.- Usuario no encontrado' })
    }
    req.user = usuarioDB
    next()
  } catch (err) {
    console.log('AUTH ERROR:', err)
    res.status(500).json({ error: 'Error.- En autenticación' })
  }
}
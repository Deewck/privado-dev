import express from 'express'
import supabase from '../services/supabaseClient.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/asistencias', authMiddleware, async (req, res) => {
  try {
    const { token } = req.body
    if (!token) {
      return res.status(400).json({ error: 'Error.- Token es requerido' })
    }
    const { idUsuario, idRol } = req.user
    const { data: dataRol, error: errorRol } = await supabase
      .from('roles')
      .select('codigo')
      .eq('idRol', idRol)
      .maybeSingle()
    if (errorRol) throw errorRol
    if (!dataRol) {
      return res.status(404).json({ error: 'Error.- Rol no encontrado' })
    }
    if (dataRol.codigo !== 'ESTUDIANTE') {
      return res.status(403).json({ error: 'Error.- Solo estudiantes pueden registrar asistencia' })
    }
    const idEstudiante = idUsuario
    const { data: sesion, error: errorSesion } = await supabase
      .from('sesiones')
      .select('idSesion, estado, expiraEn')
      .eq('token', token)
      .maybeSingle()
    if (errorSesion) throw errorSesion
    if (!sesion) {
      return res.status(404).json({ error: 'Error.- Sesión no encontrada' })
    }
    if (!sesion.estado) {
      return res.status(400).json({ error: 'Error.- Sesión no activa' })
    }
    const ahora = new Date()
    const expira = new Date(sesion.expiraEn)
    if (expira < ahora) {
      return res.status(400).json({ error: 'Error.- Sesión expirada' })
    }
    const { data: existente, error: errorDuplicado } = await supabase
      .from('asistencias')
      .select('idAsistencia')
      .eq('idSesion', sesion.idSesion)
      .eq('idEstudiante', idEstudiante)
      .maybeSingle()
    if (errorDuplicado) throw errorDuplicado
    if (existente) {
      return res.status(400).json({ error: 'Error.- Asistencia ya registrada' })
    }
    const { error: errorInsert } = await supabase
      .from('asistencias')
      .insert({
        idSesion: sesion.idSesion,
        idEstudiante: idEstudiante
      })

    if (errorInsert) throw errorInsert
    res.json({
      mensaje: 'Asistencia registrada correctamente'
    })
  } catch (err) {
    console.log('CATCH:', err)
    res.status(500).json({ error: 'Error.- Revisar mensajes' })
  }
})

export default router
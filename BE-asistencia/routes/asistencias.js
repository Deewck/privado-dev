import express from 'express'
import supabase from '../services/supabaseClient.js'

const router = express.Router()

router.post('/asistencias', async (req, res) => {
  try {
    const { token, idEstudiante } = req.body
    if (!token || !idEstudiante) {
      return res.status(400).json({ error: 'Error.- Token e idEstudiante son requeridos' })
    }
    const { data: sesion, error: errorSesion } = await supabase
      .from('sesiones')
      .select('idSesion')
      .eq('token', token)
      .eq('estado', true)
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
      .select('id')
      .eq('idSesion', sesion.id)
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
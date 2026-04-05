import express from 'express'
import supabase from '../services/supabaseClient.js'

const router = express.Router()

router.post('/sesiones', async (req, res) => {
  try {
    const { idCurso } = req.body

    if (!idCurso) {
      return res.status(400).json({ error: 'idCurso es requerido' })
    }

    const token = Math.random().toString(36).substring(2, 10)
    const ahora = new Date()
    const expira = new Date(Date.now() + 60000) // 1 minuto
    const { data, error } = await supabase
    
    .from('sesiones')
    .insert([
      {
        idCurso: idCurso,
        token: token,
        estado: true,
        fechaInicio: ahora,
        expiraEn: expira
      }
    ])
    .select()

    if (error) {
      console.log(error)
      return res.status(500).json({ error })
    }

    res.json({
      mensaje: 'Sesión creada',
      token: token,
      expiraEn: expira
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error interno' })
  }
})

export default router
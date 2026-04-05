import express from 'express'
import supabase from '../services/supabaseClient.js'

const router = express.Router()

router.post('/sesiones', async (req, res) => {
  try {
    const { codigoCurso } = req.body
    
    if (!codigoCurso) {
      return res.status(400).json({ error: 'Curso es requerido o no se encontró' })
    }
    const { data: curso, error: errorCurso } = await supabase
      .from('cursos')
      .select('idCurso')
      .eq('codigo', codigoCurso)
      .single()
    if (errorCurso || !curso) {
      console.log(errorCurso)
      return res.status(400).json({ error: 'Curso no encontrado' })
    }
    const token = Math.random().toString(36).substring(2, 10)
    const ahora = new Date()
    const expira = new Date(Date.now() + 60000) // 1 minuto ms
    const { error: errorInsert } = await supabase
      .from('sesiones')
      .insert({
        idCurso: curso.idCurso,
        token: token,
        estado: true,
        fechaInicio: ahora,
        expiraEn: expira
      }
    )
    if (errorInsert) {
      console.log(errorInsert)
      return res.status(500).json({ error: 'Error al crear sesión' })
    }

    res.json({
      mensaje: 'Sesión creada',
      token: token,
      expiraEn: expira
    })

  } catch (err) {
    console.log('CATCH:', err)
    res.status(500).json({ error: 'Error interno' })
  }
})

export default router
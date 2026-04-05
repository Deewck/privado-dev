import express from 'express'
import supabase from '../services/supabaseClient.js'

const router = express.Router()

router.post('/sesiones', async (req, res) => {
  try {
    const { codigoCurso } = req.body
    
    if (!codigoCurso) {
      return res.status(400).json({ error: 'Error.- Curso es requerido' })
    }
    const { data: curso, error } = await supabase
      .from('cursos')
      .select('idCurso')
      .eq('codigo', codigoCurso)
      .maybeSingle()
    if (error) {
      console.log(error)
      return res.status(500).json({ error: 'Error.- Curso no se encontró' })
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
      return res.status(500).json({ error: 'Error.- No se creó la sesión' })
    }

    res.json({
      mensaje: 'Sesión creada',
      token: token,
      expiraEn: expira
    })

  } catch (err) {
    console.log('CATCH:', err)
    res.status(500).json({ error: 'Error.- Revisar mensajes' })
  }
})

export default router
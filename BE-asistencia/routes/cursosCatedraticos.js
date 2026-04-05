import express              from 'express'
import supabase             from '../services/supabaseClient.js'
import {validarRol}         from '../middleware/validarRol.js'
import { authMiddleware }   from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/cursosCatedraticos', authMiddleware, validarRol('CATEDRATICO'), async (req, res) => {
  try{  
    const {codigoCurso} = req.body
    const idCatedratico = req.user.idUsuario
    if (!codigoCurso) {
      return res.status(400).json({ error: 'Error.- Curso es requerido' })
    }
    const {data: dataCurso, error } = await supabase
      .from('cursos')
      .select('idCurso')
      .eq('codigo', codigoCurso)
      .maybeSingle()
    if (error) throw error
    if (!dataCurso) {
      return res.status(404).json({ error: 'Error.- Curso no encontrado' })
    }
    const { error: errorUpdate } = await supabase
      .from('cursos')
      .update({
        idCatedratico: idCatedratico
        })
      .eq('idCurso', dataCurso.idCurso)
    if (errorUpdate) throw errorUpdate
    res.json({
      mensaje: `Catedrático asignado; Curso: ${codigoCurso}`
    })
  } catch (err) {
    console.log('CATCH:', err)
    res.status(500).json({ error: 'Error.- Revisar mensajes' })
  }
})
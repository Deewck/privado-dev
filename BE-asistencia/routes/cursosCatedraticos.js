import express                        from 'express'
import supabase                       from '../services/supabaseClient.js'
import { authMiddleware }             from '../middleware/authMiddleware.js'
import { validarRol }                 from '../middleware/rolMiddleware.js'
const router = express.Router()

router.post('/cursos/asignar-catedratico', authMiddleware, validarRol('CATEDRATICO'), async (req, res) => {
  try{  
    const {codigoCurso} = req.body
    const idCatedratico = req.user.idUsuario
    if (!codigoCurso) {
      return res.status(400).json({ error: 'Error.- Curso es requerido' })
    }
    const {data: dataCurso, error } = await supabase
      .from('cursos')
      .select('idCurso, descripcion, idCatedratico')
      .eq('codigo', codigoCurso)
      .maybeSingle()
    if (error) throw error
    if (!dataCurso) {
      return res.status(404).json({ error: 'Error.- Curso no encontrado' })
    }
    if (dataCurso.idCatedratico === idCatedratico) {
      return res.status(400).json({
        error: 'Error.- Ya tienes asignado este curso'
      })
    }
    if (dataCurso.idCatedratico) {
      return res.status(400).json({
        error: 'Error.- El curso ya tiene un catedrático asignado'
      })
    }
    const { error: errorUpdate } = await supabase
      .from('cursos')
      .update({
        idCatedratico: idCatedratico
        })
      .eq('idCurso', dataCurso.idCurso)
    if (errorUpdate) throw errorUpdate
    res.json({
    mensaje: 'Catedrático asignado correctamente',
        curso: {
        codigo: codigoCurso,
        descripcion: dataCurso.descripcion
      }
    })
  } catch (err) {
    console.log('CATCH:', err)
    res.status(500).json({ error: 'Error.- Revisar mensajes' })
  }
})

export default router
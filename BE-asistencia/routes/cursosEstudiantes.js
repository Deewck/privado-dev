import express                        from 'express'
import supabase                       from '../services/supabaseClient.js'
import { authMiddleware }             from '../middleware/authMiddleware.js'
import { validarRol }                 from '../middleware/rolMiddleware.js'
const router = express.Router()

router.post('/cursos/asignar-estudiante', authMiddleware, validarRol('ESTUDIANTE'), async (req, res) => {
  try{  
    const {codigoCurso} = req.body
    const idEstudiante = req.user.idUsuario
    if (!codigoCurso) {
      return res.status(400).json({ error: 'Error.- Curso es requerido' })
    }
    const {data: dataCurso, error } = await supabase
      .from('cursos')
      .select('idCurso, descripcion')
      .eq('codigo', codigoCurso)
      .maybeSingle()
    if (error) throw error
    if (!dataCurso) {
      return res.status(404).json({ error: 'Error.- Curso no encontrado' })
    }
    const {data: dataInscripcion, errorInscripcion } = await supabase
      .from('inscripciones')
      .select('*')
      .eq('idCurso, idEstudiante', dataCurso.idCurso, idEstudiante)
      .maybeSingle()
    if (errorInscripcion) throw errorInscripcion
    if (dataInscripcion) {
      return res.status(404).json({ error: 'Error.- Ya tienes este asignado este curso' })
    }
    const { error: errorInsert } = await supabase
      .from('inscripciones')
      .insert({
          idCurso: dataCurso.idCurso,
          idEstudiante: idEstudiante
        })
    if (errorInsert) throw errorInsert
    res.json({
      mensaje: 'Estudiante asignado correctamente',
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
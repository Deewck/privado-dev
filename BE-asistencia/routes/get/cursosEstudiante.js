import express                    from 'express'
import { authMiddleware }         from '../../middleware/authMiddleware.js'
import { validarRol }             from '../../middleware/rolMiddleware.js'
import { obtenerInscripciones }   from '../../services/getCursosEstudiante.js'

const router = express.Router()

router.get('/cursoInscripcion', authMiddleware, validarRol('ESTUDIANTE'), async (req, res) => {
  const data = await obtenerInscripciones(req.user, req.query.estado)
  res.json(data)
})
export default router
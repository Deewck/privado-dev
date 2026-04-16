import express               from 'express'
import { authMiddleware }    from '../../middleware/authMiddleware.js'
import { validarRol }        from '../../middleware/rolMiddleware.js'
import { obtenerAsistencia } from '../../services/getAsistencia.js'

const router = express.Router()

router.get('/asistencia', authMiddleware, validarRol('ESTUDIANTE'), async (req, res) => {
  const data = await obtenerAsistencia(req.user)
  res.json(data)
})
export default router
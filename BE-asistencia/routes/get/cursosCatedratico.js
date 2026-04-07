import express             from 'express'
import { authMiddleware }  from '../../middleware/authMiddleware.js'
import { validarRol }      from '../../middleware/rolMiddleware.js'
import { obtenerCursos }   from '../../services/getCursosCatedratico.js'

const router = express.Router()

router.get('/mis-cursos', authMiddleware, validarRol('CATEDRATICO'), async (req, res) => {
  const data = await obtenerCursos(req.user, req.query.estado)
  res.json(data)
})
export default router
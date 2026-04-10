import express                  from 'express'
import { authMiddleware }       from '../../middleware/authMiddleware.js'
import { obtenerCursosGeneral } from '../../services/getCursosGeneral.js'

const router = express.Router()

router.get('/cursos', authMiddleware, async (req, res) => {
  const data = await obtenerCursosGeneral(req.user, req.query.facultad, req.query.ciclo)
  res.json(data)
})
export default router
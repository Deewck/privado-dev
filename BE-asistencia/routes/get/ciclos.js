import express             from 'express'
import { authMiddleware }  from '../../middleware/authMiddleware.js'
import { obtenerCiclo }    from '../../services/getCiclo.js'

const router = express.Router()

router.get('/ciclos', authMiddleware, async (req, res) => {
  const data = await obtenerCiclo(req.user, req.query.facultad)
  res.json(data)
})
export default router
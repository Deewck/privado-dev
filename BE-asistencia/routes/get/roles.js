import express               from 'express'
import { authMiddleware }    from '../../middleware/authMiddleware.js'
import { obtenerRol }        from '../../services/getRol.js'

const router = express.Router()

router.get('/roles', authMiddleware, async (req, res) => {
  const data = await obtenerRol(req.user)
  res.json(data)
})
export default router
import express               from 'express'
import { miRol }             from '../../services/getMiRol.js'
import { authMiddleware }    from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/mi-rol', authMiddleware, async (req, res) => {
  const data = await miRol(req.user)
  res.json(data)
})
export default router
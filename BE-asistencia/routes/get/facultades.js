import express               from 'express'
import { authMiddleware }    from '../../middleware/authMiddleware.js'
import { obtenerFacultad }   from '../../services/getFacultad.js'

const router = express.Router()

router.get('/facultades', authMiddleware, async (req, res) => {
  const data = await obtenerFacultad(req.user)
  res.json(data)
})
export default router
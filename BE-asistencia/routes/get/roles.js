import express               from 'express'
import { obtenerRol }        from '../../services/getRol.js'

const router = express.Router()

router.get('/roles', async (req, res) => {
  const data = await obtenerRol(req.query.codigo)
  res.json(data)
})
export default router
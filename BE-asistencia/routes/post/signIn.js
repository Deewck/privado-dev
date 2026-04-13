import express  from 'express'
import supabase from '../../services/supabaseClient.js'

const router = express.Router()
router.post('/crear-usuario', async (req, res) => {
  try {
    const { idRol, nombreCompleto, carnet, email } = req.body
    if (!idRol) {
      return res.status(400).json({ error: 'Error.- Rol es requerido' })
    }
    if (!nombreCompleto) {
      return res.status(400).json({ error: 'Error.- Nombre se requiere' })
    }
    if (!email) {
      return res.status(400).json({ error: 'Error.- Correo es requerido' })
    }
    if (idRol === 1 && !carnet){
      return res.status(400).json({ error: 'Error.- Carnet es requerido' })
    }
    const { error: errorInsert } = await supabase
      .from('usuarios')
      .insert({
        idRol: idRol,
        nombreCompleto: nombreCompleto,
        carnet: carnet?.trim() || null,
        email: email 
      })
      if (errorInsert) throw errorInsert
    if (errorInsert) {
      console.log(errorInsert)
      return res.status(500).json({ error: 'Error.- El usuario presenta errores, verificar data' })
    }
    res.json({
      mensaje: 'Usuario creado exitosamente',
    })

  } catch (err) {
    console.log('CATCH:', err)
    res.status(500).json({ error: 'Error.- Revisar mensajes' })
  }
})
export default router
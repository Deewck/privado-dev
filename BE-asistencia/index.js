import express            from 'express'
import supabase           from './services/supabaseClient.js'
import sesionesRoutes     from './routes/sesiones.js'
import asistenciasRoutes  from './routes/asistencias.js'
import cursosCatedraticos from './routes/cursosCatedraticos.js'
import cursosRouter       from './routes/cursos.js'

const app = express()

app.use(express.json())
app.use(sesionesRoutes)
app.use(asistenciasRoutes)
app.use(cursosCatedraticos)
app.use('/cursos', cursosRouter)
app.get('/test', async (req, res) => {
  const { data, error } = await supabase
    .from('roles')
    .select('codigo, descripcion')

  if (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
  res.json(data)
})

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000')
})
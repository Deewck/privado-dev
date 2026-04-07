import 'dotenv/config'
import express            from 'express'
import sesionesRoutes     from './routes/sesiones.js'
import asistenciasRoutes  from './routes/asistencias.js'
import cursosCatedraticos from './routes/cursosCatedraticos.js'
import cursosEstudiantes  from './routes/cursosEstudiantes.js'
import cursosRouter       from './routes/cursos.js'
import ciclosRouter       from './routes/ciclos.js'
import facultadesRouter   from './routes/facultades.js'
import rolesRouter        from './routes/roles.js'

const app = express()

app.use(express.json())
app.use(sesionesRoutes)
app.use(asistenciasRoutes)
app.use(cursosCatedraticos)
app.use(cursosEstudiantes)
app.use('/consultas', cursosRouter)
app.use('/consultas', ciclosRouter)
app.use('/consultas', facultadesRouter)
app.use('/consultas', rolesRouter)

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000')
})
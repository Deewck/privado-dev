import 'dotenv/config'
import express                 from 'express'
import sesionesRoutes          from './routes/post/sesiones.js'
import asistenciasRoutes       from './routes/post/asistencias.js'
import cursosCatedraticos      from './routes/post/cursosCatedraticos.js'
import cursosEstudiantes       from './routes/post/cursosEstudiantes.js'
import cursosCatedraticoRouter from './routes/get/cursosCatedratico.js'
import cursosEstudianteRouter  from './routes/get/cursosEstudiante.js'
import ciclosRouter            from './routes/get/ciclos.js'
import facultadesRouter        from './routes/get/facultades.js'
import rolesRouter             from './routes/get/roles.js'

const app = express()

app.use(express.json())
app.use(sesionesRoutes)
app.use(asistenciasRoutes)
app.use(cursosCatedraticos)
app.use(cursosEstudiantes)
app.use('/consultas', cursosCatedraticoRouter)
app.use('/consultas', cursosEstudianteRouter)
app.use('/consultas', ciclosRouter)
app.use('/consultas', facultadesRouter)
app.use('/consultas', rolesRouter)

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000')
})
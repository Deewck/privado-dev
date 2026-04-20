  import 'dotenv/config'
  import express                 from 'express'
  import cors                    from 'cors'
  import sesionesRoutes          from './routes/post/sesiones.js'
  import signIn                  from './routes/post/signIn.js'
  import asistenciasRoutes       from './routes/post/asistencias.js'
  import cursosCatedraticos      from './routes/post/cursosCatedraticos.js'
  import cursosEstudiantes       from './routes/post/cursosEstudiantes.js'
  import cursosCatedraticoRouter from './routes/get/cursosCatedratico.js'
  import cursosEstudianteRouter  from './routes/get/cursosEstudiante.js'
  import ciclosRouter            from './routes/get/ciclos.js'
  import facultadesRouter        from './routes/get/facultades.js'
  import rolesRouter             from './routes/get/roles.js'
  import cursosRouter            from './routes/get/cursosGlobal.js'
  import miRolRouter             from './routes/get/miRol.js'
  import asitenciasEstudiante    from './routes/get/asistencias.js'

  const app = express()
  app.use(express.static('FE-asistencia'))
  app.use(cors())
  app.use(express.json())
  app.use(sesionesRoutes)
  app.use(asistenciasRoutes)
  app.use(cursosCatedraticos)
  app.use(cursosEstudiantes)
  app.use(signIn)
  app.use('/consultas', asitenciasEstudiante)
  app.use('/consultas', cursosCatedraticoRouter)
  app.use('/consultas', cursosEstudianteRouter)
  app.use('/consultas', miRolRouter)
  app.use('/consultas', ciclosRouter)
  app.use('/consultas', facultadesRouter)
  app.use('/consultas', rolesRouter)
  app.use('/consultas', cursosRouter)

  app.listen(3000, '0.0.0.0',() => {
    console.log('Servidor corriendo en puerto 3000')
  })
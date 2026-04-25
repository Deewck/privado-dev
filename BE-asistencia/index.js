  import 'dotenv/config'
  import express                 from 'express'
  import cors                    from 'cors'
  import path                    from 'path'
  import { fileURLToPath }       from 'url'
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

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(express.static(path.join(__dirname, '../FE-asistencia')))
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
  app.post('/ia/analizar-asistencia', async (req, res) => {
  const { nombre, total_clases, asistencias } = req.body
    const porcentaje = (asistencias / total_clases) * 100
    let analisis = ''
    if (porcentaje >= 80) {
      analisis = 'Alta asistencia, buen desempeño.'
    } else if (porcentaje >= 60) {
      analisis = 'Asistencia regular, se recomienda mejorar.'
    } else {
      analisis = 'Baja asistencia, riesgo académico.'
    }
    res.json({
      porcentaje,
      analisis
    })
  })
  app.post('/ia-chat', (req, res) => {
    const { mensaje } = req.body
    let respuesta = ''
    const msg = mensaje.toLowerCase()
    if (msg.includes('baja asistencia')) {
      respuesta = 'La baja asistencia indica riesgo académico. Se recomienda contactar al estudiante y dar seguimiento.'
    } else if (msg.includes('recomendacion') || msg.includes('mejorar')) {
      respuesta = 'Se recomienda motivar al estudiante, controlar asistencia por sesión y aplicar seguimiento temprano.'
    } else if (msg.includes('50') || msg.includes('porcentaje')) {
      respuesta = 'Un 50% de asistencia se considera bajo. El estudiante podría reprobar si no mejora.'
    } else if (msg.includes('analiza')) {
      respuesta = 'Para analizar asistencia, se calcula el porcentaje y se clasifica en alto, medio o bajo.'
    } else {
      respuesta = 'Puedo ayudarte a analizar asistencia, riesgos académicos o recomendaciones. Intenta preguntar algo relacionado.'
    }
    res.json({ respuesta })
  })
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../FE-asistencia/view/login.html'))
  })
  const PORT = process.env.PORT || 3000
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
  })
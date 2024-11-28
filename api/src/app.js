import express from 'express'
import userRoutes from './routes/users.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import { createTasksTable } from './models/tasks.model.js'
import { createUsersTable } from './models/users.model.js'

const app = express()

createUsersTable()
createTasksTable()

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(express.json())

app.use(userRoutes)
app.use(tasksRoutes)

// Middleware para rutas inexistentes
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  })
})

export default app
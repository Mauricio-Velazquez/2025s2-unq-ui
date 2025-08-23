import express from 'express'
import { authRouter } from './routers/auth.routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', authRouter)

app.use((err, req, res, next) => {
  console.error(err)

  const statusCode = err.statusCode || 500
  const message = statusCode === 500 ? 'Internal Server Error' : 'Bad Request'

  return res.status(statusCode).json({ message })
})

const PORT = 7070
app.listen(PORT, () => console.log(`Running on port ${PORT}`))

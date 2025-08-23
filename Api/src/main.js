import express from 'express'
import { authRouter } from './auth/auth.routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.use('/', authRouter)

app.use('/', (err, req, res, next) => {
  console.error(err)

  const statusCode = err.statusCode || 500
  const message = statusCode === 500 ? 'Internal Server Error' : 'Bad Request'

  return res.status(statusCode).json({ message })
})

const PORT = 8080
app.listen(PORT, () => console.log(`Running on port ${PORT}`))

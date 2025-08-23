import express from 'express'
import { authRouter } from './auth/auth.routes.js'

const app = express()
app.use(express.json())

app.use('/', authRouter)

app.use('/', (err, req, res, next) => {
  console.error(err)

  return res.status(500).json({ message: 'Internal Server Error' })
})

const PORT = 8080
app.listen(PORT, () => console.log(`Running on port ${PORT}`))

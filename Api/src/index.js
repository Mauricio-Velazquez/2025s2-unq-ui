import express from 'express'
import apiRouter from './routes/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const port = 7070

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())

app.use('/api', apiRouter)

app.use((err, req, res, next) => {
  if (err.constructor === Error) {
    console.error(err)
  }
  const statusCode = err.statusCode || 500
  const message = statusCode === 500 ? 'Internal Server Error' : 'Bad Request'

  return res.status(statusCode).json({ message })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`)
})

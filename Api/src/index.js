import express from 'express'
import searchRouter from './routers/search.routes.js'
import SearchController from './controllers/search.controller.js'
import { instagramSystem } from './services/instagramSystem.js'

const app = express()
const port = 7070

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/search', searchRouter)

app.use((err, req, res, next) => {
  if (err.constructor === Error) {
    console.error(err)
  }
  const statusCode = err.statusCode || 500
  const message = statusCode === 500 ? 'Internal Server Error' : 'Bad Request'
  return res.status(statusCode).json({ message })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
import express from 'express'
import searchRouter from './routers/search.routes.js'
import getInstagramSystem from '@unq-ui/instagram-model-js'
import createPostsRouter from './routers/posts.routes.js'
import PostsController from './controllers/posts.controller.js'
import { authRouter } from './routers/auth.routes.js'
import TokenController from './controllers/token.controller.js'

const system = getInstagramSystem()
const tokenController = new TokenController(system)
const postsController = new PostsController(system, tokenController)

const app = express()
const port = 7070

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/search', searchRouter)
app.use('/posts', createPostsRouter(postsController, tokenController))
app.use('/', authRouter)

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

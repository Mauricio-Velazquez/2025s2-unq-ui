import getInstagramSystem from '@unq-ui/instagram-model-js'
import express from 'express'
import createPostsRouter from './routers/posts.routes.js'
import PostsController from './controllers/posts.controller.js'
import { authRouter } from './routers/auth.routes.js'
import TokenController from './controllers/token.controller.js'
import createUserRouter from './routers/user.routes.js'
import UserController from './controllers/user.controller.js'

const system = getInstagramSystem()
const tokenController = new TokenController(system)
const postsController = new PostsController(system, tokenController)
const userController = new UserController(system)
const app = express()
const port = 7070

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/posts', createPostsRouter(postsController, tokenController))
app.use('/', authRouter)
app.use('/user', createUserRouter(userController, tokenController))
app.use('/users', createUserRouter(userController, tokenController))

app.use((err, req, res, next) => {
  if (err.constructor === Error) {
    console.error(err)
  }

  const statusCode = err.statusCode || 500
  const message = statusCode === 500 ? 'Internal Server Error' : 'Bad Request'

  return res.status(statusCode).json({ message })
})

app.listen(port, () => {
  console.log(`Server running in localhost:${port}`)
})

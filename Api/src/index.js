import express from 'express'
import searchRouter from './routers/search.routes.js'
import createPostsRouter from './routers/posts.routes.js'
import PostsController from './controllers/posts.controller.js'
import { authRouter } from './routers/auth.routes.js'
import TokenController from './controllers/token.controller.js'
import createUserRouter from './routers/user.routes.js'
import UserController from './controllers/user.controller.js'
import { instagramSystem } from './services/instagramSystem.js'

const tokenController = new TokenController(instagramSystem)
const postsController = new PostsController(instagramSystem, tokenController)
const userController = new UserController(instagramSystem)
const app = express()
const port = 7070
const postsRouter = createPostsRouter(postsController, tokenController)
const usersRouter = createUserRouter(userController, tokenController)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/search', searchRouter)
app.use('/posts', postsRouter)
app.use('/', authRouter)
app.use('/users', usersRouter)

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

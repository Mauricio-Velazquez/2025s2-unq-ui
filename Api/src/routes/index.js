import { Router } from 'express'
import { authRouter } from './auth.routes.js'
import createPostsRouter from './posts.routes.js'
import searchRoutes from './search.routes.js'
import createUserRouter from './user.routes.js'
import PostsController from '../controllers/posts.controller.js'
import TokenController from '../controllers/token.controller.js'
import UserController from '../controllers/user.controller.js'
import { instagramSystem } from '../services/instagramSystem.js'

const apiRouter = Router()

const tokenController = new TokenController(instagramSystem)
const postsController = new PostsController(instagramSystem, tokenController)
const userController = new UserController(instagramSystem)
const postsRouter = createPostsRouter(postsController, tokenController)
const usersRouter = createUserRouter(userController, tokenController)

apiRouter.use('/', authRouter)
apiRouter.use('/search', searchRoutes)
apiRouter.use('/posts', postsRouter)
apiRouter.use('/users', usersRouter)

export default apiRouter

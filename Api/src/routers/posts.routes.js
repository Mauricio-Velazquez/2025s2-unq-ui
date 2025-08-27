import express from 'express'
import { ROLES } from '../config/constants.js'
import { checkBody } from '../middleware/checkBody.js'
import { postBodySchema } from '../schemas/schemas.js'

const createPostsRouter = (postsController, tokenController) => {
  const postsRouter = express.Router()

  postsRouter.post('/', checkBody(postBodySchema), tokenController.checkRole(ROLES.USER), postsController.createPost)

  postsRouter.get(
    '/:postId',
    tokenController.checkRole(ROLES.PUBLIC),
    postsController.getPost
  )

  postsRouter.put('/:postId', checkBody(postBodySchema), tokenController.checkRole(ROLES.USER), postsController.editPost)

  return postsRouter
}

export default createPostsRouter

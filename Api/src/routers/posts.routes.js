import express from 'express'
import { ROLES } from '../config/constants.js'
import { checkBody } from '../middleware/checkBody.js'
import { commentBodySchema, postBodySchema } from '../schemas/post.schemas.js'

const createPostsRouter = (postsController, tokenController) => {
  const postsRouter = express.Router()
  postsRouter.post('/', checkBody(postBodySchema), tokenController.checkRole(ROLES.USER), postsController.createPost)

  postsRouter.get(
    '/:postId',
    tokenController.checkRole(ROLES.PUBLIC),
    postsController.getPost
  )

  postsRouter.put('/:postId', checkBody(postBodySchema), tokenController.checkRole(ROLES.USER), postsController.editPost)

  postsRouter.put('/:postId/like', tokenController.checkRole(ROLES.USER), postsController.toggleLike)

  postsRouter.post('/:postId/comment', checkBody(commentBodySchema), tokenController.checkRole(ROLES.USER), postsController.addComment)

  return postsRouter
}

export default createPostsRouter

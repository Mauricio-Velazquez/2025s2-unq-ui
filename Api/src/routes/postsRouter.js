import express from 'express'
import { ROLES } from '../config/constants.js'

const createPostsRouter = (postsController, tokenController) => {
  const postsRouter = express.Router()

  postsRouter.post('/', tokenController.checkRole(ROLES.USER), postsController.createPost)

  postsRouter.get(
    '/:postId',
    tokenController.checkRole(ROLES.PUBLIC),
    postsController.getPost
  )

  postsRouter.put('/:postId', tokenController.checkRole(ROLES.USER), postsController.editPost)

  return postsRouter
}

export default createPostsRouter

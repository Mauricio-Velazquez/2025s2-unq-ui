import express from 'express'

const createUserRouter = (userController, tokenController) => {
  const userRouter = express.Router()

  userRouter.get('/', tokenController.checkRole('user'), userController.getUserTimeline)
  userRouter.get('/:userId', userController.getUser)
  userRouter.put('/:userId/follow', tokenController.checkRole('user'), userController.putUserFollow)

  return userRouter
}

export default createUserRouter

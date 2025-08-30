import { Router } from 'express'

const createUserRouter = (userController, tokenController) => {
  const userRouter = Router()

  userRouter.get('/', tokenController.checkRole('user'), userController.getUserTimeline)
  userRouter.get('/:userId', userController.getUser)
  userRouter.put('/:userId/follow', tokenController.checkRole('user'), userController.updateUserFollow)

  return userRouter
}

export default createUserRouter

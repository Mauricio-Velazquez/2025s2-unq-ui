import { Router } from 'express'
import { AuthController } from '../auth/auth.controller.js'
import { instagramSystem } from '../services/instagramSystem.js'

const authRouter = Router()
const controller = new AuthController(instagramSystem)

authRouter.post('/register', controller.register)
authRouter.post('/login', controller.login)

export { authRouter }

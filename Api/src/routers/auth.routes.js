import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { instagramSystem } from '../services/instagramSystem.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'
import { checkBody } from '../middleware/checkBody.js'

const authRouter = Router()
const controller = new AuthController(instagramSystem)

authRouter.post('/register', checkBody(registerSchema), controller.register)
authRouter.post('/login', checkBody(loginSchema), controller.login)

export { authRouter }

import { HEADER as AUTH_HEADER } from '../config/constants.js'
import TokenController from './token.controller.js'

const tokenController = new TokenController()
export class AuthController {
  constructor (system) {
    this.system = system
  }

  register = (req, res) => {
    try {
      const user = req.body

      const newUser = this.system.register(user)
      const token = tokenController.generateToken(newUser.id)

      res.set(AUTH_HEADER, token)
      return res.status(201).json(newUser)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  login = (req, res) => {
    try {
      const credentials = req.body

      const { email, password } = credentials
      const user = this.system.login(email, password)
      const token = tokenController.generateToken(user.id)

      res.set(AUTH_HEADER, token)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}

import { HEADER as AUTH_HEADER } from '../config/constants.js'
import { transformUser } from '../utils/Dtos.js'
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
      newUser.posts = []
      const token = tokenController.generateToken(newUser.id)

      res.setHeader(AUTH_HEADER, token)
      res.cookie('Authorization', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
      return res.status(201).json(transformUser(newUser))
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  login = (req, res) => {
    try {
      const credentials = req.body

      const { email, password } = credentials
      const user = this.system.login(email, password)
      const userPosts = this.system.getPostByUserId(user.id)
      user.posts = userPosts
      const token = tokenController.generateToken(user.id)

      res.setHeader(AUTH_HEADER, token)
      res.cookie('Authorization', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
      return res.status(200).json(transformUser(user))
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  logout = (req, res) => {
    res.clearCookie('Authorization')
    return res.status(200).json({ message: 'Logged out' })
  }
}

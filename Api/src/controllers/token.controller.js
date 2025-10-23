import jwt from 'jsonwebtoken'
import { JWT_SECRET, ROLES } from '../config/constants.js'

class TokenController {
  constructor(service) {
    this.service = service
  }

  generateToken = (userId) =>
    jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' })

  validateToken = (token) => jwt.verify(token, JWT_SECRET)

  checkRole = (role) => {
    return (req, res, next) => {
      if (role === ROLES.PUBLIC) {
        next()
        return
      }

      if (role === ROLES.ADMIN || role === ROLES.USER) {
        const authHeader = req.headers.authorization
        const tokenFromCookie = req.cookies?.Authorization
        const token = authHeader || tokenFromCookie

        if (!token) {
          return res.status(401).json({ error: 'Token is required' })
        }

        try {
          const decoded = this.validateToken(token)
          const user = this.service.getUser(decoded.userId)
          req.user = user
          next()
        } catch (error) {
          return res.status(401).json({ error: 'Invalid token' })
        }
      } else {
        throw new Error(`Invalid role: ${role}`)
      }
    }
  }
}

export default TokenController

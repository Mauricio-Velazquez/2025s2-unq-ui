import jwt from 'jsonwebtoken'
import { JWT_SECRET, ROLES } from '../config/constants.js'

class TokenController {
  constructor (service) {
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
        if (!authHeader) {
          res.status(401).json({ error: 'Authorization header is required' })
          return
        }
        try {
          const decoded = this.validateToken(authHeader)
          const user = this.service.getUser(decoded.userId)
          req.user = user
          next()
        } catch (error) {
          res.status(401).json({ error: 'Invalid token' })
        }
      } else {
        throw new Error(`Invalid role: ${role}`)
      }
    }
  }
}

export default TokenController

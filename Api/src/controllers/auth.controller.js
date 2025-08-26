export class AuthController {
  constructor (system) {
    this.system = system
  }

  register = (req, res) => {
    const user = req.body
    let newUser

    try {
      newUser = this.system.register(user)
      res.set('Authorization', token)
      return res.status(201).json(newUser)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  login = (req, res) => {
    const { email, password } = req.body
    let user

    try {
      user = this.system.login(email, password)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

    return res.status(200).json(user)
  }
}

export class AuthController {
  constructor (system, userValidator) {
    this.system = system
    this.userValidator = userValidator
  }

  register = (req, res) => {
    const user = req.body
    let newUser

    try {
      newUser = this.system.register(user)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

    return res.status(201).json(newUser)
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

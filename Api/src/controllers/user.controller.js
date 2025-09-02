import { transformUserPosts, transformUserTimeline } from '../utils/Dtos.js'

class UserController {
  constructor (system) {
    this.system = system
  }

  getUserTimeline = (req, res) => {
    const loggedUserId = req.user.id
    const user = this.system.getUser(loggedUserId)
    const timeline = this.system.timeline(loggedUserId)

    const userDto = transformUserTimeline({ ...user, timeline })
    res.status(200).json(userDto)
  }

  getUser = (req, res) => {
    try {
      const userId = req.params.userId
      const user = this.system.getUser(userId)
      const posts = this.system.getPostByUserId(userId)

      const userDto = transformUserPosts({ ...user, posts })

      res.json(userDto)
    } catch (error) {
      res.status(404).json({ message: `Usuario ${req.params.userId} no encontrado` })
    }
  }

  updateUserFollow = (req, res) => {
    const { userId } = req.params
    const loggedUserId = req.user.id

    if (userId === loggedUserId) {
      return res.status(400).json({ message: 'Can\'t add yourself as a friend' })
    }

    try {
      const user = this.system.updateFollower(loggedUserId, userId)
      const posts = this.system.getPostByUserId(loggedUserId)
      const userDto = transformUserPosts({ ...user, posts })
      return res.status(200).json(userDto)
    } catch (error) {
      return res.status(404).json({ message: 'User not found' })
    }
  }
}

export default UserController

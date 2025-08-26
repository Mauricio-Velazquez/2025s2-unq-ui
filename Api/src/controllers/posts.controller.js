import { transformPost } from '../utils/Dtos.js'
import { postBodySchema } from '../schemas/schemas.js'

class PostsController {
  constructor (system, tokenController) {
    this.system = system
    this.tokenController = tokenController
  }

  getPost = (req, res) => {
    try {
      const postId = req.params.postId
      const post = this.system.getPost(postId)

      res.json(transformPost(post))
    } catch (error) {
      res.status(404).json('Post not found')
    }
  }

  createPost = (req, res) => {
    try {
      const draftPost = postBodySchema.cast(req.body)
      const createdPost = this.system.addPost(req.user.id, draftPost)

      return res.status(201).json(createdPost)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }
}

export default PostsController

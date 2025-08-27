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

      return res.status(201).json(transformPost(createdPost))
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }

  editPost = async (req, res) => {
    try {
      const draftPost = await postBodySchema.validate(req.body)

      const id = req.params.postId
      const post = this.system.getPost(id)

      if (post.user.id !== req.user.id) {
        res.status(403).json({ message: 'Forbidden (User is not the owner of the post)' })
        return
      }

      const updatedPost = this.system.editPost(id, draftPost)
      res.json(transformPost(updatedPost))
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }
}

export default PostsController

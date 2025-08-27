import { transformPost } from '../utils/Dtos.js'
<<<<<<< HEAD
import { postBodySchema } from '../schemas/schemas.js'
=======
>>>>>>> 8371 (delego la validacion y casteo del body al middleware checkBody en las rutas de post)

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
      const createdPost = this.system.addPost(req.user.id, req.body)

      return res.status(201).json(transformPost(createdPost))
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }

  editPost = async (req, res) => {
    try {
      const id = req.params.postId
      const post = this.system.getPost(id)

      if (post.user.id !== req.user.id) {
        res.status(403).json({ message: 'Forbidden (User is not the owner of the post)' })
        return
      }

      const updatedPost = this.system.editPost(id, req.body)
      res.json(transformPost(updatedPost))
    } catch (error) {
      res.status(404).json({ message: 'Post not found' })
    }
  }
}

export default PostsController

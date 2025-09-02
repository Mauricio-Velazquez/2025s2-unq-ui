import { transformUserSimple, transformPost } from '../utils/Dtos.js'

class SearchController {
  constructor (system) {
    this.system = system
  }

  search = (req, res) => {
    const { query } = req.query
    if (!query) return res.status(400).json({ message: 'query parameter missing' })

    // Busca usuarios
    const users = this.system.users
      .filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
      .map(transformUserSimple)

    // Busca posts
    const posts = this.system.posts
      .filter(post => post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.user.name.toLowerCase().includes(query.toLowerCase()))
      .map(transformPost)

    return res.status(200).json({ users, posts })
  }
}

export default SearchController

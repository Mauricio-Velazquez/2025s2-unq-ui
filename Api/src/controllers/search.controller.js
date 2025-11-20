import { transformPost, transformUserSimple } from '../utils/Dtos.js'

class SearchController {
  constructor (system) {
    this.system = system
  }

  search = (req, res) => {
    const { query } = req.query
    if (!query) return res.status(400).json({ message: 'query parameter missing' })

    const users = this.system.searchByName(query).map(transformUserSimple)
    const posts = this.system.searchByUserName(query).map(transformPost)

    return res.status(200).json({ users, posts })
  }
}

export default SearchController

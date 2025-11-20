import { useState } from 'react'
import { getSearchResults } from '../services/search'

export default function useSearch () {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSearch (query) {
    if (!query.trim()) return
    setLoading(true)
    try {
      const results = await getSearchResults(query.toLowerCase().trim())

      setUsers(results.users || [])
      setPosts(results.posts || [])
    } catch (err) {
      console.error('Error en búsqueda:', err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return { handleSearch, loading, users, posts }
}

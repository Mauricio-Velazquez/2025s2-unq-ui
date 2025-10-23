import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config/constants.js'

export default function PublicRoute ({ children }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth () {
      try {
        await axios.get(`${API_URL}/users`, { withCredentials: true })
        navigate('/')
      } catch {
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

  if (loading) return null

  return children
}

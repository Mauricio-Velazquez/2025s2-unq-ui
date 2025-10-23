import { fetchCurrentUser } from '../services/user.js'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

export function ProtectedRoute ({ children, setCurrentUser }) {
  const navigate = useNavigate()
  const [userAuthenticated, setUserAuthenticated] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        const currentUser = await fetchCurrentUser()
        setUserAuthenticated(Boolean(currentUser))
        setCurrentUser(currentUser)
      } catch (error) {
        navigate('/login')
      }
    })()
  }, [])
  return userAuthenticated ? children : null
}

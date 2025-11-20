import { createContext, useState } from 'react'
import { loginUser, logout, registerUser } from '../services/auth'

export const AuthContext = createContext()

export default function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  async function login (userDTO) {
    const user = await loginUser(userDTO)
    setCurrentUser(user)
  }

  async function signout () {
    await logout()
    setCurrentUser(null)
  }

  async function register (registerUserDTO) {
    const user = await registerUser(registerUserDTO)
    setCurrentUser(user)
  }

  function isAuthenticated () {
    return currentUser != null
  }

  function deleteUserPost (deletedPost) {
    setCurrentUser(prev => ({ ...prev, posts: prev.posts.filter(post => post.id !== deletedPost.id) }))
  }

  function updateUserPost (newPost) {
    console.log(currentUser)
    if (currentUser.posts.some(userPost => userPost.id === newPost.id)) {
      setCurrentUser(prev => ({ ...prev, posts: prev.posts.map(prevPost => prevPost.id !== newPost.id ? prevPost : newPost) }))
    } else {
      setCurrentUser(prev => ({ ...prev, posts: [newPost, ...prev.posts] }))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        signout,
        login,
        register,
        updateUserPost,
        deleteUserPost
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

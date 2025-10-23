import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import Home from './pages/Home/Home.jsx'
import Profile from './pages/Profile/Profile.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import Post from './pages/Posts/Post.jsx'
import NewPost from './pages/Posts/NewPost.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import EditPost from './pages/Posts/EditPost.jsx'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SearchResults from './pages/SearchResults.jsx'

const RootRedirect = () => <Navigate to='/home' replace />

export default function App () {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <>

      <Routes>
        <Route path='/' element={<RootRedirect />} />

        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login setCurrentUser={setCurrentUser} />
            </PublicRoute>
          }
        />

        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register setCurrentUser={setCurrentUser} />
            </PublicRoute>
          }
        />

        <Route
          path='/home' element={
            <ProtectedRoute setCurrentUser={setCurrentUser}>
              <Home currentUser={currentUser} />
            </ProtectedRoute>
        }
        />
        <Route
          path='/profile/:id' element={
            <ProtectedRoute setCurrentUser={setCurrentUser}>
              <Profile currentUser={currentUser} />
            </ProtectedRoute>
        }
        />
        <Route
          path='/posts/:id' element={
            <ProtectedRoute setCurrentUser={setCurrentUser}>
              <Post currentUser={currentUser} />
            </ProtectedRoute>
        }
        />
        <Route
          path='/newPost' element={
            <ProtectedRoute setCurrentUser={setCurrentUser}>
              <NewPost currentUser={currentUser} />
            </ProtectedRoute>
        }
        />
        <Route
          path='/posts/:id/edit' element={
            <ProtectedRoute setCurrentUser={setCurrentUser}>
              <EditPost currentUser={currentUser} />
            </ProtectedRoute>
        }
        />

        <Route
          path='/search' element={
            <ProtectedRoute>
              <SearchResults currentUser={currentUser} />
            </ProtectedRoute>
        }
        />

        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

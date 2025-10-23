import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import '../pages/Home/Home.css'
import './SearchResults.css'
import { getSearchResults } from '../services/search.js'
import { toastError } from '../utils/toastify.js'
import Loader from '../components/Loader.jsx'

export default function SearchResults ({ currentUser }) {
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search).get('query') || ''
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await getSearchResults(query)
        setUsers(res.data.users || [])
        setPosts(res.data.posts || [])
      } catch (error) {
        toastError(error)
      } finally {
        setLoading(false)
      }
    }
    )()
  }, [query])

  if (loading) return <Loader />

  return (
    <main className='home__main'>
      <Sidebar currentUser={currentUser} />
      <section className='feed search__content'>
        <h2 className='search__title'>Resultados para: <strong>{query}</strong></h2>

        {users.length === 0 && posts.length === 0 && (
          <p className='search__noResults'>No se encontraron resultados.</p>
        )}

        {users.length > 0 && (
          <div className='search__section'>
            <h3>Usuarios</h3>
            <div className='search__usersGrid'>
              {users.map(user => (
                <div key={user.id} className='search__userCard' onClick={() => navigate(`/profile/${user.id}`)}>
                  <img src={user.image} alt={user.name} className='search__avatar' />
                  <span>{user.name}</span>
                </div>
              ))}
            </div>

          </div>
        )}

        {posts.length > 0 && (
          <div className='search__section'>
            <h3>Publicaciones</h3>
            <div className='search__posts'>
              {posts.map(post => (
                <div key={post.id} className='post' id={post.id} src={post.image}>
                  <img
                    src={post.image}
                    alt='Publicación'
                    className='post__img'
                    onClick={() => navigate(`/posts/${post.id}`)}
                  />
                  <p className='post__desc'>{post.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

    </main>

  )
}

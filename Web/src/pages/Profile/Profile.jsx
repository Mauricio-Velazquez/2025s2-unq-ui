import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar.jsx'
import './Profile.css'
import { fetchCurrentUser, fetchUser, toggleFollow } from '../../services/user.js'
import { toastError } from '../../utils/toastify.js'

export default function Profile ({ currentUser }) {
  const { id: userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    (async () => {
      const fetchedCurrentUser = await fetchCurrentUser()

      const fetchedUser = await fetchUser(userId)
      const alreadyFollowing = fetchedCurrentUser.following?.some(u => u.id === fetchedUser.id)
      setUser(fetchedUser)
      setIsFollowing(Boolean(alreadyFollowing))
      setLoading(false)
    })()
  }, [userId])

  const handleFollow = async () => {
    try {
      await toggleFollow(userId)
      setIsFollowing(prev => !prev)
      setUser(prev => ({
        ...prev,
        followers: isFollowing ? prev.followers - 1 : prev.followers + 1
      }))
    } catch (error) {
      toastError(error)
    }
  }

  if (loading) return <div className='profile__loading'>Cargando perfil...</div>

  return (
    <main className='profile__main'>
      <Sidebar currentUser={currentUser} />
      <section className='profile__content'>
        <header className='profile__header'>
          <img className='profile__avatar' src={user.image} alt={`Avatar de ${user.name}`} />
          <div className='profile__info'>
            <div className='profile__top'>
              <h2 className='profile__name'>{user.name}</h2>
              {currentUser?.id !== user.id && (
                <button
                  className={`profile__followBtn ${isFollowing ? 'following' : ''}`}
                  onClick={handleFollow}
                >
                  {isFollowing ? 'Siguiendo' : 'Seguir'}
                </button>
              )}
            </div>
            <ul className='profile__stats'>
              <li><strong>{user.posts?.length || 0}</strong> Publicaciones</li>
              <li><strong>{user.following?.length || 0}</strong> Seguidos</li>
            </ul>
          </div>
        </header>
        <section className='profile__posts'>
          {user.posts?.length === 0
            ? (
              <p className='profile__noPosts'>Este usuario no tiene publicaciones todavía.</p>
              )
            : (
                user.posts.toReversed().map(post => (
                  <div key={post.id} className='profile__post'>
                    <img
                      src={post.image} alt='Publicación' className='profile__postImg'
                      onClick={() => navigate(`/posts/${post.id}`)}
                    />
                  </div>
                ))
              )}
        </section>
      </section>
    </main>
  )
}

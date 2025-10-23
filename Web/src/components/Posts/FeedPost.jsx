import LikeIcon from './LikeIcon.jsx'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { toggleLike } from '../../services/post.js'
import { toastError } from '../../utils/toastify.js'

export function FeedPost ({ initialPost, currentUser }) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(initialPost.likes?.some(u => u.id === currentUser?.id))
  const [post, setPost] = useState(initialPost)

  const handleLike = async (postId) => {
    try {
      await toggleLike(postId)
      setLiked(prev => !prev)
      setPost(prev => ({
        ...prev,
        likes: !liked ? [...prev.likes, currentUser] : prev.likes.filter(u => u.id !== currentUser.id)
      }))
    } catch (error) {
      toastError(error)
    }
  }

  return (
    <article key={post.id} className='post-preview'>
      <header className='post-preview__header'>
        <img
          className='post-preview__avatar'
          src={post.user?.image}
          alt='Avatar de usuario'
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/profile/${post.user?.id}`)}
        />
        <div className='post-preview__userInfo'>
          <strong
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/profile/${post.user?.id}`)}
          >
            {post.user?.name}
          </strong>
          <span className='post-preview__date'>
            {(() => {
              const d = new Date(post.date)
              const day = d.getDate()
              const month = d.getMonth() + 1
              const year = d.getFullYear()
              const hours = d.getHours()
              const minutes = d.getMinutes().toString().padStart(2, '0')
              return `${day}/${month}/${year} - ${hours}:${minutes}`
            })()}
          </span>
        </div>
      </header>

      {post.image && (<img
        className='post-preview__img' src={post.image} alt='Foto publicada'
        onClick={() => navigate(`/posts/${post.id}`)}
                      />)}

      <div className='post-preview__footer'>
        <span
          style={{
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'
          }}
          onClick={() => handleLike(post.id)}
        >
          <LikeIcon liked={liked} />
          {post.likes?.length ?? 0} Me gusta
        </span>
        <span>💬 {post.comments?.length ?? 0} Comentarios</span>
      </div>

      <p className='post-preview__desc'>{post.description}</p>
    </article>
  )
}

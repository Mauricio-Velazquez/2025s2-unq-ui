import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar.jsx'
import './Post.css'
import { useEffect, useState } from 'react'
import LikeIcon from '../../components/Posts/LikeIcon.jsx'
import Comment from '../../components/Posts/Comment.jsx'
import { parseFormData, transforDate } from '../../utils/logic.js'
import Loader from '../../components/Loader.jsx'
import { CommentDTO } from '../../services/dtos/post.js'
import { toastError, toastSuccess } from '../../utils/toastify.js'
import { deletePost, getPost, postComment, putPostLike } from '../../services/post.js'

export default function Post ({ currentUser }) {
  const { id: postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const post = await getPost(postId)
        setPost(post)
      } catch (error) {
        toastError(error)
      }
    })()
  }, [])

  const handleLike = async (postId) => {
    try {
      const newPost = await putPostLike(postId, navigate)
      setPost(newPost)
    } catch (error) {
      toastError(error)
    }
  }

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId, navigate)
      toastSuccess('Post eliminado')
      navigate(`/profile/${currentUser.id}`)
    } catch (error) {
      toastError(error)
    } finally {
      setIsDeleted(false)
    }
  }

  const handleComment = (e) => {
    setComment(e.target.value)
    setCommentError(false)
  }

  const handleSubmit = async formData => {
    if (comment.trim() === '') {
      setCommentError(true)
      return
    }

    const data = parseFormData(formData)
    const commentDTO = new CommentDTO(data)

    try {
      const updatedPost = await postComment(postId, commentDTO, navigate)
      setPost(updatedPost)
      setComment('')
    } catch (error) {
      toastError(error)
    }
  }

  if (!post) return <Loader />

  return (
    <div className='post-container'>
      <Sidebar currentUser={currentUser} />
      <main className='post'>
        <section className='post__section'>
          <div className='post__image-container'>
            <img src={`${post?.image}`} alt={`Foto subida de ${post?.user?.name}`} />
          </div>
          <div className='post__contents-container'>
            <header className='post__header'>
              <div className='post__user-image-container'>
                <img
                  src={`${post.user?.image}`} alt='User image'
                  onClick={() => navigate(`/profile/${post.user?.id}`)}
                />
              </div>
              <div className='post__user-info'>
                <p
                  className='post__user-name'
                  onClick={() => navigate(`/profile/${post.user?.id}`)}
                >{post.user?.name}
                </p>
                <p className='post__timestamp'>{(() => transforDate(post.date))()}</p>
              </div>
              {currentUser?.id === post.user?.id &&
                <div className='post__delete-edit-container'>
                  <button className='post__edit-button' onClick={() => navigate(`/posts/${post.id}/edit`)}>
                    <img src='/edit.svg' alt='Editar' />
                  </button>
                  <button className='post__delete-button' onClick={() => setIsDeleted(true)}>
                    <img src='/Delete.svg' alt='Eliminar' />
                  </button>
                </div>}

            </header>
            <section className='post__comments-section'>
              <article className='post__comment'>
                <div className='post__user-image-container'>
                  <img
                    src={`${post.user?.image}`} alt={`Avatar de ${post.user?.name}`}
                    onClick={() => navigate(`/profile/${post.user?.id}`)}
                  />
                </div>
                <p className='post__comment-text'>
                  <span
                    className='post__user-name-comment'
                    onClick={() => navigate(`/profile/${post.user?.id}`)}
                  >{post.user?.name}
                  </span> {post.description}
                </p>
              </article>
              {post.comments?.map(comment => <Comment key={comment.id} comment={comment} navigate={navigate} />)}
            </section>
            <section className='post__actions'>
              <div className='post__action'>
                <button className='post__action-like' onClick={() => handleLike(post.id)}>
                  <LikeIcon liked={post.likes?.some(u => u.id === currentUser?.id)} />
                </button>
                <span className='post__action-text'>{post.likes?.length ?? 0} Me gusta</span>
              </div>
              <div className='post__action'>
                <div className='post__action-icon'>
                  <img src='/Comment.svg' alt='Comment icon' />
                </div>
                <span className='post__action-text'>{post.comments?.length ?? 0} Comentarios</span>
              </div>
            </section>
            <form action={handleSubmit} className='post__comment-form'>
              <div className='post__input-error-container'>
                <input
                  type='text' placeholder='Agregar un comentario' name='body' className='post__comment-input'
                  value={comment}
                  onChange={handleComment}
                />
                {commentError && <p className='post__error'>el comentario no puede ser vacio</p>}
              </div>
              <button className='post__comment-button'>Publicar</button>
            </form>

          </div>
        </section>
        {
          isDeleted &&
            <section className='post__delete-modal'>
              <div className='post__delete-modal-content'>
                <p className='post__delete-modal-title'>Eliminar Posteo</p>
                <p className='post__delete-modal-message'>estas seguro de que deseas eliminar este post?</p>
                <div className='post__delete-modal-buttons'>
                  <button className='post__delete-modal-cancel-button' onClick={() => setIsDeleted(false)}>Cancelar
                  </button>
                  <button className='post__delete-modal-confirm-button' onClick={() => handleDelete(post.id)}>Borrar
                  </button>
                </div>
              </div>
            </section>
        }
      </main>
    </div>
  )
}

import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useParams } from 'react-router'
import './EditPost.css'
import { toastError, toastSuccess } from '../../utils/toastify.js'
import { getPost, putPost } from '../../services/post.js'
import { PostForm } from '../../components/Posts/PostForm.jsx'
import Loader from '../../components/Loader.jsx'

export default function EditPost ({ currentUser }) {
  const { id: postId } = useParams()
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await getPost(postId)
        setUrl(data.image)
        setDescription(data.description)
      } catch (error) {
        toastError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const postAction = async (postDTO) => {
    const res = await putPost(postId, postDTO)
    toastSuccess('Post actualizado')
    return res
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='edit-post-container'>
      <Sidebar currentUser={currentUser} />
      <PostForm initialDescription={description} initialURL={url} postAction={postAction} />
    </div>
  )
}

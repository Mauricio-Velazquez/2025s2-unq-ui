import Sidebar from '../../components/Sidebar.jsx'
import './NewPost.css'
import { PostForm } from '../../components/Posts/PostForm.jsx'
import { postNewPost } from '../../services/post.js'
import { toastSuccess } from '../../utils/toastify.js'

export default function NewPost ({ currentUser }) {
  const postAction = async (postDTO) => {
    const res = await postNewPost(postDTO)
    toastSuccess('Post subido')
    return res
  }

  return (
    <div className='new-post-container'>
      <Sidebar currentUser={currentUser} />
      <PostForm postAction={postAction} />
    </div>
  )
}

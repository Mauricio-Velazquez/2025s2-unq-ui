import { SafeAreaView } from 'react-native-safe-area-context'
import PostForm from '../../components/post/PostForm'
import { postNewPost } from '../../services/post'
import { toastSuccess } from '../../utils/toastify'

export default function NewPost () {
  const postAction = async (postDTO) => {
    const res = await postNewPost(postDTO)
    toastSuccess('Post subido')
    return res
  }

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <PostForm postAction={postAction} />
    </SafeAreaView>
  )
}

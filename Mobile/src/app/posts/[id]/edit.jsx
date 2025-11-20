import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostForm from '../../../components/post/PostForm'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { getPost, putPost } from '../../../services/post'
import { toastError, toastSuccess } from '../../../utils/toastify'
import LoadingIcon from '../../../components/LoadingIcon'

export default function Edit () {
  const { id: postId } = useLocalSearchParams()
  const navigation = useNavigation()
  const [data, setData] = useState({ url: '', description: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const post = await getPost(postId)
        setData({ url: post.image, description: post.description })
        navigation.setOptions({
          title: 'Editar Publicación'
        })
      } catch (error) {
        toastError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [postId, navigation])

  const postAction = async (postDTO) => {
    const res = await putPost(postId, postDTO)
    toastSuccess('Post actualizado')
    return res
  }

  if (loading) return <LoadingIcon />

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView>
        <PostForm initialDescription={data.description} initialURL={data.url} postAction={postAction} />
      </ScrollView>
    </SafeAreaView>
  )
}

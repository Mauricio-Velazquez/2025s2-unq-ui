import { useEffect, useState } from 'react'
import { deletePost, getPost, postComment, putPostLike } from '../services/post'
import { capitalize } from '../utils/logic'
import { toastError, toastSuccess } from '../utils/toastify'
import { useNavigation, useRouter } from 'expo-router'
import { useTimeline } from './useTimeline'
import { CommentDTO } from '../services/dtos/post'
import { useAuth } from './useAuth'

export function usePost (postId) {
  const router = useRouter()
  const navigation = useNavigation()
  const { updatePostInTimeline } = useTimeline()
  const { deleteUserPost } = useAuth()

  const [post, setPost] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isShowComments, setIsShowComments] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const post = await getPost(postId)
        setPost(post)

        const userName = capitalize(post.user?.name)
        navigation.setOptions({
          title: `Post - ${userName}`
        })
      } catch (error) {
        toastError(error)
      }
    })()
  }, [postId])

  const updatePost = updatedPost => setPost(updatedPost)

  const putComment = async (body) => {
    const commentDTO = new CommentDTO({ body })
    const updatedPost = await postComment(postId, commentDTO)
    setPost(updatedPost)
    updatePostInTimeline(updatedPost)
  }

  const handleLike = async (postId) => {
    try {
      const newPost = await putPostLike(postId)
      setPost(newPost)
      updatePostInTimeline(newPost)
    } catch (error) {
      toastError(error)
    }
  }

  const handleIsDeleted = bool => setIsDeleted(bool)

  const handleDelete = async () => {
    try {
      await deletePost(post.id)
      deleteUserPost(post)
      toastSuccess('Post eliminado')
      router.replace('/profile')
    } catch (error) {
      toastError(error)
    } finally {
      setIsDeleted(false)
    }
  }

  const handleComments = () => {
    setIsShowComments(!isShowComments)
  }

  const liked = (currentUser) => post.likes?.some(u => u.id === currentUser?.id)

  return { post, isDeleted, isShowComments, updatePost, putComment, handleLike, handleIsDeleted, handleDelete, handleComments, liked }
}

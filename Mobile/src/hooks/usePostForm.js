import { useRouter } from 'expo-router'
import { useState } from 'react'
import { toastError } from '../utils/toastify'
import { PostDTO } from '../services/dtos/post'
import { useAuth } from './useAuth'

export function usePostForm (initialURL, initialDescription, postAction) {
  const router = useRouter()
  const { updateUserPost } = useAuth()

  const [image, setImage] = useState(initialURL)
  const [imageError, setImageError] = useState(false)
  const [description, setDescription] = useState(initialDescription)
  const [descriptionError, setDescriptionError] = useState(false)

  const handleUrl = (value) => {
    setImage(value)
    if (URL.canParse(value)) {
      setImageError(false)
    } else {
      setImageError(true)
    }
  }

  const handleDescription = (value) => {
    setDescription(value)
  }

  const handleImageError = (bool) => {
    setImageError(bool)
  }

  function isValidURL (image) {
    return URL.canParse(image)
  }

  const handleSubmit = async () => {
    if (description.trim() === '') {
      setDescriptionError(true)
      return
    }

    if (!isValidURL(image)) {
      setImageError(true)
      return
    }

    const newPost = new PostDTO({ image, description })
    try {
      const post = await postAction(newPost)
      updateUserPost(post)
      router.replace('/profile')
      setDescription('')
      setDescriptionError(false)
      setImage('')
      setImageError(false)
    } catch (error) {
      toastError(error)
    }
  }

  return { image, description, imageError, descriptionError, handleUrl, handleDescription, handleImageError, handleSubmit, isValidURL }
}

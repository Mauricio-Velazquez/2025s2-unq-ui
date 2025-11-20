import { createContext, useEffect, useState } from 'react'
import { postComment, putPostLike } from '../services/post'
import { getUserTimeline } from '../services/user'
import { CommentDTO } from '../services/dtos/post'
import { useAuth } from '../hooks/useAuth'

export const TimelineContext = createContext()

export default function TimelineProvider ({ children }) {
  const [timeline, setTimeline] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      fetchTimeline()
    }
  }, [currentUser])

  async function fetchTimeline () {
    setTimeline((await getUserTimeline()).timeline)
  }

  async function likePost (postId) {
    const updatedPost = await putPostLike(postId)
    setTimeline(prev =>
      prev.map(p => p.id === postId ? updatedPost : p)
    )
  }

  function updatePostInTimeline (post) {
    setTimeline(prevState => prevState.map(curPost => curPost.id !== post.id ? curPost : post))
  }

  /**
   * Si hay algún post del usuario `userId` en mi timeline, lo elimino.
   * Si no hay ningun post del usuario `userId`, actualizo el timeline.
   *
   * Edge case: si el usuario `userId` no tiene ningún post, dejar de seguirlo me hace actualizar el timeline aunque no sea necesario.
   */
  async function updateFollowingUserInTimeline (userId) {
    const filteredPosts = timeline.filter(post => post.userId !== userId)
    if (filteredPosts.length === timeline.length) {
      await fetchTimeline()
    } else {
      setTimeline(filteredPosts)
    }
  }

  async function putComment (postId, body) {
    const commentDTO = new CommentDTO({ body })
    const updatedPost = await postComment(postId, commentDTO)
    updatePostInTimeline(updatedPost)
    return updatedPost
  }

  return (
    <TimelineContext.Provider value={{ timeline, likePost, updatePostInTimeline, updateFollowingUserInTimeline, putComment }}>
      {children}
    </TimelineContext.Provider>
  )
}

import { useEffect, useState } from 'react'
import { fetchUser, toggleFollow } from '../services/user'
import { useAuth } from './useAuth'
import { useTimeline } from './useTimeline'

export function useProfile (userId) {
  const { currentUser, setCurrentUser } = useAuth()
  const { updateFollowingUserInTimeline } = useTimeline()

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    (async () => {
      setProfile(await fetchUser(userId))
    }
    )()
  }, [])

  function isFollowing () {
    return currentUser.following.some(following => following.id === userId)
  }

  async function follow () {
    const user = await toggleFollow(userId)
    setCurrentUser(user)
    updateFollowingUserInTimeline(userId)
  }

  return { profile, follow, isFollowing }
}

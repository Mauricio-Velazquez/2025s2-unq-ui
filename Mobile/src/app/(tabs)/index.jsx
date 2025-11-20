import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TimelinePost } from '../../components/TimelinePost'
import { useTimeline } from '../../hooks/useTimeline'
import { toastError } from '../../utils/toastify'
import { useAuth } from '../../hooks/useAuth'
import Comments from '../../components/post/Comments'
import LoadingIcon from '../../components/LoadingIcon'

export default function HomeScreen () {
  const { currentUser } = useAuth()
  const { timeline, likePost, putComment } = useTimeline()
  const [isShowComments, setShowComments] = useState(false)
  const [postToShowComments, setPostToShowComments] = useState(false)

  const handleLike = async (postId) => {
    try {
      likePost(postId)
    } catch (err) {
      toastError(err)
    }
  }

  const handleComments = (post) => {
    setShowComments(prev => !prev)
    setPostToShowComments(post)
  }

  const handlePutComment = async (body) => {
    const updatedPost = await putComment(postToShowComments.id, body)
    setPostToShowComments(updatedPost)
  }

  if (!timeline) {
    return <LoadingIcon />
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {timeline.length === 0
        ? (
          <Text style={{ marginTop: 40, textAlign: 'center' }}>
            No hay posts
          </Text>
          )
        : (
          <FlatList
            data={timeline}
            ItemSeparatorComponent={<View style={styles.separator} />}
            renderItem={({ item }) => (
              <TimelinePost
                post={item}
                currentUser={currentUser}
                onLike={handleLike}
                handleComments={handleComments}
              />
            )}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          )}
      {isShowComments && <Comments handleComments={handleComments} post={postToShowComments} putComment={handlePutComment} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  separator: {
    height: 10
  }
})

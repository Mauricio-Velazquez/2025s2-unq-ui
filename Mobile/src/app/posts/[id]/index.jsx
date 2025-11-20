import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Comments from '../../../components/post/Comments.jsx'
import { useAuth } from '../../../hooks/useAuth'
import DeleteModal from '../../../components/post/DeleteModal.jsx'
import { usePost } from '../../../hooks/usePost.js'
import { PostHeader } from '../../../components/post/PostHeader'
import LoadingIcon from '../../../components/LoadingIcon'

export default function Post () {
  const { currentUser } = useAuth()
  const { id: postId } = useLocalSearchParams()
  const {
    post, isDeleted, isShowComments,
    putComment, handleLike, handleIsDeleted, handleDelete, handleComments, liked
  } = usePost(postId)

  if (!post) return <LoadingIcon />
  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <PostHeader handleIsDeleted={handleIsDeleted} post={post} />
          </View>
          <Image
            source={{ uri: post.image }}
            style={styles.image}
          />
          <View style={styles.actions}>

            <Pressable style={styles.button} onPress={() => handleLike(post.id)}>
              <Text style={styles.actionButtons}>{(() => liked(currentUser) ? '❤️' : '🤍')()}</Text>
              <Text style={styles.buttonText}>{post.likes?.length ?? 0}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handleComments()}>
              <Text style={styles.actionButtons}>💬</Text>
              <Text style={styles.buttonText}>{post.comments?.length ?? 0}</Text>
            </Pressable>

          </View>

          <Text style={styles.description}>{post.description}</Text>
        </View>
      </ScrollView>
      {isDeleted && <DeleteModal handleIsDeleted={handleIsDeleted} handleDelete={handleDelete} />}
      {isShowComments && <Comments handleComments={handleComments} post={post} putComment={putComment} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 12
  },
  image: {
    width: '100%',
    aspectRatio: 9 / 16,
    resizeMode: 'contain',
    marginBottom: 12
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
    paddingLeft: 16,
    marginBottom: 12
  },
  actionButtons: {
    fontSize: 22
  },
  button: {
    flexDirection: 'row',
    gap: 8
  },
  buttonText: {
    color: 'rgba(50, 50, 50, 1)'
  },
  description: {
    fontSize: 16,
    color: 'rgba(50, 50, 50, 1)',
    paddingLeft: 2
  }
})

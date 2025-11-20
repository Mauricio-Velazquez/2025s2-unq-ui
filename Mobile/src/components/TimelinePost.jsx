import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { UserAndDateHeader } from './UserAndDateHeader'

export const TimelinePost = ({ post, currentUser, onLike, handleComments }) => {
  const liked = post.likes?.some(u => u.id === currentUser?.id)

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeaderContainer}>
        <UserAndDateHeader post={post} />
      </View>

      <View style={styles.imageContainer}>
        <Link href={`/posts/${post.id}`} asChild>
          <Pressable>
            <Image source={{ uri: post.image }} style={styles.postImage} />
          </Pressable>
        </Link>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => onLike(post.id)} style={styles.likeContainer}>
          <Text style={{ fontSize: 18 }}>
            {liked ? '❤️' : '🤍'}
          </Text>
          <Text style={styles.footerText}>{post.likes?.length ?? 0} Me gusta</Text>
        </Pressable>

        <Pressable onPress={() => handleComments(post)}>
          <Text style={styles.footerText}>
            💬 {post.comments?.length ?? 0} Comentarios
          </Text>
        </Pressable>
      </View>

      <Text style={styles.postDescription}>{post.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%'
  },
  postHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  imageContainer: {
    width: '100%'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  username: {
    fontWeight: 'bold',
    fontSize: 15
  },
  date: {
    fontSize: 12,
    color: '#777'
  },
  postImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#eee'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#333'
  },
  postDescription: {
    padding: 10,
    fontSize: 14
  }
})

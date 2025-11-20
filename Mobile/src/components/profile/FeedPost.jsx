import { Link } from 'expo-router'
import { Image, Pressable, StyleSheet } from 'react-native'

export function FeedPost ({ post }) {
  return (
    <Link key={post.id} href={`/posts/${post.id}`} asChild>
      <Pressable style={styles.gridItem}>
        <Image source={{ uri: post.image }} style={styles.gridImage} />
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    width: '33%',
    aspectRatio: '9/16'
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    objectFit: 'cover'
  }
})

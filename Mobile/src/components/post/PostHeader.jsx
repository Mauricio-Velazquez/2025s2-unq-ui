import { Image, Pressable, StyleSheet, View } from 'react-native'
import { UserAndDateHeader } from '../UserAndDateHeader'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'expo-router'

export function PostHeader ({ post, handleIsDeleted }) {
  const { currentUser } = useAuth()

  const deleteIconURI = require('./../../assets/Delete.png')
  const editIconURI = require('../../assets/Edit.png')
  return (
    <View style={styles.container}>
      <UserAndDateHeader post={post} />
      {currentUser?.id === post.user?.id &&
        <View style={styles.headerActions}>
          <Pressable onPress={() => handleIsDeleted(true)}>
            <Image
              source={deleteIconURI}
              style={styles.icon}
            />
          </Pressable>
          <Link href={`/posts/${post.id}/edit`} asChild>
            <Pressable>
              <Image
                source={editIconURI}
                style={styles.icon}
              />
            </Pressable>
          </Link>
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 'auto'
  },
  icon: {
    width: 24,
    height: 24
  }
})

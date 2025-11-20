import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { capitalize, transforDate } from '../utils/logic'
import { ProfileImage } from './search/ProfileImage'

export function UserAndDateHeader ({ post }) {
  return (
    <View style={styles.info}>
      <View style={styles.userContainer}>
        <Link href={`/profile/${post.user?.id}`} asChild>
          <Pressable>
            <ProfileImage style={styles.user} profile={post.user} />
          </Pressable>
        </Link>
      </View>
      <View style={styles.userNameDate}>
        <Link href={`/profile/${post.user?.id}`} asChild>
          <Pressable>
            <Text style={styles.userName}>{(() => capitalize(post.user?.name))()}</Text>
          </Pressable>
        </Link>
        <Text style={styles.date}>{(() => transforDate(post.date))()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    gap: 16
  },
  userContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(204, 204, 204, 1)',
    overflow: 'hidden'
  },
  user: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  userNameDate: {
    justifyContent: 'space-between',
    paddingVertical: 2
  },
  userName: {
    fontSize: 16,
    color: 'rgba(50, 50, 50, 1)'
  },
  date: {
    fontSize: 12,
    color: 'rgba(115, 115, 115, 1)'
  }
})

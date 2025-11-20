import { Pressable, StyleSheet, Text } from 'react-native'
import { useProfile } from '../../hooks/useProfile'

export function FollowButton ({ user }) {
  const { follow, isFollowing } = useProfile(user.id)

  if (isFollowing()) {
    return (
      <Pressable onPress={() => follow()} style={styles.unfollowBtn}>
        <Text numberOfLines={1} style={styles.followBtnText}>Dejar de seguir</Text>
      </Pressable>
    )
  } else {
    return (
      <Pressable onPress={() => follow()} style={styles.followBtn}>
        <Text style={styles.followBtnText}>Seguir</Text>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  followBtn: {
    width: '100%',
    backgroundColor: '#495DF9',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 5
  },
  unfollowBtn: {
    backgroundColor: '#A7A7A7',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 5
  },
  followBtnText: {
    textAlign: 'center',
    width: '100%',
    color: 'white',
    fontWeight: '600'
  }
})

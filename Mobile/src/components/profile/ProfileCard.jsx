import { StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../hooks/useAuth'
import { FollowButton } from './FollowButton'
import { SignoutButton } from './SignoutButton'
import { UserImage } from './UserImage'
import { UserStats } from './UserStats'

export function ProfileCard ({ profile }) {
  const { currentUser } = useAuth()

  const isCurrentUserProfile = currentUser.id === profile.id
  return (
    <View style={styles.container}>
      <UserImage profile={profile} />
      <View style={styles.info}>
        <Text style={styles.name}>{profile.name}</Text>
        <UserStats profile={profile} />
      </View>
      <View style={styles.buttonContainer}>
        {isCurrentUserProfile
          ? <SignoutButton />
          : <FollowButton user={profile} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 5
  },
  info: {
    alignItems: 'center',
    flexGrow: 1
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    height: '100%',
    alignItems: 'center',
    width: '36%'
  }
})

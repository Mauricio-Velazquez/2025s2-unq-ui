import { useAuth } from '../../hooks/useAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from '../../components/profile/Profile'

export default function MyProfile () {
  const { currentUser } = useAuth()

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Profile profile={currentUser} />
    </SafeAreaView>
  )
}

import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useProfile } from '../../hooks/useProfile'
import { useEffect } from 'react'
import { default as ProfileComponent } from '../../components/profile/Profile'
import LoadingIcon from '../../components/LoadingIcon'

export default function Profile () {
  const { id: userId } = useLocalSearchParams()
  const navigation = useNavigation()

  const { profile } = useProfile(userId)

  useEffect(() => {
    const username = profile?.name
    navigation.setOptions({ title: username ? `@${username}` : 'Cargando' })
  }, [profile])

  if (!profile) return <LoadingIcon />

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <ProfileComponent profile={profile} />
    </SafeAreaView>
  )
}

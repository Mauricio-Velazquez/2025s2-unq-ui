import { Stack } from 'expo-router'
import AuthProvider from '../providers/AuthProvider'
import { useAuth } from '../hooks/useAuth'
import Toast from 'react-native-toast-message'
import TimelineProvider from '../providers/TimelineProvider'

export default function RootLayout () {
  return (
    <AuthProvider>
      <TimelineProvider>
        <AppLayout />
        <Toast />
      </TimelineProvider>
    </AuthProvider>
  )
}

function AppLayout () {
  const { isAuthenticated } = useAuth()

  return (
    <Stack>
      <Stack.Protected guard={!isAuthenticated()}>
        <Stack.Screen name='(auth)/login' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)/register' options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated()}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='posts/[id]/index' />
        <Stack.Screen name='posts/[id]/edit' options={{ title: 'Editar publicación' }} />
      </Stack.Protected>
    </Stack>
  )
}

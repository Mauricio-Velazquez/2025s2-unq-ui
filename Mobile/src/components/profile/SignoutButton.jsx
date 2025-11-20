import { useAuth } from '../../hooks/useAuth'
import { Pressable, StyleSheet, Text } from 'react-native'

export function SignoutButton () {
  const { signout } = useAuth()

  return (
    <Pressable onPress={signout} style={styles.logoutBtn}>
      <Text style={styles.logoutText}>Cerrar sesión</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: '#495DF9',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 5
  },
  logoutText: {
    color: 'white',
    fontWeight: '600'
  }
})

import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginForm } from '../../components/forms/LoginForm'
import { Text, View } from 'react-native'
import { InstagramIcon } from '../../components/instagramIcon'
import { Link } from 'expo-router'
import { styles } from '../../styles/authStyles'

export default function Login () {
  return (
    <SafeAreaView style={styles.container}>
      <InstagramIcon width={280} height={60} />
      <LoginForm />
      <View style={{ borderColor: 'gray', borderWidth: 0.2, height: 0.1, width: 300, marginTop: 10 }} />
      <Text>¿No tienes una cuenta? <Link style={styles.link} href='/register'>Regístrate</Link> </Text>
    </SafeAreaView>
  )
}

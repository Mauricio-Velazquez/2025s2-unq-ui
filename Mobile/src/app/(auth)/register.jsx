import { InstagramIcon } from '../../components/instagramIcon'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../../styles/authStyles'
import { RegisterForm } from '../../components/forms/RegisterForm'
import { Link } from 'expo-router'

export default function Register () {
  return (
    <SafeAreaView style={styles.container}>
      <InstagramIcon width={280} height={60} />
      <Text style={styles.title}>Regístrate para ver las fotos y videos de tus amigos</Text>
      <RegisterForm />
      <Text style={styles.textContainer}>
        Al registrarte, aceptas nuestras
        <Link style={styles.link} href='/condiciones'> Condiciones </Link>
        , la
        <Link style={styles.link} href='/privacidad'> Política de privacidad </Link>
        y la
        <Link style={styles.link} href='/cookies'> Política de cookies</Link>.
      </Text>
      <View style={{ borderColor: 'gray', borderWidth: 0.2, height: 0.1, width: 300, marginTop: 10 }} />
      <View>
        <Text>¿Tienes una cuenta?</Text>
        <Link style={styles.link} href='/login'>Iniciar sesión</Link>
      </View>
    </SafeAreaView>
  )
}

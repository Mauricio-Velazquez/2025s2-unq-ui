import { Pressable, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { toastError } from '../../utils/toastify'
import { useAuth } from '../../hooks/useAuth'
import { styles } from './styles'
import { LoginUserDTO } from '../../services/dtos/user'

export function LoginForm () {
  const [email, setEmail] = useState('pepe@gmail.com')
  const [password, setPassword] = useState('pepe')
  const { login } = useAuth()

  function handleSubmit () {
    if (email.trim() === '' || password.trim() === '') {
      return
    }
    const userDTO = new LoginUserDTO({ email, password })

    login(userDTO)
      .catch(error => { toastError(error) })
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder='Correo electrónico' style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput placeholder='Contraseña' style={styles.input} onChangeText={setPassword} value={password} />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Pressable>
      {email.trim() === '' && <Text style={styles.error}>el campo Email no puede ser vacio</Text>}
      {password.trim() === '' && <Text style={styles.error}>el campo Contraseña no puede ser vacio</Text>}
    </View>
  )
}

import { Pressable, Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { useFormInput } from '../../hooks/useFormInput'
import { useAuth } from '../../hooks/useAuth'
import { toastError } from '../../utils/toastify'

export function RegisterForm () {
  const nameProps = useFormInput('aaa')
  const emailProps = useFormInput('aaa@a.com')
  const passwordProps = useFormInput('aaa')
  const imageProps = useFormInput('https://a.com/a')

  const { register } = useAuth()

  async function handleSubmit () {
    if (nameProps.value.trim() === '' || emailProps.value.trim() === '' || passwordProps.value.trim() === '' || imageProps.value.trim() === '') {
      return
    }

    const registerUserDTO = {
      name: nameProps.value,
      email: emailProps.value,
      password: passwordProps.value,
      image: imageProps.value
    }

    try {
      await register(registerUserDTO)
    } catch (e) {
      toastError(e)
    }
  }
  return (
    <View style={styles.container}>
      <TextInput {...nameProps} style={styles.input} placeholder='Nombre' />
      {nameProps.value.trim() === '' && <Text style={styles.error}>el campo Nombre no puede ser vacio</Text>}
      <TextInput {...emailProps} style={styles.input} placeholder='Correo electrónico' />
      {emailProps.value.trim() === '' && <Text style={styles.error}>el campo Email no puede ser vacio</Text>}
      <TextInput {...passwordProps} style={styles.input} placeholder='Contraseña' />
      {passwordProps.value.trim() === '' && <Text style={styles.error}>el campo Contraseña no puede ser vacio</Text>}
      <TextInput {...imageProps} style={styles.input} placeholder='Imagen' />
      {imageProps.value.trim() === '' && <Text style={styles.error}>el campo Imagen no puede ser vacio</Text>}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>
    </View>

  )
}
